import express from "express";
import cors from "./middleware/cors/cors";
import morgan from "./middleware/morgen/morgen";
import usersRoute from './users/routes.users';
import productRoute from './Banners/Banners.Routes';
import { connectToDatabase } from "./connectToDB";
import dotenv from 'dotenv';
import { ApolloServer } from 'apollo-server';
import resolvers from "./Banners/banners.resolvers";
import typeDefs from "./Banners/Banners.model2"
dotenv.config();

export const api = process.env.MONGO || ''
export const secret_key = process.env.SECRET_KEY || "erp"
// export const server = process.env.MY_SERVER ||"https://serverbanners.onrender.com"

export const server = new ApolloServer({ typeDefs, resolvers });

server.listen().then(({ url }: { url: string }) => {
    console.log(`🚀 Server ready at ${url}`);
  });
const app = express();

connectToDatabase();

// app.use(express.json({limit: '50mb'}));

// app.use(cors)
// app.use(morgan)



// const port = process.env.PORT || 8008
// app.listen(port, () => console.log(`server run in port ${port}!`));

// app.use('/banners', productRoute);
// app.use('/users', usersRoute);


