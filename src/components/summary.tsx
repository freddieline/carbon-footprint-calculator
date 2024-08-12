import type { Meal } from '../interfaces/Meal';
import './Summary.css';

type InputProps = {
  selectedMeals: Meal[];
  onDeleteItem: (meal: Meal) => void;
};

export const Summary: React.FC<InputProps> = ({
  selectedMeals,
  onDeleteItem,
}) => {
  const ukNumberFormatter = new Intl.NumberFormat('en-GB');
  function getDailyEmissions() {
    const reduce = selectedMeals.reduce((accumul, meal) => {
      return Number(accumul) + Number(meal.Emissions);
    }, 0);

    return ukNumberFormatter.format(reduce);
  }

  function handleOnClick(meal: Meal) {
    onDeleteItem(meal);
  }

  return (
    <>
      {selectedMeals.length != 0 && (
        <>
          <div>
            <p>
              <b>Meals footprint:</b>{' '}
            </p>
            <div>
              {selectedMeals &&
                selectedMeals.map((meal, index) => {
                  return (
                    <div className="summary-item" key={meal.ID}>
                      {meal.Meal} ({meal.Emissions} kg CO2e)
                      <button
                        className="btn btn-sm btn-circle btn-outline"
                        onClick={() => handleOnClick(meal)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M6 18L18 6M6 6l12 12"
                          />
                        </svg>
                      </button>
                    </div>
                  );
                })}
            </div>
          </div>
          <hr />
          <div>
            <p>
              <b>Your daily footprint:</b> {getDailyEmissions()} kg CO2e
            </p>
            <p>
              <b>UK average daily footprint (pp):</b> *29 kg CO2e
            </p>
            <p>
              <b>UK 2030 daily footprint target (pp):</b> **15 tons CO2e
            </p>
            <div></div>
            <p style={{ fontSize: '12px' }}>
              * based on a{' '}
              <a
                target="_blank"
                href="https://www.ons.gov.uk/economy/environmentalaccounts/methodologies/measuringukgreenhousegasemissions"
              >
                Consumption-Based GHG Emissions of 705Mt CO2e in 2021 which
                calculates as 10.52 tons CO2e per capita per year{' '}
              </a>
            </p>
            <p style={{ fontSize: '12px' }}>
              ** based on a calculated{' '}
              <a
                target="_blank"
                href="https://www.theccc.org.uk/publication/progress-in-reducing-emissions-2024-report-to-parliament/"
              >
                68% target reduction from 1990s levels (16.75 to 5.36 tons CO2e
                per capita per year){' '}
              </a>
            </p>
          </div>
        </>
      )}
    </>
  );
};
