'use client';

import React, { useEffect, useState } from 'react';
import { confirmPurchaseFromContract } from '../../utils/CarContract';
import CarsTable from '../../components/CarsTable';
import useFetchCars from '../../hooks/useFetchCars';
import LoadingComponent from '../../components/atoms/Loading';
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
    try {
      await confirmPurchaseFromContract(carId, currentEtherPrice);
      alert('Purchase confirmed successfully');
    } catch (error) {
      console.error('Error confirming purchase:', error);
    }
    window.location.reload();
  };

  return loading ? (
    <LoadingComponent />
  ) : accountType === 'Dealer' ? (
    initialized && (
      <CarsTable
        title="Trade Confirmations"
        cars={purchaseRequestedCars}
        handler={confirmPurchase}
      />
    )
  ) : (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-normal my-14">Trade Confirmations</h1>
      <p className="text-xl font-bold">You must be a dealer to access this page</p>
    </div>
  );
};

export default TradeConfirmationsPage;
