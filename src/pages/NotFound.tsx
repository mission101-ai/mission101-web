import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { SEO } from "@/components/SEO";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <SEO 
        title="404 - Page Not Found | mission101.ai"
        description="The page you are looking for does not exist. Return to mission101.ai homepage."
      />
      <div className="text-center">
        <h1 className="mb-4 text-4xl font-bold font-mono text-accent">404</h1>
        <p className="mb-4 text-xl text-muted-foreground">Oops! Page not found</p>
        <a 
          href="/" 
          className="inline-block px-6 py-3 bg-accent text-accent-foreground font-mono font-semibold rounded-md hover:bg-accent/90 transition-all duration-300"
        >
          Return to Home
        </a>
      </div>
    </div>
  );
};

export default NotFound;
