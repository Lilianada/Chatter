import "./App.css";
import LandingPage from "./page/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./page/Home";
// import ArticlesList from "./page/ArticlesList";
import Profile from "./page/Profile";
import Settings from "./page/Settings";
import NewArticle from "./page/NewArticle";
import ProtectedRoutes from "./config/protectedRoutes";
import Support from "./page/Support";
import Signin from "./page/Auth/Signin";
import Layout from "./components/Authorized/Layout";
import MainContent from "./components/Authorized/MainContent";
import PageNotFound from "./components/Utils/PageNotFound";
import Activities from "./page/Activities";

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="*" element={<PageNotFound />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard/"
          element={
            <ProtectedRoutes>
              <Layout />
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
            path="help"
            element={
              <ProtectedRoutes>
                <Support />
              </ProtectedRoutes>
            }
          />
          <Route
            path="activities"
            element={
              <ProtectedRoutes>
                <Activities />
              </ProtectedRoutes>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
