import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Calendar, Users, FileText, Handshake, Settings, LogOut, User, Globe, Menu, X } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function Sidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const isAdmin = user?.role === 'admin';
  const [mobileMenuOpen, setMobileMenuOpen] = React.useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navItems = isAdmin 
    ? [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/admin' },
        { icon: Globe, label: 'Community', path: '/community' },
        { icon: Calendar, label: 'Events', path: '/events' },
        { icon: Users, label: 'Participants', path: '/admin/participants' },
        { icon: FileText, label: 'Submissions', path: '/admin/submissions' },
        { icon: Handshake, label: 'Sponsors', path: '/admin/sponsors' },
      ]
    : [
        { icon: LayoutDashboard, label: 'Overview', path: '/dashboard' },
        { icon: Globe, label: 'Community', path: '/community' },
        { icon: Calendar, label: 'My Events', path: '/events' },
        { icon: FileText, label: 'Submissions', path: '/submissions' },
        { icon: Users, label: 'Results', path: '/results' },
        { icon: User, label: 'Profile', path: '/profile' },
      ];

  // For bottom nav, we'll show the first 4 items, and a "More" button
  const bottomNavItems = navItems.slice(0, 4);

  return (
    <>
      {/* Desktop Sidebar */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 border-r border-outline-variant/10 bg-surface/80 backdrop-blur-xl shadow-[10px_0_30px_rgba(0,0,0,0.2)] flex-col py-8 px-4 z-50 font-headline tracking-tight">
        <div className="mb-12 px-4">
          <Link to="/" className="text-2xl font-black tracking-tighter text-gradient">
            XINITY_{isAdmin ? 'ROOT' : 'USER'}
          </Link>
          <p className="text-[10px] text-on-surface-variant tracking-[0.2em] mt-1 opacity-50 uppercase">
            {isAdmin ? 'Infrastructure Layer' : 'Participant Mode'}
          </p>
        </div>

        <div className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.label}
                to={item.path}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded transition-all duration-300",
                  isActive 
                    ? "text-secondary bg-secondary/10 border-r-2 border-secondary font-bold translate-x-1" 
                    : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
                )}
              >
                <item.icon size={20} />
                <span className="text-sm uppercase tracking-widest font-medium">{item.label}</span>
              </Link>
            );
          })}
        </div>

        <div className="pt-8 border-t border-outline-variant/10 space-y-2">
          <Link to="/settings" className={cn(
            "flex items-center gap-3 px-4 py-3 rounded transition-all duration-300",
            location.pathname === '/settings' ? "text-secondary bg-secondary/10 border-r-2 border-secondary font-bold" : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
          )}>
            <Settings size={20} />
            <span className="text-sm uppercase tracking-widest font-medium">Settings</span>
          </Link>

          <div className="flex items-center gap-3 px-4 mt-8">
            <div className="w-10 h-10 rounded-lg bg-surface-container-highest border border-outline-variant/30 flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-sm font-bold truncate">{user?.name || 'Guest User'}</p>
              <p className="text-[10px] text-on-surface-variant truncate uppercase">{isAdmin ? 'System Admin' : `ID: ${user?.id?.slice(0, 6) || '8829-X'}`}</p>
            </div>
          </div>
          
          <button 
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded text-red-400/70 hover:text-red-400 hover:bg-red-400/5 transition-all duration-300 mt-4"
          >
            <LogOut size={20} />
            <span className="text-sm uppercase tracking-widest font-medium">Logout</span>
          </button>

          <div className="px-4 mt-4">
            <span className="text-[10px] font-mono text-on-surface-variant/40">v2.4.0</span>
          </div>
        </div>
      </nav>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center py-2 px-2 z-50 pb-safe">
        {bottomNavItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.label}
              to={item.path}
              className={cn(
                "flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300",
                isActive 
                  ? "text-secondary bg-secondary/10" 
                  : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
              )}
            >
              <item.icon size={20} className={cn("mb-1", isActive && "animate-bounce-slight")} />
              <span className="text-[8px] font-headline font-bold uppercase tracking-widest">{item.label.split(' ')[0]}</span>
            </Link>
          );
        })}
        
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className={cn(
            "flex flex-col items-center justify-center w-16 h-14 rounded-xl transition-all duration-300",
            mobileMenuOpen 
              ? "text-primary bg-primary/10" 
              : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
          )}
        >
          {mobileMenuOpen ? <X size={20} className="mb-1" /> : <Menu size={20} className="mb-1" />}
          <span className="text-[8px] font-headline font-bold uppercase tracking-widest">{mobileMenuOpen ? 'Close' : 'More'}</span>
        </button>
      </nav>

      {/* Mobile Full Menu Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-40 bg-surface/95 backdrop-blur-3xl pt-20 pb-24 px-6 overflow-y-auto flex flex-col">
          <div className="flex items-center gap-4 mb-8 p-4 bg-surface-container-highest rounded-2xl border border-outline-variant/20">
            <div className="w-12 h-12 rounded-xl bg-surface-container-lowest border border-outline-variant/30 flex items-center justify-center overflow-hidden shrink-0">
              <img 
                src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user?.name || 'user'}`} 
                alt="Avatar" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="overflow-hidden">
              <p className="text-lg font-bold truncate">{user?.name || 'Guest User'}</p>
              <p className="text-xs text-on-surface-variant truncate uppercase">{isAdmin ? 'System Admin' : `ID: ${user?.id?.slice(0, 6) || '8829-X'}`}</p>
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <p className="text-[10px] font-bold text-on-surface-variant uppercase tracking-widest mb-4 px-2">Navigation</p>
            {navItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300",
                    isActive 
                      ? "text-secondary bg-secondary/10 border-l-2 border-secondary font-bold" 
                      : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
                  )}
                >
                  <item.icon size={24} />
                  <span className="text-base uppercase tracking-widest font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            <div className="h-px bg-outline-variant/20 my-4"></div>
            
            <Link 
              to="/settings" 
              onClick={() => setMobileMenuOpen(false)}
              className={cn(
                "flex items-center gap-4 px-4 py-4 rounded-xl transition-all duration-300",
                location.pathname === '/settings' ? "text-secondary bg-secondary/10 border-l-2 border-secondary font-bold" : "text-on-surface-variant hover:text-on-surface hover:bg-primary/5"
              )}
            >
              <Settings size={24} />
              <span className="text-base uppercase tracking-widest font-medium">Settings</span>
            </Link>
          </div>

          <button 
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-3 px-4 py-4 rounded-xl text-red-400 bg-red-400/10 hover:bg-red-400/20 transition-all duration-300 mt-8"
          >
            <LogOut size={20} />
            <span className="text-sm uppercase tracking-widest font-bold">Logout</span>
          </button>
        </div>
      )}
    </>
  );
}
