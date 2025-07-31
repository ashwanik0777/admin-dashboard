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
  Upload,
  CheckCircle,
  Clock,
  UserPlus,
  Mail,
  IdCard,
  FileText
} from 'lucide-react';
import { GBU_SCHOOLS } from '../data/gbuMasterData';

const EmployeeOnboarding = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    designation: '',
    qualification: '',
    experience: '',
    joiningDate: '',
    employeeId: '',
    extraRoles: [],
  });

  const designations = [
    'Professor',
    'Associate Professor',
    'Assistant Professor',
    'Lecturer',
    'Admin Officer',
    'Lab Assistant',
    'Technical Assistant',
    'Librarian',
    'Registrar Assistant'
  ];

  const extraRoles = [
    'Club Head',
    'NSS Officer',
    'Hostel Warden',
    'IQAC Coordinator',
    'Examination Controller',
    'Sports Coordinator',
    'Cultural Coordinator',
    'Research Coordinator'
  ];

  const recentOnboardings = [
    {
      id: 1,
      name: 'Dr. Amit Kumar Singh',
      school: 'SoICT',
      department: 'CSE',
      designation: 'Assistant Professor',
      joiningDate: '2024-12-20',
      status: 'Completed',
      employeeId: 'GBU2024001',
      email: 'amit.singh@gbu.ac.in'
    },
    {
      id: 2,
      name: 'Prof. Sunita Sharma',
      school: 'SoE',
      department: 'Civil',
      designation: 'Professor',
      joiningDate: '2024-12-18',
      status: 'In Progress',
      employeeId: 'GBU2024002',
      email: 'sunita.sharma@gbu.ac.in'
    },
    {
      id: 3,
      name: 'Dr. Rajesh Gupta',
      school: 'SoM',
      department: 'MBA',
      designation: 'Associate Professor',
      joiningDate: '2024-12-15',
      status: 'Pending',
      employeeId: 'GBU2024003',
      email: 'rajesh.gupta@gbu.ac.in'
    }
  ];

  const onboardingSteps = [
    { id: 1, name: 'Personal Information', icon: UserPlus, completed: true },
    { id: 2, name: 'Document Upload', icon: Upload, completed: true },
    { id: 3, name: 'Email & ID Generation', icon: Mail, completed: false },
    { id: 4, name: 'Role Assignment', icon: IdCard, completed: false },
    { id: 5, name: 'Final Verification', icon: CheckCircle, completed: false },
  ];

  const generateEmployeeId = () => {
    const year = new Date().getFullYear();
    const schoolCode = GBU_SCHOOLS.find(s => s.id === selectedSchool)?.code || 'GBU';
    const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
    return `${schoolCode}${year}${randomNum}`;
  };

  const generateEmail = () => {
    if (formData.firstName && formData.lastName) {
      return `${formData.firstName.toLowerCase()}.${formData.lastName.toLowerCase()}@gbu.ac.in`;
    }
    return '';
  };

  const handleSchoolChange = (schoolId) => {
    setSelectedSchool(schoolId);
    setSelectedDepartment('');
  };

  const getSelectedSchoolData = () => {
    return GBU_SCHOOLS.find(school => school.id === selectedSchool);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'In Progress':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'Pending':
        return (
          <Badge variant="outline">
            <Clock className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 p-4 md:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Employee Onboarding</h2>
          <p className="text-gray-600">Streamlined faculty and staff onboarding process</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Upload className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Bulk Upload</span>
          </Button>
          <Button variant="outline" className="flex-1 sm:flex-none">
            <FileText className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Export Report</span>
          </Button>
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs defaultValue="new-onboarding" className="space-y-6">
        <div className="relative">
          <TabsList className="w-full overflow-x-auto pb-2">
            <div className="flex space-x-4 min-w-max">
              <TabsTrigger value="new-onboarding" className="px-4 py-2 whitespace-nowrap">
                New Onboarding
              </TabsTrigger>
              <TabsTrigger value="in-progress" className="px-4 py-2 whitespace-nowrap">
                In Progress
              </TabsTrigger>
              <TabsTrigger value="completed" className="px-4 py-2 whitespace-nowrap">
                Completed
              </TabsTrigger>
            </div>
          </TabsList>
        </div>

        {/* New Onboarding Tab */}
        <TabsContent value="new-onboarding" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Onboarding Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  New Employee Onboarding
                </CardTitle>
                <CardDescription>
                  Add new faculty or staff member to GBU system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* School and Department Selection */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">School *</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedSchool}
                      onChange={(e) => handleSchoolChange(e.target.value)}
                    >
                      <option value="">Select School</option>
                      {GBU_SCHOOLS.map(school => (
                        <option key={school.id} value={school.id}>
                          {school.name} ({school.code})
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Department *</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={selectedDepartment}
                      onChange={(e) => setSelectedDepartment(e.target.value)}
                      disabled={!selectedSchool}
                    >
                      <option value="">Select Department</option>
                      {getSelectedSchoolData()?.departments.map(dept => (
                        <option key={dept.id} value={dept.id}>
                          {dept.name} ({dept.code})
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Personal Information */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">First Name *</label>
                    <Input 
                      placeholder="Enter first name"
                      value={formData.firstName}
                      onChange={(e) => setFormData({...formData, firstName: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Last Name *</label>
                    <Input 
                      placeholder="Enter last name"
                      value={formData.lastName}
                      onChange={(e) => setFormData({...formData, lastName: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone Number *</label>
                    <Input 
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={(e) => setFormData({...formData, phone: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Designation *</label>
                    <select 
                      className="w-full p-2 border border-gray-300 rounded-md"
                      value={formData.designation}
                      onChange={(e) => setFormData({...formData, designation: e.target.value})}
                    >
                      <option value="">Select Designation</option>
                      {designations.map(designation => (
                        <option key={designation} value={designation}>
                          {designation}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Highest Qualification *</label>
                    <Input 
                      placeholder="e.g., Ph.D. in Computer Science"
                      value={formData.qualification}
                      onChange={(e) => setFormData({...formData, qualification: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Experience (Years) *</label>
                    <Input 
                      type="number"
                      placeholder="Years of experience"
                      value={formData.experience}
                      onChange={(e) => setFormData({...formData, experience: e.target.value})}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Joining Date *</label>
                  <Input 
                    type="date"
                    value={formData.joiningDate}
                    onChange={(e) => setFormData({...formData, joiningDate: e.target.value})}
                  />
                </div>

                {/* Auto-generated fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Employee ID (Auto-generated)</label>
                    <div className="flex gap-2">
                      <Input 
                        value={formData.employeeId || generateEmployeeId()}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => setFormData({...formData, employeeId: generateEmployeeId()})}
                      >
                        Generate
                      </Button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">GBU Email (Auto-generated)</label>
                    <div className="flex gap-2">
                      <Input 
                        value={generateEmail()}
                        readOnly
                        className="bg-gray-50"
                      />
                      <Button type="button" variant="outline">
                        <Mail className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>

                {/* Extra Roles */}
                <div>
                  <label className="block text-sm font-medium mb-2">Additional Roles (Optional)</label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {extraRoles.map(role => (
                      <label key={role} className="flex items-center space-x-2">
                        <input type="checkbox" className="rounded" />
                        <span className="text-sm">{role}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Document Upload Section */}
                <div className="space-y-4">
                  <h4 className="font-medium">Document Upload</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Offer Letter *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">ID Proof *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Degree Certificate *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <input type="file" className="hidden" accept=".pdf,.jpg,.png" />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Resume/CV *</label>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                        <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                        <p className="text-sm text-gray-600">Drop files here or click to upload</p>
                        <input type="file" className="hidden" accept=".pdf,.doc,.docx" />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button type="submit" className="flex-1">
                    <UserPlus className="w-4 h-4 mr-2" />
                    Submit Onboarding
                  </Button>
                  <Button type="button" variant="outline" className="flex-1 sm:flex-none">
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
            
            {/* Progress Tracker */}
            <Card>
              <CardHeader>
                <CardTitle>Onboarding Progress</CardTitle>
                <CardDescription>Track completion status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {onboardingSteps.map((step) => (
                    <div key={step.id} className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-400'
                      }`}>
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4" />
                        ) : (
                          <step.icon className="w-4 h-4" />
                        )}
                      </div>
                      <p className={`text-sm font-medium ${
                        step.completed ? 'text-green-600' : 'text-gray-600'
                      }`}>
                        {step.name}
                      </p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* In Progress Tab */}
        <TabsContent value="in-progress" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Onboarding In Progress</CardTitle>
              <CardDescription>Employees currently in the onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-[800px] md:min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Name</TableHead>
                      <TableHead className="whitespace-nowrap">School/Dept</TableHead>
                      <TableHead className="whitespace-nowrap">Designation</TableHead>
                      <TableHead className="whitespace-nowrap">Employee ID</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                      <TableHead className="whitespace-nowrap">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOnboardings.filter(emp => emp.status === 'In Progress').map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium whitespace-nowrap">{employee.name}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="font-medium">{employee.school}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{employee.designation}</TableCell>
                        <TableCell className="whitespace-nowrap">{employee.employeeId}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            <Clock className="w-3 h-3 mr-1" />
                            {employee.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button size="sm" variant="outline" className="whitespace-nowrap">
                            Continue
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Onboardings</CardTitle>
              <CardDescription>Successfully onboarded employees</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="min-w-[800px] md:min-w-full">
                  <TableHeader>
                    <TableRow>
                      <TableHead className="whitespace-nowrap">Name</TableHead>
                      <TableHead className="whitespace-nowrap">School/Dept</TableHead>
                      <TableHead className="whitespace-nowrap">Designation</TableHead>
                      <TableHead className="whitespace-nowrap">Employee ID</TableHead>
                      <TableHead className="whitespace-nowrap">Email</TableHead>
                      <TableHead className="whitespace-nowrap">Joining Date</TableHead>
                      <TableHead className="whitespace-nowrap">Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentOnboardings.filter(emp => emp.status === 'Completed').map((employee) => (
                      <TableRow key={employee.id}>
                        <TableCell className="font-medium whitespace-nowrap">{employee.name}</TableCell>
                        <TableCell className="whitespace-nowrap">
                          <div className="font-medium">{employee.school}</div>
                          <div className="text-sm text-gray-500">{employee.department}</div>
                        </TableCell>
                        <TableCell className="whitespace-nowrap">{employee.designation}</TableCell>
                        <TableCell className="whitespace-nowrap">{employee.employeeId}</TableCell>
                        <TableCell className="whitespace-nowrap">{employee.email}</TableCell>
                        <TableCell className="whitespace-nowrap">{employee.joiningDate}</TableCell>
                        <TableCell>
                          <Badge className="bg-green-100 text-green-800">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {employee.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default EmployeeOnboarding;