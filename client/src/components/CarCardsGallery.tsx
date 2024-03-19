import CarCard from "./CarCard"


const CarCardsGallery = ({ cars }) => {
    return (
        <div className="container mx-auto my-8 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {cars.map((car, index) => (
                <CarCard key={index} {...car} />
            ))}
        </div>
    );
}

export default CarCardsGallery;