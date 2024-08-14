import { useState } from 'react';
import { useGetMeals } from '../hooks/useGetMeals';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import { SelectedMeals } from '../components/SelectedMeals';
import type { Meal } from '../interfaces/Meal';
import { Link } from 'react-router-dom';
import { useEmissionsProvider } from '../providers/EmissionsProvider';

type InputProps = {
  selectedMeals: Meal[];
};

function Meals() {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const { meals, error } = useGetMeals();
  const { selectedMeals, incrementMealQuantity, addMeal, deleteMeal } =
    useEmissionsProvider();

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
      <div style={{ padding: '1em', maxWidth: '600px', margin: '0 auto' }}>
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
        <SelectedMeals
          selectedMeals={selectedMeals}
          incrementMealQuantity={incrementMealQuantity}
          deleteMeal={deleteMeal}
        ></SelectedMeals>
        <Link to="/summary">Next</Link>
      </div>
    </div>
  );
}

export default Meals;