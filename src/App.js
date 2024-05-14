import "./App.css";
import LandingPage from "./page/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ErrorPage from "./page/404";
import Home from "./page/Home";
// import ArticlesList from "./page/ArticlesList";
import Profile from "./page/Profile";
import Settings from "./page/Settings";
import NewArticle from "./page/NewArticle";
import ProtectedRoutes from "./config/protectedRoutes";
import Support from "./page/Support";
import Signin from "./page/Auth/Signin";
import Skeleton from "./components/Authorized/Skeleton";
import Arts from "./components/Authorized/Arts";
import MainContent from "./components/Authorized/MainContent";
import Test from "./components/Authorized/Test";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/browse/"
          element={
            <ProtectedRoutes>
              <Test />
            </ProtectedRoutes>
          }
        >
          <Route
            index
            element={
              <ProtectedRoutes>
                <MainContent />
              </ProtectedRoutes>
            }
          />
          <Route
            path="new-article"
            element={
              <ProtectedRoutes>
                <NewArticle />
              </ProtectedRoutes>
            }
          />
          {/* <Route
            path="/onboarding"
            element={
              <ProtectedRoutes>
                <Onboarding />
              </ProtectedRoutes>
            }
          /> */}
          {/* <Route
            path="/articles"
            element={
              <ProtectedRoutes>
                <ArticlesList />
              </ProtectedRoutes>
            }
          /> */}
          <Route
            path="profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="support"
            element={
              <ProtectedRoutes>
                <Support />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
