import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';  // Correct import
import Home from './Components/Home';
import './App.css';

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;

