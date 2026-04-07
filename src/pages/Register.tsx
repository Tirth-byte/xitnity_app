import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Terminal, User, ArrowRight } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    register(name, email);
    navigate('/dashboard');
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
          <h1 className="font-headline text-4xl font-black tracking-tighter text-on-surface mb-2">XINITY_REGISTER</h1>
          <p className="text-on-surface-variant font-headline text-xs uppercase tracking-widest">Initialize New Participant Profile</p>
        </div>

        <div className="glass-card p-8 rounded-2xl border border-white/10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Full Name</label>
              <input 
                type="text" 
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                placeholder="Arjun Sharma"
              />
            </div>
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
              INITIALIZE_PROFILE <ArrowRight size={16} />
            </button>
          </form>

          <div className="mt-8 pt-8 border-t border-white/5 text-center">
            <p className="text-on-surface-variant text-xs">
              Already have an account? <Link to="/login" className="text-primary hover:underline font-bold">Login</Link>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
