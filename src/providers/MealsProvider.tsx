import React, { createContext, useState, ReactNode, useContext } from 'react';
import type { Meal } from '../types/Meal';

type MealsContextType = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  addMeal: (meal: Meal) => void;
  deleteMeal: (meal: Meal) => void;
};

const MealsContext = createContext<MealsContextType | undefined>(undefined);

type MealsContextProviderProps = {
  children: ReactNode;
};
export const MealsProvider = ({ children }: MealsContextProviderProps) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);

  function addMeal(meal: Meal) {
    setSelectedMeals((prevItems) => {
      const existingMeal = prevItems.find((item) => item.ID === meal.ID);
      if (existingMeal) {
        return prevItems.map((item) =>
          item.ID === meal.ID
            ? { ...item, Quantity: (item.Quantity || 1) + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...meal, Quantity: 1 }];
      }
    });
  }

  function deleteMeal(deleteItem: Meal) {
    const newList: Meal[] = selectedMeals.reduce((acc: Meal[], meal: Meal) => {
      if (deleteItem.ID == meal.ID && meal.Quantity && meal.Quantity >= 2) {
        meal.Quantity -= 1;
        acc.push(meal);
      } else if (meal.ID != deleteItem.ID) {
        acc.push(meal);
      }
      return acc;
    }, []);

    setSelectedMeals(newList);
  }

  return (
    <MealsContext.Provider
      value={{
        selectedMeals,
        setSelectedMeals,
        addMeal,
        deleteMeal,
      }}
    >
      {children}
    </MealsContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useMealsProvider = () => {
  const context = useContext(MealsContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
