export interface IProduct {
    name: string;
    price: number;
    oldPrice: string | number;
    tags: string[];
    colors: string[];
    sizes: string[];
    size?: string;
    description: string;
    image: string;
    _id: string;
    __v?: number;
}