import { useState, useEffect, use } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';
import { Car } from '../types/CarInterface';
import useRetrieveAccountType from './useRetrieveAccountType';

let cars: Car[] = [];

const useFetchAPKConfirmations = () => {
    const [initialized, setInitialized] = useState(false);
    const [requestedCars, setRequestedCars] = useState<Car[]>([]);
    const [loading, setLoading] = useState(false);
    const accountType = useRetrieveAccountType();

    

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
            if (accountType !== 'Dealer') {
                console.error('You must be a dealer to make this request.');
                cars = [];
            } else {
                try {
              
                    cars = await callContractMethod('getRequestedMileageUpdateCars');
                    setRequestedCars(cars);
                } catch (error) {
                    console.error("Error fetching requested cars:", error);
                }
            }
            setLoading(false);
        };

        if (initialized) {
            fetchRequestedCars();
        }
    }, [accountType, initialized]);

    return { initialized, requestedCars, loading };
};

export default useFetchAPKConfirmations;
