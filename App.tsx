import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
} from "@apollo/client";
import Constants from "expo-constants";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { StyleSheet} from "react-native";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { GoodDealsScreen } from "./screens/GoodDealsScreen";
import { GoodDealDetailScreen } from "./screens/GoodDealDetailScreen";


const { manifest } = Constants;


const uri = manifest?.debuggerHost && `http://${manifest.debuggerHost.split(':').shift()}:5050`;

const client = new ApolloClient({
  uri: uri,
  cache: new InMemoryCache(),
});

const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <ApolloProvider client={client}>
      <NavigationContainer>
        <Drawer.Navigator initialRouteName="Inscription">
          <Drawer.Screen name="Home" component={HomeScreen} />
          <Drawer.Screen name="Login" component={LoginScreen} />
          <Drawer.Screen name="Inscription" component={RegisterScreen} />
          <Drawer.Screen name="GoodDeals" component={GoodDealsScreen} />
          <Drawer.Screen
            name="GoodDealDetail"
            component={GoodDealDetailScreen}
          />
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
