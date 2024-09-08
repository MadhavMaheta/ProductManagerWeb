export interface Products{
    id : number;
    name:string;
    description: string;
    price:number;
    currencyPrice?:string;
    inStock:boolean;
    categoryId:number;
    imageData?:any;
}


export interface ProductCheckoutData{
    productId : number;
    productQuantity : number;
}