import { useState, useEffect } from 'react';
import { useNavigate, Link, useSearchParams } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Eye, EyeOff, Mail, Lock, LogIn, AlertCircle, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { useAuth } from '@/hooks/useAuth';
import { AshnoraLogo } from '@/components/branding/AshnoraLogo';
import { assetUrl } from '@/lib/utils';
import { lovable } from '@/integrations/lovable/index';

const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const isExpired = searchParams.get('expired') === 'true';
  const { toast } = useToast();
  const { signIn, user, role, loading: authLoading, getRouteForRole } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Redirect already-authenticated users once
  useEffect(() => {
    if (!authLoading && user && role) {
      navigate(getRouteForRole(role), { replace: true });
    }
  }, [user, role, authLoading, navigate, getRouteForRole]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !password) {
      toast({ title: 'Missing fields', description: 'Please enter your email/username and password.', variant: 'destructive' });
      return;
    }
    setLoading(true);

    const loginEmail = email.trim();

    const { error } = await signIn(loginEmail, password);
    if (error) {
      const isNetworkError = error.message === 'Failed to fetch' || error.message?.includes('NetworkError');
      toast({
        title: isNetworkError ? 'Network error' : 'Login failed',
        description: isNetworkError ?
          'Could not reach the server. Please check your internet connection and try again.' :
          error.message,
        variant: 'destructive'
      });
    }
    setLoading(false);
  };

  if (authLoading) {
    return (
      <div 
        className="min-h-screen flex items-center justify-center bg-[#F8FAFC] bg-cover bg-center"
        style={{ backgroundImage: `url(${assetUrl('brand/login-bg.png')})` }}
      >
        <div className="flex flex-col items-center gap-3 bg-white/90 backdrop-blur-md p-6 rounded-2xl shadow-xl border border-slate-200">
          <div className="animate-spin rounded-full h-8 w-8 border-2 border-slate-200 border-t-[#F97316]" />
          <p className="text-[#0B1F3A] text-sm font-bold">Loading Ashnora...</p>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex bg-[#F8FAFC] bg-cover bg-center bg-no-repeat relative overflow-x-hidden"
      style={{ backgroundImage: `url(${assetUrl('brand/login-bg.png')})` }}
    >
      {/* Top Left Floating Back Link */}
      <Link
        to="/"
        className="absolute top-5 left-5 sm:top-7 sm:left-8 z-20 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 hover:bg-white border border-slate-200/90 text-[#0B1F3A] text-xs sm:text-sm font-bold backdrop-blur-md transition-all shadow-sm hover:scale-105"
      >
        <ArrowLeft className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#F97316]" />
        <span>Back to Website</span>
      </Link>

      <div className="w-full flex flex-col lg:flex-row items-center justify-between lg:justify-between relative z-10 min-h-screen px-4 sm:px-8 lg:px-12 xl:px-16 pt-20 pb-8 sm:py-12 max-w-[1440px] mx-auto gap-6 lg:gap-8">
        
        {/* LEFT PANEL — Restaurant Staff 3D Mascot Showcase (Chef, Cashier, Waiter) */}
        <motion.div
          initial={{ opacity: 0, y: 25, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="hidden lg:flex flex-col items-center justify-end flex-1 max-w-[580px] xl:max-w-[650px] self-end -mb-8 pointer-events-none select-none"
        >
          <img
            src={assetUrl('brand/login-characters.png')}
            alt="Ashnora Restaurant Team"
            onError={(e) => { e.currentTarget.style.display = 'none'; }}
            className="w-full max-h-[580px] xl:max-h-[660px] object-contain drop-shadow-[0_25px_35px_rgba(0,0,0,0.22)]"
          />
        </motion.div>

        {/* RIGHT PANEL — Login Form Card matching login2.png */}
        <motion.div
          initial={{ opacity: 0, x: 25 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.45 }}
          className="w-full max-w-[440px] sm:max-w-[460px] shrink-0 my-auto"
        >
          <div className="bg-white/95 sm:bg-white backdrop-blur-xl rounded-3xl sm:rounded-[28px] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.18)] border border-slate-100 p-7 sm:p-9 w-full space-y-5">
            {/* Top Logo & Title */}
            <div className="flex flex-col items-center justify-center text-center">
              <Link to="/" className="inline-block hover:scale-105 transition-transform mb-3">
                <AshnoraLogo size={44} showTagline={false} />
              </Link>
              <h2 className="text-2xl sm:text-[28px] font-extrabold text-[#0B1F3A] font-heading tracking-tight">
                Welcome back
              </h2>
              <p className="text-slate-500 mt-1 text-sm font-medium">
                Sign in to your restaurant dashboard
              </p>
            </div>

            {isExpired && (
              <div className="p-3 bg-amber-50 border border-amber-200 text-amber-800 rounded-xl text-xs font-semibold flex items-start gap-2 animate-pulse">
                <AlertCircle className="w-4 h-4 shrink-0 text-[#F97316] mt-0.5" />
                <span>Your session has expired due to inactivity. Please sign in again.</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 ml-0.5">
                  Email or Username
                </label>
                <div className="relative flex items-center">
                  <Mail className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type="text"
                    placeholder="admin@prepville.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="!pl-[44px] pr-4 h-12 bg-[#EEF4FB] border border-blue-100/70 text-slate-900 rounded-xl font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-[#F97316]/30 focus-visible:border-[#F97316] transition-all"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-[11px] font-bold uppercase tracking-wider text-slate-600 ml-0.5">
                  Password
                </label>
                <div className="relative flex items-center">
                  <Lock className="w-5 h-5 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none z-10" />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                    autoComplete="current-password"
                    className="!pl-[44px] !pr-[44px] h-12 rounded-xl border border-blue-100/70 bg-[#EEF4FB] text-slate-900 placeholder:text-slate-400 font-medium focus-visible:ring-2 focus-visible:ring-[#F97316]/30 focus-visible:border-[#F97316] transition-all"
                  />
                  <button
                    type="button"
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors cursor-pointer z-10 p-1"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff className="h-4.5 w-4.5" /> : <Eye className="h-4.5 w-4.5" />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end pt-0.5">
                <Link
                  to="/forgot-password"
                  className="text-xs text-[#F97316] hover:text-[#EA580C] font-semibold transition-colors"
                >
                  Forgot password?
                </Link>
              </div>

              <Button
                type="submit"
                className="type-button w-full h-12 rounded-xl bg-[#F97316] hover:bg-[#EA580C] text-white font-bold text-base shadow-md shadow-orange-500/20 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer"
                disabled={loading}
              >
                {loading ? (
                  <span className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4.5 w-4.5 border-2 border-white/30 border-t-white" />
                    Signing in…
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <LogIn className="h-4.5 w-4.5" />
                    Sign In
                  </span>
                )}
              </Button>
            </form>

            <div className="relative flex items-center my-3">
              <div className="flex-grow border-t border-slate-200/80" />
              <span className="shrink-0 px-3 text-[10px] sm:text-[11px] font-bold text-slate-400 uppercase tracking-wider">
                Or continue with
              </span>
              <div className="flex-grow border-t border-slate-200/80" />
            </div>

            <Button
              type="button"
              variant="outline"
              className="type-button w-full h-11.5 rounded-xl border-slate-200 hover:border-slate-300 text-slate-700 font-bold text-sm bg-white hover:bg-slate-50 flex items-center justify-center gap-2.5 transition-all shadow-2xs cursor-pointer"
              disabled={loading}
              onClick={async () => {
                const { error } = await lovable.auth.signInWithOAuth('google', {
                  redirect_uri: window.location.origin
                });
                if (error) {
                  toast({ title: 'Google sign-in failed', description: String(error), variant: 'destructive' });
                }
              }}
            >
              <svg className="w-4.5 h-4.5" viewBox="0 0 24 24">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              <span>Google Account</span>
            </Button>

            <div className="pt-1 text-center">
              <p className="text-xs text-slate-400 leading-relaxed font-medium">
                Role-based access — you'll be directed to your assigned dashboard automatically.
              </p>
            </div>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Login;