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
  const [activityTypeId, setActivityTypeId] = useState(1);
  const [carbonQuantity, setCarbonQuantity] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [activityDate, setActivityDate] = useState(new Date());
  const [createActivity, { loading: loadingMesage }] =
    useMutation(CREATE_ACTIVITY);
  const {
    data: dataActivityTypes,
    loading: loadingActivityTypes,
    error: errorActivityTypes,
  } = useQuery(GET_ACTIVITY_TYPES);
  console.log("------ liste type activities", dataActivityTypes);

  //{"getAllActivityTypes": [{"__typename": "ActivityType", "activityTypeId": 1, "name": "Transport"}, {"__typename": "ActivityType", "activityTypeId": 2, "name": "Agriculture"}, {"__typename": "ActivityType", "activityTypeId": 3, "name": "Autre"}]}

  // const isFocused = useIsFocused();

  if (loadingActivityTypes) return "Loading activity types...";
  if (errorActivityTypes) return ` Error! ${errorActivityTypes.message}`;

  // useFocusEffect(
  //   React.useCallback(() => {
  //     async function fetchActivityTypes() {
  //       try {
  //         const data = await getActivityTypes();
  //         setActivityTypeId(data.activityTypeId);
  //       } catch (error) {
  //         console.log(
  //           "🚀 ~ file: CreateActivityScreen.tsx ~ fetchActivityTypes ~ error",
  //           error
  //         );
  //         setActivityTypeId(Number);
  //       }
  //     }
  //     fetchActivityTypes();
  //   }, [isFocused])
  // );

  const showDatePicker = () => {
    setDatePicker(true);
  };

  const onDateSelected = (event, value) => {
    setActivityDate(value);
    setDatePicker(false);
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
        navigation.navigate("Activités");
      },
      onError(error) {
        alert("Activity creation failed");
      },
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 40,
              marginBottom: 10,
            }}
          >
            Enregistrer une activité carbone
          </Text>
          <Stack spacing={20} style={{ marginLeft: 25, marginRight: 25 }}>
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

            {/* <TextInput
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
            /> */}

            {datePicker && (
              <DateTimePicker
                value={activityDate}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateSelected}
              />
            )}

            <Picker
              selectedValue={activityTypeId}
              style={{ height: 50, width: 150 }}
              onValueChange={(itemValue, itemIndex) =>
                setActivityTypeId(itemValue)
              }
            >
              {dataActivityTypes &&
                dataActivityTypes.getAllActivityTypes.map(
                  (activityType: any) => (
                    <Picker.Item
                      label={activityType.name}
                      value={activityType.activityTypeId}
                      key={activityType.activityTypeId}
                    />
                  )
                )}

              {/* <Picker.Item label="Transport" value={1} />
              <Picker.Item label="Agriculture" value={2} /> */}
            </Picker>

            {/* <TextInput
              label="Quantité de carbone"
              value={carbonQuantity}
              variant="outlined"
              keyboardType={"numeric"}
              onChangeText={(text) => setCarbonQuantity(text)}
            ></TextInput> */}
          </Stack>

          <Button
            title="Enregistrer"
            color="#003c49"
            tintColor="#fff"
            style={{ margin: 25, padding: 10 }}
            loading={loadingMesage}
            loadingIndicatorPosition="overlay"
            onPress={() =>
              handleSubmit(
                title,
                description,
                activityTypeId,
                activityDate,
                Number(carbonQuantity)
              )
            }
          />
        </View>
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
