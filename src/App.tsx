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

  function onSelectMeal(meal: Meal) {
    setSelectedMeals((prevItems) => [...prevItems, meal]);
    setFilteredMeals([]);
  }

  function deleteItem(item: Meal) {
    const newList = selectedMeals.filter((meal) => item.ID != meal.ID);
    setSelectedMeals(newList);
  }

  return (
    <div className="App">
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Personal carbon footprint calculator
      </h1>
      <div style={{ padding: '1em', maxWidth: '600px', margin: '0 auto' }}>
        <p>
          <b>Add meals you eat on an average day:</b>{' '}
        </p>
        <SearchInput onChangeCallback={filterItems}></SearchInput>
        {error && <p>{error}</p>}
        <SearchResults
          filteredMeals={filteredMeals}
          onSelectMeal={onSelectMeal}
        ></SearchResults>
        <Summary
          selectedMeals={selectedMeals}
          onDeleteItem={deleteItem}
        ></Summary>
      </div>
    </div>
  );
}

export default App;
