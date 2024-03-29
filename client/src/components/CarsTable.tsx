import React from 'react';
import Button from './atoms/Button';
import { Car } from '../types/CarInterface';

type CarTableProps = {
  title: string;
  cars: Car[];
  handler?: (carId: number) => void;
};

const CarTable = ({ title, cars, handler }: CarTableProps) => (
  <div className="container mx-auto mt-8">
    <h1 className="text-2xl font-normal my-14">{title}</h1>
    {cars.length === 0 ? (
      <p className="text-xl font-bold">There is no result yet.</p>
    ) : (
      <div>
        <div className="columns flex gap-20 border-b-2 border-orange-300 py-6 drop-shadow-md">
          <div className="flex-1">
            <p className="text-md font-bold">Car Brand</p>
          </div>
          <div className="flex-1">
            <p className="text-md font-bold">License Plate</p>
          </div>
          <div className="flex-1">
            <p className="text-md font-bold">Current Mileage</p>
          </div>
          <div className="flex-1">
            <p className="text-md font-bold">Asking Price</p>
          </div>
          {handler && (
            <div className="flex-1">
              <p className="text-md font-bold">Action</p>
            </div>
          )}
        </div>
        <div className="rows mt-5">
          {cars.map((car, index) => (
            <div key={index} className="mb-4 flex gap-20 border-b-2 py-7 items-center">
              <div className="flex-1">
                <p className="text-md ">{car.brand}</p>
              </div>
              <div className="flex-1">
                <p>{car.licensePlate}</p>
              </div>
              <div className="flex-1">
                <p>{String(car.mileage)} km</p>
              </div>
              <div className="flex-1">
                <p>${String(car.askingPrice)}</p>
              </div>
              {handler && (
                <div className="flex-1">
                  <Button text="Confirm" onClick={() => handler(car.carId)} type="submit" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    )}
  </div>
);

export default CarTable;
