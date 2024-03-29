import { useState, useEffect } from 'react';

const apiUrls = {
  coinbase: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
  cryptoCompare: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD',
};

const useCurrentEtherPrice = () => {
  const [ethPrice, setEthPrice] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrice = () => {
      fetch(apiUrls.coinbase)
        .then(response => response.json())
        .then(data => setEthPrice(Number(data.data.rates.BUSD).toFixed(2)));
    };
    fetchPrice();
    const intervalId = setInterval(fetchPrice, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return ethPrice;
};

export default useCurrentEtherPrice;
