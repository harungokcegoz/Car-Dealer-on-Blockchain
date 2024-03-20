"use client";
import CarCardsGallery from '@/components/cards/CarCardsGallery';
import  useFetchCars from '@/hooks/useFetchCars';

const Homepage = () => {
    const { initialized, cars } = useFetchCars(); 
    
    return (
        <div>
            {initialized && <CarCardsGallery cars={cars} type={'homepage'}/>}
        </div>
    );
}

export default Homepage;
