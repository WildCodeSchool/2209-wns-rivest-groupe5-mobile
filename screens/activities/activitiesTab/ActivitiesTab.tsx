import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateActivityScreen from "./CreateActivityScreen";
import MyActivitiesScreen from "./MyActivitiesScreen";
import CreateActivityTypeScreen from "./CreateActivityTypeScreen";
import Ionicons from "@expo/vector-icons/Ionicons";

const Tab = createBottomTabNavigator();

const ActivitiesTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName = "link";

          if (route.name === "Mes Activités") {
            iconName = focused ? "car" : "car-outline";
          } else if (route.name === "Créer Activité") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          } else if (route.name === "Créer Type") {
            iconName = focused ? "add-circle" : "add-circle-outline";
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "blue",
        tabBarInactiveTintColor: "gray",
      })}
    >
      <Tab.Screen name="Créer Activité" component={CreateActivityScreen} />
      <Tab.Screen name="Créer Type" component={CreateActivityTypeScreen} />
      <Tab.Screen
        name="Mes Activités"
        component={MyActivitiesScreen}
        options={{ unmountOnBlur: true }}
      />
    </Tab.Navigator>
  );
};

export default ActivitiesTab;
