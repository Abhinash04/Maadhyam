import { BarChart3, ShieldCheck, Users, AlertTriangle, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { useState } from 'react';

// Mock data
const pendingRequests = [
  {
    id: '1',
    title: 'Need help moving furniture',
    category: 'Moving',
    submittedBy: 'John D.',
    createdAt: '2023-04-22T10:30:00Z',
    urgency: 'medium'
  },
  {
    id: '2',
    title: 'Grocery shopping assistance',
    category: 'Shopping',
    submittedBy: 'Sarah M.',
    createdAt: '2023-04-20T15:45:00Z',
    urgency: 'low'
  },
  {
    id: '3',
    title: 'Help with computer setup',
    category: 'Technical',
    submittedBy: 'Alex T.',
    createdAt: '2023-04-19T09:15:00Z',
    urgency: 'high'
  },
];

const flaggedContent = [
  {
    id: '1',
    contentType: 'Request',
    title: 'Inappropriate request content',
    reportedBy: 'Moderator System',
    createdAt: '2023-04-21T14:30:00Z',
    status: 'pending'
  },
  {
    id: '2',
    contentType: 'Message',
    title: 'Suspicious communication',
    reportedBy: 'User Report',
    createdAt: '2023-04-20T10:15:00Z',
    status: 'pending'
  },
];

const userVerifications = [
  {
    id: '1',
    name: 'Robert Johnson',
    email: 'robert@example.com',
    role: 'helper',
    registeredAt: '2023-04-18T09:30:00Z',
  },
  {
    id: '2',
    name: 'Emma Wilson',
    email: 'emma@example.com',
    role: 'supporter',
    registeredAt: '2023-04-17T14:45:00Z',
  },
];

// Analytics mock data
const weeklyActivity = [
  { day: 'Mon', requests: 12, offers: 8, matches: 5 },
  { day: 'Tue', requests: 19, offers: 10, matches: 7 },
  { day: 'Wed', requests: 15, offers: 12, matches: 8 },
  { day: 'Thu', requests: 18, offers: 15, matches: 10 },
  { day: 'Fri', requests: 22, offers: 18, matches: 12 },
  { day: 'Sat', requests: 14, offers: 9, matches: 6 },
  { day: 'Sun', requests: 10, offers: 7, matches: 4 },
];

const categoryData = [
  { name: 'Moving', count: 35 },
  { name: 'Shopping', count: 28 },
  { name: 'Technical', count: 22 },
  { name: 'Home Repair', count: 18 },
  { name: 'Education', count: 15 },
  { name: 'Other', count: 12 },
];

const AdminDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('pending');

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

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filterContent = (content, searchTerm) => {
    if (!searchTerm) return content;
    return content.filter(item => 
      Object.values(item).some(value => 
        value != null && value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Admin Dashboard</h1>
        <p className="text-muted-foreground mt-1">Platform overview and moderation</p>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search..."
          className="px-4 py-2 border rounded-lg mr-2 flex-1"
        />
        <Button onClick={() => setSelectedTab('pending')}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Moderation</CardTitle>
            <ShieldCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              Requires your attention
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">245</div>
            <p className="text-xs text-muted-foreground">
              +12 from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Flagged Content</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">
              Needs review
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">132</div>
            <p className="text-xs text-muted-foreground">
              +23 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Weekly Activity</CardTitle>
            <CardDescription>Platform activity over the past week</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={weeklyActivity}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="requests" stroke="#8884d8" name="Requests" />
                <Line type="monotone" dataKey="offers" stroke="#82ca9d" name="Offers" />
                <Line type="monotone" dataKey="matches" stroke="#ffc658" name="Matches" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Categories</CardTitle>
            <CardDescription>Distribution by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={categoryData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#9b87f5" name="Requests" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="pending" onValueChange={setSelectedTab}>
        <TabsList className="grid grid-cols-3 mb-4">
          <TabsTrigger value="pending">Pending Requests</TabsTrigger>
          <TabsTrigger value="flagged">Flagged Content</TabsTrigger>
          <TabsTrigger value="verification">User Verifications</TabsTrigger>
        </TabsList>
        
        <TabsContent value="pending">
          <Card>
            <CardHeader>
              <CardTitle>Pending Requests</CardTitle>
              <CardDescription>
                Requests awaiting moderation approval
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {filterContent(pendingRequests, searchTerm).map(request => (
                  <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium">{request.title}</h4>
                        {getUrgencyBadge(request.urgency)}
                      </div>
                      <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                        <span>{request.category}</span>
                        <span>•</span>
                        <span>By {request.submittedBy}</span>
                        <span>•</span>
                        <span>{formatDate(request.createdAt)}</span>
                      </div>
                    </div>
                    <div className="flex space-x-2">
                      <Button variant="outline" size="sm">View Details</Button>
                      <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">Approve</Button>
                      <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-50">Reject</Button>
                    </div>
                  </div>
                ))}
                <div className="text-center pt-4">
                  <Button variant="outline" asChild>
                    <Link to="/moderation">View All Pending</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="flagged">
          <Card>
            <CardHeader>
              <CardTitle>Flagged Content</CardTitle>
              <CardDescription>
                Content that has been flagged for review
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent(flaggedContent, searchTerm).length > 0 ? (
                <div className="space-y-4">
                  {filterContent(flaggedContent, searchTerm).map(item => (
                    <div key={item.id} className="flex items-center justify-between p-4 border border-red-100 bg-red-50 rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{item.title}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <Badge variant="outline" className="bg-red-100 text-red-700 border-red-300">
                            {item.contentType}
                          </Badge>
                          <span>•</span>
                          <span>Reported by {item.reportedBy}</span>
                          <span>•</span>
                          <span>{formatDate(item.createdAt)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">Review</Button>
                        <Button variant="destructive" size="sm">Remove Content</Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <AlertTriangle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No flagged content</h3>
                  <p className="text-sm text-muted-foreground">
                    All content has been reviewed
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="verification">
          <Card>
            <CardHeader>
              <CardTitle>User Verification Requests</CardTitle>
              <CardDescription>
                Users waiting to be verified
              </CardDescription>
            </CardHeader>
            <CardContent>
              {filterContent(userVerifications, searchTerm).length > 0 ? (
                <div className="space-y-4">
                  {filterContent(userVerifications, searchTerm).map(user => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="space-y-1">
                        <h4 className="font-medium">{user.name}</h4>
                        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                          <span>{user.email}</span>
                          <span>•</span>
                          <Badge>
                            {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                          </Badge>
                          <span>•</span>
                          <span>Registered on {formatDate(user.registeredAt)}</span>
                        </div>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">View Profile</Button>
                        <Button variant="outline" size="sm" className="border-green-500 text-green-600 hover:bg-green-50">
                          Verify User
                        </Button>
                        <Button variant="outline" size="sm" className="border-red-500 text-red-600 hover:bg-red-50">
                          Reject
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No pending verifications</h3>
                  <p className="text-sm text-muted-foreground">
                    All users have been verified
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

export default AdminDashboard;