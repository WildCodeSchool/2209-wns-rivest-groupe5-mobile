import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_ACTIVITIES } from "../../../graphql/queries/activities/getMyActivitiesQuery";
import { IActivity } from "../../../interfaces/IActivity";
import { useFocusEffect } from "@react-navigation/native";
import { isTokenInStore } from "../../../helpers/isTokenInStore";
import { useIsFocused } from "@react-navigation/native";

const MyActivitiesScreen = () => {
  const [getMyActivities, { loading, error }] = useLazyQuery(GET_MY_ACTIVITIES);
  const [acitivities, setActivities] = useState([]);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      console.log(
        "🚀 ~ file: MyActivitiesScreen.tsx:14 ~ MyActivitiesScreen ~ isFocused",
        isFocused
      );
      async function fetchActivities() {
        const data = await getMyActivities();
        console.log(
          "🚀 ~ file: MyActivitiesScreen.tsx:15 ~ fetchActivities ~ data",
          data.data.getAllMyActivities
        );
        setActivities(data.data.getAllMyActivities);
      }
      fetchActivities();
    }, [isFocused])
  );

  if (loading) {
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View>
        <Text>An error occured : {error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      {acitivities &&
        acitivities.map((activity: IActivity) => {
          console.log(activity);
          return <Text key={activity.activityId}>{activity.title}</Text>;
        })}
      <Text>MyActivitiesScreen</Text>
    </View>
  );
};

export default MyActivitiesScreen;
