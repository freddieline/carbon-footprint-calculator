import React, { createContext, useState, ReactNode, useContext } from 'react';
import type { Meal } from '../interfaces/Meal';

type EmissionsContextType = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  // selectedTransport: Meal[];
  // setSelectedTransport: React.Dispatch<React.SetStateAction<Meal[]>>;
  addMeal: (meal: Meal) => void;
  incrementMealQuantity: (meal: Meal) => void;
  deleteMeal: (meal: Meal) => void;
};

const EmissionsContext = createContext<EmissionsContextType | undefined>(
  undefined
);

type EmissionsContextProviderProps = {
  children: ReactNode;
};
export const EmissionsProvider = ({
  children,
}: EmissionsContextProviderProps) => {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);
  const [selectedTransport, setSelectedTransport] = useState<Meal[]>([]);

  function addMeal(meal: Meal) {
    if (
      selectedMeals &&
      selectedMeals.filter((item) => item.ID == meal.ID).length > 0
    ) {
      incrementQuantity(meal);
    } else {
      setSelectedMeals((prevItems) => [...prevItems, meal]);
    }
  }

  function incrementQuantity(meal: Meal) {
    if (selectedMeals) {
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
  }

  function incrementMealQuantity(meal: Meal) {
    if (selectedMeals) {
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
    <EmissionsContext.Provider
      value={{
        selectedMeals,
        setSelectedMeals,
        addMeal,
        deleteMeal,
        incrementMealQuantity,
      }}
    >
      {children}
    </EmissionsContext.Provider>
  );
};

// Custom hook to use the UserContext
export const useEmissionsProvider = () => {
  const context = useContext(EmissionsContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserContextProvider');
  }
  return context;
};
