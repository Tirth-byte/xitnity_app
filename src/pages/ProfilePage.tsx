import React, { useState } from 'react';
import { motion } from 'motion/react';
import { User, Mail, Github, Globe, Shield, Terminal, Edit2, Save, X } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.name || 'Arjun Sharma',
    email: user?.email || 'arjun@monolith.io',
    bio: 'Systems Architect & Full-stack Developer. Passionate about building high-performance digital monoliths.',
    github: 'github.com/arjun-sharma',
    website: 'arjun.monolith.io',
    role: user?.role === 'admin' ? 'SYSTEM_ADMIN' : 'ELITE_PARTICIPANT'
  });

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditing(false);
    // Mock save logic
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="USER_PROFILE" />
      
      <main className="md:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-12 relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12 flex justify-between items-end">
            <div>
              <p className="text-secondary font-headline text-sm tracking-[0.3em] uppercase mb-2">Identity Hub</p>
              <h2 className="font-headline font-black text-6xl tracking-tighter text-on-surface">PROFILE_CORE</h2>
            </div>
            {!isEditing ? (
              <button 
                onClick={() => setIsEditing(true)}
                className="btn-secondary py-3 px-6 text-xs flex items-center gap-2"
              >
                <Edit2 size={14} /> EDIT_PROFILE
              </button>
            ) : (
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="btn-ghost py-3 px-6 text-xs flex items-center gap-2 text-on-surface-variant hover:text-on-surface"
                >
                  <X size={14} /> CANCEL
                </button>
                <button 
                  onClick={handleSave}
                  className="btn-primary py-3 px-6 text-xs flex items-center gap-2"
                >
                  <Save size={14} /> SAVE_CHANGES
                </button>
              </div>
            )}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Column: Avatar & Quick Info */}
            <div className="lg:col-span-4 space-y-8">
              <div className="glass-card p-8 rounded-2xl border border-white/10 text-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent"></div>
                <div className="relative z-10">
                  <div className="w-32 h-32 rounded-2xl bg-surface-container-highest border border-white/10 mx-auto mb-6 flex items-center justify-center overflow-hidden">
                    <img 
                      src={`https://picsum.photos/seed/${profile.name}/200/200`} 
                      alt="Avatar" 
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <h3 className="text-2xl font-headline font-bold text-on-surface mb-1">{profile.name}</h3>
                  <p className="text-secondary font-headline text-[10px] tracking-widest uppercase mb-6">{profile.role}</p>
                  
                  <div className="flex justify-center gap-4">
                    <SocialLink icon={Github} href="#" />
                    <SocialLink icon={Globe} href="#" />
                    <SocialLink icon={Mail} href="#" />
                  </div>
                </div>
              </div>

              <div className="glass-card p-6 rounded-2xl border border-white/10">
                <h4 className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-4">System Stats</h4>
                <div className="space-y-4">
                  <StatItem label="Events Participated" value="12" />
                  <StatItem label="Total Submissions" value="08" />
                  <StatItem label="Global Ranking" value="#1,240" />
                  <StatItem label="System Reputation" value="98.4" />
                </div>
              </div>
            </div>

            {/* Right Column: Details & Form */}
            <div className="lg:col-span-8">
              <div className="glass-card p-10 rounded-2xl border border-white/10">
                <form onSubmit={handleSave} className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileField 
                      label="Full Name" 
                      value={profile.name} 
                      isEditing={isEditing} 
                      onChange={(v: string) => setProfile({...profile, name: v})}
                      icon={User}
                    />
                    <ProfileField 
                      label="Email Address" 
                      value={profile.email} 
                      isEditing={isEditing} 
                      onChange={(v: string) => setProfile({...profile, email: v})}
                      icon={Mail}
                      disabled
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">Bio / Mission Statement</label>
                    {isEditing ? (
                      <textarea 
                        value={profile.bio}
                        onChange={(e) => setProfile({...profile, bio: e.target.value})}
                        rows={4}
                        className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg px-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors resize-none"
                      />
                    ) : (
                      <p className="text-on-surface-variant leading-relaxed">{profile.bio}</p>
                    )}
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <ProfileField 
                      label="Github Profile" 
                      value={profile.github} 
                      isEditing={isEditing} 
                      onChange={(v: string) => setProfile({...profile, github: v})}
                      icon={Github}
                    />
                    <ProfileField 
                      label="Personal Website" 
                      value={profile.website} 
                      isEditing={isEditing} 
                      onChange={(v: string) => setProfile({...profile, website: v})}
                      icon={Globe}
                    />
                  </div>

                  <div className="pt-8 border-t border-white/5">
                    <h4 className="text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest mb-6">Security Protocols</h4>
                    <div className="flex items-center justify-between p-4 bg-surface-container-highest/30 rounded-xl border border-white/5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-secondary/10 flex items-center justify-center border border-secondary/20">
                          <Shield className="text-secondary" size={20} />
                        </div>
                        <div>
                          <p className="text-sm font-bold text-on-surface">Two-Factor Authentication</p>
                          <p className="text-xs text-on-surface-variant">Secure your account with an additional layer of protection.</p>
                        </div>
                      </div>
                      <button className="text-xs font-headline font-bold text-secondary uppercase tracking-widest hover:underline">Enable</button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function ProfileField({ label, value, isEditing, onChange, icon: Icon, disabled }: any) {
  return (
    <div className="space-y-2">
      <label className="block text-[10px] font-headline font-bold text-on-surface-variant uppercase tracking-widest">{label}</label>
      <div className="relative">
        <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant" size={16} />
        {isEditing && !disabled ? (
          <input 
            type="text" 
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-full bg-surface-container-lowest border border-outline-variant/30 rounded-lg pl-12 pr-4 py-3 text-on-surface focus:outline-none focus:border-primary transition-colors"
          />
        ) : (
          <div className="w-full bg-surface-container-lowest/50 border border-outline-variant/10 rounded-lg pl-12 pr-4 py-3 text-on-surface-variant">
            {value}
          </div>
        )}
      </div>
    </div>
  );
}

function SocialLink({ icon: Icon, href }: any) {
  return (
    <a 
      href={href} 
      className="w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10 hover:bg-white/10 hover:border-primary/30 transition-all text-on-surface-variant hover:text-primary"
    >
      <Icon size={18} />
    </a>
  );
}

function StatItem({ label, value }: any) {
  return (
    <div className="flex justify-between items-center">
      <span className="text-xs text-on-surface-variant">{label}</span>
      <span className="text-sm font-headline font-bold text-on-surface">{value}</span>
    </div>
  );
}
