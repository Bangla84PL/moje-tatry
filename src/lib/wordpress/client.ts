/**
 * Tatra Trails - Apollo Client Configuration
 *
 * Configures Apollo Client for querying WordPress GraphQL API
 */

import { ApolloClient, InMemoryCache, HttpLink, from } from '@apollo/client';
import { CombinedGraphQLErrors } from '@apollo/client/errors';
import { onError } from '@apollo/client/link/error';
import { setContext } from '@apollo/client/link/context';

// Get WordPress API URL from environment variables
const WORDPRESS_API_URL = process.env.WORDPRESS_API_URL || 'http://localhost:8080/graphql';

// Error handling link
const errorLink = onError(({ error, operation }) => {
  if (CombinedGraphQLErrors.is(error)) {
    error.errors.forEach(({ message, locations, path }) => {
      console.error(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}, Operation: ${operation.operationName}`
      );
    });
    return;
  }

  if (error) {
    console.error(`[Network error]: ${error}`);
  }
});

// HTTP link for GraphQL endpoint
const httpLink = new HttpLink({
  uri: WORDPRESS_API_URL,
  credentials: 'same-origin',
});

// Auth link (for future authenticated mutations)
const authLink = setContext((_, { headers }) => {
  // Get auth token from localStorage (future implementation)
  // const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;

  return {
    headers: {
      ...headers,
      // authorization: token ? `Bearer ${token}` : '',
      'Content-Type': 'application/json',
    },
  };
});

// Combine links
const link = from([errorLink, authLink, httpLink]);

// Create Apollo Client
export const apolloClient = new ApolloClient({
  link,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          // Pagination policy for trail reports
          trailReports: {
            keyArgs: ['where'],
            merge(existing, incoming, { args }) {
              // If no existing data or no cursor, return incoming
              if (!existing || !args?.after) {
                return incoming;
              }

              // Merge edges for pagination
              return {
                ...incoming,
                edges: [...(existing.edges || []), ...(incoming.edges || [])],
              };
            },
          },
          // Pagination policy for blog posts
          posts: {
            keyArgs: ['where'],
            merge(existing, incoming, { args }) {
              if (!existing || !args?.after) {
                return incoming;
              }

              return {
                ...incoming,
                edges: [...(existing.edges || []), ...(incoming.edges || [])],
              };
            },
          },
        },
      },
    },
  }),
  // Server-side rendering support
  ssrMode: typeof window === 'undefined',
  // Default options
  defaultOptions: {
    watchQuery: {
      fetchPolicy: 'cache-and-network',
      errorPolicy: 'all',
    },
    query: {
      fetchPolicy: 'network-only',
      errorPolicy: 'all',
    },
    mutate: {
      errorPolicy: 'all',
    },
  },
});

/**
 * Helper function to reset Apollo Client cache
 * Useful for language switching or after mutations
 */
export function resetCache(): void {
  apolloClient.cache.reset();
}

/**
 * Helper function to clear specific cache entries
 * @param typename - GraphQL typename to clear (e.g., 'TrailReport')
 */
export function clearCacheByTypename(typename: string): void {
  apolloClient.cache.evict({ id: typename });
  apolloClient.cache.gc();
}
