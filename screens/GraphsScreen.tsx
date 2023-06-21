import { useLazyQuery, useQuery } from '@apollo/client'
import React, { useEffect, useState } from 'react'
import { IChartDataState } from '../interfaces/IChartDataState'
import { StyleSheet, Text, View } from 'react-native'
import { GET_MY_LAST_WEEK_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastWeekActivitiesGraphData'
import { GET_MY_LAST_MONTH_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastMonthActivitiesGraphData'
import { GET_MY_LAST_YEAR_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getMyLastYearActivitiesGraphData'
import { GET_TOTAL_SUMS_ACTIVITIES_GRAPH_DATA } from '../graphql/queries/carbonGraphs/getTotalSumsActivitiesGraphData'
import { TouchableOpacity } from 'react-native-gesture-handler'

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
      <Text style={styles.paragraph}>
        Pour bénéficier de données détaillées, nous vous conseillons d'utiliser
        notre version web de l'application.
      </Text>
      <Text style={styles.title}>Sur la dernière période :</Text>
      <View style={styles.container}>
        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'week' && { backgroundColor: '#2ECE65' },
          ]}
          onPress={() => handleButtonClick('week')}
        >
          <Text style={styles.buttonText}>Semaine</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'month' && { backgroundColor: '#2ECE65' },
          ]}
          onPress={() => handleButtonClick('month')}
        >
          <Text style={styles.buttonText}>Mois</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.button,
            barChartTimeUnit === 'year' && { backgroundColor: '#2ECE65' },
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
  paragraph: {
    fontSize: 15,
    marginTop: 10,
    marginBottom: 40,
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
