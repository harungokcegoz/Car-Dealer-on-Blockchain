"use client";
import useFetchCars from '../../hooks/useFetchCars';
import CarCardsGallery from '../../components/cards/CarCardsGallery';
import LoadingComponent from '../../components/atoms/Loading';

const MyCars = () => {
    const { initialized, cars, loading } = useFetchCars('user');

    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                initialized && <CarCardsGallery cars={cars} type={'userpage'} />
            )}
        </div>
    );
}

export default MyCars;