import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import { WalletContextProvider } from "./lib/walletProvider";

const Home = lazy(() => import("./pages/Home"));
const Museum = lazy(() => import("./pages/Museum"));
const DefenseHub = lazy(() => import("./pages/DefenseHub"));
const Roadmap = lazy(() => import("./pages/Roadmap"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/museum" component={Museum} />
        <Route path="/defense-hub" component={DefenseHub} />
        <Route path="/roadmap" component={Roadmap} />
        <Route path="/404" component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <LanguageProvider>
          <WalletContextProvider>
            <TooltipProvider>
              <Toaster />
              <div className="min-h-screen bg-[var(--bg-page)] text-[var(--text-primary)]">
                <Router />
              </div>
            </TooltipProvider>
          </WalletContextProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
