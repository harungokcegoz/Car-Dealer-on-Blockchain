import { useState, useEffect } from 'react';
import { initWeb3, callContractMethod, getCurrentAccount } from '../utils/CarContract';
import { Car } from '../types/CarInterface';
import { nftStorageApiKey } from '../utils/FetchKeys';

type UseFetchCarsProps =  'all' | 'user';

const useFetchCars = (fetchType: UseFetchCarsProps) => {
    const [initialized, setInitialized] = useState(false);
    const [cars, setCars] = useState<Car[]>([]);
    const [accountAddress, setAccountAddress] = useState('');
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            await getCurrentAccount().then((account) => {
                setAccountAddress(account);
            });
            setInitialized(true);
        };
        initializeWeb3();
    }, []);

    useEffect(() => {
        const fetchCarListings = async () => {
            setLoading(true);
            try {
                const fetchFunction = fetchType === 'user' ? 'getCarsOwnedByAddress' : 'getAllCars';
                const fetchedCars = fetchType === 'user' ? await callContractMethod(fetchFunction, accountAddress) : await callContractMethod(fetchFunction);
                const carsWithImages = await Promise.all(fetchedCars.map(async (car) => {
                    const imageUrl = await getImageUrlFromCID(car.imageUrl);
                    return { ...car, imageUrl };
                }));
                setCars(carsWithImages);
            } catch (error) {
                console.error("Error fetching car listings:", error);
            }
            setLoading(false);
        };

        if (initialized) {
            fetchCarListings();
        }
    }, [initialized]);

    const getImageUrlFromCID = async (cid:string) => {
        try {
            const response = await fetch(`https://api.nft.storage/${cid}`, {
                headers: { Authorization: `Bearer ${nftStorageApiKey}` },
            });
            const data = await response.json();
            const imageName = data.value.files[0].name;
            return `https://ipfs.io/ipfs/${cid}/${imageName}`;
        } catch (error) {
            console.error("Error fetching image from CID:", error);
            return '';
        }
    };

    return { initialized, cars, loading };
};

export default useFetchCars;