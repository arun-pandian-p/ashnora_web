import React from 'react';
import { ShieldAlert, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DesktopDeactivatedScreenProps {
  machineId?: string;
  onRefresh?: () => void;
}

export const DesktopDeactivatedScreen: React.FC<DesktopDeactivatedScreenProps> = ({
  machineId,
  onRefresh = () => window.location.reload(),
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#09090b] text-white p-6 select-none">
      <div className="max-w-md w-full text-center space-y-6 bg-zinc-900/90 border border-red-500/30 rounded-2xl p-8 backdrop-blur-xl shadow-2xl shadow-red-950/40">
        <div className="w-16 h-16 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mx-auto text-red-500">
          <ShieldAlert className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">Terminal Deactivated</h1>
          <p className="text-sm text-zinc-400">
            This Ashnora POS installation has been remotely deactivated by Super Admin.
          </p>
        </div>

        {machineId && (
          <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-3 text-xs text-zinc-400 font-mono">
            Machine ID: <span className="text-zinc-200">{machineId}</span>
          </div>
        )}

        <div className="pt-2 flex flex-col gap-3">
          <Button
            variant="outline"
            className="w-full border-zinc-700 hover:bg-zinc-800 text-zinc-200"
            onClick={onRefresh}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Check Activation Status
          </Button>
          <p className="text-xs text-zinc-500">
            Contact your platform administrator to restore access to this terminal.
          </p>
        </div>
      </div>
    </div>
  );
};
