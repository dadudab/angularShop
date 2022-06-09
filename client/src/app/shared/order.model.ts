export interface Order {
   _id: string;
   userId: string;
   products: Array<any>;
   merchantData: Object;
   shippingData: Object;
   totalAmount: number;
   totalProducts: number;
}
