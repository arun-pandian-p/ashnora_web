import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Download,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Cpu,
  HardDrive,
  Monitor,
  Wifi,
  ChevronDown,
  ArrowRight,
  ExternalLink,
  Layers,
  Printer,
  Mic,
  Clock,
  HelpCircle,
  FileCode,
  Terminal,
  Laptop,
  Smartphone,
  Info,
  Copy,
  Check
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';
import MarketingLayout from '@/components/landing/MarketingLayout';
import Footer from '@/components/landing/Footer';
import { toast } from '@/hooks/use-toast';

// Official release metadata
const RELEASE_INFO = {
  version: '1.0.6',
  build: '106',
  releaseDate: 'October 1, 2026',
  installerFileName: 'Ashnora-1.0.6-Setup.exe',
  installerSize: '363 MB',
  standaloneFileName: 'Ashnora.exe',
  standaloneSize: '245 MB',
  installerUrl: 'https://github.com/arun-pandian-p/Ashnora/releases/download/v1.0.6/Ashnora-1.0.6-Setup.exe',
  standaloneUrl: 'https://github.com/arun-pandian-p/Ashnora/releases/download/v1.0.6/Ashnora.exe',
  architecture: 'Windows x64 (64-bit)',
  sha256: '9a5c88e622b7a976f6b0fbb464e525a7702be9665bc7c49e75ebbcbf85cf58f3',
};

const WHATS_NEW = [
  {
    icon: Sparkles,
    title: 'Auto-Credential Role Authentication',
    description: 'Instant zero-click role selection for Kitchen (KDS), Billing (POS), Waiter station, and Restaurant Admin without manual credentials.',
    tag: 'Feature'
  },
  {
    icon: Wifi,
    title: 'Real-Time Order Status Pipeline',
    description: 'Sub-millisecond WebSocket updates powered by Supabase Realtime across customer QR web menu and desktop POS.',
    tag: 'Performance'
  },
  {
    icon: Mic,
    title: 'Live Voice Messaging & Audio Notes',
    description: 'Stream customer dietary requests and voice orders directly to the Kitchen Display System with instant audio playback.',
    tag: 'Feature'
  },
  {
    icon: ShieldCheck,
    title: 'Cryptographic QR Seat Isolation',
    description: 'Individual seat session tokens eliminate order cross-talk and maintain multi-guest billing accuracy.',
    tag: 'Security'
  },
  {
    icon: Printer,
    title: 'Hardware Thermal Receipt Printing',
    description: 'Native ESC/POS hardware bridge supporting 80mm and 58mm thermal printers over USB and Local Network.',
    tag: 'Hardware'
  },
  {
    icon: Layers,
    title: 'Smart App Control & Authenticode Signature',
    description: 'Windows 11 SmartScreen verified executable with deterministic code integrity checks.',
    tag: 'Security'
  }
];

const RELEASE_HISTORY = [
  {
    version: 'v1.0.6',
    build: 'Build 106',
    date: 'Oct 01, 2026',
    isLatest: true,
    highlights: [
      'Auto-credential role authentication with instant station launch',
      'Centered responsive desktop home dashboard layout',
      'Unified staff sign-in and local offline asset bundling',
      'Enhanced QR seat session lifecycle triggers'
    ]
  },
  {
    version: 'v1.0.5',
    build: 'Build 105',
    date: 'Oct 01, 2026',
    isLatest: false,
    highlights: [
      'Visual role illustrations for Kitchen, Billing, and Waiter stations',
      'Super Admin installation heartbeat telemetry integration',
      'Diagnostic security compliance suite and local database integrity check'
    ]
  },
  {
    version: 'v1.0.4',
    build: 'Build 104',
    date: 'Oct 01, 2026',
    isLatest: false,
    highlights: [
      'Windows Smart App Control compliance and Authenticode code signing',
      'Deterministic asset hashing and memory footprint optimizations',
      'KDS ticket sound notifications and custom alert chime'
    ]
  },
  {
    version: 'v1.0.0 – v1.0.3',
    build: 'Build 100–103',
    date: 'Sep 2026',
    isLatest: false,
    highlights: [
      'Initial desktop shell packaging with Electron 34 and React 18',
      'SQLite offline data store and cloud synchronization bridge',
      'ESC/POS direct thermal print dispatcher and kitchen routing'
    ]
  }
];

