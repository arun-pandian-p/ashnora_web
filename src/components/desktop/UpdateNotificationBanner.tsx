import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, ArrowRight, X, DownloadCloud } from 'lucide-react';
import { getAppVersion, isElectron } from '@/lib/electron';
import { Button } from '@/components/ui/button';

interface UpdateNotificationBannerProps {
  latestVersion?: string;
  releaseNotes?: string;
}

export const UpdateNotificationBanner: React.FC<UpdateNotificationBannerProps> = ({
  latestVersion = '1.0.1',
  releaseNotes = 'New modern Home dashboard, enhanced QR seat isolation, and performance updates.',
}) => {
  const [dismissed, setDismissed] = useState(false);
  const currentVersion = getAppVersion();

  const isOlderVersion = (() => {
    try {
      const curParts = currentVersion.split('.').map(Number);
      const latParts = latestVersion.split('.').map(Number);
      for (let i = 0; i < Math.max(curParts.length, latParts.length); i++) {
        const c = curParts[i] || 0;
        const l = latParts[i] || 0;
        if (c < l) return true;
        if (c > l) return false;
      }
      return false;
    } catch {
      return currentVersion !== latestVersion;
    }
  })();

  const [hasPromptedToast, setHasPromptedToast] = useState(false);

  useEffect(() => {
    if (isOlderVersion && !hasPromptedToast) {
      setHasPromptedToast(true);
    }
  }, [isOlderVersion, hasPromptedToast]);

  if (!isOlderVersion || dismissed) {
    return null;
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -40 }}
        transition={{ duration: 0.35, ease: 'easeOut' }}
        className="fixed top-3 left-1/2 -translate-x-1/2 z-[9999] w-[95%] max-w-2xl bg-gradient-to-r from-[#0B1F3A] via-[#112D55] to-[#0B1F3A] text-white p-4 rounded-2xl shadow-2xl border border-orange-500/30 backdrop-blur-xl flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-orange-500 to-amber-400 flex items-center justify-center shrink-0 shadow-md">
            <Sparkles className="w-5 h-5 text-white animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-extrabold text-sm text-white tracking-tight">
                Ashnora Update v{latestVersion} Available
              </h4>
              <span className="text-[10px] uppercase font-bold bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded-full border border-orange-500/30">
                New Release
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-0.5 line-clamp-1">
              {releaseNotes}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <Button
            size="sm"
            onClick={() => {
              window.open('https://ashnora.com', '_blank');
            }}
            className="bg-orange-500 hover:bg-orange-600 text-white font-bold text-xs h-8 rounded-xl px-3.5 shadow-md shadow-orange-500/20 flex items-center gap-1.5"
          >
            <DownloadCloud className="w-3.5 h-3.5" />
            <span>Update Now</span>
          </Button>
          <button
            onClick={() => setDismissed(true)}
            className="w-7 h-7 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 flex items-center justify-center transition-colors"
            title="Dismiss"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
