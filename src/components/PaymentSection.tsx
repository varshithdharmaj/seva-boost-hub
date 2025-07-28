import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { IndianRupee, QrCode, Shield } from "lucide-react";

interface PaymentSectionProps {
  onPaymentComplete: () => void;
}

export const PaymentSection = ({ onPaymentComplete }: PaymentSectionProps) => {
  const { toast } = useToast();
  const amount = 107; // Standard fee for PAN application

  const handlePaymentConfirmation = () => {
    toast({
      title: "Payment Received",
      description: "We have received your payment. Your application will be processed shortly.",
    });
    onPaymentComplete();
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            <span>Application Fee</span>
          </CardTitle>
          <CardDescription>Complete the payment to submit your application.</CardDescription>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <div className="flex justify-center items-center">
            <QrCode className="w-48 h-48 p-2 border rounded-lg bg-white" />
          </div>
          <p className="text-muted-foreground">
            Scan the QR code with any UPI app to pay.
          </p>
          <div className="text-2xl font-bold">
            Total Amount: ₹{amount}
          </div>
          <p className="text-xs text-muted-foreground">
            UPI ID: panseva@upi
          </p>
        </CardContent>
      </Card>

      <Button
        onClick={handlePaymentConfirmation}
        variant="gradient"
        size="lg"
        className="w-full h-12 text-lg"
      >
        I have paid
      </Button>

      <Card className="shadow-soft bg-gradient-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-medium text-primary">Secure Transaction</h4>
              <p className="text-sm text-muted-foreground">
                Your payment is processed securely. We do not store your payment details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};