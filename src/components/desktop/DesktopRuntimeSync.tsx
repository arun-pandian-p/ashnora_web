import React from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useDesktopSync } from '@/hooks/useDesktopSync';
import { isElectron } from '@/lib/electron';
import { DesktopDeactivatedScreen } from './DesktopDeactivatedScreen';
import { UpdateNotificationBanner } from './UpdateNotificationBanner';

/**
 * DesktopRuntimeSync
 * Automatically mounts at the root of the application.
 * In Electron, immediately registers the machine_id, maintains live heartbeats,
 * listens to remote Super Admin commands, and displays deactivation lock screen if revoked.
 */
export const DesktopRuntimeSync: React.FC = () => {
  const { restaurantId } = useAuth();
  const syncState = useDesktopSync(restaurantId);

  if (isElectron() && syncState.isDeactivated) {
    return <DesktopDeactivatedScreen machineId={syncState.machineId} />;
  }

  return null;
};

