export class Order{
    orderTotal : number;
    orderItems : OrderItem[];
}

export class OrderItem
{
    quantity : number;
    productId : number;
    itemPrice : number;
}