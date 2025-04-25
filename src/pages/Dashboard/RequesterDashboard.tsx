
import { FileText, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

// Mock data
const recentRequests = [
  {
    id: '1',
    title: 'Need help moving furniture',
    category: 'Moving',
    status: 'pending',
    createdAt: '2023-04-22T10:30:00Z',
    urgency: 'medium'
  },
  {
    id: '2',
    title: 'Grocery shopping assistance',
    category: 'Shopping',
    status: 'approved',
    createdAt: '2023-04-20T15:45:00Z',
    urgency: 'low'
  },
  {
    id: '3',
    title: 'Help with computer setup',
    category: 'Technical',
    status: 'matched',
    createdAt: '2023-04-19T09:15:00Z',
    urgency: 'high'
  },
  {
    id: '4',
    title: 'Plumbing issue in bathroom',
    category: 'Home Repair',
    status: 'rejected',
    createdAt: '2023-04-18T14:20:00Z',
    urgency: 'high'
  }
];

const RequesterDashboard = () => {
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Approved</Badge>;
      case 'matched':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Matched</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };
  
  const getUrgencyBadge = (urgency: string) => {
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

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Requester Dashboard</h1>
        <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
          <Link to="/create-request">Create New Request</Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Requests</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Awaiting review or match
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Requests</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +3 from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Recent Requests</CardTitle>
          <CardDescription>
            A summary of your recent help requests
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentRequests.map(request => (
              <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium">{request.title}</h4>
                    {getUrgencyBadge(request.urgency)}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <span>{request.category}</span>
                    <span>•</span>
                    <span>{formatDate(request.createdAt)}</span>
                  </div>
                  <div className="pt-1">
                    {getStatusBadge(request.status)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {request.status === 'matched' && (
                    <Button variant="outline" size="sm" className="flex items-center space-x-1">
                      <MessageSquare className="h-4 w-4" />
                      <span>Message</span>
                    </Button>
                  )}
                  <Button variant="outline" size="sm">View Details</Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequesterDashboard;
