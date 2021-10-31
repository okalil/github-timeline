import Vue from 'vue';
import VueApollo from 'vue-apollo';
import {
  createApolloClient,
  restartWebsockets,
} from 'vue-cli-plugin-apollo/graphql-client';

// Install the vue plugin
Vue.use(VueApollo);

// Name of the localStorage item
const AUTH_TOKEN = 'apollo-token';

// Http endpoint
const httpEndpoint = process.env.VUE_APP_GRAPHQL_HTTP;

// Config
const defaultOptions = {
  httpEndpoint,
  // LocalStorage token
  tokenName: AUTH_TOKEN,
  persisting: false,
  ssr: false,
  getAuth: () => {
    const token = process.env.VUE_APP_GITHUB_GRAPHQL_AUTH_TOKEN;
    if (!token) return '';
    return `Bearer ${token}`;
  },
};

export function createProvider(options = {}) {
  const { apolloClient, wsClient } = createApolloClient({
    ...defaultOptions,
    ...options,
  });
  apolloClient.wsClient = wsClient;

  const apolloProvider = new VueApollo({
    defaultClient: apolloClient,
    defaultOptions: {
      $query: {
        // fetchPolicy: 'cache-and-network',
      },
    },
    errorHandler(error) {
      // eslint-disable-next-line no-console
      console.log(
        '%cError',
        'background: red; color: white; padding: 2px 4px; border-radius: 3px; font-weight: bold;',
        error.message
      );
    },
  });

  return apolloProvider;
}

// Manually call this when user log in
export async function onLogin(apolloClient, token) {
  if (typeof localStorage !== 'undefined' && token) {
    localStorage.setItem(AUTH_TOKEN, token);
  }
  if (apolloClient.wsClient) restartWebsockets(apolloClient.wsClient);
  try {
    await apolloClient.resetStore();
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log('%cError on cache reset (login)', 'color: orange;', e.message);
  }
}
