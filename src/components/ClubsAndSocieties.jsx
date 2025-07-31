import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Users, Calendar, DollarSign, Award } from 'lucide-react';

const ClubsAndSocieties = () => {
  const clubs = [
    {
      id: 1,
      name: 'Computer Science Society',
      coordinator: 'Dr. Smith',
      members: 120,
      events: 8,
      budget: '₹25,000',
      status: 'Active'
    },
    {
      id: 2,
      name: 'Photography Club',
      coordinator: 'Prof. Johnson',
      members: 60,
      events: 5,
      budget: '₹15,000',
      status: 'Active'
    }
  ];

  return (
    <div className="space-y-6 p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Clubs & Societies</h1>
        <Button className="w-full sm:w-auto">Register New Club</Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Active Clubs</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">18</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Calendar className="h-6 w-6 sm:h-8 sm:w-8 text-green-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Events This Month</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">24</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <DollarSign className="h-6 w-6 sm:h-8 sm:w-8 text-yellow-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Total Budget</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">₹4.2L</p>
            </div>
          </CardContent>
        </Card>
        <Card className="shadow-md hover:shadow-lg transition-shadow duration-200">
          <CardContent className="flex items-center p-4 sm:p-6">
            <Award className="h-6 w-6 sm:h-8 sm:w-8 text-purple-600" />
            <div className="ml-3 sm:ml-4">
              <p className="text-xs sm:text-sm font-medium text-gray-600">Awards Won</p>
              <p className="text-xl sm:text-2xl font-bold text-gray-900">12</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-lg sm:text-xl">Club Management</CardTitle>
          <CardDescription className="text-sm sm:text-base">Manage student clubs and societies</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <Input placeholder="Search clubs..." className="max-w-full sm:max-w-sm" />
            <div className="space-y-3">
              {clubs.map((club) => (
                <div key={club.id} className="flex flex-col lg:flex-row lg:items-center lg:justify-between p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 mb-4 lg:mb-0">
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-gray-900 truncate">{club.name}</p>
                      <p className="text-sm text-gray-500 truncate">Coordinator: {club.coordinator}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="outline" className="text-xs">{club.members} members</Badge>
                      <Badge variant="secondary" className="text-xs">{club.events} events</Badge>
                      <Badge variant="outline" className="text-xs">{club.budget}</Badge>
                    </div>
                  </div>
                  <div className="flex flex-col sm:flex-row sm:items-center space-y-2 sm:space-y-0 sm:space-x-2">
                    <Badge variant="default" className="text-xs w-full sm:w-auto text-center">{club.status}</Badge>
                    <div className="flex space-x-2">
                      <Button size="sm" variant="outline" className="text-xs flex-1 sm:flex-none">Manage</Button>
                      <Button size="sm" className="text-xs flex-1 sm:flex-none">View Events</Button>
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

export default ClubsAndSocieties;