import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useToast } from "@/hooks/use-toast";
import { 
  CreditCard, 
  IndianRupee, 
  QrCode, 
  Smartphone, 
  Shield, 
  CheckCircle,
  Clock,
  Receipt,
  Download,
  Zap,
  Star,
  Gift
} from "lucide-react";

export const PaymentSection = () => {
  const [selectedAmount, setSelectedAmount] = useState(107);
  const [paymentMethod, setPaymentMethod] = useState<"upi" | "card" | "netbanking">("upi");
  const [upiId, setUpiId] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const servicePrices = [
    { 
      name: "Standard PAN Application", 
      price: 107, 
      originalPrice: 120,
      description: "Regular processing (5-7 days)",
      popular: false
    },
    { 
      name: "Express PAN Application", 
      price: 197, 
      originalPrice: 220,
      description: "Fast processing (2-3 days)",
      popular: true
    },
    { 
      name: "Super Express PAN", 
      price: 297, 
      originalPrice: 350,
      description: "Same day processing",
      popular: false
    }
  ];

  const paymentHistory = [
    {
      id: "PAY001234",
      service: "Express PAN Application",
      amount: 197,
      date: "2024-01-15",
      status: "completed",
      method: "UPI"
    },
    {
      id: "PAY001233", 
      service: "Standard PAN Application",
      amount: 107,
      date: "2024-01-10",
      status: "completed",
      method: "Card"
    }
  ];

  const handlePayment = async () => {
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Payment Successful! 🎉",
      description: `Payment of ₹${selectedAmount} completed successfully. Your application is now being processed.`,
    });
    
    setIsProcessing(false);
  };

  const generateUPILink = () => {
    const amount = selectedAmount;
    const upiLink = `upi://pay?pa=panseva@paytm&pn=PAN%20Seva&am=${amount}&cu=INR&tn=PAN%20Application%20Payment`;
    window.location.href = upiLink;
  };

  return (
    <div className="space-y-6">
      {/* Service Selection */}
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <IndianRupee className="h-5 w-5 text-primary" />
            <span>Choose Your Service</span>
          </CardTitle>
          <CardDescription>Select the processing speed that works best for you</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {servicePrices.map((service, index) => (
              <Card 
                key={index}
                className={`cursor-pointer transition-all border-2 hover:shadow-soft ${
                  selectedAmount === service.price 
                    ? "border-primary bg-primary/5" 
                    : "border-border hover:border-primary/50"
                } ${service.popular ? "ring-2 ring-accent/50" : ""}`}
                onClick={() => setSelectedAmount(service.price)}
              >
                <CardContent className="p-4">
                  <div className="text-center space-y-3">
                    {service.popular && (
                      <Badge variant="secondary" className="bg-accent text-accent-foreground">
                        <Star className="w-3 h-3 mr-1" />
                        Most Popular
                      </Badge>
                    )}
                    
                    <h3 className="font-semibold">{service.name}</h3>
                    
                    <div className="space-y-1">
                      <div className="flex items-center justify-center space-x-2">
                        <span className="text-2xl font-bold text-primary">₹{service.price}</span>
                        <span className="text-sm text-muted-foreground line-through">₹{service.originalPrice}</span>
                      </div>
                      <Badge variant="secondary" className="bg-success/10 text-success text-xs">
                        Save ₹{service.originalPrice - service.price}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground">{service.description}</p>
                    
                    <div className="flex items-center justify-center space-x-1">
                      <CheckCircle className="h-4 w-4 text-success" />
                      <span className="text-xs">AI Document Validation</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Methods */}
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <CreditCard className="h-5 w-5 text-primary" />
            <span>Payment Method</span>
          </CardTitle>
          <CardDescription>Choose your preferred payment option</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Payment Method Selection */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card 
              className={`cursor-pointer transition-all border-2 ${
                paymentMethod === "upi" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("upi")}
            >
              <CardContent className="p-4 text-center">
                <Smartphone className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">UPI Payment</h3>
                <p className="text-sm text-muted-foreground">Pay via any UPI app</p>
                <Badge variant="secondary" className="mt-2 bg-success/10 text-success">
                  <Zap className="w-3 h-3 mr-1" />
                  Instant
                </Badge>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all border-2 ${
                paymentMethod === "card" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("card")}
            >
              <CardContent className="p-4 text-center">
                <CreditCard className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Debit/Credit Card</h3>
                <p className="text-sm text-muted-foreground">Visa, Mastercard, RuPay</p>
                <Badge variant="secondary" className="mt-2 bg-primary/10 text-primary">
                  <Shield className="w-3 h-3 mr-1" />
                  Secure
                </Badge>
              </CardContent>
            </Card>

            <Card 
              className={`cursor-pointer transition-all border-2 ${
                paymentMethod === "netbanking" 
                  ? "border-primary bg-primary/5" 
                  : "border-border hover:border-primary/50"
              }`}
              onClick={() => setPaymentMethod("netbanking")}
            >
              <CardContent className="p-4 text-center">
                <QrCode className="h-8 w-8 text-primary mx-auto mb-2" />
                <h3 className="font-medium">Net Banking</h3>
                <p className="text-sm text-muted-foreground">All major banks</p>
                <Badge variant="secondary" className="mt-2 bg-warning/10 text-warning">
                  <Clock className="w-3 h-3 mr-1" />
                  2-3 mins
                </Badge>
              </CardContent>
            </Card>
          </div>

          {/* UPI Payment Form */}
          {paymentMethod === "upi" && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Button 
                  variant="outline" 
                  className="h-12 border-dashed"
                  onClick={generateUPILink}
                >
                  <div className="text-center">
                    <div className="w-6 h-6 bg-blue-600 rounded mx-auto mb-1"></div>
                    <span className="text-xs">Google Pay</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-dashed"
                  onClick={generateUPILink}
                >
                  <div className="text-center">
                    <div className="w-6 h-6 bg-purple-600 rounded mx-auto mb-1"></div>
                    <span className="text-xs">PhonePe</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-dashed"
                  onClick={generateUPILink}
                >
                  <div className="text-center">
                    <div className="w-6 h-6 bg-blue-500 rounded mx-auto mb-1"></div>
                    <span className="text-xs">Paytm</span>
                  </div>
                </Button>
                <Button 
                  variant="outline" 
                  className="h-12 border-dashed"
                  onClick={generateUPILink}
                >
                  <div className="text-center">
                    <QrCode className="w-6 h-6 mx-auto mb-1" />
                    <span className="text-xs">QR Code</span>
                  </div>
                </Button>
              </div>

              <div className="relative">
                <Separator className="my-4" />
                <span className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-card px-2 text-sm text-muted-foreground">
                  or enter UPI ID
                </span>
              </div>

              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID</Label>
                <Input
                  id="upiId"
                  placeholder="yourname@paytm"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Payment Summary */}
          <Card className="bg-muted/30 border-border/50">
            <CardContent className="p-4">
              <h4 className="font-medium mb-3">Payment Summary</h4>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Service Fee</span>
                  <span>₹{selectedAmount}</span>
                </div>
                <div className="flex justify-between text-sm text-success">
                  <span>Processing Fee</span>
                  <span>FREE</span>
                </div>
                <div className="flex justify-between text-sm text-success">
                  <span>AI Validation</span>
                  <span>FREE</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between font-semibold">
                  <span>Total Amount</span>
                  <span className="text-primary">₹{selectedAmount}</span>
                </div>
              </div>
              
              <div className="mt-4 p-3 bg-success/10 border border-success/20 rounded-lg">
                <div className="flex items-center space-x-2 text-success text-sm">
                  <Gift className="w-4 h-4" />
                  <span>Special Offer: Get ₹50 cashback on your next service!</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Pay Button */}
          <Button 
            onClick={handlePayment}
            disabled={isProcessing}
            variant="gradient"
            size="lg"
            className="w-full h-14 text-lg"
          >
            {isProcessing ? (
              <>
                <Clock className="w-5 h-5 mr-2 animate-spin" />
                Processing Payment...
              </>
            ) : (
              <>
                <IndianRupee className="w-5 h-5 mr-2" />
                Pay ₹{selectedAmount} Securely
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Receipt className="h-5 w-5 text-primary" />
            <span>Payment History</span>
          </CardTitle>
          <CardDescription>Your recent transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {paymentHistory.map((payment, index) => (
              <Card key={index} className="border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium">{payment.service}</h4>
                      <p className="text-sm text-muted-foreground">Payment ID: {payment.id}</p>
                      <p className="text-sm text-muted-foreground">{payment.date} • {payment.method}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-lg">₹{payment.amount}</p>
                      <Badge variant="secondary" className="bg-success/10 text-success">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Completed
                      </Badge>
                      <div className="mt-2">
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Invoice
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Security Info */}
      <Card className="shadow-soft bg-gradient-primary/5 border-primary/20">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Shield className="h-6 w-6 text-primary" />
            <div>
              <h4 className="font-medium text-primary">Secure Payment</h4>
              <p className="text-sm text-muted-foreground">
                Your payment information is encrypted and secure. We never store your card details.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};