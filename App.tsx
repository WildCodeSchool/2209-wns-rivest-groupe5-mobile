import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { DefaultTheme } from "@react-navigation/native";
import { RecoilRoot } from "recoil";
import MobileRoot from "./MobileRoot";

const MyTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: "#FFFFFF",
    primary: "#2ECE65",
  },
};

async function getValueFor(key: string): Promise<string | null> {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    return result;
  } else {
    return null;
  }
}
const { manifest } = Constants;

const uri =
  manifest?.debuggerHost &&
  `http://${manifest.debuggerHost.split(":").shift()}:5050`;
const httpLink = createHttpLink({
  uri: uri,
});

const authLink = setContext(async (_, { headers }) => {
  // get the authentication token from secure storage if it exists
  const token = await getValueFor("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token !== null ? `${token}` : "",
    },
  };
});

const resetClient = async () => {
  await client.clearStore();
};

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default function App() {
  return (
    <ApolloProvider client={client}>
      <RecoilRoot>
        <MobileRoot resetClient={resetClient} />
      </RecoilRoot>
    </ApolloProvider>
  );
}
