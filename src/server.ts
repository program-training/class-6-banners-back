import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "./middleware/cors/cors";
import morgan from "./middleware/morgen/morgen";
import usersRoute from "./users/routes.users";
import productRoute from "./Banners/Banners.Routes";
import { connectToDatabase } from "./connectToDB";
import dotenv from "dotenv";
import typeDefs from "./Banners/Banners.model2";
import  resolvers from './Banners/banners.resolvers'
import http from "http";
interface MyContext {
  token?: string;
}
dotenv.config();
export const api = process.env.MONGO || "";
export const secret_key = process.env.SECRET_KEY || "erp";
export const server = process.env.MY_SERVER || "http://localhost:8008";
const app = express();
const httpServer = http.createServer(app);
const apolloServer = new ApolloServer<MyContext>({
  typeDefs,
  resolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
async function startServer() {
  await apolloServer.start();
  app.use(
    "/graphql",
    cors,
    morgan,
    express.json(),
    expressMiddleware(apolloServer, {
      context: async ({ req }) => ({ token: req.headers.token }),
    })
  );
  httpServer.listen({ port: 4000 }, () => {
    console.log(`:rocket: Server ready at http://localhost:4000/graphql`);
  });
  connectToDatabase();
  // app.use("/banners", productRoute);
  // app.use("/users", usersRoute);
}
startServer();





