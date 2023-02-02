import { View, Text, StyleSheet, Pressable } from "react-native";
import React, { useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_MY_ACTIVITIES } from "../../../graphql/queries/activities/getMyActivitiesQuery";
import { IActivity } from "../../../interfaces/IActivity";
import { useFocusEffect } from "@react-navigation/native";
import { useIsFocused } from "@react-navigation/native";
import { format } from "date-fns";

import { ScrollView } from "react-native-gesture-handler";
import { Button } from "@react-native-material/core";

const MyActivitiesScreen = ({ navigation }) => {
  const [getMyActivities, { loading, error }] = useLazyQuery(
    GET_MY_ACTIVITIES,
    { fetchPolicy: "no-cache" }
  );
  const [acitivities, setActivities] = useState([]);
  const isFocused = useIsFocused();

  useFocusEffect(
    React.useCallback(() => {
      async function fetchActivities() {
        try {
          const data = await getMyActivities();
          setActivities(data.data.getAllMyActivities.reverse());
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
      <View style={styles.container}>
        <Text style={styles.centerTitle}>Chargement...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.centerTitle}>
          Une erreur est survenue : {error.message}
        </Text>
      </View>
    );
  }

  return (
    <ScrollView>
      {activities && activities.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.centerTitle}>Aucune activité enregistrée</Text>
          <Button
            title="Ajouter une activité"
            color="#17b2aa"
            tintColor="#fff"
            onPress={() => {
              navigation.navigate("Créer Activité");
            }}
          />
        </View>
      ) : (
        activities.map((activity: IActivity) => {
          return (
            <Pressable
              key={activity.activityId}
              style={styles.card}
              onPress={() => {
                navigation.navigate("ActivityDetails", {
                  activity: activity,
                });
              }}
            >
              <Text style={styles.title}>{activity.title}</Text>
              <Text style={styles.type}>{activity.activityType.name}</Text>
              <View style={styles.bottom}>
                <Text style={styles.carbon}>
                  {parseFloat((activity.carbonQuantity / 1000).toFixed(2))} kg
                  de CO2
                </Text>
                <Text style={styles.date}>
                  {format(new Date(activity.activityDate), "dd/MM/yyyy")}
                </Text>
              </View>
            </Pressable>
          );
        })
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  centerTitle: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  card: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: "white",
    margin: 5,
    shadowColor: "rgba(50,50,50,0.6)",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  type: {
    fontStyle: "italic",
    color: "#888",
    marginBottom: 15,
  },
  bottom: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#eee",
  },
  carbon: { fontSize: 12 },
  date: { fontSize: 12 },
});

export default MyActivitiesScreen;
