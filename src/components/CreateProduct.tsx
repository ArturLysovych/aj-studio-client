'use client'
import React, { useState } from 'react';
import useTokenStore from '@/store/token.store';
import Select from 'react-select';
import usePopupStore from '@/store/popup.store';

export default function CreateProduct() {
    const token = useTokenStore((state: any) => state.token);
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setdescription] = useState('');
    const [tags, setTags] = useState('');
    const [colors, setColors] = useState('');
    const [sizes, setSizes] = useState('');
    const [image, setImage] = useState<File | null>(null);
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const setResponse = usePopupStore(state => state.setResponse);

    const options = [
        { value: 'hot', label: 'Hot' },
        { value: 'new', label: 'New' },
    ];

    const colorsOptions = [
        { value: 'black', label: 'Black' },
        { value: 'red', label: 'Red' },
        { value: 'orange', label: 'Orange' },
        { value: 'yellow', label: 'Yellow' },
        { value: 'green', label: 'Green' },
    ];

    const sizeOptions = [
        { value: '38', label: '38' },
        { value: '39', label: '39' },
        { value: '40', label: '40' },
        { value: '41', label: '41' },
        { value: '42', label: '42' },
        { value: '43', label: '43' },
        { value: '44', label: '44' },
        { value: '45', label: '45' },
    ];

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
    const handledescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => setdescription(e.target.value);
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
        if (description !== '') {
            formData.append('description', description);
        }
        if (tags.length > 0) {
            formData.append('tags', JSON.stringify(tags));
        }
        if (colors.length > 0) {
            formData.append('colors', JSON.stringify(colors));
        }
        if (sizes.length > 0) {
            formData.append('sizes', JSON.stringify(sizes));
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
            setTimeout(() => {
                // window.location.href = '/admin/products/';
            }, 2000);
        } catch (error) {
            setResponse('Failed to create product!');
            console.error('Failed to create product:', error);
        }
    };     

    return (
        <div className='w-full min-h-[calc(100vh-75px)] flex flex-col justify-center items-center gap-[20px] md:gap-[50px] my-[20px]'>

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
                    <textarea 
                        className='w-full flex justify-start items-start shadow-sm py-[4px] px-[8px] outline-none rounded-md resize-none' 
                        placeholder='Description'
                        value={description} 
                        onChange={handledescriptionChange} 
                        style={{ width: '100%', height: '80px' }}
                    />
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={options}
                        className='w-full shadow-sm'
                        placeholder='Tags'
                        onChange={(selectedOptions: any) => setTags(selectedOptions.map((option: any) => option.value))}
                    />
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={colorsOptions}
                        className='w-full shadow-sm'
                        placeholder='Colors'
                        onChange={(selectedOptions: any) => setColors(selectedOptions.map((option: any) => option.value))}
                    />
                    <Select
                        closeMenuOnSelect={false}
                        isMulti
                        options={sizeOptions}
                        className='w-full shadow-sm'
                        placeholder='Sizes'
                        onChange={(selectedOptions: any) => setSizes(selectedOptions.map((option: any) => option.value))}
                    />
                    <button className='bg-white p-[4px] rounded-md w-full shadow-sm' type='submit'>Create</button>
                </div>
            </form>
        </div>
    );
}