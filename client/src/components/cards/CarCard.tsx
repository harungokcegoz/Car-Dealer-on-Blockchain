import { Car } from '../../types/CarInterface';
import Button from '../atoms/Button';

type CarCardProps = {
    car: Car;
    type: string;
}

const CarCard = ({ car, type }: CarCardProps) => {
    return (
        <div className="shadow-md rounded overflow-hidden">
            <img className="w-full h-80 object-cover" src={car.imageUrl} alt={`${car.brand} Car`} />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{car.brand}</h3>
                <p className="text-sm text-gray-600 mb-2">{car.licensePlate} - {car.color}</p>
                <p className="text-sm text-gray-600 mb-2">Seller: {car.owner}</p>
                <p className="text-sm text-gray-600 mb-2">Chasis Number: {car.chassisNumber}</p>
                <p className="text-sm text-gray-600 mb-2">Mileage: {String(car.mileage)} km</p>
                <p className="text-xl font-bold text-sky-700">${String(car.askingPrice)}</p>
            </div>
            {type === 'userpage' && 
                <div className="ctas ml-4 my-5">
                    <Button text="APK Maintenance" type="button" />
                </div>
            }
            {type === 'homepage' &&
                <div className="ctas ml-4 my-5">
                    <Button text="Buy" type="button" />
                </div>
            }
        </div>
    );
}

export default CarCard;
