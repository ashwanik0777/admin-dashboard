import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { GraduationCap, CheckCircle, AlertCircle, Clock } from 'lucide-react';

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