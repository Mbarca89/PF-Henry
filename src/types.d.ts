export interface Products {
    name:         string;
    price:        number;
    description:  string;
    stock:        number;
    hasDiscount:  boolean;
    discount:     number;
    photos:       Photo[];
    freeShipping: boolean;
    sales:        number;
    rating:       number;
    id:           string;
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
    maxPrice: string;
}