const INSTALL_STEPS = [
  {
    step: '01',
    title: 'Download Installer',
    description: 'Click "Download for Windows" to get the official Ashnora-1.0.6-Setup.exe (363 MB).'
  },
  {
    step: '02',
    title: 'Run Setup',
    description: 'Open the downloaded .exe. If Windows SmartScreen appears, click "More info" and select "Run anyway".'
  },
  {
    step: '03',
    title: 'Automatic Setup',
    description: 'Ashnora sets up required local runtime files, database schemas, and creates desktop shortcuts automatically.'
  },
  {
    step: '04',
    title: 'Launch & Operate',
    description: 'Launch Ashnora from your desktop, choose your station (POS, KDS, Waiter, or Admin), and manage your restaurant.'
  }
];

const FAQS = [
  {
    q: 'How do I install Ashnora on Windows?',
    a: 'Download the official Ashnora-1.0.6-Setup.exe installer from this page. Double-click the file to begin the automatic installation. If Microsoft Defender SmartScreen prompts you, click "More info" and "Run anyway" to proceed.'
  },
  {
    q: 'Which platforms are currently supported?',
    a: 'Ashnora Desktop OS currently officially supports 64-bit Windows 10 and Windows 11. The Customer Menu and Admin portal are also accessible via any modern web browser (Chrome, Edge, Safari, Firefox) on mobile and desktop.'
  },
  {
    q: 'When will Linux and macOS versions be available?',
    a: 'Native Linux (.AppImage and .deb) and macOS (Apple Silicon & Intel) builds are currently in active development and scheduled for upcoming releases.'
  },
  {
    q: 'When will the Android POS / Waiter app be available?',
    a: 'An Android tablet app for portable waiter ordering and handheld POS is currently under internal testing and will be released soon.'
  },
  {
    q: 'How do I update my Ashnora installation?',
    a: 'Ashnora includes built-in delta auto-updates. When a new version is released, the desktop app will notify you with release notes and update automatically, or you can simply download the latest installer from this page.'
  },
  {
    q: 'Can Ashnora operate offline without internet?',
    a: 'Yes. Ashnora Desktop features local SQLite caching and offline fallback, allowing POS billing and kitchen order routing to continue even during temporary internet outages.'
  }
];

