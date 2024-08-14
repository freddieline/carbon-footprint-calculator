import type { Meal } from '../interfaces/Meal';
import './SearchInput';

type InputProps = {
  selectedMeals: Meal[];
  deleteMeal: (meal: Meal) => void;
  incrementMealQuantity: (meal: Meal) => void;
};

export const SelectedMeals: React.FC<InputProps> = ({
  selectedMeals,
  deleteMeal,
  incrementMealQuantity,
}) => {
  function handleOnAdd(meal: Meal) {
    incrementMealQuantity(meal);
  }

  function handleOnDelete(meal: Meal) {
    deleteMeal(meal);
  }

  return (
    <>
      {selectedMeals.length != 0 && (
        <>
          <div>
            <p>
              <b>Meals footprint:</b>{' '}
            </p>
            <table className="table-fixed min-w-full">
              {selectedMeals &&
                selectedMeals.map((meal: Meal) => {
                  return (
                    <tr className="search-result" key={meal.ID}>
                      <td className="w-1/2 px-1 py-1">
                        {meal.Quantity && meal.Quantity + ' x '} {meal.Meal}
                      </td>
                      <td className="w-1/4 px-1 py-1">
                        {meal.Quantity != undefined
                          ? Math.round(meal.Emissions * meal.Quantity * 100) /
                            100
                          : meal.Emissions}{' '}
                        kg CO2e{' '}
                      </td>
                      <td className="w-1/5 px-1 py-1">
                        <button
                          className="btn btn-sm btn-circle btn-outline"
                          style={{ marginRight: '12px' }}
                          onClick={() => handleOnAdd(meal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              strokeWidth="2"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                        <button
                          className="btn btn-sm btn-circle btn-outline"
                          onClick={() => handleOnDelete(meal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-4 w-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </table>
          </div>
        </>
      )}
    </>
  );
};
