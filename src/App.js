import './App.css';
import LandingPage from './page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import ErrorPage from './page/404';
import Home from './page/Home';
import NewArticle from './page/NewArticle';
import ProfileSettings from './page/ProfileSettings';

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='*' element={<ErrorPage /> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/newArticle' element={<NewArticle/>}/>
        <Route path='/profileSettings' element={<ProfileSettings/>}/>
      </Routes>
    </Router>
  );
}

export default App;
