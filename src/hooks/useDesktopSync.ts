import { useEffect, useState, useCallback, useRef } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { isElectron, getAppVersion, getPlatform, getMachineId } from '@/lib/electron';
import { toast } from 'sonner';

export interface DesktopSyncState {
  isDeactivated: boolean;
  machineId: string;
  lastHeartbeat: Date | null;
  appVersion: string;
}

export function useDesktopSync(restaurantId: string | null = null) {
  const [syncState, setSyncState] = useState<DesktopSyncState>({
    isDeactivated: false,
    machineId: 'initializing',
    lastHeartbeat: null,
    appVersion: getAppVersion(),
  });

  const machineIdRef = useRef<string>('');
  const installationIdRef = useRef<string>('');

  const sendHeartbeat = useCallback(async () => {
    if (!isElectron()) return;

    try {
      if (!machineIdRef.current) {
        machineIdRef.current = await getMachineId();
      }
      const machineId = machineIdRef.current;
      const appVersion = getAppVersion();
      const platform = getPlatform();

      // Resolve restaurant ID from argument or localStorage fallback
      const activeRestaurantId =
        restaurantId ||
        (typeof localStorage !== 'undefined'
          ? localStorage.getItem('ashnora_restaurant_id') ||
            localStorage.getItem('impersonated_restaurant_id') ||
            null
          : null);

      // 1. Send heartbeat / upsert installation by machine_id
      const payload: Record<string, any> = {
        machine_id: machineId,
        machine_name: `Ashnora-POS-${machineId.substring(0, 6).toUpperCase()}`,
        platform,
        app_version: appVersion,
        last_seen: new Date().toISOString(),
      };

      if (activeRestaurantId) {
        payload.restaurant_id = activeRestaurantId;
      }

      const { data: installData, error: installError } = await (supabase
        .from('desktop_installations' as any)
        .upsert(payload, { onConflict: 'machine_id' })
        .select('id, is_active, restaurant_id')
        .single() as any);

      if (installError) {
        console.warn('[DesktopSync] Upsert heartbeat error:', installError);
      } else if (installData) {
        installationIdRef.current = installData.id;

        if (installData.is_active === false) {
          setSyncState((prev) => ({
            ...prev,
            isDeactivated: true,
            machineId,
            lastHeartbeat: new Date(),
          }));
          return;
        } else {
          setSyncState((prev) => ({
            ...prev,
            isDeactivated: false,
            machineId,
            lastHeartbeat: new Date(),
          }));
        }
      }

      // 2. Poll for pending commands targeting this installation or restaurant
      const instId = installationIdRef.current;
      let cmdQuery = supabase
        .from('desktop_commands' as any)
        .select('*')
        .eq('status', 'pending');

      if (instId && activeRestaurantId) {
        cmdQuery = cmdQuery.or(`installation_id.eq.${instId},restaurant_id.eq.${activeRestaurantId}`);
      } else if (instId) {
        cmdQuery = cmdQuery.eq('installation_id', instId);
      } else if (activeRestaurantId) {
        cmdQuery = cmdQuery.eq('restaurant_id', activeRestaurantId);
      } else {
        cmdQuery = cmdQuery.is('installation_id', null);
      }

      const { data: commands, error: cmdError } = await (cmdQuery as any);

      if (!cmdError && commands && commands.length > 0) {
        for (const cmd of commands) {
          console.log(`[Ashnora Desktop] Received remote command:`, cmd.command);

          if (cmd.command === 'deactivate') {
            setSyncState((prev) => ({ ...prev, isDeactivated: true }));
            toast.error('This desktop terminal has been deactivated remotely by Super Admin.');
          } else if (cmd.command === 'activate') {
            setSyncState((prev) => ({ ...prev, isDeactivated: false }));
            toast.success('Desktop terminal activated.');
          } else if (cmd.command === 'force_update') {
            toast.info('Super Admin requested app refresh & sync...');
            setTimeout(() => {
              window.location.reload();
            }, 1500);
          } else if (cmd.command === 'reload_config') {
            toast.info('Restaurant configuration refreshed remotely.');
            window.dispatchEvent(new Event('ashnora-config-reload'));
          }

          // Mark command as executed
          await (supabase
            .from('desktop_commands' as any)
            .update({
              status: 'executed',
              executed_at: new Date().toISOString(),
            })
            .eq('id', cmd.id) as any);
        }
      }
    } catch (err) {
      console.warn('[DesktopSync] Heartbeat exception:', err);
    }
  }, [restaurantId]);

  useEffect(() => {
    if (!isElectron()) return;

    // Send initial heartbeat immediately upon launch
    sendHeartbeat();

    // Heartbeat every 30 seconds
    const interval = setInterval(sendHeartbeat, 30000);

    // Subscribe to realtime changes on desktop_installations
    let channel: any = null;
    getMachineId().then((machineId) => {
      machineIdRef.current = machineId;
      channel = supabase
        .channel(`desktop-sync-${machineId}`)
        .on(
          'postgres_changes',
          {
            event: 'UPDATE',
            schema: 'public',
            table: 'desktop_installations',
            filter: `machine_id=eq.${machineId}`,
          },
          (payload: any) => {
            if (payload?.new) {
              setSyncState((prev) => ({
                ...prev,
                isDeactivated: payload.new.is_active === false,
                lastHeartbeat: new Date(),
              }));
            }
          }
        )
        .on(
          'postgres_changes',
          {
            event: 'INSERT',
            schema: 'public',
            table: 'desktop_commands',
          },
          () => {
            sendHeartbeat();
          }
        )
        .subscribe();
    });

    return () => {
      clearInterval(interval);
      if (channel) {
        supabase.removeChannel(channel);
      }
    };
  }, [sendHeartbeat]);

  return syncState;
}
