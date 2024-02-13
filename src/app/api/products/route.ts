import axios from 'axios';
import { NextResponse } from 'next/server';

export async function GET(req: Request) {
    const response = await axios.get('http://localhost:5000/products/');
    const products = response.data;
    return NextResponse.json(products);
}
