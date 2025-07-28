import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  CreditCard, 
  User, 
  LogOut,
  Bell,
  Settings,
  HelpCircle,
  CheckCircle,
  Clock,
  Globe
} from "lucide-react";
import panLogo from "@/assets/pan-logo.png";
import { FloatingElements } from "@/components/FloatingElements";
import { ConversationalPANForm } from "@/components/ConversationalPANForm";
import { DocumentUpload } from "@/components/DocumentUpload";
import { PaymentSection } from "@/components/PaymentSection";
import { AdminDashboard } from "@/components/AdminDashboard";
import { useTranslation } from "react-i18next";

interface DashboardProps {
  onLogout: () => void;
}

type Step = "personal-info" | "document-upload" | "payment" | "status";

export const Dashboard = ({ onLogout }: DashboardProps) => {
  const { t, i18n } = useTranslation();
  const [currentStep, setCurrentStep] = useState<Step>("personal-info");
  const [userRole, setUserRole] = useState<"user" | "admin">("user");

  const steps: { id: Step; title: string; description: string; icon: React.ElementType }[] = [
    { id: "personal-info", title: t('dashboard.steps.personalInfo'), description: t('dashboard.personalInfo.description'), icon: User },
    { id: "document-upload", title: t('dashboard.steps.documentUpload'), description: t('dashboard.documentUpload.description'), icon: Upload },
    { id: "payment", title: t('dashboard.steps.payment'), description: t('dashboard.payment.description'), icon: CreditCard },
    { id: "status", title: t('dashboard.steps.status'), description: t('dashboard.status.description'), icon: FileText },
  ];

  const currentStepIndex = steps.findIndex(step => step.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case "personal-info":
        return <ConversationalPANForm />;
      case "document-upload":
        return <DocumentUpload />;
      case "payment":
        return <PaymentSection onPaymentComplete={() => setCurrentStep("status")} />;
      case "status":
        return <ApplicationStatus />;
      default:
        return <ConversationalPANForm />;
    }
  };

  if (userRole === "admin") {
    return <AdminDashboard onBack={() => setUserRole("user")} />;
  }

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 relative">
      <FloatingElements />
      
      {/* Header */}
      <header className="border-b border-border/50 bg-card/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-primary p-2">
              <img 
                src={panLogo} 
                alt="PAN Seva" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                {t('dashboard.title')}
              </h1>
              <p className="text-xs text-muted-foreground">{t('dashboard.subtitle')}</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button variant="ghost" size="icon" onClick={() => changeLanguage(i18n.language === 'en' ? 'hi' : 'en')}>
              <Globe className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute -top-1 -right-1 h-3 w-3 bg-accent rounded-full"></span>
            </Button>
            <Button variant="ghost" size="icon">
              <HelpCircle className="h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={() => setUserRole("admin")}
            >
              <Settings className="h-5 w-5" />
            </Button>
            <Button onClick={onLogout} variant="ghost" size="icon">
              <LogOut className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 relative z-10">
        {/* Stepper Navigation */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            {steps.map((step, index) => (
              <div key={step.id} className="flex-1 text-center">
                <div className={`mx-auto w-10 h-10 rounded-full flex items-center justify-center border-2 ${currentStepIndex >= index ? "bg-primary border-primary text-primary-foreground" : "bg-muted border-border"}`}>
                  {currentStepIndex > index ? <CheckCircle className="w-6 h-6" /> : <step.icon className="w-5 h-5" />}
                </div>
                <p className={`text-sm mt-2 ${currentStepIndex >= index ? "font-semibold text-foreground" : "text-muted-foreground"}`}>{step.title}</p>
              </div>
            ))}
          </div>
          <Progress value={((currentStepIndex + 1) / steps.length) * 100} className="w-full h-2" />
        </div>

        {/* Main Content */}
        <Card className="shadow-soft bg-gradient-card border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center space-x-3">
              <steps[currentStepIndex].icon className="w-6 h-6 text-primary" />
              <span>{steps[currentStepIndex].title}</span>
            </CardTitle>
            <CardDescription>{steps[currentStepIndex].description}</CardDescription>
          </CardHeader>
          <CardContent>
            {renderStepContent()}
          </CardContent>
        </Card>

        {/* Navigation Buttons */}
        <div className="mt-8 flex justify-between">
          <Button
            variant="outline"
            onClick={() => setCurrentStep(steps[currentStepIndex - 1].id)}
            disabled={currentStepIndex === 0}
          >
            Previous
          </Button>
          <Button
            variant="gradient"
            onClick={() => setCurrentStep(steps[currentStepIndex + 1].id)}
            disabled={currentStepIndex === steps.length - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};

const ApplicationStatus = () => {
  return (
    <div className="text-center">
      <Clock className="mx-auto h-12 w-12 text-primary mb-4" />
      <h3 className="text-xl font-semibold mb-2">Application Submitted</h3>
      <p className="text-muted-foreground">Your application is currently being processed. You will be notified of any updates.</p>
      <div className="mt-6">
        <Card className="bg-muted/30 border-border/50 text-left">
          <CardContent className="p-4">
            <h4 className="font-semibold mb-2">Status Details</h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Application ID:</span>
                <span>PAN-12345678</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">In Progress</Badge>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Last Update:</span>
                <span>{new Date().toLocaleDateString()}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};