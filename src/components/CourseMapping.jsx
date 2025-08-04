import React, { useState, useEffect } from 'react';
import { BookOpen, User, Clock, CheckCircle, Plus, Edit, Filter } from 'lucide-react';

// --- Integrated Card Components ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
));
Card.displayName = "Card";

const CardHeader = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
));
CardHeader.displayName = "CardHeader";

const CardTitle = React.forwardRef(({ className, ...props }, ref) => (
  <h3
    ref={ref}
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
));
CardTitle.displayName = "CardTitle";

const CardDescription = React.forwardRef(({ className, ...props }, ref) => (
  <p
    ref={ref}
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
));
CardDescription.displayName = "CardDescription";

const CardContent = React.forwardRef(({ className, ...props }, ref) => (
  <div ref={ref} className={`p-6 pt-0 ${className}`} {...props} />
));
CardContent.displayName = "CardContent";

// --- Integrated Button Component ---
const Button = React.forwardRef(({ className, variant = "default", size = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? "span" : "button";
  let baseClasses = "inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50";
  let variantClasses = "";
  let sizeClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
      break;
    case "destructive":
      variantClasses = "bg-destructive text-destructive-foreground hover:bg-destructive/90";
      break;
    case "outline":
      variantClasses = "border border-input bg-background hover:bg-accent hover:text-accent-foreground";
      break;
    case "secondary":
      variantClasses = "bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case "ghost":
      variantClasses = "hover:bg-accent hover:text-accent-foreground";
      break;
    case "link":
      variantClasses = "text-primary underline-offset-4 hover:underline";
      break;
    default:
      variantClasses = "bg-primary text-primary-foreground hover:bg-primary/90";
  }

  switch (size) {
    case "default":
      sizeClasses = "h-10 px-4 py-2";
      break;
    case "sm":
      sizeClasses = "h-9 rounded-md px-3";
      break;
    case "lg":
      sizeClasses = "h-11 rounded-md px-8";
      break;
    case "icon":
      sizeClasses = "h-10 w-10";
      break;
    default:
      sizeClasses = "h-10 px-4 py-2";
  }

  return (
    <Comp
      className={`${baseClasses} ${variantClasses} ${sizeClasses} ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Button.displayName = "Button";

// --- Integrated Input Component ---
const Input = React.forwardRef(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// --- Integrated Select Components (Simplified for direct integration) ---
// Note: A full re-implementation of Shadcn UI's Select is complex due to Radix UI primitives.
// This is a highly simplified version that provides basic dropdown functionality for demonstration.
// For full accessibility and features, using the original Shadcn components is highly recommended.

// A very basic Select Context to pass value and change handler
const SelectContext = React.createContext();

const Select = ({ children, defaultValue, value, onValueChange }) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false); // State to control dropdown visibility

  const handleValueChange = (newValue) => {
    setInternalValue(newValue);
    onValueChange && onValueChange(newValue);
    setIsOpen(false); // Close dropdown on selection
  };

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, isOpen, setIsOpen }}>
      {children}
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, placeholder, ...props }, ref) => {
  const { value, isOpen, setIsOpen } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => setIsOpen(!isOpen)}
      {...props}
    >
      <span className="truncate">
        {value ? (
          React.Children.map(children, child =>
            React.isValidElement(child) && child.type === SelectValue ? React.cloneElement(child, { children: value }) : null
          ) || value
        ) : placeholder}
      </span>
      {/* Basic chevron icon for dropdown */}
      <svg
        className={`h-4 w-4 opacity-50 transition-transform ${isOpen ? 'rotate-180' : ''}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m6 9 6 6 6-6" />
      </svg>
    </button>
  );
});
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ children, ...props }) => {
  return <span {...props}>{children}</span>;
};
SelectValue.displayName = "SelectValue";


