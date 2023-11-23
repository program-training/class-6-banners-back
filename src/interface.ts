export interface Users {
    _id?:string
    username: string;
    email: string;
    password: string;
    isAdmin: boolean;
}


export interface Banner {
    _id: string;
    id:number
    image: {
        url: string;
        alt: string;
    };
    text: string;
    createdAt: Date;
    author: string;
    category: string;
    rating: number;
    sale?: number;
    productID: number;
  }
  
