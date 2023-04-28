import { Text, SafeAreaView, FlatList, View, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLazyQuery } from '@apollo/client'
import { GoodDealCardFeed } from '../../../components/GoodDealCardFeed'
import { GoodDealCardFeedPrimary } from '../../../components/GoodDealCardFeedPrimary'
import { GET_ALL_MY_GOOD_DEALS } from '../../../graphql/queries/goodDeals/getMyGoodDeals'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { IGoodDeal } from '../../../interfaces/IGoodDeal'
import { Button } from '@react-native-material/core'

const MyGoodDealsScreen = ({ navigation }: any) => {
  const [getMyGoodDeals, { loading, error }] = useLazyQuery(
    GET_ALL_MY_GOOD_DEALS,
    { fetchPolicy: 'no-cache' }
  )

  const [goodDeals, setGoodDeals] = useState<IGoodDeal[]>([])
  const isFocused = useIsFocused()

  useFocusEffect(
    useCallback(() => {
      async function fetchGoodDeals() {
        try {
          const data = await getMyGoodDeals()

          const dataGoodDeals = [...data.data.getAllMyGoodDeals]
          const orderData = dataGoodDeals.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )

          setGoodDeals(orderData)
        } catch (error) {
          console.log(
            '🚀 ~ file: MyGoodDealsScreen fetchGoodDeals~ error',
            error
          )
          setGoodDeals([])
        }
      }
      fetchGoodDeals()
    }, [isFocused])
  )

  if (loading) {
    return <Text>Loading</Text>
  }

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoodDealCardFeedPrimary />
      {goodDeals && goodDeals.length === 0 ? (
        <View style={styles.container}>
          <Text style={styles.centerTitle}>Aucun bon plan enregistré</Text>
          <Button
            title="Ajouter un bon plan"
            color="#17b2aa"
            tintColor="#fff"
            onPress={() => {
              navigation.navigate('Créer un bon plan')
            }}
          />
        </View>
      ) : (
        <FlatList
          data={goodDeals}
          renderItem={({ item }) => (
            <GoodDealCardFeed
              key={item.goodDealId}
              goodDeal={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.goodDealId.toString()}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default MyGoodDealsScreen
