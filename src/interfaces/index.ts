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

export interface ILocalization {
    swiper: {
        main: string;
        bold: string;
        description: string;
        button: string;
    };
    product: {
        colors: string;
        view: string;
    };
    saved: string;
    cart: {
        topText: string;
        empty: string;
        total: string;
        button: string;
    };
}

export interface ILocalizationConstants {
    EN: ILocalization;
    UA: ILocalization;
}