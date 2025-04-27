import { BarChart, PieChart, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { LineChart, Line, BarChart as RechartsBar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, Pie, PieChart as RechartsPie } from 'recharts';
// import { Badge } from '../../components/ui/badge';

const Analytics = () => {
  // Mock data - should come from API in real implementation
  const userGrowthData = [
    { month: 'Jan', newUsers: 120 },
    { month: 'Feb', newUsers: 150 },
    { month: 'Mar', newUsers: 180 },
    { month: 'Apr', newUsers: 220 },
    { month: 'May', newUsers: 250 },
  ];

  const requestDistributionData = [
    { name: 'Poverty and Hunger', value: 35 },
    { name: 'Education', value: 28 },
    { name: 'Health and Medical', value: 22 },
    { name: 'Environment and Animal', value: 18 },
    { name: 'Disaster Relief', value: 15 },
    { name: 'Children and Youth', value: 12 },
    { name: 'Elderly Care', value: 10 },
    { name: 'Volunteering', value: 8 },
    { name: 'Hosting', value: 6 },
    { name: 'Exploring Clubs and Activities', value: 4 }
  ];
  

  const activityTrendData = [
    { day: 'Mon', requests: 12, matches: 5 },
    { day: 'Tue', requests: 19, matches: 7 },
    { day: 'Wed', requests: 15, matches: 8 },
    { day: 'Thu', requests: 18, matches: 10 },
    { day: 'Fri', requests: 22, matches: 12 },
    { day: 'Sat', requests: 14, matches: 6 },
    { day: 'Sun', requests: 10, matches: 4 }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Platform Analytics</h1>
        <p className="text-muted-foreground mt-1">Key metrics and trends across the platform</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Total Users</CardTitle>
            <CardDescription>Registered users on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,456</div>
            <p className="text-sm text-muted-foreground">
              <TrendingUp className="text-green-500 mr-1" /> 12.5% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Total Requests</CardTitle>
            <CardDescription>Requests created on the platform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3,287</div>
            <p className="text-sm text-muted-foreground">
              <TrendingUp className="text-green-500 mr-1" /> 8.3% from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Successful Matches</CardTitle>
            <CardDescription>Successfully connected requests and offers</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,845</div>
            <p className="text-sm text-muted-foreground">
              <TrendingUp className="text-green-500 mr-1" /> 15.7% from last month
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>User Growth</CardTitle>
            <CardDescription>Monthly new user registrations</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={userGrowthData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="newUsers" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Request Distribution</CardTitle>
            <CardDescription>Breakdown by category</CardDescription>
          </CardHeader>
          <CardContent className="h-80">
            <ResponsiveContainer width="100%" height="100%">
              <RechartsPie width={400} height={400}>
                <Pie
                  data={requestDistributionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${Math.floor(percent * 100)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                />
                <Tooltip />
              </RechartsPie>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Weekly Activity</CardTitle>
          <CardDescription>Platform activity trends throughout the week</CardDescription>
        </CardHeader>
        <CardContent className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <RechartsBar data={activityTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="day" />
              <YAxis />
              <Tooltip />
              <Legend />
              <RechartsBar dataKey="requests" fill="#8884d8" name="Requests" />
              <RechartsBar dataKey="matches" fill="#82ca9d" name="Matches" />
            </RechartsBar>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default Analytics;