import { useState, useEffect } from 'react';
import { getCurrentAccount, initWeb3 } from '../utils/CarContract';

const useAccount = () => {
  const [initialized, setInitialized] = useState(false);
  const [account, setAccount] = useState<string | null>(null);

  useEffect(() => {
    const initializeWeb3 = async () => {
      await initWeb3();
      setInitialized(true);
    };
    initializeWeb3();
  }, []);

  useEffect(() => {
    const retrieveAccount = async () => {
      try {
        const currentAccount = await getCurrentAccount();
        setAccount(currentAccount);
      } catch (error) {
        console.error('Error fetching account:', error);
      }
    };
    retrieveAccount();
  }, [initialized]);

  return account;
};

export default useAccount;
