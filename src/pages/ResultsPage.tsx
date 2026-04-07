import React from 'react';
import { motion } from 'motion/react';
import { Trophy, Medal, Stars, ArrowRight, Terminal, Share2 } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { cn } from '../lib/utils';

const MOCK_RESULTS = [
  { rank: '01', team: 'Neural Monolith', project: 'XINITY_CORE_04', prize: '$25,000', score: '98.4', category: 'PLATINUM' },
  { rank: '02', team: 'Cyber Pulse', project: 'PULSE_PROTOCOL', prize: '$15,000', score: '96.2', category: 'GOLD' },
  { rank: '03', team: 'Omega Architects', project: 'OMEGA_GRID', prize: '$10,000', score: '94.8', category: 'SILVER' },
  { rank: '04', team: 'Data Drifters', project: 'DRIFT_SYSTEM', prize: '$5,000', score: '92.1', category: 'BRONZE' },
  { rank: '05', team: 'System Sentinels', project: 'SENTINEL_SHIELD', prize: '$2,500', score: '91.5', category: 'BRONZE' },
];

export default function ResultsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="MISSION_RESULTS" />
      
      <main className="md:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-12 relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-secondary font-headline text-sm tracking-[0.3em] uppercase mb-2">Final Evaluation</p>
            <h2 className="font-headline font-black text-6xl tracking-tighter text-on-surface">LEADERBOARD_CORE</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            <WinnerCard 
              rank="01" 
              team="Neural Monolith" 
              project="XINITY_CORE_04" 
              prize="$25,000" 
              icon={Trophy} 
              color="text-primary" 
              bg="bg-primary/10"
              border="border-primary/20"
            />
            <WinnerCard 
              rank="02" 
              team="Cyber Pulse" 
              project="PULSE_PROTOCOL" 
              prize="$15,000" 
              icon={Medal} 
              color="text-secondary" 
              bg="bg-secondary/10"
              border="border-secondary/20"
            />
            <WinnerCard 
              rank="03" 
              team="Omega Architects" 
              project="OMEGA_GRID" 
              prize="$10,000" 
              icon={Stars} 
              color="text-on-surface-variant" 
              bg="bg-white/5"
              border="border-white/10"
            />
          </div>

          <div className="glass-card rounded-2xl border border-white/10 overflow-hidden">
            <div className="px-8 py-6 border-b border-white/5 bg-white/[0.02]">
              <h3 className="font-headline font-bold text-lg text-on-surface">Full Ranking Log</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 bg-white/5">
                    <th className="px-8 py-4">Rank</th>
                    <th className="px-8 py-4">Team / Project</th>
                    <th className="px-8 py-4">Category</th>
                    <th className="px-8 py-4">Score</th>
                    <th className="px-8 py-4">Prize</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  {MOCK_RESULTS.map((res) => (
                    <tr key={res.rank} className="hover:bg-white/5 transition-colors group">
                      <td className="px-8 py-6 font-headline font-black text-2xl text-on-surface-variant/30 group-hover:text-primary transition-colors">
                        {res.rank}
                      </td>
                      <td className="px-8 py-6">
                        <div>
                          <p className="font-bold text-on-surface">{res.team}</p>
                          <p className="text-xs text-on-surface-variant font-mono">{res.project}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-2 py-1 rounded-sm text-[10px] font-bold uppercase tracking-widest",
                          res.category === 'PLATINUM' ? "bg-primary/20 text-primary" : 
                          res.category === 'GOLD' ? "bg-secondary/20 text-secondary" : "bg-white/10 text-on-surface-variant"
                        )}>
                          {res.category}
                        </span>
                      </td>
                      <td className="px-8 py-6 font-headline font-bold text-on-surface">{res.score}</td>
                      <td className="px-8 py-6 font-headline font-bold text-secondary">{res.prize}</td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-white/10 rounded-lg transition-colors">
                          <Share2 size={18} className="text-on-surface-variant" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function WinnerCard({ rank, team, project, prize, icon: Icon, color, bg, border }: any) {
  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className={cn("p-8 rounded-2xl border relative overflow-hidden group", bg, border)}
    >
      <div className="absolute -right-4 -top-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={120} />
      </div>
      <div className="relative z-10">
        <div className="flex justify-between items-start mb-8">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center border", bg, border)}>
            <Icon className={color} size={24} />
          </div>
          <span className="font-headline font-black text-4xl opacity-20">{rank}</span>
        </div>
        <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">{team}</h3>
        <p className="text-xs text-on-surface-variant font-mono mb-6 uppercase tracking-widest">{project}</p>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[10px] text-on-surface-variant uppercase tracking-widest mb-1">Prize Allocation</p>
            <p className={cn("text-3xl font-headline font-black", color)}>{prize}</p>
          </div>
          <button className="p-2 bg-white/5 rounded-lg hover:bg-white/10 transition-colors">
            <ArrowRight size={20} className="text-on-surface" />
          </button>
        </div>
      </div>
    </motion.div>
  );
}
