import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import confetti from 'canvas-confetti';
import { 
  ShieldCheck, ShieldAlert, Lock, Eye, EyeOff, 
  Activity, CheckCircle2, XCircle, Database, Zap, Flame, Terminal, Sparkles
} from 'lucide-react';

export default function App() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    policy: { length_ok: false, has_upper: false, has_lower: false, has_digit: false, has_symbol: false, total_length: 0 },
    entropy: { entropy_bits: 0, pool_size: 0, rating: 'Very Weak' },
    breach: { is_breached: false, breach_count: 0, error: null }
  });

  // GSAP Animation Refs
  const cardRef = useRef(null);
  const meterBarRef = useRef(null);
  const dialTextRef = useRef(null);
  const badgeRef = useRef(null);
  const prevRatingRef = useRef(data.entropy.rating);

  // Initial Entrance Animation
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        y: 40,
        opacity: 0,
        scale: 0.96,
        duration: 1,
        ease: 'power3.out'
      });
    });
    return () => ctx.revert();
  }, []);

  // Debounced API Call
  useEffect(() => {
    if (!password) {
      setData({
        policy: { length_ok: false, has_upper: false, has_lower: false, has_digit: false, has_symbol: false, total_length: 0 },
        entropy: { entropy_bits: 0, pool_size: 0, rating: 'Very Weak' },
        breach: { is_breached: false, breach_count: 0, error: null }
      });
      return;
    }

    const timer = setTimeout(async () => {
      setLoading(true);
      try {
        const res = await fetch('http://127.0.0.1:8000/api/analyze', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ password })
        });
        const result = await res.json();
        setData(result);
      } catch (err) {
        console.error('FastAPI error:', err);
      } finally {
        setLoading(false);
      }
    }, 180);

    return () => clearTimeout(timer);
  }, [password]);

  // GSAP Reactive Animations for Data Changes
  useEffect(() => {
    const bits = data.entropy.entropy_bits || 0;
    const targetWidth = Math.min(100, Math.round((bits / 80) * 100));

    // Animate Progress Bar width smoothly
    gsap.to(meterBarRef.current, {
      width: `${targetWidth}%`,
      duration: 0.5,
      ease: 'elastic.out(1, 0.75)'
    });

    // Badge Pulse on state change
    if (prevRatingRef.current !== data.entropy.rating) {
      gsap.fromTo(badgeRef.current, 
        { scale: 0.8, opacity: 0.5 },
        { scale: 1, opacity: 1, duration: 0.4, ease: 'back.out(2)' }
      );
      prevRatingRef.current = data.entropy.rating;
    }

    // Trigger celebratory confetti if user hits Very Strong & Clean
    if (data.entropy.rating === 'Very Strong' && !data.breach.is_breached) {
      confetti({
        particleCount: 40,
        spread: 60,
        origin: { y: 0.8 },
        colors: ['#06b6d4', '#10b981', '#38bdf8']
      });
    }
  }, [data]);

  const getRatingBadge = (rating) => {
    switch (rating) {
      case 'Very Strong': return 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30';
      case 'Strong': return 'text-cyan-400 bg-cyan-500/10 border-cyan-500/30';
      case 'Reasonable': return 'text-amber-400 bg-amber-500/10 border-amber-500/30';
      default: return 'text-rose-400 bg-rose-500/10 border-rose-500/30';
    }
  };

  const getMeterColor = (rating) => {
    switch (rating) {
      case 'Very Strong': return 'bg-gradient-to-r from-emerald-500 to-teal-400 shadow-[0_0_15px_rgba(16,185,129,0.5)]';
      case 'Strong': return 'bg-gradient-to-r from-cyan-500 to-blue-500 shadow-[0_0_15px_rgba(6,182,212,0.5)]';
      case 'Reasonable': return 'bg-gradient-to-r from-amber-500 to-yellow-400 shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      default: return 'bg-gradient-to-r from-rose-500 to-red-600 shadow-[0_0_15px_rgba(244,63,94,0.5)]';
    }
  };

  return (
    <div className="min-h-screen bg-[#030712] cyber-grid text-slate-100 flex flex-col items-center justify-center p-4 sm:p-6 relative overflow-hidden selection:bg-cyan-500/30">
      
      {/* Background Neon Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-cyan-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-80 h-80 bg-indigo-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* Main Glass Card */}
      <main 
        ref={cardRef}
        className="relative w-full max-w-2xl bg-slate-900/70 backdrop-blur-2xl border border-slate-800/80 rounded-3xl p-6 sm:p-9 shadow-2xl shadow-cyan-950/30 ring-1 ring-white/5"
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800/80 pb-5 mb-6">
          <div className="flex items-center gap-3.5">
            <div className="p-3 bg-cyan-500/10 border border-cyan-500/30 rounded-2xl text-cyan-400 shadow-inner">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-lg font-bold tracking-tight text-white">Cyber Shield</h1>
                <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 flex items-center gap-1">
                  <Sparkles className="w-2.5 h-2.5" /> DecodeLabs
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-0.5">Shannon Entropy & k-Anonymity Defense Engine</p>
            </div>
          </div>
          {loading && (
            <span className="text-xs flex items-center gap-1.5 text-cyan-400 font-mono animate-pulse">
              <Activity className="w-3.5 h-3.5 animate-spin" /> SCANNING
            </span>
          )}
        </div>

        {/* Input Bar */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between items-center text-xs">
            <label className="font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" /> Target String
            </label>
            <span className="font-mono text-slate-500">{password.length} chars</span>
          </div>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-500">
              <Lock className="w-4 h-4" />
            </div>
            <input
              type={showPassword ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter credential to evaluate..."
              className="w-full pl-11 pr-12 py-3.5 bg-slate-950/80 border border-slate-800/90 rounded-2xl text-slate-100 placeholder-slate-600 focus:outline-none focus:border-cyan-500/60 focus:ring-2 focus:ring-cyan-500/20 transition-all font-mono text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-slate-200 transition-colors"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        {/* GSAP Animated Entropy Meter */}
        <div className="p-4 sm:p-5 bg-slate-950/50 border border-slate-800/80 rounded-2xl mb-6">
          <div className="flex items-center justify-between text-xs mb-3">
            <span className="text-slate-300 font-medium flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-cyan-400" /> Information Entropy
            </span>
            <span 
              ref={badgeRef}
              className={`font-semibold px-2.5 py-0.5 rounded-full border text-xs transition-colors ${getRatingBadge(data.entropy.rating)}`}
            >
              {data.entropy.entropy_bits} bits • {data.entropy.rating}
            </span>
          </div>

          <div className="h-2.5 w-full bg-slate-900 rounded-full overflow-hidden p-0.5 border border-slate-800">
            <div
              ref={meterBarRef}
              className={`h-full rounded-full ${getMeterColor(data.entropy.rating)}`}
              style={{ width: '0%' }}
            />
          </div>

          <div className="mt-3 flex justify-between text-[11px] text-slate-400 font-mono">
            <span>Pool Space: <strong className="text-slate-200">{data.entropy.pool_size}</strong> symbols</span>
            <span>Bit Density: <strong className="text-slate-200">{data.entropy.entropy_bits}</strong> / 80+</span>
          </div>
        </div>

        {/* Live Criteria Check Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-6">
          {[
            { label: 'Length ≥ 8 Chars', ok: data.policy.length_ok },
            { label: 'Uppercase [A-Z]', ok: data.policy.has_upper },
            { label: 'Lowercase [a-z]', ok: data.policy.has_lower },
            { label: 'Numeric Digit [0-9]', ok: data.policy.has_digit },
            { label: 'Special Symbol [!@#$]', ok: data.policy.has_symbol },
          ].map((item, idx) => (
            <div
              key={idx}
              className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-medium transition-all duration-300 ${
                item.ok
                  ? 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
                  : 'bg-slate-950/40 border-slate-800/80 text-slate-500'
              }`}
            >
              {item.ok ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <XCircle className="w-4 h-4 text-slate-600 shrink-0" />
              )}
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Breach Status Banner */}
        <div
          className={`p-4 rounded-2xl border flex items-start gap-3 transition-all duration-300 ${
            data.breach.is_breached
              ? 'bg-rose-950/30 border-rose-500/40 text-rose-300'
              : 'bg-emerald-950/20 border-emerald-500/30 text-emerald-300'
          }`}
        >
          <div className="mt-0.5">
            {data.breach.is_breached ? (
              <Flame className="w-5 h-5 text-rose-400" />
            ) : (
              <Database className="w-5 h-5 text-emerald-400" />
            )}
          </div>
          <div className="text-xs">
            <div className="font-semibold text-sm mb-0.5">
              {data.breach.is_breached
                ? `CRITICAL EXPOSURE (Found in ${data.breach.breach_count.toLocaleString()} leaks!)`
                : 'Zero Known Breach Exposures'}
            </div>
            <p className="text-slate-400 leading-relaxed">
              {data.breach.is_breached
                ? 'This password exists in public leaked credential sets. Vulnerable to dictionary attacks.'
                : 'Queried via HaveIBeenPwned SHA-1 k-Anonymity model without transmitting cleartext.'}
            </p>
          </div>
        </div>

      </main>
    </div>
  );
}