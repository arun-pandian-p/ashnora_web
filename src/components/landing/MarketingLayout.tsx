import { ReactNode, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LogIn, X, Globe, ArrowUpRight, Clock, Facebook, Instagram, Linkedin, Twitter, Youtube, ChevronDown 
} from 'lucide-react';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';
import { Button } from '@/components/ui/button';
import { toast } from '@/hooks/use-toast';

const TikTokIcon = ({ className = "w-4 h-4" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743 2.895 2.895 0 0 1 2.31-4.644c.314 0 .619.05.904.144V9.37a6.332 6.332 0 0 0-.904-.066 6.34 6.34 0 0 0-6.339 6.34 6.34 6.34 0 0 0 6.339 6.34 6.34 6.34 0 0 0 6.339-6.34V8.583a8.197 8.197 0 0 0 4.766 1.517v-3.414z" />
  </svg>
);

interface MarketingLayoutProps {
  children: ReactNode;
}

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMenuOpen(false);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [menuOpen]);

  const [currentTime, setCurrentTime] = useState(() => {
    return new Date().toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true
    });
  });

  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(
        new Date().toLocaleTimeString('en-US', {
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: true
        })
      );
    };
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const [countdown, setCountdown] = useState({
    days: 14,
    hours: 8,
    minutes: 42,
    seconds: 19
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [openDropdowns, setOpenDropdowns] = useState<Record<string, boolean>>({
    billing_sales: true,
    kitchen_ops: true,
    growth_insights: true,
    restaurant_mgmt: true,
    smart_tools: true,
    pricing: true,
    demo_section: true,
    connect_section: true,
    quick_nav: true,
  });

  const toggleDropdown = (id: string) => {
    setOpenDropdowns((prev) => ({
      ...prev,
      [id]: prev[id] === undefined ? false : !prev[id],
    }));
  };

  const desktopNavColumns = [
    {
      columnId: 'product',
      title: 'PRODUCT',
      tagline: 'Complete Restaurant Operating System',
      sections: [
        {
          id: 'billing_sales',
          title: 'BILLING & SALES',
          items: [
            { name: 'POS', href: '/#features' },
            { name: 'Payments', href: '/#features' },
            { name: 'Orders', href: '/#features' },
            { name: 'Reservations', href: '/#features' },
          ],
        },
        {
          id: 'kitchen_ops',
          title: 'KITCHEN & OPERATIONS',
          items: [
            { name: 'KDS', href: '/#features' },
            { name: 'Inventory', href: '/#features' },
            { name: 'Staff', href: '/#features' },
            { name: 'Tables', href: '/#features' },
          ],
        },
        {
          id: 'growth_insights',
          title: 'GROWTH & INSIGHTS',
          items: [
            { name: 'Analytics', href: '/#features' },
            { name: 'Customers', href: '/#features' },
            { name: 'Marketing', href: '/#features' },
            { name: 'Reports', href: '/#features' },
          ],
        },
      ],
    },
    {
      columnId: 'platform',
      title: 'PLATFORM',
      tagline: 'Tools that help you run and grow',
      sections: [
        {
          id: 'restaurant_mgmt',
          title: 'RESTAURANT MANAGEMENT',
          items: [
            { name: 'Restaurant Tools', href: '/#features' },
            { name: 'Multiple Locations', href: '/#features' },
          ],
        },
        {
          id: 'smart_tools',
          title: 'SMART TOOLS',
          items: [
            { name: 'Automation', href: '/#features' },
            { name: 'Integrations', href: '/#features' },
          ],
        },
        {
          id: 'pricing',
          title: 'PRICING',
          items: [
            { name: 'Starter', href: '/#features' },
            { name: 'Moderate', href: '/#features' },
            { name: 'Business', href: '/#features' },
            { name: 'Scale', href: '/#features' },
          ],
        },
      ],
    },
    {
      columnId: 'demo_connect',
      title: 'CONNECT',
      tagline: 'See Ashnora in action & get in touch',
      sections: [
        {
          id: 'demo_section',
          title: 'DEMO',
          items: [
            { name: 'Download Desktop OS', href: '/download' },
            { name: 'Book a Demo', href: '/login' },
          ],
        },
        {
          id: 'connect_section',
          title: 'CONNECT',
          items: [
            { name: 'Contact', href: '/#faq' },
            { name: 'Book a Demo', href: '/login' },
          ],
        },
        {
          id: 'quick_nav',
          title: 'NAVIGATION',
          items: [
            { name: 'Home', href: '/' },
            { name: 'Features', href: '/#features' },
            { name: 'Results', href: '/#proof' },
            { name: 'FAQ', href: '/#faq' },
          ],
        },
      ],
    },
  ];


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleGetStarted = () => {
    setMenuOpen(false);
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col justify-between relative">
      {/* SaaS Dynamic Header (Transparent at Top, Floating Capsule when Scrolled) */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 pointer-events-none ${
          isScrolled ? 'pt-3 sm:pt-4 px-4 sm:px-6' : 'pt-4 sm:pt-6 px-6 sm:px-8 lg:px-12'
        }`}
      >
        <div
          className={`mx-auto transition-all duration-300 pointer-events-auto ${
            isScrolled
              ? 'max-w-[960px] bg-white/95 backdrop-blur-xl border border-slate-200/90 shadow-[0_12px_40px_-8px_rgba(0,0,0,0.18)] rounded-full px-5 sm:px-7 py-2.5 sm:py-3'
              : 'max-w-[1400px] bg-transparent border-transparent px-0 py-0'
          }`}
        >
          <div className="flex items-center justify-between relative">
            {/* Left: Ashnora Logo Icon (Clean Transparent Variant) */}
            <div 
              className="flex items-center cursor-pointer" 
              onClick={() => navigate('/')}
            >
              <img
                src="/brand/ashnora-logo-clean.png"
                alt="Ashnora"
                className={`w-auto object-contain shrink-0 hover:scale-105 transition-all duration-300 ${
                  isScrolled ? 'h-9 sm:h-10' : 'h-10 sm:h-11 drop-shadow-md'
                }`}
              />
            </div>

            {/* Center: Ashnora Wordmark */}
            <div 
              className="absolute left-1/2 -translate-x-1/2 flex items-center justify-center cursor-pointer"
              onClick={() => navigate('/')}
            >
              <span className={`font-black tracking-tight font-sans flex items-center select-none transition-all duration-300 ${
                isScrolled ? 'text-xl sm:text-[22px]' : 'text-2xl sm:text-[26px] drop-shadow-md'
              }`}>
                <span className={isScrolled ? "text-[#0B1F3A]" : "text-white"}>Ash</span>
                <span className="text-[#F97316]">nora</span>
              </span>
            </div>

            {/* Right: Circular Hamburger Button */}
            <div className="flex items-center">
              <button
                type="button"
                onClick={() => setMenuOpen(!menuOpen)}
                aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
                className={`rounded-full flex flex-col items-center justify-center gap-[5px] transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-[#F97316]/30 active:scale-95 cursor-pointer ${
                  isScrolled
                    ? 'w-10 h-10 sm:w-11 sm:h-11 border border-slate-200 bg-white hover:bg-slate-50 shadow-xs'
                    : 'w-11 h-11 sm:w-12 sm:h-12 border border-white/20 bg-white/10 hover:bg-white/20 backdrop-blur-xs shadow-md'
                }`}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`w-5 h-[2px] rounded-full block origin-center ${isScrolled ? 'bg-[#0B1F3A]' : 'bg-white'}`}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -3.5 } : { rotate: 0, y: 0 }}
                  transition={{ duration: 0.15, ease: "easeOut" }}
                  className={`w-5 h-[2px] rounded-full block origin-center ${isScrolled ? 'bg-[#0B1F3A]' : 'bg-white'}`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Large Premium Navigation Overlay Panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18, ease: "easeOut" }}
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 bg-[#0B1F3A]/60 backdrop-blur-md z-50 flex items-center justify-center p-3 sm:p-5 lg:p-6 overflow-y-auto"
          >
            {/* White Rounded Navigation Panel */}
            <motion.div
              initial={{ opacity: 0, scale: 0.985, y: 8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.985, y: 8 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-[1400px] bg-white rounded-3xl sm:rounded-[2rem] shadow-[0_20px_80px_rgba(0,0,0,0.18)] border border-slate-100 p-6 sm:p-8 lg:p-10 my-auto min-h-[calc(100vh-32px)] flex flex-col justify-between overflow-y-auto max-h-[96vh]"
            >
              {/* Top Bar Header inside Menu */}
              <div>
                <div className="flex items-center justify-between pb-5 sm:pb-6">
                  {/* Left: Brand Badge */}
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-slate-200/80 bg-slate-50/80 text-slate-700 font-semibold text-xs tracking-wide select-none shadow-2xs">
                    <span className="w-2 h-2 rounded-full bg-[#F97316] animate-pulse" />
                    <span className="font-heading font-bold text-[#0B1F3A]">Ashnora</span>
                  </div>

                  {/* Center: Brand Logo */}
                  <div
                    className="flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/');
                    }}
                  >
                    <AshnoraLogo size={36} />
                  </div>

                  {/* Right: Large Circular Close Button with White X */}
                  <button
                    type="button"
                    onClick={() => setMenuOpen(false)}
                    aria-label="Close menu"
                    className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#0B1F3A] hover:bg-[#071526] text-white flex items-center justify-center transition-all duration-200 shadow-md cursor-pointer hover:scale-105 active:scale-95"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>

                {/* Thin Horizontal Divider */}
                <div className="border-t border-slate-100" />
              </div>

              {/* Main Content Area */}
              <div className="py-6 sm:py-8 flex-1">
                {/* Desktop & Large Tablet: Mega-Menu Area (md+) */}
                <div className="hidden md:grid md:grid-cols-12 gap-8 lg:gap-10 xl:gap-12 items-start">
                  {/* Left Main Navigation Area (md:col-span-8 lg:col-span-8 xl:col-span-8) */}
                  <div className="md:col-span-8">
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-7">
                      {desktopNavColumns.map((col) => (
                        <div key={col.columnId} className="space-y-4">
                          {/* Column Header & Tagline */}
                          <div className="pb-2.5 border-b border-slate-100 flex flex-col gap-0.5">
                            <div className="flex items-center gap-1.5">
                              <span className="text-[12px] uppercase tracking-[0.08em] font-extrabold text-[#F97316]">
                                {col.title}
                              </span>
                              <span className="text-slate-300 text-xs">•</span>
                            </div>
                            <span className="text-[11.5px] font-medium text-slate-500 leading-snug">
                              {col.tagline}
                            </span>
                          </div>

                          {/* Accordion Dropdowns (Image 1 Style with Left Border & Caret) */}
                          <div className="space-y-3">
                            {col.sections.map((sec) => {
                              const isOpen = openDropdowns[sec.id] !== false;
                              return (
                                <div key={sec.id} className="space-y-1">
                                  {/* Dropdown Header Pill */}
                                  <button
                                    type="button"
                                    onClick={() => toggleDropdown(sec.id)}
                                    className="w-full flex items-center justify-between px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200/80 text-[#0B1F3A] font-bold text-[11.5px] uppercase tracking-wider transition-all cursor-pointer group shadow-2xs"
                                  >
                                    <span className="group-hover:text-[#F97316] transition-colors">{sec.title}</span>
                                    <ChevronDown
                                      className={`w-3.5 h-3.5 text-slate-400 group-hover:text-[#F97316] transition-transform duration-200 ${
                                        isOpen ? 'rotate-180' : 'rotate-0'
                                      }`}
                                    />
                                  </button>

                                  {/* Indented Dropdown Content with Vertical Orange Line */}
                                  {isOpen && (
                                    <div className="border-l-2 border-[#F97316] pl-3 ml-2 my-1.5 space-y-1.5 animate-in fade-in-50 duration-150">
                                      {sec.items.map((item) => (
                                        <a
                                          key={item.name}
                                          href={item.href}
                                          onClick={() => setMenuOpen(false)}
                                          className="group block text-left py-1 px-1.5 rounded-md hover:bg-slate-50/80 cursor-pointer transition-all duration-150 hover:translate-x-1"
                                        >
                                          <span className="font-semibold text-[13.5px] text-[#0F172A] group-hover:text-[#F97316] transition-colors block">
                                            {item.name}
                                          </span>
                                        </a>
                                      ))}
                                    </div>
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right Side: Compact Promotional Feature Card + Offer Countdown Card (md:col-span-4 lg:col-span-4 xl:col-span-4) */}
                  <div className="md:col-span-4 flex flex-col gap-3">
                    {/* Card 1: Compact Restaurant Software Card */}
                    <div className="group relative bg-gradient-to-br from-[#0B1F3A] via-[#0D2444] to-[#08172C] rounded-2xl p-4 lg:p-4.5 text-white overflow-hidden shadow-lg border border-[#F97316]/25 flex flex-col justify-between hover:border-[#F97316]/45 transition-all duration-300">
                      {/* Ambient Glows */}
                      <div className="absolute top-0 right-0 w-32 h-32 bg-[#F97316]/15 rounded-full blur-xl pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-2">
                          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/10 backdrop-blur-md text-[#F97316] text-[10px] font-bold uppercase tracking-wider border border-[#F97316]/30">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316]" />
                            Restaurant Software
                          </span>
                        </div>

                        <h4 className="text-[15px] lg:text-[16px] font-bold text-white font-heading leading-snug tracking-tight">
                          Everything your restaurant needs in one place.
                        </h4>
                        <p className="text-[11px] sm:text-[12px] text-slate-300 mt-1 leading-relaxed">
                          Fast billing, kitchen orders, inventory tracking, and reports.
                        </p>

                        {/* Device Suite Mini Preview Banner */}
                        <div className="mt-2.5 relative rounded-xl overflow-hidden bg-black/25 border border-white/10 p-1.5 flex items-center justify-center group-hover:border-[#F97316]/30 transition-colors">
                          <img
                            src="/brand/ashnora-hero-suite.png"
                            alt="Ashnora Restaurant System"
                            className="w-full h-16 sm:h-20 object-contain drop-shadow-md group-hover:scale-105 transition-transform duration-300"
                          />
                        </div>
                      </div>

                      <div className="relative z-10 pt-3 flex items-center justify-between">
                        <Button
                          size="sm"
                          className="type-button bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-xs px-3 h-8.5 rounded-lg transition-all shadow-sm group cursor-pointer w-full flex items-center justify-center gap-1.5"
                          onClick={handleGetStarted}
                        >
                          <span>Explore Features</span>
                          <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                        </Button>
                      </div>
                    </div>

                    {/* Card 2: Compact Limited Time Offer Countdown Timer Card */}
                    <div className="relative bg-gradient-to-br from-[#FFF8F1] via-[#FFF5EB] to-[#FEEEDD] rounded-2xl p-3.5 sm:p-4 border border-[#F97316]/25 shadow-sm flex flex-col justify-between overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-[#F97316]/10 rounded-full blur-lg pointer-events-none" />

                      <div className="relative z-10">
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] flex items-center gap-1.5">
                            <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
                            🔥 Special Launch Offer
                          </span>
                          <span className="text-[9px] font-extrabold bg-[#F97316] text-white px-2 py-0.5 rounded-full shadow-xs">
                            50% OFF
                          </span>
                        </div>
                        <p className="text-[11px] text-slate-700 font-medium mb-2.5">
                          Claim 50% off your first 3 months — offer expiring soon!
                        </p>

                        {/* 4 Countdown Boxes */}
                        <div className="grid grid-cols-4 gap-1.5 text-center">
                          <div className="bg-white/95 backdrop-blur-xs rounded-lg p-1.5 border border-[#F97316]/15 shadow-2xs">
                            <span className="text-sm sm:text-base font-black text-[#0B1F3A] block leading-none font-heading">
                              {String(countdown.days).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-0.5 block">
                              Days
                            </span>
                          </div>
                          <div className="bg-white/95 backdrop-blur-xs rounded-lg p-1.5 border border-[#F97316]/15 shadow-2xs">
                            <span className="text-sm sm:text-base font-black text-[#0B1F3A] block leading-none font-heading">
                              {String(countdown.hours).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-0.5 block">
                              Hours
                            </span>
                          </div>
                          <div className="bg-white/95 backdrop-blur-xs rounded-lg p-1.5 border border-[#F97316]/15 shadow-2xs">
                            <span className="text-sm sm:text-base font-black text-[#0B1F3A] block leading-none font-heading">
                              {String(countdown.minutes).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-slate-500 uppercase font-bold tracking-wider mt-0.5 block">
                              Mins
                            </span>
                          </div>
                          <div className="bg-white/95 backdrop-blur-xs rounded-lg p-1.5 border border-[#F97316]/25 shadow-2xs bg-orange-50/60">
                            <span className="text-sm sm:text-base font-black text-[#F97316] block leading-none font-heading">
                              {String(countdown.seconds).padStart(2, '0')}
                            </span>
                            <span className="text-[8px] sm:text-[9px] text-[#EA580C] uppercase font-bold tracking-wider mt-0.5 block">
                              Secs
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="relative z-10 pt-2.5">
                        <Button
                          size="sm"
                          className="type-button w-full bg-[#0B1F3A] hover:bg-[#071526] text-white font-bold text-xs h-8.5 rounded-lg shadow-sm cursor-pointer active:scale-98 transition-all flex items-center justify-center gap-1"
                          onClick={handleGetStarted}
                        >
                          <span>Claim 50% Discount Now</span>
                          <span>→</span>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile: Clean Vertical Navigation (< md) */}
                <div className="md:hidden space-y-4">
                  {/* Navigation Links */}
                  <nav className="flex flex-col">
                    {[
                      { label: 'Home', href: '/' },
                      { label: 'Features', href: '/#features' },
                      { label: 'Results', href: '/#proof' },
                      { label: 'FAQ', href: '/#faq' }
                    ].map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        onClick={() => setMenuOpen(false)}
                        className="group flex items-center justify-between py-2.5 px-3 rounded-xl hover:bg-slate-50 transition-colors"
                      >
                        <span className="text-[16px] font-semibold text-[#0F172A] group-hover:text-[#F97316] transition-colors">
                          {link.label}
                        </span>
                        <span className="text-slate-300 group-hover:text-[#F97316] transition-colors text-sm">→</span>
                      </a>
                    ))}
                  </nav>

                  {/* Divider */}
                  <div className="border-t border-slate-100" />

                  {/* Product — compact 3-col grid */}
                  <div>
                    <span className="text-[10px] uppercase tracking-[0.1em] font-bold text-[#94A3B8] block mb-2 px-1">
                      Product
                    </span>
                    <div className="grid grid-cols-3 gap-1.5">
                      {['POS', 'KDS', 'Orders', 'Inventory', 'Analytics', 'Staff', 'Tables', 'Reports', 'Payments'].map((item) => (
                        <a
                          key={item}
                          href="/#features"
                          onClick={() => setMenuOpen(false)}
                          className="py-2 px-2.5 rounded-lg text-[13px] font-semibold text-[#0F172A] bg-slate-50/80 hover:bg-[#F97316]/10 hover:text-[#F97316] transition-colors text-center"
                        >
                          {item}
                        </a>
                      ))}
                    </div>
                  </div>

                  {/* Divider */}
                  <div className="border-t border-slate-100" />

                  {/* Special Offer — compact */}
                  <div className="relative bg-gradient-to-r from-[#FFF8F1] to-[#FEEEDD] rounded-xl p-3 border border-[#F97316]/20">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#EA580C] flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#F97316] animate-ping" />
                        Launch Offer
                      </span>
                      <span className="text-[9px] font-extrabold bg-[#F97316] text-white px-2 py-0.5 rounded-full">
                        50% OFF
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-1 text-center mb-2.5">
                      <div className="bg-white rounded-md py-1 border border-slate-200/80">
                        <span className="text-xs font-black text-[#0B1F3A] block leading-tight">{String(countdown.days).padStart(2, '0')}</span>
                        <span className="text-[7px] text-slate-500 uppercase font-bold">Days</span>
                      </div>
                      <div className="bg-white rounded-md py-1 border border-slate-200/80">
                        <span className="text-xs font-black text-[#0B1F3A] block leading-tight">{String(countdown.hours).padStart(2, '0')}</span>
                        <span className="text-[7px] text-slate-500 uppercase font-bold">Hrs</span>
                      </div>
                      <div className="bg-white rounded-md py-1 border border-slate-200/80">
                        <span className="text-xs font-black text-[#0B1F3A] block leading-tight">{String(countdown.minutes).padStart(2, '0')}</span>
                        <span className="text-[7px] text-slate-500 uppercase font-bold">Min</span>
                      </div>
                      <div className="bg-white rounded-md py-1 border border-[#F97316]/30 bg-orange-50/50">
                        <span className="text-xs font-black text-[#F97316] block leading-tight">{String(countdown.seconds).padStart(2, '0')}</span>
                        <span className="text-[7px] text-[#EA580C] uppercase font-bold">Sec</span>
                      </div>
                    </div>
                    <Button
                      size="sm"
                      className="type-button w-full bg-[#0B1F3A] text-white font-bold text-xs h-8 rounded-lg"
                      onClick={handleGetStarted}
                    >
                      Claim 50% Discount →
                    </Button>
                  </div>
                </div>
              </div>

              {/* Bottom Actions Section (All Breakpoints) */}
              <div className="pt-6 border-t border-slate-100">
                <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                    {/* Primary: Start Free Trial */}
                    <Button
                      className="type-button w-full sm:w-auto h-[48px] sm:h-[52px] px-7 justify-center bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-[15px] sm:text-[16px] shadow-sm rounded-xl cursor-pointer active:scale-95 transition-all"
                      onClick={handleGetStarted}
                    >
                      Start Free Trial
                    </Button>

                    {/* Secondary: Book Demo */}
                    <Button
                      variant="outline"
                      className="type-button w-full sm:w-auto h-[48px] sm:h-[52px] px-6 justify-center bg-white text-[#0B1F3A] hover:bg-slate-50 border border-[#CBD5E1] font-bold text-[15px] sm:text-[16px] rounded-xl cursor-pointer active:scale-95 transition-all"
                      onClick={() => {
                        setMenuOpen(false);
                        navigate('/login');
                      }}
                    >
                      Book Demo
                    </Button>
                  </div>

                  {/* Right: Login Text Button */}
                  <Button
                    variant="ghost"
                    className="type-button w-full sm:w-auto h-[48px] justify-center text-[#0B1F3A] hover:text-[#0B1F3A] hover:bg-slate-100 font-semibold text-[15px] px-4 cursor-pointer"
                    onClick={() => {
                      setMenuOpen(false);
                      navigate('/login');
                    }}
                  >
                    <LogIn className="w-4 h-4 mr-2 text-[#0B1F3A]" />
                    Login
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="pt-20 sm:pt-24 flex-grow">
        {children}
      </main>
    </div>
  );
}
