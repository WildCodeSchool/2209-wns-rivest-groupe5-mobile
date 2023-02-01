import React, { useState } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import {
  Stack,
  Button,
  TextInput,
  IconButton,
} from "@react-native-material/core";
import { SafeAreaView, Text, View, StyleSheet, Platform } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { ScrollView } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import Icon from "@expo/vector-icons/MaterialCommunityIcons";
import { GET_ACTIVITY_TYPES } from "../../../graphql/queries/activities/getActivityTypesQuery";
import { CREATE_ACTIVITY } from "../../../graphql/queries/activities/createActivityMutation";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";

const CreateActivityScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [carbonQuantity, setCarbonQuantity] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [activityDate, setActivityDate] = useState(new Date());
  const [activityTypeId, setActivityTypeId] = useState(1);

  //Fetch activity list types
  const {
    data: dataActivityTypes,
    loading: loadingActivityTypes,
    error: errorActivityTypes,
  } = useQuery(GET_ACTIVITY_TYPES);
  console.log("------ liste type activities", dataActivityTypes);

  //Create "activité" / "dépense carbone"

  const [
    createActivity,
    { loading: loadingCreateActivity, error: errorCreateActivity },
  ] = useMutation(CREATE_ACTIVITY);

  if (loadingActivityTypes) return <Text>"Loading activity types..."</Text>;
  if (errorActivityTypes)
    return <Text>` Error! ${errorActivityTypes.message}`</Text>;

  const showDatePicker = () => {
    setDatePicker(!datePicker);
  };

  const onDateSelected = (event, value) => {
    setActivityDate(value);
    setDatePicker(false);
    console.log(">>>Selected date>>>>", value);
    console.log(">>>Selected date type of >>>>", typeof value);
  };


  function handleSubmit(
    title: string,
    description: string,
    activityTypeId: number,
    activityDate: Date,
    carbonQuantity: number
  ) {
    createActivity({
      variables: {
        data: {
          title: title,
          description: description,
          activityTypeId: activityTypeId,
          carbonQuantity: carbonQuantity,
          activityDate: activityDate,
        },
      },
      onCompleted(data) {
        alert("Activity created with success");
        setTitle("");
        setDescription("");
        setActivityTypeId(1);
        setCarbonQuantity("");
        setActivityDate(new Date());
        navigation.navigate("ActivitiesTab");
      },
      onError(error) {
        console.log('*****Activity creation failed*****', error.message)
        alert("Activity creation failed");
      },
    });
  }


  return (
    <SafeAreaView style={{ flex: 1 }}>
      {/* <ScrollView style={{ paddingTop: 50, backgroundColor: "blue" }}> */}
      <ScrollView style={{ paddingTop: 50 }}>
        {/* <Text
          style={{
            fontWeight: "bold",
            textAlign: "center",
            fontSize: 40,
            marginBottom: 10,
          }}
        >
          Enregistrer une activité carbone
        </Text> */}

        <Stack
          spacing={20}
          style={{
            marginLeft: 25,
            marginRight: 25,
            backgroundColor: "red",
            flex: 1,
          }}
        >
          <Text>
            {title} of type {typeof title}
          </Text>
          <Text>
            {description} of type {typeof description}
          </Text>
          <Text>
            {carbonQuantity} of type {typeof carbonQuantity}
          </Text>
          <Text>
            {activityDate.toLocaleString()} of type {typeof activityDate}
          </Text>
          activityTypeId
          <Text>
            {activityTypeId} of type {typeof activityTypeId}
          </Text>
          <TextInput
            label="Titre"
            value={title}
            autoCapitalize="none"
            variant="outlined"
            color="grey"
            onChangeText={(text) => setTitle(text)}
          />
          <TextInput
            label="Description"
            value={description}
            autoCapitalize="none"
            variant="outlined"
            color="grey"
            onChangeText={(text) => setDescription(text)}
          />
          <TextInput
            label="Quantité de carbone"
            value={carbonQuantity}
            variant="outlined"
            keyboardType={"numeric"}
            onChangeText={(text) => setCarbonQuantity(text)}
          />
          <TextInput
            label="Date"
            variant="outlined"
            value={activityDate.toLocaleDateString("fr")}
            onFocus={showDatePicker}
            trailing={(props) => (
              <IconButton
                icon={(props) => (
                  <Icon name="calendar" {...props} onPress={showDatePicker} />
                )}
              />
            )}
          />
          {/* {activityDate && <Text>{activityDate.toLocaleString()}</Text>} */}
          {/* {false && ( */}
          {datePicker && (
            <DateTimePicker
              value={activityDate}
              mode={"date"}
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateSelected}
            />
          )}
          {/* <Picker
            selectedValue={activityTypeId}
            style={{ flex: 1, flexDirection:"row", height: 100}}
            onValueChange={(itemValue) => setActivityTypeId(itemValue)}
          >
            {dataActivityTypes &&
              dataActivityTypes.getAllActivityTypes.map((activityType: any) => (
                <Picker.Item
                  key={activityType.activityTypeId}
                  label={activityType.name}
                  value={activityType.activityTypeId}
                />
              ))}
          </Picker> */}
          {dataActivityTypes &&
            dataActivityTypes.getAllActivityTypes.map((activityType: any) => (
              <Button
                key={activityType.activityTypeId}
                title={activityType.name}
                onPress={() => setActivityTypeId(activityType.activityTypeId)}
              />
            ))}
          <Button
            title="Enregistrer"
            color="#003c49"
            tintColor="#fff"
            style={{ margin: 25, padding: 10 }}
            loading={loadingCreateActivity}
            loadingIndicatorPosition="overlay"
            onPress={() =>
              handleSubmit(
                title,
                description,
                activityTypeId,
                activityDate,
                Number(carbonQuantity)
              )
              // console.log(">>>>I wanna create >>>>",{
              //   title: title,
              //   description: description,
              //   activityTypeId: activityTypeId,
              //   activityDate: activityDate,
              //   carbonQuantity: Number(carbonQuantity),
              // })
            }
          />
        </Stack>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    height: 50,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    padding: 10,
    borderRadius: 10,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },
});

export default CreateActivityScreen;
