import React from 'react';
import { motion } from 'motion/react';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import EventCard from '../components/EventCard';
import { MOCK_EVENTS } from '../constants';

export default function EventsList() {
  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="DASHBOARD / EVENTS" />
      
      <main className="md:ml-64 pt-32 pb-24 px-4 md:px-8 max-w-7xl mx-auto relative z-10">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        <section className="mb-16 relative z-10">
          <p className="text-secondary font-headline text-sm tracking-widest mb-4">SYSTEM_INIT // 04</p>
          <h1 className="font-headline text-5xl md:text-7xl font-bold tracking-tight mb-8">DISCOVER<br/>PROTOCOLS.</h1>
          
          {/* Filter Bar */}
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between glass-card p-6 border border-outline-variant/20">
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0">
              <button className="px-6 py-2 bg-secondary/20 text-secondary font-headline text-sm font-medium transition-all">All</button>
              <button className="px-6 py-2 hover:bg-surface-variant text-on-surface-variant font-headline text-sm transition-all">Upcoming</button>
              <button className="px-6 py-2 hover:bg-surface-variant text-on-surface-variant font-headline text-sm transition-all flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse"></span> Live
              </button>
              <button className="px-6 py-2 hover:bg-surface-variant text-on-surface-variant font-headline text-sm transition-all">Past</button>
            </div>
            
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="flex items-center gap-4 w-full md:w-auto">
                <select className="bg-surface-container-lowest border-0 border-b border-outline-variant text-on-surface text-sm font-headline focus:ring-0 focus:border-secondary w-full md:w-40">
                  <option>Category</option>
                  <option>Web3</option>
                  <option>AI/ML</option>
                  <option>Systems</option>
                </select>
                <select className="bg-surface-container-lowest border-0 border-b border-outline-variant text-on-surface text-sm font-headline focus:ring-0 focus:border-secondary w-full md:w-40">
                  <option>Prize Range</option>
                  <option>$0 - $5k</option>
                  <option>$5k - $25k</option>
                  <option>$25k+</option>
                </select>
              </div>
              <div className="relative w-full md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" size={14} />
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="w-full bg-surface-container-lowest border-0 border-b border-outline-variant pl-10 pr-4 py-2 text-sm text-on-surface focus:ring-0 focus:border-secondary placeholder:text-outline/50"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Results Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 relative z-10">
          {MOCK_EVENTS.map((event) => (
            <div key={event.id}>
              <EventCard event={event} />
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-16 flex justify-center items-center gap-4 relative z-10">
          <button className="w-10 h-10 border border-outline-variant/20 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary transition-all">
            <ChevronLeft size={20} />
          </button>
          <span className="font-headline text-sm text-secondary font-bold">01 <span className="text-outline font-normal">/ 08</span></span>
          <button className="w-10 h-10 border border-outline-variant/20 flex items-center justify-center text-outline hover:text-secondary hover:border-secondary transition-all">
            <ChevronRight size={20} />
          </button>
        </div>
      </main>
    </div>
  );
}
