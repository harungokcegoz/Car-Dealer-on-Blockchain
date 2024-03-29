import Image from 'next/image';
import { useState, useEffect } from 'react';
import { Car } from '../../types/CarInterface';
import Button from '../atoms/Button';
import useRequestCarPurchase from '@/hooks/useRequestCarPurchase';
import { callContractMethod } from '../../utils/CarContract';
import useCurrentEtherPrice from '@/hooks/useCurrentEtherPrice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEthereum } from "@fortawesome/free-brands-svg-icons";
import useRetrieveAccount from '@/hooks/useRetrieveAccount';
import useRetrieveAccountType from '@/hooks/useRetrieveAccountType';

type CarCardProps = {
    car: Car;
    type: string;
}
const CarCard = ({ car, type }: CarCardProps) => {
    const currentAccount = useRetrieveAccount();
    const accountType = useRetrieveAccountType();
    const { requestPurchase } = useRequestCarPurchase();
    const [currentValueInEth, setCurrentValueInEth] = useState<Number>(0);
    const currentEtherPrice = useCurrentEtherPrice() || 3400;
 
    useEffect(() => {
        const calculateValueInEth = () => {
            const valueInEth = (Number(car.askingPrice) / Number(currentEtherPrice));
            setCurrentValueInEth(valueInEth);
        }
        calculateValueInEth();
    }, [car.askingPrice, currentEtherPrice]);

    const handleAPKMaintenance = async () => {
        try {
            const uintCarId = BigInt(car.carId);
            await callContractMethod('requestMileageUpdate', uintCarId);
            alert('Mileage update requested successfully');
        } catch (error) {
            console.error('Error requesting mileage update:', error);
            alert('Error requesting mileage update');
        }
    };

    const handleBuyButtonClick = () => {
        requestPurchase(car.carId, Number(car.askingPrice));
        window.location.reload();
    };

    return (
        <div className="shadow-md rounded overflow-hidden">
            <Image className="w-full h-80 object-cover" src={car.imageUrl} alt={`${car.brand} Car`} width={300} height={200} priority={true}/>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{car.brand}</h3>
                <p className="text-sm text-gray-600 mb-2 uppercase font-bold">{car.licensePlate} - {car.color}</p>
                <p className="text-xs text-gray-600 mb-2 mt-5 md:whitespace-normal">Seller: {car.owner}</p>
                <p className="text-xs text-gray-600 mb-2">Mileage: {String(car.mileage)} km</p>
            </div>
            <div className="last-row flex justify-between w-full px-4 pb-6 items-center">
                <p className="text-xl font-bold text-sky-700">
                    <span>${String(car.askingPrice)}</span> 
                    <span className='text-black font-extrabold'> ~ </span> 
                    <span className='text-blue-700'>
                        <FontAwesomeIcon icon={faEthereum} className='mr-1'/>
                        {Number(currentValueInEth).toFixed(6)}
                    </span> 
                </p>
                {type === 'userpage' && 
                    <div className="ctas">
                        <Button text="APK Maintenance" type="button" onClick={handleAPKMaintenance} />
                    </div>
                }
                {type === 'homepage' &&
                    <div className="ctas">
                        <Button 
                            text={car.purchaseRequested ? "Reserved" : (car.forSale ? "Buy" : "Sold!")}
                            type="button" 
                            disabled={currentAccount === car.owner || accountType === 'Dealer' || !car.forSale || car.purchaseRequested} 
                            onClick={car.forSale ? handleBuyButtonClick : () => {}}
                        />
                    </div>
                }
            </div>
         
        </div>
    );
}

export default CarCard;
