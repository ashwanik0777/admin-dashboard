import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
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
  GraduationCap,
  Users,
  BookOpen,
  AlertTriangle,
  TrendingUp,
  FileText,
  Clock,
  CheckCircle
} from 'lucide-react';
import { GBU_SCHOOLS } from '../data/gbuMasterData';

const SchoolDashboard = () => {
  const [selectedSchool, setSelectedSchool] = useState(GBU_SCHOOLS[0]);

  const totalStats = {
    schools: GBU_SCHOOLS.length,
    courses: GBU_SCHOOLS.reduce((total, school) =>
      total + school.departments.reduce((deptTotal, dept) =>
        deptTotal + dept.programs.length, 0), 0),
    faculty: GBU_SCHOOLS.reduce((total, school) => total + school.totalFaculty, 0),
    students: GBU_SCHOOLS.reduce((total, school) => total + school.totalStudents, 0),
    grievances: 23 // Mock data
  };

  const recentApprovals = [
    { id: 1, type: 'Faculty Onboarding', name: 'Dr. Amit Kumar - SoICT', date: '2024-12-23', status: 'Approved' },
    { id: 2, type: 'Leave Request', name: 'Prof. Sunita Sharma - SoE', date: '2024-12-22', status: 'Approved' },
    { id: 3, type: 'Course Mapping', name: 'Data Structures - CSE', date: '2024-12-21', status: 'Approved' },
    { id: 4, type: 'Project Proposal', name: 'AI Research - SoICT', date: '2024-12-20', status: 'Pending' },
    { id: 5, type: 'Grievance Resolution', name: 'Library Access - SoHSS', date: '2024-12-19', status: 'Resolved' }
  ];

  const schoolLeaveData = [
    { school: 'SoICT', pending: 2, approved: 10, rejected: 1 },
    { school: 'SoE', pending: 1, approved: 8, rejected: 2 },
    { school: 'SoM', pending: 0, approved: 7, rejected: 1 },
    { school: 'SoHSS', pending: 1, approved: 6, rejected: 2 },
    { school: 'SoBSC', pending: 0, approved: 5, rejected: 0 }
  ];

  return (
    <div className="space-y-6">
      {/* GBU Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold mb-2">Gautam Buddha University</h1>
            <p className="text-blue-100 text-lg">"Empowering through Knowledge, Rooted in Values"</p>
            <p className="text-blue-200 text-sm mt-1">Greater Noida, Uttar Pradesh</p>
          </div>
          <div className="text-right">
            <div className="text-2xl font-bold">{totalStats.schools}</div>
            <div className="text-blue-200">Active Schools</div>
          </div>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Schools</p>
                <p className="text-2xl font-bold text-blue-600">{totalStats.schools}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Courses</p>
                <p className="text-2xl font-bold text-green-600">{totalStats.courses}+</p>
              </div>
              <BookOpen className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Faculty Count</p>
                <p className="text-2xl font-bold text-purple-600">{totalStats.faculty}</p>
              </div>
              <Users className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-2xl font-bold text-orange-600">{totalStats.students.toLocaleString()}</p>
              </div>
              <GraduationCap className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Live Grievances</p>
                <p className="text-2xl font-bold text-red-600">{totalStats.grievances}</p>
              </div>
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Dashboard Content */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="schools">Schools</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="approvals">Recent Activity</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* School-wise Leave Requests Chart */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  School-wise Leave Requests
                </CardTitle>
                <CardDescription>Current month overview</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {schoolLeaveData.map((school) => (
                    <div key={school.school} className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="font-medium">{school.school}</span>
                        <span className="text-gray-500">
                          {school.pending + school.approved + school.rejected} total
                        </span>
                      </div>
                      <div className="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className="bg-green-500"
                          style={{ width: `${(school.approved / (school.pending + school.approved + school.rejected)) * 100}%` }}
                        />
                        <div
                          className="bg-yellow-500"
                          style={{ width: `${(school.pending / (school.pending + school.approved + school.rejected)) * 100}%` }}
                        />
                        <div
                          className="bg-red-500"
                          style={{ width: `${(school.rejected / (school.pending + school.approved + school.rejected)) * 100}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-xs text-gray-600">
                        <span>Approved: {school.approved}</span>
                        <span>Pending: {school.pending}</span>
                        <span>Rejected: {school.rejected}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Smart Alerts */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5" />
                  Smart Alerts
                </CardTitle>
                <CardDescription>Priority notifications requiring attention</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-red-600" />
                      <span className="font-medium text-red-800">SoHSS: 4 unresolved grievances {'>'}7 days</span>
                    </div>
                    <p className="text-sm text-red-600 mt-1">Requires immediate attention</p>
                  </div>
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-yellow-600" />
                      <span className="font-medium text-yellow-800">SoICT: 12 Courses pending mapping for Odd Sem</span>
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">Deadline approaching</p>
                  </div>
                  <div className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-orange-600" />
                      <span className="font-medium text-orange-800">Law: 3 files delayed in movement {'>'}5 days</span>
                    </div>
                    <p className="text-sm text-orange-600 mt-1">Process review needed</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <span className="font-medium text-green-800">SoM: All NAAC criteria 85% complete</span>
                    </div>
                    <p className="text-sm text-green-600 mt-1">On track for submission</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="schools" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {GBU_SCHOOLS.map((school) => (
              <Card key={school.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <CardTitle className="text-lg">{school.name}</CardTitle>
                  <CardDescription>
                    <Badge variant="secondary">{school.code}</Badge>
                    <span className="ml-2">Dean: {school.dean}</span>
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Departments:</span>
                      <span className="font-medium">{school.departments.length}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Programs:</span>
                      <span className="font-medium">
                        {school.departments.reduce((total, dept) => total + dept.programs.length, 0)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Faculty:</span>
                      <span className="font-medium">{school.totalFaculty}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Students:</span>
                      <span className="font-medium">{school.totalStudents}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-gray-600">Established:</span>
                      <span className="font-medium">{school.establishedYear}</span>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-4"
                    onClick={() => setSelectedSchool(school)}
                  >
                    View Details
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="analytics" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Faculty Distribution by School</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {GBU_SCHOOLS.map((school) => (
                    <div key={school.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{school.code}</span>
                        <span className="text-sm text-gray-600">{school.totalFaculty} faculty</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full"
                          style={{ width: `${(school.totalFaculty / totalStats.faculty) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Student Enrollment by School</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {GBU_SCHOOLS.map((school) => (
                    <div key={school.id} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium">{school.code}</span>
                        <span className="text-sm text-gray-600">{school.totalStudents} students</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-green-600 h-2 rounded-full"
                          style={{ width: `${(school.totalStudents / totalStats.students) * 100}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Approvals & Activities</CardTitle>
              <CardDescription>Top 10 recent approvals across all schools</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Type</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {recentApprovals.map((approval) => (
                    <TableRow key={approval.id}>
                      <TableCell className="font-medium">{approval.type}</TableCell>
                      <TableCell>{approval.name}</TableCell>
                      <TableCell>{approval.date}</TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            approval.status === 'Approved' ? 'default' :
                              approval.status === 'Pending' ? 'secondary' :
                                approval.status === 'Resolved' ? 'default' : 'destructive'
                          }
                        >
                          {approval.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SchoolDashboard;