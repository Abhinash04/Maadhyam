// pages/requestlibrary.jsx
import { 
    FileText, Heart, PlusCircle, Bell, ChevronDown, ChevronUp, Loader2 
  } from 'lucide-react';
  import { 
    Card, CardContent, CardHeader, CardTitle, CardDescription 
  } from '../../components/ui/card';
  import { Button } from '../../components/ui/button';
  import { Badge } from '../../components/ui/badge';
  import { useToast } from '../../components/ui/use-toast';
  import { Label } from '../../components/ui/label';
  import { Input } from '../../components/ui/input';
  import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
  import { useState } from 'react';
  
  // Categories
  const categories = [
    'Poverty & Hunger', 'Education', 'Health & Medical', 'Environment & Animals',
    'Disaster Relief', 'Children & Youth', 'Elderly Care', 'Volunteering', 'Explore Clubs'
  ];
  
  // Mock Data with new categories
  const requests = [
    {
      id: '1',
      title: 'Emergency food supplies',
      category: 'Poverty & Hunger',
      description: 'Non-perishable food items for families affected by recent floods',
      createdAt: '2023-06-15T10:30:00Z',
      urgency: 'high',
      status: 'open',
      requesterId: 'user987'
    },
    {
      id: '2',
      title: 'School supplies donation',
      category: 'Education',
      description: 'Pens, notebooks, and backpacks for underprivileged students',
      createdAt: '2023-06-14T14:20:00Z',
      urgency: 'medium',
      status: 'open',
      requesterId: 'user886'
    },
    {
      id: '3',
      title: 'Medical equipment',
      category: 'Health & Medical',
      description: 'Basic medical supplies for community health centers',
      createdAt: '2023-06-13T09:45:00Z',
      urgency: 'high',
      status: 'open',
      requesterId: 'user785'
    },
    {
      id: '4',
      title: 'Tree planting initiative',
      category: 'Environment & Animals',
      description: 'Seedlings and tools for community planting events',
      createdAt: '2023-06-12T11:30:00Z',
      urgency: 'low',
      status: 'open',
      requesterId: 'user684'
    },
    {
      id: '5',
      title: 'Winter clothing drive',
      category: 'Poverty & Hunger',
      description: 'Warm clothing for homeless individuals',
      createdAt: '2023-06-11T16:15:00Z',
      urgency: 'medium',
      status: 'open',
      requesterId: 'user583'
    },
    {
      id: '6',
      title: 'Tutoring program',
      category: 'Education',
      description: 'Volunteer tutors needed for after-school programs',
      createdAt: '2023-06-10T09:30:00Z',
      urgency: 'medium',
      status: 'open',
      requesterId: 'user482'
    },
    {
      id: '7',
      title: 'Disaster relief supplies',
      category: 'Disaster Relief',
      description: 'Emergency kits for flood victims',
      createdAt: '2023-06-09T14:45:00Z',
      urgency: 'critical',
      status: 'open',
      requesterId: 'user381'
    },
    {
      id: '8',
      title: 'Art therapy materials',
      category: 'Elderly Care',
      description: 'Craft supplies for senior care facilities',
      createdAt: '2023-06-08T10:20:00Z',
      urgency: 'low',
      status: 'open',
      requesterId: 'user280'
    },
    {
      id: '9',
      title: 'Community garden',
      category: 'Environment & Animals',
      description: 'Tools and seeds for community garden project',
      createdAt: '2023-06-07T15:30:00Z',
      urgency: 'medium',
      status: 'open',
      requesterId: 'user179'
    },
    {
      id: '10',
      title: 'Mentorship program',
      category: 'Children & Youth',
      description: 'Mentors needed for at-risk youth',
      createdAt: '2023-06-06T09:10:00Z',
      urgency: 'medium',
      status: 'open',
      requesterId: 'user078'
    }
  ];
  
  const SupportRequestLibrary = () => {
    const { toast } = useToast();
    const [requestItems, setRequestItems] = useState(requests);
    const [searchTerm, setSearchTerm] = useState('');
    const [filter, setFilter] = useState('all');
    const [showUrgentOnly, setShowUrgentOnly] = useState(false);
  
    const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric'
      });
    };
  
    const filterContent = (items, searchTerm, filter, showUrgentOnly) => {
      return items.filter(item => {
        const matchesSearch = searchTerm.toLowerCase() === '' || 
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
        
        const matchesFilter = filter === 'all' || item.category === filter;
        
        const matchesUrgency = !showUrgentOnly || item.urgency === 'critical' || item.urgency === 'high';
        
        return matchesSearch && matchesFilter && matchesUrgency;
      });
    };
  
    const renderRequestItem = (request) => (
      <Card key={request.id} className="border p-4 space-y-2">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-lg font-medium">{request.title}</h3>
            <p className="text-sm text-muted-foreground">{request.description}</p>
          </div>
          <Badge 
            variant={request.urgency === 'high' ? 'warning' : request.urgency === 'critical' ? 'destructive' : 'secondary'}
          >
            {request.urgency === 'critical' ? 'CRITICAL' : 
             request.urgency === 'high' ? 'URGENT' : 'NORMAL'}
          </Badge>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <span>Requested {formatDate(request.createdAt)}</span>
          <span>•</span>
          <span>{request.category}</span>
        </div>
        <div className="mt-4">
          <Button 
            variant="secondary" 
            onClick={() => {
              toast({
                title: "Help Offered",
                description: `You've offered to help with "${request.title}"`,
              });
            }}
          >
            Offer Help
          </Button>
        </div>
      </Card>
    );
  
    return (
      <div className="space-y-6 p-6">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Request Library</h1>
          <p className="text-muted-foreground mt-1">Browse and respond to requests from those in need</p>
        </div>
  
        {/* Search and Filter */}
        <div className="flex items-center mb-4 space-x-2">
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search requests..."
            className="w-80"
          />
          <Select 
            value={filter} 
            onValueChange={setFilter}
            className="flex-1"
          >
            <SelectTrigger>
              <SelectValue placeholder="Filter by category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map(category => (
                <SelectItem key={category} value={category}>{category}</SelectItem>
              ))}
            </SelectContent>
          </Select>
          <Button variant="ghost" onClick={() => setShowUrgentOnly(!showUrgentOnly)}>
            Show {showUrgentOnly ? 'All' : 'Only Urgent'}
          </Button>
        </div>
  
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Open Requests</CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requestItems.filter(request => request.status === 'open').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Currently needing support
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Urgent Requests</CardTitle>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requestItems.filter(request => request.urgency === 'critical' || request.urgency === 'high').length}
              </div>
              <p className="text-xs text-muted-foreground">
                Need immediate attention
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Recent Requests</CardTitle>
              <Loader2 className="h-4 w-4 text-muted-foreground animate-spin" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {requestItems.filter(request => 
                  new Date(request.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                ).length}
              </div>
              <p className="text-xs text-muted-foreground">
                Posted in last week
              </p>
            </CardContent>
          </Card>
        </div>
  
        {/* Content */}
        <Card>
          <CardContent>
            <div className="space-y-4">
              {filterContent(requestItems, searchTerm, filter, showUrgentOnly).map(renderRequestItem)}
              {filterContent(requestItems, searchTerm, filter, showUrgentOnly).length === 0 && (
                <div className="text-center py-8">
                  <FileText className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                  <h3 className="mt-4 text-lg font-medium">No requests found</h3>
                  <p className="text-sm text-muted-foreground">
                    Check back later for new requests or create your own offer
                  </p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    );
  };
  
  export default SupportRequestLibrary;