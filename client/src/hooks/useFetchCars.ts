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

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        }
        initializeWeb3();
    }, []);

    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const fetchCarListings = async () => {
            try {
                const carsCount = await callContractMethod('getCarsCount');
                const fetchedCars: Car[] = [];
                
                for (let i = 0; i < carsCount; i++) {
                    const carDetails = await callContractMethod('getCar', i);
                    const askingPriceParsed = parseInt(carDetails.askingPrice);
                    const mileageParsed = parseInt(carDetails.mileage);
                    const car: Car = {
                        licensePlate: carDetails.licensePlate,
                        chassisNumber: carDetails.chassisNumber,
                        brand: carDetails.brand,
                        color: carDetails.color,
                        imageUrl: carDetails.imageUrl,
                        mileage: mileageParsed,
                        owner: carDetails.owner,
                        askingPrice: askingPriceParsed,
                    };
                    fetchedCars.push(car);
                }
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
