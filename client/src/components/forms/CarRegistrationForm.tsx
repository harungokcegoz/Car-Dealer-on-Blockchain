"use client";
import { useState } from 'react';
import useCarRegistration from '@/hooks/useCarRegistration';
import Button from '../atoms/Button';
import { nftStorageApiKey } from '../../utils/FetchKeys';

const CarRegistrationForm = () => {
    const [formData, setFormData] = useState({
        licensePlate: '',
        chassisNumber: '',
        brand: '',
        color: '',
        mileage: '',
        askingPrice: '',
        file: null as File | null
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            const file = e.target.files[0];
            setFormData(prevState => ({
                ...prevState,
                file: file
            }));
        }
    }

    const useCarRegistrationHook = useCarRegistration();

    const handleSubmit = async () => {
        const uploadData = new FormData();
        if (formData.file) {
            uploadData.append('file', formData.file);
        }

        const response = await fetch('https://api.nft.storage/upload', {
            method: 'POST',
            headers: { Authorization: `Bearer ${nftStorageApiKey}` },
            body: uploadData
        });

        const data = await response.json();
        const imageUrl = data.value.cid;
        
        const success = await useCarRegistrationHook.registerCar({
            ...formData,
            imageUrl
        });

        if (success) {
            setFormData({
                licensePlate: '',
                chassisNumber: '',
                brand: '',
                color: '',
                mileage: '',
                askingPrice: '',
                file: null
            });
        }
    }
    
    return (
        <div className="container mx-auto py-20 flex justify-center">
            {useCarRegistrationHook.initialized && (
                <div className="w-2/3">
                    <h2 className="text-2xl font-bold mb-12">Car Registration</h2>
                    <div className="bg-white shadow-md rounded p-12 mb-8 flex flex-wrap">
                        <div className="mb-8 pr-4 w-1/2">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="licensePlate">License Plate</label>
                            <input className="shadow appearance-none border rounded w-full py-3 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="licensePlate" 
                                type="text" 
                                name="licensePlate" 
                                value={formData.licensePlate} 
                                onChange={handleChange} 
                                placeholder="License Plate" />
                        </div>
                        {/* Chassis Number */}
                        <div className="mb-8 w-1/2 pr-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="chassisNumber">Chassis Number</label>
                            <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="chassisNumber" 
                                type="text" 
                                name="chassisNumber" 
                                value={formData.chassisNumber} 
                                onChange={handleChange} 
                                placeholder="Chassis Number" />
                        </div>
                        {/* Brand */}
                        <div className="mb-8 w-1/2 pr-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="brand">Brand</label>
                            <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="brand" 
                                type="text" 
                                name="brand" 
                                value={formData.brand} 
                                onChange={handleChange} 
                                placeholder="Brand" />
                        </div>
                        {/* Color */}
                        <div className="mb-8 w-1/2 pr-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="color">Color</label>
                            <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="color" 
                                type="text" 
                                name="color" 
                                value={formData.color} 
                                onChange={handleChange} 
                                placeholder="Color" />
                        </div>
                        {/* Mileage */}
                        <div className="mb-8 w-1/2 pr-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="mileage">Mileage</label>
                            <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="mileage" 
                                type="number" 
                                name="mileage" 
                                value={formData.mileage} 
                                onChange={handleChange} 
                                placeholder="Mileage" />
                        </div>
                        {/* Asking Price */}
                        <div className="mb-8 w-1/2 pr-4">
                            <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="askingPrice">Asking Price</label>
                            <input className="shadow appearance-none border rounded w-full p-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline text-xs" 
                                id="askingPrice" 
                                type="number" 
                                name="askingPrice" 
                                value={formData.askingPrice} 
                                onChange={handleChange} 
                                placeholder="Asking Price" />
                        </div>
                        <div className="last-row flex justify-between w-full pr-4">
                            {/* Image */}
                            <div className="mb-8">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="askingPrice">Car Image Link</label>
                                <input type="file" name="file" onChange={handleFileChange} className='text-xs py-3'/>
                            </div>
                            {/* Submit Button */}
                            <div className="flex items-center">
                                <Button type="submit" text="Submit" onClick={handleSubmit} />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CarRegistrationForm;
