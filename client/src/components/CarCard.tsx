interface CarCardProps {
    brand: string;
    year: number;
    color: string;
    askingPrice: number;
    imageUrl: string;
}

const CarCard: React.FC<CarCardProps> = ({ brand, year, color, askingPrice, imageUrl }) => {
    return (
        <div className="shadow-md rounded overflow-hidden">
            <img className="w-full h-40 object-cover" src={imageUrl} alt={`${brand} Car`} />
            <div className="p-4">
                <h3 className="text-xl font-bold mb-2">{brand}</h3>
                <p className="text-sm text-gray-600 mb-2">{year} - {color}</p>
                <p className="text-lg font-bold text-blue-500">${askingPrice}</p>
            </div>
        </div>
    );
}

export default CarCard;
