import React, { useState } from 'react';
import {
  Users,
  UserPlus,
  Search,
  Download,
  Shield,
  Key,
  Clock,
  CheckCircle,
  XCircle,
  Activity,
  Settings
} from 'lucide-react';

// --- Internal UI Components (Replicated Basic Functionality & Styling) ---

// Card Component
const Card = ({ children, className }) => (
  <div className={`rounded-lg borderborder-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-4 sm:p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-4 pt-0 sm:p-6 sm:pt-0 ${className}`}>
    {children}
  </div>
);

// Button Component
const Button = ({ children, className, variant = 'default', size = 'default', onClick, disabled }) => {
  let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'default':
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700';
      break;
    case 'destructive':
      variantClasses = 'bg-red-600 text-white hover:bg-red-700';
      break;
    case 'outline':
      variantClasses = 'border border-gray-300 bg-white hover:bg-gray-100 hover:text-gray-900';
      break;
    case 'secondary':
      variantClasses = 'bg-gray-200 text-gray-900 hover:bg-gray-300';
      break;
    case 'ghost':
      variantClasses = 'hover:bg-gray-100 hover:text-gray-900';
      break;
    case 'link':
      variantClasses = 'text-blue-600 underline-offset-4 hover:underline';
      break;
    default:
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700';
  }

  switch (size) {
    case 'default':
      sizeClasses = 'h-10 px-4 py-2';
      break;
    case 'sm':
      sizeClasses = 'h-9 rounded-md px-3';
      break;
    case 'lg':
      sizeClasses = 'h-11 rounded-md px-8';
      break;
    case 'icon':
      sizeClasses = 'h-10 w-10';
      break;
    default:
      sizeClasses = 'h-10 px-4 py-2';
  }

  return (
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
};

// Input Component
const Input = ({ className, type = 'text', placeholder, value, onChange }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// Badge Component
const Badge = ({ children, className, variant = 'default' }) => {
  let baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  let variantClasses = '';

  switch (variant) {
    case 'default':
      variantClasses = 'border-transparent bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'secondary':
      variantClasses = 'border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
    case 'destructive':
      variantClasses = 'border-transparent bg-red-500 text-white hover:bg-red-600';
      break;
    case 'outline':
      variantClasses = 'text-gray-800 border-gray-300';
      break;
    default:
      variantClasses = 'border-transparent bg-blue-500 text-white hover:bg-blue-600';
  }

  return (
    <div className={`${baseClasses} ${variantClasses} ${className}`}>
      {children}
    </div>
  );
};

// Tabs Components (Simplified)
const Tabs = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
      {/* We'll handle the TabsList and TabsContent within the main component for simplicity */}
      {React.Children.map(children, child => {
        if (child.type === TabsList) {
          return React.cloneElement(child, { activeTab, setActiveTab });
        }
        if (child.type === TabsContent) {
          return React.cloneElement(child, { activeTab });
        }
        return child;
      })}
    </div>
  );
};

const TabsList = ({ children, className, activeTab, setActiveTab }) => (
  <div className={`flex items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {React.Children.map(children, child =>
      // Ensure that child.props.value exists before accessing it
      child && child.props && child.props.value !== undefined
        ? React.cloneElement(child, {
            isActive: child.props.value === activeTab,
            onClick: () => setActiveTab(child.props.value),
          })
        : child // Render child as is if it doesn't have a value prop (e.g., a non-TabsTrigger element)
    )}
  </div>
);

const TabsTrigger = ({ value, children, className, isActive, onClick }) => (
  <button
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${
      isActive ? 'bg-background text-foreground shadow-sm' : 'hover:bg-muted hover:text-foreground'
    } ${className}`}
    onClick={onClick}
  >
    {children}
  </button>
);

const TabsContent = ({ value, children, activeTab, className }) => (
  <div
    className={`${value === activeTab ? 'block' : 'hidden'} mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
  >
    {children}
  </div>
);

// Table Components (Simplified)
const Table = ({ children, className }) => (
  <table className={`w-full caption-bottom text-sm ${className}`}>
    {children}
  </table>
);

const TableHeader = ({ children, className }) => (
  <thead className={`[&_tr]:border-b ${className}`}>
    {children}
  </thead>
);

const TableBody = ({ children, className }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`}>
    {children}
  </tbody>
);

const TableRow = ({ children, className }) => (
  <tr className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}>
    {children}
  </tr>
);

const TableHead = ({ children, className }) => (
  <th className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </th>
);

const TableCell = ({ children, className }) => (
  <td className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}>
    {children}
  </td>
);

