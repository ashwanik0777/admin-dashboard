import React, { useEffect, useState } from 'react';
import {
  Home,
  Users,
  GraduationCap,
  Calendar,
  FileText,
  ClipboardCheck,
  Award,
  MessageSquare,
  FolderOpen,
  Briefcase,
  Rocket,
  BarChart3,
  BookOpen,
  Clock,
  TrendingUp,
  University,
  LogOut,
  UserPlus,
  X
} from 'lucide-react';

const menuItems = [
  { title: "Dashboard", url: "dashboard", icon: Home },
  { title: "User Management", url: "users", icon: Users },
  { title: "Student Onboarding", url: "students", icon: UserPlus },
  { title: "Employee Onboarding", url: "employees", icon: Briefcase },
  { title: "Employee Leave", url: "leave", icon: Calendar },
  { title: "Course Mapping", url: "courses", icon: ClipboardCheck },
  { title: "Exam Management", url: "exams", icon: FileText },
  { title: "Degree Audit", url: "degree", icon: Award },
  { title: "Grievance Tracker", url: "grievance", icon: MessageSquare },
  { title: "File Movement", url: "files", icon: FolderOpen },
  { title: "Project Tracking", url: "projects", icon: Rocket },
  { title: "Clubs & Societies", url: "clubs", icon: GraduationCap },
  { title: "Startup Panel", url: "startup", icon: TrendingUp },
  { title: "IQAC/NAAC/NIRF", url: "iqac", icon: BarChart3 },
  { title: "E-Library", url: "library", icon: BookOpen },
  { title: "Biometric Logs", url: "biometric", icon: Clock },
  { title: "Workflow Analytics", url: "analytics", icon: BarChart3 },
];

const AdminSidebar = ({ onLogout, userRole, onNavigate, activeModule, isOpen, onToggle, isHidden, isCollapsing }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const getRoleLabel = (role) => {
    const roleLabels = {
      'registrar': 'Registrar',
      'vc': 'Vice Chancellor',
      'dean': 'Dean',
      'hod': 'Head of Department',
      'iqac': 'IQAC Officer',
      'clubs': 'Clubs Coordinator',
      'exam': 'Exam Controller',
      'research': 'Research Cell Admin'
    };
    return roleLabels[role] || 'Admin';
  };

  // Don't render anything if sidebar is hidden on desktop
  if (isHidden) {
    return null;
  }

  return (
    <>
      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-50 lg:z-auto
        w-64 h-full bg-white border-r border-gray-200 
        flex flex-col transition-all duration-500 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${isCollapsing ? 'opacity-0 transform -translate-x-4' : 'opacity-100 transform translate-x-0'}
        lg:opacity-100 lg:transform-none
      `}>
        {/* Header */}
        <div className="p-4 border-b border-gray-200 flex-shrink-0">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <University className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="font-semibold text-sm text-gray-900">GBU Admin</h2>
                <p className="text-xs text-gray-500">{getRoleLabel(userRole)}</p>
              </div>
            </div>
            {/* Close button for mobile */}
            <button
              onClick={onToggle}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Navigation - Enhanced Scrollable Area */}
<div className="flex-1 overflow-y-auto px-2 pb-0 custom-scrollbar scroll-smooth">
  <div className="space-y-1 pb-0 mb-0">
    <div className="text-xs font-medium text-gray-500 mb-2 px-3 sticky top-0 bg-white py-1 z-10">
      MAIN NAVIGATION
    </div>
    {menuItems.map((item) => (
      <button
        key={item.title}
        onClick={() => {
          onNavigate(item.url);
          // Close sidebar only on mobile after navigation
          if (isMobile) {
            onToggle();
          }
        }}
        className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-left transition-all duration-200 hover:scale-[1.02] ${
          activeModule === item.url
            ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-700 shadow-sm'
            : 'text-gray-700 hover:bg-gray-100 hover:shadow-sm'
        }`}
      >
        <item.icon className={`w-4 h-4 flex-shrink-0 ${activeModule === item.url ? 'text-blue-700' : ''}`} />
        <span className={`text-sm truncate ${activeModule === item.url ? 'font-medium' : ''}`}>
          {item.title}
        </span>
      </button>
    ))}
  </div>
</div>

{/* Footer */}
<div className="p-4 border-t border-gray-200 flex-shrink-0">
  <button
    onClick={onLogout}
    className="w-full flex items-center gap-3 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
  >
    <LogOut className="w-4 h-4" />
    <span>Logout</span>
  </button>
</div>
      </div>
    </>
  );
};

export default AdminSidebar;