import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import Blog from "./pages/Blog";
import BlogArticle from "./pages/BlogArticle";
import Profile from "./pages/Profile";
import Forum from "./pages/Forum";
import ForumThread from "./pages/ForumThread";
import Chat from "./pages/Chat";
import Infographic from "./pages/Infographic";
import Sources from "./pages/Sources";
import Compare from "./pages/Compare";
import Toolkit from "./pages/Toolkit";
import ToolkitTool from "./pages/ToolkitTool";
import ReadingList from "./pages/ReadingList";
import KinkMatcher from "./pages/KinkMatcher";
import Vault from "./pages/Vault";
import Login from "./pages/Login";
import Sandbox from "./pages/Sandbox";
import Synergy from "./pages/Synergy";
import Legality from "./pages/Legality";
import BountyBoard from "./pages/BountyBoard";
import RopeStudio from "./pages/RopeStudio";
import PlatformMatrix from "./pages/PlatformMatrix";
import ConceptGenerator from "./pages/ConceptGenerator";
import DirectMessages from "./pages/DirectMessages";
import DMCARadar from "./pages/DMCARadar";
import SentimentDashboard from "./pages/SentimentDashboard";
import CollabHub from "./pages/CollabHub";
import Leaderboard from "./pages/Leaderboard";
import TrendForecasting from "./pages/TrendForecasting";
import Scheduler from "./pages/Scheduler";
import FanPolls from "./pages/FanPolls";
import TaxSandbox from "./pages/TaxSandbox";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/dashboard" component={Dashboard} />
      <Route path="/sandbox" component={Sandbox} />
      <Route path="/synergy" component={Synergy} />
      <Route path="/legality" component={Legality} />
      <Route path="/bounties" component={BountyBoard} />
      <Route path="/rope-studio" component={RopeStudio} />
      <Route path="/platform-matrix" component={PlatformMatrix} />
      <Route path="/concept-generator" component={ConceptGenerator} />
      <Route path="/direct-messages" component={DirectMessages} />
      <Route path="/dmca" component={DMCARadar} />
      <Route path="/sentiment" component={SentimentDashboard} />
      <Route path="/collab" component={CollabHub} />
      <Route path="/leaderboard" component={Leaderboard} />
      <Route path="/trend-forecasting" component={TrendForecasting} />
      <Route path="/scheduler" component={Scheduler} />
      <Route path="/fan-polls" component={FanPolls} />
      <Route path="/tax-sandbox" component={TaxSandbox} />
      <Route path="/kink-matcher" component={KinkMatcher} />
      <Route path="/vault" component={Vault} />
      <Route path="/blog" component={Blog} />
      <Route path="/blog/:slug" component={BlogArticle} />
      <Route path="/profile" component={Profile} />
      <Route path="/profile/:id" component={Profile} />
      <Route path="/forum" component={Forum} />
      <Route path="/forum/:id" component={ForumThread} />
      <Route path="/chat" component={Chat} />
      <Route path="/infographic" component={Infographic} />
      <Route path="/sources" component={Sources} />
      <Route path="/compare" component={Compare} />
      <Route path="/toolkit" component={Toolkit} />
      <Route path="/toolkit/:slug" component={ToolkitTool} />
      <Route path="/reading-list" component={ReadingList} />
      <Route path="/404" component={NotFound} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
