import { motion } from 'framer-motion';
import { ChefHat, CreditCard, Settings, Users, ArrowRight, Utensils, Monitor, Smartphone, Receipt, Sparkles } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';

const Index = () => {
  const navigate = useNavigate();

  const roleCards = [
    {
      id: 'kitchen',
      title: 'Kitchen',
      description: 'Manage orders & prep times',
      actionText: 'Open Kitchen',
      path: '/kitchen',
      icon: ChefHat,
      badgeBg: 'bg-sky-50 dark:bg-sky-950/40 text-sky-500 border border-sky-100 dark:border-sky-900/40',
      actionColor: 'text-sky-500 hover:text-sky-600',
      watermarkIcon: ChefHat,
      watermarkColor: 'text-sky-400/15',
      cornerGradient: 'from-sky-500/[0.04] to-transparent',
    },
    {
      id: 'waiter',
      title: 'Waiter',
      description: 'Tables, calls & order tracking',
      actionText: 'Open Waiter',
      path: '/waiter',
      icon: Users,
      badgeBg: 'bg-purple-50 dark:bg-purple-950/40 text-purple-600 border border-purple-100 dark:border-purple-900/40',
      actionColor: 'text-purple-600 hover:text-purple-700',
      watermarkIcon: Utensils,
      watermarkColor: 'text-purple-400/15',
      cornerGradient: 'from-purple-500/[0.04] to-transparent',
    },
    {
      id: 'billing',
      title: 'Billing',
      description: 'Process payments & receipts',
      actionText: 'Open Billing',
      path: '/billing',
      icon: CreditCard,
      badgeBg: 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-500 border border-emerald-100 dark:border-emerald-900/40',
      actionColor: 'text-emerald-500 hover:text-emerald-600',
      watermarkIcon: Receipt,
      watermarkColor: 'text-emerald-400/15',
      cornerGradient: 'from-emerald-500/[0.04] to-transparent',
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Manage restaurant settings',
      actionText: 'Open Admin',
      path: '/admin',
      icon: Settings,
      badgeBg: 'bg-fuchsia-50 dark:bg-fuchsia-950/40 text-fuchsia-500 border border-fuchsia-100 dark:border-fuchsia-900/40',
      actionColor: 'text-fuchsia-500 hover:text-fuchsia-600',
      watermarkIcon: Settings,
      watermarkColor: 'text-fuchsia-400/15',
      cornerGradient: 'from-fuchsia-500/[0.04] to-transparent',
    },
  ];

  const systemFeatures = [
    {
      icon: Utensils,
      title: 'Digital Menu',
      desc: 'Online menu & QR ordering',
      iconBg: 'bg-amber-50 text-amber-500 dark:bg-amber-950/30',
    },
    {
      icon: ChefHat,
      title: 'Kitchen Display',
      desc: 'Real-time kitchen orders',
      iconBg: 'bg-orange-50 text-orange-500 dark:bg-orange-950/30',
    },
    {
      icon: Users,
      title: 'Waiter Tablet',
      desc: 'Table management',
      iconBg: 'bg-purple-50 text-purple-600 dark:bg-purple-950/30',
    },
    {
      icon: CreditCard,
      title: 'POS Billing',
      desc: 'Fast & secure payments',
      iconBg: 'bg-emerald-50 text-emerald-500 dark:bg-emerald-950/30',
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8fafc] dark:bg-zinc-950 text-slate-900 dark:text-zinc-50 flex flex-col justify-between select-none">
      <div className="container mx-auto px-4 md:px-8 py-6 max-w-7xl">
        {/* Top Header Logo */}
        <header className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <AshnoraLogo size={42} showWordmark={true} />
          </div>
        </header>

        {/* Hero Banner Section */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative rounded-[2rem] bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm overflow-hidden mb-6"
        >
          {/* Soft background glow accents */}
          <div className="absolute right-0 top-0 w-1/2 h-full bg-gradient-to-l from-orange-500/10 via-amber-500/5 to-transparent pointer-events-none" />
          <div className="absolute right-12 top-1/2 -translate-y-1/2 w-80 h-80 rounded-full bg-orange-400/10 blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center p-8 md:p-12 relative z-10">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-4">
              <div className="space-y-1.5">
                <span className="text-xs md:text-sm font-extrabold tracking-wider text-orange-500 uppercase">
                  WELCOME TO ASHNORA
                </span>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15]">
                  Scan, Order, Track, <span className="text-orange-500">Pay</span>
                </h1>
              </div>

              <p className="text-slate-500 dark:text-zinc-400 text-sm md:text-base max-w-lg leading-relaxed">
                Complete digital ordering system for modern restaurants.
                <br />
                Select your role below to get started.
              </p>

              {/* Decorative Accent Pill */}
              <div className="w-14 h-1.5 bg-orange-500 rounded-full mt-2" />
            </div>

            {/* Right Food Visual & Callout */}
            <div className="lg:col-span-5 relative flex items-center justify-center min-h-[220px]">
              {/* Handwritten "Good Food Good Mood" Script & Sparkles */}
              <div className="absolute right-4 md:right-8 -top-2 z-20 flex flex-col items-end">
                <span className="font-serif italic font-bold text-orange-500 text-lg md:text-xl transform -rotate-6 tracking-wide drop-shadow-sm">
                  Good Food
                </span>
                <span className="font-serif italic font-bold text-orange-500 text-lg md:text-xl transform -rotate-6 tracking-wide drop-shadow-sm flex items-center gap-1">
                  Good Mood <Sparkles className="w-3.5 h-3.5 text-amber-400 inline" />
                </span>
              </div>

              {/* Food Plate Visual */}
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="relative w-64 md:w-80 h-48 md:h-60 rounded-3xl overflow-hidden shadow-md border border-orange-100/60 dark:border-zinc-800"
              >
                <img
                  src="/brand/hero-food-plate.jpg"
                  alt="Ashnora Gourmet Dining"
                  className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-700"
                />
              </motion.div>
            </div>
          </div>
        </motion.div>

        {/* 4 Role Selection Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
          {roleCards.map((card, index) => {
            const IconComponent = card.icon;
            const WatermarkComponent = card.watermarkIcon;

            return (
              <motion.button
                key={card.id}
                onClick={() => navigate(card.path)}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: index * 0.08 }}
                className="group relative rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 p-6 text-left shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden flex flex-col justify-between h-[185px] focus:outline-none focus:ring-2 focus:ring-primary/20"
              >
                {/* Background corner gradient & watermark */}
                <div className={`absolute inset-0 bg-gradient-to-br ${card.cornerGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none`} />
                <WatermarkComponent className={`absolute -bottom-4 -right-4 w-24 h-24 ${card.watermarkColor} transition-transform duration-500 group-hover:scale-110 pointer-events-none`} />

                <div>
                  {/* Badge Icon */}
                  <div className={`w-12 h-12 rounded-xl ${card.badgeBg} flex items-center justify-center mb-3.5 shadow-sm group-hover:scale-105 transition-transform duration-300`}>
                    <IconComponent className="w-6 h-6 stroke-[2.2]" />
                  </div>

                  {/* Title & Description */}
                  <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-0.5 tracking-tight">
                    {card.title}
                  </h2>
                  <p className="text-slate-400 dark:text-zinc-400 text-xs leading-relaxed">
                    {card.description}
                  </p>
                </div>

                {/* Action Link */}
                <div className={`flex items-center gap-1.5 text-xs font-bold ${card.actionColor} transition-all mt-3 group-hover:translate-x-1 duration-200`}>
                  <span>{card.actionText}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </motion.button>
            );
          })}
        </div>

        {/* Bottom System Features Card */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="relative rounded-2xl bg-white dark:bg-zinc-900 border border-slate-100 dark:border-zinc-800 shadow-sm p-6 md:p-8 overflow-hidden"
        >
          {/* Subtle Orange Glow in right corner */}
          <div className="absolute -right-12 -bottom-12 w-48 h-48 rounded-full bg-orange-400/10 blur-2xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
            {/* Left Header */}
            <div className="space-y-1 w-full lg:w-auto text-left">
              <div className="w-8 h-1 bg-orange-500 rounded-full mb-1.5" />
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">System Features</h2>
              <p className="text-xs text-slate-400 dark:text-zinc-400">Everything you need to run your restaurant smoothly.</p>
            </div>

            {/* 4 Feature Items with divider */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 w-full lg:w-auto flex-1 max-w-3xl">
              {systemFeatures.map((feat, idx) => {
                const FeatIcon = feat.icon;
                return (
                  <div key={idx} className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl ${feat.iconBg} flex items-center justify-center shrink-0`}>
                      <FeatIcon className="w-5 h-5" />
                    </div>
                    <div className="text-left">
                      <div className="text-xs font-bold text-slate-800 dark:text-zinc-200">{feat.title}</div>
                      <div className="text-[11px] text-slate-400 dark:text-zinc-400">{feat.desc}</div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Right Callout: Streamline Your Restaurant */}
            <div className="flex items-center gap-3 w-full lg:w-auto justify-end">
              <div className="text-right">
                <span className="font-serif italic font-bold text-orange-500 text-sm md:text-base leading-tight block">
                  Streamline
                </span>
                <span className="font-serif italic font-bold text-orange-500 text-sm md:text-base leading-tight block">
                  Your Restaurant
                </span>
              </div>
              <button
                onClick={() => navigate('/admin')}
                className="w-9 h-9 rounded-full bg-orange-500 hover:bg-orange-600 text-white flex items-center justify-center transition-transform hover:scale-105 shadow-md shadow-orange-500/20 shrink-0"
                title="Open Admin"
              >
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Footer */}
      <footer className="py-4 text-center text-xs text-slate-400 dark:text-zinc-500">
        © 2026 Ashnora Inc. All rights reserved.
      </footer>
    </div>
  );
};

export default Index;
