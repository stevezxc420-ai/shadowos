import { useState, useRef } from "react";
import { Upload, Play, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const DemoVideoSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      const url = URL.createObjectURL(file);
      setVideoUrl(url);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    handleFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(file);
  };

  const clearVideo = () => {
    if (videoUrl) URL.revokeObjectURL(videoUrl);
    setVideoUrl(null);
  };

  return (
    <section id="demo" className="relative py-24 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            See it in <span className="text-primary">action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload a demo video to showcase your shadow operations workflow.
          </p>
        </div>

        {/* Video Upload Card */}
        <div className="max-w-4xl mx-auto">
          <div
            className={`glass-card p-8 transition-all duration-300 ${
              isDragging ? "border-primary/70 bg-primary/10" : ""
            }`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {videoUrl ? (
              <div className="relative">
                {/* Clear button */}
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2 z-10 bg-background/80 hover:bg-background"
                  onClick={clearVideo}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Video player */}
                <div className="relative rounded-lg overflow-hidden border border-glass-border">
                  <video
                    src={videoUrl}
                    controls
                    className="w-full aspect-video bg-slate-deep"
                  >
                    Your browser does not support the video tag.
                  </video>
                </div>
              </div>
            ) : (
              <div
                className="flex flex-col items-center justify-center py-16 cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                {/* Upload icon */}
                <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-primary/10 border border-primary/30">
                  <Upload className="h-10 w-10 text-primary" />
                </div>

                {/* Upload text */}
                <h3 className="font-display text-2xl font-semibold mb-2 text-foreground">
                  Upload Demo Video
                </h3>
                <p className="text-muted-foreground mb-6 text-center max-w-md">
                  Drag and drop your video file here, or click to browse
                </p>

                {/* Upload button */}
                <Button variant="glow" className="gap-2">
                  <Play className="h-4 w-4" />
                  Choose Video
                </Button>

                {/* File input */}
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={handleInputChange}
                />

                {/* Supported formats */}
                <p className="text-xs text-muted-foreground mt-4">
                  Supports MP4, WebM, MOV up to 100MB
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
