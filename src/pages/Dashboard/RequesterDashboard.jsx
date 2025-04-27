import { FileText, Clock, CheckCircle, XCircle, MessageSquare } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { useState, useContext, useEffect } from 'react';
import { useRequests } from '../Requests/RequestsContext';



const RequesterDashboard = () => {
  const { requests } = useRequests();

  // Mock data
  // const recentRequests = [
  //   {
  //     id: '1',
  //     title: 'Need help moving furniture',
  //     category: 'Moving',
  //     status: 'pending',
  //     createdAt: '2023-04-22T10:30:00Z',
  //     urgency: 'medium'
  //   },
  //   {
  //     id: '2',
  //     title: 'Grocery shopping assistance',
  //     category: 'Shopping',
  //     status: 'approved',
  //     createdAt: '2023-04-20T15:45:00Z',
  //     urgency: 'low'
  //   },
  //   {
  //     id: '3',
  //     title: 'Help with computer setup',
  //     category: 'Technical',
  //     status: 'matched',
  //     createdAt: '2023-04-19T09:15:00Z',
  //     urgency: 'high'
  //   },
  //   {
  //     id: '4',
  //     title: 'Plumbing issue in bathroom',
  //     category: 'Home Repair',
  //     status: 'rejected',
  //     createdAt: '2023-04-18T14:20:00Z',
  //     urgency: 'high'
  //   }
  // ];

  const [recentRequests, setRecentRequests] = useState([]);

  useEffect(() => {
    const categoryNames = {
      poverty_and_hunger: 'Poverty and Hunger',
      education: 'Education',
      health_and_medical: 'Health and Medical',
      environment_and_animal: 'Environment and Animal',
      disaster_relief: 'Disaster Relief',
      children_and_youth: 'Children and Youth',
      elderly_care: 'Elderly Care',
      volunteering: 'Volunteering',
      hosting: 'Hosting',
      exploring_clubs_and_activities: 'Exploring Clubs and Activities',
    };

    console.log(requests); // Log to check the requests
    const mappedRequests = requests.map(request => {
      console.log(request.category); // Log category for debugging
      return {
        id: request.id,
        title: request.name,
        category: categoryNames[request.category] ? categoryNames[request.category] : request.category || 'Unknown', // Map category
        status: request.status,
        createdAt: request.createdAt,
        urgency: request.urgency,
      };
    });

    setRecentRequests(mappedRequests); // Update state with the transformed data
  }, [requests]);
  


  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const getStatusBadge = (status) => {
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

  const getUrgencyBadge = (urgency) => {
    switch (urgency) {
      case 'open':
        return <Badge className="bg-blue-500">Open</Badge>;
      case 'medium':
        return <Badge className="bg-yellow-500">Medium</Badge>;
      case 'urgent':
        return <Badge className="bg-red-600">Urgent</Badge>;
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

  const filterContent = (requests, searchTerm, filter) => {
    if (!searchTerm && filter === 'all') return requests;

    return requests.filter(request => {
      const matchesSearch = searchTerm ?
        request.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        request.status.toLowerCase().includes(searchTerm.toLowerCase()) :
        true;

      const matchesFilter = filter === 'all' || request.status === filter;

      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center flex-col sm:flex-row items-center mb-4 gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Requester Dashboard</h1>
        <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
          <Link to="/create-request">Create New Request</Link>
        </Button>
      </div>

      <div className="flex flex-col sm:flex-row items-center mb-4 gap-2">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search requests..."
          className="px-4 py-2 border rounded-lg mr-2 flex-1"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg mr-2"
        >
          <option value="all">All Statuses</option>
          <option value="pending">Pending</option>
          <option value="approved">Approved</option>
          <option value="matched">Matched</option>
          <option value="rejected">Rejected</option>
        </select>
        <Button onClick={() => { setSearchTerm(''); setFilter('all'); }}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Requests</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentRequests.length}</div>
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
            <div className="text-2xl font-bold">
              {recentRequests.filter(req => req.status === 'pending').length}
            </div>
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
            <div className="text-2xl font-bold">
              {
                recentRequests.filter(req =>
                  ['matched', 'approved'].includes(req.status)
                ).length
              }
            </div>
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
            {filterContent(recentRequests, searchTerm, filter).map(request => (
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
            {filterContent(recentRequests, searchTerm, filter).length === 0 && (
              <div className="text-center py-8">
                <XCircle className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No requests found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search filters or create a new request
                </p>
                <Button asChild className="mt-4 bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
                  <Link to="/create-request">Create New Request</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequesterDashboard;