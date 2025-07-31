import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { BookOpen, Download, Users, Clock, Search } from 'lucide-react';

const ELibrary = () => {
  const resources = [
    {
      id: 1,
      title: 'Advanced Computer Science',
      author: 'Dr. Smith',
      type: 'Book',
      category: 'Computer Science',
      downloads: 1200,
      status: 'Available'
    },
    {
      id: 2,
      title: 'IEEE Transactions on Software Engineering',
      author: 'IEEE',
      type: 'Journal',
      category: 'Engineering',
      downloads: 800,
      status: 'Restricted'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">E-Library</h1>
        <Button className="w-full sm:w-auto">Add Resource</Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <BookOpen className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Total Resources</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">2,547</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Download className="h-6 w-6 sm:h-8 sm:w-8 text-green-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Downloads</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">15,689</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Active Users</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">892</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600 flex-shrink-0" />
            <div className="ml-3 sm:ml-4 min-w-0">
              <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">Overdue</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">23</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Resources Section */}
      <Card className="shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="text-lg sm:text-xl">Digital Resources</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage digital library resources and access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative max-w-sm">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              <Input placeholder="Search resources..." className="pl-10 shadow-sm" />
            </div>
            
            {/* Resources List */}
            <div className="space-y-3">
              {resources.map((resource) => (
                <div key={resource.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 bg-white">
                  {/* Resource Info */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-3 lg:mb-0">
                    <div className="min-w-0 flex-1">
                      <p className="font-medium text-gray-900 truncate">{resource.title}</p>
                      <p className="text-sm text-gray-500 truncate">by {resource.author}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{resource.type}</Badge>
                      <Badge variant="secondary" className="text-xs">{resource.category}</Badge>
                    </div>
                  </div>
                  
                  {/* Actions and Status */}
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="flex items-center justify-between sm:justify-start sm:text-right text-sm">
                      <span className="sm:hidden text-gray-600">Downloads:</span>
                      <div className="flex items-center space-x-2">
                        <span className="hidden sm:inline">{resource.downloads} downloads</span>
                        <span className="sm:hidden">{resource.downloads}</span>
                        <Badge 
                          variant={resource.status === 'Available' ? 'default' : 'destructive'} 
                          className="text-xs"
                        >
                          {resource.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="flex-1 sm:flex-none shadow-sm">Preview</Button>
                      <Button size="sm" className="flex-1 sm:flex-none shadow-sm">Manage</Button>
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

export default ELibrary;