const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { onValueChange, isOpen, setIsOpen } = React.useContext(SelectContext);

  // Close dropdown if clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target) && event.target.tagName !== 'BUTTON') { // Prevent closing if clicking on the trigger
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, setIsOpen, ref]);


  if (!isOpen) return null; // Don't render content if not open

  return (
    <div
      ref={ref}
      className={`absolute z-50 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}
      style={{ top: '100%', left: 0, marginTop: '0.5rem' }} // Position directly below the trigger
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
              },
            });
          }
          return child;
        })}
      </div>
    </div>
  );
});
SelectContent.displayName = "SelectContent";


const SelectItem = React.forwardRef(({ className, children, value, ...props }, ref) => {
  const { value: selectedValue } = React.useContext(SelectContext);
  const isSelected = selectedValue === value;

  return (
    <div
      ref={ref}
      role="option"
      aria-selected={isSelected}
      data-state={isSelected ? "selected" : "inactive"}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className} ${isSelected ? 'bg-accent text-accent-foreground' : ''}`}
      data-value={value}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {isSelected && (
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        )}
      </span>
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

// --- Integrated Badge Component ---
const Badge = React.forwardRef(({ className, variant = "default", ...props }, ref) => {
  let baseClasses = "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2";
  let variantClasses = "";

  switch (variant) {
    case "default":
      variantClasses = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
      break;
    case "secondary":
      variantClasses = "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80";
      break;
    case "destructive":
      variantClasses = "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80";
      break;
    case "outline":
      variantClasses = "text-foreground";
      break;
    default:
      variantClasses = "border-transparent bg-primary text-primary-foreground hover:bg-primary/80";
  }

  return (
    <div
      ref={ref}
      className={`${baseClasses} ${variantClasses} ${className}`}
      {...props}
    />
  );
});
Badge.displayName = "Badge";


// --- Main CourseMapping Component ---
const CourseMapping = () => {
  const [activeTab, setActiveTab] = useState('mapping'); // This state is not currently used in the provided JSX for tab switching, but kept for consistency.

  const courseMappings = [
    {
      id: 1,
      course: 'Data Structures',
      code: 'CS301',
      faculty: 'Dr. Smith',
      credits: 4,
      status: 'approved',
      semester: 'III'
    },
    {
      id: 2,
      course: 'Database Management',
      code: 'CS302',
      faculty: 'Prof. Johnson',
      credits: 3,
      status: 'pending',
      semester: 'III'
    },
    {
      id: 3,
      course: 'Machine Learning',
      code: 'CS401',
      faculty: 'Dr. Williams',
      credits: 4,
      status: 'approved',
      semester: 'IV'
    },
    {
      id: 4,
      course: 'Software Engineering',
      code: 'CS303',
      faculty: 'Prof. Brown',
      credits: 3,
      status: 'pending',
      semester: 'III'
    }
  ];

  const StatCard = ({ icon: Icon, title, value, color }) => (
    <Card className="transition-all duration-200 hover:shadow-md">
      <CardContent className="flex items-center p-4 sm:p-6">
        <Icon className={`h-6 w-6 sm:h-8 sm:w-8 ${color}`} />
        <div className="ml-3 sm:ml-4 min-w-0 flex-1">
          <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{title}</p>
          <p className="text-lg sm:text-2xl font-bold text-gray-900">{value}</p>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Course Mapping</h1>
        <Button className="w-full sm:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          <span className="hidden sm:inline">Add New Mapping</span>
          <span className="sm:hidden">Add Mapping</span>
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <StatCard
          icon={BookOpen}
          title="Total Courses"
          value="156"
          color="text-blue-600"
        />
        <StatCard
          icon={User}
          title="Mapped Faculty"
          value="89"
          color="text-green-600"
        />
        <StatCard
          icon={Clock}
          title="Pending"
          value="12"
          color="text-yellow-600"
        />
        <StatCard
          icon={CheckCircle}
          title="Approved"
          value="144"
          color="text-purple-600"
        />
      </div>

      {/* Main Content */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Course Mappings</CardTitle>
          <CardDescription className="text-sm">
            Manage course-faculty mappings and approvals
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter Row */}
            <div className="relative flex flex-col sm:flex-row gap-3 sm:gap-4"> {/* Added relative to parent for SelectContent positioning */}
              <Input
                placeholder="Search courses..."
                className="flex-1 sm:max-w-sm"
              />
              <div className="flex gap-2 sm:gap-3">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px]">
                    <SelectValue placeholder="Select School" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse" className="bg-white hover:bg-gray-100">
                      Computer Science
                    </SelectItem>
                    <SelectItem value="ece" className="bg-white hover:bg-gray-100">
                      Electronics
                    </SelectItem>
                    <SelectItem value="mech" className="bg-white hover:bg-gray-100">
                      Mechanical
                    </SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" size="sm" className="sm:hidden">
                  <Filter className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Course Mappings List */}
            <div className="space-y-3">
              {courseMappings.map((mapping) => (
                <div key={mapping.id} className="shadow-sm rounded-lg p-4 transition-all duration-200 hover:shadow-md">
                  {/* Desktop Layout */}
                  <div className="hidden md:flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div>
                        <p className="font-medium text-gray-900">{mapping.course}</p>
                        <p className="text-sm text-gray-500">
                          {mapping.code} - Semester {mapping.semester}
                        </p>
                      </div>
                      <Badge variant="outline" className="whitespace-nowrap">
                        {mapping.credits} Credits
                      </Badge>
                      <Badge
                        variant={mapping.status === 'approved' ? 'default' : 'secondary'}
                        className="capitalize"
                      >
                        {mapping.status}
                      </Badge>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm text-gray-600">{mapping.faculty}</span>
                      <Button size="sm" variant="outline">
                        <Edit className="h-4 w-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </div>

                  {/* Mobile Layout */}
                  <div className="md:hidden space-y-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-gray-900 truncate">{mapping.course}</p>
                        <p className="text-sm text-gray-500">
                          {mapping.code} - Semester {mapping.semester}
                        </p>
                      </div>
                      <Button size="sm" variant="outline" className="ml-2">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline" className="text-xs">
                          {mapping.credits} Credits
                        </Badge>
                        <Badge
                          variant={mapping.status === 'approved' ? 'default' : 'secondary'}
                          className="capitalize text-xs"
                        >
                          {mapping.status}
                        </Badge>
                      </div>
                      <span className="text-sm text-gray-600 truncate max-w-[120px]">
                        {mapping.faculty}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More Button for Mobile */}
            <div className="flex justify-center pt-4 md:hidden">
              <Button variant="outline" className="w-full sm:w-auto">
                Load More Courses
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default CourseMapping;