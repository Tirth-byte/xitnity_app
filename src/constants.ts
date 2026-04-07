import { Event, Activity, Submission, Participant, Sponsor } from './types';

export const MOCK_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Neural_Core Hackathon 2024',
    description: "XINITY's premier annual engineering challenge focusing on decentralized inference and low-latency agent orchestration.",
    date: 'OCT 24 - 27, 2024',
    prizePool: '$50,000',
    teams: '1-4 MEMBERS',
    status: 'live',
    category: ['AI/ML', 'Infrastructure'],
    host: 'XINITY',
    participants: 1248,
    image: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=1000',
    deadline: '14 DAYS : 22H : 04M'
  },
  {
    id: '2',
    title: 'Rust Runtime Audit II',
    description: 'Deep dive into Solana runtime security and performance optimization.',
    date: 'NOV 10 - 15, 2024',
    prizePool: '$45,000',
    teams: '1-3 MEMBERS',
    status: 'live',
    category: ['Solana', 'Security'],
    host: 'SolanaLabs',
    participants: 142,
    image: 'https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80&w=1000',
    deadline: '04:22:15'
  },
  {
    id: '3',
    title: 'Neural Compression Alpha',
    description: 'Optimizing large language models for edge device execution.',
    date: 'OCT 24, 2024',
    prizePool: '$12,000',
    teams: '1-2 MEMBERS',
    status: 'upcoming',
    category: ['AI/ML', 'Optimization'],
    host: 'NeuroLink',
    participants: 38,
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=1000'
  }
];

export const MOCK_ACTIVITIES: Activity[] = [
  {
    id: '1',
    type: 'join',
    title: 'Joined NeuralNexus',
    subtitle: 'Global AI Hackathon',
    timestamp: '2H AGO'
  },
  {
    id: '2',
    type: 'submit',
    title: 'Submitted Web3 solution',
    subtitle: 'EtherSync Challenge',
    timestamp: '5H AGO'
  },
  {
    id: '3',
    type: 'badge',
    title: 'Earned "Fastest Debugger" Badge',
    subtitle: 'System Achievement',
    timestamp: '1D AGO'
  }
];

export const MOCK_SUBMISSIONS: Submission[] = [
  {
    id: '1',
    projectName: 'Quantum_Nodes',
    techStack: ['Rust', 'Solana'],
    teamLead: '0xArtemis_Dev',
    status: 'pending',
    initials: 'QN',
    score: 0
  },
  {
    id: '2',
    projectName: 'Synth_Voice_AI',
    techStack: ['Python', 'PyTorch'],
    teamLead: 'Nebula_04',
    status: 'shortlisted',
    initials: 'SV',
    score: 85
  },
  {
    id: '3',
    projectName: 'Block_Key_Vault',
    techStack: ['React', 'Web3.js'],
    teamLead: 'Satoshi_Fan',
    status: 'rejected',
    initials: 'BK',
    score: 42
  }
];

export const MOCK_PARTICIPANTS: Participant[] = [
  {
    id: '1',
    name: 'Arjun Sharma',
    email: 'arjun@monolith.io',
    joinedDate: '2024-01-15',
    eventsCount: 5,
    status: 'active'
  },
  {
    id: '2',
    name: 'Priya Patel',
    email: 'priya@monolith.io',
    joinedDate: '2024-02-10',
    eventsCount: 3,
    status: 'active'
  },
  {
    id: '3',
    name: 'Rohan Gupta',
    email: 'rohan@monolith.io',
    joinedDate: '2024-03-05',
    eventsCount: 1,
    status: 'inactive'
  }
];

export const MOCK_SPONSORS: Sponsor[] = [
  {
    id: '1',
    name: 'Solana Foundation',
    logo: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    tier: 'platinum',
    contribution: '$50,000',
    status: 'active'
  },
  {
    id: '2',
    name: 'Polygon Labs',
    logo: 'https://cryptologos.cc/logos/polygon-matic-logo.png',
    tier: 'gold',
    contribution: '$25,000',
    status: 'active'
  },
  {
    id: '3',
    name: 'Chainlink',
    logo: 'https://cryptologos.cc/logos/chainlink-link-logo.png',
    tier: 'silver',
    contribution: '$10,000',
    status: 'pending'
  }
];
