import { useState, useEffect } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';
import { Car } from '../types/CarInterface';

let cars: Car[] = [];

const useFetchAPKConfirmations = () => {
    const [initialized, setInitialized] = useState(false);
    const [requestedCars, setRequestedCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        };
        initializeWeb3();
    }, []);

    useEffect(() => {
        const fetchRequestedCars = async () => {
            setLoading(true);
            try {
                cars = await callContractMethod('getRequestedMileageUpdateCars');
                setRequestedCars(cars);
            } catch (error) {
                console.error("Error fetching requested cars:", error);
            }
            setLoading(false);
        };

        if (initialized) {
            fetchRequestedCars();
        }
    }, [initialized]);

    return { initialized, requestedCars, loading };
};

export default useFetchAPKConfirmations;
