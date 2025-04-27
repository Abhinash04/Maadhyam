import { HelpCircle, CheckCircle, Clock, Search } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { Input } from '../../components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { useState } from 'react';




const HelperDashboard = () => {

  const nearbyRequests = [
    {
      id: 'poverty-001',
      title: 'Meals of Hope',
      category: 'Poverty and Hunger',
      location: 'Downtown',
      distance: '1.5 miles',
      createdAt: '2023-04-18T14:20:00Z',
      urgency: 'high'
    },
    {
      id: 'education-002',
      title: 'Tech for Tomorrow',
      category: 'Education',
      location: 'Eastside',
      distance: '2.1 miles',
      createdAt: '2023-04-20T09:35:00Z',
      urgency: 'medium'
    },
    {
      id: 'medical-002',
      title: 'Blood Drive Lifeline',
      category: 'Health and Medical',
      location: 'Westside',
      distance: '1.8 miles',
      createdAt: '2023-04-15T11:00:00Z',
      urgency: 'urgent'
    },
    {
      id: 'environment-006',
      title: 'Pollution Patrol',
      category: 'Environment and Animal',
      location: 'South Park',
      distance: '2.3 miles',
      createdAt: '2023-04-10T16:45:00Z',
      urgency: 'medium'
    }
  ];


  // Mock data
  const acceptedRequests = [
    {
      id: 'disaster-002',
      title: 'Flood Relief Force',
      category: 'Disaster Relief',
      location: 'Relief Warehouse',
      requesterName: 'Eliza W.',
      createdAt: '2023-04-14T08:10:00Z',
      status: 'in_progress',
      urgency: 'urgent'
    },
    {
      id: 'youth-001',
      title: 'Dream Builders',
      category: 'Children and Youth',
      location: 'Youth Resource Center',
      requesterName: 'Sophia B.',
      createdAt: '2023-04-13T13:30:00Z',
      status: 'scheduled',
      urgency: 'medium'
    },
    {
      id: 'elderly-001',
      title: 'Golden Years Support',
      category: 'Elderly Care',
      location: 'Elderly Care Home',
      requesterName: 'Noah F.',
      createdAt: '2023-04-12T12:00:00Z',
      status: 'completed',
      urgency: 'medium'
    },
    {
      id: 'volunteer-001',
      title: 'Hearts in Action',
      category: 'Volunteering',
      location: 'Volunteer Office',
      requesterName: 'Avery J.',
      createdAt: '2023-04-16T17:50:00Z',
      status: 'scheduled',
      urgency: 'open'
    }
  ];

  // Categories
  const categories = [
    'Poverty & Hunger', 'Education', 'Health & Medical', 'Environment & Animals',
    'Disaster Relief', 'Children & Youth', 'Elderly Care', 'Volunteering', 'Explore Clubs'
  ];



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
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
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