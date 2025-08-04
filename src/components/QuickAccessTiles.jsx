import React from 'react';
import {
  Users,
  GraduationCap,
  Calendar,
  MessageSquare,
  BarChart3,
  ClipboardCheck,
  Rocket,
  FileText,
  BookOpen,
  Clock,
  TrendingUp,
  Award
} from 'lucide-react';

// --- Integrated UI Components Start ---

// Card Component and its sub-components
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Badge Component
const Badge = ({ className, variant, children, ...props }) => {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground', // Default text color for outline, assuming a border will be applied by default.
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant || 'default']} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// --- Integrated UI Components End ---

const QuickAccessTiles = () => {
  const tiles = [
    {
      title: "Students",
      description: "Onboarding & Management",
      count: "12,456",
      icon: Users,
      color: "bg-blue-500",
      href: "#students"
    },
    {
      title: "Faculty",
      description: "Employee Management",
      count: "892",
      icon: GraduationCap,
      color: "bg-green-500",
      href: "#faculty"
    },
    {
      title: "Leave System",
      description: "Pending Approvals",
      count: "23",
      icon: Calendar,
      color: "bg-orange-500",
      href: "#leave"
    },
    {
      title: "Grievances",
      description: "Active Cases",
      count: "8",
      icon: MessageSquare,
      color: "bg-red-500",
      href: "#grievance"
    },
    {
      title: "IQAC Reports",
      description: "Pending Submissions",
      count: "5",
      icon: BarChart3,
      color: "bg-purple-500",
      href: "#iqac"
    },
    {
      title: "Exam Center",
      description: "Current Session",
      count: "Active",
      icon: ClipboardCheck,
      color: "bg-indigo-500",
      href: "#exams"
    },
    {
      title: "Clubs",
      description: "Active Societies",
      count: "47",
      icon: Rocket,
      color: "bg-pink-500",
      href: "#clubs"
    },
    {
      title: "File Tracker",
      description: "In Progress",
      count: "156",
      icon: FileText,
      color: "bg-teal-500",
      href: "#files"
    },
    {
      title: "E-Library",
      description: "Digital Resources",
      count: "25K+",
      icon: BookOpen,
      color: "bg-cyan-500",
      href: "#library"
    },
    {
      title: "Biometric",
      description: "Daily Attendance",
      count: "89%",
      icon: Clock,
      color: "bg-amber-500",
      href: "#biometric"
    },
    {
      title: "Analytics",
      description: "Workflow Insights",
      count: "Live",
      icon: TrendingUp,
      color: "bg-emerald-500",
      href: "#analytics"
    },
    {
      title: "Degree Audit",
      description: "Final Year Review",
      count: "234",
      icon: Award,
      color: "bg-rose-500",
      href: "#degree"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-semibold text-gray-900">Quick Access</h2>
        <Badge variant="outline" className="text-xs">
          12 Active Modules
        </Badge>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {tiles.map((tile, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1"
          >
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className={`w-12 h-12 ${tile.color} rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                    <tile.icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-1">{tile.title}</h3>
                  <p className="text-sm text-gray-600 mb-3">{tile.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge
                  variant="secondary"
                  className="text-sm font-medium"
                >
                  {tile.count}
                </Badge>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  View Details →
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickAccessTiles;