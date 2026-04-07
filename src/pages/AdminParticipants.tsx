import React from 'react';
import { motion } from 'motion/react';
import { Users, Search, Filter, MoreVertical, Mail, Calendar } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MOCK_PARTICIPANTS } from '../constants';
import { cn } from '../lib/utils';

export default function AdminParticipants() {
  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 md:ml-64 pb-24 md:pb-0">
        <Navbar />
        <main className="p-8 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tighter font-headline mb-2">PARTICIPANTS_REGISTRY</h2>
                <p className="text-on-surface-variant font-headline text-sm uppercase tracking-widest">Manage and monitor all community builders</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search builders..." 
                    className="bg-surface-container-highest border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-64"
                  />
                </div>
                <button className="btn-ghost flex items-center gap-2 px-4 py-2 border border-outline-variant/30">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto scroll-touch no-scrollbar">
                <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 bg-surface-container-highest border-b border-outline-variant/10">
                    <th className="px-8 py-4">Builder</th>
                    <th className="px-8 py-4">Email</th>
                    <th className="px-8 py-4">Joined Date</th>
                    <th className="px-8 py-4">Events</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {MOCK_PARTICIPANTS.map((participant) => (
                    <tr key={participant.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center overflow-hidden">
                            <img 
                              src={`https://picsum.photos/seed/${participant.name}/100/100`} 
                              alt={participant.name} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <p className="font-bold">{participant.name}</p>
                            <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-tighter">ID: {participant.id.padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-sm">
                        <div className="flex items-center gap-2">
                          <Mail size={14} />
                          {participant.email}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-sm">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {participant.joinedDate}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className="px-3 py-1 rounded-full bg-secondary/10 text-secondary text-xs font-bold">
                          {participant.eventsCount} Events
                        </span>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider",
                          participant.status === 'active' ? "text-primary" : "text-on-surface-variant"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            participant.status === 'active' ? "bg-primary" : "bg-on-surface-variant"
                          )}></span>
                          {participant.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button className="p-2 hover:bg-surface-container-highest rounded-lg transition-colors text-on-surface-variant">
                          <MoreVertical size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>
    </div>
  );
}
