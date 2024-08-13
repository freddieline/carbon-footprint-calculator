import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './routes/Home';
import Meals from './routes/Meals';
import Transport from './routes/Transport';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Meals />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/transport" element={<Transport />} />
      </Routes>
    </Router>
  );
}

export default App;
