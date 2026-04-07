import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Terminal, 
  Search, 
  Rss, 
  Code, 
  Rocket, 
  Trophy, 
  Image as ImageIcon, 
  Link as LinkIcon, 
  Heart, 
  MessageSquare, 
  Share2, 
  MoreHorizontal,
  Plus,
  Globe,
  Clock,
  CheckCircle,
  Lock
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { cn } from '../lib/utils';
import { useAuth } from '../context/AuthContext';

interface Post {
  id: string;
  authorId: string;
  author: string;
  authorHandle: string;
  authorAvatar: string;
  time: string;
  project?: string;
  content: string;
  image?: string;
  code?: {
    file: string;
    language: string;
    content: string;
  };
  likes: number;
  comments: number;
  isLiked?: boolean;
}

const MOCK_POSTS: Post[] = [
  {
    id: '1',
    authorId: 'admin-1',
    author: 'Jane_Dev.js',
    authorHandle: 'jane_dev',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGPR66ffnCZRaIAV8dGTTctjh0T15roEDjK0vSynDLIbAAqcUvMXLpvOQfHD7WH2VyaPuLORUtmfxADpHzpYj5rEeH8SYlTZcN0vaFyhhNBZrEdc8orHta5-XYHVIJi9CSJ5EugdHu9mv_1bQca9uxIBZ-n71q1lfLSGiI9hAzmTAtJB-Qw6xGqAf9HV0iVJBQgEUjxfE1eImRsQ2ayKoJiW_SV8n_ysrDlCtz1LxxpMHIHhWfZdl5jbYHUCeMgzDGd2ABQ7bmhH4',
    time: '2h ago',
    project: 'NeuralNexus',
    content: 'Just finished the authentication layer for NeuralNexus! Implementing WebAuthn for biometric-first security. The latency is practically zero. ⚡️',
    image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA7aeRJVFSDZLUeKt_ItMy96Fe7-tKsOa-8P5FiqfI5G9JjEJdFKGzXfD9FGhgFg-V89buwdTkeTr_nkndh0qF9eCUFuh9P2mX9lruppAZhLIvwM5WofQp3BESrOMg_spnTHiitSEp23x5pePG6CIyy7MfGu1uB23_CtjEiXicCZh_aA5LQDdS_X-zPuzHEBvNO1uzCAYCAPr0_MH_OTyiBr4sEK29EBTg2CdMPfgEQYmQ3l6nUWtRgoAoM8BYq1fJVFH0jwwS3Azo',
    likes: 128,
    comments: 24,
    isLiked: true
  },
  {
    id: '2',
    authorId: 'admin-2',
    author: 'Alex_Kernel',
    authorHandle: 'alex_k',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAobGX4VCICbRxGMxll5pRPgZGFE44588bStYPBCktUKi2lBYAJCRHXo64_PEg2uyE4dW4b6lq-SDdi2a4EKKE9pvpGEHAcnJn9r7u_SQyRtNV996MFvbcEdXImHdqrHk4_feqpLOZfv5enPDSu4HDQZi4C2WUIv6zLJxWJMyYyMz3vzPZFcoqlFFVPVR-QvLhW5fSdhQm5k-eu74KjrbtLKH9QtLzl7tCE52NWVwE8BTb_8iF_jPCcGC8pq5h5BZ3lFMtAHqhH6uw',
    time: '5h ago',
    project: 'Core_OS_Sim',
    content: 'Refined the scheduler logic today. Moving from Round Robin to a custom Priority-based system for better real-time response. Check the diff:',
    code: {
      file: 'scheduler.c',
      language: 'c',
      content: `void schedule_tasks() {
  while(queue_not_empty) {
    task = get_highest_priority();
    execute(task);
  }
}`
    },
    likes: 84,
    comments: 12
  }
];

