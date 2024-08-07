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
          <p>
            <b>Meals footprint:</b>{' '}
          </p>
          <ul>
            {selectedMeals &&
              selectedMeals.map((meal, index) => {
                return (
                  <div key={meal.ID} style={{padding: '0.2rem 0'}}>
                    {meal.Meal} ({meal.Emissions} kg CO2e)
                  </div>
                );
              })}
          </ul>

          <>
            <p>
              <b>Daily footprint:</b> {getDailyEmissions()} kg CO2e
            </p>
            <p>
              <b>Yearly footprint</b> {getYearlyEmissions()} tons CO2e
            </p>

            <p>
              <b>Average UK footprint</b> 11.7 tons CO2e
            </p>
            <p>
              <b>2030 UK footprint target (annual pp)</b> 3-4 tons CO2e
            </p>
          </>
        </>
      )}
    </>
  );
};
