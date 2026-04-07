import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { cn } from '../lib/utils';

// Using Lucide icons for consistency with the rest of the app
import { 
  Terminal as LucideTerminal, 
  Search as LucideSearch, 
  Rocket as LucideRocket, 
  Layers, 
  Cpu, 
  Code, 
  BarChart3, 
  Zap, 
  Settings, 
  Upload,
  ArrowRight,
  FileText,
  Download as LucideDownload,
  Globe,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-surface selection:bg-primary/30 selection:text-secondary overflow-x-hidden">
      {/* Subtle Grid Overlay */}
      <div className="fixed inset-0 grid-bg pointer-events-none z-0"></div>
      
      {/* Atmospheric Glows */}
      <div className="fixed top-[-10%] left-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>
      <div className="fixed bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-secondary/10 rounded-full blur-[120px] pointer-events-none z-0"></div>

      {/* TopAppBar */}
      <header className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/10 flex justify-between items-center px-6 h-16 pt-safe">
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          <LucideTerminal className="text-primary" size={20} />
          <span className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-headline tracking-tighter uppercase">XINITY // DOCS</span>
        </Link>
        <div className="flex items-center gap-6">
          <nav className="hidden md:flex gap-8 items-center">
            <a className="font-headline uppercase tracking-widest text-[10px] font-bold text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">Guide</a>
            <a className="font-headline uppercase tracking-widest text-[10px] font-bold text-on-surface-variant hover:text-secondary transition-colors duration-300" href="#">Changelog</a>
            <Link className="font-headline uppercase tracking-widest text-[10px] font-bold text-on-surface-variant hover:text-secondary transition-colors duration-300" to="/community">Community</Link>
            <Link className="flex items-center gap-2 font-headline uppercase tracking-widest text-[10px] font-bold text-primary hover:text-primary-fixed transition-colors duration-300 bg-primary/10 px-3 py-1.5 rounded-full" to="/">
              <ArrowLeft size={12} /> Back to App
            </Link>
          </nav>
          <LucideSearch className="text-on-surface-variant cursor-pointer hover:text-secondary transition-colors" size={20} />
        </div>
      </header>

      <div className="flex pt-16 min-h-screen relative z-10">
        {/* NavigationDrawer */}
        <aside className="hidden lg:flex fixed left-0 top-16 h-[calc(100vh-64px)] w-72 border-r border-outline-variant/10 bg-surface overflow-y-auto flex-col pt-8">
          <div className="px-6 mb-8">
            <span className="text-secondary font-bold font-headline tracking-widest text-[10px] uppercase">XINITY_OS // V1.0</span>
          </div>
          <nav className="flex flex-col">
            <a className="group flex items-center gap-4 px-6 py-3 text-secondary bg-secondary/10 border-r-2 border-secondary font-bold font-headline uppercase tracking-widest text-[10px] transition-all duration-200" href="#getting-started">
              <LucideRocket size={14} />
              GETTING_STARTED
            </a>
            <a className="group flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface font-headline uppercase tracking-widest text-[10px] transition-all duration-200" href="#core-concepts">
              <Layers size={14} />
              CORE_CONCEPTS
            </a>
            <a className="group flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface font-headline uppercase tracking-widest text-[10px] transition-all duration-200" href="#api-reference">
              <Cpu size={14} />
              API_REFERENCE
            </a>
            <a className="group flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface font-headline uppercase tracking-widest text-[10px] transition-all duration-200" href="#sdk-guides">
              <LucideTerminal size={14} />
              SDK_GUIDES
            </a>
            <a className="group flex items-center gap-4 px-6 py-3 text-on-surface-variant hover:bg-on-surface/5 hover:text-on-surface font-headline uppercase tracking-widest text-[10px] transition-all duration-200" href="#">
              <BarChart3 size={14} />
              SYSTEM_STATUS
            </a>
          </nav>
        </aside>

        {/* Main Content Area */}
        <main className="flex-1 lg:ml-72 px-6 lg:px-12 pt-12 pb-24 lg:pb-12">
          {/* Hero Section */}
          <section className="mb-24 flex flex-col items-start max-w-4xl">
            <span className="text-secondary font-headline text-[10px] font-bold uppercase tracking-[0.4em] mb-6">Documentation // Master Portal</span>
            <h1 className="font-headline font-bold text-6xl md:text-8xl tracking-tight mb-8 uppercase">
              XINITY_OS // <br/><span className="text-primary">DOCUMENTATION</span>
            </h1>
            <p className="text-on-surface-variant text-xl leading-relaxed max-w-2xl font-light mb-12">
              The definitive guide to building, deploying, and managing protocols on the XINITY network. Your gateway to hyper-scalable infrastructure.
            </p>
            
            {/* Search Component */}
            <div className="w-full max-w-2xl relative group">
              <div className="absolute inset-0 bg-primary/20 blur-xl opacity-0 group-focus-within:opacity-100 transition-opacity duration-500"></div>
              <div className="relative flex items-center bg-surface-container-lowest border-b border-outline-variant hover:border-secondary transition-colors h-16 px-6">
                <LucideSearch className="text-secondary mr-4" size={24} />
                <input 
                  className="bg-transparent border-none focus:ring-0 text-on-surface w-full font-headline placeholder:text-outline text-lg" 
                  placeholder="Search technical docs..." 
                  type="text"
                />
                <div className="hidden sm:flex gap-1">
                  <kbd className="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] border border-outline-variant/30">CMD</kbd>
                  <kbd className="bg-surface-container-highest text-on-surface-variant px-2 py-1 rounded text-[10px] border border-outline-variant/30">K</kbd>
                </div>
              </div>
            </div>
          </section>

          {/* GETTING_STARTED Bento Grid */}
          <section className="mb-32" id="getting-started">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-outline-variant/20 flex-1"></div>
              <h2 className="text-secondary font-headline text-[10px] font-bold uppercase tracking-[0.4em] px-4 shrink-0">GETTING_STARTED</h2>
              <div className="h-px bg-outline-variant/20 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Quick Start Card */}
              <div className="glass-card p-8 group border border-outline-variant/20 hover:border-primary/50 transition-all duration-500 rounded-xl">
                <div className="flex justify-between items-start mb-8">
                  <Zap className="text-primary" size={40} />
                  <span className="text-on-surface-variant/40 font-headline text-[10px] uppercase tracking-widest">MODULE // 01</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Quick Start</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-3 text-sm">Jump right into the code and initialize your first protocol shard in under 5 minutes.</p>
                <a className="inline-flex items-center text-primary font-bold tracking-widest text-[10px] uppercase group-hover:gap-4 transition-all duration-300" href="#">
                  INITIALIZE_PROTOCOL <ArrowRight className="ml-2" size={14} />
                </a>
              </div>
              {/* Environment Setup Card */}
              <div className="glass-card p-8 group border border-outline-variant/20 hover:border-secondary/50 transition-all duration-500 rounded-xl">
                <div className="flex justify-between items-start mb-8">
                  <Settings className="text-secondary" size={40} />
                  <span className="text-on-surface-variant/40 font-headline text-[10px] uppercase tracking-widest">MODULE // 02</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">Environment Setup</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-3 text-sm">Configure your local development workspace with the XINITY-CLI and necessary dependencies.</p>
                <a className="inline-flex items-center text-secondary font-bold tracking-widest text-[10px] uppercase group-hover:gap-4 transition-all duration-300" href="#">
                  CONFIG_WORKSPACE <ArrowRight className="ml-2" size={14} />
                </a>
              </div>
              {/* First Deployment Card */}
              <div className="glass-card p-8 group border border-outline-variant/20 hover:border-on-surface/50 transition-all duration-500 rounded-xl">
                <div className="flex justify-between items-start mb-8">
                  <Upload className="text-on-surface" size={40} />
                  <span className="text-on-surface-variant/40 font-headline text-[10px] uppercase tracking-widest">MODULE // 03</span>
                </div>
                <h3 className="text-2xl font-headline font-bold mb-4">First Deployment</h3>
                <p className="text-on-surface-variant mb-8 line-clamp-3 text-sm">Push your localized shard to the Global Mesh Network and verify its integrity on-chain.</p>
                <a className="inline-flex items-center text-on-surface font-bold tracking-widest text-[10px] uppercase group-hover:gap-4 transition-all duration-300" href="#">
                  PUSH_TO_MESH <ArrowRight className="ml-2" size={14} />
                </a>
              </div>
            </div>
          </section>

          {/* CORE_CONCEPTS Section */}
          <section className="mb-32" id="core-concepts">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-outline-variant/20 flex-1"></div>
              <h2 className="text-secondary font-headline text-[10px] font-bold uppercase tracking-[0.4em] px-4 shrink-0">CORE_CONCEPTS</h2>
              <div className="h-px bg-outline-variant/20 flex-1"></div>
            </div>
            <div className="flex flex-col lg:flex-row gap-16">
              <div className="flex-1">
                <div className="border-l-2 border-primary pl-8 mb-12">
                  <h3 className="text-3xl font-headline font-bold mb-6">The Monolith Architecture</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg mb-6">
                    XINITY utilizes a "Vertical Execution" model, contrary to traditional distributed systems. By leveraging the Monolith Architecture, we eliminate asynchronous latency between micro-shards, ensuring that protocol states remain perfectly coherent across the entire global mesh.
                  </p>
                  <p className="text-on-surface-variant leading-relaxed text-lg">
                    This unified state machine approach allows developers to write code as if they were building for a single machine, while XINITY's underlying layer handles the planetary-scale synchronization automatically.
                  </p>
                </div>
                <div className="border-l-2 border-secondary pl-8">
                  <h3 className="text-3xl font-headline font-bold mb-6">Neon Tokenomics</h3>
                  <p className="text-on-surface-variant leading-relaxed text-lg mb-4">
                    The resource layer of XINITY is governed by $XNT—a dynamic tokenomic system designed to reward infrastructure stability over speculative volatility.
                  </p>
                  <ul className="space-y-4 mt-8">
                    <li className="flex gap-4 items-start">
                      <span className="text-secondary font-mono font-bold">01/</span>
                      <span className="text-on-surface text-sm">Gasless Execution for verified developer addresses.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-secondary font-mono font-bold">02/</span>
                      <span className="text-on-surface text-sm">Staking rewards tied directly to protocol uptime and throughput.</span>
                    </li>
                    <li className="flex gap-4 items-start">
                      <span className="text-secondary font-mono font-bold">03/</span>
                      <span className="text-on-surface text-sm">Burn mechanisms activated during high network congestion to preserve value.</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="w-full lg:w-96 shrink-0">
                <div className="glass-card aspect-square relative overflow-hidden flex items-center justify-center border border-outline-variant/10 rounded-xl">
                  <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-secondary/10"></div>
                  <img 
                    alt="Conceptual abstract digital structure" 
                    className="w-full h-full object-cover opacity-50 mix-blend-overlay" 
                    src="https://picsum.photos/seed/tech-arch/800/800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute bottom-4 left-4 right-4 bg-surface-container-lowest/80 backdrop-blur-md p-4 border border-outline-variant/20 rounded-lg">
                    <span className="text-secondary font-headline text-[10px] font-bold block mb-1">SYSTEM_VISUAL // 01</span>
                    <span className="text-on-surface font-bold text-sm tracking-tighter uppercase">ARCH_VISUALIZATION_V2.0</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* API_REFERENCE Section */}
          <section className="mb-32" id="api-reference">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-outline-variant/20 flex-1"></div>
              <h2 className="text-secondary font-headline text-[10px] font-bold uppercase tracking-[0.4em] px-4 shrink-0">API_REFERENCE</h2>
              <div className="h-px bg-outline-variant/20 flex-1"></div>
            </div>
            <div className="glass-card overflow-hidden border border-outline-variant/20 rounded-xl">
              <div className="bg-surface-container-highest px-6 py-3 flex justify-between items-center border-b border-outline-variant/20">
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/50"></div>
                  <div className="w-3 h-3 rounded-full bg-primary/50"></div>
                  <div className="w-3 h-3 rounded-full bg-secondary/50"></div>
                </div>
                <span className="text-on-surface-variant/40 text-[10px] font-mono tracking-widest uppercase">REQUEST_SAMPLE.JSON</span>
              </div>
              <div className="p-8 font-mono text-sm overflow-x-auto leading-relaxed">
                <pre className="text-on-surface-variant">
                  <span className="text-secondary">POST</span> /v1/protocols/deploy <span className="text-primary">{`{`}</span><br/>
                  {`  `} <span className="text-secondary">"id"</span>: <span className="text-primary">"x-node-8892"</span>,<br/>
                  {`  `} <span className="text-secondary">"config"</span>: {`{`}<br/>
                  {`    `} <span className="text-secondary">"mesh_tier"</span>: <span className="text-primary">"ULTRA_LOW_LATENCY"</span>,<br/>
                  {`    `} <span className="text-secondary">"redundancy"</span>: <span className="text-primary">3</span>,<br/>
                  {`    `} <span className="text-secondary">"auto_scale"</span>: <span className="text-primary">true</span><br/>
                  {`  `}<span className="text-primary">{`}`}</span>,<br/>
                  {`  `} <span className="text-secondary">"auth"</span>: <span className="text-primary">"xnt_live_8f72a..."</span><br/>
                  <span className="text-primary">{`}`}</span>
                </pre>
                <div className="mt-8 pt-8 border-t border-outline-variant/10">
                  <div className="flex items-start gap-4">
                    <span className="bg-secondary/10 text-secondary px-2 py-1 text-[10px] font-bold rounded uppercase">RESPONSE</span>
                    <pre className="text-on-surface-variant">
                      <span className="text-primary">{`{`}</span> <span className="text-secondary">"status"</span>: <span className="text-primary">"DEPLOYED"</span>, <span className="text-secondary">"endpoint"</span>: <span className="text-primary">"https://mesh.xinity.io/8892"</span> <span className="text-primary">{`}`}</span>
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* SDK_GUIDES Section */}
          <section className="mb-32" id="sdk-guides">
            <div className="flex items-center gap-4 mb-12">
              <div className="h-px bg-outline-variant/20 flex-1"></div>
              <h2 className="text-secondary font-headline text-[10px] font-bold uppercase tracking-[0.4em] px-4 shrink-0">SDK_GUIDES</h2>
              <div className="h-px bg-outline-variant/20 flex-1"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex items-center p-6 border border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group rounded-xl glass-card">
                <div className="w-12 h-12 flex items-center justify-center bg-primary/10 mr-6 rounded-lg">
                  <Code className="text-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface mb-1 uppercase tracking-tight">XINITY.JS SDK</h4>
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">v2.4.1 (Stable)</span>
                </div>
                <button className="text-on-surface-variant group-hover:text-primary transition-colors">
                  <LucideDownload size={20} />
                </button>
              </div>
              <div className="flex items-center p-6 border border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group rounded-xl glass-card">
                <div className="w-12 h-12 flex items-center justify-center bg-secondary/10 mr-6 rounded-lg">
                  <LucideTerminal className="text-secondary" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface mb-1 uppercase tracking-tight">PYTHON_CLIENT</h4>
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">v1.1.0 (Beta)</span>
                </div>
                <button className="text-on-surface-variant group-hover:text-secondary transition-colors">
                  <LucideDownload size={20} />
                </button>
              </div>
              <div className="flex items-center p-6 border border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group rounded-xl glass-card">
                <div className="w-12 h-12 flex items-center justify-center bg-on-surface/5 mr-6 rounded-lg">
                  <Code className="text-on-surface" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface mb-1 uppercase tracking-tight">GO_WRAPPERS</h4>
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">v0.9.4 (Experimental)</span>
                </div>
                <button className="text-on-surface-variant group-hover:text-on-surface transition-colors">
                  <LucideDownload size={20} />
                </button>
              </div>
              <div className="flex items-center p-6 border border-outline-variant/10 hover:bg-surface-container-highest/30 transition-colors group rounded-xl glass-card">
                <div className="w-12 h-12 flex items-center justify-center bg-red-500/10 mr-6 rounded-lg">
                  <FileText className="text-red-400" size={24} />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-on-surface mb-1 uppercase tracking-tight">OFFLINE_BUNDLE</h4>
                  <span className="text-[10px] text-on-surface-variant font-mono uppercase">Full Docs PDF (24MB)</span>
                </div>
                <button className="text-on-surface-variant group-hover:text-red-400 transition-colors">
                  <LucideDownload size={20} />
                </button>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="mt-48 pt-12 border-t border-outline-variant/10 flex flex-col md:flex-row justify-between gap-12 text-on-surface-variant/40 text-[10px] font-headline uppercase tracking-[0.2em] mb-12">
            <div className="flex flex-col gap-4">
              <span className="text-on-surface font-bold">XINITY_SYSTEMS</span>
              <span>© 2024 DEPLOYED_BY_XINITY_OS</span>
            </div>
            <div className="flex gap-8">
              <a className="hover:text-secondary transition-colors" href="#">Status</a>
              <a className="hover:text-secondary transition-colors" href="#">Twitter</a>
              <a className="hover:text-secondary transition-colors" href="#">GitHub</a>
              <a className="hover:text-secondary transition-colors" href="#">Terms</a>
            </div>
          </footer>
        </main>
      </div>
      
      {/* Mobile Nav Bar (Visible only on small screens) */}
      <nav className="md:hidden fixed bottom-0 left-0 w-full bg-surface/90 backdrop-blur-xl border-t border-outline-variant/20 flex justify-around items-center py-3 z-50 pb-safe">
        <a className="flex flex-col items-center gap-1 text-secondary" href="#">
          <LucideRocket size={18} />
          <span className="text-[8px] font-headline font-bold uppercase">START</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <Layers size={18} />
          <span className="text-[8px] font-headline font-bold uppercase">CORE</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <Cpu size={18} />
          <span className="text-[8px] font-headline font-bold uppercase">API</span>
        </a>
        <a className="flex flex-col items-center gap-1 text-on-surface-variant" href="#">
          <BarChart3 size={18} />
          <span className="text-[8px] font-headline font-bold uppercase">STATUS</span>
        </a>
      </nav>
    </div>
  );
}
