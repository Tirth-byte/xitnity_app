import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Terminal, Upload, Link as LinkIcon, CheckCircle, ArrowRight } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { cn } from '../lib/utils';

export default function SubmissionPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="PROJECT_SUBMISSION" />
      
      <main className="md:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-12 relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          {!submitted ? (
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-10 rounded-2xl border border-white/10"
            >
              <div className="flex items-center gap-4 mb-8">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center border border-primary/20">
                  <Terminal className="text-primary" size={24} />
                </div>
                <div>
                  <h2 className="text-2xl font-headline font-bold text-on-surface">Initialize Submission</h2>
                  <p className="text-on-surface-variant text-sm font-headline uppercase tracking-widest">Protocol: XINITY_SPRINT_04</p>
                </div>
              </div>

              <form onSubmit={handleSubmit} className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Project Name</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                      placeholder="e.g. Neural Monolith"
                    />
                  </div>
                  <div>
                    <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Primary Tech Stack</label>
                    <input 
                      type="text" 
                      required
                      className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                      placeholder="React, Rust, WebAssembly"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Project Description</label>
                  <textarea 
                    required
                    rows={4}
                    className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                    placeholder="Briefly explain the core architecture and mission of your project..."
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Github Repository</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                      <input 
                        type="url" 
                        required
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                        placeholder="https://github.com/..."
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-2">Demo URL (Optional)</label>
                    <div className="relative">
                      <LinkIcon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
                      <input 
                        type="url" 
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
                        placeholder="https://demo.monolith.io"
                      />
                    </div>
                  </div>
                </div>

                <div className="p-8 border-2 border-dashed border-outline-variant/30 rounded-xl bg-surface-container-highest/30 text-center group hover:border-primary/50 transition-colors cursor-pointer">
                  <Upload className="mx-auto text-on-surface-variant group-hover:text-primary transition-colors mb-4" size={32} />
                  <p className="text-sm font-headline font-bold text-on-surface mb-1">Upload Project Assets</p>
                  <p className="text-xs text-on-surface-variant uppercase tracking-widest">Drag & drop or click to select files (Max 50MB)</p>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button type="submit" className="btn-primary py-4 px-12 text-sm flex items-center gap-2">
                    DEPLOY_SUBMISSION <ArrowRight size={16} />
                  </button>
                  <p className="text-[10px] text-on-surface-variant font-headline tracking-widest uppercase max-w-[200px]">
                    Final submission cannot be edited after deployment.
                  </p>
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-16 rounded-2xl border border-primary/20 text-center"
            >
              <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center border border-primary/20 mx-auto mb-8">
                <CheckCircle className="text-primary" size={48} />
              </div>
              <h2 className="text-4xl font-headline font-black text-on-surface mb-4">SUBMISSION_RECEIVED</h2>
              <p className="text-on-surface-variant max-w-md mx-auto mb-10">
                Your project has been successfully deployed to the XINITY review grid. Our architects will evaluate your submission shortly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button onClick={() => setSubmitted(false)} className="btn-secondary py-3 px-8 text-xs">
                  VIEW_RECEIPT
                </button>
                <button className="btn-primary py-3 px-8 text-xs">
                  RETURN_TO_DASHBOARD
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </main>
    </div>
  );
}
