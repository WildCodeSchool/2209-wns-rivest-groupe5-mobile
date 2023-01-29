import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import * as SecureStore from "expo-secure-store";
import { setContext } from "@apollo/client/link/context";
import Constants from "expo-constants";
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

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

const logout = async (props: any) => {
  props.navigation.navigate("Home");
  await SecureStore.deleteItemAsync("token");
  await client.resetStore();
};

const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: any) {
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList {...props} />
      <DrawerItem label="Logout" onPress={() => logout(props)} />
    </DrawerContentScrollView>
  );
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator
          initialRouteName="Home"
          drawerContent={(props) => <CustomDrawerContent {...props} />}
        >
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Register" component={RegisterScreen} />
          <Drawer.Screen name="GoodDeals" component={GoodDealsScreen} />
          <Drawer.Screen
            name="GoodDealDetail"
            component={GoodDealDetailScreen}
          />
          <Drawer.Screen name="Activities" component={ActivitiesScreen} />
        </Drawer.Navigator>
      </NavigationContainer>
    </ApolloProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "red",
    alignItems: "center",
    justifyContent: "center",
  },
});
