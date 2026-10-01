import { motion } from 'framer-motion';
import { QrCode, MonitorPlay, BarChart3, ShieldCheck, HeartHandshake, Compass } from 'lucide-react';

const features = [
  {
    icon: QrCode,
    title: 'Smart QR Seat Selection',
    description: 'Provide an intuitive dining flow. Guests scan a table QR code and select a specific seat (1-N) with persistent device recognition for future visits.',
    glowColor: 'group-hover:shadow-orange-500/10'
  },
  {
    icon: MonitorPlay,
    title: 'Chef-Inspired KDS Dashboard',
    description: 'Ensure accurate preparation pacing. The Kitchen Display System dynamically lists live tokens, order items, seat pairings, and tracking state updates.',
    glowColor: 'group-hover:shadow-amber-500/10'
  },
  {
    icon: BarChart3,
    title: 'Unified Live Analytics',
    description: 'Analyze food ratings, review volume, and ticket trends. Spot peak hours and table turnover stats instantly using automated reports.',
    glowColor: 'group-hover:shadow-orange-500/10'
  },
  {
    icon: HeartHandshake,
    title: 'Reputation Center Manager',
    description: 'Capture critical feedback before guest exit. Auto-compute ratings, extract sentiment analysis, and trigger recovery flows for ratings under 3 stars.',
    glowColor: 'group-hover:shadow-rose-500/10'
  },
  {
    icon: ShieldCheck,
    title: 'Robust Security & RLS',
    description: 'Protect billing data and user details. Powered by Supabase security policies, ensuring authenticated and guest records are isolated.',
    glowColor: 'group-hover:shadow-emerald-500/10'
  },
  {
    icon: Compass,
    title: 'Real-Time Table Timers',
    description: 'Never miss a late table or order block. Live timers display table duration and average preparation latency to maximize operational throughput.',
    glowColor: 'group-hover:shadow-orange-500/10'
  }
];

export const Features = () => {
  return (
    <section id="features" className="relative py-24 md:py-32 bg-white text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Light blobs */}
      <div className="absolute top-0 right-1/4 w-[600px] h-[300px] bg-orange-100/20 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[250px] bg-amber-100/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Grid Pattern overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
        backgroundSize: '30px 30px',
      }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="type-caption tracking-widest uppercase text-[#F97316] bg-[#FFF8F1] border border-orange-200/80 px-3.5 py-1 rounded-full inline-block font-semibold">
            Core capabilities
          </span>
          <h2 className="type-h2 text-slate-900 tracking-tight">
            Engineered for <span className="bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] bg-clip-text text-transparent">high-frequency dining</span>
          </h2>
          <p className="type-body text-slate-600">
            From QR seat reservations to kitchen queue management, Ashnora covers the entire life-cycle of customer dining.
          </p>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="group relative p-8 rounded-3xl bg-slate-50/80 border border-slate-200/80 hover:border-orange-200/80 hover:bg-white transition-all duration-300 flex flex-col justify-between hover:shadow-xl"
              >
                <div className="space-y-6">
                  {/* Icon wrap */}
                  <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 shadow-xs flex items-center justify-center text-[#F97316] group-hover:bg-[#F97316] group-hover:text-white group-hover:border-[#F97316] transition-all duration-300">
                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="type-h4 text-slate-900 group-hover:text-[#F97316] transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="type-body text-slate-600">
                      {feature.description}
                    </p>
                  </div>
                </div>

                {/* Decorative border bottom-line */}
                <div className="absolute bottom-0 left-[10%] right-[10%] h-0.5 bg-gradient-to-r from-transparent via-orange-500/0 to-transparent group-hover:via-[#F97316]/40 transition-all duration-500" />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
