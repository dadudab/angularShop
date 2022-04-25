export class User {
   id: string;
   firstName: string;
   lastName: string;
   city: string;
   address: string;
   postalCode: string;
   email: string;
   username: string;
   password: string;
   token: string;
   tokenExpirationDate: number;

   constructor(
      id: string, 
      firstName: string, 
      lastName: string, 
      city: string, 
      address: string, 
      postalCode: string,
      email: string, 
      username: string, 
      password: string, 
      token: string, 
      tokenExpirationDate: number
      ) {
         this.id = id;
         this.firstName = firstName;
         this.lastName = lastName;
         this.city = city;
         this.address = address;
         this.postalCode = postalCode;
         this.email = email;
         this.username = username;
         this.password = password;
         this.token = token;
         this.tokenExpirationDate = tokenExpirationDate;
      }
}