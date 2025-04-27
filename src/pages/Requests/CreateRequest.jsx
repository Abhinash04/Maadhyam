import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { Textarea } from '../../components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { useToast } from '../../hooks/use-toast';
import { useRequests } from './RequestsContext';

const CreateRequest = () => {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [urgency, setUrgency] = useState('medium');
  const [photo, setPhoto] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { addRequest } = useRequests();

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
    exploring_clubs_and_activities: 'Exploring Clubs and Activities'
  };

  const categories = [
    { name: 'Poverty and Hunger', value: 'poverty_and_hunger' },
    { name: 'Education', value: 'education' },
    { name: 'Health and Medical', value: 'health_and_medical' },
    { name: 'Environment and Animal', value: 'environment_and_animal' },
    { name: 'Disaster Relief', value: 'disaster_relief' },
    { name: 'Children and Youth', value: 'children_and_youth' },
    { name: 'Elderly Care', value: 'elderly_care' },
    { name: 'Volunteering', value: 'volunteering' },
    { name: 'Hosting', value: 'hosting' },
    { name: 'Exploring Clubs and Activities', value: 'exploring_clubs_and_activities' }
  ];


  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
  
    const newRequest = {
      id: crypto.randomUUID(), // or any unique ID logic
      name,
      category, // This will now hold the category value
      description,
      location,
      urgency,
      createdAt: new Date().toISOString(),
      status: 'pending',
      photo
    };
  
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      addRequest(newRequest);
      
      toast({
        title: 'Request submitted',
        description: 'Your request has been submitted for review.',
      });
      
      navigate('/requests');
    } catch (error) {
      toast({
        title: 'Error',
        description: 'There was an error submitting your request. Please try again.',
        variant: 'destructive',
      });
      console.error('Error submitting request:', error);
    } finally {
      setIsSubmitting(false);
    }
  };
  

  const handlePhotoChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setPhoto(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-3xl mx-auto py-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold tracking-tight">Create Help Request</h1>
        <p className="text-muted-foreground mt-2">
          Fill out the form below to submit your help request to the community
        </p>
      </div>

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle>Request Details</CardTitle>
            <CardDescription>
              Provide clear and detailed information to help others understand your needs
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Request Title</Label>
              <Input
                id="name"
                placeholder="e.g., Need help moving furniture"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((categoryOption) => (
                    <SelectItem key={categoryOption.value} value={categoryOption.value}>
                      {categoryOption.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Describe your request in detail..."
                className="min-h-32"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="location">Location</Label>
                <Input
                  id="location"
                  placeholder="Neighborhood or area"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label>Urgency Level</Label>
                <RadioGroup
                  defaultValue="medium"
                  className="grid grid-cols-3 gap-4 pt-2"
                  onValueChange={setUrgency}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="open" id="open" />
                    <Label htmlFor="open" className="cursor-pointer">Open</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="medium" id="medium" />
                    <Label htmlFor="medium" className="cursor-pointer">Medium</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="high" id="high" />
                    <Label htmlFor="high" className="cursor-pointer">High</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="photo">Upload Photo (Optional)</Label>
              <Input
                id="photo"
                type="file"
                accept="image/*"
                onChange={handlePhotoChange}
              />
              <p className="text-sm text-muted-foreground">
                Adding a photo can help others better understand your request
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button
              variant="outline"
              type="button"
              onClick={() => navigate('/requests')}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-maadhyam-purple hover:bg-maadhyam-purple-dark"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Request'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default CreateRequest;