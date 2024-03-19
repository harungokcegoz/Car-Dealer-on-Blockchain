import { useEffect, useState } from 'react';
import { initWeb3, callContractMethod, getCurrentAccount } from '../utils/CarContract';

type FormData = {
    licensePlate: string;
    chassisNumber: string;
    brand: string;
    carType: string;
    color: string;
    mileage: string;
    askingPrice: string;
    imageUrl: string;
}

const useCarRegistration = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        }
        initializeWeb3();
        console.log(getCurrentAccount());
    }, []);

    const registerCar = async (formData: FormData) => {
        try {
            const mileage = parseInt(formData.mileage);
            const askingPrice = parseInt(formData.askingPrice);
    
            if (isNaN(mileage) || isNaN(askingPrice)) {
                throw new Error("Mileage and asking price must be valid integers.");
            }
    
            await callContractMethod(
                'registerCar',
                formData.licensePlate,
                formData.chassisNumber,
                formData.brand,
                formData.carType,
                formData.color,
                mileage,
                askingPrice,
                formData.imageUrl
            );
            alert("Car registered successfully!");
            return true;
        } catch (error) {
            console.error("Error registering car:", error);
            return false;
        }
    };

    return { initialized, registerCar };
};

export default useCarRegistration;

