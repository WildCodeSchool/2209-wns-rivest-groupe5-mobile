import React, { useState } from 'react'
import { Text, StyleSheet, Modal, View } from 'react-native'
import { Button } from '@react-native-material/core'
import { IActivity } from '../../interfaces/IActivity'
import { ScrollView } from 'react-native-gesture-handler'
import { format } from 'date-fns'
import EditActivityScreen from './EditActivityScreen'
import { useQuery } from '@apollo/client'
import GET_ACTIVITY from '../../graphql/queries/activities/getActivity'

const ActivityDetailsScreen = ({ route, navigation }: any) => {
  const { activity }: { activity: IActivity } = route.params
  const [isEditing, setIsEditing] = useState(false)
  const [activityData, setActivityData] = useState(activity)

  const { fetchMore } = useQuery(GET_ACTIVITY, {
    variables: { activityId: activity.activityId },
    onCompleted: (data) => {
      setActivityData(data.getActivityById)
    },
    fetchPolicy: 'no-cache',
  })

  const handleEditPress = () => {
    setIsEditing(true)
  }

  const handleModalClose = () => {
    setIsEditing(false)
  }

  const handleUpdateActivityAfterFieldsUpdate = async () => {
    const result = await fetchMore({
      variables: { activityId: activity.activityId },
    })
    setActivityData(result.data.getActivityById)
  }

  return (
    <ScrollView style={styles.container}>
      <Button
        title="Editer"
        color="#17b2aa"
        tintColor="#FFFFFF"
        style={styles.button}
        onPress={handleEditPress}
      />
      <Text style={styles.title}>{activityData.title}</Text>
      <Text style={styles.type}>{activityData.activityType.label}</Text>
      <Text style={styles.date}>
        Activité effectuée le{' '}
        {format(new Date(activityData.activityDate), 'dd/MM/yyyy')}
      </Text>
      <Text style={styles.carbon}>
        {parseFloat((activityData.carbonQuantity / 1000).toFixed(2))} kg de CO2
      </Text>
      <Text style={styles.description}>{activityData.description}</Text>

      <Modal
        visible={isEditing}
        animationType="slide"
        onRequestClose={handleModalClose}
      >
        <EditActivityScreen
          onClose={handleModalClose}
          activity={activityData}
          afterUpdate={handleUpdateActivityAfterFieldsUpdate}
        />
      </Modal>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 20,
  },
  type: {
    fontStyle: 'italic',
    color: '#888',
    textAlign: 'center',
  },
  date: { textAlign: 'center' },
  carbon: { textAlign: 'center', marginBottom: 30 },
  description: {
    marginBottom: 50,
    lineHeight: 22,
  },
  button: {
    backgroundColor: '#17b2aa',
    borderRadius: 5,
    height: 50,
    marginTop: 30,
    marginLeft: 100,
    marginRight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
})

export default ActivityDetailsScreen
