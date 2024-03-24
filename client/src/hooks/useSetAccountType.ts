import { useState, useEffect } from 'react';
import { buyerAccount, sellerAccount, dealerAccount } from '../utils/FetchKeys';
import useRetrieveAccount from './useRetrieveAccount';

const accountTypes: { [key: string]: string } = {
    [sellerAccount]: "Seller",
    [buyerAccount]: "Buyer",
    [dealerAccount]: "Dealer",
};

const useRetrieveAccountType = () => {
    const [accountType, setAccountType] = useState<string>('');
    const account = useRetrieveAccount();

    useEffect(() => {
        if (account) {
            setAccountType(accountTypes[account]);
        }
    }, [account]);
    
    return accountType;
};

export default useRetrieveAccountType;