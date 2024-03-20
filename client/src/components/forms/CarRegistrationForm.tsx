"use client";
import { useState } from 'react';
import useCarRegistration from '@/hooks/useCarRegistration';
import Button from '../atoms/Button';

const CarRegistrationForm = () => {
    const [formData, setFormData] = useState({
        licensePlate: '',
        chassisNumber: '',
        brand: '',
        color: '',
        mileage: '',
        askingPrice: '',
        imageUrl: ''
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const useCarRegistrationHook = useCarRegistration();
    const handleSubmit = async () => {
        const success = await useCarRegistrationHook.registerCar(formData);
        if (success) {
            setFormData({
                licensePlate: '',
                chassisNumber: '',
                brand: '',
                color: '',
                mileage: '',
                askingPrice: '',
                imageUrl: ''
            });
        }
    }
    
    return (
        <div className="container mx-auto py-20">
            {useCarRegistrationHook.initialized && (
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
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="askingPrice">Car Image Link</label>
                            <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
                                id="image" 
                                type="link" 
                                name="imageUrl" 
                                value={formData.imageUrl} 
                                onChange={handleChange} 
                                placeholder="Car Image Link" />
                        </div>
                        <div className="flex items-center justify-between mt-10">
                            <Button type="submit" text="Register Car" onClick={handleSubmit} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarRegistrationForm;
