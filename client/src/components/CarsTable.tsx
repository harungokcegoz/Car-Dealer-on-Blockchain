import React from 'react';
import Image from 'next/image';
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
        <div className="columns grid grid-cols-6 gap-20 border-b-2 border-orange-300 py-6 drop-shadow-md">
          <div className="flex justify-center">
            <p className="text-md font-bold">Image</p>
          </div>
          <div className="flex justify-center">
            <p className="text-md font-bold">Car Brand</p>
          </div>
          <div className="flex justify-center">
            <p className="text-md font-bold">License Plate</p>
          </div>
          <div className="flex justify-center">
            <p className="text-md font-bold">Current Mileage</p>
          </div>
          <div className="flex justify-center">
            <p className="text-md font-bold">Asking Price</p>
          </div>
          {handler && (
            <div className="flex justify-center">
              <p className="text-md font-bold">Action</p>
            </div>
          )}
        </div>
        <div className="rows mt-5">
          {cars.map((car, index) => (
            <div key={index} className="mb-4 grid grid-cols-6 gap-20 border-b-2 py-7 items-center">
              <div className="flex justify-center">
                <span>
                  <Image
                    className="rounded"
                    src={car.imageUrl}
                    alt="car"
                    width={120}
                    height={100}
                  />
                </span>
              </div>
              <div className="flex justify-center">
                <p className="text-md ">{car.brand}</p>
              </div>
              <div className="flex justify-center">
                <p>{car.licensePlate}</p>
              </div>
              <div className="flex justify-center">
                <p>{String(car.mileage)} km</p>
              </div>
              <div className="flex justify-center">
                <p>${String(car.askingPrice)}</p>
              </div>
              {handler && (
                <div className="flex justify-center">
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
