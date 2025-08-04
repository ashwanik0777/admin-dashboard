import React, { useState, useEffect } from 'react';
import { AlertTriangle, Bell, Calendar, CheckCircle, Clock, FileText, TrendingUp, Users, MapPin, MessageSquare, Cake } from 'lucide-react';
import { useToast } from '../hooks/use-toast'; // Assuming useToast is a custom hook and doesn't need to be integrated

// Re-defined UI Components (previously imported from '../components/ui/*')

// Card
const Card = ({ className, ...props }) => (
  <div
    className={`rounded-lg border border-gray-200 bg-card text-card-foreground shadow-sm ${className}`}
    {...props}
  />
);
Card.displayName = "Card";

const CardHeader = ({ className, ...props }) => (
  <div
    className={`flex flex-col space-y-1.5 p-6 ${className}`}
    {...props}
  />
);
CardHeader.displayName = "CardHeader";

const CardTitle = ({ className, ...props }) => (
  <h3
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`}
    {...props}
  />
);
CardTitle.displayName = "CardTitle";

const CardDescription = ({ className, ...props }) => (
  <p
    className={`text-sm text-muted-foreground ${className}`}
    {...props}
  />
);
CardDescription.displayName = "CardDescription";

const CardContent = ({ className, ...props }) => (
  <div className={`p-6 pt-0 ${className}`} {...props} />
);
CardContent.displayName = "CardContent";

// Badge
const Badge = ({
  className,
  variant,
  ...props
}) => {
  const variants = {
    default: "border-transparent bg-primary text-primary-foreground hover:bg-primary/80",
    secondary: "border-transparent bg-secondary text-secondary-foreground hover:bg-secondary/80",
    destructive: "border-transparent bg-destructive text-destructive-foreground hover:bg-destructive/80",
    outline: "text-foreground",
  };
  return (
    <div
      className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant || "default"]} ${className}`}
      {...props}
    />
  );
};
Badge.displayName = "Badge";

// Button
const Button = ({
  className,
  variant,
  size,
  asChild = false,
  ...props
}) => {
  const Comp = asChild ? "span" : "button";
  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };
  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };
  return (
    <Comp
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${variants[variant || "default"]} ${sizes[size || "default"]} ${className}`}
      {...props}
    />
  );
};
Button.displayName = "Button";

// Tabs
const Tabs = ({ className, value, onValueChange, ...props }) => (
  <div className={`relative ${className}`} {...props} />
);
Tabs.displayName = "Tabs";

const TabsList = ({ className, ...props }) => (
  <div
    className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-5  text-muted-foreground ${className}`}
    {...props}
  />
);
TabsList.displayName = "TabsList";

