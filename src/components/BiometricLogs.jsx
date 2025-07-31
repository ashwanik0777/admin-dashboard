import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Clock, Users, AlertTriangle, CheckCircle, Search, Filter } from 'lucide-react';

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