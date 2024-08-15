import type { Meal } from '../interfaces/Meal';
import { useContext } from 'react';
import { useMealsProvider } from '../providers/MealsProvider';
import { Link } from 'react-router-dom';

export const Summary = () => {
  const { selectedMeals } = useMealsProvider();

  const ukNumberFormatter = new Intl.NumberFormat('en-GB');
  function getDailyEmissions() {
    const reduce = selectedMeals.reduce((accumul: Number, meal: Meal) => {
      if (meal.Quantity) {
        return Number(accumul) + Number(meal.Emissions) * Number(meal.Quantity);
      } else {
        return Number(accumul) + Number(meal.Emissions);
      }
    }, 0);

    return ukNumberFormatter.format(reduce);
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Personal carbon footprint calculator
      </h1>
      <p>
        <b>Your daily footprint:</b> {getDailyEmissions()} kg CO2e
      </p>
      <p>
        <b>UK average daily footprint (pp):</b> *29 kg CO2e
      </p>
      <p>
        <b>UK 2030 daily footprint target (pp):</b> **15 tons CO2e
      </p>
      <div></div>
      <p style={{ fontSize: '12px' }}>
        * based on a{' '}
        <a
          target="_blank"
          href="https://www.ons.gov.uk/economy/environmentalaccounts/methodologies/measuringukgreenhousegasemissions"
        >
          Consumption-Based GHG Emissions of 705Mt CO2e in 2021 which calculates
          as 10.52 tons CO2e per capita per year{' '}
        </a>
      </p>
      <p style={{ fontSize: '12px' }}>
        ** based on a calculated{' '}
        <a
          target="_blank"
          href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/"
        >
          68% target reduction from 1990s levels (16.75 to 5.36 tons CO2e per
          capita per year){' '}
        </a>
      </p>

        <Link to="/meals"><button className="btn btn-active btn-neutral mt-5"><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
</svg>
Back</button></Link>
    </div>
  );
};

export default Summary;
