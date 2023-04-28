import { Text, StyleSheet } from 'react-native'

import React from 'react'
import { IActivity } from '../../interfaces/IActivity'
import { ScrollView } from 'react-native-gesture-handler'
import { format } from 'date-fns'

const ActivityDetailsScreen = ({ route, navigation }: any) => {
  const { activity }: { activity: IActivity } = route.params
  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{activity.title}</Text>
      <Text style={styles.type}>{activity.activityType.label}</Text>
      <Text style={styles.date}>
        Activité effectuée le{' '}
        {format(new Date(activity.activityDate), 'dd/MM/yyyy')}
      </Text>
      <Text style={styles.carbon}>
        {parseFloat((activity.carbonQuantity / 1000).toFixed(2))} kg de CO2
      </Text>
      <Text style={styles.description}>{activity.description}</Text>
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
    marginBottom: 10,
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
})

export default ActivityDetailsScreen
