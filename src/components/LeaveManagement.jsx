import React, { useState } from 'react';
import {
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Download,
  Filter,
  Search,
  TrendingUp,
  FileText,
  PieChart,
  BarChart2,
  Shield
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

// Tabs Components (Simplified) - Now takes activeTab and setActiveTab as props
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

// --- Master Data (as provided, can be moved to a separate file if preferred) ---
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

const LEAVE_TYPES = [
  { id: 'cl', name: 'Casual Leave', maxDays: 12 },
  { id: 'el', name: 'Earned Leave', maxDays: 30 },
  { id: 'dl', name: 'Duty Leave', maxDays: 365 },
  { id: 'al', name: 'Academic Leave', maxDays: 30 },
  { id: 'ml', name: 'Medical Leave', maxDays: 30 }, // Added an example
  { id: 'maternity', name: 'Maternity Leave', maxDays: 180 }, // Added an example
  { id: 'paternity', name: 'Paternity Leave', maxDays: 15 }, // Added an example
  { id: 'sabbatical', name: 'Sabbatical Leave', maxDays: 365 }, // Added an example
  { id: 'fdp', name: 'Faculty Development Program Leave', maxDays: 15 } // Added as per your data
];


// --- LeaveManagement Component ---

const LeaveManagement = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [leaveFilter, setLeaveFilter] = useState('all'); // Renamed from leaveFilter to leaveStatusFilter for clarity
  const [searchTerm, setSearchTerm] = useState('');
  const [activeTab, setActiveTab] = useState('applications'); // State for managing active tab

  // Sample data (as provided in your original component)
  const leaveApplications = [
    {
      id: 1,
      employeeId: 'SoICT2023001',
      name: 'Dr. Amit Kumar Singh',
      school: 'SoICT',
      department: 'CSE',
      leaveType: 'cl',
      fromDate: '2024-12-28',
      toDate: '2024-12-30',
      days: 3,
      reason: 'Personal work',
      status: 'Pending',
      appliedDate: '2024-12-23',
      hodStatus: 'Approved',
      adminStatus: 'Pending'
    },
    {
      id: 2,
      employeeId: 'SoE2023012',
      name: 'Prof. Sunita Sharma',
      school: 'SoE',
      department: 'Civil',
      leaveType: 'el',
      fromDate: '2025-01-05',
      toDate: '2025-01-15',
      days: 11,
      reason: 'Family vacation',
      status: 'Approved',
      appliedDate: '2024-12-20',
      hodStatus: 'Approved',
      adminStatus: 'Approved'
    },
    {
      id: 3,
      employeeId: 'SoM2023008',
      name: 'Dr. Rajesh Gupta',
      school: 'SoM',
      department: 'MBA',
      leaveType: 'fdp',
      fromDate: '2024-12-30',
      toDate: '2025-01-03',
      days: 5,
      reason: 'Faculty Development Program at IIT Delhi',
      status: 'Approved',
      appliedDate: '2024-12-18',
      hodStatus: 'Approved',
      adminStatus: 'Approved'
    },
    {
      id: 4,
      employeeId: 'SoHSS2023015',
      name: 'Dr. Priya Verma',
      school: 'SoHSS',
      department: 'Psychology',
      leaveType: 'dl',
      fromDate: '2024-12-25',
      toDate: '2024-12-27',
      days: 3,
      reason: 'Conference presentation at JNU',
      status: 'Rejected',
      appliedDate: '2024-12-22',
      hodStatus: 'Approved',
      adminStatus: 'Rejected'
    }
  ];

  const leaveBalance = [
    { employeeId: 'SoICT2023001', name: 'Dr. Amit Kumar Singh', cl: 8, el: 20, dl: 360, al: 25, taken: 4 },
    { employeeId: 'SoE2023012', name: 'Prof. Sunita Sharma', cl: 10, el: 25, dl: 365, al: 30, taken: 2 },
    { employeeId: 'SoM2023008', name: 'Dr. Rajesh Gupta', cl: 5, el: 15, dl: 355, al: 20, taken: 7 },
    { employeeId: 'SoHSS2023015', name: 'Dr. Priya Verma', cl: 2, el: 10, dl: 350, al: 15, taken: 10 }
  ];

  const schoolWiseLeaveStats = [
    { school: 'SoICT', pending: 2, approved: 10, rejected: 1, total: 13 },
    { school: 'SoE', pending: 1, approved: 8, rejected: 2, total: 11 },
    { school: 'SoM', pending: 0, approved: 7, rejected: 1, total: 8 },
    { school: 'SoHSS', pending: 1, approved: 6, rejected: 2, total: 9 },
    { school: 'SoBSC', pending: 0, approved: 5, rejected: 0, total: 5 },
    { school: 'SoBT', pending: 0, approved: 4, rejected: 1, total: 5 },
    { school: 'SoLJG', pending: 1, approved: 3, rejected: 1, total: 5 },
    { school: 'SoVSAS', pending: 0, approved: 2, rejected: 0, total: 2 },
    { school: 'SoET', pending: 0, approved: 1, rejected: 0, total: 1 }
  ];

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Approved':
        return (
          <Badge variant="default" className="bg-green-100 text-green-700">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="secondary" className="bg-orange-100 text-orange-700">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Rejected':
        return (
          <Badge variant="destructive" className="bg-red-100 text-red-700">
            <XCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const getLeaveTypeName = (code) => {
    const leaveType = LEAVE_TYPES.find(type => type.id === code.toLowerCase());
    return leaveType ? leaveType.name : code;
  };

  const filteredApplications = leaveApplications.filter(application => {
    const matchesSchool = selectedSchool === '' || application.school === selectedSchool;
    const matchesStatus = leaveFilter === 'all' || application.status.toLowerCase() === leaveFilter;
    const matchesSearch = application.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      application.employeeId.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesSchool && matchesStatus && matchesSearch;
  });

  // Calculate quick stats totals
  const totalPending = schoolWiseLeaveStats.reduce((sum, school) => sum + school.pending, 0);
  const totalApproved = schoolWiseLeaveStats.reduce((sum, school) => sum + school.approved, 0);
  const totalRejected = schoolWiseLeaveStats.reduce((sum, school) => sum + school.rejected, 0);
  const totalApplications = schoolWiseLeaveStats.reduce((sum, school) => sum + school.total, 0);


  return (
    <div className="space-y-6 p-4 md:p-6 font-sans bg-gray-50 min-h-screen">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Leave Management</h2>
          <p className="text-gray-600">Manage faculty and staff leave applications</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Download className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Export Report</span>
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Calendar className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Leave Calendar</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Approvals</p>
                <p className="text-2xl font-bold text-orange-600">
                  {totalPending}
                </p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Approved This Month</p>
                <p className="text-2xl font-bold text-green-600">
                  {totalApproved}
                </p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Rejected</p>
                <p className="text-2xl font-bold text-red-600">
                  {totalRejected}
                </p>
              </div>
              <XCircle className="w-8 h-8 text-red-600" />
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Applications</p>
                <p className="text-2xl font-bold text-blue-600">
                  {totalApplications}
                </p>
              </div>
              <FileText className="w-8 h-8 text-blue-600" /> {/* Changed from Calendar to FileText */}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
      <div className="space-y-6"> {/* Removed Tabs wrapper and its props */}
        <div className="relative">
          {/* Mobile View (scrollable) */}
          <div className="block md:hidden overflow-x-auto">
            <TabsList
              className="inline-flex gap-2 min-w-max pb-2 border-b border-gray-200"
              activeTab={activeTab} // Pass activeTab
              setActiveTab={setActiveTab} // Pass setActiveTab
            >
              <TabsTrigger
                value="applications"
                className="flex items-center justify-center py-2 text-xs whitespace-nowrap"
              >
                <FileText className="w-3 h-3 mr-1" />
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="balance"
                className="flex items-center justify-center py-2 text-xs whitespace-nowrap"
              >
                <PieChart className="w-3 h-3 mr-1" />
                Leave Balance
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center justify-center py-2 text-xs whitespace-nowrap"
              >
                <BarChart2 className="w-3 h-3 mr-1" />
                School Analytics
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="flex items-center justify-center py-2 text-xs whitespace-nowrap"
              >
                <Shield className="w-3 h-3 mr-1" />
                Policies
              </TabsTrigger>
            </TabsList>
          </div>

          {/* Desktop View (grid layout) */}
          <div className="hidden md:flex items-center justify-center border-b border-gray-200">
            <TabsList
              className="grid grid-cols-4 gap-4 pb-2"
              activeTab={activeTab} // Pass activeTab
              setActiveTab={setActiveTab} // Pass setActiveTab
            >
              <TabsTrigger
                value="applications"
                className="flex items-center justify-center py-2 text-base whitespace-nowrap"
              >
                <FileText className="w-4 h-4 mr-2" />
                Applications
              </TabsTrigger>
              <TabsTrigger
                value="balance"
                className="flex items-center justify-center py-2 text-base whitespace-nowrap"
              >
                <PieChart className="w-4 h-4 mr-2" />
                Leave Balance
              </TabsTrigger>
              <TabsTrigger
                value="analytics"
                className="flex items-center justify-center py-2 text-base whitespace-nowrap"
              >
                <BarChart2 className="w-4 h-4 mr-2" />
                School Analytics
              </TabsTrigger>
              <TabsTrigger
                value="policies"
                className="flex items-center justify-center py-2 text-base whitespace-nowrap"
              >
                <Shield className="w-4 h-4 mr-2" />
                Leave Policies
              </TabsTrigger>
            </TabsList>
          </div>
        </div>


        {/* Applications Tab */}
        <TabsContent value="applications" activeTab={activeTab} className="space-y-6">
          {/* Filters */}
          <Card className="shadow-md">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-gray-700">
                  <Filter className="w-4 h-4" />
                  <span className="text-sm font-medium">Filters:</span>
                </div>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  value={selectedSchool}
                  onChange={(e) => setSelectedSchool(e.target.value)}
                >
                  <option value="">All Schools</option>
                  {GBU_SCHOOLS.map(school => (
                    <option key={school.id} value={school.id}>{school.code}</option>
                  ))}
                </select>
                <select
                  className="px-3 py-2 border border-gray-300 rounded-md text-sm bg-white shadow-sm focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none"
                  value={leaveFilter}
                  onChange={(e) => setLeaveFilter(e.target.value)}
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="rejected">Rejected</option>
                </select>
                <div className="flex-1 w-full sm:w-auto flex items-center gap-2 border border-gray-300 rounded-md px-3 bg-white shadow-sm focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
                  <Search className="w-4 h-4 text-gray-400" />
                  <Input
                    type="text" // Explicitly set type
                    placeholder="Search employee..."
                    className="flex-1 border-none focus-visible:ring-0 focus-visible:ring-offset-0 px-0" // Remove input's default border/focus
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Applications Table */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Leave Applications</CardTitle>
              <CardDescription>Manage leave requests from faculty and staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <Table className="w-full text-left">
                  <TableHeader className="bg-gray-50 uppercase text-gray-600">
                    <TableRow>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Employee</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">School/Dept</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Leave Type</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Duration</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Days</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Applied Date</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">HoD Status</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Admin Status</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredApplications.length > 0 ? (
                      filteredApplications.map((application) => (
                        <TableRow key={application.id} className="border-b border-gray-200 hover:bg-gray-50">
                          <TableCell className="py-3 px-4">
                            <div className="font-medium text-gray-900">{application.name}</div>
                            <div className="text-sm text-gray-500">{application.employeeId}</div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="font-medium text-gray-800">{application.school}</div>
                            <div className="text-sm text-gray-500">{application.department}</div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <Badge variant="outline" className="text-blue-700 bg-blue-50 border-blue-200">
                              {getLeaveTypeName(application.leaveType)}
                            </Badge>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="text-sm text-gray-800">
                              {application.fromDate}
                              <div className="text-gray-500">to {application.toDate}</div>
                            </div>
                          </TableCell>
                          <TableCell className="py-3 px-4">
                            <span className="font-medium text-gray-800">{application.days} days</span>
                          </TableCell>
                          <TableCell className="py-3 px-4 text-gray-700">{application.appliedDate}</TableCell>
                          <TableCell className="py-3 px-4">{getStatusBadge(application.hodStatus)}</TableCell>
                          <TableCell className="py-3 px-4">{getStatusBadge(application.adminStatus)}</TableCell>
                          <TableCell className="py-3 px-4">
                            <div className="flex gap-1">
                              {application.status === 'Pending' && (
                                <>
                                  <Button size="sm" variant="outline" className="text-green-600 border-green-300 hover:bg-green-50">
                                    <CheckCircle className="w-3 h-3" />
                                  </Button>
                                  <Button size="sm" variant="outline" className="text-red-600 border-red-300 hover:bg-red-50">
                                    <XCircle className="w-3 h-3" />
                                  </Button>
                                </>
                              )}
                              <Button size="sm" variant="outline" className="text-gray-700 hover:bg-gray-100">
                                View
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan="9" className="text-center py-8 text-gray-600">
                          No leave applications found matching your criteria.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Leave Balance Tab */}
        <TabsContent value="balance" activeTab={activeTab} className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Leave Balance Tracking</CardTitle>
              <CardDescription>Monitor leave balances for all faculty and staff</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <Table className="w-full text-left">
                  <TableHeader className="bg-gray-50 uppercase text-gray-600">
                    <TableRow>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Employee</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">CL Balance</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">EL Balance</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">DL Balance</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">AL Balance</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Total Taken</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {leaveBalance.map((balance) => (
                      <TableRow key={balance.employeeId} className="border-b border-gray-200 hover:bg-gray-50">
                        <TableCell className="py-3 px-4">
                          <div className="font-medium text-gray-900">{balance.name}</div>
                          <div className="text-sm text-gray-500">{balance.employeeId}</div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2 text-gray-800">
                            <span className="font-medium">{balance.cl}</span>
                            <span className="text-xs text-gray-500">/ {LEAVE_TYPES.find(l => l.id === 'cl')?.maxDays || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2 text-gray-800">
                            <span className="font-medium">{balance.el}</span>
                            <span className="text-xs text-gray-500">/ {LEAVE_TYPES.find(l => l.id === 'el')?.maxDays || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2 text-gray-800">
                            <span className="font-medium">{balance.dl}</span>
                            <span className="text-xs text-gray-500">/ {LEAVE_TYPES.find(l => l.id === 'dl')?.maxDays || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <div className="flex items-center gap-2 text-gray-800">
                            <span className="font-medium">{balance.al}</span>
                            <span className="text-xs text-gray-500">/ {LEAVE_TYPES.find(l => l.id === 'al')?.maxDays || '-'}</span>
                          </div>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          <Badge variant="secondary" className="bg-blue-50 text-blue-700">
                            <TrendingUp className="w-3 h-3 mr-1 rotate-90" />
                            {balance.taken} Days
                          </Badge>
                        </TableCell>
                        <TableCell className="py-3 px-4">
                          {/* Placeholder for status based on balance, e.g., if any balance is low */}
                          {balance.cl <= 2 || balance.el <= 5 ? (
                            <Badge variant="destructive" className="bg-red-100 text-red-700">
                              <AlertTriangle className="w-3 h-3 mr-1" /> Low Balance
                            </Badge>
                          ) : (
                            <Badge variant="default" className="bg-green-100 text-green-700">
                              Healthy
                            </Badge>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* School Analytics Tab */}
        <TabsContent value="analytics" activeTab={activeTab} className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>School-wise Leave Analytics</CardTitle>
              <CardDescription>Overview of leave application statuses across different schools</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto rounded-md border border-gray-200">
                <Table className="w-full text-left">
                  <TableHeader className="bg-gray-50 uppercase text-gray-600">
                    <TableRow>
                      <TableHead className="py-3 px-4 whitespace-nowrap">School</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Pending</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Approved</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Rejected</TableHead>
                      <TableHead className="py-3 px-4 whitespace-nowrap">Total Applications</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {schoolWiseLeaveStats.map((stats) => (
                      <TableRow key={stats.school} className="border-b border-gray-200 hover:bg-gray-50">
                        <TableCell className="py-3 px-4 font-medium text-gray-900">
                          {GBU_SCHOOLS.find(s => s.id === stats.school)?.name || stats.school}
                        </TableCell>
                        <TableCell className="py-3 px-4 text-orange-600 font-medium">{stats.pending}</TableCell>
                        <TableCell className="py-3 px-4 text-green-600 font-medium">{stats.approved}</TableCell>
                        <TableCell className="py-3 px-4 text-red-600 font-medium">{stats.rejected}</TableCell>
                        <TableCell className="py-3 px-4 text-blue-600 font-bold">{stats.total}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          {/* Add more analytics components here, e.g., charts */}
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>Leave Type Distribution</CardTitle>
              <CardDescription>Breakdown of leave types applied</CardDescription>
            </CardHeader>
            <CardContent>
              {/* This is where you might integrate a charting library (e.g., Recharts, Chart.js) */}
              <div className="text-center text-gray-500 py-10">
                [Placeholder for a Pie Chart showing leave type distribution]
                <p className="text-sm mt-2">Data visualization would go here.</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Policies Tab */}
        <TabsContent value="policies" activeTab={activeTab} className="space-y-6">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle>University Leave Policies</CardTitle>
              <CardDescription>Official leave policies for faculty and staff</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5 space-y-2 text-gray-700">
                {LEAVE_TYPES.map(type => (
                  <li key={type.id} className="text-base">
                    <span className="font-semibold">{type.name} ({type.id.toUpperCase()}):</span> Maximum {type.maxDays} days per year.
                    {type.id === 'cl' && " Can be taken for personal reasons, typically limited to a few consecutive days."}
                    {type.id === 'el' && " Accrued over time, can be carried forward or encashed as per rules."}
                    {type.id === 'dl' && " Granted for official duties, conferences, or workshops."}
                    {type.id === 'al' && " For academic pursuits like research, presentations, or higher studies."}
                    {type.id === 'ml' && " Requires a medical certificate for approval."}
                    {type.id === 'maternity' && " For female employees during pregnancy and childbirth."}
                    {type.id === 'paternity' && " For male employees for childcare and support to spouse."}
                    {type.id === 'sabbatical' && " Long-term leave for professional development or research."}
                    {type.id === 'fdp' && " Specifically for participation in Faculty Development Programs."}
                  </li>
                ))}
                <li className="text-base font-semibold text-blue-700">
                  For detailed guidelines and application procedures, please refer to the official HR manual.
                </li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </div>
    </div>
  );
};

export default LeaveManagement;