const TabsTrigger = ({ className, value, selectedValue, onValueChange, ...props }) => (
  <button
    onClick={() => onValueChange(value)}
    data-state={selectedValue === value ? "active" : "inactive"}
    className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${className}`}
    {...props}
  />
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = ({ className, value, selectedValue, ...props }) => {
  if (value !== selectedValue) return null; // Only render if this is the selected tab
  return (
    <div
      className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
      {...props}
    />
  );
};
TabsContent.displayName = "TabsContent";

// Switch
const Switch = ({ className, checked, onCheckedChange, ...props }) => (
  <button
    role="switch"
    aria-checked={checked}
    data-state={checked ? "checked" : "unchecked"}
    onClick={() => onCheckedChange && onCheckedChange(!checked)}
    className={`peer inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input ${className}`}
    {...props}
  >
    <span
      data-state={checked ? "checked" : "unchecked"}
      className="pointer-events-none block h-5 w-5 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-5 data-[state=unchecked]:translate-x-0"
    />
  </button>
);
Switch.displayName = "Switch";

// Table
const Table = ({ className, ...props }) => (
  <div className="relative w-full overflow-auto">
    <table
      className={`w-full caption-bottom text-sm ${className}`}
      {...props}
    />
  </div>
);
Table.displayName = "Table";

const TableHeader = ({ className, ...props }) => (
  <thead className={`[&_tr]:border-b ${className}`} {...props} />
);
TableHeader.displayName = "TableHeader";

const TableBody = ({ className, ...props }) => (
  <tbody className={`[&_tr:last-child]:border-0 ${className}`} {...props} />
);
TableBody.displayName = "TableBody";

const TableRow = ({ className, ...props }) => (
  <tr
    className={`border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted ${className}`}
    {...props}
  />
);
TableRow.displayName = "TableRow";

const TableHead = ({ className, ...props }) => (
  <th
    className={`h-12 px-4 text-left align-middle font-medium text-muted-foreground [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
);
TableHead.displayName = "TableHead";

const TableCell = ({ className, ...props }) => (
  <td
    className={`p-4 align-middle [&:has([role=checkbox])]:pr-0 ${className}`}
    {...props}
  />
);
TableCell.displayName = "TableCell";


const UniversityCommandCentre = ({ userRole }) => {
  const [darkMode, setDarkMode] = useState(false);
  const [birthdayGreetingsEnabled, setBirthdayGreetingsEnabled] = useState(true);
  const [currentTime, setCurrentTime] = useState(new Date());
  const [selectedTab, setSelectedTab] = useState('overview'); // New state for selected tab
  const { toast } = useToast();

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const getRoleTitle = (role) => {
    const titles = {
      'registrar': 'Registrar',
      'vc': 'Vice Chancellor',
      'dean': 'Dean',
      'hod': 'Head of Department',
      'admin': 'Admin Officer',
      'iqac': 'IQAC Officer'
    };
    return titles[role] || 'Administrator';
  };

  // Mock data for real-time dashboard
  const pendingApprovals = [
    { id: 1, type: 'Faculty Joining', name: 'Dr. Amit Kumar - SoICT', priority: 'High', date: '2024-12-27', school: 'SoICT' },
    { id: 2, type: 'Leave Request', name: 'Prof. Sunita Sharma - SoE', priority: 'Medium', date: '2024-12-26', school: 'SoE' },
    { id: 3, type: 'Course Mapping', name: 'AI & ML - CSE Department', priority: 'High', date: '2024-12-25', school: 'SoICT' },
    { id: 4, type: 'Startup Proposal', name: 'EduTech Innovation - Team Alpha', priority: 'Medium', date: '2024-12-24', school: 'SoM' },
    { id: 5, type: 'Grievance', name: 'Library Access Issue - Student', priority: 'High', date: '2024-12-23', school: 'SoHSS' }
  ];

  const todaysMeetings = [
    { time: '10:00 AM', title: 'Academic Council Meeting', attendees: 18, location: 'VC Office' },
    { time: '02:00 PM', title: 'IQAC Review Session', attendees: 12, location: 'IQAC Room' },
    { time: '04:00 PM', title: 'Department Heads Sync', attendees: 22, location: 'Conference Hall' }
  ];

  const biometricSummary = {
    totalPresent: 112,
    totalStaff: 120,
    lateArrivals: 7,
    earlyDepartures: 3,
    anomalies: 2
  };

  const birthdaysToday = [
    { name: 'Dr. Rajesh Kumar', department: 'SoICT', type: 'Faculty' },
    { name: 'Ms. Priya Sharma', department: 'SoHSS', type: 'Staff' },
    { name: 'Amit Singh', department: 'SoE', type: 'Student' }
  ];

  const smartAlerts = [
    { type: 'urgent', message: 'SoHSS: 4 unresolved grievances > 7 days', action: 'Review Now' },
    { type: 'warning', message: 'SoICT: 12 Courses pending mapping for Odd Sem', action: 'Check Status' },
    { type: 'info', message: 'Law: 3 files delayed in movement > 5 days', action: 'Track Files' },
    { type: 'success', message: 'SoM: All NAAC criteria 85% complete', action: 'View Progress' }
  ];

  const interactiveTiles = [
    {
      title: "Pending Approvals",
      count: pendingApprovals.length,
      icon: Bell,
      color: "bg-orange-500",
      description: "Items awaiting action",
      action: () => toast({ title: "Opening Approval Centre", description: "Loading pending items..." })
    },
    {
      title: "Today's Meetings",
      count: todaysMeetings.length,
      icon: Calendar,
      color: "bg-blue-500",
      description: "Scheduled for today",
      action: () => toast({ title: "Opening Calendar", description: "Loading today's schedule..." })
    },
    {
      title: "Staff Present",
      count: `${biometricSummary.totalPresent}/${biometricSummary.totalStaff}`,
      icon: Users,
      color: "bg-green-500",
      description: "Live attendance",
      action: () => toast({ title: "Opening Biometric Logs", description: "Loading attendance data..." })
    },
    {
      title: "Active Grievances",
      count: 8,
      icon: MessageSquare,
      color: "bg-red-500",
      description: "Require attention",
      action: () => toast({ title: "Opening Grievance Tracker", description: "Loading active cases..." })
    }
  ];

  const handleApproval = (id, action) => {
    const item = pendingApprovals.find(p => p.id === id);
    toast({
      title: `${action === 'approve' ? 'Approved' : 'Rejected'}`,
      description: `${item?.type}: ${item?.name} has been ${action}d successfully.`,
      variant: action === 'approve' ? 'default' : 'destructive'
    });
  };

  const handleBirthdayGreeting = (person) => {
    toast({
      title: "Birthday Greeting Sent! 🎉",
      description: `Automated greeting sent to ${person.name} via email and SMS.`
    });
  };

  return (
    <div className={`space-y-6 ${darkMode ? 'dark' : ''}`}>
      {/* Header with Dynamic Greeting */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 rounded-lg p-6 text-white shadow-lg">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">
              {getGreeting()}, {getRoleTitle(userRole)}!
            </h1>
            <p className="text-blue-100 text-base sm:text-lg">
              Welcome to GBU University Command Centre
            </p>
            <p className="text-blue-200 text-xs sm:text-sm mt-1">
              {currentTime.toLocaleDateString('en-IN', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })} • {currentTime.toLocaleTimeString('en-IN')}
            </p>
          </div>
          <div className="flex items-center gap-4 self-end sm:self-auto">
            <div className="text-right">
              <div className="text-xl sm:text-2xl font-bold">Live</div>
              <div className="text-blue-200 text-xs sm:text-sm">Command Centre</div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Dashboard Tiles */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {interactiveTiles.map((tile, index) => (
          <Card
            key={index}
            className="hover:shadow-lg transition-all duration-200 cursor-pointer group hover:-translate-y-1"
            onClick={tile.action}
          >
            <CardContent className="p-4 sm:p-6">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className={`w-10 h-10 sm:w-12 sm:h-12 ${tile.color} rounded-lg flex items-center justify-center mb-3 sm:mb-4 group-hover:scale-110 transition-transform shadow-md`}>
                    <tile.icon className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                  </div>
                  <h3 className="font-semibold text-gray-900 text-sm sm:text-base mb-1">{tile.title}</h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-2 sm:mb-3">{tile.description}</p>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <Badge variant="secondary" className="text-sm sm:text-lg font-bold shadow-sm">
                  {tile.count}
                </Badge>
                <span className="text-xs text-gray-400 group-hover:text-gray-600 transition-colors">
                  Click to open →
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Main Dashboard Tabs - Improved Responsive Design */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6 "> {/* Pass selectedTab and its setter */}
        <div className="relative">
          <div className="block md:hidden overflow-x-auto">
            <TabsList className="inline-flex gap-2 min-w-max pb-2">
              <TabsTrigger value="overview" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <FileText className="w-3 h-3  mr-1" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="approvals" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <CheckCircle className="w-3 h-3 mr-1" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="analytics" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <TrendingUp className="w-3 h-3 mr-1" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="biometric" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <Users className="w-3 h-3 mr-1" />
                Biometric
              </TabsTrigger>
              <TabsTrigger value="meetings" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <Calendar className="w-3 h-3 mr-1" />
                Meetings
              </TabsTrigger>
              <TabsTrigger value="alerts" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-xs whitespace-nowrap">
                <Bell className="w-3 h-3 mr-1" />
                Alerts
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="hidden md:flex items-center justify-center">
            <TabsList className="grid grid-cols-6 gap-20 pb-2">
              <TabsTrigger value="overview" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <FileText className="w-4 h-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger value="approvals" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <CheckCircle className="w-4 h-4 mr-2" />
                Approvals
              </TabsTrigger>
              <TabsTrigger value="analytics" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <TrendingUp className="w-4 h-4 mr-2" />
                Analytics
              </TabsTrigger>
              <TabsTrigger value="biometric" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <Users className="w-4 h-4 mr-2" />
                Biometric
              </TabsTrigger>
              <TabsTrigger value="meetings" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <Calendar className="w-4 h-4 mr-2" />
                Meetings
              </TabsTrigger>
              <TabsTrigger value="alerts" selectedValue={selectedTab} onValueChange={setSelectedTab} className="flex items-center justify-center py-2 text-base whitespace-nowrap">
                <Bell className="w-4 h-4 mr-2" />
                Alerts
              </TabsTrigger>
            </TabsList>
          </div>
        </div>

        <TabsContent value="overview" selectedValue={selectedTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Today's Birthdays */}
            <Card className="shadow-sm">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                    <Cake className="w-4 h-4 sm:w-5 sm:h-5" />
                    Birthday Celebrations
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <span className="text-xs sm:text-sm">Auto Greetings</span>
                    <Switch
                      checked={birthdayGreetingsEnabled}
                      onCheckedChange={setBirthdayGreetingsEnabled}
                      className="shadow-sm h-4 sm:h-5 w-8 sm:w-10"
                    />
                  </div>
                </div>
                <CardDescription className="text-xs sm:text-sm">Today's birthday celebrations</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {birthdaysToday.map((person, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 bg-yellow-50 rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow"
                    >
                      <div>
                        <p className="font-medium text-sm sm:text-base">{person.name}</p>
                        <p className="text-xs sm:text-sm text-gray-600">{person.department} • {person.type}</p>
                      </div>
                      <Button
                        size="sm"
                        onClick={() => handleBirthdayGreeting(person)}
                        disabled={!birthdayGreetingsEnabled}
                        className={`shadow-sm mt-2 sm:mt-0 ${
                          birthdayGreetingsEnabled
                            ? 'bg-blue-600 hover:bg-blue-700 text-white'
                            : 'bg-gray-200 text-gray-500'
                        }`}
                      >
                        Send Wishes 🎉
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Today's Meetings */}
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-base sm:text-lg">
                  <Calendar className="w-4 h-4 sm:w-5 sm:h-5" />
                  Today's Schedule
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Important meetings and events</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  {todaysMeetings.map((meeting, index) => (
                    <div
                      key={index}
                      className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-shadow"
                    >
                      <div className="mb-2 sm:mb-0">
                        <p className="font-medium text-sm sm:text-base">{meeting.title}</p>
                        <p className="text-xs sm:text-sm text-gray-600">
                          <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                          {meeting.time} •
                          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2 mr-1" />
                          {meeting.location} •
                          <Users className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2 mr-1" />
                          {meeting.attendees} attendees
                        </p>
                      </div>
                      <Button variant="outline" size="sm" className="shadow-sm w-full sm:w-auto">
                        Join
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="approvals" selectedValue={selectedTab} className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Pending Approvals Centre</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Items requiring your immediate attention</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table className="shadow-sm min-w-[600px] sm:min-w-full">
                  <TableHeader className="bg-gray-50">
                    <TableRow className="shadow-sm">
                      <TableHead className="text-xs sm:text-sm">Type</TableHead>
                      <TableHead className="text-xs sm:text-sm">Details</TableHead>
                      <TableHead className="text-xs sm:text-sm">School</TableHead>
                      <TableHead className="text-xs sm:text-sm">Priority</TableHead>
                      <TableHead className="text-xs sm:text-sm">Date</TableHead>
                      <TableHead className="text-xs sm:text-sm">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingApprovals.map((item) => (
                      <TableRow key={item.id} className="hover:shadow-sm">
                        <TableCell className="font-medium text-xs sm:text-sm">{item.type}</TableCell>
                        <TableCell className="text-xs sm:text-sm">{item.name}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="shadow-sm text-xs sm:text-sm">{item.school}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={item.priority === 'High' ? 'destructive' : 'secondary'}
                            className="shadow-sm text-xs sm:text-sm"
                          >
                            {item.priority}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-xs sm:text-sm">{item.date}</TableCell>
                        <TableCell>
                          <div className="flex gap-1 sm:gap-2">
                            <Button
                              size="sm"
                              onClick={() => handleApproval(item.id, 'approve')}
                              className="shadow-sm text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                            >
                              Approve
                            </Button>
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleApproval(item.id, 'reject')}
                              className="shadow-sm text-xs sm:text-sm h-8 sm:h-9 px-2 sm:px-3"
                            >
                              Reject
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="analytics" selectedValue={selectedTab} className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">Monthly Analytics</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Administrative workflow insights</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <span className="text-xs sm:text-sm">Total Approvals This Month</span>
                    <Badge className="text-sm sm:text-lg font-bold shadow-sm">247</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <span className="text-xs sm:text-sm">Average Processing Time</span>
                    <Badge variant="secondary" className="shadow-sm text-xs sm:text-sm">2.3 days</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <span className="text-xs sm:text-sm">Approval Rate</span>
                    <Badge className="bg-green-500 shadow-sm text-xs sm:text-sm">94.2%</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]">
                    <span className="text-xs sm:text-sm">Pending Items</span>
                    <Badge variant="destructive" className="shadow-sm text-xs sm:text-sm">{pendingApprovals.length}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm">
              <CardHeader>
                <CardTitle className="text-base sm:text-lg">School-wise Performance</CardTitle>
                <CardDescription className="text-xs sm:text-sm">Departmental efficiency metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
                  {['SoICT', 'SoE', 'SoM', 'SoHSS', 'SoBSC'].map((school) => (
                    <div
                      key={school}
                      className="flex justify-between items-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                    >
                      <span className="font-medium text-xs sm:text-sm">{school}</span>
                      <div className="flex items-center gap-1 sm:gap-2">
                        <div className="w-16 sm:w-20 bg-gray-200 rounded-full h-2 shadow-inner">
                          <div
                            className="bg-blue-600 h-2 rounded-full shadow-sm"
                            style={{ width: `${Math.random() * 40 + 60}%` }}
                          />
                        </div>
                        <span className="text-xs text-gray-600">
                          {Math.floor(Math.random() * 40 + 60)}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="biometric" selectedValue={selectedTab} className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Live Biometric Dashboard</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Real-time attendance monitoring</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2 sm:gap-4 mb-4 sm:mb-6">
                {[
                  { value: biometricSummary.totalPresent, label: 'Present Today', color: 'text-green-600' },
                  { value: biometricSummary.totalStaff, label: 'Total Staff', color: 'text-gray-600' },
                  { value: biometricSummary.lateArrivals, label: 'Late Arrivals', color: 'text-orange-600' },
                  { value: biometricSummary.earlyDepartures, label: 'Early Exits', color: 'text-red-600' },
                  { value: biometricSummary.anomalies, label: 'Anomalies', color: 'text-purple-600' }
                ].map((item, index) => (
                  <div
                    key={index}
                    className="text-center p-2 sm:p-3 rounded-lg shadow-[0_1px_2px_0_rgba(0,0,0,0.05)]"
                  >
                    <div className={`text-lg sm:text-2xl font-bold ${item.color}`}>{item.value}</div>
                    <div className="text-xs sm:text-sm text-gray-600">{item.label}</div>
                  </div>
                ))}
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 sm:h-3 shadow-inner">
                <div
                  className="bg-green-600 h-2 sm:h-3 rounded-full shadow-sm"
                  style={{ width: `${(biometricSummary.totalPresent / biometricSummary.totalStaff) * 100}%` }}
                />
              </div>
              <p className="text-center text-xs sm:text-sm text-gray-600 mt-2">
                {Math.round((biometricSummary.totalPresent / biometricSummary.totalStaff) * 100)}% Attendance Rate
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="meetings" selectedValue={selectedTab} className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Meeting & Events Calendar</CardTitle>
              <CardDescription className="text-xs sm:text-sm">Scheduled meetings and university events</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {todaysMeetings.map((meeting, index) => (
                  <div
                    key={index}
                    className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-3 sm:p-4 rounded-lg bg-white shadow-[0_1px_3px_0_rgba(0,0,0,0.1),0_1px_2px_-1px_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1),0_2px_4px_-2px_rgba(0,0,0,0.1)] transition-shadow"
                  >
                    <div className="flex-1 mb-2 sm:mb-0">
                      <h3 className="font-semibold text-sm sm:text-base">{meeting.title}</h3>
                      <p className="text-xs sm:text-sm text-gray-600 mt-1">
                        <Clock className="w-3 h-3 sm:w-4 sm:h-4 inline mr-1" />
                        {meeting.time} •
                        <MapPin className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2 mr-1" />
                        {meeting.location} •
                        <Users className="w-3 h-3 sm:w-4 sm:h-4 inline ml-1 sm:ml-2 mr-1" />
                        {meeting.attendees} attendees
                      </p>
                    </div>
                    <div className="flex gap-1 sm:gap-2 w-full sm:w-auto">
                      <Button variant="outline" size="sm" className="shadow-sm w-full sm:w-auto">View Agenda</Button>
                      <Button size="sm" className="shadow-sm w-full sm:w-auto">Join Meeting</Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="alerts" selectedValue={selectedTab} className="space-y-6">
          <Card className="shadow-sm">
            <CardHeader>
              <CardTitle className="text-base sm:text-lg">Smart Alerts & Notifications</CardTitle>
              <CardDescription className="text-xs sm:text-sm">AI-powered insights and priority alerts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 sm:space-y-4">
                {smartAlerts.map((alert, index) => (
                  <div
                    key={index}
                    className={`p-3 sm:p-4 rounded-lg shadow-[0_1px_3px_0_rgba(0,0,0,0.1)] hover:shadow-[0_4px_6px_-1px_rgba(0,0,0,0.1)] transition-shadow ${
                      alert.type === 'urgent' ? 'bg-red-50' :
                      alert.type === 'warning' ? 'bg-yellow-50' :
                      alert.type === 'info' ? 'bg-blue-50' :
                      'bg-green-50'
                    }`}
                  >
                    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 sm:gap-3">
                      <div className="flex items-center gap-2 sm:gap-3">
                        <AlertTriangle className={`w-4 h-4 sm:w-5 sm:h-5 ${
                          alert.type === 'urgent' ? 'text-red-600' :
                          alert.type === 'warning' ? 'text-yellow-600' :
                          alert.type === 'info' ? 'text-blue-600' :
                          'text-green-600'
                        }`} />
                        <span className="font-medium text-xs sm:text-sm">{alert.message}</span>
                      </div>
                      <Button size="sm" variant="outline" className="shadow-sm text-xs sm:text-sm w-full sm:w-auto">
                        {alert.action}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default UniversityCommandCentre;