import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Handshake, Plus, Search, Filter, MoreVertical, Globe, DollarSign, CheckCircle, Clock, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MOCK_SPONSORS } from '../constants';
import { cn } from '../lib/utils';
import { Sponsor } from '../types';

export default function AdminSponsors() {
  const [sponsors, setSponsors] = useState<Sponsor[]>(MOCK_SPONSORS);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newSponsor, setNewSponsor] = useState({
    name: '',
    tier: 'silver' as Sponsor['tier'],
    contribution: '',
    logo: 'https://picsum.photos/seed/sponsor/200/200',
    status: 'active' as Sponsor['status']
  });

  const totalContribution = useMemo(() => {
    return sponsors.reduce((acc, curr) => {
      const val = parseInt(curr.contribution.replace(/[^0-9]/g, '')) || 0;
      return acc + val;
    }, 0);
  }, [sponsors]);

  const handleAddSponsor = (e: React.FormEvent) => {
    e.preventDefault();
    const sponsor: Sponsor = {
      id: (sponsors.length + 1).toString(),
      name: newSponsor.name,
      tier: newSponsor.tier,
      contribution: `$${Number(newSponsor.contribution).toLocaleString()}`,
      logo: newSponsor.logo,
      status: newSponsor.status
    };
    setSponsors([sponsor, ...sponsors]);
    setIsModalOpen(false);
    setNewSponsor({
      name: '',
      tier: 'silver',
      contribution: '',
      logo: 'https://picsum.photos/seed/sponsor/200/200',
      status: 'active'
    });
  };

  const handleRemoveSponsor = (id: string) => {
    setSponsors(sponsors.filter(s => s.id !== id));
  };

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
                <h2 className="text-4xl font-black tracking-tighter font-headline mb-2">SPONSORS_NETWORK</h2>
                <p className="text-on-surface-variant font-headline text-sm uppercase tracking-widest">Manage ecosystem partners and contributions</p>
              </div>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="btn-primary flex items-center gap-2 px-6 py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(186,158,255,0.3)]"
                >
                  <Plus size={18} />
                  <span>Add Partner</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              <div className="glass-card p-6 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-1">Total Contributions</p>
                <h3 className="text-3xl font-black tracking-tighter font-headline text-primary">${totalContribution.toLocaleString()}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-secondary font-bold">
                  <CheckCircle size={14} />
                  <span>Verified ecosystem funding</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-1">Active Partners</p>
                <h3 className="text-3xl font-black tracking-tighter font-headline text-secondary">{sponsors.length}</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-on-surface-variant font-bold">
                  <Clock size={14} />
                  <span>Global network scale</span>
                </div>
              </div>
              <div className="glass-card p-6 rounded-xl border border-outline-variant/10">
                <p className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-1">Ecosystem Reach</p>
                <h3 className="text-3xl font-black tracking-tighter font-headline text-on-surface">{(sponsors.length * 35).toFixed(0)}K+</h3>
                <div className="mt-4 flex items-center gap-2 text-xs text-primary font-bold">
                  <Globe size={14} />
                  <span>Global developer network</span>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <table className="w-full text-left">
                <thead>
                  <tr className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 bg-surface-container-highest border-b border-outline-variant/10">
                    <th className="px-8 py-4">Partner</th>
                    <th className="px-8 py-4">Tier</th>
                    <th className="px-8 py-4">Contribution</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {sponsors.map((sponsor) => (
                    <tr key={sponsor.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-lg bg-surface-container-highest border border-outline-variant/30 p-2 flex items-center justify-center overflow-hidden">
                            <img 
                              src={sponsor.logo} 
                              alt={sponsor.name} 
                              className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <p className="font-bold">{sponsor.name}</p>
                            <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-tighter">ID: {sponsor.id.padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                          sponsor.tier === 'platinum' ? "bg-primary/10 text-primary border-primary/20" : 
                          sponsor.tier === 'gold' ? "bg-secondary/10 text-secondary border-secondary/20" : "bg-on-surface-variant/10 text-on-surface-variant border-on-surface-variant/20"
                        )}>
                          {sponsor.tier}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-sm font-bold">
                        <div className="flex items-center gap-1">
                          <DollarSign size={14} />
                          {sponsor.contribution}
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider",
                          sponsor.status === 'active' ? "text-primary" : "text-secondary"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            sponsor.status === 'active' ? "bg-primary" : "bg-secondary"
                          )}></span>
                          {sponsor.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleRemoveSponsor(sponsor.id)}
                          className="p-2 hover:bg-red-500/10 rounded-lg transition-colors text-red-400"
                          title="Remove Partner"
                        >
                          <X size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Add Partner Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-outline-variant/10 flex justify-between items-center">
                <h3 className="text-2xl font-black tracking-tighter font-headline">ADD_PARTNER</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-on-surface-variant hover:text-on-surface">
                  <X size={24} />
                </button>
              </div>
              <form onSubmit={handleAddSponsor} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Partner Name</label>
                    <input 
                      required
                      type="text" 
                      value={newSponsor.name}
                      onChange={(e) => setNewSponsor({...newSponsor, name: e.target.value})}
                      placeholder="e.g. Google Cloud"
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Tier</label>
                      <select 
                        value={newSponsor.tier}
                        onChange={(e) => setNewSponsor({...newSponsor, tier: e.target.value as Sponsor['tier']})}
                        className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      >
                        <option value="platinum">Platinum</option>
                        <option value="gold">Gold</option>
                        <option value="silver">Silver</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Contribution ($)</label>
                      <input 
                        required
                        type="number" 
                        value={newSponsor.contribution}
                        onChange={(e) => setNewSponsor({...newSponsor, contribution: e.target.value})}
                        placeholder="5000"
                        className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Logo URL (Optional)</label>
                    <input 
                      type="text" 
                      value={newSponsor.logo}
                      onChange={(e) => setNewSponsor({...newSponsor, logo: e.target.value})}
                      placeholder="https://..."
                      className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                    />
                  </div>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    type="button"
                    onClick={() => setIsModalOpen(false)}
                    className="flex-1 btn-ghost border border-outline-variant/30 py-3 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    type="submit"
                    className="flex-1 btn-primary py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(186,158,255,0.3)]"
                  >
                    Confirm Partner
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
