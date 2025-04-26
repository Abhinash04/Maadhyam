import { HelpCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useState } from 'react';

// Mock data
const nearbyRequests = [
  {
    id: '1',
    title: 'Need help moving furniture',
    category: 'Moving',
    location: 'Downtown',
    distance: '1.2 miles',
    createdAt: '2023-04-22T10:30:00Z',
    urgency: 'medium'
  },
  {
    id: '2',
    title: 'Grocery shopping assistance',
    category: 'Shopping',
    location: 'Westside',
    distance: '0.8 miles',
    createdAt: '2023-04-20T15:45:00Z',
    urgency: 'low'
  },
  {
    id: '3',
    title: 'Help with computer setup',
    category: 'Technical',
    location: 'Northside',
    distance: '2.5 miles',
    createdAt: '2023-04-19T09:15:00Z',
    urgency: 'high'
  },
  {
    id: '4',
    title: 'Plumbing issue in bathroom',
    category: 'Home Repair',
    location: 'Eastside',
    distance: '1.8 miles',
    createdAt: '2023-04-18T14:20:00Z',
    urgency: 'high'
  }
];

const acceptedRequests = [
  {
    id: '5',
    title: 'Help with gardening',
    category: 'Gardening',
    location: 'Suburbs',
    requesterName: 'Maria Lopez',
    createdAt: '2023-04-15T11:20:00Z',
    status: 'in_progress',
    urgency: 'medium'
  },
  {
    id: '6',
    title: 'Moving boxes to storage',
    category: 'Moving',
    location: 'Downtown',
    requesterName: 'John Smith',
    createdAt: '2023-04-10T09:45:00Z',
    status: 'scheduled',
    urgency: 'low'
  }
];

const HelperDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedRole, setSelectedRole] = useState('all');

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'low':
        return <Badge className="bg-blue-500">Low</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'high':
        return <Badge className="bg-red-500">High</Badge>;
      default:
        return <Badge>Unknown</Badge>;
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'scheduled':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Scheduled</Badge>;
      case 'in_progress':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">In Progress</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filterContent = (content, searchTerm, role) => {
    if (!searchTerm && role === 'all') return content;
    return content.filter(item => 
      (role === 'all' || item.category.toLowerCase() === role) &&
      (searchTerm ? Object.values(item).some(value => 
        value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      ) : true)
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Helper Dashboard</h1>
        <p className="text-muted-foreground mt-2">Find requests and offer your help to those in need</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Available Requests</CardTitle>
            <HelpCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32</div>
            <p className="text-xs text-muted-foreground">
              +5 new since yesterday
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Currently in progress
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Helps</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Thank you for helping!
            </p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="nearby">
        <div className="flex justify-between items-center mb-4">
          <TabsList>
            <TabsTrigger value="nearby">Nearby Requests</TabsTrigger>
            <TabsTrigger value="accepted">Accepted Requests</TabsTrigger>
          </TabsList>
          <div className="flex items-center space-x-2">
            <div className="relative w-[180px]">
              <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select
              defaultValue="all"
              value={selectedRole}
              onValueChange={(value) => setSelectedRole(value)}
            >
              <SelectTrigger className="w-[140px]">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="moving">Moving</SelectItem>
                <SelectItem value="shopping">Shopping</SelectItem>
                <SelectItem value="technical">Technical</SelectItem>
                <SelectItem value="repair">Home Repair</SelectItem>
                <SelectItem value="gardening">Gardening</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <TabsContent value="nearby">
          <Card>
            <CardHeader>
              <CardTitle>Nearby Requests</CardTitle>
              <CardDescription>
                Help requests in your area
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterContent(nearbyRequests, searchTerm, selectedRole).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{request.title}</h4>
                        {getUrgencyBadge(request.urgency)}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{request.category}</span>
                        <span>•</span>
                        <span>{request.location}</span>
                        <span>•</span>
                        <span>{request.distance}</span>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        Posted on {formatDate(request.createdAt)}
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button size="sm" className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">Offer Help</Button>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link to="/help-requests">View All Requests</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="accepted">
          <Card>
            <CardHeader>
              <CardTitle>Accepted Requests</CardTitle>
              <CardDescription>
                Requests you've agreed to help with
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent(acceptedRequests, searchTerm, selectedRole).length > 0 ? (
                <div className="space-y-4">
                  {filterContent(acceptedRequests, searchTerm, selectedRole).map(request => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <div className="flex items-center space-x-2">
                          <h4 className="font-medium">{request.title}</h4>
                          {getUrgencyBadge(request.urgency)}
                        </div>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{request.category}</span>
                          <span>•</span>
                          <span>{request.location}</span>
                        </div>
                        <div className="flex items-center space-x-2 text-sm">
                          <span>Requester: {request.requesterName}</span>
                          <span>•</span>
                          {getStatusBadge(request.status)}
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Message</Button>
                        <Button variant="outline" size="sm">View Details</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <HelpCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No requests found</h3>
                  <p className="text-sm text-muted-foreground">
                    Try adjusting your search filters or browse all requests
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default HelperDashboard;