import React, { useState } from 'react'; // Import useState to manage state
import { BarChart3, FileText, TrendingUp, Award } from 'lucide-react';

// --- Internal UI Components (Replicated Basic Functionality & Styling) ---

// Card Component
const Card = ({ children, className }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>
    {children}
  </div>
);

const CardHeader = ({ children, className }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>
    {children}
  </div>
);

const CardTitle = ({ children, className }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>
    {children}
  </h3>
);

const CardDescription = ({ children, className }) => (
  <p className={`text-sm text-muted-foreground ${className}`}>
    {children}
  </p>
);

const CardContent = ({ children, className }) => (
  <div className={`p-6 pt-0 ${className}`}>
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
      variantClasses = 'bg-blue-600 text-white hover:bg-blue-700'; // Adjusted for a common default blue
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

// Badge Component
const Badge = ({ children, className, variant = 'default' }) => {
  let baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  let variantClasses = '';

  switch (variant) {
    case 'default':
      variantClasses = 'border-transparent bg-blue-500 text-white hover:bg-blue-600'; // Example default
      break;
    case 'secondary':
      variantClasses = 'border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
    case 'destructive':
      variantClasses = 'border-transparent bg-red-500 text-white hover:bg-red-600';
      break;
    case 'outline':
      variantClasses = 'text-gray-800 border-gray-300'; // Less specific for outline
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

// --- IQACModule Component ---

const IQACModule = () => {
  // Use useState to manage the reports data for dynamic updates
  const [reports, setReports] = useState([
    {
      id: 1,
      title: 'NAAC Self Study Report 2024',
      type: 'NAAC',
      status: 'In Progress',
      deadline: '2024-03-15',
      completeness: 65
    },
    {
      id: 2,
      title: 'NIRF Data Collection 2024',
      type: 'NIRF',
      status: 'Completed',
      deadline: '2024-02-28',
      completeness: 100
    },
    {
      id: 3,
      title: 'Annual Quality Assurance Report 2023',
      type: 'AQAR',
      status: 'Pending',
      deadline: '2024-04-30',
      completeness: 0
    },
    {
      id: 4,
      title: 'Academic Audit Report 2023-24',
      type: 'Audit',
      status: 'In Progress',
      deadline: '2024-05-10',
      completeness: 30
    }
  ]);

  // State for search term
  const [searchTerm, setSearchTerm] = useState('');

  // Filter reports based on search term
  const filteredReports = reports.filter(report =>
    report.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.type.toLowerCase().includes(searchTerm.toLowerCase()) ||
    report.status.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate dynamic counts for summary cards
  const totalReports = reports.length;
  const reportsDueCount = reports.filter(report => report.status !== 'Completed').length;
  const naacGrade = 'A+'; // Placeholder: In a real app, this would be dynamic
  const nirfRanking = 156; // Placeholder: In a real app, this would be dynamic
  const accreditationsCount = 5; // Placeholder: In a real app, this would be dynamic

  // Handler for 'Generate Report' button
  const handleGenerateReport = () => {
    alert('Generating a new report... (Functionality not implemented)');
    // In a real application, this would likely open a modal or navigate to a report generation form.
  };

  // Handler for 'Edit' button
  const handleEditReport = (id) => {
    alert(`Editing report with ID: ${id} (Functionality not implemented)`);
    // This would typically lead to a form pre-filled with the report's data for editing.
  };

  // Handler for 'Submit' button
  const handleSubmitReport = (id) => {
    // Optimistically update the status to 'Completed' on the client side
    setReports(prevReports =>
      prevReports.map(report =>
        report.id === id ? { ...report, status: 'Completed', completeness: 100 } : report
      )
    );
    alert(`Report with ID: ${id} submitted! (Status updated locally)`);
    // In a real application, an API call would be made here to update the report status on the server.
  };

  return (
    <div className="space-y-6 p-4 sm:p-6 font-sans">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">IQAC/NAAC/NIRF</h1>
        <Button className="w-full sm:w-auto" onClick={handleGenerateReport}>Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">NAAC Grade</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{naacGrade}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">NIRF Ranking</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{nirfRanking}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Reports Due</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{reportsDueCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Accreditations</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{accreditationsCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quality Assurance Reports</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage NAAC, NIRF, and other quality assessment reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search reports..."
              className="max-w-full sm:max-w-sm shadow-sm focus:shadow-md transition-shadow duration-200"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="space-y-3">
              {filteredReports.length > 0 ? (
                filteredReports.map((report) => (
                  <div key={report.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{report.title}</p>
                        <p className="text-sm text-gray-500 truncate">Deadline: {report.deadline}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="text-xs">{report.type}</Badge>
                        <Badge
                          variant={
                            report.status === 'Completed' ? 'default' :
                            report.status === 'In Progress' ? 'secondary' : 'destructive'
                          }
                          className="text-xs"
                        >
                          {report.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                      <div className="text-sm">
                        <p className="font-medium">{report.completeness}% Complete</p>
                        <div className="w-full sm:w-24 bg-gray-200 rounded-full h-2 mt-1">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${report.completeness}%` }}
                          ></div>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="text-xs flex-1 sm:flex-none"
                          onClick={() => handleEditReport(report.id)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="sm"
                          className="text-xs flex-1 sm:flex-none"
                          onClick={() => handleSubmitReport(report.id)}
                          disabled={report.status === 'Completed'} // Disable submit if completed
                        >
                          {report.status === 'Completed' ? 'Submitted' : 'Submit'}
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No reports match your search.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default IQACModule;