import './App.css';
import Home from './page/Home';
import { BrowserRouter as Router } from 'react-router-dom';

function App() {
  return (
    <Router className="App">
       <Home/>
    </Router>
  );
}

export default App;
