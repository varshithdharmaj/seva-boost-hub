import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Upload, FileText, X, CheckCircle, AlertCircle, Camera } from "lucide-react";

interface DocumentFile {
  file: File;
  preview: string;
}

const requiredDocuments = [
  { id: "identity", title: "Identity Proof (Aadhaar, Voter ID)", accepted: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] }, maxSize: 5 * 1024 * 1024 },
  { id: "address", title: "Address Proof (Utility Bill, Bank Statement)", accepted: { 'image/jpeg': [], 'image/png': [], 'application/pdf': [] }, maxSize: 5 * 1024 * 1024 },
  { id: "photo", title: "Passport-size Photo", accepted: { 'image/jpeg': [], 'image/png': [] }, maxSize: 2 * 1024 * 1024 },
  { id: "signature", title: "Signature", accepted: { 'image/jpeg': [], 'image/png': [] }, maxSize: 1 * 1024 * 1024 },
];

export const DocumentUpload = () => {
  const [uploadedFiles, setUploadedFiles] = useState<Record<string, DocumentFile | null>>({
    identity: null,
    address: null,
    photo: null,
    signature: null,
  });
  const { toast } = useToast();

  const onDrop = useCallback((docId: string, acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setUploadedFiles(prev => ({
        ...prev,
        [docId]: { file, preview: URL.createObjectURL(file) }
      }));
      toast({
        title: "File Uploaded",
        description: `${file.name} has been uploaded successfully.`,
      });
    }
  }, [toast]);

  const removeFile = (docId: string) => {
    setUploadedFiles(prev => ({ ...prev, [docId]: null }));
  };

  return (
    <div className="space-y-6">
      {requiredDocuments.map(doc => (
        <DocumentUploader
          key={doc.id}
          docId={doc.id}
          title={doc.title}
          accepted={doc.accepted}
          maxSize={doc.maxSize}
          file={uploadedFiles[doc.id]}
          onDrop={onDrop}
          onRemove={removeFile}
        />
      ))}
    </div>
  );
};

interface DocumentUploaderProps {
  docId: string;
  title: string;
  accepted: Record<string, string[]>;
  maxSize: number;
  file: DocumentFile | null;
  onDrop: (docId: string, files: File[]) => void;
  onRemove: (docId: string) => void;
}

const DocumentUploader = ({ docId, title, accepted, maxSize, file, onDrop, onRemove }: DocumentUploaderProps) => {
  const { getRootProps, getInputProps, isDragActive, fileRejections } = useDropzone({
    onDrop: (files) => onDrop(docId, files),
    accept: accepted,
    maxSize,
    multiple: false,
  });

  const isFileRejected = fileRejections.length > 0;

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <h4 className="font-medium">{title}</h4>
          {file && <CheckCircle className="h-5 w-5 text-success" />}
        </div>
        <div className="text-sm text-muted-foreground mb-4">
          Max size: {maxSize / 1024 / 1024}MB. Accepted formats: {Object.keys(accepted).join(', ').replace('image/', '.').replace('application/', '.') }
        </div>

        {file ? (
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 rounded-lg overflow-hidden bg-muted">
              {file.file.type.startsWith('image/') ? (
                <img src={file.preview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <FileText className="h-6 w-6 text-muted-foreground" />
                </div>
              )}
            </div>
            <div className="flex-1">
              <p className="font-medium truncate">{file.file.name}</p>
              <p className="text-sm text-muted-foreground">{(file.file.size / 1024).toFixed(2)} KB</p>
            </div>
            <Button variant="ghost" size="icon" onClick={() => onRemove(docId)}>
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div
            {...getRootProps()}
            className={`border-2 border-dashed rounded-lg p-6 text-center transition-all cursor-pointer ${
              isDragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary/50"
            } ${isFileRejected ? "border-destructive" : ""}`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-2">
              <Upload className="h-8 w-8 text-muted-foreground" />
              <p className="text-sm text-muted-foreground">
                Drag & drop file or click to browse
              </p>
              <Button variant="outline" size="sm" className="mt-2">
                <Camera className="w-4 h-4 mr-2" />
                Take Photo
              </Button>
            </div>
          </div>
        )}
        {isFileRejected && (
          <div className="text-destructive text-sm mt-2 flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            <p>File is too large or has an unsupported format.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};
