import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from "@expo/vector-icons/Ionicons";
import { CreateGoodDealScreen } from "./CreateGoodDealScreen";
import GoodDealsFeedScreen from "./GoodDealsFeedScreen";
import MyGoodDealsScreen from "./MyGoodDealsScreen";
import { useRecoilState } from "recoil";
import { currentUserState } from "../../../atom/currentUserAtom";

const Tab = createBottomTabNavigator();

const GoodDealsTab = () => {
  const [user, setUser] = useRecoilState(currentUserState);

  return (
    <Tab.Navigator
      initialRouteName="Feed bons plans"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined;

          if (route.name === "Mes bons plans") {
            iconName = focused ? "book" : "book-outline";
          } else if (route.name === "Feed bons plans") {
            iconName = focused ? "albums" : "albums-outline";
          } else if (route.name === "Créer un bon plan") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#003c49",
        tabBarInactiveTintColor: "gray",
      })}
    >
      {user !== null && (
        <Tab.Screen name="Mes bons plans" component={MyGoodDealsScreen} />
      )}
      <Tab.Screen
        name="Feed bons plans"
        component={GoodDealsFeedScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="Créer un bon plan" component={CreateGoodDealScreen} />
    </Tab.Navigator>
  );
};

export default GoodDealsTab;
