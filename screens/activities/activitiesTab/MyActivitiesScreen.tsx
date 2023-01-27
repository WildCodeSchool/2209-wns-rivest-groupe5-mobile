import { View, Text } from "react-native";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_ACTIVITIES } from "../../../graphql/queries/activities/getMyActivitiesQuery";
import { IActivity } from "../../../interfaces/IActivity";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";

const MyActivitiesScreen = () => {
  const [getMyActivities, { loading, error }] = useLazyQuery(GET_MY_ACTIVITIES);
  const [acitivities, setActivities] = useState([]);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchActivities() {
        // TODO : au logout si retour sur la page, arrive quand même à fetch les data
        try {
          const data = await getMyActivities();
          setActivities(data.data.getAllMyActivities);
        } catch (error) {
          console.log(
            "🚀 ~ file: MyActivitiesScreen.tsx:21 ~ fetchActivities ~ error",
            error
          );
          setActivities([]);
        }
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
