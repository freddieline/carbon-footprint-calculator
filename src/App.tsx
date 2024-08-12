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
    const duplicateMeal = getDuplicateMeal(meal);
    if (duplicateMeal) {
      incrementQuantity(meal);
    } else {
      setSelectedMeals((prevItems) => [...prevItems, meal]);
    }

    setFilteredMeals([]);
  }

  function incrementQuantity(meal: Meal) {
    const amendMeals = selectedMeals.map((item) => {
      if (item.ID == meal.ID && item.Quantity) {
        item.Quantity += 1;
      } else if (item.ID == meal.ID) {
        item.Quantity = 2;
      }
      return item;
    });
    setSelectedMeals(amendMeals);
  }

  function getDuplicateMeal(meal: Meal) {
    return selectedMeals.filter((item) => item.ID == meal.ID).length > 0;
  }

  function deleteItem(deleteItem: Meal) {
    const newList: Meal[] = selectedMeals.reduce((acc: Meal[], meal: Meal) => {
      if (deleteItem.ID == meal.ID && meal.Quantity && meal.Quantity >= 2) {
        meal.Quantity -= 1;
        acc.push(meal);
      } else if (meal.ID != meal.ID) {
        acc.push(meal);
      }
      return acc;
    }, []);

    setSelectedMeals(newList);
  }

  return (
    <div className="App">
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
          onSelectMeal={onSelectMeal}
        ></SearchResults>
        <Summary
          selectedMeals={selectedMeals}
          onDeleteItem={deleteItem}
          incrementQuantity={incrementQuantity}
        ></Summary>
      </div>
    </div>
  );
}

export default App;
