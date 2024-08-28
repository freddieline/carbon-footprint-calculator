import { useState, useEffect, useReducer, useCallback, useMemo } from 'react';
import Papa from 'papaparse';

import type { DieselCar, PetrolCar, ElectricCar } from '../types/Cars';

type CarType = 'petrol' | 'diesel' | 'electric';

type State = {
  petrolCars: PetrolCar[];
  dieselCars: DieselCar[];
  electricCars: ElectricCar[];
  error: string | null;
};

type Action =
  | {
      type: 'SET_CARS';
      carType: CarType;
      cars: PetrolCar[] | DieselCar[] | ElectricCar[];
    }
  | { type: 'SET_ERROR'; error: string };

const initialState: State = {
  petrolCars: [],
  dieselCars: [],
  electricCars: [],
  error: null,
};

export const carsReducer = (state: State, action: Action) => {
  switch (action.type) {
    case 'SET_CARS':
      return {
        ...state,
        [`${action.carType}Cars`]: action.cars,
      };
    case 'SET_ERROR':
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const useGetCars = () => {
  const [state, dispatch] = useReducer(carsReducer, initialState);
  const [error, setError] = useState<string | null>(null);
  const fetchCars = useCallback(
    (type: CarType, url: string) => {
      fetch(url)
        .then((response) => response.text())
        .then((csvText) => {
          Papa.parse(csvText, {
            header: true,
            complete: (results) => {
              const typedResults = results.data as PetrolCar[] | DieselCar[] | ElectricCar[];
              dispatch({ type: 'SET_CARS', carType: type, cars: typedResults });
            },
            error: (parseError: any) => {
              setError(`Error while parsing CSV file for ${type} cars: ${parseError.message}`);
            },
          });
        })
        .catch((fetchError) => {
          setError(`Error while fetching CSV file for ${type} cars: ${fetchError.message}`);
        });
    },
    []
  );

  useEffect(() => {
    fetchCars('petrol', '/data/petrol-cars.csv');
    fetchCars('diesel', '/data/diesel-cars.csv');
    fetchCars('electric', '/data/electric-cars.csv');
  }, [fetchCars]);

  const memoizedState = useMemo(() => state, [state.petrolCars, state.dieselCars, state.electricCars]);


  return { ...memoizedState };
};
