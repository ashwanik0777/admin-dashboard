import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { BarChart3, FileText, TrendingUp, Award } from 'lucide-react';

const IQACModule = () => {
  const reports = [
    {
      id: 1,
      title: 'NAAC Self Study Report 2024',
      type: 'NAAC',
      status: 'In Progress',
      deadline: '2024-03-15',
      completeness: 65
    },
    {
      id: 2,
      title: 'NIRF Data Collection 2024',
      type: 'NIRF',
      status: 'Completed',
      deadline: '2024-02-28',
      completeness: 100
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">IQAC/NAAC/NIRF</h1>
        <Button className="w-full sm:w-auto">Generate Report</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <BarChart3 className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">NAAC Grade</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">A+</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <TrendingUp className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">NIRF Ranking</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">156</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <FileText className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Reports Due</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">3</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Accreditations</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">5</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Quality Assurance Reports</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage NAAC, NIRF, and other quality assessment reports</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Search reports..." className="max-w-full sm:max-w-sm" />
            <div className="space-y-3">
              {reports.map((report) => (
                <div key={report.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{report.title}</p>
                      <p className="text-sm text-gray-500 truncate">Deadline: {report.deadline}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{report.type}</Badge>
                      <Badge variant={
                        report.status === 'Completed' ? 'default' : 
                        report.status === 'In Progress' ? 'secondary' : 'destructive'
                      } className="text-xs">
                        {report.status}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4">
                    <div className="text-sm">
                      <p className="font-medium">{report.completeness}% Complete</p>
                      <div className="w-full sm:w-24 bg-gray-200 rounded-full h-2 mt-1">
                        <div 
                          className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                          style={{ width: `${report.completeness}%` }}
                        ></div>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1 sm:flex-none">Edit</Button>
                      <Button size="sm" className="text-xs flex-1 sm:flex-none">Submit</Button>
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

export default IQACModule;