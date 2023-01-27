import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { useQuery } from "@apollo/client";
import { GET_MY_ACTIVITIES } from "../../../graphql/queries/activities/getMyActivitiesQuery";

const MyActivitiesScreen = () => {
  const { error, loading, data } = useQuery(GET_MY_ACTIVITIES);

  return (
    <View>
      <Text>MyActivitiesScreen</Text>
    </View>
  );
};

export default MyActivitiesScreen;
