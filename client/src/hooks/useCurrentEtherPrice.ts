import { useState, useEffect } from 'react';

const apiUrls = {
    coinbase: 'https://api.coinbase.com/v2/exchange-rates?currency=ETH',
    cryptoCompare: 'https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD'
}

const useCurrentEtherPrice = () => {
    const [ethPrice, setEthPrice] = useState<number | null>(null);

    useEffect(() => {
        const fetchPrice = () => {
            fetch(apiUrls.coinbase)
                .then(response => response.json())
                .then(data => setEthPrice(data.USD));
        }

        fetchPrice(); // Fetch the price immediately

        const intervalId = setInterval(fetchPrice, 100);

        return () => clearInterval(intervalId);
    }, []);

    return ethPrice;
}

export default useCurrentEtherPrice;