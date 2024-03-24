import { useState, useEffect } from 'react';

const useCurrentEtherPrice = () => {
    const [ethPrice, setEthPrice] = useState<number | null>(null);

    useEffect(() => {
        fetch('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
            .then(response => response.json())
            .then(data => setEthPrice(data.USD));
    }, []);

    return ethPrice;
}

export default useCurrentEtherPrice;