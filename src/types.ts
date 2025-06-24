export interface iProduct {
    id: number,
    name: string,
    price: number,
    DelPrice?: number;
    rating?: number;
    img: string;
    type?: string;
    size?: string;
    Available?: string;
    
}

export interface Products {
    Allproducts: iProduct[],
    NewArrival?: iProduct[],
    DealofDay?: iProduct[],
    RelatedProducts?: iProduct[],
    Fruits?: iProduct[],
    Vegetables?: iProduct[],
    Snacks?: iProduct[],
    Juice?: iProduct[]
}

export interface iVendors {
    id: number;
    Text: string;
    sales: string;
    IMG: string;
    TotalSales: string;
    Logo: string;
}

