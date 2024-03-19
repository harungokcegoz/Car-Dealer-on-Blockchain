"use client"

import { useEffect, useState } from 'react';
import { initWeb3, callContractMethod, getCurrentAccount } from '../utils/CarContract';

const CarRegistrationForm = () => {
    const [initialized, setInitialized] = useState(false);
    const [formData, setFormData] = useState({
        licensePlate: '',
        chassisNumber: '',
        brand: '',
        carType: '',
        color: '',
        mileage: '',
        askingPrice: '',
        image: ''
    });

    useEffect(() => {
        const initializeWeb3 = async () => {
            await initWeb3();
            setInitialized(true);
        }
        initializeWeb3();
        console.log(getCurrentAccount());
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSubmit = async () => {
        try {
            const mileage = parseInt(formData.mileage);
            const askingPrice = parseInt(formData.askingPrice);
    
            if (isNaN(mileage) || isNaN(askingPrice)) {
                throw new Error("Mileage and asking price must be valid integers.");
            }
    
            await callContractMethod(
                'registerCar',
                formData.licensePlate,
                formData.chassisNumber,
                formData.brand,
                formData.carType,
                formData.color,
                mileage,
                askingPrice,
                formData.image
            );
            alert("Car registered successfully!");
            setFormData({
                licensePlate: '',
                chassisNumber: '',
                brand: '',
                carType: '',
                color: '',
                mileage: '',
                askingPrice: '',
                image: ''
            });
        } catch (error) {
            console.error("Error registering car:", error);
        }
    }
    
    return (
        <div className="container mx-auto py-20">
            {initialized && (
                <div className="w-full max-w-md mx-auto">
                    <h2 className="text-2xl font-bold mb-4">Car Registration</h2>
                    <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licensePlate">License Plate</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="licensePlate" 
                                type="text" 
                                name="licensePlate" 
                                value={formData.licensePlate} 
                                onChange={handleChange} 
                                placeholder="License Plate" />
                        </div>
                        {/* Chassis Number */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chassisNumber">Chassis Number</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="chassisNumber" 
                                type="text" 
                                name="chassisNumber" 
                                value={formData.chassisNumber} 
                                onChange={handleChange} 
                                placeholder="Chassis Number" />
                        </div>
                        {/* Brand */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="brand" 
                                type="text" 
                                name="brand" 
                                value={formData.brand} 
                                onChange={handleChange} 
                                placeholder="Brand" />
                        </div>
                        {/* Car Type */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="carType">Car Type</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="carType" 
                                type="text" 
                                name="carType" 
                                value={formData.carType} 
                                onChange={handleChange} 
                                placeholder="Car Type" />
                        </div>
                        {/* Color */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="color" 
                                type="text" 
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange} 
                                placeholder="Color" />
                        </div>
                        {/* Mileage */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">Mileage</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="mileage" 
                                type="number" 
                                name="mileage" 
                                value={formData.mileage} 
                                onChange={handleChange} 
                                placeholder="Mileage" />
                        </div>
                        {/* Asking Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="askingPrice">Asking Price</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="askingPrice" 
                                type="number" 
                                name="askingPrice" 
                                value={formData.askingPrice} 
                                onChange={handleChange} 
                                placeholder="Asking Price" />
                        </div>
                        {/* Asking Price */}
                        <div className="mb-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="askingPrice">Car Image</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="Image" 
                                type="link" 
                                name="image" 
                                value={formData.image} 
                                onChange={handleChange} 
                                placeholder="Car Image Link" />
                        </div>
                        <div className="flex items-center justify-between">
                            <button className="bg-orange-700 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
                                type="submit" 
                                onClick={handleSubmit}>
                                Register Car
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarRegistrationForm;
