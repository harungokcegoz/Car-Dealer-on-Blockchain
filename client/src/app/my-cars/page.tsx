"use client";
import useFetchUsersCars from '../../hooks/useFetchUsersCars';
import CarCardsGallery from '../../components/cards/CarCardsGallery';
const MyCars = () => {
    const { initialized, cars } = useFetchUsersCars();
    return (
        <div>
            {initialized && <CarCardsGallery cars={cars} />}
        </div>
    );
}

export default MyCars;