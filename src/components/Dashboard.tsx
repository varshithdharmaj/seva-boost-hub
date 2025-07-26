import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { 
  FileText, 
  CheckCircle, 
  Clock, 
  Upload, 
  Search, 
  CreditCard, 
  User, 
  LogOut,
  Bell,
  BarChart3,
  Download
} from "lucide-react";
import panLogo from "@/assets/pan-logo.png";
import { FloatingElements } from "@/components/FloatingElements";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("services");
  const { toast } = useToast();

  const handleServiceClick = (serviceName: string) => {
    toast({
      title: `${serviceName} Service`,
      description: `${serviceName} feature would be implemented here with full functionality.`,
    });
  };

  const services = [
    {
      title: "Apply for New PAN",
      description: "Submit a new PAN card application",
      icon: FileText,
      status: "available",
      color: "primary"
    },
    {
      title: "PAN Verification",
      description: "Verify your PAN card details",
      icon: CheckCircle,
      status: "available",
      color: "success"
    },
    {
      title: "Track Application",
      description: "Check your application status",
      icon: Search,
      status: "available",
      color: "warning"
    },
    {
      title: "Download PAN",
      description: "Download your digital PAN card",
      icon: Download,
      status: "available",
      color: "accent"
    }
  ];

  const applications = [
    {
      id: "PAN001234",
      type: "New PAN Application",
      status: "Under Review",
      date: "2024-01-15",
      color: "warning"
    },
    {
      id: "PAN001233",
      type: "PAN Correction",
      status: "Approved",
      date: "2024-01-10",
      color: "success"
    },
    {
      id: "PAN001232",
      type: "Duplicate PAN",
      status: "Processing",
      date: "2024-01-08",
      color: "primary"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 relative">
      <FloatingElements />
      {/* Header */}
      <header className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary p-2">
              <img 
                src={panLogo} 
                alt="PAN Seva" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              PAN Seva Dashboard
            </h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <User className="h-5 w-5" />
            </Button>
            <Button onClick={onLogout} variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Welcome back!</h2>
          <p className="text-muted-foreground">Manage your PAN card services and applications</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-muted/50">
            <TabsTrigger value="services">Services</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="documents">Documents</TabsTrigger>
            <TabsTrigger value="profile">Profile</TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-border/50 bg-gradient-card"
                  onClick={() => handleServiceClick(service.title)}
                >
                  <CardHeader className="pb-3">
                    <div className={`w-12 h-12 rounded-lg bg-${service.color}/10 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                      <service.icon className={`h-6 w-6 text-${service.color}`} />
                    </div>
                    <CardTitle className="text-lg">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Badge variant="secondary" className="text-xs">
                      {service.status}
                    </Badge>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="shadow-soft bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>Quick Stats</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="text-center p-4 rounded-lg bg-primary/5">
                    <div className="text-2xl font-bold text-primary">3</div>
                    <div className="text-sm text-muted-foreground">Active Applications</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-success/5">
                    <div className="text-2xl font-bold text-success">12</div>
                    <div className="text-sm text-muted-foreground">Completed Services</div>
                  </div>
                  <div className="text-center p-4 rounded-lg bg-accent/5">
                    <div className="text-2xl font-bold text-accent">1</div>
                    <div className="text-sm text-muted-foreground">Pending Verification</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="space-y-4">
              {applications.map((app, index) => (
                <Card key={index} className="shadow-soft bg-gradient-card border-border/50">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">{app.type}</h3>
                        <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                        <p className="text-sm text-muted-foreground">Submitted: {app.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge variant={app.color === "success" ? "default" : "secondary"} className={`bg-${app.color}/10 text-${app.color}`}>
                          {app.status}
                        </Badge>
                        <div className="mt-2">
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <Card className="shadow-soft bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Upload className="h-5 w-5 text-primary" />
                  <span>Upload Documents</span>
                </CardTitle>
                <CardDescription>
                  Upload required documents for your PAN application
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">Drag and drop files here or click to browse</p>
                  <Button variant="outline">
                    Choose Files
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <Card className="shadow-soft bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle>Profile Information</CardTitle>
                <CardDescription>Manage your account details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <p className="text-muted-foreground">John Doe</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <p className="text-muted-foreground">john.doe@example.com</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">PAN Number</label>
                    <p className="text-muted-foreground">ABCDE1234F</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">Mobile</label>
                    <p className="text-muted-foreground">+91 98765 43210</p>
                  </div>
                </div>
                <div className="pt-4">
                  <Button>Edit Profile</Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};