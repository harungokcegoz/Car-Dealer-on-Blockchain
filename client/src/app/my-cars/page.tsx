'use client';

import useFetchCars from '../../hooks/useFetchCars';
import CarCardsGallery from '../../components/cards/CarCardsGallery';
import LoadingComponent from '../../components/atoms/Loading';
import useRetrieveAccount from '../../hooks/useRetrieveAccount';

const MyCars = () => {
  const currentAccount = useRetrieveAccount();
  const { initialized, cars, loading } = useFetchCars('user');
  const userCars = cars.filter(car => car.owner === currentAccount);
  return (
    <div>
      {loading ? (
        <LoadingComponent />
      ) : (
        initialized && <CarCardsGallery cars={userCars} type="userpage" />
      )}
    </div>
  );
};

export default MyCars;
