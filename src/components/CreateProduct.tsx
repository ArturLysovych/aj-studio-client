'use client'
import React, { useState } from 'react';
import useTokenStore from '@/store/token.store';
import Select from 'react-select';
import { v4 as uuidv4 } from 'uuid';
import usePopupStore from '@/store/popup.store';

export default function CreateProduct() {
    const [selectId] = useState(() => uuidv4());
    const token = useTokenStore((state: any) => state.token);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const setResponse = usePopupStore(state => state.setResponse);

    const options = [
        { value: 'hot', label: 'Hot' },
        { value: 'new', label: 'New' },
    ];

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
    const handleOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setOldPrice(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files && e.target.files[0];
        if (file) {
            setImage(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setSelectedImage(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
    
        const formData = new FormData();
        if (name !== '') {
            formData.append('name', name);
        }
        if (price !== '') {
            formData.append('price', price);
        }
        if (oldPrice !== '') {
            formData.append('oldPrice', oldPrice);
        }
        if (tags.length > 0) {
            formData.append('tags', JSON.stringify(tags));
        }
        if (image) {
            formData.append('image', image, image.name);
        }
        
        formData.forEach((value, key) => {
            console.log(key, value);
        });
        
    
        try {
            const response = await fetch(`http://localhost:5000/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const responseData = await response.json();
            console.log(responseData);
            setResponse('Succesfully created!');
            window.location.href = '/admin/products/'
        } catch (error) {
            setResponse('Failed to create product!');
            console.error('Failed to create product:', error);
        }
    };     

    return (
        <div className='w-full h-[calc(100vh-75px)] flex flex-col justify-center items-center gap-[20px] md:gap-[50px]'>

            <h2 className='text-3xl font-bold'>Creating ...</h2>

            <form className="flex flex-col items-center gap-[10px] w-[300px] md:flex-row md:w-full md:justify-center md:gap-[50px]" onSubmit={handleSubmit}>
                <div className="w-[300px] h-[300px] lg:w-[400px] lg:h-[400px] bg-white relative rounded-lg border-[#E7E9EB] border-[8px] border-dashed">
                    {!selectedImage && (
                        <h2 className="absolute w-full h-full flex flex-col gap-[20px] justify-center items-center">
                            <p className="text-xl font-bold">Choose the image with click</p>
                            <p className="text-lg font-medium">Or drag it here</p>
                        </h2>
                    )}
                    <input className="w-full h-full absolute z-30 opacity-0" type="file" accept="image/*" placeholder="Choose Image" onChange={handleImageChange} />
                    {selectedImage && (
                        <div className="w-full h-full absolute z-20 flex justify-center items-center">
                            <img src={selectedImage} alt="Selected Image" className="h-[200px]" />
                        </div>
                    )}
                </div>
                <div className="flex flex-col gap-[10px] w-[300px] md:gap-[20px]">
                    <input className='w-full shadow-sm py-[4px] px-[8px] outline-none rounded-md' type="text" placeholder='Name' value={name} onChange={handleNameChange} />
                    <input className='w-full shadow-sm py-[4px] px-[8px] outline-none rounded-md' type="text" placeholder='Price' value={price} onChange={handlePriceChange} />
                    <input className='w-full shadow-sm py-[4px] px-[8px] outline-none rounded-md' type="text" placeholder='Old Price' value={oldPrice} onChange={handleOldPriceChange} />
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        id={selectId}
                        instanceId={selectId}
                        options={options}
                        className='w-full shadow-sm'
                        onChange={(selectedOptions: any) => setTags(selectedOptions.map((option: any) => option.value))}
                    />
                    <button className='bg-white p-[4px] rounded-md w-full shadow-sm' type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}