const GBU_SCHOOLS = [
  { id: 'SoICT', code: 'SoICT', name: 'School of Information & Communication Technology', departments: ['CSE', 'IT', 'ECE'] },
  { id: 'SoE', code: 'SoE', name: 'School of Engineering', departments: ['Civil', 'Mechanical', 'Electrical'] },
  { id: 'SoM', code: 'SoM', name: 'School of Management', departments: ['MBA', 'BBA'] },
  { id: 'SoHSS', code: 'SoHSS', name: 'School of Humanities & Social Sciences', departments: ['Psychology', 'Sociology', 'English'] },
  { id: 'SoBSC', code: 'SoBSC', name: 'School of Biotechnology', departments: ['Biotechnology', 'Food Technology'] },
  { id: 'SoBT', code: 'SoBT', name: 'School of Buddhist Studies & Civilization', departments: ['Buddhist Studies'] },
  { id: 'SoLJG', code: 'SoLJG', name: 'School of Law, Justice and Governance', departments: ['Law'] },
  { id: 'SoVSAS', code: 'SoVSAS', name: 'School of Vocational Studies and Applied Sciences', departments: ['Vocational Studies'] },
  { id: 'SoET', code: 'SoET', name: 'School of Engineering & Technology', departments: ['Computer Science', 'Electronics'] },
];

