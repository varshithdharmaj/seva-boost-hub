import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

export const ConversationalPANForm = () => {
  return (
    <Card className="shadow-soft bg-gradient-card border-border/50">
      <CardHeader>
        <CardTitle>AI-Guided PAN Application</CardTitle>
        <CardDescription>Smart, conversational PAN application process</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground">Conversational AI form will be implemented here with voice support and multilingual capabilities.</p>
      </CardContent>
    </Card>
  );
};