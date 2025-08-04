import React, { useState, useEffect } from 'react';
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
import { GBU_SCHOOLS } from '../data/gbuMasterData'; // Assuming this path is correct

// Helper function for responsive inline styles - now receives windowWidth as a parameter
const responsiveStyle = (windowWidth, baseStyles, sm = {}, md = {}, lg = {}) => {
  let currentStyles = { ...baseStyles };

  if (windowWidth >= 640) { // sm breakpoint
    currentStyles = { ...currentStyles, ...sm };
  }
  if (windowWidth >= 768) { // md breakpoint (not explicitly used in your original but good practice)
    currentStyles = { ...currentStyles, ...md };
  }
  if (windowWidth >= 1024) { // lg breakpoint
    currentStyles = { ...currentStyles, ...lg };
  }
  return currentStyles;
};

// Debounce utility function to limit the rate of function calls
const debounce = (func, delay) => {
  let timeout;
  return function(...args) {
    const context = this;
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(context, args), delay);
  };
};

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

  // State for managing active tab
  const [activeTab, setActiveTab] = useState('new-onboarding');

  // State for window width
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Original handler that updates state
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    // Debounced version of the resize handler
    const debouncedHandleResize = debounce(handleResize, 250); // Adjust delay (in ms) as needed

    // Add event listener
    window.addEventListener('resize', debouncedHandleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener('resize', debouncedHandleResize);
    };
  }, []); // Empty dependency array ensures this effect runs once on mount and cleans up on unmount

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
    let badgeStyle = {
      display: 'inline-flex',
      alignItems: 'center',
      padding: '0.25rem 0.5rem',
      borderRadius: '0.25rem',
      fontSize: '0.75rem',
      fontWeight: '500',
      gap: '0.25rem'
    };
    let icon;

    switch (status) {
      case 'Completed':
        badgeStyle = { ...badgeStyle, backgroundColor: '#d1fae5', color: '#065f46' }; // green-100, green-800
        icon = <CheckCircle style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
        break;
      case 'In Progress':
        badgeStyle = { ...badgeStyle, backgroundColor: '#f3f4f6', color: '#4b5563' }; // gray-100, gray-600 (secondary)
        icon = <Clock style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
        break;
      case 'Pending':
        badgeStyle = { ...badgeStyle, border: '1px solid #d1d5db', color: '#4b5563' }; // gray-300, gray-600 (outline)
        icon = <Clock style={{ width: '0.75rem', height: '0.75rem', marginRight: '0.25rem' }} />;
        break;
      default:
        badgeStyle = { ...badgeStyle, border: '1px solid #d1d5db', color: '#4b5563' };
    }
    return (
      <span style={badgeStyle}>
        {icon}
        {status}
      </span>
    );
  };


  return (
    <div style={{ padding: '1.5rem', maxWidth: '1200px', margin: '0 auto', fontFamily: 'sans-serif' }}>
      {/* Header Section */}
      <div
        style={responsiveStyle(
          windowWidth, // Pass windowWidth
          { display: 'flex', flexDirection: 'column', alignItems: 'flex-start', justifyContent: 'space-between', gap: '1rem', marginBottom: '1.5rem' },
          {}, // No specific small screen overrides for this one as default is column
          {}, // No specific medium screen overrides
          { flexDirection: 'row', alignItems: 'center' } // Large screen: row layout, vertically center
        )}
      >
        <div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1a202c', marginBottom: '0.25rem' }}>Employee Onboarding</h2>
          <p style={{ color: '#4a5568' }}>Streamlined faculty and staff onboarding process</p>
        </div>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            <Upload style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
            <span>Bulk Upload</span>
          </button>
          <button
            style={{
              padding: '0.5rem 1rem',
              border: '1px solid #d1d5db',
              borderRadius: '0.375rem',
              backgroundColor: 'white',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '0.875rem',
              fontWeight: '500',
              color: '#374151'
            }}
          >
            <FileText style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
            <span>Export Report</span>
          </button>
        </div>
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
  
        {/* New Onboarding Tab Content */}
        {activeTab === 'new-onboarding' && (
          <div style={{ marginTop: '1.5rem' }}>
            <div
              style={responsiveStyle(
                windowWidth, // Pass windowWidth
                { display: 'grid', gridTemplateColumns: '1fr', gap: '1.5rem' },
                {}, // No specific small screen overrides for the main grid
                {}, // No specific medium screen overrides
                { gridTemplateColumns: '2fr 1fr' } // Large screen: 2fr 1fr layout
              )}
            >
              {/* Onboarding Form Card */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', padding: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c', display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem' }}>
                    <UserPlus style={{ width: '1.25rem', height: '1.25rem' }} />
                    New Employee Onboarding
                  </h3>
                  <p style={{ color: '#4a5568' }}>Add new faculty or staff member to GBU system</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  {/* School and Department Selection */}
                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                      { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                    )}
                  >
                    <div>
                      <label htmlFor="school" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>School *</label>
                      <select
                        id="school"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
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
                      <label htmlFor="department" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Department *</label>
                      <select
                        id="department"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
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
                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                      { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                    )}
                  >
                    <div>
                      <label htmlFor="firstName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>First Name *</label>
                      <input
                        type="text"
                        id="firstName"
                        placeholder="Enter first name"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.firstName}
                        onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Last Name *</label>
                      <input
                        type="text"
                        id="lastName"
                        placeholder="Enter last name"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.lastName}
                        onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                      />
                    </div>
                  </div>

                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                      { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                    )}
                  >
                    <div>
                      <label htmlFor="phone" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Phone Number *</label>
                      <input
                        type="text"
                        id="phone"
                        placeholder="Enter phone number"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="designation" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Designation *</label>
                      <select
                        id="designation"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.designation}
                        onChange={(e) => setFormData({ ...formData, designation: e.target.value })}
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

                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                      { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                    )}
                  >
                    <div>
                      <label htmlFor="qualification" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Highest Qualification *</label>
                      <input
                        type="text"
                        id="qualification"
                        placeholder="e.g., Ph.D. in Computer Science"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.qualification}
                        onChange={(e) => setFormData({ ...formData, qualification: e.target.value })}
                      />
                    </div>
                    <div>
                      <label htmlFor="experience" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Experience (Years) *</label>
                      <input
                        type="number"
                        id="experience"
                        placeholder="Years of experience"
                        style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                        value={formData.experience}
                        onChange={(e) => setFormData({ ...formData, experience: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="joiningDate" style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Joining Date *</label>
                    <input
                      type="date"
                      id="joiningDate"
                      style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem' }}
                      value={formData.joiningDate}
                      onChange={(e) => setFormData({ ...formData, joiningDate: e.target.value })}
                    />
                  </div>

                  {/* Auto-generated fields */}
                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                      { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                    )}
                  >
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Employee ID (Auto-generated)</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          value={formData.employeeId || generateEmployeeId()}
                          readOnly
                          style={{ flexGrow: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: '#f9fafb' }}
                        />
                        <button
                          type="button"
                          onClick={() => setFormData({ ...formData, employeeId: generateEmployeeId() })}
                          style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                          }}
                        >
                          Generate
                        </button>
                      </div>
                    </div>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>GBU Email (Auto-generated)</label>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <input
                          type="text"
                          value={generateEmail()}
                          readOnly
                          style={{ flexGrow: 1, padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.375rem', backgroundColor: '#f9fafb' }}
                        />
                        <button
                          type="button"
                          style={{
                            padding: '0.5rem 1rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '0.375rem',
                            backgroundColor: 'white',
                            cursor: 'pointer',
                            display: 'inline-flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            fontSize: '0.875rem',
                            fontWeight: '500',
                            color: '#374151'
                          }}
                        >
                          <Mail style={{ width: '1rem', height: '1rem' }} />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Extra Roles */}
                  <div>
                    <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Additional Roles (Optional)</label>
                    <div
                      style={responsiveStyle(
                        windowWidth, // Pass windowWidth
                        { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' },
                        { gridTemplateColumns: '1fr 1fr 1fr' } // Small screen and up: 1fr 1fr 1fr
                      )}
                    >
                      {extraRoles.map(role => (
                        <label key={role} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                          <input type="checkbox" style={{ borderRadius: '0.25rem' }} />
                          <span style={{ fontSize: '0.875rem' }}>{role}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* Document Upload Section */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: '500' }}>Document Upload</h4>
                    <div
                      style={responsiveStyle(
                        windowWidth, // Pass windowWidth
                        { display: 'grid', gridTemplateColumns: '1fr', gap: '1rem' },
                        { gridTemplateColumns: '1fr 1fr' } // Small screen and up: 1fr 1fr
                      )}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Offer Letter *</label>
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                          <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Drop files here or click to upload</p>
                          <input type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx" />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>ID Proof *</label>
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                          <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Drop files here or click to upload</p>
                          <input type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.png" />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Degree Certificate *</label>
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                          <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Drop files here or click to upload</p>
                          <input type="file" style={{ display: 'none' }} accept=".pdf,.jpg,.png" />
                        </div>
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.875rem', fontWeight: '500', marginBottom: '0.5rem' }}>Resume/CV *</label>
                        <div style={{ border: '2px dashed #d1d5db', borderRadius: '0.5rem', padding: '1rem', textAlign: 'center' }}>
                          <Upload style={{ width: '2rem', height: '2rem', margin: '0 auto 0.5rem', color: '#9ca3af' }} />
                          <p style={{ fontSize: '0.875rem', color: '#4b5563' }}>Drop files here or click to upload</p>
                          <input type="file" style={{ display: 'none' }} accept=".pdf,.doc,.docx" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div
                    style={responsiveStyle(
                      windowWidth, // Pass windowWidth
                      { display: 'flex', flexDirection: 'column', gap: '0.75rem' },
                      { flexDirection: 'row' } // Small screen and up: row layout
                    )}
                  >
                    <button
                      type="submit"
                      style={{
                        flex: 1,
                        padding: '0.75rem 1.5rem',
                        borderRadius: '0.375rem',
                        backgroundColor: '#2563eb',
                        color: 'white',
                        fontWeight: '500',
                        cursor: 'pointer',
                        border: 'none',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1rem'
                      }}
                    >
                      <UserPlus style={{ width: '1rem', height: '1rem', marginRight: '0.5rem' }} />
                      Submit Onboarding
                    </button>
                    <button
                      type="button"
                      style={responsiveStyle(
                        windowWidth, // Pass windowWidth
                        {
                          flex: 1,
                          padding: '0.75rem 1.5rem',
                          border: '1px solid #d1d5db',
                          borderRadius: '0.375rem',
                          backgroundColor: 'white',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          fontWeight: '500',
                          color: '#374151'
                        },
                        { flex: 'none' } // Small screen and up: flex: 'none' for specific width
                      )}
                    >
                      Save
                    </button>
                  </div>
                </div>
              </div>

              {/* Progress Tracker Card */}
              <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', padding: '1.5rem' }}>
                <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c' }}>Onboarding Progress</h3>
                  <p style={{ color: '#4a5568' }}>Track completion status</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {onboardingSteps.map((step) => (
                    <div key={step.id} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <div
                        style={{
                          width: '2rem',
                          height: '2rem',
                          borderRadius: '9999px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          backgroundColor: step.completed ? '#d1fae5' : '#f3f4f6', // green-100 or gray-100
                          color: step.completed ? '#065f46' : '#9ca3af' // green-600 or gray-400
                        }}
                      >
                        {step.completed ? (
                          <CheckCircle style={{ width: '1rem', height: '1rem' }} />
                        ) : (
                          <step.icon style={{ width: '1rem', height: '1rem' }} />
                        )}
                      </div>
                      <p
                        style={{
                          fontSize: '0.875rem',
                          fontWeight: '500',
                          color: step.completed ? '#065f46' : '#4b5563'
                        }}
                      >
                        {step.name}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* In Progress Tab Content */}
        {activeTab === 'in-progress' && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', padding: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c' }}>Onboarding In Progress</h3>
                <p style={{ color: '#4a5568' }}>Employees currently in the onboarding process</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>School/Dept</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Designation</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Employee ID</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Status</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOnboardings.filter(emp => emp.status === 'In Progress' || emp.status === 'Pending').map((employee) => (
                      <tr key={employee.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem', fontWeight: '500', whiteSpace: 'nowrap' }}>{employee.name}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: '500' }}>{employee.school}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{employee.department}</div>
                        </td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.designation}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.employeeId}</td>
                        <td style={{ padding: '0.75rem' }}>
                          {getStatusBadge(employee.status)}
                        </td>
                        <td style={{ padding: '0.75rem' }}>
                          <button
                            style={{
                              padding: '0.5rem 1rem',
                              border: '1px solid #d1d5db',
                              borderRadius: '0.375rem',
                              backgroundColor: 'white',
                              cursor: 'pointer',
                              fontSize: '0.875rem',
                              fontWeight: '500',
                              color: '#374151',
                              whiteSpace: 'nowrap'
                            }}
                          >
                            Continue
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Completed Tab Content */}
        {activeTab === 'completed' && (
          <div style={{ marginTop: '1.5rem' }}>
            <div style={{ backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)', padding: '1.5rem' }}>
              <div style={{ borderBottom: '1px solid #e5e7eb', paddingBottom: '1rem', marginBottom: '1.5rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#1a202c' }}>Completed Onboardings</h3>
                <p style={{ color: '#4a5568' }}>Successfully onboarded employees</p>
              </div>
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                  <thead>
                    <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Name</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>School/Dept</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Designation</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Employee ID</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Email</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Joining Date</th>
                      <th style={{ padding: '0.75rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', color: '#6b7280', whiteSpace: 'nowrap' }}>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {recentOnboardings.filter(emp => emp.status === 'Completed').map((employee) => (
                      <tr key={employee.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                        <td style={{ padding: '0.75rem', fontWeight: '500', whiteSpace: 'nowrap' }}>{employee.name}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>
                          <div style={{ fontWeight: '500' }}>{employee.school}</div>
                          <div style={{ fontSize: '0.875rem', color: '#6b7280' }}>{employee.department}</div>
                        </td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.designation}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.employeeId}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.email}</td>
                        <td style={{ padding: '0.75rem', whiteSpace: 'nowrap' }}>{employee.joiningDate}</td>
                        <td style={{ padding: '0.75rem' }}>
                          {getStatusBadge(employee.status)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
       )}
      </div>
  );
};

export default EmployeeOnboarding;