const UserManagement = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [roleFilter, setRoleFilter] = useState('all');

  const users = [
    {
      id: 1,
      name: 'Dr. Amit Kumar Singh',
      email: 'amit.singh@gbu.ac.in',
      role: 'Faculty',
      school: 'SoICT',
      department: 'CSE',
      status: 'Active',
      lastLogin: '2024-12-27 09:30',
      joinDate: '2024-01-15'
    },
    {
      id: 2,
      name: 'Prof. Sunita Sharma',
      email: 'sunita.sharma@gbu.ac.in',
      role: 'Dean',
      school: 'SoE',
      department: 'Civil',
      status: 'Active',
      lastLogin: '2024-12-27 08:45',
      joinDate: '2023-07-20'
    },
    {
      id: 3,
      name: 'Mr. Rajesh Kumar',
      email: 'rajesh.kumar@gbu.ac.in',
      role: 'Admin',
      school: 'Central',
      department: 'Registrar Office',
      status: 'Inactive',
      lastLogin: '2024-12-25 17:30',
      joinDate: '2022-03-10'
    }
  ];

  const roles = ['Super Admin', 'Admin', 'Dean', 'HoD', 'Faculty', 'Staff', 'Viewer'];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <Badge className="bg-green-400 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Inactive':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Suspended':
        return (
          <Badge variant="destructive">
            <XCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getRoleBadge = (role) => {
    const colors = {
      'Super Admin': 'bg-purple-400 text-purple-800',
      'Admin': 'bg-blue-400 text-blue-800',
      'Dean': 'bg-indigo-400 text-indigo-800',
      'HoD': 'bg-teal-400 text-teal-800',
      'Faculty': 'bg-green-400 text-green-800',
      'Staff': 'bg-yellow-400 text-yellow-800',
      'Viewer': 'bg-gray-400 text-gray-800'
    };
    return <Badge className={colors[role] || 'bg-gray-100 text-gray-800'}>{role}</Badge>;
  };

  // Filtered users
  const filteredUsers = users.filter(user =>
    (selectedSchool === '' || user.school === selectedSchool) &&
    (roleFilter === 'all' || user.role.toLowerCase() === roleFilter) &&
    (user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">User Management</h2>
          <p className="text-gray-600">Manage system users, roles, and permissions</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 md:flex-none">
            <Download className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Export CSV</span>
          </Button>
          <Button className="flex-1 md:flex-none">
            <UserPlus className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Add User</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Users</p>
                <p className="text-2xl font-bold text-blue-600">248</p>
              </div>
              <Users className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Users</p>
                <p className="text-2xl font-bold text-green-600">235</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Admin Users</p>
                <p className="text-2xl font-bold text-purple-600">15</p>
              </div>
              <Shield className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-orange-600">8</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="users" className="space-y-6">
        {/* Mobile TabsList */}
        <TabsList className=" md:hidden overflow-x-auto inline-flex gap-2 min-w-max pb-2">
          <TabsTrigger value="users" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
            <Users className="w-3 h-3 mr-" />
            All Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
            <Shield className="w-3 h-3 mr-1" />
            Roles
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
            <Activity className="w-3 h-3 mr-1" />
            Activity
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
            <Settings className="w-3 h-3 mr-1" />
            Settings
          </TabsTrigger>
        </TabsList>

        {/* Desktop TabsList */}
        <TabsList className=" md:flex items-center justify-center grid grid-cols-4 gap-4 pb-2">
          <TabsTrigger value="users" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
            <Users className="w-4 h-4 mr-2" />
            All Users
          </TabsTrigger>
          <TabsTrigger value="roles" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
            <Shield className="w-4 h-4 mr-2" />
            Roles & Permissions
          </TabsTrigger>
          <TabsTrigger value="activity" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
            <Activity className="w-4 h-4 mr-2" />
            Activity Logs
          </TabsTrigger>
          <TabsTrigger value="settings" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
            <Settings className="w-4 h-4 mr-2" />
            Settings
          </TabsTrigger>
        </TabsList>

        <TabsContent value="users" className="space-y-6">
          {/* Filters */}
          <Card>
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row flex-wrap gap-3">
                <div className="flex-1 flex items-center gap-2 min-w-[200px]">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[180px]"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="">All Schools</option>
                  {GBU_SCHOOLS.map(school => (
                    <option key={school.id} value={school.id}>{school.code}</option>
                  ))}
                </select>
                <select
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm min-w-[180px]"
                  value={roleFilter}
                  onChange={(e) => setRoleFilter(e.target.value)}
                >
                  <option value="all">All Roles</option>
                  {roles.map(role => (
                    <option key={role} value={role.toLowerCase()}>{role}</option>
                  ))}
                </select>
              </div>
            </CardContent>
          </Card>

          {/* Users Table */}
          <Card className="bg-white">
            <CardHeader>
              <CardTitle>User Directory</CardTitle>
              <CardDescription>Manage all system users and their access levels</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-[800px] md:min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Name</TableHead>
                      <TableHead className="whitespace-nowrap">Email</TableHead>
                      <TableHead className="whitespace-nowrap">Role</TableHead>
                      <TableHead className="whitespace-nowrap">School/Dept</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap">Last Login</TableHead>
                      <TableHead className="whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell className="font-medium whitespace-nowrap">{user.name}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.email}</TableCell>
                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                        <TableCell>
                          <div>
                            <div className="font-medium whitespace-nowrap">{user.school}</div>
                            <div className="text-sm text-gray-500 whitespace-nowrap">{user.department}</div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(user.status)}</TableCell>
                        <TableCell className="whitespace-nowrap">{user.lastLogin}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Settings className="w-3 h-3" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Key className="w-3 h-3" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles" className="space-y-6 bg-white">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {roles.map((role) => (
              <Card key={role}>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center gap-2">
                    <Shield className="w-5 h-5" />
                    {role}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-600">
                      Permissions: {role === 'Super Admin' ? 'All Modules' : 'Limited Access'}
                    </div>
                    <div className="text-sm text-gray-600">
                      Users: {Math.floor(Math.random() * 50) + 1}
                    </div>
                    <Button variant="outline" size="sm">
                      <Settings className="w-3 h-3 mr-1" />
                      Configure
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="activity" className="space-y-6 bg-white">
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>User login and system activity logs</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { user: 'Dr. Amit Singh', action: 'Logged in', time: '2 minutes ago', type: 'login' },
                  { user: 'Prof. Sunita Sharma', action: 'Updated course mapping', time: '15 minutes ago', type: 'update' },
                  { user: 'Mr. Rajesh Kumar', action: 'Approved leave request', time: '1 hour ago', type: 'approval' },
                  { user: 'Dr. Priya Verma', action: 'Failed login attempt', time: '2 hours ago', type: 'error' }
                ].map((log, index) => (
                  <div key={index} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-3 bg-gray-50 rounded-lg gap-2">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${
                        log.type === 'login' ? 'bg-green-500' :
                        log.type === 'update' ? 'bg-blue-500' :
                        log.type === 'approval' ? 'bg-purple-500' : 'bg-red-500'
                      }`} />
                      <p className="font-medium whitespace-nowrap">{log.user}</p>
                      <p className="text-sm text-gray-600">{log.action}</p>
                    </div>
                    <span className="text-sm text-gray-500 sm:text-right">{log.time}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="settings" className="space-y-6 bg-white">
          <Card>
            <CardHeader>
              <CardTitle>System Settings</CardTitle>
              <CardDescription>Configure user management settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Password Policy</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Minimum 8 characters</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Require special characters</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Password expiry (90 days)</span>
                    </label>
                  </div>
                </div>
                <div>
                  <h4 className="font-medium mb-3">Session Management</h4>
                  <div className="space-y-2">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded" />
                      <span className="text-sm">Auto-logout after 2 hours</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">Multi-device login</span>
                    </label>
                  </div>
                </div>
              </div>
              <Button className="mt-4">Save Settings</Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UserManagement;