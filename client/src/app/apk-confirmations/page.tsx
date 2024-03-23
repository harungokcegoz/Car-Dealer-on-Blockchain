"use client";
import React, { useEffect, useState } from 'react';
import { callContractMethod } from '../../utils/CarContract';
import Button from '../../components/atoms/Button';
import useFetchApkRequests from '../../hooks/useFetchApkRequests';
import LoadingComponent from '@/components/atoms/Loading';
import { Car } from '../../types/CarInterface';

const APKConfirmationsPage = () => {
    const { initialized, requestedCars, loading } = useFetchApkRequests();
    const [newMileages, setNewMileages] = useState<{ [key: number]: number }>({});
    const [requestedCarsArray, setRequestedCars] = useState<Car[]>([]);
    
    useEffect(() => {
        setRequestedCars(requestedCars);
    }, [requestedCars]);

    const handleInputChange = (carId: number, mileage: string) => {
        setNewMileages({ ...newMileages, [carId]: parseInt(mileage) });
    };

    const confirmMileageUpdate = async (carId: number) => {
        try {
            const newMileage = newMileages[carId];
            if (!newMileage || isNaN(newMileage)) {
                console.error('Please enter a valid mileage');
                return;
            }
            await callContractMethod('confirmMileageUpdate', carId, newMileage);
            // Remove the confirmed car from the list
            setRequestedCars(requestedCarsArray.filter(car => car.carId !== carId));
            // Reset the new mileage for the car
            const updatedMileages = { ...newMileages };
            delete updatedMileages[carId];
            setNewMileages(updatedMileages);
        } catch (error) {
            console.error("Error confirming mileage update:", error);
        }
    };

    return (
        loading ? (
            <LoadingComponent />
        ) : (
            <div className="container mx-auto mt-8">
                <h1 className="text-2xl font-normal my-14">APK Confirmations</h1>
                {requestedCarsArray.length === 0 ? (
                    <p className='text-xl font-bold'>No pending APK confirmations</p>
                ) : (
                    initialized && 
                    <div>
                        <div className="columns flex gap-20 border-b-2 border-orange-300 py-6 drop-shadow-md">
                            <div className="flex-1">
                                <p className="text-md font-bold">Car Brand</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-bold">License Plate</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-bold">Chassis Number</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-bold">Current Mileage</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-bold">New Mileage</p>
                            </div>
                            <div className="flex-1">
                                <p className="text-md font-bold">Action</p>
                            </div>
                        </div >
                        <div className="rows mt-5">
                        {requestedCarsArray.map((car, index) => (
                            <div key={index} className="mb-4 flex gap-20 border-b-2 py-7 items-center">
                                <div className="flex-1">
                                    <p className="text-md ">{car.brand}</p>
                                </div>
                                <div className="flex-1">
                                    <p>{car.licensePlate}</p>
                                </div>
                                <div className="flex-1">
                                    <p>{car.chassisNumber}</p>
                                </div>
                                <div className="flex-1">
                                    <p>{String(car.mileage)} km</p>
                                </div>
                                <div className="flex-1">
                                    <input
                                        type="number"
                                        placeholder="New Mileage"
                                        value={newMileages[car.carId] || ''}
                                        onChange={(e) => handleInputChange(car.carId, e.target.value)}
                                        className="border rounded p-2 w-2/3 focus:outline-none focus:ring focus:border-blue-300 text-xs font-light"
                                    />
                                </div>
                                <div className="flex-1">
                                    <Button
                                        text="Confirm"
                                        onClick={() => confirmMileageUpdate(car.carId)}
                                        type='submit'
                                    />
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                )}
            </div>
        )
    );
};

export default APKConfirmationsPage;
