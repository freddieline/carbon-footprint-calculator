import Select from '../components/Select';
import { useState } from 'react';
import NumberInput from '../components/NumberInput';
import { useGetCars } from '../hooks/useGetCars';
import React from 'react';

const Transport = React.memo(() => {
  enum CarType {
    electric_car,
    diesel_car,
    petrol_car,
  }

  const [carType, setCarType] = useState<CarType | null>(null);
  const { electricCars, petrolCars, dieselCars } = useGetCars();
  // console.log(electricCars)
  const options: Record<string, string> = {
    electric_car: 'Electric car',
    diesel_car: 'Diesel car',
    petrol_car: 'Petrol car',
  };

  const electricCarsObj: Record<string, string> = {};
  const dieselCarsObj: Record<string, string> = {};
  const petrolCarsObj: Record<string, string> = {};

  electricCars.forEach((item) => {
    electricCarsObj[item.ID] = item.Model;
  });

  petrolCars.forEach((item) => {
    petrolCarsObj[item.ID] = item.Model;
  });

  dieselCars.forEach((item) => {
    dieselCarsObj[item.ID] = item.Model;
  });

  function onSelectCar(car: string) {
    console.log(car);
    switch (car) {
      case 'electric_car':
        setCarType(CarType.electric_car);
        break;
      case 'diesel_car':
        setCarType(CarType.diesel_car);
        break;
      case 'petrol_car':
        setCarType(CarType.petrol_car);
        break;
        defaut: setCarType(CarType.petrol_car);
    }
  }

  return (
    <>
      <h1 className="text-3xl font-bold text-gray-800 mb-3">
        Personal carbon footprint calculator
      </h1>
      <p>
        <b>How far do you travel on an average day?</b>{' '}
      </p>
      <Select
        options={options}
        onSelect={onSelectCar}
        defaultSelect="Select car type"
      ></Select>
      {carType == CarType.diesel_car && (
        <Select
          options={dieselCarsObj}
          onSelect={onSelectCar}
          defaultSelect="Select car model"
        ></Select>
      )}
      {carType == CarType.petrol_car && (
        <Select
          options={petrolCarsObj}
          onSelect={onSelectCar}
          defaultSelect="Select car model"
        ></Select>
      )}
      {carType == CarType.electric_car && (
        <Select
          options={electricCarsObj}
          onSelect={onSelectCar}
          defaultSelect="Select car model"
        ></Select>
      )}
      <NumberInput placeholder="Distance in km"></NumberInput>
      
    </>
  );
});

export default Transport;
