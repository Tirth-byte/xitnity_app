import React from 'react';
import { motion } from 'motion/react';
import { 
  Rocket, Terminal, Bolt, ArrowRight, Share2, Code2, Trophy, MessageSquare, Calendar, Users, Plus
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MOCK_ACTIVITIES } from '../constants';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function ParticipantDashboard() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="DASHBOARD / OVERVIEW" />
      
      <main className="md:ml-64 pt-24 pb-24 md:pb-12 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        {/* Hero Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-8 relative z-10">
          <div className="max-w-2xl">
            <p className="text-secondary font-headline font-bold text-xs uppercase tracking-[0.3em] mb-4">SYSTEM_STATUS: ACTIVE</p>
            <h2 className="font-headline text-7xl font-bold tracking-tighter leading-[0.95] text-on-surface">
              Welcome back, <br/>
              <span className="text-gradient">{user?.name?.split(' ')[0] || 'User'}!</span>
            </h2>
          </div>
          <div className="bg-surface-container-highest/60 backdrop-blur-xl p-6 rounded-xl border border-outline-variant/10 flex items-center gap-6 min-w-[280px]">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center border border-primary/20">
              <Bolt className="text-primary" size={32} />
            </div>
            <div>
              <p className="text-[10px] text-on-surface-variant uppercase tracking-widest">Login Streak</p>
              <p className="text-2xl font-headline font-bold text-on-surface">14 DAYS</p>
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 relative z-10">
          {/* Events Joined */}
          <div className="md:col-span-4 glass-card p-8 rounded-xl group">
            <div className="flex justify-between items-start mb-8">
              <Rocket className="text-primary opacity-50 group-hover:opacity-100 transition-opacity" size={40} />
              <span className="text-[10px] font-bold text-secondary uppercase tracking-widest border border-secondary/20 px-2 py-1 rounded">PRO_LEVEL</span>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mb-1">Events Joined</p>
            <h3 className="text-5xl font-headline font-bold text-on-surface mb-6">12</h3>
            <div className="w-full h-1.5 bg-surface-container-highest rounded-full overflow-hidden">
              <div className="h-full bg-gradient-to-r from-primary to-secondary w-[72%]"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-3 uppercase tracking-tighter">72% of Monthly Target</p>
          </div>

          {/* Active Submissions */}
          <div className="md:col-span-4 glass-card p-8 rounded-xl group">
            <div className="flex justify-between items-start mb-8">
              <Terminal className="text-secondary opacity-50 group-hover:opacity-100 transition-opacity" size={40} />
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                <span className="text-[10px] font-bold text-secondary uppercase tracking-widest">Processing</span>
              </div>
            </div>
            <p className="text-sm text-on-surface-variant font-medium mb-1">Active Submissions</p>
            <h3 className="text-5xl font-headline font-bold text-on-surface mb-6">04</h3>
            <div className="flex gap-1">
              <div className="h-1 flex-1 bg-secondary rounded-full"></div>
              <div className="h-1 flex-1 bg-secondary rounded-full"></div>
              <div className="h-1 flex-1 bg-secondary/20 rounded-full"></div>
              <div className="h-1 flex-1 bg-secondary/20 rounded-full"></div>
            </div>
            <p className="text-[10px] text-on-surface-variant mt-3 uppercase tracking-tighter">Next Review: 4h 12m</p>
          </div>

          {/* Rank Card */}
          <div className="md:col-span-4 bg-primary/10 backdrop-blur-md border border-primary/20 p-8 rounded-xl relative overflow-hidden group">
            <div className="absolute -right-8 -top-8 w-32 h-32 bg-primary/20 blur-3xl rounded-full transition-all group-hover:scale-150"></div>
            <div className="relative z-10">
              <p className="text-xs text-primary font-bold uppercase tracking-widest mb-8">Current Standing</p>
              <h3 className="text-6xl font-headline font-black text-on-surface tracking-tighter mb-2">TOP 12%</h3>
              <p className="text-sm text-primary/70 font-medium max-w-[180px]">You're outperforming 8,420 other participants this season.</p>
              <button className="mt-8 flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-on-surface hover:text-secondary transition-colors">
                View Leaderboard <ArrowRight size={14} />
              </button>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="md:col-span-8 bg-surface-container-low border border-outline-variant/10 rounded-xl overflow-hidden">
            <div className="px-8 py-6 border-b border-outline-variant/10 flex justify-between items-center">
              <h4 className="font-headline font-bold text-lg text-on-surface">Recent Activity</h4>
              <span className="text-[10px] text-on-surface-variant font-bold uppercase tracking-widest">LOG_TIMESTAMP_09:41</span>
            </div>
            <div className="divide-y divide-outline-variant/10">
              {MOCK_ACTIVITIES.map((activity) => (
                <div key={activity.id} className="px-8 py-5 flex items-center justify-between hover:bg-primary/5 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded bg-secondary/10 flex items-center justify-center">
                      {activity.type === 'join' && <Share2 className="text-secondary" size={20} />}
                      {activity.type === 'submit' && <Code2 className="text-primary" size={20} />}
                      {activity.type === 'badge' && <Trophy className="text-on-surface-variant" size={20} />}
                      {activity.type === 'comment' && <MessageSquare className="text-secondary" size={20} />}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-on-surface">{activity.title}</p>
                      <p className="text-xs text-on-surface-variant">{activity.subtitle}</p>
                    </div>
                  </div>
                  <span className="text-[10px] text-on-surface-variant font-medium">{activity.timestamp}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Events */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="bg-surface-container-highest border border-outline-variant/10 rounded-xl p-6 flex-1">
              <h4 className="font-headline font-bold text-lg text-on-surface mb-6">Upcoming</h4>
              <div className="space-y-6">
                <div className="relative pl-6 border-l border-primary/30 py-2">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-primary ring-4 ring-primary/20"></div>
                  <p className="text-[10px] font-bold text-primary uppercase tracking-widest mb-1">In 02 Days</p>
                  <p className="text-sm font-medium text-on-surface">Quantum Algorithms Lab</p>
                  <p className="text-xs text-on-surface-variant mb-3">Technical Workshop</p>
                  <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                      <img 
                        key={i}
                        src={`https://picsum.photos/seed/${i}/30/30`} 
                        alt="user" 
                        className="w-6 h-6 rounded-full border border-surface"
                        referrerPolicy="no-referrer"
                      />
                    ))}
                    <div className="w-6 h-6 rounded-full bg-surface-container-highest border border-outline-variant/20 flex items-center justify-center text-[8px]">+42</div>
                  </div>
                </div>
                <div className="relative pl-6 border-l border-outline-variant/10 py-2">
                  <div className="absolute -left-[5px] top-2 w-2 h-2 rounded-full bg-on-surface-variant/20"></div>
                  <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-1">In 05 Days</p>
                  <p className="text-sm font-medium text-on-surface">UI/UX Futuristic Flow</p>
                  <p className="text-xs text-on-surface-variant">Design Sprint</p>
                </div>
              </div>
              <button className="w-full mt-8 btn-primary">
                Browse All Events
              </button>
            </div>
            
            <div className="bg-surface-container-lowest border border-outline-variant/20 rounded-xl p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-secondary shadow-[0_0_8px_#53ddfc]"></div>
                <span className="text-[10px] font-bold text-on-surface uppercase tracking-tighter">System Health: 100%</span>
              </div>
              <span className="text-[10px] text-on-surface-variant">v4.0.1-STABLE</span>
            </div>
          </div>
        </div>
      </main>

      {/* FAB */}
      <button className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-br from-primary to-secondary rounded shadow-[0_0_20px_rgba(186,158,255,0.3)] flex items-center justify-center text-on-primary z-50 hover:scale-110 transition-all duration-200 group">
        <Plus className="group-hover:rotate-90 transition-transform" />
      </button>
    </div>
  );
}
