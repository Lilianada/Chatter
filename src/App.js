import './App.css';
import LandingPage from './page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import ErrorPage from './page/404';
import Home from './page/Home';
import ArticlesList from './page/ArticlesList';
import Profile from './page/Profile';
import Settings from './page/Settings';

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='*' element={<ErrorPage /> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/newArticle' element={<ArticlesList/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='settings' element={<Settings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
