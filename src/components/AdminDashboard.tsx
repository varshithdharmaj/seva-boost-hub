import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface AdminDashboardProps {
  onBack: () => void;
}

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
            <p className="text-muted-foreground">Admin features will be implemented here including application tracking, user management, and system analytics.</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};