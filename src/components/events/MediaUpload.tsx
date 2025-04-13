
import React from 'react';
import { Button } from '@/components/ui/button';
import { FormControl, FormDescription, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { ImagePlus, VideoIcon, X } from 'lucide-react';
import { Input } from '@/components/ui/input';

interface MediaUploadProps {
  type: 'image' | 'video';
  multiple?: boolean;
  value: File[] | null;
  onChange: (files: File[] | null) => void;
  maxFiles?: number;
  accept?: string;
  maxSize?: number; // in MB
}

const MediaUpload: React.FC<MediaUploadProps> = ({
  type,
  multiple = false,
  value,
  onChange,
  maxFiles = 10,
  accept = type === 'image' ? 'image/*' : 'video/*',
  maxSize = type === 'image' ? 5 : 100 // 5MB for images, 100MB for videos
}) => {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    const selectedFiles: File[] = [];
    const maxSizeInBytes = maxSize * 1024 * 1024;
    
    for (let i = 0; i < Math.min(files.length, maxFiles); i++) {
      if (files[i].size <= maxSizeInBytes) {
        selectedFiles.push(files[i]);
      } else {
        alert(`File "${files[i].name}" exceeds the maximum size of ${maxSize}MB`);
      }
    }
    
    onChange(selectedFiles.length > 0 ? selectedFiles : null);
    
    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveFile = (index: number) => {
    if (!value) return;
    const newFiles = [...value];
    newFiles.splice(index, 1);
    onChange(newFiles.length > 0 ? newFiles : null);
  };

  const renderPreview = () => {
    if (!value || value.length === 0) return null;
    
    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-4">
        {value.map((file, index) => (
          <div key={index} className="relative group">
            {type === 'image' && (
              <div className="aspect-square rounded-md overflow-hidden border bg-muted">
                <img 
                  src={URL.createObjectURL(file)} 
                  alt={`Preview ${index}`} 
                  className="w-full h-full object-cover"
                />
              </div>
            )}
            {type === 'video' && (
              <div className="aspect-video rounded-md overflow-hidden border bg-muted flex items-center justify-center">
                <video 
                  src={URL.createObjectURL(file)} 
                  className="w-full h-full object-cover" 
                  controls
                />
              </div>
            )}
            <Button
              type="button"
              variant="destructive"
              size="icon"
              className="absolute -top-2 -right-2 rounded-full h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => handleRemoveFile(index)}
            >
              <X className="h-3 w-3" />
            </Button>
            <p className="text-xs text-muted-foreground mt-1 truncate">{file.name}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <Button
          type="button"
          variant="outline"
          onClick={() => fileInputRef.current?.click()}
          className="gap-2"
        >
          {type === 'image' ? <ImagePlus className="h-4 w-4" /> : <VideoIcon className="h-4 w-4" />}
          {type === 'image' ? 'Add Images' : 'Add Video'}
        </Button>
        <Input
          type="file"
          ref={fileInputRef}
          accept={accept}
          onChange={handleFileChange}
          multiple={multiple}
          className="hidden"
        />
        <p className="text-sm text-muted-foreground">
          {type === 'image' 
            ? `Max ${maxFiles} images, up to ${maxSize}MB each`
            : `Max ${maxFiles} videos, up to ${maxSize}MB each`
          }
        </p>
      </div>
      {renderPreview()}
    </div>
  );
};

export default MediaUpload;
