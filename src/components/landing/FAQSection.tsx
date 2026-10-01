import { motion } from 'framer-motion';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const faqs = [
  {
    q: 'Do my customers need to download an app?',
    a: 'No! Ashnora works entirely in the browser. Customers simply scan the QR code and the menu opens instantly — no downloads, no sign-ups required.',
  },
  {
    q: 'How long does it take to set up?',
    a: 'You can be up and running in under 15 minutes. Just create your account, add your menu items, configure your tables, and print QR codes.',
  },
  {
    q: 'Can I customize the menu design for my brand?',
    a: 'Absolutely. You can set your logo, brand colors, fonts, cover images, and even a custom splash screen animation for your restaurant.',
  },
  {
    q: 'Does it work with my existing POS or printer?',
    a: 'Ashnora supports Bluetooth and USB thermal printers (ESC/POS compatible). POS integration is available on the Enterprise plan.',
  },
  {
    q: 'Is my data secure?',
    a: 'Yes. We use enterprise-grade encryption, row-level security policies, and role-based access control to keep your restaurant data safe.',
  },
  {
    q: 'Can I manage multiple restaurant locations?',
    a: 'Yes, our Enterprise plan supports multi-location management with a unified super-admin dashboard for all your outlets.',
  },
];

const FAQSection = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="type-caption tracking-widest uppercase text-[#F97316] bg-[#FFF8F1] border border-orange-200/80 px-3.5 py-1 rounded-full inline-block font-semibold mb-4">
            Common Questions
          </span>
          <h2 className="type-h2 text-slate-900 mb-4">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-[#F97316] via-orange-500 to-[#EA580C] bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className="type-body text-slate-600 max-w-2xl mx-auto">
            Everything you need to know about Ashnora Restaurant OS.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-3">
            {faqs.map((faq, i) => (
              <AccordionItem
                key={i}
                value={`faq-${i}`}
                className="border border-slate-200/80 hover:border-orange-200 rounded-2xl px-6 bg-slate-50/60 data-[state=open]:bg-white data-[state=open]:border-orange-300 data-[state=open]:shadow-md transition-all duration-200"
              >
                <AccordionTrigger className="type-h4 text-left hover:no-underline py-5 text-slate-900 hover:text-[#F97316] transition-colors">
                  {faq.q}
                </AccordionTrigger>
                <AccordionContent className="type-body text-slate-600 pb-5 leading-relaxed">
                  {faq.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;
