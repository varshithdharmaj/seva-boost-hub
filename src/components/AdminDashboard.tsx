import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download } from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

interface AdminDashboardProps {
  onBack: () => void;
}

const mockApplications = [
  { id: "PAN-12345678", name: "Rajesh Kumar", date: "2024-07-28", status: "In Progress" },
  { id: "PAN-87654321", name: "Priya Sharma", date: "2024-07-27", status: "Approved" },
  { id: "PAN-11223344", name: "Amit Patel", date: "2024-07-26", status: "Rejected" },
];

export const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Button onClick={onBack} variant="outline" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
        </div>
        
        <Card className="shadow-soft bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle>Application Management</CardTitle>
            <CardDescription>Monitor and manage all PAN applications</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Application ID</TableHead>
                  <TableHead>Applicant Name</TableHead>
                  <TableHead>Submission Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell>{app.id}</TableCell>
                    <TableCell>{app.name}</TableCell>
                    <TableCell>{app.date}</TableCell>
                    <TableCell>
                      <Badge variant={
                        app.status === "Approved" ? "default" :
                        app.status === "Rejected" ? "destructive" :
                        "secondary"
                      }>{app.status}</Badge>
                    </TableCell>
                    <TableCell>
                      <Button variant="outline" size="sm">
                        <Download className="h-4 w-4 mr-2" />
                        Download Documents
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};