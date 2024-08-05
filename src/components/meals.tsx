import {
  SetStateAction,
  useEffect,
  useState,
  ChangeEvent,
  KeyboardEvent,
} from 'react';
import { useGetMeals } from '../hooks/useGetMeals';
import { Summary } from './summary';
import { Input } from './input';

export interface Meal {
  ID: number;
  Meal: string;
  Emissions: number;
}

export function Meals() {
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

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (filteredMeals.length === 0) return;

    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex === null
            ? 0
            : Math.min(filteredMeals.length - 1, prevIndex + 1)
        );
        break;
      case 'ArrowUp':
        e.preventDefault();
        setFocusedIndex((prevIndex) =>
          prevIndex === null ? 0 : Math.max(0, prevIndex - 1)
        );
        break;
      case 'Enter':
        if (focusedIndex !== null) {
          selectedMeals.push(filteredMeals[focusedIndex]);
          setFilteredMeals([]);
        }
        break;
      default:
        break;
    }
  };

  return (
    <>
      <h2>Meals eaten today</h2>
      <div style={{ display: 'flex', padding: '1em' }}>
        <div style={{ width: '50%' }}>
          <p>
            <b>Meals search:</b>{' '}
          </p>
          <Input onChangeCallback={filterItems} onKeyDown={onKeyDown}></Input>
          {error && <p>{error}</p>}
          <ul>
            {filteredMeals.length > 0 ? (
              filteredMeals.map((row, index) => {
                const displayValue = row['Meal']
                  ? row['Meal'].toString()
                  : `Item ${index + 1}`;
                const isFocused = focusedIndex === index;

                return (
                  <li
                    key={index}
                    style={{
                      cursor: 'pointer',
                      padding: '5px',
                      border: isFocused ? '2px solid #007bff' : 'none',
                    }}
                  >
                    {displayValue}
                  </li>
                );
              })
            ) : (
              <></>
            )}
          </ul>
        </div>
        <div>
          <Summary selectedMeals={selectedMeals}></Summary>
        </div>
      </div>
    </>
  );
}
