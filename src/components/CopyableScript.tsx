import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Copy, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface CopyableScriptProps {
  text: string;
  label?: string;
}

const CopyableScript = ({ text, label = "Copy" }: CopyableScriptProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      toast({
        title: "Copied!",
        description: "Script copied to clipboard",
      });
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please try again",
        variant: "destructive",
      });
    }
  };

  return (
    <Button
      onClick={handleCopy}
      variant="ghost"
      size="sm"
      className={`h-7 gap-1.5 text-xs transition-all ${
        copied 
          ? "bg-green-500/10 text-green-500 hover:bg-green-500/20 hover:text-green-500" 
          : "bg-primary/10 text-primary hover:bg-primary/20"
      }`}
    >
      {copied ? (
        <>
          <Check className="h-3 w-3" />
          Copied
        </>
      ) : (
        <>
          <Copy className="h-3 w-3" />
          {label}
        </>
      )}
    </Button>
  );
};

export default CopyableScript;
