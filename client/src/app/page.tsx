"use client"
import CarCardsGallery from '@/components/cards/CarCardsGallery';
import useFetchCars from '@/hooks/useFetchCars';
import LoadingComponent from '../components/atoms/Loading';
import useRetrieveAccountType from '../hooks/useRetrieveAccountType';
const Homepage = () => {
    const { initialized, cars, loading } = useFetchCars('all'); 
    const accountType = useRetrieveAccountType();
    window.localStorage.setItem('accountType', accountType);
    
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