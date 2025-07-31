import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
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
  Settings
} from 'lucide-react';
import { GBU_SCHOOLS } from '../data/gbuMasterData';

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
          <Badge className="bg-green-100 text-green-800">
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
      'Super Admin': 'bg-purple-100 text-purple-800',
      'Admin': 'bg-blue-100 text-blue-800',
      'Dean': 'bg-indigo-100 text-indigo-800',
      'HoD': 'bg-teal-100 text-teal-800',
      'Faculty': 'bg-green-100 text-green-800',
      'Staff': 'bg-yellow-100 text-yellow-800',
      'Viewer': 'bg-gray-100 text-gray-800'
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
        <div className="relative">
          <TabsList className="w-full overflow-x-auto pb-2">
            <div className="flex space-x-4 min-w-max">
              <TabsTrigger value="users" className="px-4 py-2">
                <span className="whitespace-nowrap">All Users</span>
              </TabsTrigger>
              <TabsTrigger value="roles" className="px-4 py-2">
                <span className="whitespace-nowrap">Roles & Permissions</span>
              </TabsTrigger>
              <TabsTrigger value="activity" className="px-4 py-2">
                <span className="whitespace-nowrap">Activity Logs</span>
              </TabsTrigger>
              <TabsTrigger value="settings" className="px-4 py-2">
                <span className="whitespace-nowrap">Settings</span>
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

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
          <Card>
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

        <TabsContent value="roles" className="space-y-6">
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

        <TabsContent value="activity" className="space-y-6">
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

        <TabsContent value="settings" className="space-y-6">
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