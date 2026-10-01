import { motion } from 'framer-motion';
import { QrCode, ClipboardList, UtensilsCrossed, BellRing, Receipt } from 'lucide-react';

const steps = [
  {
    icon: QrCode,
    number: '01',
    title: 'Scan Table QR & Pick Seat',
    description: 'Customers scan the unique table QR code, pick their specific seat, and are instantly authenticated with a persistent device ID.'
  },
  {
    icon: ClipboardList,
    number: '02',
    title: 'Order & Generate Token',
    description: 'Guests build their order, request kitchen mods, and place it. Ashnora instantly generates an order token (e.g. #023) for simple tracking.'
  },
  {
    icon: UtensilsCrossed,
    number: '03',
    title: 'Kitchen Receives & Prepares',
    description: 'The order syncs directly to the Kitchen Display System (KDS). Status flows automatically: New → Accepted → Preparing → Ready → Served.'
  },
  {
    icon: BellRing,
    number: '04',
    title: 'Live Tracking & Call Waiter',
    description: 'Guests track their live progress timeline via real-time alerts. If they need assistance, they can call a waiter to their exact table in one tap.'
  },
  {
    icon: Receipt,
    number: '05',
    title: 'Instant Billing & Feedback',
    description: 'When finished, customers view their billing summary, settle payments, and submit reviews which feed directly into your Reputation Center.'
  }
];

export const Solution = () => {
  return (
    <section id="solution" className="relative py-24 md:py-32 bg-slate-50/80 text-slate-900 overflow-hidden border-b border-slate-100">
      {/* Warm ambient highlight */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-orange-100/25 blur-[140px] rounded-full pointer-events-none" />

      {/* Grid structure overlay */}
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4) 1px, transparent 1px),
                          linear-gradient(90deg, rgba(0, 0, 0, 0.4) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
      }} />

      <div className="container mx-auto px-6 max-w-6xl relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <span className="type-caption tracking-widest uppercase text-[#F97316] bg-[#FFF8F1] border border-orange-200/80 px-3.5 py-1 rounded-full inline-block font-semibold">
            The Ashnora Ecosystem
          </span>
          <h2 className="type-h2 text-slate-900 tracking-tight">
            One unified flow. <span className="bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] bg-clip-text text-transparent">Zero friction.</span>
          </h2>
          <p className="type-body text-slate-600">
            Eliminate communication gaps by replacing paper workflows and standalone tablets with a single synchronized software environment.
          </p>
        </div>

        {/* Steps Flow Timeline */}
        <div className="relative">
          {/* Connector line (Desktop only) */}
          <div className="hidden lg:block absolute top-[44px] left-[5%] right-[5%] h-0.5 bg-gradient-to-r from-orange-200 via-amber-200 to-orange-200" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: index * 0.15 }}
                  className="flex flex-col items-center lg:items-start text-center lg:text-left space-y-4 group"
                >
                  {/* Step circle */}
                  <div className="relative z-10 w-20 h-20 rounded-full bg-white border border-slate-200 shadow-sm flex items-center justify-center text-[#F97316] group-hover:border-[#F97316] group-hover:shadow-md transition-all duration-300">
                    {/* Inner pulse */}
                    <div className="absolute inset-1.5 rounded-full bg-slate-50 border border-slate-100 group-hover:bg-[#FFF8F1] transition-all duration-300" />
                    
                    <Icon className="relative z-20 w-8 h-8" strokeWidth={1.5} />
                    
                    {/* Step number badge */}
                    <div className="absolute -top-1.5 -right-1.5 w-6 h-6 rounded-full bg-[#F97316] border border-white flex items-center justify-center text-[10px] font-bold text-white shadow-xs">
                      {step.number}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h3 className="type-h4 text-slate-900 group-hover:text-[#F97316] transition-colors duration-300">
                      {step.title}
                    </h3>
                    <p className="type-body text-slate-600">
                      {step.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
