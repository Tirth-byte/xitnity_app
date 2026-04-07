import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Settings, Bell, Shield, Terminal, Database, Globe, Moon, Sun, Monitor, LogOut } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { cn } from '../lib/utils';

export default function SettingsPage() {
  const { logout } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('notifications');
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    sms: false,
    mentions: true
  });

  const [security, setSecurity] = useState({
    twoFactor: false,
    sessionTimeout: '30m',
    loginAlerts: true
  });

  const [apiAccess, setApiAccess] = useState({
    apiKey: 'sk_live_••••••••••••••••••••',
    webhookUrl: 'https://api.monolith.io/webhooks/v1',
    rateLimit: '1000 req/min'
  });

  const [localization, setLocalization] = useState({
    language: 'English (US)',
    timezone: 'UTC+5:30 (IST)',
    dateFormat: 'DD/MM/YYYY'
  });

  const renderContent = () => {
    switch (activeTab) {
      case 'notifications':
        return (
          <div className="glass-card p-10 rounded-2xl border border-white/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Bell className="text-primary" size={24} /> Notification Protocols
            </h3>
            <div className="space-y-6">
              <ToggleItem 
                label="Email Notifications" 
                desc="Receive system logs and mission updates via email." 
                enabled={notifications.email}
                onChange={() => setNotifications({...notifications, email: !notifications.email})}
              />
              <ToggleItem 
                label="Push Notifications" 
                desc="Real-time alerts for critical system events." 
                enabled={notifications.push}
                onChange={() => setNotifications({...notifications, push: !notifications.push})}
              />
              <ToggleItem 
                label="SMS Alerts" 
                desc="Emergency protocol notifications via mobile." 
                enabled={notifications.sms}
                onChange={() => setNotifications({...notifications, sms: !notifications.sms})}
              />
              <ToggleItem 
                label="Team Mentions" 
                desc="Alerts when your team profile is tagged." 
                enabled={notifications.mentions}
                onChange={() => setNotifications({...notifications, mentions: !notifications.mentions})}
              />
            </div>
          </div>
        );
      case 'security':
        return (
          <div className="glass-card p-10 rounded-2xl border border-white/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Shield className="text-secondary" size={24} /> Security Matrix
            </h3>
            <div className="space-y-6">
              <ToggleItem 
                label="Two-Factor Authentication" 
                desc="Add an extra layer of security to your account." 
                enabled={security.twoFactor}
                onChange={() => setSecurity({...security, twoFactor: !security.twoFactor})}
              />
              <ToggleItem 
                label="Login Alerts" 
                desc="Get notified of new logins from unrecognized devices." 
                enabled={security.loginAlerts}
                onChange={() => setSecurity({...security, loginAlerts: !security.loginAlerts})}
              />
              <div className="pt-4">
                <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Session Timeout</label>
                <select 
                  value={security.sessionTimeout}
                  onChange={(e) => setSecurity({...security, sessionTimeout: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                >
                  <option value="15m">15 Minutes</option>
                  <option value="30m">30 Minutes</option>
                  <option value="1h">1 Hour</option>
                  <option value="4h">4 Hours</option>
                </select>
              </div>
            </div>
          </div>
        );
      case 'api':
        return (
          <div className="glass-card p-10 rounded-2xl border border-white/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Terminal className="text-primary" size={24} /> API Access Control
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Production API Key</label>
                <div className="flex gap-2">
                  <input 
                    readOnly
                    type="text" 
                    value={apiAccess.apiKey}
                    className="flex-1 bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 font-mono text-xs focus:outline-none"
                  />
                  <button className="btn-secondary px-4 py-2 text-[10px] uppercase">Rotate</button>
                </div>
              </div>
              <div>
                <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Webhook Endpoint</label>
                <input 
                  type="text" 
                  value={apiAccess.webhookUrl}
                  onChange={(e) => setApiAccess({...apiAccess, webhookUrl: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 text-sm focus:outline-none focus:border-primary transition-colors"
                />
              </div>
              <div className="p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <p className="text-[10px] font-headline uppercase tracking-widest text-primary mb-1">Current Rate Limit</p>
                <p className="text-lg font-bold text-on-surface">{apiAccess.rateLimit}</p>
              </div>
            </div>
          </div>
        );
      case 'data':
        return (
          <div className="glass-card p-10 rounded-2xl border border-white/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Database className="text-secondary" size={24} /> Data Management
            </h3>
            <div className="space-y-6">
              <div className="p-6 bg-surface-container-highest rounded-xl border border-outline-variant/10">
                <p className="font-bold text-on-surface mb-1">Export Personal Data</p>
                <p className="text-xs text-on-surface-variant mb-4">Download a copy of all your data in JSON format.</p>
                <button className="btn-secondary w-full py-3 text-xs uppercase tracking-widest">Request Export</button>
              </div>
              <div className="p-6 bg-surface-container-highest rounded-xl border border-outline-variant/10">
                <p className="font-bold text-on-surface mb-1">Clear Cache</p>
                <p className="text-xs text-on-surface-variant mb-4">Remove locally stored system logs and temporary assets.</p>
                <button className="btn-ghost w-full py-3 text-xs uppercase tracking-widest">Purge Cache</button>
              </div>
            </div>
          </div>
        );
      case 'localization':
        return (
          <div className="glass-card p-10 rounded-2xl border border-white/10">
            <h3 className="text-xl font-headline font-bold text-on-surface mb-8 flex items-center gap-3">
              <Globe className="text-primary" size={24} /> Localization Sync
            </h3>
            <div className="space-y-6">
              <div>
                <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">System Language</label>
                <select 
                  value={localization.language}
                  onChange={(e) => setLocalization({...localization, language: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                >
                  <option>English (US)</option>
                  <option>Hindi (India)</option>
                  <option>Spanish (ES)</option>
                  <option>Japanese (JP)</option>
                </select>
              </div>
              <div>
                <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Timezone</label>
                <select 
                  value={localization.timezone}
                  onChange={(e) => setLocalization({...localization, timezone: e.target.value})}
                  className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors text-sm"
                >
                  <option>UTC+5:30 (IST)</option>
                  <option>UTC-8:00 (PST)</option>
                  <option>UTC+0:00 (GMT)</option>
                </select>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="SYSTEM_SETTINGS" />
      
      <main className="md:ml-64 pt-28 px-4 md:px-12 pb-24 md:pb-12 relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        <div className="max-w-4xl mx-auto relative z-10">
          <div className="mb-12">
            <p className="text-secondary font-headline text-sm tracking-[0.3em] uppercase mb-2">Configuration Hub</p>
            <h2 className="font-headline font-black text-4xl sm:text-6xl tracking-tighter text-on-surface">SETTINGS_CORE</h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Navigation Sidebar */}
            <div className="lg:col-span-4 space-y-2">
              <SettingsNav 
                icon={Bell} 
                label="Notifications" 
                active={activeTab === 'notifications'} 
                onClick={() => setActiveTab('notifications')}
              />
              <SettingsNav 
                icon={Shield} 
                label="Security" 
                active={activeTab === 'security'} 
                onClick={() => setActiveTab('security')}
              />
              <SettingsNav 
                icon={Terminal} 
                label="API Access" 
                active={activeTab === 'api'} 
                onClick={() => setActiveTab('api')}
              />
              <SettingsNav 
                icon={Database} 
                label="Data Management" 
                active={activeTab === 'data'} 
                onClick={() => setActiveTab('data')}
              />
              <SettingsNav 
                icon={Globe} 
                label="Localization" 
                active={activeTab === 'localization'} 
                onClick={() => setActiveTab('localization')}
              />
              <div className="pt-8">
                <button 
                  onClick={logout}
                  className="w-full flex items-center gap-3 px-6 py-4 rounded-xl text-red-400 hover:bg-red-400/10 transition-all font-headline font-bold text-xs uppercase tracking-widest border border-transparent hover:border-red-400/20"
                >
                  <LogOut size={18} /> TERMINATE_SESSION
                </button>
              </div>
            </div>

            {/* Content Area */}
            <div className="lg:col-span-8 space-y-8">
              {/* Active Tab Content */}
              {renderContent()}

              {/* Appearance Settings (Always Visible) */}
              <div className="glass-card p-10 rounded-2xl border border-white/10">
                <h3 className="text-xl font-headline font-black text-on-surface mb-8 flex items-center gap-3">
                  <Monitor className="text-secondary" size={24} /> Interface Theme
                </h3>
                
                <div className="grid grid-cols-3 gap-4">
                  <ThemeOption 
                    icon={Sun} 
                    label="Light" 
                    active={theme === 'light'} 
                    onClick={() => setTheme('light')}
                  />
                  <ThemeOption 
                    icon={Moon} 
                    label="Dark" 
                    active={theme === 'dark'} 
                    onClick={() => setTheme('dark')}
                  />
                  <ThemeOption 
                    icon={Monitor} 
                    label="System" 
                    onClick={() => setTheme('dark')}
                  />
                </div>
              </div>

              {/* Danger Zone */}
              <div className="p-10 rounded-2xl border border-red-500/20 bg-red-500/5">
                <h3 className="text-xl font-headline font-black text-red-400 mb-4">DANGER_ZONE</h3>
                <p className="text-sm text-red-400/70 mb-8">Once you delete your profile, there is no going back. Please be certain.</p>
                <button className="px-6 py-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-400 text-xs font-headline font-bold uppercase tracking-widest hover:bg-red-500/30 transition-all">
                  DELETE_ACCOUNT
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

function SettingsNav({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 px-6 py-4 rounded-xl transition-all font-headline font-bold text-xs uppercase tracking-widest border",
        active 
          ? "bg-primary/10 text-primary border-primary/20 shadow-lg shadow-primary/5" 
          : "text-on-surface-variant hover:bg-white/5 border-transparent hover:border-white/10"
      )}
    >
      <Icon size={18} /> {label}
    </button>
  );
}

function ToggleItem({ label, desc, enabled, onChange }: any) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="text-sm font-bold text-on-surface">{label}</p>
        <p className="text-xs text-on-surface-variant">{desc}</p>
      </div>
      <button 
        onClick={onChange}
        className={cn(
          "w-12 h-6 rounded-full relative transition-colors",
          enabled ? "bg-primary" : "bg-surface-container-highest"
        )}
      >
        <div className={cn(
          "absolute top-1 w-4 h-4 rounded-full bg-white transition-all",
          enabled ? "left-7" : "left-1"
        )}></div>
      </button>
    </div>
  );
}

function ThemeOption({ icon: Icon, label, active, onClick }: any) {
  return (
    <button 
      onClick={onClick}
      className={cn(
        "flex flex-col items-center gap-3 p-6 rounded-xl border transition-all",
        active 
          ? "bg-secondary/10 border-secondary/30 text-secondary" 
          : "bg-surface-container-highest/30 border-white/5 text-on-surface-variant hover:border-white/10"
      )}
    >
      <Icon size={24} />
      <span className="text-[10px] font-headline font-bold uppercase tracking-widest">{label}</span>
    </button>
  );
}
