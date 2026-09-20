import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";

const Home = lazy(() => import("./pages/Home"));
const Platform = lazy(() => import("./pages/Platform"));
const RealCases = lazy(() => import("./pages/RealCases"));
const Tokenomics = lazy(() => import("./pages/Tokenomics"));
const Airdrop = lazy(() => import("./pages/Airdrop").then((m) => ({ default: m.Airdrop })));
const Whitepaper = lazy(() => import("./pages/Whitepaper"));
const Guardian = lazy(() => import("./pages/Guardian"));

function Router() {
  return (
    <Suspense fallback={null}>
      <Switch>
        <Route path={"/"} component={Home} />
        <Route path={"/platform"} component={Platform} />
        <Route path={"/real-cases"} component={RealCases} />
        <Route path={"/guardian"} component={Guardian} />
        <Route path={"/tokenomics"} component={Tokenomics} />
        <Route path={"/airdrop"} component={Airdrop} />
        <Route path={"/whitepaper"} component={Whitepaper} />
        <Route path={"/404"} component={NotFound} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}
// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook
const SITE_BG = "";
function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider
        defaultTheme="dark"
      >
        <LanguageProvider>
          <TooltipProvider>
            <Toaster />
            {/* Global background wrapper - applies circuit board background to all pages */}
            <div
              className="min-h-screen"
              style={{
                backgroundColor: '#030712',
              }}
            >
              {/* Dark overlay to ensure readability */}
              <div
                className="min-h-screen"
                style={{ backgroundColor: 'rgba(3, 7, 18, 0.42)' }}
              >
                <Router />
              </div>
            </div>
          </TooltipProvider>
        </LanguageProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}
export default App;
