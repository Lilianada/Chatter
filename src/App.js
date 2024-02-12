import "./App.css";
import LandingPage from "./page/LandingPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Signin from "./page/Signin";
import ErrorPage from "./page/404";
import Home from "./page/Home";
import ArticlesList from "./page/ArticlesList";
import Profile from "./page/Profile";
import Settings from "./page/Settings";
import NewArticle from "./page/NewArticle";
import AuthContext from "./context/AuthContext";
import ProtectedRoutes from "./config/protectedRoutes";
import Support from "./page/Support";

function App() {
  return (
    <AuthContext>
      <Router className="App">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="*" element={<ErrorPage />} />
          <Route path="/signin" element={<Signin />} />
          <Route
            path="/home"
            element={
              <ProtectedRoutes>
                <Home />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/new-article"
            element={
              <ProtectedRoutes>
                <NewArticle />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/articles"
            element={
              <ProtectedRoutes>
                <ArticlesList />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoutes>
                <Profile />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/settings"
            element={
              <ProtectedRoutes>
                <Settings />
              </ProtectedRoutes>
            }
          />
          <Route
            path="/support"
            element={
              <ProtectedRoutes>
                <Support />
              </ProtectedRoutes>
            }
          />
        </Routes>
      </Router>
    </AuthContext>
  );
}

export default App;
