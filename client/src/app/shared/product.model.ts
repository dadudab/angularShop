export interface Product {
   _id: string;
   name: string;
   description: string;
   price: number;
   image: object;
   categories: string[];
   createdDate: Date;
   user: any;
}