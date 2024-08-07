import './App.css';
import {
  SetStateAction,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { useGetMeals } from './hooks/useGetMeals';
import { Summary } from './components/Summary';
import { SearchInput } from './components/SearchInput';
import { SearchResults } from './components/SearchResults';
import type { Meal } from './interfaces/Meal';

type InputProps = {
  selectedMeals: Meal[];
};

function App() {
  const [filteredMeals, setFilteredMeals] = useState<Meal[]>([]);
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [focusedIndex, setFocusedIndex] = useState<number | null>(null);

  const { meals, error } = useGetMeals();

  const filterItems = (searchTerm: string) => {
    // we now use 'users' instead of 'apiUsers' to do the filtering
    const filteredItems = meals.filter(
      (meal: Meal) =>
        searchTerm != '' &&
        meal.Meal.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredMeals(filteredItems);
  };

  function onSelectMeal(meal: Meal){
    setSelectedMeals(prevItems => [...prevItems, meal])
    setFilteredMeals([]);
  }

  return (
    <div className="App">
      <h2>Carbon footprint calculator:</h2>
      <div style={{ display: 'flex', padding: '1em' }}>
        <div style={{ width: '50%' }}>
          <p>
            <b>Add meals eaten today:</b>{' '}
          </p>
          <SearchInput onChangeCallback={filterItems}></SearchInput>
          {error && <p>{error}</p>}
          <SearchResults filteredMeals={filteredMeals} onSelectMeal={onSelectMeal}></SearchResults>
        </div>
        <div>
          <Summary selectedMeals={selectedMeals}></Summary>
        </div>
      </div>
    </div>
  );
}

export default App;
