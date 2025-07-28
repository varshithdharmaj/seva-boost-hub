import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Smartphone, MessageSquare, Loader2 } from "lucide-react";
import panLogo from "@/assets/pan-logo.png";
import { FloatingElements } from "@/components/FloatingElements";
import { useTranslation } from "react-i18next";

interface AuthPageProps {
  onAuthenticated: () => void;
}

export const AuthPage = ({ onAuthenticated }: AuthPageProps) => {
  const { t } = useTranslation();
  const [mobileNumber, setMobileNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [isOtpSent, setIsOtpSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSendOtp = async () => {
    if (mobileNumber.length !== 10) {
      toast({
        title: "Invalid Mobile Number",
        description: "Please enter a valid 10-digit mobile number.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // In a real app, you would call your backend to send an OTP.
    // For this MVP, we'll just log it to the console.
    const mockOtp = Math.floor(100000 + Math.random() * 900000).toString();
    console.log(`Mock OTP for ${mobileNumber}: ${mockOtp}`);

    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${mobileNumber}.`,
    });

    setIsOtpSent(true);
    setIsLoading(false);
  };

  const handleVerifyOtp = async () => {
    if (otp.length !== 6) {
      toast({
        title: "Invalid OTP",
        description: "Please enter the 6-digit OTP.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1000));

    // In a real app, you would verify the OTP with your backend.
    // For this MVP, any 6-digit OTP is considered valid.
    toast({
      title: "Authentication Successful",
      description: "You have been successfully logged in.",
    });
    onAuthenticated();

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/50 flex items-center justify-center p-4 relative">
      <FloatingElements />
      <div className="w-full max-w-md animate-fade-in relative z-10">
        <Card className="shadow-elegant bg-gradient-card border-0">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto mb-4 w-20 h-20 rounded-full bg-gradient-primary p-3 shadow-soft animate-float">
              <img 
                src={panLogo} 
                alt="PAN Seva" 
                className="w-full h-full object-contain filter brightness-0 invert"
              />
            </div>
            <CardTitle className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              {t('auth.welcome')}
            </CardTitle>
            <CardDescription className="text-muted-foreground">
              {t('auth.signIn')}
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {!isOtpSent ? (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="mobile" className="text-sm font-medium">Mobile Number</Label>
                  <div className="relative">
                    <Smartphone className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                    <Input
                      id="mobile"
                      type="tel"
                      placeholder="98765 43210"
                      value={mobileNumber}
                      onChange={(e) => setMobileNumber(e.target.value.replace(/[^0-9]/g, '').slice(0, 10))}
                      className="pl-10 h-12 border-border/50 focus:border-primary transition-smooth"
                      required
                    />
                  </div>
                </div>
                <Button
                  onClick={handleSendOtp}
                  variant="gradient"
                  className="w-full h-12"
                  disabled={isLoading || mobileNumber.length !== 10}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <MessageSquare className="mr-2 h-4 w-4" />
                  )}
                  Send OTP
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="space-y-2 text-center">
                  <Label htmlFor="otp" className="text-sm font-medium">Enter OTP</Label>
                  <p className="text-xs text-muted-foreground">
                    An OTP was sent to {mobileNumber}.
                    <Button variant="link" size="sm" className="p-0 h-auto ml-1" onClick={() => setIsOtpSent(false)}>
                      Change number
                    </Button>
                  </p>
                  <div className="flex justify-center">
                    <InputOTP maxLength={6} value={otp} onChange={setOtp}>
                      <InputOTPGroup>
                        <InputOTPSlot index={0} />
                        <InputOTPSlot index={1} />
                        <InputOTPSlot index={2} />
                        <InputOTPSlot index={3} />
                        <InputOTPSlot index={4} />
                        <InputOTPSlot index={5} />
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                </div>
                <Button
                  onClick={handleVerifyOtp}
                  variant="gradient"
                  className="w-full h-12"
                  disabled={isLoading || otp.length !== 6}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : null}
                  Verify OTP & Sign In
                </Button>
              </div>
            )}
          </CardContent>
          
          <CardFooter className="flex flex-col space-y-4 pt-6">
            <p className="text-xs text-muted-foreground text-center">
              By continuing, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};