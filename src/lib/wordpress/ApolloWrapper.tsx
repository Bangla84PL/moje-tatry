/**
 * Apollo Client Wrapper
 *
 * Client component that wraps the application with ApolloProvider
 * Enables GraphQL data fetching throughout the app
 */

'use client';

import { ApolloProvider } from '@apollo/client/react';
import { apolloClient } from './client';

interface ApolloWrapperProps {
  children: React.ReactNode;
}

export function ApolloWrapper({ children }: ApolloWrapperProps) {
  return <ApolloProvider client={apolloClient}>{children}</ApolloProvider>;
}
