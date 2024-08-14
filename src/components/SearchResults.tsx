import type { Meal } from '../interfaces/Meal';
import './SearchResults.css';

interface InputProps {
  filteredMeals: Meal[];
  addMeal: (meal: Meal) => void;
  setFilteredMeals: any;
}
export const SearchResults: React.FC<InputProps> = ({
  filteredMeals,
  setFilteredMeals,
  addMeal,
}) => {
  return (
    <div className="results-list">
      {filteredMeals.length > 0 ? (
        filteredMeals.map((row: Meal, index) => {
          const displayValue = row['Meal']
            ? row['Meal'].toString()
            : `Item ${index + 1}`;

          return (
            <div
              className="list-item"
              key={index}
              style={{
                cursor: 'pointer',
                padding: '10px',
              }}
              onClick={() => {
                addMeal(row);
                setFilteredMeals([]);
              }}
            >
              {displayValue}
            </div>
          );
        })
      ) : (
        <></>
      )}
    </div>
  );
};
