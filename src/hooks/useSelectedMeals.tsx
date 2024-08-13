import { useState } from 'react';

import type { Meal } from '../interfaces/Meal';

function useSelectedMeals() {
  const [selectedMeals, setSelectedMeals] = useState<Meal[]>([]);

  function onSelectMeal(meal: Meal) {
    const duplicateMeal = getDuplicateMeal(meal);
    if (duplicateMeal) {
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

  function getDuplicateMeal(meal: Meal) {
    if (selectedMeals) {
      return selectedMeals.filter((item) => item.ID == meal.ID).length > 0;
    }

    return null;
  }

  function deleteItem(deleteItem: Meal) {
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

  return { deleteItem, onSelectMeal, incrementQuantity };
}
