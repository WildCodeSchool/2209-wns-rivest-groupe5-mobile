import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
import { RecoilRoot } from "recoil";
import MobileRoot from "./MobileRoot";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { StyleSheet } from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { GoodDealsScreen } from "./screens/GoodDealsScreen";
import { GoodDealDetailScreen } from "./screens/GoodDealDetailScreen";
import ActivitiesScreen from "./screens/activities/ActivitiesScreen";
import { CreateGoodDealScreen } from "./screens/CreateGoodDealScreen";
import { UploadPictureInput } from "./components/UploadPictureInput";

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
