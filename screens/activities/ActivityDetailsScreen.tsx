import {View, Text, StyleSheet} from 'react-native';
import React from "react";
import { IActivity } from "../../interfaces/IActivity";
import { formatDateToDDMMYY } from "../../helpers/formatter";
import { ScrollView } from "react-native-gesture-handler";
import { SafeAreaView } from "react-native-safe-area-context";

const ActivityDetailsScreen = ({ route, navigation } : any) => {
  const { activity }: { activity: IActivity } = route.params;
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.type}>{activity.activityType.name}</Text>
      <Text style={styles.date}>
        Activité effectuée le {formatDateToDDMMYY(activity.activityDate)}
      </Text>
      <Text style={styles.carbon}>{activity.carbonQuantity} kg de CO2</Text>
      <Text style={styles.description}>{activity.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },
  type: {
    fontStyle: "italic",
    color: "#888",
    textAlign: "center",
  },
  date: { textAlign: "center" },
  carbon: { textAlign: "center", marginBottom: 30 },
  description: {
    marginBottom: 50,
    lineHeight: 22,
  },
});

export default ActivityDetailsScreen;
