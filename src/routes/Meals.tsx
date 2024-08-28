import { useState } from 'react';
import { useGetMeals } from '../hooks/useGetMeals';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import type { Meal } from '../types/Meal';
import { Link } from 'react-router-dom';
import { useMealsProvider } from '../providers/MealsProvider';

type InputProps = {
  selectedMeals: Meal[];
};

function Meals() {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const { meals, error } = useGetMeals();
  const { selectedMeals, addMeal, deleteMeal } = useMealsProvider();

  const filterItems = (searchTerm: string) => {
    // we now use 'users' instead of 'apiUsers' to do the filtering
    const filteredItems = meals.filter(
      (meal: Meal) =>
        searchTerm != '' &&
        meal.Meal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filteredItems);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Personal carbon footprint calculator
      </h1>
      <div>
        <p>
          <b>What do you eat on an average day?</b>{' '}
        </p>
        <SearchInput onChangeCallback={filterItems}></SearchInput>
        {error && <p>{error}</p>}
        <SearchResults
          filteredMeals={filteredMeals}
          addMeal={addMeal}
          setFilteredMeals={setFilteredMeals}
        ></SearchResults>
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
                            onClick={() => addMeal(meal)}
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
                            onClick={() => deleteMeal(meal)}
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
        {selectedMeals.length != 0 && (
          <Link to="/transport">
            <button className="btn btn-active btn-neutral mt-5">
              Continue
              <svg
                style={{ marginLeft: '10px' }}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
                />
              </svg>
            </button>
          </Link>
        )}
      </div>
    </div>
  );
}

export default Meals;
