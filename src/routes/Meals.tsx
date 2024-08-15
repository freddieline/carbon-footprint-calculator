import { useState } from 'react';
import { useGetMeals } from '../hooks/useGetMeals';
import { SearchInput } from '../components/SearchInput';
import { SearchResults } from '../components/SearchResults';
import { SelectedMeals } from '../components/SelectedMeals';
import type { Meal } from '../interfaces/Meal';
import { Link } from 'react-router-dom';
import { useMealsProvider } from '../providers/MealsProvider';

type InputProps = {
  selectedMeals: Meal[];
};

function Meals() {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const { meals, error } = useGetMeals();
  const { selectedMeals, addMeal, deleteMeal } =
    useMealsProvider();

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
          addMeal={addMeal}
          deleteMeal={deleteMeal}
        ></SelectedMeals>
        {selectedMeals.length != 0 && (
        <Link to="/summary"><button className="btn btn-active btn-neutral mt-5">Continue<svg style={{marginLeft:"10px"}}xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
</svg></button></Link>)}
      </div>
    </div>
  );
}

export default Meals;
