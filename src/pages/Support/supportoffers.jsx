// pages/supportoffers.jsx
import { 
  Gift, CheckCircle, Heart, PlusCircle, FileText, 
  Bell, ChevronDown, ChevronUp, Loader2 
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
import { Textarea } from '../../components/ui/textarea';
import { useState } from 'react';

// Categories
const categories = [
  'Poverty & Hunger', 'Education', 'Health & Medical', 'Environment & Animals',
  'Disaster Relief', 'Children & Youth', 'Elderly Care', 'Volunteering', 'Explore Clubs'
];

// Mock Data with new categories
const supportOffers = [
  {
      id: '1',
      title: 'Monthly food packages',
      category: 'Poverty & Hunger',
      description: 'Delivered every month to families in need',
      quantity: 15,
      condition: 'New',
      createdAt: '2023-06-15T10:30:00Z',
      matches: 5,
      isActive: true,
      donorId: 'user123'
  },
  {
      id: '2',
      title: 'School supplies donation',
      category: 'Education',
      description: 'New pens, notebooks, and backpacks for students',
      quantity: 100,
      condition: 'New',
      createdAt: '2023-06-10T14:20:00Z',
      matches: 3,
      isActive: true,
      donorId: 'user456'
  },
  {
      id: '3',
      title: 'Medical supply donations',
      category: 'Health & Medical',
      description: 'Gloves, masks, and basic medications',
      quantity: 200,
      condition: 'New',
      createdAt: '2023-06-05T09:45:00Z',
      matches: 8,
      isActive: true,
      donorId: 'user789'
  },
  {
      id: '4',
      title: 'Tree planting kits',
      category: 'Environment & Animals',
      description: 'Seedlings and tools for community planting events',
      quantity: 50,
      condition: 'New',
      createdAt: '2023-06-01T11:30:00Z',
      matches: 2,
      isActive: true,
      donorId: 'user101'
  },
  {
      id: '5',
      title: 'Winter clothing drive',
      category: 'Poverty & Hunger',
      description: 'Gently used winter coats, hats, and gloves',
      quantity: 75,
      condition: 'Good',
      createdAt: '2023-05-28T16:15:00Z',
      matches: 6,
      isActive: false,
      donorId: 'user202'
  },
  {
      id: '6',
      title: 'STEM mentoring program',
      category: 'Education',
      description: 'Weekly online tutoring for high school students',
      quantity: null,
      condition: null,
      createdAt: '2023-05-20T09:30:00Z',
      matches: 4,
      isActive: true,
      donorId: 'user303'
  },
  {
      id: '7',
      title: 'Disaster relief funds',
      category: 'Disaster Relief',
      description: 'Financial assistance for flood victims',
      quantity: null,
      condition: null,
      createdAt: '2023-05-15T14:45:00Z',
      matches: 10,
      isActive: true,
      donorId: 'user404'
  },
  {
      id: '8',
      title: 'Art supplies for seniors',
      category: 'Elderly Care',
      description: 'Paints, canvases, and craft materials',
      quantity: 40,
      condition: 'New',
      createdAt: '2023-05-10T10:20:00Z',
      matches: 1,
      isActive: true,
      donorId: 'user505'
  },
  {
      id: '9',
      title: 'Community garden tools',
      category: 'Environment & Animals',
      description: 'Shovels, rakes, and gardening kits',
      quantity: 30,
      condition: 'Like New',
      createdAt: '2023-05-05T15:30:00Z',
      matches: 3,
      isActive: true,
      donorId: 'user606'
  },
  {
      id: '10',
      title: 'After-school program volunteers',
      category: 'Volunteering',
      description: 'Mentors needed for after-school activities',
      quantity: null,
      condition: null,
      createdAt: '2023-04-28T09:10:00Z',
      matches: 7,
      isActive: true,
      donorId: 'user707'
  }
];

const SupportOffersPage = () => {
  const { toast } = useToast();
  const [offers, setOffers] = useState(supportOffers);
  const [activeOffersOnly, setActiveOffersOnly] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [isCreatingOffer, setIsCreatingOffer] = useState(false);

  const formatDate = (dateStr) => {
      return new Date(dateStr).toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric'
      });
  };

  const filterContent = (items, searchTerm, filter, showActiveOnly) => {
      return items.filter(item => {
          const matchesSearch = searchTerm.toLowerCase() === '' || 
              item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
              (item.description && item.description.toLowerCase().includes(searchTerm.toLowerCase()));
          
          const matchesFilter = filter === 'all' || item.category === filter;
          
          const matchesActiveStatus = !showActiveOnly || item.isActive;
          
          return matchesSearch && matchesFilter && matchesActiveStatus;
      });
  };

  const toggleOfferStatus = (offerId) => {
      setOffers(offers.map(offer => 
          offer.id === offerId ? {...offer, isActive: !offer.isActive} : offer
      ));
  };

  const handleCreateOffer = (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const newOffer = {
          id: Date.now().toString(),
          title: formData.get('title'),
          category: formData.get('category'),
          description: formData.get('description'),
          quantity: formData.get('quantity') ? parseInt(formData.get('quantity')) : null,
          condition: formData.get('condition'),
          createdAt: new Date().toISOString(),
          matches: 0,
          isActive: true,
          donorId: 'currentUser' // Replace with actual user ID
      };

      setOffers([...offers, newOffer]);
      setIsCreatingOffer(false);
      toast({
          title: "Offer Created",
          description: "Your offer is now active in the community!",
      });
      e.target.reset();
  };

  const renderOfferDetail = (offer) => (
      <div key={offer.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex justify-between items-center">
              <div>
                  <h3 className="text-lg font-medium">{offer.title}</h3>
                  <p className="text-sm text-muted-foreground">{offer.description}</p>
              </div>
              <Badge variant="outline">{offer.category}</Badge>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <span>Posted {formatDate(offer.createdAt)}</span>
              {offer.quantity && <span>• {offer.quantity} available</span>}
              {offer.condition && <span>• {offer.condition}</span>}
          </div>
          <div className="mt-2">
              {offer.matches > 0 ? (
                  <div className="flex items-center gap-2 text-green-600">
                      <Heart className="h-4 w-4" />
                      <span>
                          {offer.matches} {offer.matches === 1 ? 'match' : 'matches'}
                      </span>
                  </div>
              ) : (
                  <p className="text-muted-foreground">Waiting for matches...</p>
              )}
          </div>
          <div className="mt-4 flex justify-between">
              <div>
                  <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => toggleOfferStatus(offer.id)}
                  >
                      {offer.isActive ? 'Deactivate' : 'Reactivate'}
                  </Button>
                  <Button 
                      variant="secondary" 
                      size="sm"
                      className="ml-2"
                      onClick={() => {/* Open edit form */}}
                  >
                      Edit
                  </Button>
              </div>
              <Button 
                  variant="outline" 
                  size="sm"
                  onClick={() => {/* View matches */}}
              >
                  View Matches
              </Button>
          </div>
      </div>
  );

  return (
      <div className="space-y-6 p-6">
          {/* Header */}
          <div>
              <h1 className="text-3xl font-bold tracking-tight">Your Support Offers</h1>
              <p className="text-muted-foreground mt-1">Items and services you've offered to the community</p>
          </div>

          {/* Search and Filter */}
          <div className="flex items-center mb-4 space-x-2">
              <Input
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search offers..."
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
              <Button variant="ghost" onClick={() => setActiveOffersOnly(!activeOffersOnly)}>
                  Show {activeOffersOnly ? 'All' : 'Only Active'}
              </Button>
              <Button 
                  variant="secondary" 
                  className="ml-2"
                  onClick={() => setIsCreatingOffer(true)}
              >
                  <PlusCircle className="mr-2" />
                  Create Offer
              </Button>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
                      <Gift className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">
                          {offers.filter(offer => offer.isActive).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                          Currently available
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Total Matches</CardTitle>
                      <Heart className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">
                          {offers.reduce((sum, offer) => sum + offer.matches, 0)}
                      </div>
                      <p className="text-xs text-muted-foreground">
                          People you've helped
                      </p>
                  </CardContent>
              </Card>
              <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Recent Activity</CardTitle>
                      <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                      <div className="text-2xl font-bold">
                          {offers.filter(offer => 
                              new Date(offer.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                          ).length}
                      </div>
                      <p className="text-xs text-muted-foreground">
                          Offers created in last week
                      </p>
                  </CardContent>
              </Card>
          </div>

          {/* Content */}
          <Card>
              <CardContent>
                  <div className="space-y-4">
                      {filterContent(
                          offers, 
                          searchTerm, 
                          filter, 
                          activeOffersOnly
                      ).map(renderOfferDetail)}
                      {filterContent(offers, searchTerm, filter, activeOffersOnly).length === 0 && (
                          <div className="text-center py-8">
                              <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                              <h3 className="mt-4 text-lg font-medium">
                                  {activeOffersOnly 
                                      ? 'No active offers found' 
                                      : 'No offers found'}
                              </h3>
                              <p className="text-sm text-muted-foreground">
                                  Try adjusting your filters or create a new offer
                              </p>
                              <Button 
                                  variant="secondary" 
                                  className="mt-4"
                                  onClick={() => setIsCreatingOffer(true)}
                              >
                                  Create New Offer
                              </Button>
                          </div>
                      )}
                  </div>
              </CardContent>
          </Card>

          {/* Create Offer Form Modal */}
          {isCreatingOffer && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
                  <Card className="w-full max-w-lg">
                      <CardHeader>
                          <CardTitle>Create New Offer</CardTitle>
                          <CardDescription>Share what you can provide to help others</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <form onSubmit={handleCreateOffer}>
                              <div className="space-y-4">
                                  <div>
                                      <Label htmlFor="title">Offer Title</Label>
                                      <Input 
                                          id="title" 
                                          name="title" 
                                          placeholder="e.g., 'Gently used winter coats'" 
                                          required 
                                      />
                                  </div>
                                  <div>
                                      <Label htmlFor="category">Category</Label>
                                      <Select name="category" required>
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select category" />
                                          </SelectTrigger>
                                          <SelectContent>
                                              {categories.map(category => (
                                                  <SelectItem key={category} value={category}>{category}</SelectItem>
                                              ))}
                                          </SelectContent>
                                      </Select>
                                  </div>
                                  <div>
                                      <Label htmlFor="description">Description</Label>
                                      <Textarea 
                                          id="description" 
                                          name="description" 
                                          placeholder="Add details about your offer..." 
                                          rows={3} 
                                      />
                                  </div>
                                  <div>
                                      <Label htmlFor="quantity">Quantity (optional)</Label>
                                      <Input 
                                          id="quantity" 
                                          name="quantity" 
                                          type="number" 
                                          min="1" 
                                      />
                                  </div>
                                  <div>
                                      <Label htmlFor="condition">Condition (optional)</Label>
                                      <Select name="condition">
                                          <SelectTrigger>
                                              <SelectValue placeholder="Select condition" />
                                          </SelectTrigger>
                                          <SelectContent>
                                              <SelectItem value="New">New</SelectItem>
                                              <SelectItem value="Like New">Like New</SelectItem>
                                              <SelectItem value="Good">Good</SelectItem>
                                              <SelectItem value="Fair">Fair</SelectItem>
                                          </SelectContent>
                                      </Select>
                                  </div>
                              </div>
                              <div className="mt-4 flex justify-between">
                                  <Button 
                                      variant="ghost" 
                                      type="button"
                                      onClick={() => setIsCreatingOffer(false)}
                                  >
                                      Cancel
                                  </Button>
                                  <Button type="submit">
                                      Create Offer
                                  </Button>
                              </div>
                          </form>
                      </CardContent>
                  </Card>
              </div>
          )}
      </div>
  );
};

export default SupportOffersPage;