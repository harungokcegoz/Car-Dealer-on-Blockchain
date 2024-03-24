import CarCard from "./CarCard"

const CarCardsGallery = ({ cars, type }: { cars: any[], type: string }) => {
    return (
        <div className="my-20">
            {cars.length > 0 ? (
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                    {cars.map((car, index) => <CarCard key={index} car={car} type={type} />)}
                </div>
            ) : (
                <div className="flex items-center justify-center">
                    <p className="font-normal text-xl">No cars in the system for now.</p>
                </div>
            )}
        </div>
    );
}

export default CarCardsGallery;