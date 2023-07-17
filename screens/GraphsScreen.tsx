import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { IChartDataState } from '../interfaces/IChartDataState'
import { StyleSheet, Text, View } from 'react-native'
import { GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastWeekActivitiesGraphData'
import { GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastMonthActivitiesGraphData'
import { GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastYearActivitiesGraphData'
import { GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getTotalSumsActivitiesGraphData'
import { TouchableOpacity } from 'react-native-gesture-handler'
import { Avatar, Banner } from '@react-native-material/core'
import { Feather } from '@expo/vector-icons'

const GraphsScreen = () => {
  type barChartTimeUnitType = 'week' | 'month' | 'year'

  const [getWeekBarChartData] = useLazyQuery(
    GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const [getMonthBarChartData] = useLazyQuery(
    GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const [getYearBarChartData] = useLazyQuery(
    GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA,
    {
      fetchPolicy: 'no-cache',
    }
  )

  const {
    data: sumData,
    loading: sumLoading,
    error: sumError,
  } = useQuery(GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA)

  const [barChartTimeUnit, setBarChartTimeUnit] =
    useState<barChartTimeUnitType>('week')

  const [barChartData, setBarChartData] = useState<IChartDataState>({
    data: undefined,
    loading: true,
    error: undefined,
  })

  const handleButtonClick = (value: barChartTimeUnitType) => {
    setBarChartTimeUnit(value)
  }

  useEffect(() => {
    ;(async () => {
      if (barChartTimeUnit === 'month') {
        const res = await getMonthBarChartData()

        setBarChartData({
          data: res.data.getMyLastMonthActivities,
          loading: res.loading,
          error: res.error,
        })
      } else if (barChartTimeUnit === 'year') {
        const res = await getYearBarChartData()

        setBarChartData({
          data: res.data.getMyLastYearActivities,
          loading: res.loading,
          error: res.error,
        })
      } else {
        const res = await getWeekBarChartData()

        setBarChartData({
          data: res.data.getMyLastWeekActivities,
          loading: res.loading,
          error: res.error,
        })
      }
    })()
  }, [
    barChartTimeUnit,
    getMonthBarChartData,
    getWeekBarChartData,
    getYearBarChartData,
  ])

  if (sumLoading) {
    return <Text>Is loading...</Text>
  }

  if (sumError) {
    return <Text>Une erreur est survenue</Text>
  }

  return (
    <View>
      <Banner
        illustration={(props) => (
          <Avatar
            color="#17b2aa"
            icon={(props) => <Feather name="info" size={24} color="white" />}
            {...props}
          />
        )}
        text="Nous vous conseillons d'utiliser notre application web pour mieux visualiser vos statistiques !"
        buttons={null}
        style={{ marginBottom: 20 }}
      />
      <Text style={styles.title}>Sur la dernière période :</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'week' && { backgroundColor: '#17b2aa' },
          ]}
          onPress={() => handleButtonClick('week')}
        >
          <Text style={styles.buttonText}>Semaine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'month' && { backgroundColor: '#17b2aa' },
          ]}
          onPress={() => handleButtonClick('month')}
        >
          <Text style={styles.buttonText}>Mois</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'year' && { backgroundColor: '#17b2aa' },
          ]}
          onPress={() => handleButtonClick('year')}
        >
          <Text style={styles.buttonText}>Année</Text>
        </TouchableOpacity>
      </View>
      <View>
        {barChartData.data && (
          <Text style={styles.covalue}>
            {barChartData.data.datasets.reduce(
              (total, dataset) =>
                total + dataset.data.reduce((sum, value) => sum + value, 0),
              0
            )}{' '}
            kg de CO2
          </Text>
        )}

        <Text style={styles.title}>Votre total depuis toujours :</Text>
        <Text style={styles.covalue}>
          {parseFloat(
            sumData?.getMyTotalCarbonPerActivityType.datasets[0].data
              .reduce((acc: number, curr: number) => acc + curr, 0)
              .toFixed(2)
          )}{' '}
          kg de CO2
        </Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#bbb',
    padding: 10,
    flexGrow: 1,
    marginLeft: 5,
    marginRight: 5,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  covalue: {
    fontSize: 30,
    textAlign: 'center',
    marginBottom: 60,
  },
})

export default GraphsScreen
