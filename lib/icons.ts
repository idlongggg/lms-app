import {
  Activity,
  AlertTriangle,
  ArrowLeft,
  BarChart3,
  Bell,
  BookOpen,
  Building2,
  Calendar,
  Coins,
  FileText,
  Gift,
  GraduationCap,
  History,
  Home,
  LayoutDashboard,
  type LucideIcon,
  MessageSquare,
  Newspaper,
  Settings,
  Shield,
  ShoppingBag,
  Swords,
  Trophy,
  User,
  Users,
} from "lucide-react";

export type Icon = LucideIcon;

// =============================================================================
// Semantic icon exports - change mapping here when needed
// =============================================================================

// Dashboard tabs
export const OverviewIcon = Home;
export const LearningIcon = BookOpen;
export const TournamentIcon = Swords;
export const CommunityIcon = MessageSquare;
export const NewsIcon = Newspaper;

// Dashboard sidebar
export const StatsIcon = BarChart3;
export const RecentActivityIcon = History;
export const CoursesIcon = GraduationCap;
export const ScheduleIcon = Calendar;
export const LeaderboardIcon = Trophy;
export const ForumIcon = MessageSquare;
export const QuestionBankIcon = FileText;
export const DiscussionsIcon = Users;
export const ShopIcon = ShoppingBag;
export const CoinsIcon = Coins;
export const RedeemedIcon = Gift;
export const AnnouncementsIcon = Bell;
export const EventsIcon = Calendar;
export const ProfileIcon = User;
export const SettingsIcon = Settings;

// Dashboard sections (role-based)
export const StudentsIcon = Users;
export const ProgressIcon = BarChart3;
export const ReportsIcon = FileText;
export const ChildrenIcon = Users;
export const AchievementsIcon = Trophy;
export const CertificatesIcon = GraduationCap;

// Admin
export const DashboardIcon = LayoutDashboard;
export const TenantsIcon = Building2;
export const UsersIcon = Users;
export const HealthIcon = Activity;
export const AlertsIcon = AlertTriangle;
export const ContentIcon = FileText;
export const TournamentsIcon = Trophy;
export const StatisticsIcon = BarChart3;

// Public
export const FeaturesIcon = GraduationCap;
export const AboutIcon = Shield;
export const TermsIcon = Shield;
export const PrivacyIcon = Shield;
export const ContactIcon = Shield;

// Focus
export const BackIcon = ArrowLeft;
export const HomeIcon = Home;
