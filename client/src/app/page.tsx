import CarCardsGallery from '@/components/CarCardsGallery';

const cars = [
    { brand: 'Toyota', year: 2020, color: 'Red', askingPrice: 25000, imageUrl: '/toyota.jpg' },
    { brand: 'Honda', year: 2019, color: 'Blue', askingPrice: 22000, imageUrl: '/honda.jpg' },
    { brand: 'Ford', year: 2021, color: 'Black', askingPrice: 28000, imageUrl: '/ford.jpg' },
    // Add more cars as needed
];

const Homepage = () => {
    return (
        <CarCardsGallery cars={cars} />
    );
}

export default Homepage;
