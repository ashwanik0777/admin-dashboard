import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { MessageSquare, AlertTriangle, CheckCircle, Clock } from 'lucide-react';

const GrievanceTracker = () => {
  const grievances = [
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
    }
  ];

  return (
    <div className="space-y-4 sm:space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center space-y-4 sm:space-y-0">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Grievance Tracker</h1>
        <Button className="w-full sm:w-auto">New Grievance</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <MessageSquare className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Grievances</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">47</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <AlertTriangle className="h-6 w-6 sm:h-8 sm:w-8 text-red-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">High Priority</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">8</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">In Progress</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">15</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-300">
          <CardContent className="flex items-center p-4 sm:p-6">
            <CheckCircle className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Resolved</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">24</p>
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
                placeholder="Search grievances..." 
                className="w-full sm:max-w-sm shadow-sm focus:shadow-md transition-shadow duration-200" 
              />
              <Select>
                <SelectTrigger className="w-full sm:w-[180px] shadow-sm focus:shadow-md transition-shadow duration-200">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-full sm:w-[180px] shadow-sm focus:shadow-md transition-shadow duration-200">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="open">Open</SelectItem>
                  <SelectItem value="progress">In Progress</SelectItem>
                  <SelectItem value="resolved">Resolved</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-3">
              {grievances.map((grievance) => (
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
                      <Badge variant={
                        grievance.priority === 'High' ? 'destructive' : 
                        grievance.priority === 'Medium' ? 'default' : 'secondary'
                      } className="shadow-sm">
                        {grievance.priority}
                      </Badge>
                      <Badge variant={
                        grievance.status === 'Open' ? 'destructive' : 
                        grievance.status === 'In Progress' ? 'default' : 'secondary'
                      } className="shadow-sm">
                        {grievance.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between xl:justify-end space-y-2 sm:space-y-0 sm:space-x-4">
                    <span className="text-sm text-gray-600 font-medium sm:order-1 xl:order-none">
                      {grievance.school}
                    </span>
                    <div className="flex items-center space-x-2 sm:order-2 xl:order-none">
                      <Button size="sm" variant="outline" className="shadow-sm hover:shadow-md transition-shadow duration-200">
                        View
                      </Button>
                      <Button size="sm" className="shadow-sm hover:shadow-md transition-shadow duration-200">
                        Resolve
                      </Button>
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

export default GrievanceTracker;