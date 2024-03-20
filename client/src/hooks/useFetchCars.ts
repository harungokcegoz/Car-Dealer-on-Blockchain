import { useState, useEffect } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';

type Car = {
    licensePlate: string;
    chassisNumber: string;
    brand: string;
    color: string;
    imageUrl: string;
    mileage: number;
    owner: string;
    askingPrice: number;
}

const useCarListings = () => {
    const [initialized, setInitialized] = useState(false);
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        };
        initializeWeb3();
    }, []);

    useEffect(() => {
        const fetchCarListings = async () => {
            try {
                const fetchedCars = await callContractMethod('getAllCars');
                setCars(fetchedCars);
            } catch (error) {
                console.error("Error fetching car listings:", error);
            }
        };

        if (initialized) {
            fetchCarListings();
        }
    }, [initialized]);

    return { initialized, cars };
};

export default useCarListings;
