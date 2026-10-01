import React, { useState } from 'react';
import { isElectron } from '@/lib/electron';
import { useAuth } from '@/hooks/useAuth';
import { useDesktopSync } from '@/hooks/useDesktopSync';
import { DesktopDeactivatedScreen } from './DesktopDeactivatedScreen';
import { Button } from '@/components/ui/button';
import { Monitor, Download, ArrowUpRight, ShieldCheck, Sparkles, UtensilsCrossed } from 'lucide-react';
import { Link } from 'react-router-dom';

interface DesktopAppGateProps {
  children: React.ReactNode;
  featureName?: string;
}

export const DesktopAppGate: React.FC<DesktopAppGateProps> = ({
  children,
  featureName = 'Restaurant Operations',
}) => {
  const { restaurantId } = useAuth();
  const syncState = useDesktopSync(restaurantId);
  const [devBypass, setDevBypass] = useState(false);

  // If inside native Electron app and deactivated
  if (isElectron() && syncState.isDeactivated) {
    return <DesktopDeactivatedScreen machineId={syncState.machineId} />;
  }

  return <>{children}</>;

  // Web Application Guard Screen
  return (
    <div className="min-h-screen bg-[#09090b] text-white flex flex-col justify-between selection:bg-emerald-500/20">
      {/* Top Navbar */}
      <header className="border-b border-zinc-800/80 px-6 py-4 flex items-center justify-between backdrop-blur-md bg-zinc-950/40">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 to-teal-400 flex items-center justify-center shadow-lg shadow-emerald-950/50">
            <UtensilsCrossed className="w-5 h-5 text-white" />
          </div>
          <div>
            <span className="font-bold tracking-tight text-lg text-white">Ashnora</span>
            <span className="text-[10px] uppercase tracking-wider text-emerald-400 font-semibold ml-2 px-1.5 py-0.5 rounded bg-emerald-950/60 border border-emerald-800/40">
              Desktop OS
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 text-sm">
          <Link
            to="/customer-menu"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Customer Menu
          </Link>
          <Link
            to="/super-admin"
            className="text-zinc-400 hover:text-white transition-colors"
          >
            Super Admin
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex items-center justify-center p-6 my-auto">
        <div className="max-w-2xl w-full text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-medium">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Dedicated Windows Restaurant Application</span>
          </div>

          <div className="space-y-4">
            <h1 className="text-3xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
              {featureName} is powered by{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Ashnora Desktop
              </span>
            </h1>
            <p className="text-base md:text-lg text-zinc-400 max-w-xl mx-auto leading-relaxed">
              To guarantee zero-latency billing, direct ESC/POS thermal printing, offline resilience, and secure POS operations, restaurant staff access is isolated to the single Windows installer.
            </p>
          </div>

          {/* Feature Badges */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 max-w-lg mx-auto text-xs text-zinc-300">
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center gap-1.5">
              <Monitor className="w-4 h-4 text-emerald-400" />
              <span>POS & Billing</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center gap-1.5">
              <span className="text-emerald-400 font-bold">KDS</span>
              <span>Kitchen Display</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Hardware Print</span>
            </div>
            <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex flex-col items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Table Ops</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="/release/Ashnora-1.0.0-Setup.exe"
              download
              className="w-full sm:w-auto"
            >
              <Button
                size="lg"
                className="w-full bg-emerald-500 hover:bg-emerald-600 text-black font-semibold shadow-lg shadow-emerald-500/20 px-8"
              >
                <Download className="w-4 h-4 mr-2" />
                Download Ashnora for Windows (.exe)
              </Button>
            </a>

            <a
              href="ashnora://"
              className="w-full sm:w-auto"
            >
              <Button
                variant="outline"
                size="lg"
                className="w-full border-zinc-700 bg-zinc-900/80 hover:bg-zinc-800 text-zinc-200"
              >
                <ArrowUpRight className="w-4 h-4 mr-2" />
                Launch Installed App
              </Button>
            </a>
          </div>

          {/* Dev bypass option */}
          <div className="pt-4">
            <button
              onClick={() => setDevBypass(true)}
              className="text-xs text-zinc-600 hover:text-zinc-400 transition-colors underline"
            >
              Developer Preview Mode (Run in Web Browser)
            </button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800/60 px-6 py-4 text-center text-xs text-zinc-500">
        Ashnora Restaurant OS • Cloud Super Admin & Customer Menu are available on the web.
      </footer>
    </div>
  );
};
