import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { 
  Calendar, Database, Users, Terminal, Trophy, 
  Medal, Stars, ChevronDown, CheckCircle, Github, Share2, Loader2
} from 'lucide-react';
import { MOCK_EVENTS } from '../constants';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { cn } from '../lib/utils';

export default function EventDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const event = MOCK_EVENTS.find(e => e.id === id) || MOCK_EVENTS[0];
  const [isRegistering, setIsRegistering] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleRegister = () => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    setIsRegistering(true);
    // Mock registration delay
    setTimeout(() => {
      setIsRegistering(false);
      setIsRegistered(true);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Sidebar />
      <Navbar title="EVENT_DETAIL" />
      
      <main className="md:ml-64 relative z-10 pt-20 pb-24 md:pb-0">
        <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
        
        {/* Hero Banner */}
        <section className="relative h-[400px] md:h-[618px] w-full overflow-hidden flex items-end">
          <div className="absolute inset-0 z-0">
            <img 
              src={event.image} 
              className="w-full h-full object-cover" 
              alt="Hero"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/40 to-transparent"></div>
            <div className="absolute inset-0 bg-[#0A0A0F]/20 backdrop-blur-[2px]"></div>
          </div>
          
          <div className="relative z-10 max-w-7xl mx-auto px-8 pb-16 w-full">
            <div className="inline-block mb-4 px-3 py-1 bg-secondary/10 border border-secondary/20 rounded-sm">
              <span className="text-secondary font-headline text-xs uppercase tracking-widest font-bold">SYSTEM_INIT // 04</span>
            </div>
            <h1 className="font-headline text-3xl sm:text-5xl md:text-7xl font-extrabold tracking-tighter mb-6 text-on-surface">
              {event.title.split(' ')[0]} <br/> 
              <span className="text-gradient">{event.title.split(' ').slice(1).join(' ')}</span>
            </h1>
            
            <div className="flex flex-wrap gap-8 items-center text-on-surface-variant font-headline text-sm md:text-base">
              <div className="flex items-center gap-2">
                <Calendar className="text-secondary" size={18} />
                <span>{event.date}</span>
              </div>
              <div className="flex items-center gap-2">
                <Database className="text-secondary" size={18} />
                <span>PRIZE POOL: {event.prizePool}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="text-secondary" size={18} />
                <span>TEAMS: {event.teams}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content & Sidebar */}
        <section className="max-w-7xl mx-auto px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Main Content */}
            <div className="lg:col-span-8 space-y-20">
              {/* Mission Parameters */}
              <div className="space-y-6">
                <h2 className="font-headline text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-widest text-on-surface">Mission Parameters</h2>
                <p className="text-on-surface-variant leading-relaxed text-lg max-w-3xl font-sans">
                  {event.description}
                </p>
                <p className="text-on-surface-variant leading-relaxed text-lg max-w-3xl font-sans">
                  Join elite developers, data scientists, and systems architects for 72 hours of intense building, debugging, and innovation in the heart of the digital monolith.
                </p>
              </div>

              {/* Sequence Log */}
              <div className="space-y-8">
                <h2 className="font-headline text-2xl font-bold border-l-4 border-secondary pl-4 uppercase tracking-widest text-on-surface">Sequence Log</h2>
                <div className="space-y-0 border-l border-outline-variant/30 ml-2">
                  <TimelineItem 
                    title="REGISTRATION_OPEN" 
                    date="SEPTEMBER 15, 09:00 UTC" 
                    desc="Secure your spot and initialize your team profile."
                    active
                  />
                  <TimelineItem 
                    title="HACKING_START" 
                    date="OCTOBER 24, 18:00 UTC" 
                    desc="API keys released. The monolith opens."
                  />
                  <TimelineItem 
                    title="FINAL_SUBMISSION" 
                    date="OCTOBER 27, 18:00 UTC" 
                    desc="Code freeze and documentation finalization."
                  />
                </div>
              </div>

              {/* Allocations */}
              <div className="space-y-8">
                <h2 className="font-headline text-2xl font-bold border-l-4 border-primary pl-4 uppercase tracking-widest text-on-surface">Allocations</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <PrizeCard 
                    rank="01_PLATINUM" 
                    amount="$25,000" 
                    icon={Trophy} 
                    perks={['+ XINITY VENTURE TRACK', '+ GPU CLOUD CREDITS ($10k)']}
                    primary
                  />
                  <PrizeCard 
                    rank="02_GOLD" 
                    amount="$15,000" 
                    icon={Medal} 
                    perks={['+ HARDWARE BUNDLE', '+ GPU CLOUD CREDITS ($5k)']}
                  />
                  <PrizeCard 
                    rank="03_SILVER" 
                    amount="$10,000" 
                    icon={Stars} 
                    perks={['+ SWAG BOX SUPREME', '+ GPU CLOUD CREDITS ($2k)']}
                  />
                </div>
              </div>

              {/* Architects & Mentors */}
              <div className="space-y-8">
                <h2 className="font-headline text-2xl font-bold border-l-4 border-secondary pl-4 uppercase tracking-widest text-on-surface">Architects & Mentors</h2>
                <div className="flex flex-wrap gap-8">
                  <MentorCard name="DR. ELIAS VANCE" role="CTO @ XINITY" seed="elias" />
                  <MentorCard name="SARAH CHEN" role="LEAD AI ARCHITECT" seed="sarah" />
                  <MentorCard name="MARCUS THORNE" role="FOUNDER // OMEGA PROTOCOL" seed="marcus" />
                </div>
              </div>
            </div>

            {/* Sticky Sidebar */}
            <div className="lg:col-span-4">
              <div className="sticky top-28 space-y-6">
                <div className="bg-surface-container-highest/60 backdrop-blur-2xl p-8 rounded-xl border border-primary/20 shadow-[0_0_40px_-10px_rgba(186,158,255,0.2)]">
                  <div className="flex justify-between items-start mb-8">
                    <div>
                      <p className="text-secondary font-headline text-[10px] tracking-[0.2em] mb-1 uppercase">REGISTRATION_STATUS</p>
                      <h3 className="text-2xl font-headline font-bold text-on-surface">{isRegistered ? 'REGISTERED' : 'ACTIVE'}</h3>
                    </div>
                    <div className="text-right">
                      <p className="text-on-surface-variant font-headline text-[10px] tracking-[0.2em] mb-1 uppercase">PARTICIPANTS</p>
                      <h3 className="text-2xl font-headline font-bold text-primary">{isRegistered ? event.participants + 1 : event.participants} / 2,000</h3>
                    </div>
                  </div>
                  
                  <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-xs font-headline">
                      <span className="text-on-surface-variant">CLOSING_IN:</span>
                      <span className="text-on-surface font-bold">14 DAYS : 22H : 04M</span>
                    </div>
                    <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                      <div className="bg-gradient-to-r from-primary to-secondary h-full w-[62%]"></div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-8">
                    <CheckItem label="Global Remote Participation" />
                    <CheckItem label="XINITY API Sandbox Access" />
                    <CheckItem label="Exclusive Dev Swag Kit" />
                  </div>

                  {!isRegistered ? (
                    <button 
                      onClick={handleRegister}
                      disabled={isRegistering}
                      className="w-full btn-primary py-4 text-lg shadow-lg shadow-primary/20 flex items-center justify-center gap-2"
                    >
                      {isRegistering ? (
                        <>
                          <Loader2 className="animate-spin" size={20} /> INITIALIZING...
                        </>
                      ) : (
                        'INITIALIZE_REGISTRATION'
                      )}
                    </button>
                  ) : (
                    <button 
                      onClick={() => navigate('/submissions')}
                      className="w-full btn-secondary py-4 text-lg shadow-lg shadow-secondary/20 flex items-center justify-center gap-2"
                    >
                      GO_TO_SUBMISSION <Share2 size={20} />
                    </button>
                  )}
                  <p className="mt-4 text-center text-[10px] text-on-surface-variant font-headline tracking-widest uppercase">
                    Requires Verified Github Account
                  </p>
                </div>

                <div className="bg-surface-container-low/40 p-6 rounded-xl border border-outline-variant/10">
                  <h4 className="text-on-surface font-headline font-bold text-sm mb-4 tracking-widest uppercase">Protocol Rules</h4>
                  <ul className="space-y-3 text-xs text-on-surface-variant font-sans">
                    <li className="flex gap-2">
                      <span className="text-secondary font-bold">01.</span>
                      <span>All code must be written during the hacking period. No pre-built proprietary engines.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-secondary font-bold">02.</span>
                      <span>Maximum team size is 4 members. Cross-disciplinary teams encouraged.</span>
                    </li>
                    <li className="flex gap-2">
                      <span className="text-secondary font-bold">03.</span>
                      <span>Project must utilize at least one XINITY Core Protocol.</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

function TimelineItem({ title, date, desc, active }: any) {
  return (
    <div className="relative pl-8 pb-12">
      <div className={cn(
        "absolute left-[-5px] top-1 w-[9px] h-[9px] rounded-full",
        active ? "bg-secondary ring-4 ring-secondary/20" : "bg-outline-variant"
      )}></div>
      <h3 className="font-headline font-bold text-on-surface">{title}</h3>
      <p className={cn("text-sm font-headline mb-2", active ? "text-secondary" : "text-on-surface-variant uppercase")}>{date}</p>
      <p className="text-on-surface-variant text-sm">{desc}</p>
    </div>
  );
}

function PrizeCard({ rank, amount, icon: Icon, perks, primary }: any) {
  return (
    <div className={cn(
      "bg-surface-container-highest/40 backdrop-blur-xl p-8 rounded-lg border transition-all group",
      primary ? "border-primary/10 hover:border-primary/40" : "border-outline-variant/10 hover:border-secondary/40"
    )}>
      <Icon className={cn("mb-4", primary ? "text-primary" : "text-secondary")} size={32} />
      <h3 className="font-headline font-extrabold text-xl mb-1">{rank}</h3>
      <p className={cn("text-2xl font-bold mb-4", primary ? "text-primary" : "text-secondary")}>{amount}</p>
      <ul className="text-xs text-on-surface-variant space-y-2 font-headline">
        {perks.map((perk: string) => <li key={perk}>{perk}</li>)}
      </ul>
    </div>
  );
}

function MentorCard({ name, role, seed }: any) {
  return (
    <div className="flex items-center gap-4 bg-surface-container/60 p-4 rounded-xl border border-outline-variant/10 pr-8">
      <img 
        className="w-16 h-16 rounded-lg grayscale hover:grayscale-0 transition-all object-cover" 
        src={`https://picsum.photos/seed/${seed}/100/100`} 
        alt={name}
        referrerPolicy="no-referrer"
      />
      <div>
        <h4 className="font-headline font-bold text-on-surface">{name}</h4>
        <p className="text-secondary text-xs font-headline uppercase tracking-wider">{role}</p>
      </div>
    </div>
  );
}

function CheckItem({ label }: any) {
  return (
    <div className="flex items-center gap-3 text-sm text-on-surface-variant">
      <CheckCircle className="text-secondary" size={18} />
      <span>{label}</span>
    </div>
  );
}
