export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  prizePool: string;
  teams: string;
  status: 'live' | 'upcoming' | 'ended';
  category: string[];
  host: string;
  participants: number;
  image: string;
  deadline?: string;
}

export interface Activity {
  id: string;
  type: 'join' | 'submit' | 'badge' | 'comment';
  title: string;
  subtitle: string;
  timestamp: string;
}

export interface Submission {
  id: string;
  projectName: string;
  techStack: string[];
  teamLead: string;
  status: 'pending' | 'shortlisted' | 'rejected';
  initials: string;
  score?: number;
  feedback?: string;
}

export interface Participant {
  id: string;
  name: string;
  email: string;
  joinedDate: string;
  eventsCount: number;
  status: 'active' | 'inactive';
}

export interface Sponsor {
  id: string;
  name: string;
  logo: string;
  tier: 'platinum' | 'gold' | 'silver';
  contribution: string;
  status: 'active' | 'pending';
}
