import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../../components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Input } from '../../components/ui/input';
import { Label } from '../../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../../components/ui/radio-group';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../hooks/use-toast';
import { adminUsers } from './admins.js';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState('requester');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      toast({
        title: 'Password error',
        description: 'Passwords do not match.',
        variant: 'destructive',
      });
      return;
    }
  
    if (role === 'admin') {
      // Check if the email is in the list of admin users
      const isAdmin = adminUsers.some((user) => user.email === email);
      if (!isAdmin) {
        toast({
          title: 'Admin registration error',
          description: 'You are not authorized to register as an admin.',
          variant: 'destructive',
        });
        return;
      }
    }
  
    setIsLoading(true);
    
    try {
      await register(email, password, name, role);
      toast({
        title: 'Registration successful',
        description: 'Welcome to Maadhyam!',
      });
      navigate('/');
    } catch (error) {
      toast({
        title: 'Registration failed',
        description: 'Please try again.',
        variant: 'destructive',
      });
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="flex min-h-screen items-center justify-center bg-maadhyam-gray-light p-4 sm:p-6 lg:p-8">
      <div className="w-full max-w-md space-y-6 my-8">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 rounded-full bg-maadhyam-purple flex items-center justify-center">
            <span className="text-white font-bold text-xl">M</span>
          </div>
          <h1 className="mt-4 text-3xl font-bold">Maadhyam</h1>
          <p className="text-muted-foreground">Connect, Help, Support</p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Enter your details to get started</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  placeholder="John Doe" 
                  value={name} 
                  onChange={(e) => setName(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input 
                  id="email" 
                  type="email" 
                  placeholder="name@example.com" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <Input 
                  id="password" 
                  type="password" 
                  placeholder="••••••••" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirm Password</Label>
                <Input 
                  id="confirmPassword" 
                  type="password" 
                  placeholder="••••••••" 
                  value={confirmPassword} 
                  onChange={(e) => setConfirmPassword(e.target.value)} 
                  required 
                />
              </div>
              <div className="space-y-2">
                <Label>I want to join as</Label>
                <RadioGroup 
                  defaultValue="requester"
                  className="grid grid-cols-2 gap-4 pt-2"
                  onValueChange={(value) => setRole(value)}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="requester" id="requester" />
                    <Label htmlFor="requester" className="cursor-pointer">Requester</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="helper" id="helper" />
                    <Label htmlFor="helper" className="cursor-pointer">Helper</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="supporter" id="supporter" />
                    <Label htmlFor="supporter" className="cursor-pointer">Supporter</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="admin" id="admin" />
                    <Label htmlFor="admin" className="cursor-pointer">Admin</Label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col">
              <Button className="w-full bg-maadhyam-purple hover:bg-maadhyam-purple-dark" disabled={isLoading}>
                {isLoading ? "Creating account..." : "Create Account"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <div className="text-center text-sm">
          Already have an account?{" "}
          <Link to="/login" className="text-maadhyam-purple hover:underline">
            Sign in
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;