import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search, AlertTriangle } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  const suggestions = [
    "Check the URL for typos",
    "Use the navigation menu above",
    "Try our search function",
    "Return to the homepage",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20 flex flex-col items-center justify-center p-4">
      {/* Error Code */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-muted to-muted/50 rounded-full mb-6 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5 rounded-full blur-xl"></div>
          <AlertTriangle className="h-12 w-12 text-primary relative z-10" />
        </div>
        <h1 className="font-display text-7xl md:text-8xl font-bold tracking-tight bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
          404
        </h1>
      </div>

      {/* Main Message */}
      <div className="max-w-lg w-full space-y-6 mb-8">
        <div className="text-center space-y-3">
          <h2 className="font-display text-2xl md:text-3xl font-semibold text-foreground">
            Page Not Found
          </h2>
          <p className="text-muted-foreground leading-relaxed">
            The page <code className="bg-muted px-2 py-1 rounded text-sm font-mono">{location.pathname}</code> 
            {" "}you're looking for doesn't exist or has been moved.
          </p>
        </div>

        {/* Suggestions */}
        <div className="space-y-3">
          <div className="flex items-center justify-center gap-2">
            <Search className="h-5 w-5 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">Here's what you can do next:</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestions.map((suggestion, index) => (
              <div
                key={index}
                className="bg-muted/30 border border-border rounded-lg p-3 flex items-start gap-2 hover:bg-muted/50 transition-colors"
              >
                <div className="w-6 h-6 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs font-semibold text-primary">{index + 1}</span>
                </div>
                <p className="text-sm text-foreground text-left">{suggestion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button
            size="lg"
            className="gap-2 flex-1"
            onClick={() => navigate("/")}
          >
            <Home className="h-5 w-5" />
            Back to Homepage
          </Button>
          <Button
            variant="outline"
            size="lg"
            className="gap-2 flex-1"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft className="h-5 w-5" />
            Go Back
          </Button>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-6 border-t border-border text-center max-w-md">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Kayahaus • Error 404
        </p>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => navigate("/contact")}
          className="mt-2 text-primary"
        >
          Contact Support
        </Button>
      </div>
    </div>
  );
};

export default NotFound;