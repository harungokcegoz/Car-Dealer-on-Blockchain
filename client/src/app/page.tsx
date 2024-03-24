"use client"
import CarCardsGallery from '@/components/cards/CarCardsGallery';
import useFetchCars from '@/hooks/useFetchCars';
import LoadingComponent from '../components/atoms/Loading';

const Homepage = () => {
    const { initialized, cars, loading } = useFetchCars('all'); 
    
    return (
        <div>
            {loading ? (
                <LoadingComponent />
            ) : (
                initialized && <CarCardsGallery cars={cars} type={'homepage'} />
            )}
        </div>
    );
}

export default Homepage;