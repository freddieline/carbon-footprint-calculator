import type { Meal } from '../interfaces/Meal';
import './Summary.css';

type InputProps = {
  selectedMeals: Meal[];
  onDeleteItem: (meal: Meal) => void;
  incrementQuantity: (meal: Meal) => void;
};

export const Summary: React.FC<InputProps> = ({
  selectedMeals,
  onDeleteItem,
  incrementQuantity,
}) => {
  const ukNumberFormatter = new Intl.NumberFormat('en-GB');
  function getDailyEmissions() {
    const reduce = selectedMeals.reduce((accumul, meal) => {
      if (meal.Quantity) {
        return Number(accumul) + Number(meal.Emissions) * Number(meal.Quantity);
      } else {
        return Number(accumul) + Number(meal.Emissions);
      }
    }, 0);

    return ukNumberFormatter.format(reduce);
  }

  function handleOnAdd(meal: Meal) {
    incrementQuantity(meal);
  }

  function handleOnDelete(meal: Meal) {
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
                      <div>
                        {meal.Quantity && meal.Quantity + ' x '} {meal.Meal}
                      </div>
                      <div>
                        {meal.Quantity != undefined
                          ? Math.round(meal.Emissions * meal.Quantity * 100) /
                            100
                          : meal.Emissions}{' '}
                        kg CO2e{' '}
                      </div>
                      <div>
                        <button
                          className="btn btn-sm btn-circle btn-outline"
                          style={{ marginRight: '12px' }}
                          onClick={() => handleOnAdd(meal)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke-width="1.5"
                            stroke="currentColor"
                            className="h-4 w-4"
                          >
                            <path
                              stroke-linecap="round"
                              stroke-linejoin="round"
                              strokeWidth="2"
                              d="M12 4.5v15m7.5-7.5h-15"
                            />
                          </svg>
                        </button>
                        <button
                          className="btn btn-sm btn-circle btn-outline"
                          onClick={() => handleOnDelete(meal)}
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
                              d="M5 12h14"
                            />
                          </svg>
                        </button>
                      </div>
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
