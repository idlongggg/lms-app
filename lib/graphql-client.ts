"use client";

import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
} from "@apollo/client";

import { mockUsers } from "@/data/users";

// Mock client config
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === "true" || true; // Default to true for now

const createMockClient = () => {
  return new ApolloClient({
    link: ApolloLink.empty(),
    cache: new InMemoryCache(),
    resolvers: {
      Query: {
        users: () => mockUsers,
        user: (_: any, args: { id: string }) =>
          mockUsers.find((u) => u.id === args.id),
      },
    },
  } as any);
};

const createRealClient = () => {
  return new ApolloClient({
    uri: process.env.NEXT_PUBLIC_GRAPHQL_API || "/api/graphql",
    cache: new InMemoryCache(),
  } as any);
};

export const client = USE_MOCK ? createMockClient() : createRealClient();
