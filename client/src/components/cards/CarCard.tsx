import Image from 'next/image';
import { Car } from '../../types/CarInterface';
import Button from '../atoms/Button';
import { callContractMethod } from '../../utils/CarContract';

type CarCardProps = {
    car: Car;
    type: string;
}
const CarCard = ({ car, type }: CarCardProps) => {
    const currentAccount = localStorage.getItem('currentAccount');
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

    const accountType = localStorage.getItem('accountType');

    return (
        <div className="shadow-md rounded overflow-hidden">
            <Image className="w-full h-80 object-cover" src={car.imageUrl} alt={`${car.brand} Car`} width={300} height={200} priority={true}/>
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{car.brand}</h3>
                <p className="text-sm text-gray-600 mb-2 uppercase font-bold">{car.licensePlate} - {car.color}</p>
                <p className="text-xs text-gray-600 mb-2 mt-5">Seller: {car.owner}</p>
                <p className="text-xs text-gray-600 mb-2">Chasis Number: {car.chassisNumber}</p>
                <p className="text-xs text-gray-600 mb-2">Mileage: {String(car.mileage)} km</p>
            </div>
            <div className="last-row flex justify-between w-full px-4 pb-6 items-center">
                <p className="text-xl font-bold text-sky-700">${String(car.askingPrice)}</p>
                {type === 'userpage' && 
                    <div className="ctas">
                        <Button text="APK Maintenance" type="button" onClick={handleAPKMaintenance} />
                    </div>
                }
                {type === 'homepage' &&
                    <div className="ctas">
                        <Button text="Buy" type="button" disabled={currentAccount === car.owner || accountType === 'Dealer'}/>
                    </div>
                }
            </div>
         
        </div>
    );
}

export default CarCard;
