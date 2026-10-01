import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Eye, EyeOff, ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';
import { assetUrl } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';

const ResetPassword = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isRecovery, setIsRecovery] = useState(false);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const checkRecovery = async () => {
      try {
        const hash = window.location.hash || "";
        const search = window.location.search || "";
        
        // Immediately allow if URL contains valid recovery params
        if (
          hash.includes("type=recovery") || 
          hash.includes("access_token=") || 
          search.includes("type=recovery") || 
          search.includes("code=")
        ) {
          setIsRecovery(true);
          return;
        }

        // Fallback: check if we already have an active session
        const { data: { session }, error } = await supabase.auth.getSession();
        if (session && !error) {
          setIsRecovery(true);
        }
      } finally {
        setChecking(false);
      }
    };

    checkRecovery();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || (event === 'SIGNED_IN' && session)) {
        setIsRecovery(true);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password.length < 6) {
      toast({ title: 'Too short', description: 'Password must be at least 6 characters.', variant: 'destructive' });
      return;
    }
    if (password !== confirm) {
      toast({ title: 'Mismatch', description: 'Passwords do not match.', variant: 'destructive' });
      return;
    }
    setLoading(true);
    const { error } = await supabase.auth.updateUser({ password });
    if (error) {
      toast({ title: 'Error', description: error.message, variant: 'destructive' });
    } else {
      toast({ title: 'Password updated', description: 'You can now sign in with your new password.' });
      await supabase.auth.signOut();
      navigate('/login', { replace: true });
    }
    setLoading(false);
  };

  if (checking) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#0B1F3A] bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${assetUrl('brand/hero-bg.png')})` }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-[420px] text-center space-y-4">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-[#F97316] mx-auto" />
          <h2 className="text-xl font-bold text-[#0B1F3A]">Verifying link...</h2>
          <p className="text-slate-500 text-sm">Please wait while we verify your password reset link.</p>
        </div>
      </div>
    );
  }

  if (!isRecovery) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#0B1F3A] bg-cover bg-center p-6"
        style={{ backgroundImage: `url(${assetUrl('brand/hero-bg.png')})` }}
      >
        <div className="bg-white rounded-3xl shadow-2xl p-8 w-full max-w-[420px] text-center space-y-4">
          <h2 className="text-xl font-bold text-[#0B1F3A]">Invalid Reset Link</h2>
          <p className="text-slate-500 text-sm">This link is invalid or has expired. Please request a new one.</p>
          <Button onClick={() => navigate('/forgot-password')} className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold rounded-xl">
            Request New Link
          </Button>
        </div>
      </div>
    );
  }

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
          <h2 className="text-2xl sm:text-[26px] font-extrabold text-[#0B1F3A] font-heading tracking-tight">Set New Password</h2>
          <p className="text-slate-500 mt-1 text-sm font-medium">Must be at least 6 characters long</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 ml-0.5">New Password</label>
            <div className="relative flex items-center">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400 pointer-events-none z-10" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••"
                value={password}
                onChange={e => setPassword(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
                className="!pl-[44px] !pr-[44px] h-12 rounded-xl border border-blue-100/70 bg-[#EEF4FB] text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-2 focus-visible:ring-[#F97316]/30 focus-visible:border-[#F97316]"
              />
              <button
                type="button"
                className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors z-10 p-1 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
              </button>
            </div>
          </div>

          <div className="space-y-1.5">
            <label className="text-xs font-bold uppercase tracking-wider text-slate-600 ml-0.5">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4.5 w-4.5 text-slate-400" />
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                disabled={loading}
                autoComplete="new-password"
                className="pl-10.5 h-11.5 rounded-xl border-slate-200 bg-slate-50/90 text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-[#F97316] focus-visible:border-[#F97316]"
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
                Updating…
              </span>
            ) : (
              'Update Password'
            )}
          </Button>
        </form>
      </motion.div>
    </div>
  );
};

export default ResetPassword;
