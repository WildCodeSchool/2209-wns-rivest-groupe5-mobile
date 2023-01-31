import { Text, SafeAreaView, ScrollView, FlatList, View } from "react-native";

import { GoodDealCardFeed } from "../../../components/GoodDealCardFeed";
import { GoodDealCardFeedPrimary } from "../../../components/GoodDealCardFeedPrimary";
import { gql, useQuery } from "@apollo/client";
import { IGoodDeal } from "../../../interfaces/IGoodDeal";

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
        userId
        email
        firstname
        lastname
        avatar
      }
    }
  }
`;

const GoodDealsFeedScreen = ({ navigation }: any) => {
  const { loading, error, data } = useQuery(GET_ALL_GOOD_DEALS);
  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  if (data) {
    return (
      <SafeAreaView style={{flex:1}}>
          <GoodDealCardFeedPrimary />
        <FlatList
            data={data.getAllGoodDeals}
            renderItem={({ item }) => (
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
  }

  return <Text>Erreur</Text>;
};




export default GoodDealsFeedScreen;
