import { Text, SafeAreaView, FlatList } from 'react-native'
import { GoodDealCardFeed } from '../../../components/GoodDealCardFeed'
import { GoodDealCardFeedPrimary } from '../../../components/GoodDealCardFeedPrimary'
import { useQuery } from '@apollo/client'
import { IGoodDeal } from '../../../interfaces/IGoodDeal'
import { useCallback, useState } from 'react'
import { GET_ALL_GOOD_DEALS } from '../../../graphql/queries/goodDeals/getAllGoodDeals'
import { IPaginatedResult } from '../../../interfaces/IPaginatedResult'
import { initialPaginatedResultState } from '../../../helpers/initialPaginatedResultState'
import ScrollListBottomLoader from '../../../components/ScrollListBottomLoader'

const GoodDealsFeedScreen = ({ navigation }: any) => {
  const [currentPage, setCurrentPage] = useState(1)

  const { loading, error, fetchMore } = useQuery(GET_ALL_GOOD_DEALS, {
    fetchPolicy: 'no-cache',
    variables: {
      page: currentPage,
    },
    onCompleted: (data) => {
      const dataGoodDeals = data.getAllGoodDeals

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
    </SafeAreaView>
  )
}

export default GoodDealsFeedScreen
