import React from 'react';
import { GraduationCap, CheckCircle, AlertCircle, Clock } from 'lucide-react';

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


// --- Original DegreeAudit Component ---
const DegreeAudit = () => {
  const students = [
    {
      id: 1,
      name: 'John Doe',
      rollNo: 'CS2020001',
      program: 'B.Tech CSE',
      creditsCompleted: 160,
      creditsRequired: 160,
      status: 'eligible',
      cgpa: 8.5
    },
    {
      id: 2,
      name: 'Jane Smith',
      rollNo: 'CS2020002',
      program: 'B.Tech CSE',
      creditsCompleted: 150,
      creditsRequired: 160,
      status: 'pending',
      cgpa: 7.8
    },
    {
      id: 3,
      name: 'Mike Johnson',
      rollNo: 'CS2020003',
      program: 'B.Tech CSE',
      creditsCompleted: 140,
      creditsRequired: 160,
      status: 'not_eligible',
      cgpa: 6.2
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Degree Audit</h1>
        <Button className="w-full sm:w-auto">Generate Degree List</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <GraduationCap className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Students</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">156</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Eligible</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">124</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <AlertCircle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Not Eligible</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">18</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Under Review</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">14</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Student Degree Eligibility</CardTitle>
          <CardDescription className="text-sm sm:text-base">
            Review and approve degree eligibility for graduating students
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input
              placeholder="Search by roll number or name..."
              className="w-full sm:max-w-sm shadow-sm focus:shadow-md transition-shadow duration-200"
            />
            <div className="space-y-3">
              {students.map((student) => (
                <div key={student.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 bg-white">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{student.name}</p>
                      <p className="text-sm text-gray-500 truncate">{student.rollNo} - {student.program}</p>
                    </div>
                    <div className="text-sm flex flex-col sm:flex-row sm:space-x-4 space-y-1 sm:space-y-0">
                      <p className="whitespace-nowrap">Credits: {student.creditsCompleted}/{student.creditsRequired}</p>
                      <p className="whitespace-nowrap">CGPA: {student.cgpa}</p>
                    </div>
                    <Badge variant={
                      student.status === 'eligible' ? 'default' :
                      student.status === 'pending' ? 'secondary' : 'destructive'
                    } className="self-start sm:self-center">
                      {student.status === 'not_eligible' ? 'Not Eligible' :
                       student.status === 'eligible' ? 'Eligible' :
                       'Pending'}
                    </Badge>
                  </div>
                  <div className="flex items-center space-x-2 self-end lg:self-center">
                    <Button size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-shadow duration-200">
                      View Details
                    </Button>
                    <Button size="sm" className="shadow-sm hover:shadow-md transition-shadow duration-200">
                      Approve
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

export default DegreeAudit;