import './Config/DBConfig';
import './Config/RedisDB';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { AdminSchema } from './GraphQL/Schemas/AdminSchema';
import { BranchSchema } from './GraphQL/Schemas/BranchSchema';
import { CategoryProductSchema } from './GraphQL/Schemas/CategoryProductSchema';
import { ClientSchema } from './GraphQL/Schemas/ClientSchema';
import { IngredientSchema } from './GraphQL/Schemas/IngredientSchema';
import { OrderSchema } from './GraphQL/Schemas/OrderSchema';
import { ProductSchema } from './GraphQL/Schemas/ProductSchema';
import { UbicationSchema } from './GraphQL/Schemas/UbicationSchema';
import { LogSchema } from './GraphQL/Schemas/LogSchema';
import { LoginSchema } from './GraphQL/Schemas/LoginSchema';

import { AdminResolver } from './GraphQL/Resolvers/AdminResolver';
import { BranchResolver } from './GraphQL/Resolvers/BranchResolver';
import { CategoryProductResolver } from './GraphQL/Resolvers/CategoryProductResolver';
import { ClientResolver } from './GraphQL/Resolvers/ClientResolver';
import { IngredientResolver } from './GraphQL/Resolvers/IngredientResolver';
import { OrderResolver } from './GraphQL/Resolvers/OrderResolver';
import { ProductResolver } from './GraphQL/Resolvers/ProductResolver';
import { UbicationResolver } from './GraphQL/Resolvers/UbicationResolver';
import { LogResolver } from './GraphQL/Resolvers/LogResolver';
import { LoginResolver } from './GraphQL/Resolvers/LoginResolver';

const typeDefs = [
    AdminSchema,
    BranchSchema,
    CategoryProductSchema,
    ClientSchema,
    IngredientSchema,
    OrderSchema,
    ProductSchema,
    UbicationSchema,
    LogSchema,
    LoginSchema,
];

const resolvers = [
    AdminResolver,
    BranchResolver,
    CategoryProductResolver,
    ClientResolver,
    IngredientResolver,
    OrderResolver,
    ProductResolver,
    UbicationResolver,
    LogResolver,
    LoginResolver,
];

const server = new ApolloServer({
    typeDefs,
    resolvers,
});

const startServer = async () => {
    const { url } = await startStandaloneServer(server, {
        listen: { port: 4000 },
    });

    console.log(`🚀 Server is running at ${url}`);
};

startServer().catch((error) => {
    console.error('❌ Error starting the server:', error);
});