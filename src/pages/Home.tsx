import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, Users, Zap, Trophy, ArrowRight, Globe, BookOpen, Menu, X } from 'lucide-react';

const PartnerLogo = ({ name, url }: { name: string, url: string }) => (
  <div className="flex items-center gap-3 grayscale hover:grayscale-0 opacity-40 hover:opacity-100 transition-all duration-500 cursor-pointer">
    <img src={url} alt={name} className="h-8 w-auto object-contain" referrerPolicy="no-referrer" />
    <span className="font-headline font-bold text-lg text-on-surface tracking-tighter">{name}</span>
  </div>
);

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="relative min-h-screen bg-surface overflow-hidden">
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      
      {/* Navigation */}
      <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Terminal className="text-primary" />
            <span className="text-2xl font-bold text-gradient font-headline tracking-tight">XINITY</span>
          </div>
          
          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8 font-headline text-sm tracking-tight">
            <Link to="/events" className="text-secondary font-bold border-b-2 border-secondary pb-1">Events</Link>
            <Link to="/community" className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
              <Globe size={14} /> Community
            </Link>
            <Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2">
              <BookOpen size={14} /> Docs
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link to="/login" className="btn-ghost text-sm">Login</Link>
            <Link to="/register" className="btn-primary text-sm">Register</Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-on-surface p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Nav Overlay */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="md:hidden absolute top-full left-0 w-full bg-surface/95 backdrop-blur-xl border-b border-outline-variant/20 py-6 px-4 flex flex-col gap-6 shadow-2xl"
            >
              <div className="flex flex-col gap-4 font-headline text-lg tracking-tight">
                <Link to="/events" className="text-secondary font-bold" onClick={() => setMobileMenuOpen(false)}>Events</Link>
                <Link to="/community" className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <Globe size={18} /> Community
                </Link>
                <Link to="/docs" className="text-on-surface-variant hover:text-on-surface transition-colors flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                  <BookOpen size={18} /> Docs
                </Link>
              </div>
              <div className="h-px bg-outline-variant/20 w-full"></div>
              <div className="flex flex-col gap-4">
                <Link to="/login" className="btn-ghost text-center py-3" onClick={() => setMobileMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn-primary text-center py-3" onClick={() => setMobileMenuOpen(false)}>Register</Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      <main className="relative z-10 pt-32 md:pt-40 pb-24 px-4 md:px-8 max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center md:text-left flex flex-col items-center md:items-start gap-6"
        >
          <div className="flex items-center gap-3">
            <div className="h-[1px] w-8 bg-secondary/50 hidden md:block"></div>
            <span className="text-secondary font-headline text-xs md:text-sm font-bold uppercase tracking-[0.2em]">
              India's Premier Hackathon Community
            </span>
          </div>
          
          <h1 className="font-headline font-bold text-4xl sm:text-5xl md:text-[5.5rem] leading-[1.1] md:leading-[1.05] tracking-tighter text-on-surface max-w-4xl">
            Build. Compete.<br/>
            <span className="text-gradient">Innovate with XINITY</span>
          </h1>
          
          <p className="font-sans text-on-surface-variant text-base md:text-xl max-w-2xl leading-relaxed px-4 md:px-0">
            Join 10,000+ developers across India in world-class hackathons, open challenges, and collaborative builds.
          </p>

          <div className="flex flex-col sm:flex-row items-center gap-4 md:gap-6 mt-4 w-full sm:w-auto px-4 md:px-0">
            <Link to="/events" className="btn-primary px-8 md:px-10 py-4 text-base md:text-lg rounded-md shadow-[0_0_40px_-5px_rgba(186,158,255,0.4)] w-full sm:w-auto text-center">
              Explore Hackathons
            </Link>
            <Link to="/community" className="group btn-ghost px-8 md:px-10 py-4 text-base md:text-lg flex items-center justify-center gap-2 w-full sm:w-auto">
              Join the Community
              <ArrowRight className="transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 md:gap-12 mt-12 md:mt-16 pt-8 md:pt-12 border-t border-outline-variant/10 w-full max-w-4xl px-4 md:px-0">
            <div className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-3xl md:text-4xl font-headline font-bold text-on-surface">10,000+</span>
              <span className="text-on-surface-variant font-headline text-[10px] md:text-xs uppercase tracking-widest">Developers</span>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-3xl md:text-4xl font-headline font-bold text-on-surface">120+</span>
              <span className="text-on-surface-variant font-headline text-[10px] md:text-xs uppercase tracking-widest">Hackathons Hosted</span>
            </div>
            <div className="flex flex-col gap-1 items-center md:items-start">
              <span className="text-3xl md:text-4xl font-headline font-bold text-on-surface">₹50L+</span>
              <span className="text-on-surface-variant font-headline text-[10px] md:text-xs uppercase tracking-widest">Prize Pool Awarded</span>
            </div>
          </div>
        </motion.section>

        {/* Partners Section */}
        <motion.section
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 1 }}
          viewport={{ once: true }}
          className="mt-24 md:mt-32 pt-16 md:pt-24 border-t border-outline-variant/10"
        >
          <div className="text-center mb-8 md:mb-12">
            <h2 className="font-headline font-bold text-xl md:text-2xl text-on-surface mb-2 uppercase tracking-widest">Ecosystem Partners</h2>
            <p className="text-on-surface-variant text-xs md:text-sm">Empowering the next generation of builders</p>
          </div>
          
          <div className="relative overflow-hidden py-6 md:py-10">
            <div className="flex gap-8 md:gap-12 animate-marquee whitespace-nowrap">
              {[...Array(2)].map((_, i) => (
                <div key={i} className="flex gap-8 md:gap-12 items-center">
                  <PartnerLogo name="Polygon" url="https://cryptologos.cc/logos/polygon-matic-logo.png" />
                  <PartnerLogo name="Solana" url="https://cryptologos.cc/logos/solana-sol-logo.png" />
                  <PartnerLogo name="Ethereum" url="https://cryptologos.cc/logos/ethereum-eth-logo.png" />
                  <PartnerLogo name="Chainlink" url="https://cryptologos.cc/logos/chainlink-link-logo.png" />
                  <PartnerLogo name="Filecoin" url="https://cryptologos.cc/logos/filecoin-fil-logo.png" />
                  <PartnerLogo name="Graph" url="https://cryptologos.cc/logos/the-graph-grt-logo.png" />
                  <PartnerLogo name="Aave" url="https://cryptologos.cc/logos/aave-aave-logo.png" />
                </div>
              ))}
            </div>
            
            {/* Gradient Overlays */}
            <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-surface to-transparent z-10"></div>
            <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-surface to-transparent z-10"></div>
          </div>
        </motion.section>
      </main>

      {/* Decorative Blobs */}
      <div className="absolute top-1/4 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-primary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      <div className="absolute bottom-1/4 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-secondary/20 blur-[80px] md:blur-[120px] rounded-full pointer-events-none z-0"></div>
      
      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <span className="text-[8px] md:text-[10px] font-headline uppercase tracking-widest text-on-surface-variant">System Navigation</span>
        <div className="w-[1px] h-8 md:h-12 bg-gradient-to-b from-secondary to-transparent"></div>
      </div>
    </div>
  );
}
