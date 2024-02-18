import React, { useState } from 'react';
import useTokenStore from '@/store/token.store';

export default function CreateProduct() {
    const token = useTokenStore((state: any) => state.token);
    const [formData, setFormData] = useState(new FormData());
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [oldPrice, setOldPrice] = useState('');
    const [tags, setTags] = useState('');
    const [image, setImage] = useState<File | null>(null);

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value);
    const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setPrice(e.target.value);
    const handleOldPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => setOldPrice(e.target.value);
    const handleTagsChange = (e: React.ChangeEvent<HTMLInputElement>) => setTags(e.target.value);
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImage(e.target.files[0]);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('name', name);
        formData.append('price', price);
        formData.append('oldPrice', oldPrice);
        formData.append('tags', tags);
        if (image) {
            formData.append('image', image);
        }

        try {
            console.log(formData);
            const response = await fetch(`http://localhost:5000/products`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${token}`
                },
                body: formData
            });
            const responseData = await response.json();
            console.log(responseData);
        } catch (error) {
            console.error('Failed to create product:', error);
        }
    };

    return (
        <div className='w-full mt-[20px]'>
            <h2 className='text-3xl'>Create product</h2>
            <div className='flex justify-center items-center mt-[20px] p-[10px]'>
                <form className='p-[10px] flex flex-col gap-[10px] bg-yellow-500' onSubmit={handleSubmit}>
                <input className='bg-[#333] p-[4px] text-white' type="text" placeholder='name' value={name} onChange={handleNameChange} />
                    <input className='bg-[#333] p-[4px] text-white' type="text" placeholder='price' value={price} onChange={handlePriceChange} />
                    <input className='bg-[#333] p-[4px] text-white' type="text" placeholder='oldPrice' value={oldPrice} onChange={handleOldPriceChange} />
                    <input className='bg-[#333] p-[4px] text-white' type="text" placeholder='tags' value={tags} onChange={handleTagsChange} />
                    <input className='bg-[#333] p-[4px] text-white' type="file" onChange={handleImageChange} />
                    <button className='p-[4px] bg-[#333] text-white' type='submit'>Create</button>
                </form>
            </div>
        </div>
    );
}
