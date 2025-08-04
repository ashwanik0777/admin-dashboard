import React, { useState } from 'react';
import { Rocket, TrendingUp, DollarSign, Users } from 'lucide-react';

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

// Badge Component
const Badge = ({ children, className, variant = 'default' }) => {
  let baseClasses = 'inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2';
  let variantClasses = '';

  switch (variant) {
    case 'default':
      variantClasses = 'border-transparent bg-blue-500 text-white hover:bg-blue-600';
      break;
    case 'secondary':
      variantClasses = 'border-transparent bg-gray-200 text-gray-800 hover:bg-gray-300';
      break;
    case 'destructive':
      variantClasses = 'border-transparent bg-red-500 text-white hover:bg-red-600';
      break;
    case 'outline':
      variantClasses = 'text-gray-800 border-gray-300';
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


const StartupPanel = () => {
  const startups = [
    {
      id: 1,
      name: 'EduTech Solutions',
      founder: 'John Doe (CS2020001)',
      stage: 'Incubation',
      funding: '₹5,00,000',
      mentor: 'Dr. Smith',
      status: 'Active'
    },
    {
      id: 2,
      name: 'GreenEnergy Pro',
      founder: 'Jane Smith (ME2019045)',
      stage: 'Seed',
      funding: '₹2,50,000',
      mentor: 'Prof. Johnson',
      status: 'Under Review'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Startup Panel</h1>
        <Button className="w-full sm:w-auto">Submit Proposal</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Rocket className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Startups</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Incubated</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Funding</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹15.2L</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Entrepreneurs</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">25</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Startup Incubation</CardTitle>
          <CardDescription className="text-sm sm:text-base">Track and manage student startup initiatives</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Search startups..." className="max-w-full sm:max-w-sm" />
            <div className="space-y-3">
              {startups.map((startup) => (
                <div key={startup.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{startup.name}</p>
                      <p className="text-sm text-gray-500 truncate">Founder: {startup.founder}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{startup.stage}</Badge>
                      <Badge variant="secondary" className="text-xs">{startup.funding}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-sm">
                      <p className="font-medium">Mentor: {startup.mentor}</p>
                      <div className="mt-1">
                        <Badge variant={startup.status === 'Active' ? 'default' : 'secondary'} className="text-xs">
                          {startup.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1 sm:flex-none">Review</Button>
                      <Button size="sm" className="text-xs flex-1 sm:flex-none">Support</Button>
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

export default StartupPanel;