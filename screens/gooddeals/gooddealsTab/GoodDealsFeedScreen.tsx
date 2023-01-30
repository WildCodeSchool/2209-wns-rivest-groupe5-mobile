import {Text, SafeAreaView, ScrollView, FlatList} from 'react-native';

import {GoodDealCardFeed} from '../../../components/GoodDealCardFeed';
import {GoodDealCardFeedPrimary} from '../../../components/GoodDealCardFeedPrimary';
import {gql, useQuery} from '@apollo/client';
import {IGoodDeal} from '../../../interfaces/IGoodDeal';

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

const GoodDealsFeedScreen = ({navigation}: any) => {
  const {loading, error, data} = useQuery(GET_ALL_GOOD_DEALS);
  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (data) {
    return (
      <SafeAreaView>
        {/* <GoodDealCardFeedPrimary />

        <FlatList
          data={data.getAllGoodDeals}
          renderItem={({item}) => (
            <GoodDealCardFeed
              key={item.goodDealId}
              goodDeal={item}
              navigation={navigation}
            />
          )}
          keyExtractor={(item) => item.id}
        /> */}

          <ScrollView>
            <GoodDealCardFeedPrimary />

            {data.getAllGoodDeals.map((goodDeal: IGoodDeal) => (
              <GoodDealCardFeed
                key={goodDeal.goodDealId}
                goodDeal={goodDeal}
                navigation={navigation}
              />
            ))}
          </ScrollView>
      </SafeAreaView>
    );
  }

  return <Text>Erreur</Text>;
};

export default GoodDealsFeedScreen;
