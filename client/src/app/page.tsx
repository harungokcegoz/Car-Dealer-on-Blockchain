"use client";
import { useEffect, useState } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';

const MyComponent = () => {
    const [initialized, setInitialized] = useState(false);

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        }
        initializeWeb3();
    }, []);

    const registerCar = async () => {
        try {
            await callContractMethod('registerCar', "licensePlate", "chassisNumber", "brand", "carType", "color");
            console.log("Car registered successfully!");
        } catch (error) {
            console.error("Error registering car:", error);
        }
    }

    return (
        <div>
            {initialized && (
                <button onClick={registerCar}>Register Car</button>
            )}
        </div>
    );
}

export default MyComponent;
