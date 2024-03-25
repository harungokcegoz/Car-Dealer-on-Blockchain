"use client";
import React, { useEffect, useState } from 'react';
import { callContractMethod } from '../../utils/CarContract';
import Button from '../../components/atoms/Button';
import useFetchCars from '../../hooks/useFetchCars';
import LoadingComponent from '@/components/atoms/Loading';
import { Car } from '../../types/CarInterface';
import useRetrieveAccountType from '../../hooks/useRetrieveAccountType';

const TradeConfirmationsPage = () => {
    const { initialized, cars, loading } = useFetchCars('all');
    const [purchaseRequestedCars, setPurchaseRequestedCars] = useState<Car[]>([]);
    const accountType = useRetrieveAccountType();
    const currentEtherPrice = 3400;

    useEffect(() => {
        setPurchaseRequestedCars(cars.filter(car => car.purchaseRequested));
    }, [cars]);

    const confirmPurchase = async (carId: number) => {
        console.log("Confirming purchase for car with ID:", carId, "and price:", currentEtherPrice)
        try {
            await callContractMethod('confirmPurchase', BigInt(carId), BigInt(currentEtherPrice));
            alert('Purchase confirmed successfully');
        } catch (error) {
            console.error("Error confirming purchase:", error);
        }
        // window.location.href = '/';
    };

    return (
        loading ? (
            <LoadingComponent />
        ) : (
            accountType === 'Dealer' ? (
                <div className="container mx-auto mt-8">
                    <h1 className="text-2xl font-normal my-14">Trade Confirmations</h1>
                    {purchaseRequestedCars.length === 0 ? (
                        <p className='text-xl font-bold'>No pending trade confirmations</p>
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
                                    <p className="text-md font-bold">Current Mileage</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-md font-bold">Asking Price</p>
                                </div>
                                <div className="flex-1">
                                    <p className="text-md font-bold">Action</p>
                                </div>
                            </div>
                            <div className="rows mt-5">
                                {purchaseRequestedCars.map((car, index) => (
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
                                        <div className="flex-1">
                                            <Button
                                                text="Confirm Purchase"
                                                onClick={() => confirmPurchase(car.carId)}
                                                type='submit'
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            ) : (
                <div className="container mx-auto mt-8">
                    <h1 className="text-2xl font-normal my-14">Trade Confirmations</h1>
                    <p className='text-xl font-bold'>You must be a dealer to access this page</p>
                </div>
            )
        )
    );
};

export default TradeConfirmationsPage;
