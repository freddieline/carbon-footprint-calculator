import { useState, useEffect } from 'react';
import Papa from 'papaparse';

import type { Meal } from '../components/meals';

export const useGetMeals = () => {
  const [meals, setMeals] = useState<Meal[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/data/meals.csv')
      .then((response) => response.text())
      .then((csvText) => {
        Papa.parse<Meal>(csvText, {
          header: true,
          complete: (results) => {
            setMeals(results.data);
          },
          error: (parseError: any) => {
            setError('Error while parsing CSV file: ' + parseError.message);
          },
        });
      })
      .catch((fetchError) => {
        setError('Error while fetching CSV file: ' + fetchError.message);
      });
  }, []);

  return { meals, error };
};
