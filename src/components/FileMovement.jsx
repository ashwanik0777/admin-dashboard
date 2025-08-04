import React, { useState } from 'react';
import { 
  FolderOpen, 
  Send, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  Eye,
  FileText,
  Users,
  TrendingUp,
  Calendar,
  Download,
  MapPin,
  Shield,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
  Menu,
  X
} from 'lucide-react';

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

// --- Integrated Tabs Components ---
const Tabs = ({ className, ...props }) => (
  <div className={`flex flex-col ${className}`} {...props} />
);
Tabs.displayName = "Tabs";

const TabsList = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
    {...props}
  />
));
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef(({ className, ...props }, ref) => (
  <button
    ref={ref}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    {...props}
  />
));
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
    {...props}
  />
));
TabsContent.displayName = "TabsContent";

// --- Integrated Select Components ---
const Select = ({ ...props }) => <div {...props} />;

const SelectTrigger = React.forwardRef(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={`flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1 ${className}`}
    {...props}
  >
    {children}
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-4 w-4 opacity-50"
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  </button>
));
SelectTrigger.displayName = "SelectTrigger";

const SelectValue = ({ className, ...props }) => (
  <span className={className} {...props} />
);
SelectValue.displayName = "SelectValue";

const SelectContent = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative z-50 max-h-96 min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 ${className}`}
    {...props}
  >
    <div className="p-1">{children}</div>
  </div>
));
SelectContent.displayName = "SelectContent";

const SelectItem = React.forwardRef(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={`relative flex w-full cursor-default select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 ${className}`}
    {...props}
  >
    <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
      {/* Check icon or similar for selected item */}
    </span>
    {children}
  </div>
));
SelectItem.displayName = "SelectItem";


const FileMovement = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [statusFilter, setStatusFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const summaryStats = [
    {
      title: "Files Initiated Today",
      value: "24",
      change: "+15%",
      icon: FolderOpen,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Files Approved",
      value: "156",
      change: "+8%",
      icon: CheckCircle,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Escalated Files",
      value: "8",
      change: "+3",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50"
    },
    {
      title: "Pending > 3 Days",
      value: "12",
      change: "-2",
      icon: Clock,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const files = [
    {
      id: 1,
      fileNumber: 'REG/2024/001',
      subject: 'Student Admission Query - Merit List Revision',
      initiatedBy: 'Dr. Sharma (CSE)',
      currentHandler: 'Registrar Office',
      status: 'pending',
      priority: 'High',
      daysInQueue: 5,
      createdDate: '2024-01-10',
      lastAction: '2024-01-12',
      attachments: 2,
      confidential: false,
      escalated: true,
    },
    {
      id: 2,
      fileNumber: 'ACAD/2024/015',
      subject: 'Course Curriculum Update - AI/ML Specialization',
      initiatedBy: 'Prof. Johnson (IT)',
      currentHandler: 'Dean Academic',
      status: 'in-transit',
      priority: 'Medium',
      daysInQueue: 2,
      createdDate: '2024-01-08',
      lastAction: '2024-01-11',
      attachments: 1,
      confidential: false,
      escalated: false,
    },
    {
      id: 3,
      fileNumber: 'CONF/2024/003',
      subject: 'Confidential - Faculty Evaluation Report',
      initiatedBy: 'VC Office',
      currentHandler: 'Registrar',
      status: 'pending',
      priority: 'High',
      daysInQueue: 7,
      createdDate: '2024-01-05',
      lastAction: '2024-01-10',
      attachments: 3,
      confidential: true,
      escalated: false,
    }
  ];

  const departmentData = [
    { department: 'CSE', files: 40, approved: 30, pending: 10 },
    { department: 'IT', files: 35, approved: 28, pending: 7 },
    { department: 'ECE', files: 28, approved: 20, pending: 8 },
    { department: 'Civil', files: 22, approved: 18, pending: 4 },
    { department: 'Mech', files: 18, approved: 15, pending: 3 }
  ];

  const statusData = [
    { name: 'Approved', value: 120, color: '#10b981' },
    { name: 'Pending', value: 30, color: '#f59e0b' },
    { name: 'In Transit', value: 15, color: '#3b82f6' },
    { name: 'Escalated', value: 8, color: '#ef4444' }
  ];

  const trendData = [
    { week: 'Week 1', files: 20, completed: 15 },
    { week: 'Week 2', files: 25, completed: 20 },
    { week: 'Week 3', files: 30, completed: 25 },
    { week: 'Week 4', files: 35, completed: 30 }
  ];

  const auditTrail = [
    {
      fileNumber: 'REG/2024/001',
      action: 'Initiated',
      user: 'Dr. Sharma',
      timestamp: '2024-01-10 09:30',
      remarks: 'Urgent revision required for merit list'
    },
    {
      fileNumber: 'REG/2024/001',
      action: 'Forwarded',
      user: 'HOD CSE',
      timestamp: '2024-01-10 14:20',
      remarks: 'Approved by department, forwarding to Dean'
    },
    {
      fileNumber: 'REG/2024/001',
      action: 'Under Review',
      user: 'Dean Academic',
      timestamp: '2024-01-11 10:15',
      remarks: 'Reviewing documents and criteria'
    }
  ];

  const filteredFiles = files.filter(file => {
    const statusMatch = statusFilter === 'all' || file.status === statusFilter;
    const deptMatch = departmentFilter === 'all' || file.initiatedBy.includes(departmentFilter);
    return statusMatch && deptMatch;
  });

  const handleBulkAction = (action) => {
    console.log(`Performing bulk action: ${action}`);
  };

  const handleFileAction = (fileId, action) => {
    console.log(`File ${fileId}: ${action}`);
  };

  const tabItems = [
    { value: 'dashboard', label: 'Dashboard' },
    { value: 'inbox', label: 'Inbox' },
    { value: 'escalated', label: 'Escalated' },
    { value: 'confidential', label: 'Confidential' },
    { value: 'audit', label: 'Audit' },
    { value: 'analytics', label: 'Analytics' }
  ];

  // Custom Bar Chart Component
  const BarChart = ({ data, width = 600, height = 300 }) => {
    const maxValue = Math.max(...data.map(item => Math.max(item.files, item.approved)));
    const barWidth = Math.min(30, (width - 120) / (data.length * 2.5));
    const gap = barWidth * 0.5;
    const chartHeight = height - 50;
    const chartWidth = width - 80;
    
    return (
      <div className="w-full h-full flex justify-center items-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-full max-h-full">
          {/* X-axis */}
          <line x1="50" y1={chartHeight} x2={width - 20} y2={chartHeight} stroke="#ccc" strokeWidth="1" />
          
          {/* Y-axis */}
          <line x1="50" y1="20" x2="50" y2={chartHeight} stroke="#ccc" strokeWidth="1" />
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <text x="40" y={chartHeight - ratio * (chartHeight - 40) + 5} textAnchor="end" fontSize="12" fill="#666">
                {Math.round(maxValue * ratio)}
              </text>
              <line x1="45" y1={chartHeight - ratio * (chartHeight - 40)} x2="50" y2={chartHeight - ratio * (chartHeight - 40)} stroke="#ccc" strokeWidth="1" />
            </g>
          ))}
          
          {/* Bars */}
          {data.map((item, i) => {
            const x = 60 + i * (barWidth * 2 + gap);
            const filesHeight = (item.files / maxValue) * (chartHeight - 40);
            const approvedHeight = (item.approved / maxValue) * (chartHeight - 40);
            
            return (
              <g key={i}>
                <rect 
                  x={x} 
                  y={chartHeight - filesHeight} 
                  width={barWidth} 
                  height={filesHeight} 
                  fill="#3b82f6" 
                  rx="2"
                />
                <rect 
                  x={x + barWidth} 
                  y={chartHeight - approvedHeight} 
                  width={barWidth} 
                  height={approvedHeight} 
                  fill="#10b981" 
                  rx="2"
                />
                <text 
                  x={x + barWidth} 
                  y={chartHeight + 15} 
                  textAnchor="middle" 
                  fontSize="12" 
                  fill="#666"
                >
                  {item.department}
                </text>
              </g>
            );
          })}
          
          {/* Legend */}
          <g transform={`translate(${width - 150}, 10)`}>
            <rect x="0" y="0" width="12" height="12" fill="#3b82f6" rx="2" />
            <text x="20" y="10" fontSize="12" fill="#666">Total Files</text>
            <rect x="0" y="20" width="12" height="12" fill="#10b981" rx="2" />
            <text x="20" y="30" fontSize="12" fill="#666">Approved</text>
          </g>
        </svg>
      </div>
    );
  };

  // Custom Pie Chart Component with better responsive design
  const PieChart = ({ data, width = 300, height = 300 }) => {
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = Math.min(width, height) / 2 - 60; // More space for labels
    
    let cumulativeAngle = 0;
    const total = data.reduce((sum, item) => sum + item.value, 0);
    
    return (
      <div className="w-full h-full flex justify-center items-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-full max-h-full">
          {data.map((item, i) => {
            const angle = (item.value / total) * 360;
            const startAngle = cumulativeAngle;
            cumulativeAngle += angle;
            
            const x1 = centerX + radius * Math.cos((startAngle - 90) * Math.PI / 180);
            const y1 = centerY + radius * Math.sin((startAngle - 90) * Math.PI / 180);
            const x2 = centerX + radius * Math.cos((startAngle + angle - 90) * Math.PI / 180);
            const y2 = centerY + radius * Math.sin((startAngle + angle - 90) * Math.PI / 180);
            
            const largeArcFlag = angle > 180 ? 1 : 0;
            const midAngle = startAngle + angle / 2;
            const labelRadius = radius * 0.7;
            const labelX = centerX + labelRadius * Math.cos((midAngle - 90) * Math.PI / 180);
            const labelY = centerY + labelRadius * Math.sin((midAngle - 90) * Math.PI / 180);
            
            return (
              <g key={i}>
                <path 
                  d={`M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`}
                  fill={item.color}
                  stroke="#fff"
                  strokeWidth="2"
                />
                
                {/* Label */}
                <text 
                  x={labelX} 
                  y={labelY} 
                  textAnchor="middle" 
                  fontSize="14" 
                  fill="#fff"
                  fontWeight="bold"
                >
                  {`${Math.round((item.value / total) * 100)}%`}
                </text>
              </g>
            );
          })}
          
          {/* Legend positioned below the pie */}
          <g transform={`translate(${centerX - 80}, ${height - 50})`}>
            <rect x="0" y="0" width="160" height="40" fill="#fff" stroke="#ddd" strokeWidth="1" rx="4" />
            {data.map((item, i) => (
              <g key={i} transform={`translate(${(i % 2) * 80 + 10}, ${Math.floor(i / 2) * 18 + 8})`}>
                <rect x="0" y="0" width="10" height="10" fill={item.color} rx="2" />
                <text x="15" y="8" fontSize="10" fill="#666">{item.name}</text>
              </g>
            ))}
          </g>
        </svg>
      </div>
    );
  };

  // Custom Line Chart Component
  const TrendChart = ({ data, width = 600, height = 300 }) => {
    const maxValue = Math.max(...data.map(item => Math.max(item.files, item.completed)));
    const chartHeight = height - 50;
    const chartWidth = width - 80;
    const xStep = chartWidth / (data.length - 1);
    
    // Generate path data for files line
    const filesPath = data.map((item, i) => {
      const x = 60 + i * xStep;
      const y = chartHeight - (item.files / maxValue) * (chartHeight - 40);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    // Generate path data for completed line
    const completedPath = data.map((item, i) => {
      const x = 60 + i * xStep;
      const y = chartHeight - (item.completed / maxValue) * (chartHeight - 40);
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    }).join(' ');
    
    return (
      <div className="w-full h-full flex justify-center items-center">
        <svg width="100%" height="100%" viewBox={`0 0 ${width} ${height}`} className="max-w-full max-h-full">
          {/* X-axis */}
          <line x1="50" y1={chartHeight} x2={width - 20} y2={chartHeight} stroke="#ccc" strokeWidth="1" />
          
          {/* Y-axis */}
          <line x1="50" y1="20" x2="50" y2={chartHeight} stroke="#ccc" strokeWidth="1" />
          
          {/* Y-axis labels */}
          {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
            <g key={i}>
              <text x="40" y={chartHeight - ratio * (chartHeight - 40) + 5} textAnchor="end" fontSize="12" fill="#666">
                {Math.round(maxValue * ratio)}
              </text>
              <line x1="45" y1={chartHeight - ratio * (chartHeight - 40)} x2="50" y2={chartHeight - ratio * (chartHeight - 40)} stroke="#ccc" strokeWidth="1" />
            </g>
          ))}
          
          {/* X-axis labels */}
          {data.map((item, i) => (
            <text 
              key={i}
              x={60 + i * xStep} 
              y={chartHeight + 20} 
              textAnchor="middle" 
              fontSize="12" 
              fill="#666"
            >
              {item.week}
            </text>
          ))}
          
          {/* Grid lines */}
          {[0.25, 0.5, 0.75].map((ratio, i) => (
            <line 
              key={i}
              x1="50" 
              y1={chartHeight - ratio * (chartHeight - 40)} 
              x2={width - 20} 
              y2={chartHeight - ratio * (chartHeight - 40)} 
              stroke="#eee" 
              strokeWidth="1" 
            />
          ))}
          
          {/* Files line */}
          <path 
            d={filesPath} 
            fill="none" 
            stroke="#3b82f6" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
          
          {/* Completed line */}
          <path 
            d={completedPath} 
            fill="none" 
            stroke="#10b981" 
            strokeWidth="2" 
            strokeLinejoin="round"
          />
          
          {/* Data points */}
          {data.map((item, i) => {
            const x = 60 + i * xStep;
            const filesY = chartHeight - (item.files / maxValue) * (chartHeight - 40);
            const completedY = chartHeight - (item.completed / maxValue) * (chartHeight - 40);
            
            return (
              <g key={i}>
                <circle cx={x} cy={filesY} r="4" fill="#3b82f6" stroke="#fff" strokeWidth="1" />
                <circle cx={x} cy={completedY} r="4" fill="#10b981" stroke="#fff" strokeWidth="1" />
              </g>
            );
          })}
          
          {/* Legend */}
          <g transform={`translate(${width - 120}, 10)`}>
            <line x1="0" y1="5" x2="20" y2="5" stroke="#3b82f6" strokeWidth="2" />
            <text x="25" y="8" fontSize="12" fill="#666">Files</text>
            <line x1="0" y1="20" x2="20" y2="20" stroke="#10b981" strokeWidth="2" />
            <text x="25" y="23" fontSize="12" fill="#666">Completed</text>
          </g>
        </svg>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 py-4 sm:py-6 space-y-4 sm:space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">E-Office File Movement</h1>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <Button variant="outline" className="w-full sm:w-auto text-sm">
              <Download className="h-4 w-4 mr-2" />
              Export Report
            </Button>
            <Button className="w-full sm:w-auto text-sm">
              <FolderOpen className="h-4 w-4 mr-2" />
              Create New File
            </Button>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          {/* Mobile Tab Navigation */}
          <div className="sm:hidden">
            <Button 
              variant="outline" 
              className="w-full justify-between mb-4"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="truncate">{tabItems.find(item => item.value === activeTab)?.label}</span>
              {mobileMenuOpen ? <X className="h-4 w-4 ml-2 flex-shrink-0" /> : <Menu className="h-4 w-4 ml-2 flex-shrink-0" />}
            </Button>
            
            {mobileMenuOpen && (
              <div className="bg-white rounded-lg shadow-lg p-2 mb-4 z-10">
                {tabItems.map((item) => (
                  <Button
                    key={item.value}
                    variant={activeTab === item.value ? "default" : "ghost"}
                    className="w-full justify-start mb-1 text-sm"
                    onClick={() => {
                      setActiveTab(item.value);
                      setMobileMenuOpen(false);
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tab Navigation */}
          <TabsList className="hidden sm:grid w-full grid-cols-6 mb-6">
            {tabItems.map((item) => (
              <TabsTrigger key={item.value} value={item.value} className="text-xs lg:text-sm">
                {item.label}
              </TabsTrigger>
            ))}
          </TabsList>

          {/* Dashboard Tab */}
          <TabsContent value="dashboard" className="space-y-4 sm:space-y-6">
            {/* Summary Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4">
              {summaryStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardContent className="flex items-center p-3 sm:p-4 lg:p-6">
                    <div className={`p-2 sm:p-3 rounded-full ${stat.bgColor} flex-shrink-0`}>
                      <stat.icon className={`w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 ${stat.color}`} />
                    </div>
                    <div className="ml-3 sm:ml-4 min-w-0 flex-1">
                      <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <p className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900">{stat.value}</p>
                        <Badge variant={stat.change.startsWith('+') ? 'default' : 'secondary'} className="text-xs">
                          {stat.change}
                        </Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Charts Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-6">
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <BarChart3 className="h-4 w-4 sm:h-5 sm:w-5" />
                    Department-wise File Load
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-56 sm:h-72 lg:h-80">
                    <BarChart data={departmentData} width={600} height={300} />
                  </div>
                </CardContent>
              </Card>
              
              <Card className="shadow-md">
                <CardHeader className="pb-3">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <PieChartIcon className="h-4 w-4 sm:h-5 sm:w-5" />
                    File Status Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-56 sm:h-72 lg:h-80">
                    <PieChart data={statusData} width={350} height={300} />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* File Movement Trends */}
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <TrendingUp className="h-4 w-4 sm:h-5 sm:w-5" />
                  File Movement Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-56 sm:h-72 lg:h-80">
                  <TrendChart data={trendData} width={600} height={300} />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* File Inbox Tab */}
          <TabsContent value="inbox" className="space-y-4 sm:space-y-6">
            <Card className="shadow-md">
              <CardContent className="p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex-1 min-w-0">
                    <Input 
                      placeholder="Search by file number, subject, or initiator..." 
                      className="w-full text-sm"
                    />
                  </div>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                      <SelectTrigger className="w-full sm:w-40 text-sm">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="in-transit">In Transit</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="escalated">Escalated</SelectItem>
                      </SelectContent>
                    </Select>
                    <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                      <SelectTrigger className="w-full sm:w-40 text-sm">
                        <SelectValue placeholder="Department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Departments</SelectItem>
                        <SelectItem value="CSE">CSE</SelectItem>
                        <SelectItem value="IT">IT</SelectItem>
                        <SelectItem value="ECE">ECE</SelectItem>
                        <SelectItem value="Civil">Civil</SelectItem>
                        <SelectItem value="Mech">Mech</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button variant="outline" onClick={() => handleBulkAction('approve')} className="w-full sm:w-auto text-sm">
                      Bulk Approve
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="shadow-md">
              <CardHeader className="pb-3">
                <CardTitle className="text-base sm:text-lg">File Inbox ({filteredFiles.length})</CardTitle>
                <CardDescription className="text-sm">Manage and track all file movements</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {filteredFiles.map((file) => (
                    <div key={file.id} className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow p-3 sm:p-4">
                      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3 sm:gap-4">
                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2 mb-2 sm:mb-3">
                            <div className="flex items-center gap-2">
                              {file.confidential && <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />}
                              <span className="font-medium text-sm sm:text-base lg:text-lg">{file.fileNumber}</span>
                              {file.escalated && <Badge variant="destructive" className="text-xs">Escalated</Badge>}
                            </div>
                            <Badge variant={
                              file.status === 'pending' ? 'destructive' : 
                              file.status === 'in-transit' ? 'default' : 'secondary'
                            } className="text-xs">
                              {file.status === 'pending' ? 'Pending' : 
                               file.status === 'in-transit' ? 'In Transit' : 
                               file.status.charAt(0).toUpperCase() + file.status.slice(1)}
                            </Badge>
                            <Badge variant={file.priority === 'High' ? 'destructive' : 'outline'} className="text-xs">
                              {file.priority}
                            </Badge>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{file.subject}</h3>
                          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">
                            <div className="min-w-0">
                              <span className="font-medium block">Initiated by:</span>
                              <span className="truncate block">{file.initiatedBy}</span>
                            </div>
                            <div className="min-w-0">
                              <span className="font-medium block">Current Handler:</span>
                              <span className="truncate block">{file.currentHandler}</span>
                            </div>
                            <div>
                              <span className="font-medium block">Days in Queue:</span>
                              <span className={file.daysInQueue > 3 ? 'text-red-600 font-medium' : ''}>
                                {file.daysInQueue} days
                              </span>
                            </div>
                            <div>
                              <span className="font-medium block">Attachments:</span>
                              <span>{file.attachments} files</span>
                            </div>
                          </div>
                          <div className="text-xs text-gray-500">
                            Created: {file.createdDate} | Last action: {file.lastAction}
                          </div>
                        </div>
                        <div className="flex flex-row lg:flex-col gap-2 lg:ml-4">
                          <Button 
                            size="sm" 
                            onClick={() => handleFileAction(file.id, 'view')}
                            variant="outline"
                            className="flex-1 lg:flex-none"
                          >
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Button>
                          <Button 
                            size="sm"
                            onClick={() => handleFileAction(file.id, 'approve')}
                            className="flex-1 lg:flex-none"
                          >
                            <CheckCircle className="h-4 w-4 mr-1" />
                            Approve
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline"
                            onClick={() => handleFileAction(file.id, 'forward')}
                            className="flex-1 lg:flex-none"
                          >
                            <Send className="h-4 w-4 mr-1" />
                            Forward
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Escalated Tab */}
          <TabsContent value="escalated" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="text-red-600 flex items-center gap-2 text-lg">
                  <AlertTriangle className="h-5 w-5" />
                  Escalated Files - Immediate Action Required
                </CardTitle>
                <CardDescription>
                  Files that have exceeded SLA timelines and require urgent attention
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.filter(file => file.escalated).map((file) => (
                    <div key={file.id} className="bg-red-50 rounded-lg shadow-sm p-4 border-l-4 border-red-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <span className="font-bold text-red-700">{file.fileNumber}</span>
                            <Badge variant="destructive" className="text-xs">Escalated - {file.daysInQueue} days</Badge>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{file.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Initiated by: {file.initiatedBy} | Current Handler: {file.currentHandler}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2">
                          <Button size="sm" variant="destructive" className="flex-1 sm:flex-none">
                            Urgent Action
                          </Button>
                          <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                            Reassign
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Confidential Tab */}
          <TabsContent value="confidential" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Shield className="h-5 w-5 text-red-600" />
                  Confidential Files
                </CardTitle>
                <CardDescription>
                  Restricted access files requiring special authorization
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {files.filter(file => file.confidential).map((file) => (
                    <div key={file.id} className="bg-yellow-50 rounded-lg shadow-sm p-4 border-l-4 border-yellow-500">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2 mb-2">
                            <Shield className="h-4 w-4 text-red-500 flex-shrink-0" />
                            <span className="font-bold">{file.fileNumber}</span>
                            <Badge variant="secondary" className="text-xs">Confidential</Badge>
                          </div>
                          <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{file.subject}</h3>
                          <p className="text-sm text-gray-600">
                            Initiated by: {file.initiatedBy} | Current Handler: {file.currentHandler}
                          </p>
                        </div>
                        <div className="flex flex-row sm:flex-col gap-2">
                          <Button size="sm" variant="outline" className="flex-1 sm:flex-none">
                            <Eye className="h-4 w-4 mr-1" />
                            View Details
                          </Button>
                          <Button size="sm" className="flex-1 sm:flex-none">
                            <Send className="h-4 w-4 mr-1" />
                            Grant Access
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Audit Trail Tab */}
          <TabsContent value="audit" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Activity className="h-5 w-5" />
                  File Audit Trail
                </CardTitle>
                <CardDescription>
                  Detailed history of all actions performed on files
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">File No.</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Timestamp</th>
                        <th scope="col" className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Remarks</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {auditTrail.map((entry, index) => (
                        <tr key={index}>
                          <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{entry.fileNumber}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{entry.action}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{entry.user}</td>
                          <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">{entry.timestamp}</td>
                          <td className="px-3 py-2 text-sm text-gray-500">{entry.remarks}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <Card className="shadow-md">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  Advanced File Analytics
                </CardTitle>
                <CardDescription>
                  In-depth insights into file movement patterns and performance
                </CardDescription>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center p-4 bg-blue-50 rounded-lg">
                  <MapPin className="h-6 w-6 text-blue-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Average time per file (days)</p>
                    <p className="text-xl font-bold text-gray-900">4.2 days</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-green-50 rounded-lg">
                  <Users className="h-6 w-6 text-green-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Most active department</p>
                    <p className="text-xl font-bold text-gray-900">CSE Department</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-orange-50 rounded-lg">
                  <AlertTriangle className="h-6 w-6 text-orange-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Bottleneck areas identified</p>
                    <p className="text-xl font-bold text-gray-900">Registrar Office, Dean Academic</p>
                  </div>
                </div>
                <div className="flex items-center p-4 bg-purple-50 rounded-lg">
                  <FileText className="h-6 w-6 text-purple-600 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-600">Files requiring review</p>
                    <p className="text-xl font-bold text-gray-900">18</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default FileMovement;