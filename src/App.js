import './App.css';
import LandingPage from './page/LandingPage';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router className="App">
       <LandingPage/>
    </Router>
  );
}

export default App;
