import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Calendar, Clock, Users, FileText } from 'lucide-react';

const ExamManagement = () => {
  const [activeTab, setActiveTab] = useState('schedule');

  const examSchedules = [
    {
      id: 1,
      course: 'Data Structures',
      date: '2024-01-15',
      time: '10:00 AM',
      duration: '3 hours',
      hall: 'Hall A',
      students: 120,
      invigilators: ['Dr. Smith', 'Prof. Johnson']
    },
    {
      id: 2,
      course: 'Database Management',
      date: '2024-01-16',
      time: '2:00 PM',
      duration: '3 hours',
      hall: 'Hall B',
      students: 110,
      invigilators: ['Dr. Brown', 'Prof. Davis']
    }
  ];

  return (
    <div className="space-y-4 md:space-y-6 px-4 md:px-0">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900">Exam Management</h1>
        <Button className="w-full sm:w-auto">Schedule New Exam</Button>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 md:p-6">
            <Calendar className="h-6 w-6 md:h-8 md:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 md:ml-4 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Scheduled Exams</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 md:p-6">
            <Clock className="h-6 w-6 md:h-8 md:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 md:ml-4 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Ongoing</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 md:p-6">
            <Users className="h-6 w-6 md:h-8 md:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 md:ml-4 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Total Students</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">1,247</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 md:p-6">
            <FileText className="h-6 w-6 md:h-8 md:w-8 text-purple-600 flex-shrink-0" />
            <div className="ml-3 md:ml-4 min-w-0">
              <p className="text-xs md:text-sm font-medium text-gray-600 truncate">Answer Sheets</p>
              <p className="text-xl md:text-2xl font-bold text-gray-900">892</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg md:text-xl">Exam Schedule</CardTitle>
          <CardDescription className="text-sm md:text-base">Manage exam schedules and seating arrangements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3 md:space-y-4">
            {examSchedules.map((exam) => (
              <div key={exam.id} className="flex flex-col lg:flex-row lg:items-center justify-between p-4 md:p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-base md:text-lg">{exam.course}</p>
                    <p className="text-sm text-gray-500">{exam.date} at {exam.time}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline" className="text-xs">{exam.duration}</Badge>
                    <Badge variant="secondary" className="text-xs">{exam.hall}</Badge>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between sm:justify-end gap-3 sm:gap-4">
                  <div className="text-left sm:text-right">
                    <p className="text-sm font-medium">{exam.students} students</p>
                    <p className="text-xs text-gray-500 truncate sm:max-w-none max-w-full">{exam.invigilators.join(', ')}</p>
                  </div>
                  <Button size="sm" variant="outline" className="w-full sm:w-auto">Manage</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExamManagement;