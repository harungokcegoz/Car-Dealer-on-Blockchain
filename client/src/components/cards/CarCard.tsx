type CarCardProps = {
    licensePlate: string;
    chassisNumber: string;
    brand: string;
    color: string;
    askingPrice: number;
    imageUrl: string;
    owner: string;
    mileage: number;
}

const CarCard = ({ brand, licensePlate, chassisNumber, mileage, color, askingPrice, imageUrl, owner }: CarCardProps) => {
    return (
        <div className="shadow-md rounded overflow-hidden">
            <img className="w-full h-80 object-cover" src={imageUrl} alt={`${brand} Car`} />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{brand}</h3>
                <p className="text-sm text-gray-600 mb-2">{licensePlate} - {color}</p>
                <p className="text-sm text-gray-600 mb-2">Seller: {owner}</p>
                <p className="text-sm text-gray-600 mb-2">Chasis Number: {chassisNumber}</p>
                <p className="text-sm text-gray-600 mb-2">Mileage: {mileage} km</p>
                <p className="text-lg font-bold text-blue-500">${askingPrice}</p>
            </div>
        </div>
    );
}

export default CarCard;
