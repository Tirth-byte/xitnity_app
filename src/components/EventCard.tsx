import React from 'react';
import { Link } from 'react-router-dom';
import { Terminal, Users, Clock } from 'lucide-react';
import { Event } from '../types';
import { cn } from '../lib/utils';

interface EventCardProps {
  event: Event;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Link 
      to={`/events/${event.id}`}
      className="glass-card overflow-hidden group block"
    >
      <div className="relative h-[200px] w-full overflow-hidden">
        <img 
          src={event.image} 
          alt={event.title} 
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-surface-container-high/90 to-transparent"></div>
        <div className="absolute top-4 left-4">
          {event.status === 'live' ? (
            <span className="bg-red-500/20 text-red-400 border border-red-500/30 px-3 py-1 text-[10px] font-bold uppercase tracking-wider flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400 animate-pulse"></span> Live Now
            </span>
          ) : (
            <span className="bg-surface-container-highest text-on-surface-variant px-3 py-1 text-[10px] font-bold uppercase tracking-wider">
              {event.status === 'upcoming' ? 'Upcoming' : 'Ended'}
            </span>
          )}
        </div>
      </div>
      
      <div className="p-8">
        <div className="flex gap-2 mb-4">
          {event.category.map(cat => (
            <span key={cat} className="bg-secondary/10 text-secondary px-2 py-0.5 rounded-sm text-[10px] font-headline font-bold uppercase">
              {cat}
            </span>
          ))}
        </div>
        
        <h3 className="font-headline text-2xl font-bold text-on-surface mb-4 group-hover:text-primary transition-colors">
          {event.title}
        </h3>
        
        <div className="flex items-center justify-between mb-6">
          <div className="flex flex-col">
            <span className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest">Total Prize</span>
            <span className="text-xl font-bold text-secondary font-headline">{event.prizePool}</span>
          </div>
          {event.deadline && (
            <div className="flex flex-col items-end">
              <span className="text-[10px] text-on-surface-variant font-headline uppercase tracking-widest">Deadline</span>
              <span className="text-sm font-bold text-amber-400 font-headline">{event.deadline}</span>
            </div>
          )}
        </div>
        
        <div className="flex items-center justify-between pt-6 border-t border-outline-variant/10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-white/5">
              <img 
                src={`https://picsum.photos/seed/${event.host}/50/50`} 
                alt={event.host} 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
            <span className="text-xs text-on-surface-variant">Host: <span className="text-on-surface font-medium">{event.host}</span></span>
          </div>
          <div className="flex items-center gap-1.5 text-on-surface-variant">
            <Users size={14} />
            <span className="text-xs">{event.participants}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
