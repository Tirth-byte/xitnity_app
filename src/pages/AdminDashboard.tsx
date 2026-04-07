import React from 'react';
import { motion } from 'motion/react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area 
} from 'recharts';
import { useNavigate } from 'react-router-dom';
import { 
  Users, Zap, FileText, CreditCard, Terminal, 
  LayoutDashboard, Calendar, Handshake, Settings, Search, Bell, Menu
} from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MOCK_SUBMISSIONS, MOCK_SPONSORS } from '../constants';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

const DATA = [
  { name: 'Day 1', reg: 400, sub: 240 },
  { name: 'Day 5', reg: 300, sub: 139 },
  { name: 'Day 10', reg: 200, sub: 980 },
  { name: 'Day 15', reg: 278, sub: 390 },
  { name: 'Day 20', reg: 189, sub: 480 },
  { name: 'Day 25', reg: 239, sub: 380 },
  { name: 'Day 30', reg: 349, sub: 430 },
];

export default function AdminDashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const totalPrizePool = MOCK_SPONSORS.reduce((acc, curr) => {
    const val = parseInt(curr.contribution.replace(/[^0-9]/g, '')) || 0;
    return acc + val;
  }, 0);

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="SYSTEM_INIT // 04" />
      
      <main className="md:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-12 relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        {/* Hero Header */}
        <div className="mb-8 md:mb-12 relative z-10">
          <p className="font-headline text-secondary text-[10px] md:text-sm tracking-[0.3em] uppercase mb-2">Operational Overview // Welcome, {user?.name || 'Admin'}</p>
          <h2 className="font-headline font-black text-4xl md:text-6xl tracking-tighter text-on-surface">DASHBOARD_CORE</h2>
        </div>

        {/* Pulse Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12 relative z-10">
          <MetricCard 
            title="Total Builders" 
            value="1,240" 
            trend="+12%" 
            icon={Users} 
            onClick={() => navigate('/admin/participants')}
          />
          <MetricCard 
            title="Active Events" 
            value="4 Live Sprints" 
            icon={Zap} 
            border="border-l-2 border-l-primary/50" 
            onClick={() => navigate('/events')}
          />
          <MetricCard 
            title="Submissions" 
            value="85" 
            subValue="Pending" 
            icon={FileText} 
            status="Action Required: Immediate" 
            onClick={() => navigate('/admin/submissions')}
          />
          <MetricCard 
            title="Prize Pool" 
            value={`$${totalPrizePool.toLocaleString()}`} 
            icon={CreditCard} 
            progress={72} 
            onClick={() => navigate('/admin/sponsors')}
          />
        </div>

        {/* Analytics & Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12 relative z-10">
          {/* Engagement Analytics */}
          <div className="lg:col-span-2 glass-card rounded-xl p-8 relative">
            <div className="flex justify-between items-start mb-12">
              <div>
                <h4 className="font-headline text-xl font-bold">Engagement Analytics</h4>
                <p className="text-on-surface-variant text-sm">Registrations vs Submissions (30 Days)</p>
              </div>
              <div className="flex gap-4">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-primary"></span>
                  <span className="text-[10px] font-headline uppercase">Registrations</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-secondary"></span>
                  <span className="text-[10px] font-headline uppercase">Submissions</span>
                </div>
              </div>
            </div>
            
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={DATA}>
                  <defs>
                    <linearGradient id="colorReg" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#ba9eff" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#ba9eff" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="colorSub" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#53ddfc" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#53ddfc" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="currentColor" strokeOpacity={0.1} vertical={false} />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--color-surface-container)', border: '1px solid var(--color-outline-variant)', borderRadius: '8px' }}
                    itemStyle={{ fontSize: '12px' }}
                  />
                  <Area type="monotone" dataKey="reg" stroke="#ba9eff" fillOpacity={1} fill="url(#colorReg)" strokeWidth={2} />
                  <Area type="monotone" dataKey="sub" stroke="#53ddfc" fillOpacity={1} fill="url(#colorSub)" strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Event Lifecycle Monitor */}
          <div className="glass-card rounded-xl p-8">
            <h4 className="font-headline text-xl font-bold mb-6">Active Lifecycle</h4>
            <div className="space-y-8">
              <LifecycleItem 
                label="Neural_Hack_2024" 
                time="42h REMAINING" 
                progress={85} 
                color="bg-secondary" 
                onClick={() => navigate('/events')}
              />
              <LifecycleItem 
                label="Protocol_X_Sprints" 
                time="12d REMAINING" 
                progress={35} 
                color="bg-primary" 
                onClick={() => navigate('/events')}
              />
              <LifecycleItem 
                label="DeFi_Edge_v2" 
                time="COMPLETED" 
                progress={100} 
                color="bg-on-surface-variant" 
                completed 
                onClick={() => navigate('/events')}
              />
              
              <div className="pt-6 border-t border-outline-variant/10">
                <div className="bg-surface-container-lowest p-4 rounded-lg border border-outline-variant/10">
                  <div className="flex gap-3">
                    <Terminal className="text-secondary" size={16} />
                    <div>
                      <p className="text-[10px] font-mono text-on-surface-variant">LAST_LOG: Sync successful.</p>
                      <p className="text-[10px] font-mono text-on-surface-variant">NODE: US-EAST-1 // STABLE</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Decision Hub */}
        <div className="glass-card rounded-xl overflow-hidden relative z-10">
          <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
            <div>
              <h4 className="font-headline text-xl font-bold">Decision Hub</h4>
              <p className="text-on-surface-variant text-sm">Project Submissions Requiring Review</p>
            </div>
            <button 
              onClick={() => navigate('/admin/submissions')}
              className="text-xs font-headline text-secondary uppercase tracking-widest border border-secondary/20 px-4 py-2 hover:bg-secondary/10 transition-colors"
            >
              View All Submissions
            </button>
          </div>
          <div className="overflow-x-auto scroll-touch no-scrollbar">
            <table className="w-full text-left min-w-[800px]">
              <thead>
                <tr className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 bg-surface-container-highest">
                  <th className="px-8 py-4">Project Name</th>
                  <th className="px-8 py-4">Tech Stack</th>
                  <th className="px-8 py-4">Team Lead</th>
                  <th className="px-8 py-4">Status</th>
                  <th className="px-8 py-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant/10">
                {MOCK_SUBMISSIONS.map((sub) => (
                  <tr key={sub.id} className="hover:bg-primary/5 transition-colors">
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-3">
                        <div className={cn(
                          "w-8 h-8 rounded flex items-center justify-center font-bold text-xs",
                          sub.status === 'rejected' ? "bg-red-500/20 text-red-400" : 
                          sub.status === 'shortlisted' ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                        )}>
                          {sub.initials}
                        </div>
                        <span className="font-bold">{sub.projectName}</span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex gap-2">
                        {sub.techStack.map(tech => (
                          <span key={tech} className="px-2 py-0.5 rounded-sm bg-secondary/10 text-secondary text-[10px] font-mono">
                            {tech}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-8 py-6 text-on-surface-variant text-sm">{sub.teamLead}</td>
                    <td className="px-8 py-6">
                      <span className={cn(
                        "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider",
                        sub.status === 'rejected' ? "text-red-400" : 
                        sub.status === 'shortlisted' ? "text-primary" : "text-secondary"
                      )}>
                        <span className={cn(
                          "w-1.5 h-1.5 rounded-full",
                          sub.status === 'rejected' ? "bg-red-400" : 
                          sub.status === 'shortlisted' ? "bg-primary" : "bg-secondary"
                        )}></span>
                        {sub.status}
                      </span>
                    </td>
                    <td className="px-8 py-6 text-right">
                      <button 
                        onClick={() => navigate('/admin/submissions')}
                        className={cn(
                          "px-4 py-2 rounded-sm text-[10px] font-black uppercase tracking-widest transition-all",
                          sub.status === 'pending' ? "bg-primary text-on-primary hover:brightness-110" : "bg-surface-container-highest border border-outline-variant/30 text-on-surface hover:bg-surface-bright"
                        )}
                      >
                        {sub.status === 'pending' ? 'Grade Now' : 'Review Details'}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}

function MetricCard({ title, value, subValue, trend, icon: Icon, status, progress, border, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "glass-card p-6 rounded-xl flex flex-col justify-between h-40 group relative overflow-hidden transition-all duration-500", 
        border,
        onClick && "cursor-pointer hover:border-primary/30 hover:bg-primary/5"
      )}
    >
      <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
        <Icon size={48} />
      </div>
      <div>
        <p className="text-on-surface-variant text-xs font-headline tracking-widest uppercase mb-1">{title}</p>
        <h3 className="text-3xl font-headline font-bold">
          {value} {subValue && <span className="text-lg font-normal opacity-50">{subValue}</span>}
        </h3>
      </div>
      {trend && (
        <div className="flex items-center gap-2">
          <span className="text-secondary text-xs font-bold">{trend}</span>
          <div className="flex-1 h-[2px] bg-outline-variant/10 relative">
            <div className="absolute inset-y-0 left-0 w-[60%] bg-gradient-to-r from-secondary/0 to-secondary"></div>
          </div>
        </div>
      )}
      {status && <div className="text-[10px] font-mono text-primary uppercase tracking-tighter">{status}</div>}
      {progress && (
        <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
          <div className="bg-primary h-full transition-all duration-1000" style={{ width: `${progress}%` }}></div>
        </div>
      )}
      {!trend && !status && !progress && (
        <div className="flex gap-1">
          <div className="w-2 h-2 rounded-full bg-secondary"></div>
          <div className="w-2 h-2 rounded-full bg-secondary animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-outline-variant/20"></div>
          <div className="w-2 h-2 rounded-full bg-outline-variant/20"></div>
        </div>
      )}
    </div>
  );
}

function LifecycleItem({ label, time, progress, color, completed, onClick }: any) {
  return (
    <div 
      onClick={onClick}
      className={cn(
        "space-y-2 group transition-all duration-300",
        onClick && "cursor-pointer hover:translate-x-1"
      )}
    >
      <div className="flex justify-between text-[10px] font-headline uppercase tracking-widest mb-2">
        <span className="font-bold group-hover:text-primary transition-colors">{label}</span>
        <span className={cn(completed ? "text-on-surface-variant" : color.replace('bg-', 'text-'))}>{time}</span>
      </div>
      <div className={cn("w-full bg-surface-container-highest h-2 rounded-full overflow-hidden", completed && "opacity-30")}>
        <div className={cn("h-full transition-all duration-1000", color)} style={{ width: `${progress}%` }}></div>
      </div>
    </div>
  );
}
