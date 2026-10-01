import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, ChevronDown, Minus, X, ArrowRight, Sparkles } from 'lucide-react';
import { isElectron, invokeElectron } from '@/lib/electron';
import { useNavigate } from 'react-router-dom';

interface AshnoraCompactInstallerProps {
  onLaunch?: () => void;
  autoStart?: boolean;
}

const INSTALLATION_STAGES = [
  { label: 'Preparing Ashnora...', target: 15, duration: 1200 },
  { label: 'Installing application...', target: 44, duration: 1800 },
  { label: 'Installing dependencies...', target: 68, duration: 1600 },
  { label: 'Configuring database...', target: 86, duration: 1400 },
  { label: 'Creating shortcuts...', target: 96, duration: 1000 },
  { label: 'Finalizing installation...', target: 100, duration: 1000 },
];

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'it', name: 'Italiano' },
  { code: 'hi', name: 'हिन्दी' },
  { code: 'ar', name: 'العربية' },
];

export const AshnoraCompactInstaller: React.FC<AshnoraCompactInstallerProps> = ({
  onLaunch,
  autoStart = true,
}) => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [currentStageIndex, setCurrentStageIndex] = useState(0);
  const [isCompleted, setIsCompleted] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  const [showLanguageDropdown, setShowLanguageDropdown] = useState(false);

  // Handle Electron window controls
  const handleMinimize = async () => {
    if (isElectron()) {
      await invokeElectron('window-minimize');
    }
  };

  const handleClose = async () => {
    if (isElectron()) {
      await invokeElectron('window-close');
    } else {
      navigate('/login');
    }
  };

  const handleLaunch = async () => {
    if (onLaunch) {
      onLaunch();
      return;
    }
    if (isElectron()) {
      await invokeElectron('launch-app');
    }
    navigate('/admin');
  };

  // Run real progressive installation simulation
  useEffect(() => {
    if (!autoStart || isCompleted) return;

    let stageIdx = 0;
    let currentP = 0;
    let intervalId: any = null;

    const runStage = () => {
      if (stageIdx >= INSTALLATION_STAGES.length) {
        setProgress(100);
        setTimeout(() => setIsCompleted(true), 600);
        return;
      }

      const stage = INSTALLATION_STAGES[stageIdx];
      setCurrentStageIndex(stageIdx);
      const startP = currentP;
      const targetP = stage.target;
      const startTime = Date.now();

      intervalId = setInterval(() => {
        const elapsed = Date.now() - startTime;
        const ratio = Math.min(1, elapsed / stage.duration);
        // Smooth ease-out curve
        const eased = 1 - Math.pow(1 - ratio, 2.5);
        const nextP = Math.round(startP + (targetP - startP) * eased);
        setProgress(nextP);

        if (ratio >= 1) {
          clearInterval(intervalId);
          currentP = targetP;
          stageIdx++;
          setTimeout(runStage, 250);
        }
      }, 35);
    };

    const startTimer = setTimeout(runStage, 400);

    return () => {
      clearTimeout(startTimer);
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoStart, isCompleted]);

  const currentStage = INSTALLATION_STAGES[currentStageIndex] || INSTALLATION_STAGES[INSTALLATION_STAGES.length - 1];

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-[#071326]/90 backdrop-blur-md p-4 select-none z-50">
      {/* 720x460 Compact Installer Window */}
      <div
        className="relative w-[720px] h-[460px] rounded-[24px] overflow-hidden shadow-2xl flex flex-col justify-between"
        style={{
          background: 'linear-gradient(135deg, #0B1F3A 0%, #071326 100%)',
          boxShadow: '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 40px rgba(249, 115, 22, 0.12)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        {/* Ambient Restaurant / POS Atmosphere Photography */}
        <div
          className="absolute inset-0 bg-cover bg-center pointer-events-none opacity-20 mix-blend-luminosity"
          style={{ backgroundImage: `url('/brand/hero-bg.png')` }}
        />

        {/* Abstract Organic Sweeping Curved Shapes inspired by Reference Composition */}
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox="0 0 720 460"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            {/* Left sweeping curve gradient: Ashnora deep navy to cobalt */}
            <linearGradient id="curveLeft" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#16325B" stopOpacity="0.85" />
              <stop offset="50%" stopColor="#0F2447" stopOpacity="0.7" />
              <stop offset="100%" stopColor="#0B1F3A" stopOpacity="0.3" />
            </linearGradient>

            {/* Right sweeping curve gradient: Ashnora glowing Orange to warm Amber */}
            <linearGradient id="curveRight" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F97316" stopOpacity="0.75" />
              <stop offset="50%" stopColor="#EA580C" stopOpacity="0.65" />
              <stop offset="100%" stopColor="#C2410C" stopOpacity="0.2" />
            </linearGradient>

            {/* Soft ambient orange glow filter */}
            <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="30" result="blur" />
            </filter>
          </defs>

          {/* Left swoosh */}
          <path
            d="M -40 -30 C 180 -10, 260 160, 160 320 C 100 420, -10 460, -40 480 Z"
            fill="url(#curveLeft)"
          />

          {/* Right sweeping organic shape */}
          <path
            d="M 380 -50 C 420 120, 360 260, 480 340 C 580 410, 720 380, 760 360 L 760 -50 Z"
            fill="url(#curveRight)"
          />

          {/* Glowing ambient accents */}
          <circle cx="580" cy="180" r="140" fill="#F97316" opacity="0.18" filter="url(#orangeGlow)" />
          <circle cx="120" cy="280" r="120" fill="#0284C7" opacity="0.15" filter="url(#orangeGlow)" />
        </svg>

        {/* TOP BAR: Logo on left, Language + Window Controls on right */}
        <div className="relative z-20 flex items-center justify-between px-6 pt-5">
          {/* Top-Left Ashnora Brand */}
          <div className="flex items-center gap-2.5">
            <img
              src="/brand/ashnora-logo-clean.png"
              alt="Ashnora Logo"
              className="w-7 h-7 object-contain drop-shadow"
            />
            <span className="text-white font-bold text-base tracking-tight flex items-center">
              <span>Ash</span>
              <span className="text-[#F97316]">nora</span>
            </span>
          </div>

          {/* Top-Right Curved Notch with Language & Controls */}
          <div className="flex items-center gap-2 bg-[#06101E]/90 border border-white/10 rounded-full px-3 py-1 shadow-lg backdrop-blur-md">
            {/* Language Selector Dropdown */}
            <div className="relative">
              <button
                onClick={() => setShowLanguageDropdown(!showLanguageDropdown)}
                className="flex items-center gap-1.5 text-xs text-white/90 hover:text-white font-medium py-1 px-2 rounded-full hover:bg-white/5 transition-colors"
              >
                <span>{selectedLanguage}</span>
                <ChevronDown className="w-3.5 h-3.5 text-white/60" />
              </button>

              <AnimatePresence>
                {showLanguageDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 4, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 4, scale: 0.95 }}
                    className="absolute right-0 mt-2 w-32 bg-[#0B1F3A] border border-white/15 rounded-xl shadow-xl overflow-hidden py-1 z-30"
                  >
                    {LANGUAGES.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => {
                          setSelectedLanguage(lang.name);
                          setShowLanguageDropdown(false);
                        }}
                        className={`w-full text-left px-3 py-1.5 text-xs transition-colors flex items-center justify-between ${
                          selectedLanguage === lang.name
                            ? 'bg-[#F97316]/20 text-[#F97316] font-semibold'
                            : 'text-white/80 hover:bg-white/10 hover:text-white'
                        }`}
                      >
                        <span>{lang.name}</span>
                        {selectedLanguage === lang.name && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                        )}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="w-[1px] h-3.5 bg-white/20" />

            {/* Minimize Window */}
            <button
              onClick={handleMinimize}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors"
              title="Minimize"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>

            {/* Close Window */}
            <button
              onClick={handleClose}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white/70 hover:text-red-400 hover:bg-red-500/20 transition-colors"
              title="Close"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* CENTER CONTENT */}
        <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center px-8 -mt-2">
          <AnimatePresence mode="wait">
            {!isCompleted ? (
              <motion.div
                key="installing"
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96, transition: { duration: 0.25 } }}
                className="space-y-4 max-w-lg"
              >
                {/* Ashnora Official Logo Mark */}
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-[#F97316]/20 rounded-full blur-xl animate-pulse" />
                  <img
                    src="/brand/ashnora-logo-clean.png"
                    alt="Ashnora Mark"
                    className="relative w-16 h-16 object-contain drop-shadow-2xl"
                  />
                </div>

                <div className="space-y-1.5">
                  <h1 className="text-3xl font-extrabold text-white tracking-tight drop-shadow">
                    Please Wait
                  </h1>
                  <p className="text-sm text-white/85 font-medium tracking-wide">
                    Installing Ashnora Restaurant Operating System
                  </p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="completed"
                initial={{ opacity: 0, y: 15, scale: 0.94 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="space-y-5 max-w-md"
              >
                <div className="relative mx-auto w-20 h-20 flex items-center justify-center">
                  <div className="absolute inset-0 bg-emerald-500/25 rounded-full blur-xl animate-pulse" />
                  <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-emerald-600 to-teal-400 border border-emerald-400/40 flex items-center justify-center shadow-xl shadow-emerald-950/50">
                    <CheckCircle2 className="w-9 h-9 text-white stroke-[2.2]" />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-300 text-xs font-semibold uppercase tracking-wider">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Installation Complete</span>
                  </div>
                  <h1 className="text-2xl md:text-3xl font-extrabold text-white tracking-tight">
                    ASHNORA IS READY
                  </h1>
                  <p className="text-xs md:text-sm text-white/80">
                    Your restaurant operating system is ready to launch.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={handleLaunch}
                    className="w-full py-3 px-6 rounded-xl bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] hover:from-orange-500 hover:to-orange-600 text-white font-bold text-sm shadow-xl shadow-orange-600/30 hover:shadow-orange-600/50 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                  >
                    <span>Launch Ashnora</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* BOTTOM AREA: Progress Bar & Stage Status */}
        <div className="relative z-20 px-8 pb-7">
          <div className="space-y-2.5">
            {/* Top row above progress bar: Percentage on left, stage status in center/right, animated 3 dots on right */}
            <div className="flex items-center justify-between text-xs text-white/90 font-medium px-1">
              <span className="font-bold text-white tracking-wide text-sm font-mono">
                {progress}%
              </span>

              <span className="text-white/80 tracking-wide text-xs">
                {isCompleted ? 'Installation successful' : currentStage.label}
              </span>

              {/* Three animated pulsing dots like in reference image */}
              <div className="flex items-center gap-1.5">
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                  style={{ animationDelay: '0ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                  style={{ animationDelay: '150ms' }}
                />
                <span
                  className="w-1.5 h-1.5 rounded-full bg-white/70 animate-bounce"
                  style={{ animationDelay: '300ms' }}
                />
              </div>
            </div>

            {/* Glowing modern progress bar track */}
            <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden p-[1px] backdrop-blur-sm border border-white/5">
              <motion.div
                className="h-full rounded-full relative"
                style={{
                  background: 'linear-gradient(90deg, #F97316 0%, #FB923C 70%, #FDBA74 100%)',
                  boxShadow: '0 0 12px rgba(249, 115, 22, 0.8)',
                }}
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.2 }}
              >
                {/* Shimmer light bar */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse" />
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
