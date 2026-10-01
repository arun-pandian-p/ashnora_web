import { motion } from 'framer-motion';
import { ArrowRight, Zap, Play } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface CTAProps {
  onGetStarted: () => void;
  onBookDemo: () => void;
  onWatchTour: () => void;
}

export const CTA = ({ onGetStarted, onBookDemo, onWatchTour }: CTAProps) => {
  return (
    <section id="cta" className="relative py-24 md:py-32 bg-white text-slate-900 overflow-hidden">
      {/* Light highlights */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-100/30 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
        backgroundSize: '40px 40px',
      }} />

      <div className="container mx-auto px-6 max-w-4xl relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="space-y-8"
        >
          <span className="type-caption tracking-widest uppercase text-[#F97316] bg-[#FFF8F1] border border-orange-200/80 px-3.5 py-1 rounded-full inline-block font-semibold">
            Start upgrading today
          </span>
          
          <h2 className="type-h2 text-slate-900 tracking-tight">
            Ready to experience the <br />
            <span className="bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] bg-clip-text text-transparent">future of dining?</span>
          </h2>
          
          <p className="type-body-large text-slate-600 max-w-2xl mx-auto">
            Boost seat throughput, recover feedback instantly, and run kitchen operations cleanly. Set up your digital workspace in minutes.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
            <Button
              onClick={onGetStarted}
              size="lg"
              className="type-button w-full sm:w-auto h-14 px-8 rounded-full bg-[#F97316] hover:bg-[#EA580C] text-white shadow-lg shadow-orange-500/25 group gap-2 font-bold"
            >
              <Zap className="w-4.5 h-4.5" />
              Start Free Trial
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button
              onClick={onBookDemo}
              size="lg"
              className="type-button w-full sm:w-auto h-14 px-8 rounded-full bg-[#0B1F3A] hover:bg-[#071324] text-white font-semibold shadow-md"
            >
              Book Demo
            </Button>

            <Button
              onClick={onWatchTour}
              size="lg"
              variant="ghost"
              className="type-button w-full sm:w-auto h-14 px-8 rounded-full border border-slate-200 hover:bg-slate-100 text-slate-700 gap-2"
            >
              <Play className="w-4 h-4 fill-current" />
              Watch Tour
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
