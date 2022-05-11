export interface Product {
   _id: string;
   name: string;
   description: string;
   price: number;
   imageUrl: string;
   categories: string[];
   createdDate: Date;
   user: any;
}