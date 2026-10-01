import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import {
  Monitor,
  RefreshCw,
  Power,
  ShieldCheck,
  ShieldAlert,
  ArrowDownToLine,
  Search,
  CheckCircle2,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';

interface DesktopInstallation {
  id: string;
  restaurant_id: string;
  machine_id: string;
  machine_name: string | null;
  platform: string;
  app_version: string;
  is_active: boolean;
  last_seen: string;
  config: any;
  created_at: string;
  restaurant?: {
    id: string;
    name: string;
    slug: string;
  };
}

export const DesktopInstallationsManager = () => {
  const queryClient = useQueryClient();
  const [searchTerm, setSearchTerm] = useState('');

  // Fetch all installations with restaurant metadata
  const { data: installations = [], isLoading, refetch } = useQuery<DesktopInstallation[]>({
    queryKey: ['desktop-installations'],
    queryFn: async () => {
      const { data, error } = await (supabase
        .from('desktop_installations' as any)
        .select(`
          *,
          restaurant:restaurants(id, name, slug)
        `)
        .order('last_seen', { ascending: false }) as any);

      if (error) {
        console.warn('Error fetching desktop installations:', error);
        return [];
      }
      return data || [];
    },
    refetchInterval: 15000, // Auto refresh every 15s to monitor live heartbeat
  });

  // Mutation to toggle installation activation
  const toggleActivationMutation = useMutation({
    mutationFn: async ({ id, restaurantId, currentActive }: { id: string; restaurantId: string; currentActive: boolean }) => {
      const newStatus = !currentActive;
      
      // Update installation row
      const { error: updateError } = await (supabase
        .from('desktop_installations' as any)
        .update({ is_active: newStatus, updated_at: new Date().toISOString() })
        .eq('id', id) as any);
      if (updateError) throw updateError;

      // Queue command for the desktop app
      const { error: cmdError } = await (supabase
        .from('desktop_commands' as any)
        .insert({
          installation_id: id,
          restaurant_id: restaurantId,
          command: newStatus ? 'activate' : 'deactivate',
          payload: { reason: newStatus ? 'Admin reactivated' : 'Admin suspended' },
          status: 'pending',
        }) as any);
      if (cmdError) throw cmdError;

      return newStatus;
    },
    onSuccess: (newStatus) => {
      queryClient.invalidateQueries({ queryKey: ['desktop-installations'] });
      toast.success(newStatus ? 'Terminal activated successfully' : 'Terminal deactivated remotely');
    },
    onError: (err: any) => {
      toast.error(`Operation failed: ${err.message}`);
    },
  });

  // Mutation to send a remote command (force_update, reload_config)
  const sendCommandMutation = useMutation({
    mutationFn: async ({ installationId, restaurantId, command }: { installationId: string; restaurantId: string; command: string }) => {
      const { error } = await (supabase
        .from('desktop_commands' as any)
        .insert({
          installation_id: installationId,
          restaurant_id: restaurantId,
          command,
          status: 'pending',
        }) as any);
      if (error) throw error;
    },
    onSuccess: (_, vars) => {
      toast.success(`Remote command "${vars.command}" dispatched to terminal`);
    },
    onError: (err: any) => {
      toast.error(`Failed to send command: ${err.message}`);
    },
  });

  // Filtering
  const filteredInstallations = installations.filter((inst) => {
    const q = searchTerm.toLowerCase();
    const restName = inst.restaurant?.name?.toLowerCase() || '';
    const machine = inst.machine_name?.toLowerCase() || '';
    const id = inst.machine_id?.toLowerCase() || '';
    return restName.includes(q) || machine.includes(q) || id.includes(q);
  });

  // Summary counts
  const totalInstallations = installations.length;
  const activeCount = installations.filter((i) => i.is_active).length;
  const liveCount = installations.filter((i) => {
    if (!i.last_seen) return false;
    const diffMs = Date.now() - new Date(i.last_seen).getTime();
    return diffMs < 120000; // seen within 2 minutes
  }).length;

  return (
    <div className="space-y-6">
      {/* Top Banner / Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="bg-card/40 border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Total Terminals</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{totalInstallations}</span>
              <Monitor className="w-5 h-5 text-muted-foreground" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Registered Windows PC instances
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Online Right Now</CardDescription>
            <CardTitle className="text-2xl font-bold text-emerald-500 flex items-center justify-between">
              <span>{liveCount}</span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Heartbeat active within 2 minutes
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Active Licenses</CardDescription>
            <CardTitle className="text-2xl font-bold flex items-center justify-between">
              <span>{activeCount}</span>
              <ShieldCheck className="w-5 h-5 text-emerald-500" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Authorized operational clients
          </CardContent>
        </Card>

        <Card className="bg-card/40 border-border/60">
          <CardHeader className="pb-2">
            <CardDescription className="text-xs uppercase tracking-wider">Application Target</CardDescription>
            <CardTitle className="text-2xl font-bold text-primary flex items-center justify-between">
              <span>v1.0.0</span>
              <Sparkles className="w-5 h-5 text-primary" />
            </CardTitle>
          </CardHeader>
          <CardContent className="text-xs text-muted-foreground">
            Ashnora-Setup-1.0.0.exe release
          </CardContent>
        </Card>
      </div>

      {/* Main Table Card */}
      <Card className="border-border/60 shadow-sm">
        <CardHeader className="border-b border-border/40 pb-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <CardTitle className="text-lg font-bold flex items-center gap-2">
                <Monitor className="w-5 h-5 text-primary" />
                Desktop POS Installations & Remote Control
              </CardTitle>
              <CardDescription>
                Live monitoring, remote deactivation, and remote update commands for all restaurant desktop installations.
              </CardDescription>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => refetch()}
                className="gap-2 shrink-0"
              >
                <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>

              <a href="/release/Ashnora-1.0.0-Setup.exe" download>
                <Button size="sm" className="gap-2 shrink-0 bg-emerald-600 hover:bg-emerald-700 text-white">
                  <ArrowDownToLine className="w-3.5 h-3.5" />
                  Download EXE
                </Button>
              </a>
            </div>
          </div>

          <div className="pt-3">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by restaurant name, machine ID, terminal..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 h-9"
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-0">
          {filteredInstallations.length === 0 ? (
            <div className="p-12 text-center space-y-3">
              <div className="w-12 h-12 rounded-full bg-muted/60 flex items-center justify-center mx-auto text-muted-foreground">
                <Monitor className="w-6 h-6" />
              </div>
              <p className="text-sm font-medium">No desktop installations registered yet</p>
              <p className="text-xs text-muted-foreground max-w-sm mx-auto">
                When restaurants launch <code className="bg-muted px-1.5 py-0.5 rounded">Ashnora.exe</code>, their terminal will automatically register and show up here in real-time.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-border/40 overflow-x-auto">
              {filteredInstallations.map((inst) => {
                const diffMs = inst.last_seen ? Date.now() - new Date(inst.last_seen).getTime() : Infinity;
                const isOnline = diffMs < 120000;

                return (
                  <div
                    key={inst.id}
                    className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-card border border-border flex items-center justify-center shrink-0 mt-0.5">
                        <Monitor className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-semibold text-sm">
                            {inst.restaurant?.name || 'Unassigned Restaurant'}
                          </span>
                          {isOnline ? (
                            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/30 text-[10px] py-0">
                              Online
                            </Badge>
                          ) : (
                            <Badge variant="outline" className="text-muted-foreground text-[10px] py-0">
                              Offline
                            </Badge>
                          )}
                          {!inst.is_active && (
                            <Badge variant="destructive" className="text-[10px] py-0">
                              Deactivated
                            </Badge>
                          )}
                        </div>

                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 mt-1 text-xs text-muted-foreground">
                          <span>Machine: <strong className="text-foreground">{inst.machine_name || inst.machine_id}</strong></span>
                          <span>•</span>
                          <span>OS: <strong className="text-foreground">{inst.platform}</strong></span>
                          <span>•</span>
                          <span>App: <strong className="text-foreground">v{inst.app_version}</strong></span>
                          <span>•</span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            Last seen: {new Date(inst.last_seen).toLocaleTimeString()}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Remote Control Actions */}
                    <div className="flex items-center gap-2 shrink-0 self-end md:self-center">
                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                        onClick={() =>
                          sendCommandMutation.mutate({
                            installationId: inst.id,
                            restaurantId: inst.restaurant_id,
                            command: 'force_update',
                          })
                        }
                        disabled={sendCommandMutation.isPending}
                      >
                        <RefreshCw className="w-3.5 h-3.5 mr-1.5" />
                        Force Sync
                      </Button>

                      <Button
                        size="sm"
                        variant="outline"
                        className="text-xs h-8"
                        onClick={() =>
                          sendCommandMutation.mutate({
                            installationId: inst.id,
                            restaurantId: inst.restaurant_id,
                            command: 'reload_config',
                          })
                        }
                        disabled={sendCommandMutation.isPending}
                      >
                        Reload Config
                      </Button>

                      <Button
                        size="sm"
                        variant={inst.is_active ? 'destructive' : 'default'}
                        className="text-xs h-8"
                        onClick={() =>
                          toggleActivationMutation.mutate({
                            id: inst.id,
                            restaurantId: inst.restaurant_id,
                            currentActive: inst.is_active,
                          })
                        }
                        disabled={toggleActivationMutation.isPending}
                      >
                        <Power className="w-3.5 h-3.5 mr-1.5" />
                        {inst.is_active ? 'Deactivate' : 'Activate'}
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
