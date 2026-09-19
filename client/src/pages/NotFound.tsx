import { ENGLISH_CONTENT } from "@shared/i18n";
import { Link } from "wouter";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { AlertCircle } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <Navigation />

      <section className="flex-1 flex items-center justify-center py-20">
        <div className="container max-w-2xl text-center">
          <div className="flex justify-center mb-6">
            <AlertCircle className="w-16 h-16 text-accent" />
          </div>
          <h1 className="text-6xl font-bold text-accent mb-4">404</h1>
          <h2 className="text-3xl font-bold text-foreground mb-4">Page Not Found</h2>
          <p className="text-lg text-muted-foreground mb-8">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link href="/">
            <a className="btn-primary inline-block">Back to Home</a>
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
}
