import { View, Text, StyleSheet, Pressable, FlatList } from 'react-native'
import React, { useState, useCallback } from 'react'
import { useQuery } from '@apollo/client'
import { GET_MY_ACTIVITIES } from '../../../graphql/queries/activities/getMyActivitiesQuery'
import { IActivity } from '../../../interfaces/IActivity'
import { format } from 'date-fns'
import { Button } from '@react-native-material/core'
import { IPaginatedResult } from '../../../interfaces/IPaginatedResult'
import { initialPaginatedResultState } from '../../../helpers/initialPaginatedResultState'
import { SafeAreaView } from 'react-native-safe-area-context'
import ScrollListBottomLoader from '../../../components/ScrollListBottomLoader'
import { useFocusEffect } from '@react-navigation/native'

const MyActivitiesScreen = ({ navigation }: { navigation: any }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const [activities, setActivities] = useState<IPaginatedResult<IActivity>>(
    initialPaginatedResultState
  )

  const { loading, error, fetchMore, refetch } = useQuery(GET_MY_ACTIVITIES, {
    fetchPolicy: 'no-cache',
    variables: {
      page: currentPage,
    },
    onCompleted: (data) => {
      const dataActivities = data.getAllMyActivities

      setActivities((prevActivities) => ({
        ...dataActivities,
        data: [...prevActivities.data, ...dataActivities.data],
      }))
    },
  })

  const fetchMoreActivities = useCallback(async () => {
    try {
      const newPage = currentPage + 1
      await fetchMore({
        variables: {
          page: newPage, // Request the next page
        },
      })

      setCurrentPage(newPage)
    } catch (error) {
      console.log(
        '🚀 ~ file: GoodDealsFeedScreen fetchMoreGoodDeals ~ error',
        error
      )
      setActivities(initialPaginatedResultState)
    }
  }, [])

  const handleLoadMore = useCallback(() => {
    if (!loading && currentPage < activities.totalPages) {
      fetchMoreActivities()
    }
  }, [currentPage, loading, activities.totalPages, fetchMoreActivities])

  // when the screen is focused, refetch the data to be sure to have actualised data
  useFocusEffect(
    useCallback(() => {
      setActivities(initialPaginatedResultState)
      const refetchData = async () => {
        const res = await refetch()
        setActivities(res.data.getAllMyActivities)
      }

      refetchData()
    }, [refetch])
  )

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.centerTitle}>
          Une erreur est survenue : {error.message}
        </Text>
      </View>
    )
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styles.centerTitle}>
        {activities.total} activités enregistrées
      </Text>
      {activities.data.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.centerTitle}>Aucune activité enregistrée</Text>
          <Button
            title="Ajouter une activité"
            color="#17b2aa"
            tintColor="#fff"
            onPress={() => {
              navigation.navigate('Créer Activité')
            }}
          />
        </View>
      ) : (
        <FlatList
          data={activities.data}
          renderItem={({ item }: { item: IActivity }) => (
            <Pressable
              key={item.activityId}
              style={styles.card}
              onPress={() => {
                navigation.navigate('Détails Activité', {
                  activity: item,
                })
              }}
            >
              <Text style={styles.title}>{item.title}</Text>
              <Text style={styles.type}>{item.activityType.label}</Text>
              <View style={styles.bottom}>
                <Text style={styles.carbon}>
                  {parseFloat((item.carbonQuantity / 1000).toFixed(2))} kg de
                  CO2
                </Text>
                <Text style={styles.date}>
                  {format(new Date(item.activityDate), 'dd/MM/yyyy')}
                </Text>
              </View>
            </Pressable>
          )}
          keyExtractor={(item) => item.activityId.toString()}
          ListFooterComponent={
            <ScrollListBottomLoader
              currentPage={currentPage}
              totalPages={activities.totalPages}
            />
          }
          onEndReached={handleLoadMore}
          onEndReachedThreshold={0.1}
        />
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    marginHorizontal: 30,
  },
  centerTitle: {
    textAlign: 'center',
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  card: {
    borderRadius: 5,
    padding: 15,
    backgroundColor: 'white',
    margin: 5,
    shadowColor: 'rgba(50,50,50,0.6)',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 5,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  type: {
    fontStyle: 'italic',
    color: '#888',
    marginBottom: 15,
  },
  bottom: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  carbon: { fontSize: 12 },
  date: { fontSize: 12 },
})

export default MyActivitiesScreen
