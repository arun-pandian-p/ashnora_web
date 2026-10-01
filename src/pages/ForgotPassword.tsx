import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Mail, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { supabase } from '@/integrations/supabase/client';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';
import { assetUrl } from '@/lib/utils';

const ForgotPassword = () => {
  const { toast } = useToast();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({ title: 'Email required', description: 'Please enter your email address.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`,
    });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      setSent(true);
      toast({ title: 'Email sent', description: 'Check your inbox for a password reset link.' });
    }
    setLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center lg:justify-end bg-[#F8FAFC] bg-cover bg-center relative overflow-hidden px-4 sm:px-8 lg:px-14 xl:px-20 py-12"
      style={{ backgroundImage: `url(${assetUrl('brand/login-bg.png')})` }}
    >
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/95 sm:bg-white backdrop-blur-xl rounded-3xl sm:rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.16)] border border-slate-100 p-7 sm:p-9 w-full max-w-[450px] space-y-5 relative z-10"
      >
        <Link to="/login" className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-500 hover:text-[#F97316] transition-colors">
          <ArrowLeft className="h-4 w-4 text-[#F97316]" /> Back to login
        </Link>

        <div className="text-center">
          <Link to="/" className="inline-block mb-3 hover:scale-105 transition-transform">
            <AshnoraLogo size={42} showTagline={false} />
          </Link>
          <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0B1F3A] font-heading tracking-tight">Reset Password</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">
            {sent ? 'Check your email for a reset link.' : "Enter your email and we'll send you a password reset link."}
          </p>
        </div>

        {!sent ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 ml-0.5">Email Address</label>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
                <Input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  disabled={loading}
                  autoComplete="email"
                  className="!pl-[44px] pr-4 h-12 rounded-xl border border-blue-100/70 bg-[#EEF4FB] text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-2 focus-visible:ring-[#F97316]/30 focus-visible:border-[#F97316]"
                />
              </div>
            </div>
            <Button
              type="submit"
              className="type-button w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all cursor-pointer"
              disabled={loading}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white/30 border-t-white" />
                  Sending…
                </span>
              ) : (
                'Send Reset Link'
              )}
            </Button>
          </form>
        ) : (
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-orange-50 border border-orange-100 rounded-2xl flex items-center justify-center mx-auto">
              <CheckCircle2 className="h-8 w-8 text-[#F97316]" />
            </div>
            <p className="text-sm text-slate-600 font-medium">
              We sent a password reset link to <strong className="text-slate-900">{email}</strong>. Please check your inbox.
            </p>
            <Button
              variant="outline"
              onClick={() => setSent(false)}
              className="text-sm font-bold rounded-xl border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              Try a different email
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default ForgotPassword;
