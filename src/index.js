// npm install @apollo/server express graphql cors body-parser
import { ApolloServer } from '@apollo/server';
import mongoose from 'mongoose';
import { expressMiddleware } from '@apollo/server/express4';
import { makeExecutableSchema } from '@graphql-tools/schema';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express';
import http from 'http';
import cors from 'cors';
import  json  from 'body-parser';
import typeDefs from './schema/typeDefs'
import resolvers from './schema/resolvers';
import dev from './config/dev';
import * as AppModels from './models';
import AuthMiddleware from './middlewares/auth';
import { AuthDirectiveTransformer } from './directives';


let schema = makeExecutableSchema({typeDefs, resolvers});
schema = AuthDirectiveTransformer(schema, 'isAuth');

const app = express();
const httpServer = http.createServer(app);
const server = new ApolloServer({
  schema,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});
await server.start();
app.use(AuthMiddleware);
app.use(
  '/graphql',
  cors(),
  json(),
  expressMiddleware(server, {
    context: async ({ req }) => {
      let {isAuth, user} = req
      return { 
        token: req.headers.token, 
        ...AppModels,
        isAuth,
        user,
        req,
      }
    },
  }),
);
mongoose.connect(dev.MONGODB_URI)
.then(()=>{
  httpServer.listen(dev.PORT, ()=>{
      console.log(`server started at port: ${dev.PORT}`);
  })
})
.catch((err)=> console.error(err));
console.log(`🚀 Server ready at http://localhost:4000/graphql`);