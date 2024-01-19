import './App.css';
import LandingPage from './page/LandingPage';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './page/Login';
import ErrorPage from './page/404';
import Home from './page/Home';

function App() {
  return (
    <Router className="App">
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path='*' element={<ErrorPage /> }/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
      </Routes>
    </Router>
  );
}

export default App;
