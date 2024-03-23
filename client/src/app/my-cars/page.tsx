"use client";
import useFetchCars from '../../hooks/useFetchCars';
import CarCardsGallery from '../../components/cards/CarCardsGallery';
const MyCars = () => {
    const { initialized, cars } = useFetchCars('user');

    return (
        <div>
            {initialized && <CarCardsGallery cars={cars} type={'userpage'} />}
        </div>
    );
}

export default MyCars;