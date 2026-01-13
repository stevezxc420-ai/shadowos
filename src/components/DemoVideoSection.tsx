import { useState, useRef } from "react";
import { Upload, Play, X, Film, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const DemoVideoSection = () => {
  const [videoUrl, setVideoUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { ref: sectionRef, isVisible } = useScrollAnimation();

  const handleFileSelect = (file: File) => {
    if (file && file.type.startsWith("video/")) {
      setIsUploading(true);
      // Simulate upload progress
      setTimeout(() => {
        const url = URL.createObjectURL(file);
        setVideoUrl(url);
        setIsUploading(false);
      }, 800);
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
      <div className="absolute inset-0 grid-pattern opacity-10" />

      <div className="container mx-auto px-6 relative z-10">
        {/* Section Header */}
        <div 
          ref={sectionRef}
          className={`text-center max-w-2xl mx-auto mb-12 transition-all duration-700 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-primary/30 bg-primary/5 mb-4">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            <span className="text-xs text-primary font-medium">See the magic</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-bold mb-4">
            See it in <span className="text-primary">action</span>
          </h2>
          <p className="text-lg text-muted-foreground">
            Upload a demo video to showcase your shadow operations workflow.
          </p>
        </div>

        {/* Video Upload Card */}
        <div className={`max-w-4xl mx-auto transition-all duration-700 delay-200 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
        }`}>
          <div
            className={`glass-card p-2 transition-all duration-300 ${
              isDragging ? "border-primary/70 bg-primary/10 scale-[1.02]" : ""
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
                  className="absolute top-4 right-4 z-10 bg-background/80 hover:bg-background border border-border"
                  onClick={clearVideo}
                >
                  <X className="h-4 w-4" />
                </Button>

                {/* Video player */}
                <div className="relative rounded-lg overflow-hidden">
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
                className={`relative flex flex-col items-center justify-center py-20 cursor-pointer rounded-lg border-2 border-dashed transition-all duration-300 ${
                  isDragging 
                    ? "border-primary bg-primary/5" 
                    : "border-border/50 hover:border-primary/50 hover:bg-muted/20"
                } ${isUploading ? "pointer-events-none" : ""}`}
                onClick={() => fileInputRef.current?.click()}
              >
                {/* Animated background pattern */}
                <div className="absolute inset-0 grid-pattern opacity-20 rounded-lg" />
                
                {isUploading ? (
                  <div className="flex flex-col items-center gap-4 relative z-10">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/30 border-t-primary animate-spin" />
                    <p className="text-muted-foreground">Processing video...</p>
                  </div>
                ) : (
                  <>
                    {/* Upload icon with decoration */}
                    <div className="relative mb-6">
                      <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-primary/10 border border-primary/30 group-hover:bg-primary/20 transition-colors">
                        <Film className="h-10 w-10 text-primary" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center">
                        <Upload className="h-4 w-4 text-primary" />
                      </div>
                    </div>

                    {/* Upload text */}
                    <h3 className="font-display text-2xl font-semibold mb-2 text-foreground relative z-10">
                      Upload Demo Video
                    </h3>
                    <p className="text-muted-foreground mb-6 text-center max-w-md relative z-10">
                      Drag and drop your video file here, or click to browse
                    </p>

                    {/* Upload button */}
                    <Button variant="glow" className="gap-2 relative z-10">
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
                    <p className="text-xs text-muted-foreground mt-6 relative z-10">
                      Supports MP4, WebM, MOV up to 100MB
                    </p>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DemoVideoSection;
