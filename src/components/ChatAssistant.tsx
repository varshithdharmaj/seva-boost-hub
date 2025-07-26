import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { 
  MessageCircle, 
  Send, 
  Mic, 
  MicOff, 
  Volume2, 
  VolumeX,
  Bot,
  User,
  Phone,
  Globe,
  Sparkles,
  X,
  Minimize2
} from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "user" | "assistant";
  timestamp: Date;
  language?: string;
}

interface ChatAssistantProps {
  isVoiceEnabled: boolean;
  language: string;
}

export const ChatAssistant = ({ isVoiceEnabled, language }: ChatAssistantProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      content: "नमस्ते! 🙏 मैं आपका PAN सेवा सहायक हूँ। मैं आपकी PAN कार्ड आवेदन प्रक्रिया में मदद कर सकता हूँ। आप हिंदी या अंग्रेजी में बात कर सकते हैं।",
      sender: "assistant",
      timestamp: new Date(),
      language: "hi"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const { toast } = useToast();

  const commonQuestions = [
    { question: "How to apply for PAN card?", answer: "I'll guide you through our AI-powered PAN application process step by step." },
    { question: "Required documents", answer: "You'll need identity proof, address proof, photo, and signature. Our AI validates each document." },
    { question: "Application status", answer: "You can track your application status in real-time from your dashboard." },
    { question: "Processing time", answer: "Standard: 5-7 days, Express: 2-3 days, Super Express: Same day processing available." }
  ];

  const aiResponses = {
    greeting: [
      "Hello! I'm your intelligent PAN assistant. How can I help you today?",
      "नमस्ते! मैं आपका PAN सहायक हूँ। आज मैं आपकी कैसे सहायता कर सकता हूँ?",
      "Hi there! Ready to make your PAN application super easy? What would you like to know?"
    ],
    documents: [
      "For PAN application, you need: 1) Identity proof (Aadhaar/Passport) 2) Address proof 3) Passport photo 4) Signature. Our AI will validate each document for quality!",
      "PAN आवेदन के लिए आपको चाहिए: 1) पहचान प्रमाण 2) पता प्रमाण 3) फोटो 4) हस्ताक्षर। हमारा AI प्रत्येक दस्तावेज़ की गुणवत्ता जांचेगा!"
    ],
    process: [
      "Our process is super simple: 1) Chat with AI for guidance 2) Upload documents (AI validates) 3) Make secure payment 4) Track in real-time 5) Get your PAN!",
      "हमारी प्रक्रिया बहुत सरल है: 1) AI से बात करें 2) दस्तावेज़ अपलोड करें 3) भुगतान करें 4) ट्रैक करें 5) अपना PAN प्राप्त करें!"
    ],
    help: [
      "I can help with: ✅ PAN application guidance ✅ Document validation ✅ Status tracking ✅ Payment assistance ✅ Multilingual support. What do you need?",
      "मैं इनमें मदद कर सकता हूँ: ✅ PAN आवेदन मार्गदर्शन ✅ दस्तावेज़ सत्यापन ✅ स्थिति ट्रैकिंग ✅ भुगतान सहायता। आपको क्या चाहिए?"
    ]
  };

  const getAIResponse = (message: string): string => {
    const lowerMessage = message.toLowerCase();
    
    if (lowerMessage.includes("document") || lowerMessage.includes("दस्तावेज")) {
      return aiResponses.documents[Math.floor(Math.random() * aiResponses.documents.length)];
    }
    if (lowerMessage.includes("process") || lowerMessage.includes("प्रक्रिया") || lowerMessage.includes("how")) {
      return aiResponses.process[Math.floor(Math.random() * aiResponses.process.length)];
    }
    if (lowerMessage.includes("help") || lowerMessage.includes("मदद") || lowerMessage.includes("सहायता")) {
      return aiResponses.help[Math.floor(Math.random() * aiResponses.help.length)];
    }
    if (lowerMessage.includes("hello") || lowerMessage.includes("hi") || lowerMessage.includes("नमस्ते")) {
      return aiResponses.greeting[Math.floor(Math.random() * aiResponses.greeting.length)];
    }

    // Default intelligent response
    return "I understand you're asking about PAN services. Let me help you with that! You can apply for a new PAN, check application status, or get help with documents. Which would you like to explore?";
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: "user",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(inputMessage),
        sender: "assistant",
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiResponse]);
      setIsTyping(false);

      // Auto-speak response if voice is enabled
      if (isVoiceEnabled && !isSpeaking) {
        speakMessage(aiResponse.content);
      }
    }, 1000 + Math.random() * 1000);
  };

  const speakMessage = (text: string) => {
    if ('speechSynthesis' in window) {
      setIsSpeaking(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      utterance.onend = () => setIsSpeaking(false);
      speechSynthesis.speak(utterance);
    }
  };

  const startListening = () => {
    if ('webkitSpeechRecognition' in window) {
      const recognition = new (window as any).webkitSpeechRecognition();
      recognition.lang = language === 'hi' ? 'hi-IN' : 'en-IN';
      recognition.continuous = false;
      recognition.interimResults = false;

      setIsListening(true);
      recognition.start();

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputMessage(transcript);
        setIsListening(false);
      };

      recognition.onerror = () => {
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please try speaking again or type your message.",
          variant: "destructive",
        });
      };

      recognition.onend = () => {
        setIsListening(false);
      };
    } else {
      toast({
        title: "Voice Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const handleQuickQuestion = (question: string, answer: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      content: question,
      sender: "user",
      timestamp: new Date()
    };

    const aiMessage: Message = {
      id: (Date.now() + 1).toString(),
      content: answer,
      sender: "assistant",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiMessage]);

    if (isVoiceEnabled) {
      speakMessage(answer);
    }
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsOpen(true)}
          size="lg"
          variant="gradient"
          className="rounded-full w-16 h-16 shadow-elegant animate-float relative"
        >
          <MessageCircle className="w-6 h-6" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full animate-pulse"></span>
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-96 shadow-elegant border-primary/20 bg-card/95 backdrop-blur-sm transition-all duration-300 ${
        isMinimized ? "h-16" : "h-[600px]"
      }`}>
        <CardHeader className="pb-3 border-b border-border/50">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 rounded-full bg-gradient-primary p-2 animate-float">
                <Bot className="w-full h-full text-primary-foreground" />
              </div>
              <div>
                <CardTitle className="text-lg">AI Assistant</CardTitle>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
                  <CardDescription className="text-xs">Online • Multilingual</CardDescription>
                </div>
              </div>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <>
            <CardContent className="p-0 flex-1">
              <ScrollArea className="h-80 p-4">
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className="flex items-start space-x-2 max-w-[80%]">
                        {message.sender === 'assistant' && (
                          <div className="w-8 h-8 rounded-full bg-gradient-primary p-1.5 flex-shrink-0">
                            <Bot className="w-full h-full text-primary-foreground" />
                          </div>
                        )}
                        <div
                          className={`px-3 py-2 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-primary text-primary-foreground'
                              : 'bg-muted'
                          }`}
                        >
                          {message.content}
                          {message.language && (
                            <Badge variant="secondary" className="ml-2 text-xs">
                              <Globe className="w-3 h-3 mr-1" />
                              {message.language}
                            </Badge>
                          )}
                        </div>
                        {message.sender === 'user' && (
                          <div className="w-8 h-8 rounded-full bg-secondary p-1.5 flex-shrink-0">
                            <User className="w-full h-full text-secondary-foreground" />
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                  
                  {isTyping && (
                    <div className="flex justify-start">
                      <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 rounded-full bg-gradient-primary p-1.5">
                          <Bot className="w-full h-full text-primary-foreground" />
                        </div>
                        <div className="px-3 py-2 rounded-lg bg-muted">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                            <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Questions */}
              <div className="p-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground mb-2">Quick Questions:</p>
                <div className="flex flex-wrap gap-2">
                  {commonQuestions.slice(0, 2).map((q, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      size="sm"
                      className="text-xs h-7"
                      onClick={() => handleQuickQuestion(q.question, q.answer)}
                    >
                      {q.question}
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>

            <div className="p-4 border-t border-border/50">
              <div className="flex items-center space-x-2">
                <div className="flex-1 relative">
                  <Input
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    placeholder="Type your message... (English/हिंदी)"
                    onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
                    className="pr-10"
                  />
                  {isVoiceEnabled && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className={`absolute right-2 top-1/2 transform -translate-y-1/2 h-6 w-6 ${
                        isListening ? 'text-red-500 animate-pulse' : 'text-muted-foreground'
                      }`}
                      onClick={startListening}
                    >
                      {isListening ? <MicOff className="h-4 w-4" /> : <Mic className="h-4 w-4" />}
                    </Button>
                  )}
                </div>
                <Button 
                  onClick={sendMessage}
                  disabled={!inputMessage.trim()}
                  size="icon"
                  variant="gradient"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex items-center justify-between mt-2">
                <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                  <Sparkles className="h-3 w-3" />
                  <span>AI-powered • Voice enabled</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Button variant="ghost" size="icon" className="h-6 w-6">
                    <Phone className="h-3 w-3" />
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="h-6 w-6"
                    onClick={() => isSpeaking ? speechSynthesis.cancel() : null}
                  >
                    {isSpeaking ? <VolumeX className="h-3 w-3" /> : <Volume2 className="h-3 w-3" />}
                  </Button>
                </div>
              </div>
            </div>
          </>
        )}
      </Card>
    </div>
  );
};