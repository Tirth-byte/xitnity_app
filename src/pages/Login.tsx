import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Terminal, Shield, User, ArrowRight } from 'lucide-react';
import { useAuth, UserRole } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<UserRole>('participant');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    login(email, role);
    navigate(role === 'admin' ? '/admin' : '/dashboard');
  };

  return (
    <div className="min-h-screen bg-surface flex items-center justify-center p-6 relative overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-primary/10 border border-primary/20 mb-6">
            <Terminal className="text-primary" size={32} />
          </div>
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface mb-2">XINITY_LOGIN</h1>
          <p className="text-on-surface-variant font-headline text-xs uppercase tracking-widest">Initialize System Access</p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <div className="flex gap-4 mb-8">
            <button 
              onClick={() => setRole('participant')}
              className={cn(
                "flex-1 py-3 rounded-lg font-headline text-xs font-bold uppercase tracking-widest transition-all border",
                role === 'participant' 
                  ? "bg-primary text-on-primary border-primary shadow-lg shadow-primary/20" 
                  : "bg-surface-container-highest text-on-surface-variant border-outline-variant/30 hover:bg-surface-bright"
              )}
            >
              <User size={14} className="inline mr-2" /> Participant
            </button>
            <button 
              onClick={() => setRole('admin')}
              className={cn(
                "flex-1 py-3 rounded-lg font-headline text-xs font-bold uppercase tracking-widest transition-all border",
                role === 'admin' 
                  ? "bg-secondary text-on-secondary border-secondary shadow-lg shadow-secondary/20" 
                  : "bg-surface-container-highest text-on-surface-variant border-outline-variant/30 hover:bg-surface-bright"
              )}
            >
              <Shield size={14} className="inline mr-2" /> Admin
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Email Address</label>
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="user@monolith.io"
              />
            </div>
            <div>
              <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Access Key</label>
              <input 
                type="password" 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="••••••••"
              />
            </div>

            <button type="submit" className="w-full btn-primary py-4 text-sm flex items-center justify-center gap-2">
              AUTHENTICATE_SESSION <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-on-surface-variant text-xs">
              New to the monolith? <Link to="/register" className="text-primary hover:underline font-bold">Create Account</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
