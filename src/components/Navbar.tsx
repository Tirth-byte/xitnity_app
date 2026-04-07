import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Menu, Search, Bell, Globe, BookOpen, Rocket } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

interface NavbarProps {
  title?: string;
  showSidebarToggle?: boolean;
}

export default function Navbar({ title = "DASHBOARD / OVERVIEW", showSidebarToggle = true }: NavbarProps) {
  const navigate = useNavigate();
  const { isAuthenticated, user } = useAuth();

  return (
    <header className="fixed top-0 right-0 w-full md:w-[calc(100%-16rem)] z-40 bg-surface/60 backdrop-blur-md border-b border-outline-variant/10 flex justify-between items-center px-4 md:px-8 h-16 md:h-20 pt-safe">
      <div className="flex items-center gap-4 md:gap-6">
        <div className="flex items-center gap-2 md:gap-3 text-secondary font-headline uppercase text-[10px] md:text-xs tracking-widest">
          {showSidebarToggle && <Menu size={18} className="cursor-pointer md:hidden" />}
          <span className="truncate max-w-[180px] md:max-w-none">{title}</span>
        </div>
        <div className="hidden md:block h-8 w-[1px] bg-outline-variant/20"></div>
        <div className="hidden md:flex items-center gap-8">
          <Link to="/community" className="flex items-center gap-2 text-[10px] font-headline font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
            <Globe size={14} /> Community
          </Link>
          <Link to="/docs" className="flex items-center gap-2 text-[10px] font-headline font-bold text-on-surface-variant hover:text-primary transition-colors uppercase tracking-widest">
            <BookOpen size={14} /> Docs
          </Link>
        </div>
      </div>

      <div className="flex items-center gap-4 md:gap-6">
        <div className="relative group hidden sm:block">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={14} />
          <input 
            type="text" 
            placeholder="SEARCH_DB..." 
            className="bg-surface-container-lowest border-none border-b border-outline-variant/20 focus:ring-0 focus:border-primary text-xs w-32 md:w-48 pl-10 h-9 font-mono transition-all text-on-surface"
          />
        </div>
        <div className="relative cursor-pointer hover:opacity-80 transition-opacity">
          <Bell className="text-on-surface-variant" size={20} />
          <span className="absolute top-0 right-0 w-2 h-2 bg-secondary rounded-full animate-pulse"></span>
        </div>
        {isAuthenticated && user?.role === 'participant' && (
          <button 
            onClick={() => navigate('/submissions')}
            className="btn-primary text-[10px] tracking-widest uppercase flex items-center gap-2 px-3 py-2 md:px-4 md:py-2"
          >
            <Rocket size={14} /> <span className="hidden md:inline">DEPLOY_NOW</span>
          </button>
        )}
      </div>
    </header>
  );
}
