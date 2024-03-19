import CarCardsGallery from '@/components/cards/CarCardsGallery';

const cars = [
    { brand: 'Toyota', year: 2020, color: 'Red', askingPrice: 25000, imageUrl: 'https://images.drive.com.au/driveau/image/upload/t_wp-default/v1/cms/uploads/itd0Lt3LTE6nvZcJgVNL' },
    { brand: 'Honda', year: 2019, color: 'Blue', askingPrice: 22000, imageUrl: 'https://i0.shbdn.com/photos/17/59/91/x5_1110175991j9a.jpg' },
    { brand: 'Ford', year: 2021, color: 'Black', askingPrice: 28000, imageUrl: 'https://hips.hearstapps.com/hmg-prod/images/2022-ford-mustang-shelby-gt500-02-1636734552.jpg' },
    // Add more cars as needed
];

const Homepage = () => {
    return (
        <CarCardsGallery cars={cars} />
    );
}

export default Homepage;
