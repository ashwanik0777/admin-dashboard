import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { BookOpen, User, Clock, CheckCircle, Plus, Edit, Filter } from 'lucide-react';

const CourseMapping = () => {
  const [activeTab, setActiveTab] = useState('mapping');

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
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
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