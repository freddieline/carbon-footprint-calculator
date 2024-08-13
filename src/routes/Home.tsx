import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Personal carbon footprint calculator
      </h1>
      <Link to="/Meals">Calculate</Link>
    </div>
  );
};

export default Home;
