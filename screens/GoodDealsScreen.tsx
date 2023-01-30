import {
  Text,
  SafeAreaView,
  ScrollView,
  View,
  ImageBackground,
  StyleSheet,
} from 'react-native';

import {GoodDealCardFeed} from '../components/GoodDealCardFeed';
import {GoodDealCardFeedPrimary} from '../components/GoodDealCardFeedPrimary';
import {gql, useQuery} from '@apollo/client';
import {GoodDealInterface} from '../interfaces/goodDeal';

const GET_ALL_GOOD_DEALS = gql`
  query getAllGoodDeals {
    getAllGoodDeals {
      goodDealId
      goodDealTitle
      goodDealLink
      goodDealContent
      image
      createdAt
      user {
        email
        firstname
        lastname
      }
    }
  }
`;

export const GoodDealsScreen = () => {
    const { loading, error, data } = useQuery(GET_ALL_GOOD_DEALS);
  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }
  
  if (data) {
    console.log(data.getAllGoodDeals);

    return (
      <SafeAreaView>
        <ScrollView>
          <GoodDealCardFeedPrimary />

          {data.getAllGoodDeals.map((goodDeal: GoodDealInterface) => (
          <GoodDealCardFeed key={goodDeal.goodDealId} goodDeal={goodDeal} />
        ))}
        </ScrollView>
      </SafeAreaView>
    );
  }

  
};
