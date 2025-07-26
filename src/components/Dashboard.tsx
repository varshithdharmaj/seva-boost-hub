import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
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
  Download,
  MessageCircle,
  Phone,
  Shield,
  Globe,
  Camera,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  IndianRupee,
  QrCode,
  FileCheck,
  AlertCircle,
  ChevronRight,
  Home,
  Settings,
  HelpCircle,
  Star,
  Award,
  TrendingUp
} from "lucide-react";
import panLogo from "@/assets/pan-logo.png";
import { FloatingElements } from "@/components/FloatingElements";
import { ConversationalPANForm } from "@/components/ConversationalPANForm";
import { DocumentUpload } from "@/components/DocumentUpload";
import { PaymentSection } from "@/components/PaymentSection";
import { ChatAssistant } from "@/components/ChatAssistant";
import { AdminDashboard } from "@/components/AdminDashboard";

interface DashboardProps {
  onLogout: () => void;
}

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("services");
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("en");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");
  const { toast } = useToast();

  const handleServiceClick = (serviceName: string, requiresAuth = false) => {
    if (requiresAuth && serviceName.includes("Admin")) {
      setUserRole("admin");
      setActiveTab("admin");
      return;
    }
    
    toast({
      title: `${serviceName} Service`,
      description: `${serviceName} feature is now available with enhanced AI capabilities.`,
    });
  };

  const services = [
    {
      title: "New PAN Application",
      description: "AI-guided step-by-step PAN application with voice support",
      icon: FileText,
      status: "Enhanced",
      color: "primary",
      category: "application"
    },
    {
      title: "PAN Verification",
      description: "Instant PAN verification with AI document validation",
      icon: CheckCircle,
      status: "Live",
      color: "success",
      category: "verification"
    },
    {
      title: "Track Application",
      description: "Real-time application tracking with smart notifications",
      icon: Search,
      status: "Active",
      color: "warning",
      category: "tracking"
    },
    {
      title: "Digital PAN Download",
      description: "Secure digital PAN download with QR verification",
      icon: Download,
      status: "Available",
      color: "accent",
      category: "download"
    },
    {
      title: "PAN Correction",
      description: "AI-assisted PAN correction for demographic changes",
      icon: FileCheck,
      status: "New",
      color: "primary",
      category: "correction"
    },
    {
      title: "Document Scanner",
      description: "AI-powered document scanner with quality validation",
      icon: Camera,
      status: "Smart",
      color: "success",
      category: "tools"
    },
    {
      title: "Tax Services",
      description: "Complete tax filing and consultation services",
      icon: IndianRupee,
      status: "Premium",
      color: "warning",
      category: "tax"
    },
    {
      title: "Business Registration",
      description: "Company incorporation and GST registration",
      icon: Award,
      status: "Professional",
      color: "accent",
      category: "business"
    }
  ];

  const applications = [
    {
      id: "PAN001234",
      type: "New PAN Application",
      status: "Documents Verified",
      date: "2024-01-15",
      color: "success",
      progress: 75,
      nextStep: "Payment Processing"
    },
    {
      id: "PAN001233",
      type: "PAN Correction",
      status: "Under Review",
      date: "2024-01-10",
      color: "warning",
      progress: 45,
      nextStep: "Document Verification"
    },
    {
      id: "PAN001232",
      type: "Duplicate PAN",
      status: "Submitted to NSDL",
      date: "2024-01-08",
      color: "primary",
      progress: 90,
      nextStep: "Final Processing"
    }
  ];

  const quickStats = [
    { label: "Active Applications", value: "3", icon: Clock, color: "primary" },
    { label: "Completed Services", value: "12", icon: CheckCircle, color: "success" },
    { label: "Documents Verified", value: "8", icon: Shield, color: "accent" },
    { label: "Savings This Month", value: "₹2,340", icon: TrendingUp, color: "warning" }
  ];

  if (userRole === "admin") {
    return <AdminDashboard onBack={() => setUserRole("user")} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 relative">
      <FloatingElements />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary p-2 animate-float">
              <img 
                src={panLogo} 
                alt="PAN Seva" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                PAN Seva Pro
              </h1>
              <p className="text-xs text-muted-foreground">Professional Tax Services</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
              className={isVoiceEnabled ? "bg-primary/10 text-primary" : ""}
            >
              {isVoiceEnabled ? <Mic className="h-5 w-5" /> : <MicOff className="h-5 w-5" />}
            </Button>
            
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full animate-pulse"></span>
            </Button>
            
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => handleServiceClick("Admin Dashboard", true)}
            >
              <Settings className="h-5 w-5" />
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
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-3xl font-bold mb-2">Welcome back, Rajesh! 🙏</h2>
              <p className="text-muted-foreground">Complete tax and compliance solutions at your fingertips</p>
            </div>
            <Badge variant="secondary" className="bg-gradient-primary/10 text-primary border-primary/20">
              Pro Member
            </Badge>
          </div>
          
          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            {quickStats.map((stat, index) => (
              <Card key={index} className="hover:shadow-soft transition-all duration-300 bg-gradient-card border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg bg-${stat.color}/10`}>
                      <stat.icon className={`h-5 w-5 text-${stat.color}`} />
                    </div>
                    <div>
                      <p className="text-2xl font-bold">{stat.value}</p>
                      <p className="text-xs text-muted-foreground">{stat.label}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 bg-muted/50">
            <TabsTrigger value="services" className="data-[state=active]:bg-gradient-primary data-[state=active]:text-primary-foreground">
              <Home className="w-4 h-4 mr-2" />
              Services
            </TabsTrigger>
            <TabsTrigger value="applications">
              <FileText className="w-4 h-4 mr-2" />
              Applications
            </TabsTrigger>
            <TabsTrigger value="documents">
              <Upload className="w-4 h-4 mr-2" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="payments">
              <CreditCard className="w-4 h-4 mr-2" />
              Payments
            </TabsTrigger>
            <TabsTrigger value="profile">
              <User className="w-4 h-4 mr-2" />
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="services" className="space-y-6">
            {/* Featured Service */}
            <Card className="bg-gradient-hero text-white border-0 shadow-elegant">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-2xl font-bold mb-2">AI-Powered PAN Application</h3>
                    <p className="text-white/90 mb-4">Get your PAN card in 3 days with our smart, voice-guided process</p>
                    <div className="flex items-center space-x-4">
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Star className="w-3 h-3 mr-1" />
                        99% Success Rate
                      </Badge>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        <Shield className="w-3 h-3 mr-1" />
                        Secure & Fast
                      </Badge>
                    </div>
                  </div>
                  <Button variant="secondary" size="lg" className="bg-white text-primary hover:bg-white/90">
                    Start Application
                    <ChevronRight className="w-4 h-4 ml-2" />
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Service Categories */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {services.map((service, index) => (
                <Card 
                  key={index}
                  className="group hover:shadow-elegant transition-all duration-300 cursor-pointer border-border/50 bg-gradient-card hover:scale-[1.02]"
                  onClick={() => handleServiceClick(service.title)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-center justify-between mb-3">
                      <div className={`w-12 h-12 rounded-lg bg-${service.color}/10 flex items-center justify-center group-hover:scale-110 transition-transform`}>
                        <service.icon className={`h-6 w-6 text-${service.color}`} />
                      </div>
                      <Badge variant="secondary" className={`bg-${service.color}/10 text-${service.color} border-${service.color}/20 text-xs`}>
                        {service.status}
                      </Badge>
                    </div>
                    <CardTitle className="text-lg group-hover:text-primary transition-colors">{service.title}</CardTitle>
                    <CardDescription className="text-sm">{service.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground capitalize">{service.category}</span>
                      <ChevronRight className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Process Overview */}
            <Card className="shadow-soft bg-gradient-card border-border/50">
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <BarChart3 className="h-5 w-5 text-primary" />
                  <span>How It Works</span>
                </CardTitle>
                <CardDescription>Our AI-powered process makes PAN application simple and fast</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-3">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2">1. Chat with AI</h4>
                    <p className="text-sm text-muted-foreground">Our AI assistant guides you through each step</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-3">
                      <Camera className="h-8 w-8 text-success" />
                    </div>
                    <h4 className="font-semibold mb-2">2. Smart Document Scan</h4>
                    <p className="text-sm text-muted-foreground">AI validates documents for quality and completeness</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-warning/10 flex items-center justify-center mx-auto mb-3">
                      <CreditCard className="h-8 w-8 text-warning" />
                    </div>
                    <h4 className="font-semibold mb-2">3. Secure Payment</h4>
                    <p className="text-sm text-muted-foreground">Multiple payment options with instant confirmation</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 rounded-full bg-accent/10 flex items-center justify-center mx-auto mb-3">
                      <CheckCircle className="h-8 w-8 text-accent" />
                    </div>
                    <h4 className="font-semibold mb-2">4. Get Your PAN</h4>
                    <p className="text-sm text-muted-foreground">Track progress and receive digital PAN instantly</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="applications" className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-2xl font-bold">Your Applications</h3>
              <Button variant="gradient" className="shadow-soft">
                <FileText className="w-4 h-4 mr-2" />
                New Application
              </Button>
            </div>
            
            <div className="space-y-4">
              {applications.map((app, index) => (
                <Card key={index} className="shadow-soft bg-gradient-card border-border/50 hover:shadow-elegant transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{app.type}</h4>
                        <p className="text-sm text-muted-foreground">Application ID: {app.id}</p>
                        <p className="text-sm text-muted-foreground">Submitted: {app.date}</p>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant={app.color === "success" ? "default" : "secondary"} 
                          className={`bg-${app.color}/10 text-${app.color} border-${app.color}/20 mb-2`}
                        >
                          {app.status}
                        </Badge>
                        <p className="text-xs text-muted-foreground">Next: {app.nextStep}</p>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>{app.progress}%</span>
                      </div>
                      <Progress value={app.progress} className="h-2" />
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <Button variant="outline" size="sm">
                        <Search className="w-4 h-4 mr-2" />
                        Track Status
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="documents" className="space-y-6">
            <DocumentUpload />
          </TabsContent>

          <TabsContent value="payments" className="space-y-6">
            <PaymentSection />
          </TabsContent>

          <TabsContent value="profile" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="shadow-soft bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Profile Information</CardTitle>
                  <CardDescription>Manage your account details</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="text-sm font-medium">Full Name</label>
                      <p className="text-muted-foreground">Rajesh Kumar Sharma</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Email</label>
                      <p className="text-muted-foreground">rajesh.sharma@example.com</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">PAN Number</label>
                      <p className="text-muted-foreground">ABCDE1234F</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Mobile</label>
                      <p className="text-muted-foreground">+91 98765 43210</p>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Language Preference</label>
                      <Badge variant="secondary" className="bg-primary/10 text-primary">
                        <Globe className="w-3 h-3 mr-1" />
                        English / हिंदी
                      </Badge>
                    </div>
                  </div>
                  <div className="pt-4">
                    <Button variant="gradient">Edit Profile</Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="shadow-soft bg-gradient-card border-border/50">
                <CardHeader>
                  <CardTitle>Accessibility Settings</CardTitle>
                  <CardDescription>Customize your experience</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Voice Assistant</p>
                      <p className="text-sm text-muted-foreground">Enable voice commands</p>
                    </div>
                    <Button
                      variant={isVoiceEnabled ? "default" : "outline"}
                      size="sm"
                      onClick={() => setIsVoiceEnabled(!isVoiceEnabled)}
                    >
                      {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Large Text Mode</p>
                      <p className="text-sm text-muted-foreground">Better readability</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">High Contrast</p>
                      <p className="text-sm text-muted-foreground">Enhanced visibility</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>

      {/* Floating Chat Assistant */}
      <ChatAssistant isVoiceEnabled={isVoiceEnabled} language={currentLanguage} />
      
      {/* Quick Action Button */}
      <div className="fixed bottom-24 right-6 z-40">
        <Button 
          size="lg" 
          variant="gradient" 
          className="rounded-full w-16 h-16 shadow-elegant animate-float"
          onClick={() => handleServiceClick("Quick PAN Application")}
        >
          <FileText className="w-6 h-6" />
        </Button>
      </div>
    </div>
  );
};