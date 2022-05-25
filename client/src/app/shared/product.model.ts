export interface Product {
   _id: string;
   name: string;
   description: string;
   price: number;
   image: any;
   categories: string[];
   createdDate: Date;
   user: any;
}