import type { Meal } from '../interfaces/Meal';
import './SearchResults.css';

interface InputProps {
  filteredMeals: Meal[];
  onSelectMeal: (meal: Meal) => void;
}
export const SearchResults: React.FC<InputProps> = ({
  filteredMeals,
  onSelectMeal,
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
              className="search-result"
              key={index}
              style={{
                cursor: 'pointer',
                padding: '10px',
              }}
              onClick={() => onSelectMeal(row)}
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
