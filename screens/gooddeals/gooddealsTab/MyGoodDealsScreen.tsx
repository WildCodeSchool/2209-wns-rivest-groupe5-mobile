import { Text, SafeAreaView, FlatList, View, StyleSheet } from 'react-native'
import React, { useCallback, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { GoodDealCardFeed } from '../../../components/GoodDealCardFeed'
import { GoodDealCardFeedPrimary } from '../../../components/GoodDealCardFeedPrimary'
import { GET_ALL_MY_GOOD_DEALS } from '../../../graphql/queries/goodDeals/getMyGoodDeals'
import { useFocusEffect, useIsFocused } from '@react-navigation/native'
import { IGoodDeal } from '../../../interfaces/IGoodDeal'
import { Button } from '@react-native-material/core'
import { initialPaginatedResultState } from '../../../helpers/initialPaginatedResultState'
import { IPaginatedResult } from '../../../interfaces/IPaginatedResult'
import ScrollListBottomLoader from '../../../components/ScrollListBottomLoader'

const MyGoodDealsScreen = ({ navigation }: any) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, error, fetchMore } = useQuery(GET_ALL_MY_GOOD_DEALS, {
    fetchPolicy: 'no-cache',
    variables: {
      page: currentPage,
    },
    onCompleted: (data) => {
      const dataGoodDeals = data.getAllMyGoodDeals

      setGoodDeals((prevGoodDeals) => ({
        ...dataGoodDeals,
        data: [...prevGoodDeals.data, ...dataGoodDeals.data],
      }))
    },
  })

  const [goodDeals, setGoodDeals] = useState<IPaginatedResult<IGoodDeal>>(
    initialPaginatedResultState
  )

  const fetchMoreGoodDeals = useCallback(async () => {
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
      setGoodDeals(initialPaginatedResultState)
    }
  }, [fetchMore, currentPage])

  const handleLoadMore = useCallback(() => {
    if (!loading && currentPage < goodDeals.totalPages) {
      fetchMoreGoodDeals()
    }
  }, [currentPage, loading, goodDeals.totalPages, fetchMoreGoodDeals])

  if (error) {
    return <Text>{error.message}</Text>
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoodDealCardFeedPrimary />
      {goodDeals && goodDeals.data.length === 0 ? (
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
          data={goodDeals.data}
          renderItem={({ item }: { item: IGoodDeal }) => (
            <GoodDealCardFeed
              key={item.goodDealId}
              goodDeal={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.goodDealId.toString()}
          ListFooterComponent={
            <ScrollListBottomLoader
              currentPage={currentPage}
              totalPages={goodDeals.totalPages}
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
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
})

export default MyGoodDealsScreen
