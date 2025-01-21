import './Config/Config';
import './Config/DBConfig';
import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';

import { AdminSchema } from './Schemas/AdminSchema';
import { BranchSchema } from './Schemas/BranchSchema';
import { CategoryProductSchema } from './Schemas/CategoryProductSchema';
import { ClientSchema } from './Schemas/ClientSchema';
import { IngredientSchema } from './Schemas/IngredientSchema';
import { OrderSchema } from './Schemas/OrderSchema';
import { ProductSchema } from './Schemas/ProductSchema';
import { UbicationSchema } from './Schemas/UbicationSchema';
import { LogSchema } from './Schemas/LogSchema';

import { AdminResolver } from './Resolvers/AdminResolver';
import { BranchResolver } from './Resolvers/BranchResolver';
import { CategoryProductResolver } from './Resolvers/CategoryProductResolver';
import { ClientResolver } from './Resolvers/ClientResolver';
import { IngredientResolver } from './Resolvers/IngredientResolver';
import { OrderResolver } from './Resolvers/OrderResolver';
import { ProductResolver } from './Resolvers/ProductResolver';
import { UbicationResolver } from './Resolvers/UbicationResolver';
import { LogResolver } from './Resolvers/LogResolver';

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
