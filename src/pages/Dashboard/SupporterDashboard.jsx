import { Gift, CheckCircle, Heart, PlusCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Badge } from '../../components/ui/badge';
import { Link } from 'react-router-dom';
import { useState } from 'react';

// Mock data
const supportOffers = [
  {
    id: '1',
    title: 'Gently used winter coats',
    category: 'Clothing',
    quantity: 5,
    condition: 'Good',
    createdAt: '2023-04-22T10:30:00Z',
    matches: 2
  },
  {
    id: '2',
    title: 'Basic groceries package',
    category: 'Food',
    description: 'Non-perishable food items',
    createdAt: '2023-04-20T15:45:00Z',
    matches: 0
  },
  {
    id: '3',
    title: 'Free math tutoring',
    category: 'Education',
    description: 'One hour sessions',
    createdAt: '2023-04-19T09:15:00Z',
    matches: 3
  }
];

const SupporterDashboard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const filterContent = (offers, searchTerm, filter) => {
    if (!searchTerm && filter === 'all') return offers;

    return offers.filter(offer => {
      const matchesSearch = searchTerm ? 
        offer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (offer.description && offer.description.toLowerCase().includes(searchTerm.toLowerCase())) : 
        true;

      const matchesFilter = filter === 'all' || offer.category.toLowerCase() === filter.toLowerCase();

      return matchesSearch && matchesFilter;
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Supporter Dashboard</h1>
          <p className="text-muted-foreground mt-2">Offer items or services to those in need</p>
        </div>
        <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
          <Link to="/create-offer">
            <PlusCircle className="mr-2 h-4 w-4" />
            Create New Offer
          </Link>
        </Button>
      </div>

      <div className="flex items-center mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search offers..."
          className="px-4 py-2 border rounded-lg mr-2 flex-1"
        />
        <select
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="px-4 py-2 border rounded-lg mr-2"
        >
          <option value="all">All Categories</option>
          <option value="Clothing">Clothing</option>
          <option value="Food">Food</option>
          <option value="Education">Education</option>
        </select>
        <Button onClick={() => { setSearchTerm(''); setFilter('all'); }}>Reset</Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Offers</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
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
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">
              People you've helped
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completed Donations</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              Thank you for supporting!
            </p>
          </CardContent>
        </Card>
      </div>

      <Card className="col-span-3">
        <CardHeader>
          <CardTitle>Your Support Offers</CardTitle>
          <CardDescription>
            Items and services you've offered to the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filterContent(supportOffers, searchTerm, filter).map(offer => (
              <div key={offer.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="space-y-1">
                  <h4 className="font-medium">{offer.title}</h4>
                  <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                    <Badge variant="outline" className="bg-maadhyam-green-light text-maadhyam-gray-dark">
                      {offer.category}
                    </Badge>
                    <span>•</span>
                    <span>Created on {formatDate(offer.createdAt)}</span>
                  </div>
                  <div className="text-sm pt-1">
                    {offer.matches > 0 ? (
                      <span className="text-green-600">
                        {offer.matches} {offer.matches === 1 ? 'match' : 'matches'} found
                      </span>
                    ) : (
                      <span className="text-muted-foreground">No matches yet</span>
                    )}
                  </div>
                </div>
                <div className="flex space-x-2">
                  {offer.matches > 0 && (
                    <Button variant="outline" size="sm" className="flex items-center">
                      <Heart className="h-4 w-4 mr-1" />
                      View Matches
                    </Button>
                  )}
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Deactivate</Button>
                </div>
              </div>
            ))}
            {filterContent(supportOffers, searchTerm, filter).length === 0 && (
              <div className="text-center py-8">
                <Gift className="mx-auto h-12 w-12 text-muted-foreground opacity-50" />
                <h3 className="mt-4 text-lg font-medium">No offers found</h3>
                <p className="text-sm text-muted-foreground">
                  Try adjusting your search filters or create a new offer
                </p>
                <Button asChild className="mt-4 bg-maadhyam-purple hover:bg-maadhyam-purple-dark">
                  <Link to="/create-offer">Create New Offer</Link>
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="rounded-lg bg-maadhyam-gray-light p-6 border border-dashed border-maadhyam-purple">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div>
            <h3 className="text-lg font-medium">Looking for specific requests?</h3>
            <p className="text-muted-foreground">
              Browse the request library to find people who need items or services you can provide.
            </p>
          </div>
          <Button asChild className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark whitespace-nowrap">
            <Link to="/request-library">Browse Requests</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SupporterDashboard;