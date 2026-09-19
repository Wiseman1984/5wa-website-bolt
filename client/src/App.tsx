import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { LanguageProvider } from "./contexts/LanguageContext";
import Home from "./pages/Home";
import Platform from "./pages/Platform";
import Tokenomics from "./pages/Tokenomics";
import { Airdrop } from "./pages/Airdrop";
import Whitepaper from "./pages/Whitepaper";
import Guardian from "./pages/Guardian";

function Router() {
  return (
    <Switch>
      <Route path={"/"} component={Home} />
      <Route path={"/platform"} component={Platform} />
      <Route path={"/guardian"} component={Guardian} />
      <Route path={"/tokenomics"} component={Tokenomics} />
      <Route path={"/airdrop"} component={Airdrop} />
      <Route path={"/whitepaper"} component={Whitepaper} />
      <Route path={"/404"} component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}
// NOTE: About Theme
// - First choose a default theme according to your design style (dark or light bg), than change color palette in index.css
//   to keep consistent foreground/background color across components
// - If you want to make theme switchable, pass `switchable` ThemeProvider and use `useTheme` hook
const SITE_BG = "/manus-storage/bg_option_D_enhanced_750fa344.png";
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
                backgroundImage: `url(${SITE_BG})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundAttachment: 'fixed',
                backgroundRepeat: 'no-repeat',
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
