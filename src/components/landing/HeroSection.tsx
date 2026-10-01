import { motion, useScroll, useTransform } from 'framer-motion';
import { ArrowRight, Zap, ChevronDown, Play, Monitor, TrendingUp, Users, Cloud } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRef } from 'react';

interface HeroSectionProps {
  onGetStarted: () => void;
  onBookDemo: () => void;
  onWatchTour: () => void;
  cms?: Record<string, any>;
}

const featureBadges = [
  { title: 'POS', subtitle: 'Fast & Reliable', icon: Monitor },
  { title: 'Analytics', subtitle: 'Grow Smarter', icon: TrendingUp },
  { title: 'Staff', subtitle: 'Work Better', icon: Users },
  { title: 'Cloud', subtitle: 'Anytime, Anywhere', icon: Cloud }
];

const HeroSection = ({ onGetStarted, onBookDemo, onWatchTour, cms }: HeroSectionProps) => {
  const subtitle = cms?.subtitle || 'All-in-one POS and restaurant management software for modern food businesses.';
  const ctaText = cms?.cta_text || 'Start Free Trial';
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollY } = useScroll();
  const heroScale = useTransform(scrollY, [0, 600], [1, 0.98]);
  const heroOpacity = useTransform(scrollY, [0, 500], [1, 0.85]);
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });

  return (
    <section 
      ref={sectionRef} 
      className="relative min-h-[calc(100vh-5rem)] flex flex-col justify-between overflow-hidden bg-[#0B1F3A] text-white rounded-b-[2.5rem] sm:rounded-b-[3.5rem] lg:rounded-b-[4.5rem] shadow-[0_25px_70px_-15px_rgba(0,0,0,0.6)] border-b border-[#F97316]/25 z-20 pt-4 sm:pt-8"
    >
      {/* High-Resolution Atmospheric Restaurant Background Image */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <img
          src="/brand/hero-bg.png"
          alt="Ashnora Restaurant Experience"
          className="w-full h-full object-cover object-right md:object-center scale-[1.02] filter brightness-[0.95] contrast-[1.05]"
        />
        {/* Soft Multi-Layer Gradient Overlays for Enhanced Visibility + Crisp Text Readability */}
        <div 
          className="absolute inset-0"
          style={{
            background: `
              linear-gradient(90deg, rgba(11, 31, 58, 0.88) 0%, rgba(11, 31, 58, 0.65) 42%, rgba(11, 31, 58, 0.12) 75%, rgba(8, 23, 44, 0.4) 100%),
              linear-gradient(180deg, rgba(11, 31, 58, 0.6) 0%, transparent 40%, rgba(8, 23, 44, 0.75) 100%)
            `
          }}
        />
      </div>

      {/* Refined Subtle Tech Grid Over Background */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.4) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255, 255, 255, 0.4) 1px, transparent 1px)`,
          backgroundSize: '44px 44px',
        }} 
      />

      {/* Ambient Glow Orbs with Scroll Parallax */}
      <motion.div
        className="absolute top-1/4 -left-20 w-[380px] sm:w-[480px] h-[380px] sm:h-[480px] rounded-full bg-[#F97316]/10 blur-[130px] pointer-events-none z-[1]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, -80]) }}
      />
      <motion.div
        className="absolute top-1/3 right-4 w-[340px] sm:w-[460px] h-[340px] sm:h-[460px] rounded-full bg-amber-500/12 blur-[120px] pointer-events-none z-[1]"
        style={{ y: useTransform(scrollYProgress, [0, 1], [0, 60]) }}
      />

      {/* 3D Scroll Parallax Container */}
      <motion.div 
        style={{ scale: heroScale, opacity: heroOpacity }} 
        className="relative z-10 flex-1 flex flex-col justify-between w-full"
      >
        {/* Content Container */}
        <div className="flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 py-6 sm:py-10 lg:py-12 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-center w-full">
            
            {/* Left: Headline + Supporting Text + CTAs + 4 Feature Badges */}
            <div className="flex flex-col items-center lg:items-start text-center lg:text-left lg:col-span-6 w-full">
              {/* Responsive SaaS Headline: Smarter Operations. Better Restaurants. */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="font-heading font-extrabold text-white tracking-[-0.025em] sm:tracking-[-0.03em] leading-[1.08] sm:leading-[1.04] text-[32px] xs:text-[36px] sm:text-[44px] md:text-[50px] lg:text-[54px] xl:text-[60px] max-w-[620px] w-full drop-shadow-xs"
              >
                <span className="text-white">Smarter Operations.</span><br />
                <span className="bg-gradient-to-r from-[#F97316] via-[#FB923C] to-[#FDBA74] bg-clip-text text-transparent">
                  Better Restaurants.
                </span>
              </motion.h1>

              {/* Supporting Text */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="text-[15px] sm:text-[16px] lg:text-[18px] text-slate-300 max-w-[580px] mt-4 sm:mt-5 leading-[1.6] font-normal"
              >
                {subtitle}
              </motion.p>

              {/* 4 Feature Badges (POS, Analytics, Staff, Cloud) */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 w-full mt-6 sm:mt-7"
              >
                {featureBadges.map((badge) => {
                  const IconComponent = badge.icon;
                  return (
                    <div 
                      key={badge.title} 
                      className="flex flex-col items-center lg:items-start text-center lg:text-left p-3 rounded-xl bg-white/[0.04] backdrop-blur-xs border border-white/[0.08] hover:border-[#F97316]/50 hover:bg-white/[0.07] transition-all group shadow-2xs"
                    >
                      <div className="w-9 h-9 rounded-full bg-[#F97316]/20 border border-[#F97316]/40 flex items-center justify-center mb-2 group-hover:scale-105 group-hover:bg-[#F97316]/30 transition-all shadow-xs">
                        <IconComponent className="w-4 h-4 text-[#F97316]" />
                      </div>
                      <span className="text-xs sm:text-sm font-bold text-white font-heading">
                        {badge.title}
                      </span>
                      <span className="text-[11px] text-slate-400 font-medium mt-0.5 leading-tight">
                        {badge.subtitle}
                      </span>
                    </div>
                  );
                })}
              </motion.div>

              {/* CTA Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.65, duration: 0.6 }}
                className="flex flex-col sm:flex-row flex-wrap items-center lg:items-start gap-3 w-full sm:w-auto mt-6 sm:mt-8"
              >
                <Button
                  size="lg"
                  className="type-button w-full sm:w-auto h-[48px] sm:h-[52px] px-6 sm:px-7 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white shadow-[0_4px_22px_rgba(249,115,22,0.4)] group font-bold transition-all active:scale-95 cursor-pointer"
                  onClick={onGetStarted}
                >
                  <Zap className="w-4 h-4 mr-1.5 fill-current" />
                  {ctaText}
                  <ArrowRight className="ml-1.5 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>

                <Button
                  size="lg"
                  className="type-button w-full sm:w-auto h-[48px] sm:h-[52px] px-6 rounded-xl bg-white text-[#0B1F3A] hover:bg-slate-100 font-semibold shadow-[0_4px_16px_rgba(0,0,0,0.18)] transition-all active:scale-95 cursor-pointer"
                  onClick={onBookDemo}
                >
                  Book Demo
                </Button>

                <Button
                  size="lg"
                  variant="outline"
                  className="type-button w-full sm:w-auto h-[48px] sm:h-[52px] px-5 rounded-xl border-white/25 bg-white/[0.04] backdrop-blur-xs text-slate-200 hover:text-white hover:bg-white/10 font-medium transition-all cursor-pointer"
                  onClick={onWatchTour}
                >
                  <Play className="w-4 h-4 mr-1.5 fill-current" />
                  Watch Tour
                </Button>
              </motion.div>
            </div>

            {/* Right: Ashnora Product Showcase Visual with Luxury Ambient Glow */}
            <div className="relative w-full lg:col-span-6 flex items-center justify-center mt-6 sm:mt-8 lg:mt-0">
              {/* Dual-Layered Ambient Glow */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#F97316]/25 via-amber-500/15 to-transparent blur-[90px] rounded-full scale-105 -z-10 pointer-events-none" />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 bg-blue-600/10 blur-[100px] rounded-full -z-10 pointer-events-none" />

              {/* Multi-Device Suite Visual */}
              <motion.div
                initial={{ opacity: 0, scale: 0.94, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.75, ease: "easeOut" }}
                className="relative w-full max-w-[360px] xs:max-w-[420px] sm:max-w-[500px] md:max-w-[560px] lg:max-w-none flex items-center justify-center drop-shadow-[0_30px_60px_rgba(0,0,0,0.65)] group"
              >
                <img
                  src="/brand/ashnora-hero-suite.png"
                  alt="Ashnora Restaurant Suite — POS, Dashboard, KDS, and Mobile Ordering"
                  className="w-full h-auto max-h-[300px] sm:max-h-[380px] md:max-h-[440px] lg:max-h-[500px] xl:max-h-[540px] object-contain transition-transform duration-500 group-hover:scale-[1.015]"
                />
              </motion.div>
            </div>

          </div>
        </div>

        {/* Subtle Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          className="pb-4 sm:pb-6 lg:pb-8 flex justify-center pointer-events-none"
        >
          <motion.div
            animate={{ y: [0, 5, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            <ChevronDown className="w-5 h-5 text-white/30" />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default HeroSection;