import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import CreateActivityScreen from "./CreateActivityScreen";
import MyActivitiesScreen from "./MyActivitiesScreen";
import CreateActivityTypeScreen from "./CreateActivityTypeScreen";

const Tab = createBottomTabNavigator();

const ActivitiesTab = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MyActivities"
        component={MyActivitiesScreen}
        options={{ unmountOnBlur: true }}
      />
      <Tab.Screen name="CreateActivity" component={CreateActivityScreen} />
      <Tab.Screen
        name="CreateActivityType"
        component={CreateActivityTypeScreen}
      />
    </Tab.Navigator>
  );
};

export default ActivitiesTab;
