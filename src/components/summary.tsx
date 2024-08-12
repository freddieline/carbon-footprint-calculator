import type { Meal } from '../interfaces/Meal';

type InputProps = {
  selectedMeals: Meal[];
};

export const Summary: React.FC<InputProps> = ({ selectedMeals }) => {
  const ukNumberFormatter = new Intl.NumberFormat('en-GB');
  function getDailyEmissions() {
    const reduce = selectedMeals.reduce((accumul, meal) => {
      return Number(accumul) + Number(meal.Emissions);
    }, 0);

    return ukNumberFormatter.format(reduce);
  }

  function getYearlyEmissions() {
    const reduce = selectedMeals.reduce((accumul, meal) => {
      return accumul + Number(meal.Emissions);
    }, 0);

    return ukNumberFormatter.format((reduce * 365) / 1000);
  }

  return (
    <>
      {selectedMeals.length != 0 && (
        <>
          <div>
            <p>
              <b>Meals footprint:</b>{' '}
            </p>
            <div>
              {selectedMeals &&
                selectedMeals.map((meal, index) => {
                  return (
                    <p key={meal.ID}>
                      {meal.Meal} ({meal.Emissions} kg CO2e)
                    </p>
                  );
                })}
            </div>
          </div>
          <hr />
          <div>
            <p>
              <b>Your daily footprint:</b> {getDailyEmissions()} kg CO2e
            </p>
            <p>
              <b>UK average daily footprint (pp):</b> *29 kg CO2e
            </p>
            <p>
                <b>UK 2030 daily footprint target (pp):</b> **15 tons CO2e
            </p >
            <div ></div>
            <p style={{fontSize:'12px'}}>
              * based on a <a target="_blank" href="https://www.ons.gov.uk/economy/environmentalaccounts/methodologies/measuringukgreenhousegasemissions">Consumption-Based GHG Emissions of 705Mt CO2e in 2021 which calculates as 10.52 tons CO2e per capita per year </a> 
            </p>
            <p style={{fontSize:'12px'}}>** based on a calculated <a target="_blank" href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/">68% target reduction from 1990s levels (16.75 to 5.36 tons CO2e per capita per year) </a>
            </p>
          </div>
        </>
      )}
    </>
  );
};
