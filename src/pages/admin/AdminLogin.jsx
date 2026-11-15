import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, ArrowRight, ShieldAlert, Sparkles, ArrowLeft, Loader2, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import Button from '../../components/ui/Button';

export default function AdminLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, isConfigured } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  // Target destination after login
  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password.trim()) {
      setError('Please provide your administrator email and password.');
      return;
    }

    try {
      setSubmitting(true);
      await login(email, password);
      navigate(from, { replace: true });
    } catch (err) {
      console.error('Login failed:', err);
      setError(err.message || 'Invalid administrator login credentials.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F5F0] flex flex-col justify-center items-center px-4 py-12">
      {/* Back to Public Store link */}
      <div className="mb-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#76501F] hover:text-[#281A10] transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Return to Public Store</span>
        </Link>
      </div>

      <div className="max-w-md w-full bg-white rounded-2xl border border-[#E8E3D9] shadow-xl p-8 space-y-6">
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <div className="w-12 h-12 mx-auto rounded-full bg-[#F7F5F0] border border-[#E8E3D9] flex items-center justify-center text-[#76501F]">
            <Lock className="w-5 h-5" />
          </div>

          <h1 className="font-serif text-3xl text-[#281A10] tracking-tight">
            Buddha<span className="text-[#76501F] italic font-normal">Home</span>
          </h1>
          <p className="text-xs uppercase tracking-[0.2em] text-[#777166] font-semibold">
            Administrator Authentication
          </p>
        </div>

        {/* Supabase Status Banner */}
        {isConfigured ? (
          <div className="p-3.5 bg-emerald-50 border border-emerald-200 rounded-xl flex items-start gap-2.5 text-xs text-emerald-900">
            <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <strong className="font-semibold block text-emerald-800">Supabase Auth Connected</strong>
              <p className="text-emerald-700 text-[11px] leading-relaxed">
                Sign in with your authorized administrator account. Sessions persist across browser refreshes via encrypted JWT.
              </p>
            </div>
          </div>
        ) : (
          <div className="p-3.5 bg-[#EFEAD8] border border-[#B69A63]/50 rounded-xl flex items-start gap-2.5 text-xs text-[#281A10]">
            <ShieldAlert className="w-4 h-4 text-[#76501F] shrink-0 mt-0.5" />
            <div className="space-y-1">
              <strong className="font-semibold block text-[#76501F]">Development / Demo Mode</strong>
              <p className="text-[#777166] text-[11px] leading-relaxed">
                Supabase credentials not yet populated in <code>.env</code>. You can enter any email/password to test the admin panel interface.
              </p>
            </div>
          </div>
        )}

        {/* Error notification */}
        {error && (
          <div className="p-3 bg-rose-50 border border-rose-200 text-rose-700 text-xs rounded-lg leading-relaxed flex items-start gap-2">
            <span className="shrink-0 font-bold">✕</span>
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="adminEmail" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
              Admin Email Address
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777166]" />
              <input
                type="email"
                id="adminEmail"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@buddhahome.in"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] focus:border-[#76501F] rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors"
                autoComplete="email"
              />
            </div>
          </div>

          <div>
            <label htmlFor="adminPassword" className="block text-xs font-semibold uppercase tracking-wider text-[#29251F] mb-1.5">
              Password
            </label>
            <div className="relative">
              <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-[#777166]" />
              <input
                type="password"
                id="adminPassword"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full pl-10 pr-3.5 py-2.5 bg-[#F7F5F0] border border-[#E8E3D9] focus:border-[#76501F] rounded-sm text-sm text-[#29251F] focus:outline-none transition-colors"
                autoComplete="current-password"
              />
            </div>
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={submitting}
              className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#281A10] text-[#F7F5F0] hover:bg-[#76501F] text-xs font-semibold uppercase tracking-wider rounded-sm shadow-xs transition-colors disabled:opacity-60"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Verifying Credentials...</span>
                </>
              ) : (
                <>
                  <span>Sign In as Administrator</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </div>
        </form>

        <div className="text-center pt-2 border-t border-[#E8E3D9]/60">
          <p className="text-[11px] text-[#777166]">
            Governed by PostgreSQL Row Level Security (RLS) policies.
          </p>
        </div>
      </div>
    </div>
  );
}
