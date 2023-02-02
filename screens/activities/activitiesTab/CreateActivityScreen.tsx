import React, { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
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
import { format } from "date-fns";

const CreateActivityScreen = ({ navigation }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [activityTypeId, setActivityTypeId] = useState(1);
  const [carbonQuantityUnit, setCarbonQuantityUnit] = useState("gramme");
  const [carbonQuantity, setCarbonQuantity] = useState("");
  const [datePicker, setDatePicker] = useState(false);
  const [activityDate, setActivityDate] = useState(new Date());

  const {
    data: dataActivityTypes,
    loading: loadingActivityTypes,
    error: errorActivityTypes,
  } = useQuery(GET_ACTIVITY_TYPES);

  const [
    createActivity,
    { loading: loadingCreateActivity, error: errorCreateActivity },
  ] = useMutation(CREATE_ACTIVITY);

  if (loadingActivityTypes) return <Text>"Loading..."</Text>;
  if (errorActivityTypes)
    return <Text>` Error! ${errorActivityTypes.message}`</Text>;

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
        navigation.navigate("Mes Activités");
      },
      onError(error) {
        console.log("error", error);

        alert("Activity creation failed");
      },
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 40,
              marginBottom: 20,
            }}
          >
            Enregistrer une activité carbone
          </Text>

          <Stack spacing={20} style={{ marginLeft: 25, marginRight: 25 }}>
            <TextInput
              placeholder="Titre de l'activité"
              value={title}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              placeholder="Description de l'activité"
              value={description}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setDescription(text)}
            />
            <View
              style={{
                backgroundColor: "#fff",
                borderColor: "grey",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Text style={{ paddingLeft: 8, paddingTop: 5, color: "grey" }}>
                Catégorie
              </Text>
              <Picker
                selectedValue={activityTypeId}
                style={{ margin: 0 }}
                onValueChange={(itemValue) => setActivityTypeId(itemValue)}
                mode="dropdown"
              >
                {dataActivityTypes &&
                  dataActivityTypes.getAllActivityTypes.map(
                    (activityType: any) => (
                      <Picker.Item
                        key={activityType.activityTypeId}
                        label={activityType.name}
                        value={activityType.activityTypeId}
                      />
                    )
                  )}
              </Picker>
            </View>
            <View
              style={{
                backgroundColor: "#fff",
                borderColor: "grey",
                borderStyle: "solid",
                borderWidth: 1,
              }}
            >
              <Text style={{ paddingLeft: 8, paddingTop: 5, color: "grey" }}>
                Unité de mesure
              </Text>
              <Picker
                selectedValue={carbonQuantityUnit}
                style={{ margin: 0 }}
                onValueChange={(itemValue) => setCarbonQuantityUnit(itemValue)}
                mode="dropdown"
              >
                <Picker.Item label="gramme" value="gramme" />
                <Picker.Item label="kilogramme" value="kilogramme" />
              </Picker>
            </View>
            <TextInput
              placeholder="Quantité de carbone"
              value={carbonQuantity}
              variant="outlined"
              keyboardType={"numeric"}
              onChangeText={(text) => setCarbonQuantity(text)}
            />

            <TextInput
              label="Date de l'activité"
              variant="outlined"
              value={format(new Date(activityDate), "dd/MM/yyyy")}
              editable={false}
              trailing={(props) => (
                <IconButton
                  icon={(props) => (
                    <Icon name="calendar" {...props} onPress={showDatePicker} />
                  )}
                />
              )}
            />

            {datePicker && (
              <DateTimePicker
                value={activityDate}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateSelected}
              />
            )}

            {datePicker && (
              <DateTimePicker
                value={activityDate}
                mode={"date"}
                display={Platform.OS === "ios" ? "spinner" : "default"}
                onChange={onDateSelected}
              />
            )}
          </Stack>

          <Button
            title="Enregistrer"
            color="#003c49"
            tintColor="#fff"
            style={{ margin: 25, padding: 10 }}
            loading={loadingCreateActivity}
            loadingIndicatorPosition="overlay"
            onPress={() => {
              if (carbonQuantity === "0" || carbonQuantity.includes(",")) {
                alert(
                  "Quantity has to be greater than 0 and for decimals use '.'"
                );
              } else if (
                title.trim() === "" ||
                description.trim() === "" ||
                carbonQuantity.toString().trim() === ""
              ) {
                alert("Complete all fields, please");
              } else {
                let carbonToSend =
                  carbonQuantityUnit === "kilogramme"
                    ? Number(carbonQuantity) * 1000
                    : carbonQuantity;

                handleSubmit(
                  title,
                  description,
                  activityTypeId,
                  activityDate,
                  Number(carbonToSend)
                );
              }
            }}
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
