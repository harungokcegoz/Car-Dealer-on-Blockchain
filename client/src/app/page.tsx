"use client"
import { useEffect, useState } from 'react';
import CarCardsGallery from '@/components/cards/CarCardsGallery';
import useFetchCars from '@/hooks/useFetchCars';
import LoadingComponent from '../components/atoms/Loading';
import { buyerAccount, sellerAccount, dealerAccount } from '../utils/FetchKeys';

const accountTypes: { [key: string]: string } = {
    [sellerAccount]: "Seller",
    [buyerAccount]: "Buyer",
    [dealerAccount]: "Dealer",
};

const Homepage = () => {
    const { initialized, cars, loading } = useFetchCars('all'); 
    const [accountType, setAccountType] = useState<string>('');
    const account = window.localStorage.getItem('currentAccount');
    
    useEffect(() => {
        if (account) {
            setAccountType(accountTypes[account]);
            window.localStorage.setItem('accountType', accountTypes[account]);
        }
    }, [account, accountType]);
    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                initialized && <CarCardsGallery cars={cars} type={'homepage'} />
            )}
        </div>
    );
}

export default Homepage;