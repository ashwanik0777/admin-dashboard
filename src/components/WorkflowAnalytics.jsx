import React, { useState } from 'react';
import { TrendingUp, Clock, CheckCircle, AlertCircle, Calendar, BarChart3 } from 'lucide-react';

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


// Select Components (Simplified - using native select for demonstration)
const Select = ({ value, onValueChange, children }) => {
  const handleChange = (event) => {
    onValueChange(event.target.value);
  };
  return (
    <select value={value} onChange={handleChange} className="w-full sm:w-[130px] shadow-sm flex h-10 items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1">
      {children}
    </select>
  );
};

const SelectTrigger = ({ children, className }) => (
  // In a native select, the trigger is the select itself.
  // We place children inside the native select.
  <>
    {children}
  </>
);

const SelectValue = ({ placeholder, children }) => (
  // In a native select, the value is managed by the select element.
  // We can use a span for placeholder text if the value is empty.
  children || <option disabled value="">{placeholder}</option>
);

const SelectContent = ({ children }) => (
  // In a native select, options are direct children.
  <>
    {children}
  </>
);

const SelectItem = ({ value, children }) => (
  <option value={value}>{children}</option>
);

const WorkflowAnalytics = () => {
  const [timeframe, setTimeframe] = useState('30');

  // Mock data for analytics
  const analytics = [
    {
      module: 'Student Onboarding',
      totalRequests: 320,
      approved: 290,
      pending: 20,
      rejected: 10,
      avgTime: '3.2 days'
    },
    {
      module: 'Leave Management',
      totalRequests: 180,
      approved: 150,
      pending: 20,
      rejected: 10,
      avgTime: '1.5 days'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
  <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Workflow Analytics</h1>
  <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
    <Select value={timeframe} onValueChange={setTimeframe}>
      <SelectTrigger className="w-full sm:w-[130px] shadow-sm">
        <SelectValue placeholder="Select timeframe" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="7">Last 7 days</SelectItem>
        <SelectItem value="30">Last 30 days</SelectItem>
        <SelectItem value="90">Last 90 days</SelectItem>
      </SelectContent>
    </Select>
    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white">
      <BarChart3 className="h-4 w-4 mr-2" />
      Export Report
    </Button>
  </div>
</div>
      {/* Overview Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Workflows</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Completed</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">1,089</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Pending</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">124</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Overdue</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">34</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Module Performance Analysis */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Module Performance Analysis</CardTitle>
          <CardDescription className="text-sm sm:text-base">Detailed workflow analytics by module</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {analytics.map((item, index) => (
              <div key={index} className="p-4 sm:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                {/* Module Header */}
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 space-y-2 sm:space-y-0">
                  <h3 className="font-medium text-lg sm:text-xl text-gray-900">{item.module}</h3>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Avg: {item.avgTime}</span>
                  </div>
                </div>

                {/* Statistics Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-3 rounded-lg bg-blue-50 shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-blue-600 mb-1">{item.totalRequests}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Total</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-green-50 shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-green-600 mb-1">{item.approved}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Approved</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-yellow-50 shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-yellow-600 mb-1">{item.pending}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Pending</p>
                  </div>
                  <div className="text-center p-3 rounded-lg bg-red-50 shadow-sm">
                    <p className="text-xl sm:text-2xl font-bold text-red-600 mb-1">{item.rejected}</p>
                    <p className="text-xs sm:text-sm text-gray-600 font-medium">Rejected</p>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="space-y-2">
                  <div className="flex justify-between text-xs sm:text-sm text-gray-600">
                    <span>Progress Distribution</span>
                    <span>{Math.round((item.approved / item.totalRequests) * 100)}% Complete</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-3 shadow-inner">
                    <div className="flex h-3 rounded-full overflow-hidden">
                      <div
                        className="bg-green-500 transition-all duration-300"
                        style={{ width: `${(item.approved / item.totalRequests) * 100}%` }}
                      ></div>
                      <div
                        className="bg-yellow-500 transition-all duration-300"
                        style={{ width: `${(item.pending / item.totalRequests) * 100}%` }}
                      ></div>
                      <div
                        className="bg-red-500 transition-all duration-300"
                        style={{ width: `${(item.rejected / item.totalRequests) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Legend */}
                  <div className="flex flex-wrap gap-4 text-xs sm:text-sm">
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                      <span className="text-gray-600">Approved</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                      <span className="text-gray-600">Pending</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                      <span className="text-gray-600">Rejected</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WorkflowAnalytics;