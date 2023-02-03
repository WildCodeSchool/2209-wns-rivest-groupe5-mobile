import { Text, SafeAreaView, FlatList } from "react-native";

import { GoodDealCardFeed } from "../../../components/GoodDealCardFeed";
import { GoodDealCardFeedPrimary } from "../../../components/GoodDealCardFeedPrimary";
import { useLazyQuery } from "@apollo/client";
import { IGoodDeal } from "../../../interfaces/IGoodDeal";
import { useFocusEffect, useIsFocused } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { GET_ALL_GOOD_DEALS } from "../../../graphql/queries/goodDeals/getAllGoodDeals";

const GoodDealsFeedScreen = ({ navigation }: any) => {
  const [getAllGoodDeals, { loading, error }] = useLazyQuery(
    GET_ALL_GOOD_DEALS,
    { fetchPolicy: "no-cache" }
  );
  const [goodDeals, setGoodDeals] = useState<IGoodDeal[]>([]);
  const isFocused = useIsFocused();

  useFocusEffect(
    useCallback(() => {
      async function fetchGoodDeals() {
        try {
          const data = await getAllGoodDeals();
          const dataGoodDeals = [...data.data.getAllGoodDeals];
          const orderData = dataGoodDeals.sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          );

          setGoodDeals(orderData);
        } catch (error) {
          console.log(
            "🚀 ~ file: GoodDealsFeedScreen fetchGoodDeals~ error",
            error
          );
          setGoodDeals([]);
        }
      }
      fetchGoodDeals();
    }, [isFocused])
  );

  if (loading) {
    return <Text>Loading</Text>;
  }

  if (error) {
    return <Text>{error.message}</Text>;
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GoodDealCardFeedPrimary />
      <FlatList
        data={goodDeals}
        renderItem={({ item }: { item: IGoodDeal }) => (
          <GoodDealCardFeed
            key={item.goodDealId}
            goodDeal={item}
            navigation={navigation}
          />
        )}
        keyExtractor={(item) => item.goodDealId.toString()}
      />
    </SafeAreaView>
  );
};

export default GoodDealsFeedScreen;
