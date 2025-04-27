import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Badge } from '../../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { FileText, Plus, Search } from 'lucide-react';
import { useRequests } from '../Requests/RequestsContext';

const RequestList = () => {
  const { requests } = useRequests();

  const [searchQuery, setSearchQuery] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [activeTab, setActiveTab] = useState('active');
  const [recentRequests, setRecentRequests] = useState([]); // State for filtered and mapped requests

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

  // Function to determine the status badge
  const getStatusBadge = (status) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-300">Pending Review</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-300">Approved</Badge>;
      case 'matched':
        return <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">Matched</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-purple-50 text-purple-700 border-purple-300">Completed</Badge>;
      case 'cancelled':
        return <Badge variant="outline" className="bg-gray-100 text-gray-700 border-gray-300">Cancelled</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-50 text-red-700 border-red-300">Rejected</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  // Function to determine the urgency badge
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

  // Function to format the date
  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

    // Categories
    const categories = [
      'Poverty & Hunger', 'Education', 'Health & Medical', 'Environment & Animals',
      'Disaster Relief', 'Children & Youth', 'Elderly Care', 'Volunteering', 'Explore Clubs'
    ];

  // Filter the requests based on search, category, and status filters
  const filterRequests = (requests) => {
    return requests.filter(request => {
      const title = request.title ? request.title.toLowerCase() : '';
      const category = categoryNames[request.category] ? categoryNames[request.category] : request.category || 'Unknown';
      const matchesSearch = title.includes(searchQuery.toLowerCase()) ||
                            category.includes(searchQuery.toLowerCase());
      const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
      const matchesStatus = statusFilter === 'all' || request.status === statusFilter;
      return matchesSearch && matchesCategory && matchesStatus;
    });
  };

  useEffect(() => {
    // Every time `requests` changes, run this effect
    const recentRequests = requests.map(request => {
      const category = categoryNames[request.category] ? categoryNames[request.category] : request.category || 'Unknown';
      return {
        ...request,
        category,
      };
    });
    setRecentRequests(recentRequests);
  }, [requests]); // Re-run when `requests` changes

  // Separate active and past requests based on their status
  const activeRequests = recentRequests.filter(request => ['pending', 'approved', 'matched'].includes(request.status));
  const pastRequests = recentRequests.filter(request => ['completed', 'cancelled', 'rejected'].includes(request.status));

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">My Requests</h1>
          <p className="text-muted-foreground mt-1">
            Manage and track your help requests
          </p>
        </div>
        <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark md:self-start whitespace-nowrap">
          <Link to="/create-request">
            <Plus className="mr-2 h-4 w-4" />
            New Request
          </Link>
        </Button>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative w-full md:w-64">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search requests..." 
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} 
          />
        </div>
        <div className="flex flex-1 gap-4">
          <Select value={categoryFilter} onValueChange={setCategoryFilter}>
            <SelectTrigger className="w-full md:w-40">
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

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-40">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="pending">Pending Review</SelectItem>
              <SelectItem value="approved">Approved</SelectItem>
              <SelectItem value="matched">Matched</SelectItem>
              <SelectItem value="completed">Completed</SelectItem>
              <SelectItem value="cancelled">Cancelled</SelectItem>
              <SelectItem value="rejected">Rejected</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="active" onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-2 mb-4">
          <TabsTrigger value="active">Active Requests</TabsTrigger>
          <TabsTrigger value="past">Past Requests</TabsTrigger>
        </TabsList>

        <TabsContent value="active">
          {activeRequests.length > 0 ? (
            <div className="space-y-4">
              {filterRequests(activeRequests).map(request => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg card-hover">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{request.name}</h4>
                      {getUrgencyBadge(request.urgency)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{request.category}</span>
                      <span>•</span>
                      <span>Created on {formatDate(request.createdAt)}</span>
                    </div>
                    <div className="pt-1">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/requests/${request.id}`}>
                        View Details
                      </Link>
                    </Button>
                    {request.status === 'matched' && (
                      <Button size="sm" className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
                        Message Helper
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-background">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
              <h3 className="mt-4 text-lg font-medium">No active requests</h3>
              <p className="text-sm text-muted-foreground mb-4">
                You don't have any active help requests yet
              </p>
              <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
                <Link to="/create-request">
                  <Plus className="mr-2 h-4 w-4" />
                  Create New Request
                </Link>
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="past">
          {pastRequests.length > 0 ? (
            <div className="space-y-4">
              {filterRequests(pastRequests).map(request => (
                <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg card-hover">
                  <div className="space-y-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium">{request.title}</h4>
                      {getUrgencyBadge(request.urgency)}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <span>{request.category}</span>
                      <span>•</span>
                      <span>Created on {formatDate(request.createdAt)}</span>
                    </div>
                    <div className="pt-1">
                      {getStatusBadge(request.status)}
                    </div>
                  </div>
                  <Button variant="outline" size="sm" asChild>
                    <Link to={`/requests/${request.id}`}>
                      View Details
                    </Link>
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12 border rounded-lg bg-background">
              <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-30" />
              <h3 className="mt-4 text-lg font-medium">No past requests</h3>
              <p className="text-sm text-muted-foreground">
                Your completed or cancelled requests will appear here
              </p>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default RequestList;
