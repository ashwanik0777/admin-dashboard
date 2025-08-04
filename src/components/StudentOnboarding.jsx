import React, { useState, createContext, useContext } from 'react';
import {
  GraduationCap,
  Upload,
  CheckCircle,
  Clock,
  UserPlus,
  Mail,
  IdCard,
  FileText,
  Home,
  Bus,
  CreditCard
} from 'lucide-react';

// --- Internal UI Components (Replicated Basic Functionality & Styling) ---

// Card Component
const Card = ({ children, className }) => (
  <div className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}>
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
const Button = ({ children, className, variant = 'default', size = 'default', ...props }) => {
  const baseStyles = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  
  const variantStyles = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const sizeStyles = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`} {...props}>
      {children}
    </button>
  );
};

// Input Component
const Input = ({ className, type, ...props }) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      {...props}
    />
  );
};

// Badge Component
const Badge = ({ children, className, variant = 'default' }) => {
  const baseStyles = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  
  const variantStyles = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };

  return (
    <div className={`${baseStyles} ${variantStyles[variant]} ${className}`}>
      {children}
    </div>
  );
};


// Tabs Components
const TabsContext = createContext(null);

const Tabs = ({ defaultValue, children, className }) => {
  const [activeTab, setActiveTab] = useState(defaultValue);
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>
        {children}
      </div>
    </TabsContext.Provider>
  );
};

const TabsList = ({ children, className }) => (
  <div className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}>
    {children}
  </div>
);

const TabsTrigger = ({ value, children, className }) => {
  const { activeTab, setActiveTab } = useContext(TabsContext);
  const isActive = activeTab === value;
  return (
    <button
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
        isActive ? 'bg-background text-foreground shadow-sm' : ''
      } ${className}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
};

const TabsContent = ({ value, children, className }) => {
  const { activeTab } = useContext(TabsContext);
  return activeTab === value ? <div className={className}>{children}</div> : null;
};

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


const StudentOnboarding = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedProgram, setSelectedProgram] = useState('');
  const [formData, setFormData] = useState({
    studentName: '',
    fatherName: '',
    phone: '',
    email: '',
    dob: '',
    category: '',
    address: ''
  });

  const GBU_SCHOOLS = [
    { id: 'soict', name: 'School of Information and Communication Technology', code: 'SoICT' },
    { id: 'som', name: 'School of Management', code: 'SoM' },
    { id: 'sohss', name: 'School of Humanities and Social Sciences', code: 'SoHSS' },
    { id: 'sobas', name: 'School of Basic and Applied Sciences', code: 'SoBAS' },
    { id: 'sol', name: 'School of Law', code: 'SoL' }
  ];

  const onboardingSteps = [
    { id: 1, name: 'Admission Verification', icon: FileText, completed: true },
    { id: 2, name: 'Document Upload', icon: Upload, completed: true },
    { id: 3, name: 'Hostel Allocation', icon: Home, completed: false },
    { id: 4, name: 'Transport Allocation', icon: Bus, completed: false },
    { id: 5, name: 'ID Card Generation', icon: IdCard, completed: false },
    { id: 6, name: 'Welcome Package', icon: Mail, completed: false }
  ];

  const recentAdmissions = [
    {
      id: 1,
      name: 'Aarav Sharma',
      rollNo: 'GBU2024001',
      program: 'B.Tech CSE',
      school: 'SoICT',
      status: 'In Progress',
      step: 3,
      email: 'aarav.sharma@gbu.ac.in',
      phone: '+91 9876543210'
    },
    {
      id: 2,
      name: 'Priya Patel',
      rollNo: 'GBU2024002',
      program: 'MBA',
      school: 'SoM',
      status: 'Completed',
      step: 6,
      email: 'priya.patel@gbu.ac.in',
      phone: '+91 9876543211'
    },
    {
      id: 3,
      name: 'Rohit Kumar',
      rollNo: 'GBU2024003',
      program: 'B.A. Psychology',
      school: 'SoHSS',
      status: 'Pending',
      step: 1,
      email: 'rohit.kumar@gbu.ac.in',
      phone: '+91 9876543212'
    }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log('Form submitted:', { ...formData, selectedSchool, selectedProgram });
  };

  const getStatusBadge = (status, step) => {
    switch (status) {
      case 'Completed':
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            <CheckCircle className="w-3 h-3 mr-1" />
            {status}
          </Badge>
        );
      case 'In Progress':
        return (
          <Badge variant="secondary">
            <Clock className="w-3 h-3 mr-1" />
            Step {step}/6
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
          <h2 className="text-2xl font-bold text-gray-900">Student Onboarding</h2>
          <p className="text-gray-600">Streamlined admission to enrollment process</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" className="flex-1 sm:flex-none">
            <Upload className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">Bulk Import</span>
          </Button>
          <Button className="flex-1 sm:flex-none">
            <UserPlus className="w-4 h-4 mr-2" />
            <span className="whitespace-nowrap">New Admission</span>
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Admissions</p>
                <p className="text-2xl font-bold text-blue-600">1,248</p>
              </div>
              <GraduationCap className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">In Progress</p>
                <p className="text-2xl font-bold text-orange-600">156</p>
              </div>
              <Clock className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-green-600">1,092</p>
              </div>
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 md:p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">ID Cards Pending</p>
                <p className="text-2xl font-bold text-purple-600">23</p>
              </div>
              <IdCard className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main Tabs */}
     <Tabs defaultValue="new-admission" className="space-y-6">
  <div className="relative">
    {/* Mobile View (scrollable) */}
    <div className="block md:hidden overflow-x-auto">
      <TabsList className="inline-flex gap-2 min-w-max pb-2">
        <TabsTrigger value="new-admission" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
          New Admission
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
          In Progress
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
          Completed
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
          Services
        </TabsTrigger>
      </TabsList>
    </div>

    {/* Desktop View (grid layout) */}
    <div className="hidden md:flex items-center justify-center">
      <TabsList className="grid grid-cols-4 gap-4 pb-2">
        <TabsTrigger value="new-admission" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
          New Admission
        </TabsTrigger>
        <TabsTrigger value="in-progress" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
          In Progress
        </TabsTrigger>
        <TabsTrigger value="completed" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
          Completed
        </TabsTrigger>
        <TabsTrigger value="services" className="flex items-center justify-center py-2 px-18 text-base whitespace-nowrap">
          Services
        </TabsTrigger>
      </TabsList>
    </div>
  </div>

        {/* New Admission Tab */}
        <TabsContent value="new-admission" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Admission Form */}
            <Card className="lg:col-span-2">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <UserPlus className="w-5 h-5" />
                  Student Admission Form
                </CardTitle>
                <CardDescription>
                  Complete student admission and onboarding process
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">School *</label>
                      <select
                        className="w-full p-2 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all"
                        value={selectedSchool}
                        onChange={(e) => setSelectedSchool(e.target.value)}
                        required
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
                      <label className="block text-sm font-medium mb-2">Program *</label>
                      <select
                        className="w-full p-2 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all"
                        value={selectedProgram}
                        onChange={(e) => setSelectedProgram(e.target.value)}
                        required
                      >
                        <option value="">Select Program</option>
                        <option value="btech">B.Tech</option>
                        <option value="mtech">M.Tech</option>
                        <option value="mba">MBA</option>
                        <option value="bba">BBA</option>
                        <option value="ba">B.A.</option>
                        <option value="ma">M.A.</option>
                        <option value="phd">Ph.D.</option>
                      </select>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Student Name *</label>
                      <Input 
                        placeholder="Enter full name" 
                        name="studentName"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:shadow-md transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Father's Name *</label>
                      <Input 
                        placeholder="Enter father's name" 
                        name="fatherName"
                        value={formData.fatherName}
                        onChange={handleInputChange}
                        className="shadow-sm focus:shadow-md transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Phone Number *</label>
                      <Input 
                        placeholder="Enter phone number" 
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="shadow-sm focus:shadow-md transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Email Address *</label>
                      <Input 
                        placeholder="Enter email address" 
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="shadow-sm focus:shadow-md transition-all"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Date of Birth *</label>
                      <Input 
                        type="date" 
                        name="dob"
                        value={formData.dob}
                        onChange={handleInputChange}
                        className="shadow-sm focus:shadow-md transition-all"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-2">Admission Category *</label>
                      <select 
                        className="w-full p-2 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="general">General</option>
                        <option value="obc">OBC</option>
                        <option value="sc">SC</option>
                        <option value="st">ST</option>
                        <option value="ews">EWS</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Address *</label>
                    <textarea 
                      className="w-full p-2 shadow-sm rounded-md focus:ring-2 focus:ring-blue-500 focus:shadow-md transition-all" 
                      rows={3} 
                      placeholder="Enter complete address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      required
                    ></textarea>
                  </div>
                  <div className="space-y-4">
                    <h4 className="font-medium">Document Upload</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {[
                        'Admission Letter',
                        'Photo',
                        '12th Marksheet',
                        'Aadhar Card',
                        'Transfer Certificate',
                        'Medical Certificate'
                      ].map((doc) => (
                        <div key={doc}>
                          <label className="block text-sm font-medium mb-2">{doc} *</label>
                          <div className="shadow-sm hover:shadow-md transition-all duration-200 rounded-lg p-4 text-center cursor-pointer bg-gray-50">
                            <Upload className="w-6 h-6 mx-auto mb-2 text-gray-400" />
                            <p className="text-sm text-gray-600">Drop file here or click to upload</p>
                            <input type="file" className="hidden" required />
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <Button onClick={handleSubmit} className="flex-1">
                      <UserPlus className="w-4 h-4 mr-2" />
                      Submit Admission
                    </Button>
                    <Button variant="outline">Save Draft</Button>
                  </div>
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
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shadow-sm ${
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
              <CardTitle>Admissions In Progress</CardTitle>
              <CardDescription>Students currently in the onboarding process</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="shadow-sm rounded-lg">
                  <Table className="min-w-[800px] md:min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Student Name</TableHead>
                        <TableHead className="whitespace-nowrap">Roll No</TableHead>
                        <TableHead className="whitespace-nowrap">Program</TableHead>
                        <TableHead className="whitespace-nowrap">School</TableHead>
                        <TableHead className="whitespace-nowrap">Status</TableHead>
                        <TableHead className="whitespace-nowrap">Contact</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAdmissions.filter(student => student.status === 'In Progress').map((student) => (
                        <TableRow key={student.id} className="hover:shadow-sm transition-all">
                          <TableCell className="font-medium whitespace-nowrap">{student.name}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.rollNo}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.program}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.school}</TableCell>
                          <TableCell>{getStatusBadge(student.status, student.step)}</TableCell>
                          <TableCell>
                            <div className="text-sm whitespace-nowrap">
                              {student.email}
                              <div className="text-gray-500">{student.phone}</div>
                            </div>
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
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Completed Tab */}
        <TabsContent value="completed" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Completed Admissions</CardTitle>
              <CardDescription>Successfully enrolled students</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <div className="shadow-sm rounded-lg">
                  <Table className="min-w-[800px] md:min-w-full">
                    <TableHeader>
                      <TableRow>
                        <TableHead className="whitespace-nowrap">Student Name</TableHead>
                        <TableHead className="whitespace-nowrap">Roll No</TableHead>
                        <TableHead className="whitespace-nowrap">Program</TableHead>
                        <TableHead className="whitespace-nowrap">School</TableHead>
                        <TableHead className="whitespace-nowrap">Status</TableHead>
                        <TableHead className="whitespace-nowrap">Contact</TableHead>
                        <TableHead className="whitespace-nowrap">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {recentAdmissions.filter(student => student.status === 'Completed').map((student) => (
                        <TableRow key={student.id} className="hover:shadow-sm transition-all">
                          <TableCell className="font-medium whitespace-nowrap">{student.name}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.rollNo}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.program}</TableCell>
                          <TableCell className="whitespace-nowrap">{student.school}</TableCell>
                          <TableCell>{getStatusBadge(student.status, student.step)}</TableCell>
                          <TableCell>
                            <div className="text-sm whitespace-nowrap">
                              {student.email}
                              <div className="text-gray-500">{student.phone}</div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-1">
                              <Button size="sm" variant="outline">
                                <IdCard className="w-3 h-3" />
                              </Button>
                              <Button size="sm" variant="outline">
                                <Mail className="w-3 h-3" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Services Tab */}
        <TabsContent value="services" className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Home className="w-5 h-5" />
                  Hostel Allocation
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Manage hostel room allocations for new students</p>
                <Button variant="outline" size="sm">Configure</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bus className="w-5 h-5" />
                  Transport Service
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Assign bus routes and transport facilities</p>
                <Button variant="outline" size="sm">Manage</Button>
              </CardContent>
            </Card>
            <Card className="hover:shadow-md transition-all duration-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  ID Card Generator
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 mb-4">Generate QR-based student ID cards</p>
                <Button variant="outline" size="sm">Generate</Button>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StudentOnboarding;