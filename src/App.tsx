import './App.css';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Summary from './routes/Summary';
import Meals from './routes/Meals';
import Transport from './routes/Transport';
import { MealsProvider } from './providers/MealsProvider';

function App() {
  console.log('re-render');
  return (
    <div className="App">
      <MealsProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Meals />} />
            <Route path="/meals" element={<Meals />} />
            <Route path="/transport" element={<Transport />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </Router>
      </MealsProvider>
    </div>
  );
}

export default App;
