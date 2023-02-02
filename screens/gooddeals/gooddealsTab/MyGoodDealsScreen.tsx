import {View, Text, SafeAreaView, FlatList} from 'react-native';
import React from 'react';
import { gql, useQuery } from '@apollo/client';
import { GoodDealCardFeed } from '../../../components/GoodDealCardFeed';
import { GoodDealCardFeedPrimary } from '../../../components/GoodDealCardFeedPrimary';

const GET_ALL_MY_GOOD_DEALS = gql`
  query getAllMyGoodDeals {
    getAllMyGoodDeals {
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
        avatar
        userId
      }
    }
  }
`;

const MyGoodDealsScreen = ({navigation} : any) => {

  const {loading, error, data} = useQuery(GET_ALL_MY_GOOD_DEALS);

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={{flex: 1}}>
      <GoodDealCardFeedPrimary />
      <FlatList
        data={data.getAllMyGoodDeals}
        renderItem={({item}) => (
          <GoodDealCardFeed
            key={item.goodDealId}
            goodDeal={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.goodDealId}
      />
    </SafeAreaView>
  );
};

export default MyGoodDealsScreen;
