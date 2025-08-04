import React, { useState } from 'react';
import { MessageSquare, AlertTriangle, CheckCircle, Clock, ChevronDown } from 'lucide-react'; // Added ChevronDown for Select

// --- Internal UI Components ---

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
const Button = ({ children, className, variant = 'default', size = 'default', onClick }) => {
  let baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  let variantClasses = '';
  let sizeClasses = '';

  switch (variant) {
    case 'default':
      variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
      break;
    case 'destructive':
      variantClasses = 'bg-destructive text-destructive-foreground hover:bg-destructive/90';
      break;
    case 'outline':
      variantClasses = 'border border-input bg-background hover:bg-accent hover:text-accent-foreground';
      break;
    case 'secondary':
      variantClasses = 'bg-secondary text-secondary-foreground hover:bg-secondary/80';
      break;
    case 'ghost':
      variantClasses = 'hover:bg-accent hover:text-accent-foreground';
      break;
    case 'link':
      variantClasses = 'text-primary underline-offset-4 hover:underline';
      break;
    default:
      variantClasses = 'bg-primary text-primary-foreground hover:bg-primary/90';
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
    <button className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`} onClick={onClick}>
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
      variantClasses = 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
      break;
    case 'secondary':
      variantClasses = 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80';
      break;
    case 'destructive':
      variantClasses = 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80';
      break;
    case 'outline':
      variantClasses = 'text-foreground';
      break;
    default:
      variantClasses = 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80';
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
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    placeholder={placeholder}
    value={value}
    onChange={onChange}
  />
);

// Select Component (Simplified)
// This is a very basic implementation of Select. A full-fledged Select involves more complex state and accessibility.
// For the purpose of integrating directly, we'll simulate its behavior with a simple dropdown.
const Select = ({ children, value, onValueChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedValue, setSelectedValue] = useState(value || '');

  const handleValueChange = (newValue) => {
    setSelectedValue(newValue);
    onValueChange && onValueChange(newValue);
    setIsOpen(false);
  };

  const currentSelectionLabel = React.Children.map(children, child => {
    if (child.props.value === selectedValue) {
      return child.props.children;
    }
    return null;
  }).filter(Boolean)[0] || "Select an option"; // Default text if nothing selected

  return (
    <div className="relative">
      <SelectTrigger onClick={() => setIsOpen(!isOpen)} selectedValue={currentSelectionLabel}>
        <SelectValue placeholder="Select" />
      </SelectTrigger>
      {isOpen && (
        <SelectContent>
          {React.Children.map(children, child => (
            React.cloneElement(child, {
              onSelect: () => handleValueChange(child.props.value),
              key: child.props.value // Ensure key is present
            })
          ))}
        </SelectContent>
      )}
    </div>
  );
};

const SelectTrigger = ({ children, className, onClick, selectedValue }) => (
  <button
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 [&>span]:line-clamp-1 ${className}`}
    onClick={onClick}
  >
    <span>{selectedValue}</span>
    <ChevronDown className="h-4 w-4 opacity-50" />
  </button>
);

const SelectValue = ({ placeholder }) => <>{placeholder}</>; // This will be replaced by selectedValue in SelectTrigger

const SelectContent = ({ children }) => (
  <div className="absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md animate-in fade-in-80 mt-1">
    <div className="p-1">
      {children}
    </div>
  </div>
);

const SelectItem = ({ children, value, onSelect }) => (
  <div
    className="relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 hover:bg-accent hover:text-accent-foreground"
    onClick={onSelect}
    data-value={value}
  >
    {children}
  </div>
);

// --- GrievanceTracker Component ---

