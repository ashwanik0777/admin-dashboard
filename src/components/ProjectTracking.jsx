import React from 'react';
import { Briefcase, DollarSign, Calendar, Users } from 'lucide-react'; // External icon library

// --- Integrated UI Components Start ---

// Card Component and its sub-components
const Card = ({ className, children, ...props }) => (
  <div
    className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  >
    {children}
  </div>
);

const CardHeader = ({ className, children, ...props }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ className, children, ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  >
    {children}
  </h3>
);

const CardDescription = ({ className, children, ...props }) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ className, children, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

// Button Component
const Button = ({ className, variant, size, children, ...props }) => {
  const baseClasses = 'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50';
  const variantClasses = {
    default: 'bg-primary text-primary-foreground hover:bg-primary/90', // Assuming 'primary' is blue-600
    destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90', // Assuming 'destructive' is red
    outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground', // Assuming 'input' for border-gray-300
    secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80', // Assuming 'secondary' is gray/light blue
    ghost: 'hover:bg-accent hover:text-accent-foreground',
    link: 'text-primary underline-offset-4 hover:underline',
  };
  const sizeClasses = {
    default: 'h-10 px-4 py-2',
    sm: 'h-9 rounded-md px-3',
    lg: 'h-11 rounded-md px-8',
    icon: 'h-10 w-10',
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant || 'default']} ${sizeClasses[size || 'default']} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};

// Badge Component
const Badge = ({ className, variant, children, ...props }) => {
  const baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  const variantClasses = {
    default: 'border-transparent bg-primary text-primary-foreground hover:bg-primary/80',
    secondary: 'border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80',
    destructive: 'border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80',
    outline: 'text-foreground', // Default text color
  };

  return (
    <div
      className={`${baseClasses} ${variantClasses[variant || 'default']} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};

// Input Component
const Input = ({ className, type, ...props }) => (
  <input
    type={type}
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
);

// --- Integrated UI Components End ---

const ProjectTracking = () => {
  const projects = [
    {
      id: 1,
      title: 'AI Research Initiative',
      pi: 'Dr. Smith',
      funding: '₹5,00,000',
      status: 'Active',
      startDate: '2024-01-01',
      endDate: '2024-12-31',
      progress: 65,
      agency: 'DST'
    },
    {
      id: 2,
      title: 'IoT Smart Campus',
      pi: 'Prof. Johnson',
      funding: '₹8,50,000',
      status: 'Planning',
      startDate: '2024-02-01',
      endDate: '2025-01-31',
      progress: 10,
      agency: 'AICTE'
    },
    {
      id: 3,
      title: 'Blockchain for Supply Chain',
      pi: 'Dr. Emily White',
      funding: '₹7,00,000',
      status: 'Completed',
      startDate: '2023-03-15',
      endDate: '2024-03-14',
      progress: 100,
      agency: 'MEITY'
    },
    {
      id: 4,
      title: 'Renewable Energy Systems',
      pi: 'Dr. Raj Kumar',
      funding: '₹12,00,000',
      status: 'Active',
      startDate: '2024-06-01',
      endDate: '2025-05-31',
      progress: 20,
      agency: 'MNRE'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Project Tracking</h1>
        <Button className="w-full sm:w-auto">Add New Project</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Briefcase className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Projects</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Funding</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹2.4Cr</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Due This Month</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">6</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">PIs Involved</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">18</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Research Projects</CardTitle>
          <CardDescription className="text-sm sm:text-base">Track research and development projects</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Search projects..." className="max-w-full sm:max-w-sm" />
            <div className="space-y-3">
              {projects.map((project) => (
                <div key={project.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{project.title}</p>
                      <p className="text-sm text-gray-500 truncate">PI: {project.pi} | {project.agency}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{project.funding}</Badge>
                      <Badge
                        variant={
                          project.status === 'Active' ? 'default' :
                          project.status === 'Planning' ? 'secondary' :
                          project.status === 'Completed' ? 'outline' : // Assuming 'Completed' gets outline badge
                          'destructive' // Fallback for any other status
                        }
                        className="text-xs"
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-sm">
                      <p className="font-medium">Progress: {project.progress}%</p>
                      <p className="text-gray-500 text-xs">{project.startDate} - {project.endDate}</p>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs">View</Button>
                      <Button size="sm" className="text-xs">Update</Button>
                    </div>
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

export default ProjectTracking;