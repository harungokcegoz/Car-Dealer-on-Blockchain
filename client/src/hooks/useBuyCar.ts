import { useState } from 'react';
import { callContractMethod } from '../utils/CarContract';

const useBuyCar = () => {
    const [buyingInProgress, setBuyingInProgress] = useState(false);
   
    const buyCar = async (carId: number) =>
    { 
        setBuyingInProgress(true);
        try {
            const bigCarId = BigInt(carId);
            await callContractMethod('requestPurchase', bigCarId);
            alert('Purchase request sent successfully');
        } catch (error) {
            console.error('Error buying car:', error);
            alert('Error buying car');
        } finally {
            setBuyingInProgress(false);
        }
    };

    return { buyCar, buyingInProgress };
};

export default useBuyCar;
