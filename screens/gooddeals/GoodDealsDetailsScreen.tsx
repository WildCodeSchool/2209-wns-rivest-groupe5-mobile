import {View, Text} from 'react-native';
import React from 'react';
import { IGoodDeal } from '../../interfaces/IGoodDeal';

const GoodDealsDetailsScreen = ({ route }: any) => {

  const {goodDeal}: {goodDeal: IGoodDeal} = route.params;


  console.log(route.params)
  return (
    <View>
      <Text>{goodDeal.goodDealTitle}</Text>
    </View>
  );
};

export default GoodDealsDetailsScreen;
