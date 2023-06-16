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