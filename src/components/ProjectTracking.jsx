import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Briefcase, DollarSign, Calendar, Users } from 'lucide-react';

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
                      <Badge variant={
                        project.status === 'Active' ? 'default' : 
                        project.status === 'Planning' ? 'secondary' : 'destructive'
                      } className="text-xs">
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