import type { Meal } from './meals';

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

    return ukNumberFormatter.format(reduce * 365);
  }

  return (
    <>
      <p>
        <b>Meals footprint:</b>{' '}
      </p>
      {selectedMeals &&
        selectedMeals.map((meal) => {
          return (
            <p>
              {meal.Meal} ({meal.Emissions} kg CO2e)
            </p>
          );
        })}
      {selectedMeals && (
        <p>
          <b>Daily footprint:</b> {getDailyEmissions()} kg CO2e
        </p>
      )}
      {selectedMeals && (
        <p>
          <b>Yearly footprint</b> {getYearlyEmissions()} kg CO2e
        </p>
      )}
    </>
  );
};