export const DownloadPage: React.FC = () => {
  const [copiedChecksum, setCopiedChecksum] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const handleCopyChecksum = () => {
    navigator.clipboard.writeText(RELEASE_INFO.sha256);
    setCopiedChecksum(true);
    toast({
      title: 'Checksum Copied',
      description: 'SHA-256 hash copied to your clipboard.',
    });
    setTimeout(() => setCopiedChecksum(false), 2500);
  };

  const handleDownloadWindows = (isStandalone = false) => {
    const url = isStandalone ? RELEASE_INFO.standaloneUrl : RELEASE_INFO.installerUrl;
    const filename = isStandalone ? RELEASE_INFO.standaloneFileName : RELEASE_INFO.installerFileName;

    toast({
      title: `Downloading ${filename}`,
      description: 'Your download has started. Please follow the setup guide below.',
    });

    // Create secure anchor download trigger
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', filename);
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <MarketingLayout>
      <Helmet>
        <title>Download Ashnora v1.0.6 — Official Desktop OS for Windows</title>
        <meta
          name="description"
          content="Download the latest Ashnora Desktop Operating System (v1.0.6). High-speed POS billing, Kitchen Display System (KDS), waiter station, and live QR order management."
        />
        <meta property="og:title" content="Download Ashnora Restaurant Operating System" />
        <meta
          property="og:description"
          content="Official releases and downloads for Ashnora Desktop OS on Windows. Real-time POS, KDS, and table management."
        />
      </Helmet>

      {/* HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#071326] via-[#0B1F3A] to-[#08172C] text-white pt-8 pb-20 sm:pb-28 border-b border-slate-800/80">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] sm:w-[900px] h-[350px] bg-[#F97316]/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/10 rounded-full blur-[90px] pointer-events-none" />

        <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Release Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/10 border border-[#F97316]/40 backdrop-blur-md shadow-lg mb-6"
          >
            <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
            <span className="text-xs sm:text-sm font-bold text-white tracking-wide">
              Ashnora v{RELEASE_INFO.version} Available
            </span>
            <span className="text-[10px] uppercase font-extrabold bg-[#F97316] text-white px-2 py-0.5 rounded-full">
              Latest Release
            </span>
          </motion.div>

          {/* Heading */}
          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.1 }}
            className="text-4xl sm:text-5xl lg:text-6xl font-black font-heading tracking-tight text-white max-w-4xl mx-auto leading-[1.15]"
          >
            Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-[#F97316] to-amber-400">Ashnora</span>
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.2 }}
            className="text-base sm:text-lg lg:text-xl text-slate-300 max-w-2xl mx-auto mt-4 leading-relaxed font-normal"
          >
            Get the latest Ashnora release with the newest features, improvements and fixes.
          </motion.p>

          {/* Key Specs Pills */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.25 }}
            className="flex flex-wrap items-center justify-center gap-3 sm:gap-6 mt-6 text-xs sm:text-sm text-slate-400 font-medium"
          >
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800">
              <Laptop className="w-4 h-4 text-[#F97316]" />
              <span>Windows 10 / 11 (64-bit)</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800">
              <Clock className="w-4 h-4 text-[#F97316]" />
              <span>Released {RELEASE_INFO.releaseDate}</span>
            </div>
            <div className="flex items-center gap-1.5 bg-slate-900/60 px-3 py-1 rounded-lg border border-slate-800">
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
              <span>Authenticode Signed</span>
            </div>
          </motion.div>

          {/* Primary Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-8"
          >
            <Button
              size="lg"
              onClick={() => handleDownloadWindows(false)}
              className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] hover:from-orange-500 hover:to-orange-600 text-white font-bold text-base shadow-[0_10px_30px_rgba(249,115,22,0.35)] hover:shadow-[0_12px_40px_rgba(249,115,22,0.5)] transition-all cursor-pointer flex items-center justify-center gap-3 active:scale-[0.98]"
            >
              <Download className="w-5 h-5 stroke-[2.5]" />
              <span>Download for Windows</span>
              <span className="text-xs font-normal opacity-85 bg-white/20 px-2 py-0.5 rounded-md">
                {RELEASE_INFO.installerSize}
              </span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => scrollToSection('whats-new')}
              className="w-full sm:w-auto h-14 px-7 rounded-xl bg-white/5 hover:bg-white/10 text-white border-white/20 font-semibold text-base transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>View Release Notes</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </motion.div>

          <p className="text-xs text-slate-400 mt-4">
            Direct NSIS Installer • Standard Standalone Exe available below
          </p>
        </div>
      </section>

      {/* PLATFORMS SECTION */}
      <section id="platforms" className="py-16 sm:py-24 bg-[#08172C] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
              Supported Platforms
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mt-3 text-white">
              Choose Your Platform
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Official application builds built for maximum speed, hardware printer integration, and reliability.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {/* CARD 1: WINDOWS (AVAILABLE) */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0F284B] to-[#0B1F3A] border-2 border-[#F97316] shadow-[0_15px_40px_rgba(249,115,22,0.15)] flex flex-col justify-between">
              {/* Recommended Badge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#F97316] text-white text-[11px] font-extrabold uppercase tracking-wider px-3.5 py-1 rounded-full shadow-md">
                Official Production Build
              </div>

              <div>
                <div className="flex items-center justify-between mt-2 mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-[#F97316]/20 border border-[#F97316]/30 flex items-center justify-center">
                    <Laptop className="w-7 h-7 text-[#F97316]" />
                  </div>
                  <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 rounded-full flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    Available Now
                  </span>
                </div>

                <h3 className="text-2xl font-black font-heading text-white">Windows</h3>
                <p className="text-slate-300 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Full restaurant operations with POS Billing, Kitchen KDS, Waiter Station, and direct ESC/POS hardware thermal printing.
                </p>

                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-300">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Version</span>
                    <span className="font-semibold text-white">v{RELEASE_INFO.version} (Build {RELEASE_INFO.build})</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Architecture</span>
                    <span className="font-semibold text-white">{RELEASE_INFO.architecture}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Installer Size</span>
                    <span className="font-semibold text-white">{RELEASE_INFO.installerSize}</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                <Button
                  onClick={() => handleDownloadWindows(false)}
                  className="w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Installer (.exe)</span>
                </Button>

                <Button
                  variant="outline"
                  onClick={() => handleDownloadWindows(true)}
                  className="w-full h-10 rounded-xl bg-white/5 hover:bg-white/10 text-slate-200 hover:text-white border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <FileCode className="w-3.5 h-3.5 text-slate-400" />
                  <span>Standalone Portable (.exe • 245 MB)</span>
                </Button>
              </div>
            </div>

            {/* CARD 2: LINUX (COMING SOON) */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1F3A]/70 to-[#071326]/70 border border-slate-800/80 shadow-md flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    <Terminal className="w-7 h-7 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-2xl font-black font-heading text-white">Linux</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Native Linux binary packaging for Ubuntu, Debian, and Fedora distributions for kiosk and counter hardware.
                </p>

                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Package Format</span>
                    <span className="font-semibold text-slate-300">.AppImage / .deb</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Target Arch</span>
                    <span className="font-semibold text-slate-300">x86_64 / arm64</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="font-semibold text-amber-400">In Pipeline</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  disabled
                  className="w-full h-12 rounded-xl bg-slate-800/80 text-slate-500 border border-slate-700 font-bold text-sm cursor-not-allowed"
                >
                  <span>Coming Soon</span>
                </Button>
              </div>
            </div>

            {/* CARD 3: ANDROID (COMING SOON) */}
            <div className="relative rounded-3xl p-6 sm:p-8 bg-gradient-to-b from-[#0B1F3A]/70 to-[#071326]/70 border border-slate-800/80 shadow-md flex flex-col justify-between opacity-85 hover:opacity-100 transition-opacity">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-14 h-14 rounded-2xl bg-slate-800/80 border border-slate-700 flex items-center justify-center">
                    <Smartphone className="w-7 h-7 text-slate-400" />
                  </div>
                  <span className="text-xs font-bold text-amber-400 bg-amber-500/10 border border-amber-500/20 px-3 py-1 rounded-full">
                    Coming Soon
                  </span>
                </div>

                <h3 className="text-2xl font-black font-heading text-white">Android</h3>
                <p className="text-slate-400 text-xs sm:text-sm mt-1.5 leading-relaxed">
                  Portable handheld ordering and table management optimized for Android tablets and handheld POS devices.
                </p>

                <div className="space-y-2 mt-6 pt-6 border-t border-slate-800 text-xs text-slate-400">
                  <div className="flex justify-between">
                    <span>Platform</span>
                    <span className="font-semibold text-slate-300">Android 9.0+</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="font-semibold text-slate-300">APK / Google Play</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Status</span>
                    <span className="font-semibold text-amber-400">In Development</span>
                  </div>
                </div>
              </div>

              <div className="mt-8">
                <Button
                  disabled
                  className="w-full h-12 rounded-xl bg-slate-800/80 text-slate-500 border border-slate-700 font-bold text-sm cursor-not-allowed"
                >
                  <span>Coming Soon</span>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* WHAT'S NEW SECTION */}
      <section id="whats-new" className="py-16 sm:py-24 bg-[#0B1F3A] text-white border-t border-b border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16">
            <div>
              <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
                Latest Highlights
              </span>
              <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mt-3 text-white">
                What's New in v{RELEASE_INFO.version}
              </h2>
              <p className="text-slate-300 text-sm sm:text-base mt-2 max-w-xl">
                Real, tested capabilities delivered directly into production for your kitchen, staff, and customers.
              </p>
            </div>

            <div className="mt-4 md:mt-0">
              <span className="text-xs font-mono text-slate-400 bg-slate-900/80 px-3.5 py-1.5 rounded-lg border border-slate-800">
                Build: {RELEASE_INFO.build} • Released {RELEASE_INFO.releaseDate}
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHATS_NEW.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="rounded-2xl p-6 bg-gradient-to-b from-[#0F284B]/60 to-[#071326]/80 border border-slate-800/80 hover:border-[#F97316]/40 transition-all duration-300 group"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-10 h-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/20 flex items-center justify-center group-hover:bg-[#F97316]/20 transition-colors">
                      <Icon className="w-5 h-5 text-[#F97316]" />
                    </div>
                    <span className="text-[10px] uppercase font-bold text-slate-300 bg-slate-800 px-2 py-0.5 rounded-md">
                      {item.tag}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-white font-heading group-hover:text-orange-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* INSTALLATION GUIDE */}
      <section id="installation" className="py-16 sm:py-24 bg-[#08172C] text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
              Quick Setup
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mt-3 text-white">
              Windows Installation Guide
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Get up and running on your restaurant desktop in less than 2 minutes.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {INSTALL_STEPS.map((step, idx) => (
              <div
                key={idx}
                className="relative rounded-2xl p-6 bg-gradient-to-b from-[#0B1F3A] to-[#071326] border border-slate-800 flex flex-col justify-between"
              >
                <div>
                  <span className="text-3xl font-black font-mono text-[#F97316]/30 mb-2 block">
                    {step.step}
                  </span>
                  <h3 className="text-lg font-bold text-white font-heading">
                    {step.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 mt-2 leading-relaxed">
                    {step.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-800/80 flex items-center gap-1.5 text-xs text-emerald-400 font-medium">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Step {idx + 1} of 4</span>
                </div>
              </div>
            ))}
          </div>

          {/* SmartScreen helper tip */}
          <div className="mt-8 max-w-3xl mx-auto p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-200 text-xs sm:text-sm flex items-start gap-3">
            <Info className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold text-white">Windows SmartScreen Note: </span>
              Because Ashnora is a direct restaurant binary distribution, Windows Defender SmartScreen may display a blue dialog stating "Windows protected your PC". Simply click <strong>"More info"</strong> and then click <strong>"Run anyway"</strong>.
            </div>
          </div>
        </div>
      </section>

      {/* SYSTEM REQUIREMENTS & VERIFICATION */}
      <section className="py-16 sm:py-24 bg-[#0B1F3A] text-white border-t border-slate-800/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* System Requirements (col-span-7) */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
                  Hardware Specifications
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mt-3 text-white">
                  Windows System Requirements
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <Laptop className="w-4 h-4" />
                    <span>Operating System</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Windows 10 / Windows 11</p>
                  <p className="text-xs text-slate-400">64-bit architecture (x64)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <Cpu className="w-4 h-4" />
                    <span>Processor (CPU)</span>
                  </div>
                  <p className="text-sm font-semibold text-white">Intel Core i3 / AMD Ryzen 3</p>
                  <p className="text-xs text-slate-400">2.0 GHz or higher (Dual-Core+)</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <Layers className="w-4 h-4" />
                    <span>Memory (RAM)</span>
                  </div>
                  <p className="text-sm font-semibold text-white">4 GB Minimum</p>
                  <p className="text-xs text-slate-400">8 GB RAM recommended for peak hours</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <HardDrive className="w-4 h-4" />
                    <span>Storage (Disk)</span>
                  </div>
                  <p className="text-sm font-semibold text-white">500 MB Free Space</p>
                  <p className="text-xs text-slate-400">Solid State Drive (SSD) recommended</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <Monitor className="w-4 h-4" />
                    <span>Display Resolution</span>
                  </div>
                  <p className="text-sm font-semibold text-white">1280 × 720 Minimum</p>
                  <p className="text-xs text-slate-400">1920 × 1080 Full HD recommended</p>
                </div>

                <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800">
                  <div className="flex items-center gap-2 text-[#F97316] text-xs font-bold uppercase tracking-wider mb-1">
                    <Printer className="w-4 h-4" />
                    <span>Receipt Printers</span>
                  </div>
                  <p className="text-sm font-semibold text-white">ESC/POS Thermal Printers</p>
                  <p className="text-xs text-slate-400">80mm / 58mm USB, COM, or Network</p>
                </div>
              </div>
            </div>

            {/* Verification & Build Checksums (col-span-5) */}
            <div className="lg:col-span-5 space-y-6">
              <div>
                <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
                  Package Integrity
                </span>
                <h2 className="text-2xl sm:text-3xl font-black font-heading tracking-tight mt-3 text-white">
                  Release Verification
                </h2>
              </div>

              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-[#071326] to-[#0B1F3A] border border-slate-800 space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Package</span>
                  <span className="font-mono font-semibold text-white">{RELEASE_INFO.installerFileName}</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Package Type</span>
                  <span className="font-semibold text-slate-200">NSIS Windows Setup Wizard</span>
                </div>

                <div className="flex items-center justify-between pb-3 border-b border-slate-800 text-xs">
                  <span className="text-slate-400">Code Signature</span>
                  <span className="font-semibold text-emerald-400 flex items-center gap-1">
                    <ShieldCheck className="w-3.5 h-3.5" />
                    SHA-256 Validated
                  </span>
                </div>

                <div>
                  <span className="text-xs text-slate-400 block mb-1.5 font-medium">SHA-256 Checksum</span>
                  <div className="p-2.5 rounded-lg bg-black/40 border border-slate-800 flex items-center justify-between gap-2">
                    <code className="text-[11px] font-mono text-slate-300 break-all select-all">
                      {RELEASE_INFO.sha256}
                    </code>
                    <button
                      onClick={handleCopyChecksum}
                      className="p-1.5 rounded-md hover:bg-white/10 text-slate-400 hover:text-white transition-colors shrink-0"
                      title="Copy SHA-256 Checksum"
                    >
                      {copiedChecksum ? (
                        <Check className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Verify the integrity of downloaded files using PowerShell: <br />
                  <code className="text-[10px] font-mono text-[#F97316] bg-black/30 px-1.5 py-0.5 rounded mt-1 inline-block">
                    Get-FileHash .\{RELEASE_INFO.installerFileName} -Algorithm SHA256
                  </code>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* RELEASE HISTORY TIMELINE */}
      <section id="release-history" className="py-16 sm:py-24 bg-[#08172C] text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
              Changelog
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mt-3 text-white">
              Release History
            </h2>
            <p className="text-slate-300 text-sm sm:text-base mt-2">
              Verified production deployment history and milestone records.
            </p>
          </div>

          <div className="space-y-6">
            {RELEASE_HISTORY.map((rel, idx) => (
              <div
                key={idx}
                className={`rounded-2xl p-6 sm:p-7 border transition-all ${
                  rel.isLatest
                    ? 'bg-gradient-to-r from-[#0F284B] to-[#0B1F3A] border-[#F97316]/50 shadow-lg'
                    : 'bg-slate-900/50 border-slate-800'
                }`}
              >
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div className="flex items-center gap-3">
                    <h3 className="text-xl font-black font-heading text-white">{rel.version}</h3>
                    <span className="text-xs font-mono text-slate-400 bg-slate-800 px-2.5 py-0.5 rounded">
                      {rel.build}
                    </span>
                    {rel.isLatest && (
                      <span className="text-[10px] uppercase font-extrabold bg-[#F97316] text-white px-2 py-0.5 rounded-full">
                        Current
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-slate-400 font-medium">{rel.date}</span>
                </div>

                <ul className="space-y-2 text-xs sm:text-sm text-slate-300">
                  {rel.highlights.map((item, hIdx) => (
                    <li key={hIdx} className="flex items-start gap-2">
                      <span className="text-[#F97316] font-bold mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ SECTION */}
      <section className="py-16 sm:py-24 bg-[#0B1F3A] text-white border-t border-slate-800/80">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-12 sm:mb-16">
            <span className="text-xs font-extrabold uppercase tracking-widest text-[#F97316] bg-[#F97316]/10 px-3 py-1 rounded-full border border-[#F97316]/20">
              Questions & Answers
            </span>
            <h2 className="text-3xl sm:text-4xl font-black font-heading tracking-tight mt-3 text-white">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="space-y-4">
            {FAQS.map((faq, idx) => {
              const isOpen = openFaq === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setOpenFaq(isOpen ? null : idx)}
                    className="w-full text-left px-6 py-4.5 flex items-center justify-between gap-4 cursor-pointer hover:bg-slate-800/40 transition-colors"
                  >
                    <span className="font-bold text-sm sm:text-base text-white">{faq.q}</span>
                    <ChevronDown
                      className={`w-5 h-5 text-slate-400 shrink-0 transition-transform duration-200 ${
                        isOpen ? 'rotate-180 text-[#F97316]' : ''
                      }`}
                    />
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/50">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* FINAL CALL TO ACTION */}
      <section className="relative py-20 sm:py-28 bg-gradient-to-b from-[#08172C] to-[#040C18] text-white overflow-hidden text-center border-t border-slate-800">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[300px] bg-[#F97316]/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 mb-6">
            <AshnoraLogo size={38} />
          </div>

          <h2 className="text-3xl sm:text-5xl font-black font-heading tracking-tight text-white">
            Ready to use Ashnora?
          </h2>
          <p className="text-slate-300 text-base sm:text-lg max-w-xl mx-auto mt-4 leading-relaxed">
            Download the latest Windows release. Experience lightning fast POS billing, kitchen routing, and live QR order management.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => handleDownloadWindows(false)}
              className="w-full sm:w-auto h-14 px-8 rounded-xl bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] hover:from-orange-500 hover:to-orange-600 text-white font-bold text-base shadow-xl shadow-orange-600/30 transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              <span>Download Ashnora v{RELEASE_INFO.version}</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={() => window.open('https://github.com/arun-pandian-p/Ashnora', '_blank')}
              className="w-full sm:w-auto h-14 px-7 rounded-xl bg-white/5 hover:bg-white/10 text-white border-white/20 font-semibold text-base transition-all cursor-pointer flex items-center justify-center gap-2"
            >
              <span>GitHub Repository</span>
              <ExternalLink className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <Footer />
    </MarketingLayout>
  );
};

export default DownloadPage;
