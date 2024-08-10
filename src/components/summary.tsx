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
          <>
            <p>
              <b>Your daily footprint:</b> {getDailyEmissions()} kg CO2e
            </p>
            <p>
              <b>UK average daily footprint:</b> *14 kg CO2e
              </p>
              <p>
                <b>UK 2030 daily footprint target (pp):</b> **9 tons CO2e
              </p>
              <p>
              * based on an estimated <a target="_blank" href="https://www.worldometers.info/co2-emissions/uk-co2-emissions/">5.00 tons CO2e pp per year in 2022</a> 
              <br/>** based on a <a target="_blank" href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/">68% target reduction of 1990s levels (10.13 tons CO2e)</a>
            </p>
          </>
        </>
      )}
    </>
  );
};
