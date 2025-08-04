import React, { useState } from 'react';
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

// --- Internal UI Components (Replicated Basic Functionality & Styling) ---

// Card Component
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
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

// Input Component (Included for completeness, though not explicitly used in this specific SchoolDashboard snippet)
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

// Tabs Components
const Tabs = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <div className={className}>
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

// Table Components
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

// --- Master Data (Mocked based on usage in provided files) ---
const GBU_SCHOOLS = [
  {
    id: 'SoICT',
    code: 'SoICT',
    name: 'School of Information & Communication Technology',
    dean: 'Dr. J. Singh',
    establishedYear: 2002,
    totalFaculty: 150,
    totalStudents: 3500,
    departments: [
      { name: 'Computer Science & Engineering', programs: ['B.Tech CSE', 'M.Tech CSE', 'Ph.D CSE'] },
      { name: 'Information Technology', programs: ['B.Tech IT', 'M.Tech IT'] },
      { name: 'Electronics & Communication Engineering', programs: ['B.Tech ECE', 'M.Tech ECE'] },
    ],
  },
  {
    id: 'SoE',
    code: 'SoE',
    name: 'School of Engineering',
    dean: 'Prof. A. Kumar',
    establishedYear: 2005,
    totalFaculty: 120,
    totalStudents: 2800,
    departments: [
      { name: 'Civil Engineering', programs: ['B.Tech Civil', 'M.Tech Civil'] },
      { name: 'Mechanical Engineering', programs: ['B.Tech Mech', 'M.Tech Mech'] },
      { name: 'Electrical Engineering', programs: ['B.Tech Elect', 'M.Tech Elect'] },
    ],
  },
  {
    id: 'SoM',
    code: 'SoM',
    name: 'School of Management',
    dean: 'Dr. S. Verma',
    establishedYear: 2008,
    totalFaculty: 80,
    totalStudents: 1800,
    departments: [
      { name: 'Business Administration', programs: ['MBA', 'BBA'] },
      { name: 'Commerce', programs: ['B.Com (Hons)'] },
    ],
  },
  {
    id: 'SoHSS',
    code: 'SoHSS',
    name: 'School of Humanities & Social Sciences',
    dean: 'Dr. K. Devi',
    establishedYear: 2003,
    totalFaculty: 90,
    totalStudents: 2200,
    departments: [
      { name: 'Psychology', programs: ['B.A. Psychology', 'M.A. Psychology'] },
      { name: 'Sociology', programs: ['B.A. Sociology', 'M.A. Sociology'] },
      { name: 'English', programs: ['B.A. English', 'M.A. English'] },
    ],
  },
  {
    id: 'SoBSC',
    code: 'SoBSC',
    name: 'School of Biotechnology',
    dean: 'Prof. R. Singh',
    establishedYear: 2010,
    totalFaculty: 60,
    totalStudents: 1500,
    departments: [
      { name: 'Biotechnology', programs: ['B.Tech Biotech', 'M.Tech Biotech'] },
      { name: 'Food Technology', programs: ['B.Tech Food Tech'] },
    ],
  },
  {
    id: 'SoBT',
    code: 'SoBT',
    name: 'School of Buddhist Studies & Civilization',
    dean: 'Prof. L. Sharma',
    establishedYear: 2004,
    totalFaculty: 40,
    totalStudents: 800,
    departments: [
      { name: 'Buddhist Studies', programs: ['M.A. Buddhist Studies', 'Ph.D Buddhist Studies'] },
    ],
  },
  {
    id: 'SoLJG',
    code: 'SoLJG',
    name: 'School of Law, Justice and Governance',
    dean: 'Dr. P. Gupta',
    establishedYear: 2009,
    totalFaculty: 70,
    totalStudents: 1600,
    departments: [
      { name: 'Law', programs: ['LL.B', 'LL.M'] },
      { name: 'Governance', programs: ['M.A. Governance'] },
    ],
  },
  {
    id: 'SoVSAS',
    code: 'SoVSAS',
    name: 'School of Vocational Studies and Applied Sciences',
    dean: 'Dr. V. Jain',
    establishedYear: 2012,
    totalFaculty: 50,
    totalStudents: 1200,
    departments: [
      { name: 'Vocational Studies', programs: ['B.Voc', 'M.Voc'] },
      { name: 'Applied Sciences', programs: ['B.Sc. Applied Physics', 'B.Sc. Applied Chemistry'] },
    ],
  },
  {
    id: 'SoET',
    code: 'SoET',
    name: 'School of Engineering & Technology',
    dean: 'Dr. A. Verma',
    establishedYear: 2015,
    totalFaculty: 100,
    totalStudents: 2000,
    departments: [
      { name: 'Computer Science', programs: ['B.Tech CS'] },
      { name: 'Electronics', programs: ['B.Tech Electronics'] },
    ],
  },
];


// --- SchoolDashboard Component ---

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