import { useState } from 'react';
import { requestPurchaseFromContract } from '../utils/CarContract';
import useCurrentEtherPrice from './useCurrentEtherPrice';

const useRequestCarPurchase = () => {
    const [buyingInProgress, setBuyingInProgress] = useState(false);
    const currentEtherPrice: number = Number(useCurrentEtherPrice()) || 3400;
    
    const requestPurchase = async (carId: number, askingPrice: number) =>
    { 
        setBuyingInProgress(true);
    
        const askingPriceInEther = askingPrice / currentEtherPrice;
        console.log("askingPriceInEther", askingPriceInEther.toFixed(0));
        try {
            await requestPurchaseFromContract(carId, askingPriceInEther, currentEtherPrice);
            alert('Purchase request sent successfully');
        } catch (error) {
            console.error("Error sending purchase request:", error);
            alert('Error sending purchase request');
        }
        setBuyingInProgress(false);
    };

    return { requestPurchase, buyingInProgress };
};

export default useRequestCarPurchase;
