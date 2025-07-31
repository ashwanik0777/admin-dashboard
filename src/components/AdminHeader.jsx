import React, { useState } from 'react';
import { Bell, Search, User, Settings, Menu, PanelLeftClose, PanelLeft, X } from 'lucide-react';

// Mock UI components since they're not available
const Button = ({ children, variant = "default", size = "default", className = "", onClick, title, asChild, ...props }) => {
  const baseClasses = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    ghost: "hover:bg-accent hover:text-accent-foreground"
  };
  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md"
  };
  
  return (
    <button 
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      onClick={onClick}
      title={title}
      {...props}
    >
      {children}
    </button>
  );
};

const Input = ({ className = "", placeholder, ...props }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    placeholder={placeholder}
    {...props}
  />
);

const Badge = ({ children, variant = "default", className = "" }) => {
  const variants = {
    default: "bg-primary text-primary-foreground",
    secondary: "bg-secondary text-secondary-foreground"
  };
  return (
    <div className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}>
      {children}
    </div>
  );
};

const DropdownMenu = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className="relative inline-block text-left" onBlur={() => setTimeout(() => setIsOpen(false), 150)}>
      {React.Children.map(children, child => 
        React.cloneElement(child, { isOpen, setIsOpen })
      )}
    </div>
  );
};

const DropdownMenuTrigger = ({ children, asChild, isOpen, setIsOpen }) => (
  <div onClick={() => setIsOpen(!isOpen)}>
    {children}
  </div>
);

const DropdownMenuContent = ({ children, align = "start", className = "", isOpen }) => {
  if (!isOpen) return null;
  const alignClasses = {
    start: "left-0",
    end: "right-0"
  };
  return (
    <div className={`absolute top-full mt-1 w-56 rounded-md border bg-popover p-1 text-popover-foreground shadow-md z-50 ${alignClasses[align]} ${className}`}>
      {children}
    </div>
  );
};

const DropdownMenuLabel = ({ children }) => (
  <div className="px-2 py-1.5 text-sm font-semibold">{children}</div>
);

const DropdownMenuItem = ({ children, className = "" }) => (
  <div className={`relative flex cursor-default select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors hover:bg-accent hover:text-accent-foreground ${className}`}>
    {children}
  </div>
);

const DropdownMenuSeparator = () => (
  <div className="-mx-1 my-1 h-px bg-muted" />
);

const AdminHeader = ({ userRole, onToggleSidebar, sidebarOpen, onToggleDesktopSidebar, desktopSidebarHidden }) => {
  const [notifications] = useState([
    'New faculty joining request',
    'Leave approval pending',
    'System maintenance scheduled'
  ]);
  
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  const getRoleLabel = (role) => {
    const roleLabels = {
      'registrar': 'Registrar',
      'vc': 'Vice Chancellor',
      'dean': 'Dean',
      'hod': 'Head of Department',
      'iqac': 'IQAC Officer',
      'clubs': 'Clubs Coordinator',
      'exam': 'Exam Controller',
      'research': 'Research Cell Admin',
      'admin': 'Admin Officer'
    };
    return roleLabels[role] || 'Admin';
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 shadow-sm">
      <div className="flex h-17 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-2 sm:gap-4 flex-1 min-w-0">
          {/* Desktop Sidebar Toggle Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onToggleDesktopSidebar}
            className="hidden lg:flex transition-all duration-300 ease-in-out hover:scale-105 flex-shrink-0"
            title={desktopSidebarHidden ? "Show Sidebar" : "Hide Sidebar"}
          >
            <div className="transition-transform duration-300 ease-in-out">
              {desktopSidebarHidden ? (
                <PanelLeft className="w-5 h-5" />
              ) : (
                <PanelLeftClose className="w-5 h-5" />
              )}
            </div>
          </Button>
          
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <img
               src="https://tse4.mm.bing.net/th/id/OIP.lAzYxJcn7HVBTnCM80d-IwHaHw?r=0&rs=1&pid=ImgDetMain&o=7&rm=3"
               alt="GBU Logo"
               className="w-6 h-6 sm:w-8 sm:h-8 object-contain flex-shrink-0"
               />
            <div className="min-w-0 flex-1">
              <h1 className="text-sm sm:text-lg font-semibold text-gray-900 truncate">
                <span className="hidden sm:inline">GBU Command Centre</span>
                <span className="sm:hidden">GBU</span>
              </h1>
            </div>
            <Badge variant="secondary" className="text-xs hidden xs:inline-flex flex-shrink-0 mr-2 sm:mr-4">
  <span className="hidden sm:inline">{getRoleLabel(userRole)}</span>
  <span className="sm:hidden">{userRole?.toUpperCase() || 'ADMIN'}</span>
</Badge>
          </div>
        </div>

        <div className="flex items-center gap-1 sm:gap-2 md:gap-4 flex-shrink-0">
          {/* Mobile Search Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
            className="md:hidden"
          >
            {mobileSearchOpen ? <X className="w-5 h-5" /> : <Search className="w-5 h-5" />}
          </Button>

          {/* Desktop Search */}
          <div className="relative hidden md:block">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
          placeholder="Search approvals, files, staff..."
          className="pl-10 w-64 lg:w-80 bg-gray-50 border-gray-200 focus:bg-white focus:ring-2 focus:ring-black focus:border-transparent"
        />
        </div>

          {/* Notifications */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
                <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full p-0 flex items-center justify-center text-xs bg-white text-red-500 border border-red-500">
                  {notifications.length}
                </Badge>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-72 sm:w-80 bg-white">
              <DropdownMenuLabel>Notifications</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {notifications.map((notification, index) => (
                <DropdownMenuItem key={index} className="flex flex-col items-start">
                  <span className="font-medium text-sm">{notification}</span>
                  <span className="text-xs text-gray-500">Just now</span>
                </DropdownMenuItem>
              ))}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-center justify-center">
                View all notifications
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Settings */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Settings className="w-4 h-4 sm:w-5 sm:h-5" />
                {/* <Badge className="absolute -top-1 -right-1 w-4 h-4 sm:w-5 sm:h-5 rounded-full p-0 flex items-center justify-center text-xs bg-white text-blue-500 border border-blue-500">
                  2
                </Badge> */}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Settings</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile Settings</DropdownMenuItem>
              <DropdownMenuItem>System Preferences</DropdownMenuItem>
              <DropdownMenuItem>Export Data</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Help & Support</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {/* Profile */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="gap-2 max-w-none">
                <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                </div>
                <div className="hidden lg:block text-left min-w-0">
                  <div className="text-sm font-medium truncate">
                    {getRoleLabel(userRole)}
                  </div>
                  <div className="text-xs text-gray-500 truncate">
                    Gautam Buddha University
                  </div>
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem>Change Password</DropdownMenuItem>
              <DropdownMenuItem>Activity Log</DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">Sign Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="md:hidden border-t bg-white p-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              placeholder="Search approvals, files, staff..."
              className="pl-10 w-full bg-gray-50 border-gray-200 focus:bg-white"
              autoFocus
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default AdminHeader;