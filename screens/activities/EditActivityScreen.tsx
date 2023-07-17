import React, { useState, useRef } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import {
  Stack,
  Button,
  TextInput,
  IconButton,
} from '@react-native-material/core'
import { SafeAreaView, Text, View, StyleSheet, Platform } from 'react-native'
import { Picker } from '@react-native-picker/picker'
import { ScrollView } from 'react-native-gesture-handler'
import DateTimePicker from '@react-native-community/datetimepicker'
import Icon from '@expo/vector-icons/MaterialCommunityIcons'
import { format } from 'date-fns'
import { IActivity } from '../../interfaces/IActivity'
import { GET_ACTIVITY_TYPES } from '../../graphql/queries/activities/getActivityTypesQuery'
import UPDATE_ACTIVITY from '../../graphql/queries/activities/updateActivity'

const EditActivityScreen = ({
  onClose,
  afterUpdate,
  activity,
}: {
  onClose: () => void
  afterUpdate: () => void
  activity: IActivity
}) => {
  const [title, setTitle] = useState(activity.title)
  const [description, setDescription] = useState(activity.description)
  const [activityTypeId, setActivityTypeId] = useState(
    activity.activityType.activityTypeId
  )
  const [carbonQuantityUnit, setCarbonQuantityUnit] = useState('gramme')
  const [carbonQuantity, setCarbonQuantity] = useState(
    activity.carbonQuantity.toString()
  )
  const [datePicker, setDatePicker] = useState(false)
  const [activityDate, setActivityDate] = useState(
    new Date(activity.activityDate)
  )

  const initialActivityDate = useRef(new Date(activity.activityDate)) // persist date even if rerender

  const {
    data: dataActivityTypes,
    loading: loadingActivityTypes,
    error: errorActivityTypes,
  } = useQuery(GET_ACTIVITY_TYPES)

  const [
    updateActivity,
    { loading: loadingUpdateActivity, error: errorUpdateActivity },
  ] = useMutation(UPDATE_ACTIVITY)

  if (loadingActivityTypes) return <Text>Chargement...</Text>
  if (errorActivityTypes)
    return <Text>Erreur: ${errorActivityTypes.message}</Text>

  const showDatePicker = () => {
    setDatePicker(true)
  }

  const onDateSelected = (event, value) => {
    setDatePicker(false)

    if (event.type === 'set') {
      setActivityDate(value || initialActivityDate.current)
    }
  }

  function handleSubmit(
    title: string,
    description: string,
    activityTypeId: number,
    activityDate: Date,
    carbonQuantity: number
  ) {
    updateActivity({
      variables: {
        data: {
          title: title,
          description: description,
          activityTypeId: activityTypeId,
          carbonQuantity: carbonQuantity,
          activityDate: activityDate,
        },
        activityId: activity.activityId,
      },
      onCompleted(data) {
        alert('Activité mise à jour avec succès')
        setTitle('')
        setDescription('')
        setActivityTypeId(1)
        setCarbonQuantity('')
        setActivityDate(new Date())

        afterUpdate() // refresh current activity in details screen

        onClose()
      },
      onError(error) {
        console.log('error', error)

        alert('Erreur lors de la mise à jour')
      },
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 30 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 40,
              marginBottom: 20,
            }}
          >
            Mettre à jour l'activité
          </Text>

          <Stack spacing={20} style={{ marginLeft: 25, marginRight: 25 }}>
            <TextInput
              placeholder="Titre de l'activité"
              label="Titre de l'activité"
              value={title}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setTitle(text)}
            />
            <TextInput
              placeholder="Description de l'activité"
              label="Description de l'activité"
              value={description}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setDescription(text)}
            />
            <View
              style={{
                backgroundColor: '#fff',
                borderColor: 'grey',
                borderStyle: 'solid',
                borderWidth: 1,
              }}
            >
              <Text style={{ paddingLeft: 8, paddingTop: 5, color: 'grey' }}>
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
                        label={activityType.label}
                        value={activityType.activityTypeId}
                      />
                    )
                  )}
              </Picker>
            </View>
            <View
              style={{
                backgroundColor: '#fff',
                borderColor: 'grey',
                borderStyle: 'solid',
                borderWidth: 1,
              }}
            >
              <Text style={{ paddingLeft: 8, paddingTop: 5, color: 'grey' }}>
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
              label="Quantité de carbone"
              value={carbonQuantity.toString()}
              variant="outlined"
              keyboardType={'numeric'}
              onChangeText={(text) => setCarbonQuantity(text)}
            />

            <TextInput
              label="Date de l'activité"
              variant="outlined"
              value={format(new Date(activityDate), 'dd/MM/yyyy')}
              editable={true}
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
                mode={'date'}
                display={Platform.OS === 'ios' ? 'spinner' : 'default'}
                onChange={onDateSelected}
              />
            )}
          </Stack>

          <Button
            title="Mettre à jour"
            color="#003c49"
            tintColor="#fff"
            style={{ margin: 25, marginBottom: 5, padding: 10 }}
            loading={loadingUpdateActivity}
            loadingIndicatorPosition="overlay"
            onPress={() => {
              if (carbonQuantity === '0' || carbonQuantity.includes(',')) {
                alert(
                  "La quantité doit être supérieure à 0. Pour les nombres décimaux, veuillez utiliser '.'"
                )
              } else if (
                title.trim() === '' ||
                !description ||
                description.trim() === '' ||
                carbonQuantity.toString().trim() === ''
              ) {
                alert('Merci de compléter tous les champs')
              } else {
                let carbonToSend =
                  carbonQuantityUnit === 'kilogramme'
                    ? Number(carbonQuantity) * 1000
                    : carbonQuantity

                handleSubmit(
                  title,
                  description,
                  activityTypeId,
                  activityDate,
                  Number(carbonToSend)
                )
              }
            }}
          />
          <Button
            title="Annuler"
            color="#ddd"
            tintColor="#000"
            style={{ margin: 25, marginTop: 0, padding: 10 }}
            onPress={onClose}
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    padding: 10,
    borderRadius: 5,
  },
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: 'center',
    backgroundColor: 'white',
  },

  text: {
    fontSize: 25,
    color: 'red',
    padding: 3,
    marginBottom: 10,
    textAlign: 'center',
  },
})

export default EditActivityScreen
