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
          <div style={{ display: 'flex' }}>
            <p>
              <b>Meals footprint:</b>{' '}
            </p>
            <div style={{ marginLeft: '0.7rem' }}>
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
              <b>Your yearly footprint:</b> {getYearlyEmissions()} tons CO2e
            </p>

            <p>
              <b>Average annual UK footprint:</b> 11.7 tons CO2e
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
