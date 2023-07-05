export interface Products {
    name: string;
    price: number;
    description: string;
    stock: number;
    hasDiscount: boolean;
    discount: number;
    photos: Photo[];
    freeShipping: boolean;
    sales: number;
    rating: number;
    id: string;
    category: {
        categoryName: string;
    };
    ratingAverage: number
}
export interface Body {
    sort: {
        price: { isSorted: boolean; order: string };
        sales: { isSorted: boolean; order: string };
        relevant: { isSorted: boolean; order: string };
    }
    freeShipping: boolean;
    hasDiscount: boolean;
    category: string;
    minPrice: string;
    maxPrice: number;
}

export interface User {
    id: string,
    name: string,
    email: string,
    address: string,
    city: string,
    province: string,
    postalCode: string,
    phone: string,
    commerceName: string,
    role: string,
    cart: string,
}