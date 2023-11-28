import express from "express";
import cors from "./middleware/cors/cors";
import morgan from "./middleware/morgen/morgen";
import usersRoute from './users/routes.users';
import productRoute from './Banners/Banners.Routes';
import { connectToDatabase } from "./connectToDB";
import dotenv from 'dotenv';
dotenv.config();

export const api = process.env.MONGO || ''
export const secret_key = process.env.SECRET_KEY || ""
export const server = process.env.MY_SERVER ||""

const app = express();

connectToDatabase();

app.use(express.json({limit: '50mb'}));

app.use(cors)
app.use(morgan)



const port = process.env.PORT || 8008
app.listen(port, () => console.log(`server run in port ${port}!`));

app.use('/api/banners', productRoute);
app.use('/api/users', usersRoute);


