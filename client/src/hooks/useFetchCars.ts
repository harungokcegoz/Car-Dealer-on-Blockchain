import { useState, useEffect } from 'react';
import { initWeb3, callContractMethod } from '../utils/CarContract';
import { Car } from '../types/CarInterface';
import { nftStorageApiKey } from '../utils/FetchKeys';

const useCarListings = () => {
    const [initialized, setInitialized] = useState(false);
    const [cars, setCars] = useState<Car[]>([]);

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        };
        initializeWeb3();
    }, []);

    useEffect(() => {
        const fetchCarListings = async () => {
            try {
                const fetchedCars = await callContractMethod('getAllCars');
                const carsWithImages = await Promise.all(fetchedCars.map(async (car) => {
                    const imageUrl = await getImageUrlFromCID(car.imageUrl);
                    return { ...car, imageUrl };
                }));
                setCars(carsWithImages);
            } catch (error) {
                console.error("Error fetching car listings:", error);
            }
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

    return { initialized, cars };
};

export default useCarListings;
