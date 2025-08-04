import React, { useState, useEffect } from 'react';
import AdminSidebar from '../components/AdminSidebar';
import AdminHeader from '../components/AdminHeader';
import UniversityCommandCentre from '../components/UniversityCommandCentre';
// import EmployeeOnboarding from './EmployeeOnboarding';
import LeaveManagement from './LeaveManagement';
import UserManagement from './UserManagement';
// import StudentOnboarding from './StudentOnboarding';
import CourseMapping from './CourseMapping';
import ExamManagement from './ExamManagement';
import DegreeAudit from './DegreeAudit';
import GrievanceTracker from './GrievanceTracker';
import FileMovement from './FileMovement';
import ProjectTracking from './ProjectTracking';
import ClubsAndSocieties from './ClubsAndSocieties';
import StartupPanel from './StartupPanel';
import IQACModule from './IQACModule';
import ELibrary from './ELibrary';
import BiometricLogs from './BiometricLogs';
import WorkflowAnalytics from './WorkflowAnalytics';

const AdminDashboard = ({ userRole, onLogout }) => {
  const [activeModule, setActiveModule] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [desktopSidebarHidden, setDesktopSidebarHidden] = useState(false);

  const renderActiveModule = () => {
    switch (activeModule) {
      case 'dashboard':
        return <UniversityCommandCentre userRole={userRole} />;
      case 'users':
        return <UserManagement />;
      case 'students':
        return <StudentOnboarding />;
      case 'employees':
        return <EmployeeOnboarding />;
      case 'leave':
        return <LeaveManagement />;
      case 'courses':
        return <CourseMapping />;
      case 'exams':
        return <ExamManagement />;
      case 'degree':
        return <DegreeAudit />;
      case 'grievance':
        return <GrievanceTracker />;
      case 'files':
        return <FileMovement />;
      case 'projects':
        return <ProjectTracking />;
      case 'clubs':
        return <ClubsAndSocieties />;
      case 'startup':
        return <StartupPanel />;
      case 'iqac':
        return <IQACModule />;
      case 'library':
        return <ELibrary />;
      case 'biometric':
        return <BiometricLogs />;
      case 'analytics':
        return <WorkflowAnalytics />;
      default:
        return <UniversityCommandCentre userRole={userRole} />;
    }
  };

  return (
    <div className="flex min-h-screen w-full bg-gray-50">
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 z-40 h-full transition-all duration-500 ease-in-out ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:static lg:z-auto lg:transition-all lg:duration-500 lg:ease-in-out ${
        desktopSidebarHidden ? 'lg:-translate-x-full lg:w-0 lg:min-w-0 lg:overflow-hidden' : 'lg:translate-x-0 lg:w-64'
      }`}>
        <AdminSidebar 
          onLogout={onLogout} 
          userRole={userRole} 
          onNavigate={setActiveModule}
          activeModule={activeModule}
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
          isHidden={false}
          isCollapsing={desktopSidebarHidden}
        />
      </div>

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 z-30  bg-opacity-50 lg:hidden transition-opacity duration-300 ease-in-out"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <div className={`flex flex-1 flex-col min-w-0 transition-all duration-500 ease-in-out ${
        desktopSidebarHidden ? 'lg:ml-0' : 'lg:ml-0'
      }`}>
        {/* Header */}
        <AdminHeader 
          userRole={userRole} 
          onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
          sidebarOpen={sidebarOpen}
          onToggleDesktopSidebar={() => setDesktopSidebarHidden(!desktopSidebarHidden)}
          desktopSidebarHidden={desktopSidebarHidden}
        />
        
        {/* Main Content */}
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="p-6">
            {renderActiveModule()}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;