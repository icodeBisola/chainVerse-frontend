import {
  BookOpen,
  Award,
  CheckCircle2,
  MessageSquare,
  ShoppingCart,
  Star,
  Wallet,
} from "lucide-react";

export interface DashboardSummary {
  title: string;
  value: string;
  subtitle: string;
  icon: any;
  showProgress?: boolean;
}

export interface WeeklyActivity {
  day: string;
  hours: number;
}

export interface Deadline {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  type: "quiz" | "assignment" | "project";
}

export interface CourseProgress {
  id: string;
  title: string;
  lastActive: string;
  progress: number;
  nextLesson: string;
  image?: string;
}

export interface ActivityFeedItem {
  id: string;
  type: "lesson" | "question" | "purchase" | "certificate" | "review";
  title: string;
  description: string;
  timestamp: string;
  icon: any;
  rating?: number;
}

export const weeklyActivityData: WeeklyActivity[] = [
  { day: "Mon", hours: 4 },
  { day: "Tue", hours: 7 },
  { day: "Wed", hours: 3 },
  { day: "Thu", hours: 6 },
  { day: "Fri", hours: 8 },
  { day: "Sat", hours: 2 },
  { day: "Sun", hours: 5 },
];

export const upcomingDeadlines: Deadline[] = [
  {
    id: "1",
    title: "Smart Contract Security Quiz",
    course: "Smart Contracts with Soroban",
    dueDate: "Tomorrow at 11:59 PM",
    type: "quiz",
  },
  {
    id: "2",
    title: "Build a Simple dApp",
    course: "Web3 Development Masterclass",
    dueDate: "Friday at 11:59 PM",
    type: "assignment",
  },
  {
    id: "3",
    title: "DeFi Protocol Analysis",
    course: "Decentralized Finance (DeFi) on Stellar",
    dueDate: "Next Monday at 11:59 PM",
    type: "project",
  },
];

export const learningProgress: CourseProgress[] = [
  {
    id: "1",
    title: "Smart Contracts with Soroban",
    lastActive: "2 days ago",
    progress: 65,
    nextLesson: "Advanced Contract Patterns",
  },
  {
    id: "2",
    title: "Web3 Development Masterclass",
    lastActive: "Yesterday",
    progress: 28,
    nextLesson: "Building dApps with React",
  },
  {
    id: "3",
    title: "Decentralized Finance (DeFi) on Stellar",
    lastActive: "Just started",
    progress: 12,
    nextLesson: "Liquidity Pools Explained",
  },
];

export const recentActivities: ActivityFeedItem[] = [
  {
    id: "1",
    type: "lesson",
    title: "Completed a lesson",
    description:
      "Smart Contracts with Soroban: Advanced Contract Patterns.",
    timestamp: "Today at 2:34 PM",
    icon: BookOpen,
  },
  {
    id: "2",
    type: "question",
    title: "Posted a question",
    description:
      "Web3 Development Masterclass: Building dApps with React",
    timestamp: "Yesterday at 11:15 AM",
    icon: MessageSquare,
  },
  {
    id: "3",
    type: "purchase",
    title: "Purchased a course",
    description: "Decentralized Finance (DeFi) on Stellar - 75 XLM",
    timestamp: "3 days ago",
    icon: Wallet,
  },
  {
    id: "4",
    type: "certificate",
    title: "Earned a certificate",
    description: "Stellar Blockchain Fundamentals",
    timestamp: "1 month ago",
    icon: Award,
  },
  {
    id: "5",
    type: "review",
    title: "Left a review",
    description: "Stellar Blockchain Fundamentals",
    timestamp: "1 month ago",
    icon: Star,
    rating: 5,
  },
];
