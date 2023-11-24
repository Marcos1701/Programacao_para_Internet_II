import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { GraphQLSchema, buildSchema, GraphQLList, GraphQLObjectType, GraphQLString, GraphQLInputObjectType } from "graphql";
const schema = buildSchema(`
    type Book {
        title: String
        author: String
    }

    type Query {
        books: [Book]
    }

    input BookInput {
        title: String
        author: String
    }

    type Mutation {
        createBook(book: BookInput!): Book
    }
`);
const schema_v2 = new GraphQLSchema({
    query: new GraphQLObjectType({
        name: "Query",
        fields: {
            books: {
                type: new GraphQLList(new GraphQLObjectType({
                    name: "Book",
                    fields: {
                        title: { type: GraphQLString },
                        author: { type: GraphQLString }
                    }
                })),
                resolve: () => books
            }
        }
    }),
    mutation: new GraphQLObjectType({
        name: "Mutation",
        fields: {
            createBook: {
                type: new GraphQLObjectType({
                    name: "InputBook",
                    fields: {
                        title: { type: GraphQLString },
                        author: { type: GraphQLString }
                    }
                }),
                args: {
                    book: {
                        type: new GraphQLInputObjectType({
                            name: "BookInput",
                            fields: {
                                title: { type: GraphQLString },
                                author: { type: GraphQLString }
                            }
                        })
                    }
                },
                resolve: (parent, args) => {
                    const { book } = args;
                    books.push(book);
                    return book;
                }
            }
        }
    })
});
const books = [
    {
        title: "Harry Potter",
        author: "J. K. Rowling"
    },
    {
        title: "Jurassic Park",
        author: "Michael Crichton"
    }
];
const resolvers = {
    Query: {
        books: () => books
    },
    Mutation: {
        createBook: (parent, args) => {
            const { book } = args;
            books.push(book);
            return book;
        }
    }
};
const server_v1 = new ApolloServer({ typeDefs: schema, resolvers });
const server_v2 = new ApolloServer({ schema: schema_v2 });
const { url } = await startStandaloneServer(server_v1, {
    listen: { port: 3000 }
});
const { url: url_v2 } = await startStandaloneServer(server_v2, {
    listen: { port: 3001 }
});
console.log(`🚀 Server 1 ready at ${url}`);
console.log(`🚀 Server 2 ready at ${url_v2}`);