const GrievanceTracker = () => {
  // Initial static data for grievances.
  const initialGrievances = [
    {
      id: 1,
      title: 'Library Access Issue',
      category: 'Academic',
      priority: 'High',
      status: 'Open',
      submittedBy: 'John Doe',
      date: '2024-01-10',
      school: 'Engineering'
    },
    {
      id: 2,
      title: 'Hostel Maintenance',
      category: 'Infrastructure',
      priority: 'Medium',
      status: 'In Progress',
      submittedBy: 'Jane Smith',
      date: '2024-01-08',
      school: 'Management'
    },
    {
      id: 3,
      title: 'Exam Schedule Conflict',
      category: 'Academic',
      priority: 'Low',
      status: 'Resolved',
      submittedBy: 'Mike Johnson',
      date: '2024-01-05',
      school: 'Science'
    },
    {
      id: 4,
      title: 'Lab Equipment Malfunction',
      category: 'Infrastructure',
      priority: 'High',
      status: 'Open',
      submittedBy: 'Sarah Connor',
      date: '2024-01-15',
      school: 'Engineering'
    },
    {
      id: 5,
      title: 'Faculty Feedback System Bug',
      category: 'IT Support',
      priority: 'Medium',
      status: 'In Progress',
      submittedBy: 'Alice Brown',
      date: '2024-01-11',
      school: 'Humanities'
    },
    {
      id: 6,
      title: 'Cafeteria Food Quality',
      category: 'Student Welfare',
      priority: 'Low',
      status: 'Open',
      submittedBy: 'Robert Green',
      date: '2024-01-07',
      school: 'Management'
    },
  ];

  // State for managing grievances (allowing updates like resolving)
  const [grievances, setGrievances] = useState(initialGrievances);

  // State for search and filter inputs
  const [searchTerm, setSearchTerm] = useState('');
  const [filterPriority, setFilterPriority] = useState('all'); // 'all', 'high', 'medium', 'low'
  const [filterStatus, setFilterStatus] = useState('all');   // 'all', 'open', 'in progress', 'resolved'

  // Filtered grievances based on search and filters
  const filteredGrievances = grievances.filter(grievance => {
    const matchesSearch = grievance.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                          grievance.submittedBy.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesPriority = filterPriority === 'all' || grievance.priority.toLowerCase() === filterPriority;

    // Handle "In Progress" with a space vs "inprogress" without
    const grievanceStatusNormalized = grievance.status.toLowerCase().replace(/\s/g, '');
    const filterStatusNormalized = filterStatus.toLowerCase().replace(/\s/g, '');
    const matchesStatus = filterStatus === 'all' || grievanceStatusNormalized === filterStatusNormalized;

    return matchesSearch && matchesPriority && matchesStatus;
  });

  // Calculate dynamic counts for summary cards
  const totalGrievances = grievances.length;
  const highPriorityCount = grievances.filter(g => g.priority === 'High').length;
  const inProgressCount = grievances.filter(g => g.status === 'In Progress').length;
  const resolvedCount = grievances.filter(g => g.status === 'Resolved').length;

  // Function to handle resolving a grievance
  const handleResolveGrievance = (id) => {
    setGrievances(prevGrievances =>
      prevGrievances.map(grievance =>
        grievance.id === id ? { ...grievance, status: 'Resolved' } : grievance
      )
    );
    // In a real application, you'd send an API request here to update the backend
    alert(`Grievance ID: ${id} marked as Resolved! (This is a client-side update only)`);
  };

  // Function to handle "New Grievance" button click
  const handleNewGrievance = () => {
    alert("Opening form to submit a new grievance! (Functionality not implemented)");
    // In a real app, this would open a modal or navigate to a new form
  };

  // Function to handle "View" button click
  const handleViewGrievance = (id) => {
    const grievanceToView = grievances.find(g => g.id === id);
    alert(`Viewing Grievance:\nTitle: ${grievanceToView.title}\nSubmitted By: ${grievanceToView.submittedBy}\nStatus: ${grievanceToView.status}`);
    // In a real app, this would open a detailed modal or navigate to a dedicated detail page.
  };

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 font-sans"> {/* Added font-sans for better default font */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Grievance Tracker</h1>
        <Button className="w-full sm:w-auto" onClick={handleNewGrievance}>New Grievance</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Grievances</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{totalGrievances}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{highPriorityCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{inProgressCount}</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">{resolvedCount}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Grievance Management</CardTitle>
          <CardDescription className="text-sm sm:text-base">Track and resolve student and faculty grievances</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-4">
              <Input
                placeholder="Search grievances by title or submitter..."
                className="w-full sm:max-w-sm shadow-sm focus:shadow-md transition-shadow duration-200"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Select value={filterPriority} onValueChange={setFilterPriority}>
                <SelectTrigger className="w-full sm:w-[180px] shadow-sm focus:shadow-md transition-shadow duration-200">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Priorities</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-full sm:w-[180px] shadow-sm focus:shadow-md transition-shadow duration-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="in progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              {filteredGrievances.length > 0 ? (
                filteredGrievances.map((grievance) => (
                  <div key={grievance.id} className="flex flex-col xl:flex-row xl:items-center xl:justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                    <div className="flex flex-col lg:flex-row lg:items-center space-y-3 lg:space-y-0 lg:space-x-4 mb-4 xl:mb-0">
                      <div className="min-w-0 flex-1">
                        <p className="font-medium text-gray-900 truncate">{grievance.title}</p>
                        <p className="text-sm text-gray-500 truncate">By {grievance.submittedBy} - {grievance.date}</p>
                      </div>
                      <div className="flex flex-wrap items-center gap-2">
                        <Badge variant="outline" className="shadow-sm">
                          {grievance.category}
                        </Badge>
                        <Badge
                          variant={
                            grievance.priority === 'High' ? 'destructive' :
                            grievance.priority === 'Medium' ? 'default' : 'secondary'
                          }
                          className="shadow-sm"
                        >
                          {grievance.priority}
                        </Badge>
                        <Badge
                          variant={
                            grievance.status === 'Open' ? 'destructive' :
                            grievance.status === 'In Progress' ? 'default' : 'secondary'
                          }
                          className="shadow-sm"
                        >
                          {grievance.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between xl:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                      <span className="text-sm text-gray-600 font-medium sm:order-1 xl:order-none">
                        {grievance.school}
                      </span>
                      <div className="flex items-center space-x-2 sm:order-2 xl:order-none">
                        <Button
                          size="sm"
                          variant="outline"
                          className="shadow-sm hover:shadow-md transition-shadow duration-200"
                          onClick={() => handleViewGrievance(grievance.id)}
                        >
                          View
                        </Button>
                        {grievance.status !== 'Resolved' && ( // Only show resolve if not already resolved
                          <Button
                            size="sm"
                            className="shadow-sm hover:shadow-md transition-shadow duration-200"
                            onClick={() => handleResolveGrievance(grievance.id)}
                          >
                            Resolve
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-center text-gray-600 py-8">No grievances match your filters.</p>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GrievanceTracker;