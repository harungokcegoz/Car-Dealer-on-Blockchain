import { useState } from 'react';
import { callContractMethod } from '../utils/CarContract';

const useRequestCarPurchase = () => {
    const [buyingInProgress, setBuyingInProgress] = useState(false);
    const currentEtherPrice = 3400;
    
    const requestPurchase = async (carId: number) =>
    { 
        setBuyingInProgress(true);
    
        const bigCarId = BigInt(carId);
        const bigCurrentEtherPrice = BigInt(currentEtherPrice);
        await callContractMethod('requestPurchase', bigCarId, bigCurrentEtherPrice);
        alert('Purchase request sent successfully');
      
        setBuyingInProgress(false);
        
    };

    return { requestPurchase, buyingInProgress };
};

export default useRequestCarPurchase;
