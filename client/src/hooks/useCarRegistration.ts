import { useEffect, useState } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';
import { dealerAccount } from '../utils/FetchKeys';

type FormData = {
  licensePlate: string;
  brand: string;
  color: string;
  mileage: string;
  askingPrice: string;
  imageUrl: string;
  dealerAddress: string;
};

const useCarRegistration = () => {
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    const initializeWeb3 = async () => {
      await initWeb3();
      setInitialized(true);
    };
    initializeWeb3();
  }, []);

  const registerCar = async (formData: FormData) => {
    try {
      const mileage = parseInt(formData.mileage);
      const askingPrice = parseInt(formData.askingPrice);

      if (Number.isNaN(mileage) || Number.isNaN(askingPrice)) {
        throw new Error('Mileage and asking price must be valid integers.');
      }

      await callContractMethod(
        'registerCar',
        formData.licensePlate,
        formData.brand,
        formData.imageUrl,
        formData.color,
        mileage,
        askingPrice,
        dealerAccount
      );

      alert('Car registered successfully!');
      return true;
    } catch (error) {
      console.error('Error registering car:', error);
      return false;
    }
  };

  return { initialized, registerCar };
};

export default useCarRegistration;
