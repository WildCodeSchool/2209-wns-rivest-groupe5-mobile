import React, { useEffect } from "react";
import { HomeScreen } from "./screens/HomeScreen";
import { LoginScreen } from "./screens/LoginScreen";
import { RegisterScreen } from "./screens/RegisterScreen";
import { GoodDealsScreen } from "./screens/GoodDealsScreen";
import { GoodDealDetailScreen } from "./screens/GoodDealDetailScreen";
import ActivitiesScreen from "./screens/activities/ActivitiesScreen";
import { useRecoilState } from "recoil";
import { NavigationContainer } from "@react-navigation/native";
import { currentUserState } from "./atom/currentUserAtom";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import * as SecureStore from "expo-secure-store";
import { CreateGoodDealScreen } from "./screens/CreateGoodDealScreen";

const Drawer = createDrawerNavigator();

const MobileRoot = ({ resetClient }) => {
  const [user, setUser] = useRecoilState(currentUserState);

  useEffect(() => {
    console.log(user);
  }, [user]);

  function CustomDrawerContent(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {user !== null && (
          <DrawerItem label="Logout" onPress={() => logout(props)} />
        )}
      </DrawerContentScrollView>
    );
  }

  const logout = async (props: any) => {
    props.navigation.navigate("Accueil");
    setUser(null);
    await SecureStore.deleteItemAsync("token");
    await resetClient();
  };

  // TODO : remplacer GoodDeals et GoodDealDetails par un GoodDealScreen sur le modèle des activités, et dans ce fichier inclure les 2 routes

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Accueil"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Accueil"
          component={HomeScreen}
          options={{
            drawerItemStyle: { display: user === null ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="Connexion"
          component={LoginScreen}
          options={{
            drawerItemStyle: { display: user === null ? "flex" : "none" },
          }}
        />
        <Drawer.Screen
          name="Inscription"
          component={RegisterScreen}
          options={{
            drawerItemStyle: { display: user === null ? "flex" : "none" },
          }}
        />
        <Drawer.Screen name="Bons Plans" component={GoodDealsScreen} />
        <Drawer.Screen name="GoodDealDetail" component={GoodDealDetailScreen} />
        <Drawer.Screen
          name="Activités"
          component={ActivitiesScreen}
          options={{
            drawerItemStyle: { display: user !== null ? "flex" : "none" },
          }}
        />
         <Drawer.Screen
            name="CreateGoodDeal"
            component={CreateGoodDealScreen}
          />
      </Drawer.Navigator>
    </NavigationContainer>
  );
};

export default MobileRoot;
