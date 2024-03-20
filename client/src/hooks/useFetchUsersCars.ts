import { useState, useEffect } from 'react';
import { initWeb3, callContractMethod, getCurrentAccount } from '../utils/CarContract';
import { Car } from '../types/CarInterface';

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
                const currentAccount = await getCurrentAccount();
                const carsOwned = await callContractMethod('getCarsOwnedByAddress', currentAccount);     
                setCars(carsOwned);
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
