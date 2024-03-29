'use client';

import { useEffect, useState } from 'react';
import CarsTable from '../../components/CarsTable';
import useFetchCars from '../../hooks/useFetchCars';
import LoadingComponent from '../../components/atoms/Loading';
import useRetrieveAccountType from '../../hooks/useRetrieveAccountType';
import { Car } from '../../types/CarInterface';

const OrdersPage = () => {
  const { initialized, cars, loading } = useFetchCars('all');
  const [orderedCars, setOrderedCars] = useState<Car[]>([]);
  const accountType = useRetrieveAccountType();

  useEffect(() => {
    console.log('cars', cars);
    const filteredOrderedCars = cars.filter(car => car.purchaseRequested);
    setOrderedCars(filteredOrderedCars);
    console.log('filtered', filteredOrderedCars);
  }, [cars]);

  return loading ? (
    <LoadingComponent />
  ) : accountType === 'Buyer' || accountType === 'Seller' ? (
    initialized && <CarsTable title="My Orders" cars={orderedCars} />
  ) : (
    <div className="container mx-auto mt-8">
      <h1 className="text-2xl font-normal my-14">My Orders</h1>
      <p className="text-xl font-bold">Dealers doesn't have order page.</p>
    </div>
  );
};

export default OrdersPage;
