import { ShieldCheck, AlertTriangle, FileText } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../components/ui/table';
import { Button } from '../../components/ui/button';

const Moderation = () => {
  // Mock data - should come from API in real implementation
  const flaggedContent = [
    { id: 1, title: 'Inappropriate request', type: 'request', status: 'pending', reportedAt: '2023-05-01' },
    { id: 2, title: 'Offensive comment', type: 'comment', status: 'pending', reportedAt: '2023-05-02' }
  ];

  const pendingRequests = [
    { id: 1, title: 'Grocery assistance', category: 'shopping', submittedBy: 'user123', createdAt: '2023-05-01' },
    { id: 2, title: 'Tech support needed', category: 'technical', submittedBy: 'helper456', createdAt: '2023-05-02' }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Content Moderation</h1>
        <p className="text-muted-foreground mt-1">Manage flagged content and pending requests</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Flagged Content</CardTitle>
            <CardDescription>Items reported by users or automated systems</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reported</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {flaggedContent.map(item => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">{item.id}</TableCell>
                    <TableCell>{item.title}</TableCell>
                    <TableCell>{item.type}</TableCell>
                    <TableCell>{item.status}</TableCell>
                    <TableCell>{item.reportedAt}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Review</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Pending Requests</CardTitle>
            <CardDescription>Requests awaiting moderation approval</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Submitted By</TableHead>
                  <TableHead>Created</TableHead>
                  <TableHead>Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pendingRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>{request.title}</TableCell>
                    <TableCell>{request.category}</TableCell>
                    <TableCell>{request.submittedBy}</TableCell>
                    <TableCell>{request.createdAt}</TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">Approve</Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table         >
 </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Moderation;