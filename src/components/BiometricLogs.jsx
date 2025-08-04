import React, { useState, useEffect } from 'react';
import { Clock, Users, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';

// --- Integrated Card Components ---
const Card = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`rounded-lg border  bg-card text-card-foreground shadow-sm ${className}`}
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
const SelectContext = React.createContext();

const Select = ({ children, defaultValue, value, onValueChange }) => {
  const [internalValue, setInternalValue] = useState(value || defaultValue);
  const [isOpen, setIsOpen] = useState(false); // State to manage dropdown open/close

  const handleValueChange = (newValue) => {
    setInternalValue(newValue);
    onValueChange && onValueChange(newValue);
    setIsOpen(false); // Close dropdown after selection
  };

  return (
    <SelectContext.Provider value={{ value: internalValue, onValueChange: handleValueChange, isOpen, setIsOpen }}>
      <div className="relative"> {/* Added a relative container for positioning */}
        {children}
      </div>
    </SelectContext.Provider>
  );
};

const SelectTrigger = React.forwardRef(({ className, children, placeholder, ...props }, ref) => {
  const { value, setIsOpen, isOpen } = React.useContext(SelectContext);

  return (
    <button
      ref={ref}
      className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
      onClick={() => setIsOpen(prev => !prev)}
      {...props}
    >
      <span className="truncate">
        {value ? (children || value) : placeholder}
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
  const { value } = React.useContext(SelectContext);
  return <span {...props}>{children || value}</span>;
};
SelectValue.displayName = "SelectValue";


const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => {
  const { onValueChange, isOpen, setIsOpen } = React.useContext(SelectContext);
  
  // Only render content if isOpen is true
  if (!isOpen) return null;

  return (
    <div
      ref={ref}
      // Positioning to appear below the trigger
      className={`absolute z-50 top-full left-0 mt-1 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md ${className}`}
      {...props}
    >
      <div className="p-1">
        {React.Children.map(children, child => {
          if (React.isValidElement(child) && child.type === SelectItem) {
            return React.cloneElement(child, {
              onClick: () => {
                onValueChange(child.props.value);
                setIsOpen(false); // Close after selection
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
      data-state={isSelected ? "active" : "inactive"}
      className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
      data-value={value}
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          {/* Checkmark icon */}
          <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
        </span>
      )}
      {children}
    </div>
  );
});
SelectItem.displayName = "SelectItem";

// --- Original BiometricLogs Component ---
const BiometricLogs = () => {
  const logs = [
    {
      id: 1,
      employee: 'Dr. John Smith',
      empId: 'EMP001',
      checkIn: '09:15 AM',
      checkOut: '06:30 PM',
      hours: '9h 15m',
      status: 'Present',
      date: '2024-01-15'
    },
    {
      id: 2,
      employee: 'Prof. Jane Doe',
      empId: 'EMP002',
      checkIn: '10:30 AM',
      checkOut: '04:00 PM',
      hours: '5h 30m',
      status: 'Short Hours',
      date: '2024-01-15'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Biometric Logs</h1>
        <Button className="w-full sm:w-auto">Export Report</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Present Today</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">156</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Absent</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Late Arrivals</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Full Hours</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">142</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Attendance Logs Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Attendance Logs</CardTitle>
          <CardDescription className="text-sm sm:text-base">Monitor employee attendance and working hours</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search and Filter Controls */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by employee name or ID..." className="pl-10 shadow-sm" />
              </div>
              <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px] shadow-sm">
                    <SelectValue placeholder="Department" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cse">Computer Science</SelectItem>
                    <SelectItem value="ece">Electronics</SelectItem>
                    <SelectItem value="mech">Mechanical</SelectItem>
                  </SelectContent>
                </Select>
                <Select>
                  <SelectTrigger className="w-full sm:w-[180px] shadow-sm">
                    <SelectValue placeholder="Status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="present">Present</SelectItem>
                    <SelectItem value="absent">Absent</SelectItem>
                    <SelectItem value="late">Late</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Logs List */}
            <div className="space-y-3">
              {logs.map((log) => (
                <div key={log.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                  {/* Employee Info */}
                  <div className="flex flex-col sm:flex-row sm:items-start space-y-3 sm:space-y-0 sm:space-x-6 mb-3 lg:mb-0">
                    <div className="min-w-0">
                      <p className="font-medium text-gray-900 truncate">{log.employee}</p>
                      <p className="text-sm text-gray-500 truncate">{log.empId} - {log.date}</p>
                    </div>

                    {/* Check-in/Check-out Times */}
                    <div className="flex flex-col sm:flex-row sm:space-x-6 text-sm">
                      <div className="flex justify-between sm:block mb-2 sm:mb-0">
                        <span className="text-gray-600 sm:hidden">Check-in:</span>
                        <span className="font-medium sm:block">
                          <span className="hidden sm:inline text-gray-600">In: </span>
                          {log.checkIn}
                        </span>
                      </div>
                      <div className="flex justify-between sm:block">
                        <span className="text-gray-600 sm:hidden">Check-out:</span>
                        <span className="font-medium sm:block">
                          <span className="hidden sm:inline text-gray-600">Out: </span>
                          {log.checkOut}
                        </span>
                      </div>
                    </div>

                    {/* Hours Badge */}
                    <div className="flex justify-start sm:justify-center">
                      <Badge variant="outline" className="text-xs self-start">{log.hours}</Badge>
                    </div>
                  </div>

                  {/* Status and Actions */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-3">
                    <Badge
                      variant={
                        log.status === 'Present' ? 'default' :
                        log.status === 'Short Hours' ? 'secondary' : 'destructive'
                      }
                      className="text-xs self-start sm:self-center"
                    >
                      {log.status}
                    </Badge>
                    <Button size="sm" variant="outline" className="w-full sm:w-auto shadow-sm">
                      Details
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default BiometricLogs;