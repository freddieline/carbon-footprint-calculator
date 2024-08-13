import React, { createContext, useState, ReactNode, useContext } from 'react';
import type { Meal } from '../interfaces/Meal';

type EmissionsContextType = {
  selectedMeals: Meal[];
  setSelectedMeals: React.Dispatch<React.SetStateAction<Meal[]>>;
  selectedTransport: Meal[];
  setSelectedTransport: React.Dispatch<React.SetStateAction<Meal[]>>;
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

  return (
    <EmissionsContext.Provider
      value={{
        selectedTransport,
        setSelectedTransport,
        selectedMeals,
        setSelectedMeals,
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
