export interface Products{
    id : number;
    name:string;
    description: string;
    price:number;
    inStock:boolean;
    categoryId:number;
    imageData?:any;
}