import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { FileText, Search, Filter, MoreVertical, ExternalLink, CheckCircle, XCircle, Clock, Star, MessageSquare } from 'lucide-react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { MOCK_SUBMISSIONS } from '../constants';
import { cn } from '../lib/utils';
import { Submission } from '../types';

export default function AdminSubmissions() {
  const [submissions, setSubmissions] = useState<Submission[]>(MOCK_SUBMISSIONS);
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);
  const [grade, setGrade] = useState<number>(0);
  const [feedback, setFeedback] = useState<string>('');

  const handleGrade = (submission: Submission) => {
    setSelectedSubmission(submission);
    setGrade(submission.score || 0);
    setFeedback(submission.feedback || '');
  };

  const saveGrade = () => {
    if (!selectedSubmission) return;
    
    const updatedSubmissions = submissions.map(sub => {
      if (sub.id === selectedSubmission.id) {
        return {
          ...sub,
          score: grade,
          feedback: feedback,
          status: grade >= 70 ? 'shortlisted' : 'pending' // Update status based on grade or just mark as graded
        } as Submission;
      }
      return sub;
    });

    setSubmissions(updatedSubmissions);
    setSelectedSubmission(null);
  };

  return (
    <div className="flex min-h-screen bg-surface">
      <Sidebar />
      <div className="flex-1 md:ml-64 pb-24 md:pb-0">
        <Navbar />
        <main className="p-8 pt-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="max-w-7xl mx-auto"
          >
            <div className="flex justify-between items-end mb-8">
              <div>
                <h2 className="text-4xl font-black tracking-tighter font-headline mb-2">SUBMISSIONS_VAULT</h2>
                <p className="text-on-surface-variant font-headline text-sm uppercase tracking-widest">Review and grade project submissions</p>
              </div>
              <div className="flex gap-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-on-surface-variant" size={18} />
                  <input 
                    type="text" 
                    placeholder="Search projects..." 
                    className="bg-surface-container-highest border border-outline-variant/30 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:border-primary transition-colors w-64"
                  />
                </div>
                <button className="btn-ghost flex items-center gap-2 px-4 py-2 border border-outline-variant/30">
                  <Filter size={18} />
                  <span>Filter</span>
                </button>
              </div>
            </div>

            <div className="glass-card rounded-xl overflow-hidden">
              <div className="overflow-x-auto scroll-touch no-scrollbar">
                <table className="w-full text-left min-w-[800px]">
                <thead>
                  <tr className="text-[10px] font-headline uppercase tracking-widest text-on-surface-variant/60 bg-surface-container-highest border-b border-outline-variant/10">
                    <th className="px-8 py-4">Project</th>
                    <th className="px-8 py-4">Tech Stack</th>
                    <th className="px-8 py-4">Team Lead</th>
                    <th className="px-8 py-4">Score</th>
                    <th className="px-8 py-4">Status</th>
                    <th className="px-8 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline-variant/10">
                  {submissions.map((submission) => (
                    <tr key={submission.id} className="hover:bg-primary/5 transition-colors group">
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-10 h-10 rounded flex items-center justify-center font-bold text-xs",
                            submission.status === 'rejected' ? "bg-red-500/20 text-red-400" : 
                            submission.status === 'shortlisted' ? "bg-secondary/20 text-secondary" : "bg-primary/20 text-primary"
                          )}>
                            {submission.initials}
                          </div>
                          <div>
                            <p className="font-bold">{submission.projectName}</p>
                            <p className="text-[10px] text-on-surface-variant font-mono uppercase tracking-tighter">ID: {submission.id.padStart(4, '0')}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex gap-2">
                          {submission.techStack.map(tech => (
                            <span key={tech} className="px-2 py-0.5 rounded-sm bg-secondary/10 text-secondary text-[10px] font-mono">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </td>
                      <td className="px-8 py-6 text-on-surface-variant text-sm">
                        {submission.teamLead}
                      </td>
                      <td className="px-8 py-6">
                        <div className="flex items-center gap-2">
                          <Star size={14} className={submission.score && submission.score > 0 ? "text-secondary" : "text-on-surface-variant"} />
                          <span className="font-bold">{submission.score || '--'}</span>
                        </div>
                      </td>
                      <td className="px-8 py-6">
                        <span className={cn(
                          "flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider",
                          submission.status === 'rejected' ? "text-red-400" : 
                          submission.status === 'shortlisted' ? "text-primary" : "text-secondary"
                        )}>
                          <span className={cn(
                            "w-1.5 h-1.5 rounded-full",
                            submission.status === 'rejected' ? "bg-red-400" : 
                            submission.status === 'shortlisted' ? "bg-primary" : "bg-secondary"
                          )}></span>
                          {submission.status}
                        </span>
                      </td>
                      <td className="px-8 py-6 text-right">
                        <button 
                          onClick={() => handleGrade(submission)}
                          className="btn-primary px-4 py-2 text-[10px] uppercase tracking-widest font-black rounded-sm"
                        >
                          {submission.score ? 'Edit Grade' : 'Grade Now'}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
              </div>
            </div>
          </motion.div>
        </main>
      </div>

      {/* Grading Modal */}
      <AnimatePresence>
        {selectedSubmission && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedSubmission(null)}
              className="absolute inset-0 bg-surface/80 backdrop-blur-sm"
            ></motion.div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="relative w-full max-w-lg bg-surface-container-lowest border border-outline-variant/30 rounded-2xl shadow-2xl overflow-hidden"
            >
              <div className="p-8 border-b border-outline-variant/10">
                <h3 className="text-2xl font-black tracking-tighter font-headline">GRADE_SUBMISSION</h3>
                <p className="text-on-surface-variant text-sm mt-1">Project: {selectedSubmission.projectName}</p>
              </div>
              <div className="p-8 space-y-6">
                <div>
                  <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Technical Score (0-100)</label>
                  <input 
                    type="number" 
                    min="0" 
                    max="100"
                    value={grade}
                    onChange={(e) => setGrade(Number(e.target.value))}
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-[10px] font-headline uppercase tracking-widest text-on-surface-variant mb-2">Feedback & Comments</label>
                  <textarea 
                    rows={4}
                    value={feedback}
                    onChange={(e) => setFeedback(e.target.value)}
                    placeholder="Provide constructive feedback..."
                    className="w-full bg-surface-container-highest border border-outline-variant/30 rounded-lg px-4 py-3 focus:outline-none focus:border-primary transition-colors resize-none"
                  ></textarea>
                </div>
                <div className="flex gap-4 pt-4">
                  <button 
                    onClick={() => setSelectedSubmission(null)}
                    className="flex-1 btn-ghost border border-outline-variant/30 py-3 rounded-lg font-bold"
                  >
                    Cancel
                  </button>
                  <button 
                    onClick={saveGrade}
                    className="flex-1 btn-primary py-3 rounded-lg font-bold shadow-[0_0_20px_rgba(186,158,255,0.3)]"
                  >
                    Submit Grade
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
