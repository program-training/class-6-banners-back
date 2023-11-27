import mongoose, { Document, Schema } from 'mongoose';

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
  
  const userSchema = new Schema<Users>({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, required: true },
}, { versionKey: false });

export { userSchema };