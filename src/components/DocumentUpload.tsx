import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { 
  Upload, 
  Camera, 
  FileText, 
  CheckCircle, 
  AlertCircle, 
  X, 
  Eye,
  Scan,
  Loader2,
  Shield,
  FileCheck
} from "lucide-react";

interface DocumentFile {
  id: string;
  file: File;
  preview: string;
  type: "identity" | "address" | "photo" | "signature";
  status: "uploading" | "validating" | "valid" | "invalid";
  validationResult?: {
    score: number;
    issues: string[];
    suggestions: string[];
  };
}

export const DocumentUpload = () => {
  const [documents, setDocuments] = useState<DocumentFile[]>([]);
  const [currentStep, setCurrentStep] = useState<"identity" | "address" | "photo" | "signature">("identity");
  const [isValidating, setIsValidating] = useState(false);
  const { toast } = useToast();

  const documentTypes = {
    identity: {
      title: "Identity Proof",
      description: "Aadhaar Card, Voter ID, Passport, or Driving License",
      accepted: ".jpg,.jpeg,.png,.pdf",
      maxSize: 5
    },
    address: {
      title: "Address Proof", 
      description: "Aadhaar Card, Utility Bill, Bank Statement, or Rent Agreement",
      accepted: ".jpg,.jpeg,.png,.pdf",
      maxSize: 5
    },
    photo: {
      title: "Passport Photo",
      description: "Recent passport-size photograph with white background",
      accepted: ".jpg,.jpeg,.png",
      maxSize: 2
    },
    signature: {
      title: "Signature",
      description: "Clear signature on white paper or digital signature",
      accepted: ".jpg,.jpeg,.png",
      maxSize: 1
    }
  };

  // Simulate AI document validation
  const validateDocument = async (file: File, type: string): Promise<any> => {
    setIsValidating(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock validation results
    const mockResults = {
      identity: {
        score: Math.random() > 0.2 ? 95 : 45,
        issues: Math.random() > 0.7 ? ["Document appears blurry", "Text not clearly visible"] : [],
        suggestions: ["Ensure good lighting", "Keep document flat", "Avoid shadows"]
      },
      address: {
        score: Math.random() > 0.2 ? 88 : 52,
        issues: Math.random() > 0.8 ? ["Date is older than 3 months"] : [],
        suggestions: ["Use recent utility bill", "Ensure all text is visible"]
      },
      photo: {
        score: Math.random() > 0.2 ? 92 : 38,
        issues: Math.random() > 0.6 ? ["Background not white", "Photo quality low"] : [],
        suggestions: ["Use white background", "Ensure good lighting", "Face should be clearly visible"]
      },
      signature: {
        score: Math.random() > 0.2 ? 89 : 41,
        issues: Math.random() > 0.7 ? ["Signature too light"] : [],
        suggestions: ["Use dark ink", "Sign on white paper", "Ensure clear signature"]
      }
    };

    setIsValidating(false);
    return mockResults[type as keyof typeof mockResults];
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (!file) return;

    const newDocument: DocumentFile = {
      id: Date.now().toString(),
      file,
      preview: URL.createObjectURL(file),
      type: currentStep,
      status: "uploading"
    };

    setDocuments(prev => [...prev, newDocument]);

    // Simulate upload
    setTimeout(async () => {
      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocument.id 
            ? { ...doc, status: "validating" }
            : doc
        )
      );

      // Validate document
      const validationResult = await validateDocument(file, currentStep);
      const isValid = validationResult.score >= 70;

      setDocuments(prev => 
        prev.map(doc => 
          doc.id === newDocument.id 
            ? { 
                ...doc, 
                status: isValid ? "valid" : "invalid",
                validationResult
              }
            : doc
        )
      );

      toast({
        title: isValid ? "Document Validated" : "Validation Issues Found",
        description: isValid 
          ? `${documentTypes[currentStep].title} successfully validated with ${validationResult.score}% confidence.`
          : `Please review and resubmit your ${documentTypes[currentStep].title.toLowerCase()}.`,
        variant: isValid ? "default" : "destructive",
      });

      // Auto advance to next step if valid
      if (isValid && currentStep !== "signature") {
        setTimeout(() => {
          const steps = ["identity", "address", "photo", "signature"] as const;
          const currentIndex = steps.indexOf(currentStep);
          if (currentIndex < steps.length - 1) {
            setCurrentStep(steps[currentIndex + 1]);
          }
        }, 1500);
      }
    }, 1000);
  }, [currentStep, toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png'],
      'application/pdf': ['.pdf']
    },
    maxSize: documentTypes[currentStep].maxSize * 1024 * 1024,
    multiple: false
  });

  const removeDocument = (id: string) => {
    setDocuments(prev => prev.filter(doc => doc.id !== id));
  };

  const getCurrentStepDocuments = () => {
    return documents.filter(doc => doc.type === currentStep);
  };

  const getOverallProgress = () => {
    const steps = ["identity", "address", "photo", "signature"];
    const completedSteps = steps.filter(step => 
      documents.some(doc => doc.type === step && doc.status === "valid")
    );
    return (completedSteps.length / steps.length) * 100;
  };

  return (
    <div className="space-y-6">
      {/* Progress Overview */}
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-primary" />
                <span>Smart Document Upload</span>
              </CardTitle>
              <CardDescription>AI-powered document validation with real-time feedback</CardDescription>
            </div>
            <Badge variant="secondary" className="bg-primary/10 text-primary">
              {Math.round(getOverallProgress())}% Complete
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <Progress value={getOverallProgress()} className="h-3 mb-4" />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(documentTypes).map(([key, type]) => {
              const hasValid = documents.some(doc => doc.type === key && doc.status === "valid");
              const isActive = currentStep === key;
              return (
                <div 
                  key={key}
                  className={`p-3 rounded-lg border transition-all cursor-pointer ${
                    isActive 
                      ? "border-primary bg-primary/5" 
                      : hasValid 
                        ? "border-success bg-success/5"
                        : "border-border hover:border-primary/50"
                  }`}
                  onClick={() => setCurrentStep(key as any)}
                >
                  <div className="flex items-center space-x-2 mb-2">
                    {hasValid ? (
                      <CheckCircle className="h-4 w-4 text-success" />
                    ) : isActive ? (
                      <FileText className="h-4 w-4 text-primary" />
                    ) : (
                      <FileText className="h-4 w-4 text-muted-foreground" />
                    )}
                    <span className="text-sm font-medium">{type.title}</span>
                  </div>
                  <p className="text-xs text-muted-foreground">{type.description}</p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Current Step Upload */}
      <Card className="shadow-soft bg-gradient-card border-border/50">
        <CardHeader>
          <CardTitle>Upload {documentTypes[currentStep].title}</CardTitle>
          <CardDescription>{documentTypes[currentStep].description}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Upload Area */}
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer ${
              isDragActive 
                ? "border-primary bg-primary/5" 
                : "border-border hover:border-primary/50 hover:bg-muted/30"
            }`}
          >
            <input {...getInputProps()} />
            <div className="space-y-4">
              <div className="flex justify-center">
                {isValidating ? (
                  <Loader2 className="h-12 w-12 text-primary animate-spin" />
                ) : (
                  <Upload className="h-12 w-12 text-muted-foreground" />
                )}
              </div>
              <div>
                <p className="text-lg font-medium mb-2">
                  {isDragActive ? "Drop your document here" : "Upload or drag your document"}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  Supported formats: {documentTypes[currentStep].accepted}
                  <br />
                  Maximum size: {documentTypes[currentStep].maxSize}MB
                </p>
                <div className="flex justify-center space-x-4">
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose File
                  </Button>
                  <Button variant="outline" size="sm">
                    <Camera className="w-4 h-4 mr-2" />
                    Take Photo
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Uploaded Documents for Current Step */}
          {getCurrentStepDocuments().length > 0 && (
            <div className="space-y-4">
              <h4 className="font-medium">Uploaded Documents</h4>
              {getCurrentStepDocuments().map((doc) => (
                <Card key={doc.id} className="border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-4">
                      <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
                        {doc.file.type.startsWith('image/') ? (
                          <img 
                            src={doc.preview} 
                            alt="Document preview" 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="h-6 w-6 text-muted-foreground" />
                          </div>
                        )}
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h5 className="font-medium">{doc.file.name}</h5>
                          <Button 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeDocument(doc.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="flex items-center space-x-2 mb-2">
                          {doc.status === "uploading" && (
                            <>
                              <Loader2 className="h-4 w-4 animate-spin text-primary" />
                              <span className="text-sm text-muted-foreground">Uploading...</span>
                            </>
                          )}
                          {doc.status === "validating" && (
                            <>
                              <Scan className="h-4 w-4 animate-pulse text-warning" />
                              <span className="text-sm text-muted-foreground">AI Validating...</span>
                            </>
                          )}
                          {doc.status === "valid" && (
                            <>
                              <CheckCircle className="h-4 w-4 text-success" />
                              <span className="text-sm text-success">Validated ({doc.validationResult?.score}%)</span>
                            </>
                          )}
                          {doc.status === "invalid" && (
                            <>
                              <AlertCircle className="h-4 w-4 text-destructive" />
                              <span className="text-sm text-destructive">Validation Failed ({doc.validationResult?.score}%)</span>
                            </>
                          )}
                        </div>

                        {/* Validation Details */}
                        {doc.validationResult && (
                          <div className="space-y-2">
                            {doc.validationResult.issues.length > 0 && (
                              <div className="bg-destructive/10 border border-destructive/20 rounded p-2">
                                <p className="text-xs font-medium text-destructive mb-1">Issues Found:</p>
                                <ul className="text-xs text-destructive/80 space-y-1">
                                  {doc.validationResult.issues.map((issue, index) => (
                                    <li key={index}>• {issue}</li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            
                            <div className="bg-primary/10 border border-primary/20 rounded p-2">
                              <p className="text-xs font-medium text-primary mb-1">AI Suggestions:</p>
                              <ul className="text-xs text-primary/80 space-y-1">
                                {doc.validationResult.suggestions.map((suggestion, index) => (
                                  <li key={index}>• {suggestion}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-between">
            <Button 
              variant="outline" 
              onClick={() => {
                const steps = ["identity", "address", "photo", "signature"] as const;
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex > 0) {
                  setCurrentStep(steps[currentIndex - 1]);
                }
              }}
              disabled={currentStep === "identity"}
            >
              Previous Step
            </Button>
            
            <Button 
              variant="gradient"
              onClick={() => {
                const steps = ["identity", "address", "photo", "signature"] as const;
                const currentIndex = steps.indexOf(currentStep);
                if (currentIndex < steps.length - 1) {
                  setCurrentStep(steps[currentIndex + 1]);
                }
              }}
              disabled={
                currentStep === "signature" || 
                !documents.some(doc => doc.type === currentStep && doc.status === "valid")
              }
            >
              {currentStep === "signature" ? "Complete Upload" : "Next Step"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* AI Tips */}
      <Card className="shadow-soft bg-gradient-primary/5 border-primary/20">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2 text-primary">
            <FileCheck className="h-5 w-5" />
            <span>AI Tips for Perfect Documents</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-2">📱 Mobile Photography</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Use good lighting (natural light preferred)</li>
                <li>• Keep document flat and in focus</li>
                <li>• Avoid shadows and reflections</li>
                <li>• Fill the entire frame with document</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-2">📄 Document Quality</h5>
              <ul className="space-y-1 text-muted-foreground">
                <li>• Ensure all text is clearly readable</li>
                <li>• Use original documents when possible</li>
                <li>• Check for recent dates (within 3 months)</li>
                <li>• Remove any staples or paper clips</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};