export default function Community() {
  const { user, role } = useAuth();
  const [posts, setPosts] = useState<Post[]>(MOCK_POSTS);
  const [newPostContent, setNewPostContent] = useState('');

  const handlePost = () => {
    if (!newPostContent.trim() || !user) return;
    
    const newPost: Post = {
      id: Date.now().toString(),
      authorId: user.id,
      author: user.name,
      authorHandle: user.email.split('@')[0],
      authorAvatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`,
      time: 'Just now',
      content: newPostContent,
      likes: 0,
      comments: 0
    };

    setPosts([newPost, ...posts]);
    setNewPostContent('');
  };

  const handleDeletePost = (postId: string) => {
    setPosts(posts.filter(p => p.id !== postId));
  };

  if (!user) {
    return (
      <div className="flex min-h-screen bg-surface">
        <Sidebar />
        <div className="flex-1 md:ml-64 pb-24 md:pb-0">
          <Navbar title="COMMUNITY / ACCESS_DENIED" />
          <main className="flex flex-col items-center justify-center min-h-[calc(100vh-64px)] px-8">
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass-card p-12 rounded-2xl border border-outline-variant/20 max-w-md w-full text-center relative overflow-hidden"
            >
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary"></div>
              <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
                <Lock className="text-primary" size={48} />
              </div>
              <h2 className="text-3xl font-headline font-bold text-on-surface mb-4 uppercase tracking-tight">Access Restricted</h2>
              <p className="text-on-surface-variant mb-8 leading-relaxed">
                The Community Hub is reserved for verified hackers and administrators. Please login to join the conversation.
              </p>
              <div className="space-y-4">
                <Link 
                  to="/login" 
                  className="btn-primary w-full py-4 rounded-xl font-bold uppercase tracking-widest text-xs block"
                >
                  Login to Access
                </Link>
                <div className="relative py-4">
                  <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-outline-variant/10"></div></div>
                  <div className="relative flex justify-center text-[10px] uppercase tracking-widest text-on-surface-variant/40 bg-surface px-2">OR</div>
                </div>
                <img 
                  src="https://picsum.photos/seed/cyber-login/400/200" 
                  alt="Please Login" 
                  className="w-full rounded-lg border border-outline-variant/10 opacity-60 grayscale hover:grayscale-0 transition-all duration-500"
                  referrerPolicy="no-referrer"
                />
                <p className="text-[10px] text-on-surface-variant/60 uppercase tracking-widest mt-4">
                  Unauthorized access will be logged.
                </p>
              </div>
            </motion.div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 md:ml-64 pb-24 md:pb-0">
        <Navbar title="COMMUNITY / FEED" />
        
        <main className="max-w-5xl mx-auto px-4 md:px-8 pt-28 pb-12 flex gap-8">
          {/* Main Feed */}
          <div className="flex-1 w-full max-w-2xl">
            <div className="mb-8 md:mb-12">
              <span className="text-secondary font-headline text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] mb-2 block">
                COMMUNITY_HUB
              </span>
              <h2 className="text-4xl md:text-6xl font-headline font-black text-on-surface tracking-tighter leading-none">
                Building <br/>in Public
              </h2>
            </div>

            {/* Composer */}
            <section className="glass-card rounded-xl p-4 md:p-6 mb-8 md:mb-12 relative overflow-hidden border border-outline-variant/10">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary"></div>
              <div className="flex gap-3 md:gap-4">
                <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0">
                  <img 
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.name}`} 
                    alt={user.name} 
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="flex-1">
                  <div className="text-[8px] md:text-[10px] font-headline uppercase tracking-widest text-secondary mb-2">STATUS_UPDATE</div>
                  <textarea 
                    value={newPostContent}
                    onChange={(e) => setNewPostContent(e.target.value)}
                    className="w-full bg-transparent border-0 border-b border-outline-variant/30 focus:ring-0 focus:border-primary text-on-surface placeholder-on-surface-variant/50 resize-none py-2 mb-4 font-sans text-sm md:text-base" 
                    placeholder="What are you building?"
                    rows={3}
                  ></textarea>
                  <div className="flex justify-between items-center">
                    <div className="flex gap-1 md:gap-2">
                      <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors">
                        <ImageIcon size={18} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors">
                        <Terminal size={18} />
                      </button>
                      <button className="p-2 text-on-surface-variant hover:text-secondary transition-colors">
                        <LinkIcon size={18} />
                      </button>
                    </div>
                    <button 
                      onClick={handlePost}
                      className="btn-primary px-4 md:px-6 py-2 rounded-md text-[10px] md:text-xs uppercase tracking-widest font-bold"
                    >
                      Deploy
                    </button>
                  </div>
                </div>
              </div>
            </section>

            {/* Feed Content */}
            <div className="space-y-6 md:space-y-8">
              <AnimatePresence mode="popLayout">
                {posts.map((post) => (
                  <motion.article 
                    key={post.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    className="glass-card rounded-xl overflow-hidden hover:bg-surface-container-highest/50 transition-all duration-300 border border-outline-variant/10"
                  >
                    <div className="p-4 md:p-6">
                      <div className="flex justify-between items-start mb-4 md:mb-6">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 md:w-10 md:h-10 rounded-lg bg-surface-container-highest border border-outline-variant/30 overflow-hidden shrink-0">
                            <img 
                              src={post.authorAvatar} 
                              alt={post.author} 
                              className="w-full h-full object-cover"
                              referrerPolicy="no-referrer"
                            />
                          </div>
                          <div>
                            <h4 className="font-bold text-on-surface leading-none mb-1 text-sm md:text-base">{post.author}</h4>
                            <span className="text-[8px] md:text-[10px] text-on-surface-variant font-headline uppercase tracking-widest">
                              {post.time} // <span className="hidden sm:inline">Project:</span> <span className="text-secondary">{post.project || 'General'}</span>
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1 md:gap-2">
                          {post.authorId === user.id && (
                            <button 
                              onClick={() => handleDeletePost(post.id)}
                              className="p-2 text-red-400/50 hover:text-red-400 hover:bg-red-400/10 rounded transition-all"
                              title="Delete Post"
                            >
                              <Plus className="rotate-45" size={16} />
                            </button>
                          )}
                          <button className="p-2 text-on-surface-variant hover:text-on-surface transition-colors">
                            <MoreHorizontal size={16} />
                          </button>
                        </div>
                      </div>
                      
                      <p className="text-on-surface-variant mb-4 md:mb-6 leading-relaxed text-sm">
                        {post.content}
                      </p>

                      {post.image && (
                        <div className="rounded-lg overflow-hidden border border-outline-variant/30 mb-4 md:mb-6 aspect-video relative group">
                          <img 
                            src={post.image} 
                            alt="Post content" 
                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                            referrerPolicy="no-referrer"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent flex items-end p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <span className="text-[8px] md:text-[10px] font-headline uppercase tracking-widest text-secondary">MODULE_PREVIEW // {post.project}</span>
                          </div>
                        </div>
                      )}

                      {post.code && (
                        <div className="bg-surface-container-lowest p-3 md:p-4 rounded-lg font-mono text-[10px] md:text-xs overflow-x-auto border-l-2 border-primary mb-4 md:mb-6">
                          <div className="text-on-surface-variant/40 text-[8px] md:text-[10px] mb-2 uppercase tracking-widest">// {post.code.file}</div>
                          <pre className="text-on-surface">
                            <code>{post.code.content}</code>
                          </pre>
                        </div>
                      )}

                      <div className="flex items-center gap-4 md:gap-6 pt-4 border-t border-outline-variant/10">
                        <button className={cn(
                          "flex items-center gap-1 md:gap-2 transition-colors",
                          post.isLiked ? "text-primary" : "text-on-surface-variant hover:text-primary"
                        )}>
                          <Heart size={16} fill={post.isLiked ? "currentColor" : "none"} />
                          <span className="text-[10px] md:text-xs font-headline font-bold">{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1 md:gap-2 text-on-surface-variant hover:text-secondary transition-colors">
                          <MessageSquare size={16} />
                          <span className="text-[10px] md:text-xs font-headline font-bold">{post.comments}</span>
                        </button>
                        <button className="flex items-center gap-1 md:gap-2 text-on-surface-variant hover:text-on-surface transition-colors ml-auto">
                          <Share2 size={16} />
                        </button>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Sidebar Info */}
          <aside className="w-80 space-y-8 hidden lg:block">
            <div className="glass-card rounded-xl p-6 border border-outline-variant/10">
              <div className="text-[10px] font-headline uppercase tracking-widest text-secondary mb-6">TRENDING_TOPICS</div>
              <div className="flex flex-wrap gap-2">
                {['#WEB3', '#AI_MODELS', '#RUST', '#UI_DESIGN', '#SOLANA', '#NEXTJS'].map(tag => (
                  <span key={tag} className="px-3 py-1 bg-secondary/5 text-secondary text-[10px] font-headline font-bold rounded border border-secondary/10 hover:bg-secondary/10 cursor-pointer transition-colors">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border border-outline-variant/10">
              <div className="text-[10px] font-headline uppercase tracking-widest text-secondary mb-6">TOP_HACKERS</div>
              <div className="space-y-4">
                {[
                  { rank: 1, name: 'CipherKing', xp: '12,450' },
                  { rank: 2, name: 'Loomy.dev', xp: '11,200' },
                  { rank: 3, name: 'Neon_Pulse', xp: '9,800' }
                ].map(hacker => (
                  <div key={hacker.name} className="flex items-center justify-between group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        "w-8 h-8 rounded flex items-center justify-center font-bold text-xs",
                        hacker.rank === 1 ? "bg-primary text-on-primary" : "bg-surface-container-highest text-on-surface-variant"
                      )}>
                        {hacker.rank}
                      </div>
                      <span className="text-sm font-bold group-hover:text-primary transition-colors">{hacker.name}</span>
                    </div>
                    <span className="text-secondary text-[10px] font-headline font-bold">{hacker.xp} XP</span>
                  </div>
                ))}
              </div>
              <button className="w-full mt-8 py-3 border border-outline-variant/30 text-[10px] uppercase tracking-widest hover:bg-white/5 transition-colors font-bold rounded-lg">
                View Full Leaderboard
              </button>
            </div>

            <div className="glass-card rounded-xl p-6 border border-outline-variant/10">
              <div className="text-[10px] font-headline uppercase tracking-widest text-secondary mb-6">ACTIVE_HACKATHONS</div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-headline font-bold uppercase tracking-widest">
                    <span>ETH_GLOBAL_24</span>
                    <span className="text-primary">65%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-primary w-2/3 h-full shadow-[0_0_10px_rgba(186,158,255,0.5)]"></div>
                  </div>
                </div>
                <div className="space-y-2 opacity-60">
                  <div className="flex justify-between text-[10px] font-headline font-bold uppercase tracking-widest">
                    <span>SOLANA_RADAR</span>
                    <span className="text-secondary">20%</span>
                  </div>
                  <div className="w-full bg-surface-container-lowest h-1.5 rounded-full overflow-hidden">
                    <div className="bg-secondary w-1/5 h-full shadow-[0_0_10px_rgba(83,221,252,0.5)]"></div>
                  </div>
                </div>
              </div>
            </div>
          </aside>
        </main>

        {/* Floating Action Button */}
        <button className="fixed bottom-24 md:bottom-8 right-4 md:right-8 w-14 h-14 bg-gradient-to-tr from-primary to-secondary rounded-xl flex items-center justify-center text-on-primary shadow-[0_0_20px_rgba(186,158,255,0.4)] active:scale-90 transition-transform z-[60]">
          <Plus size={28} strokeWidth={3} />
        </button>
      </div>
    </div>
  );
}
