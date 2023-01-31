import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useCallback} from 'react';
import {IGoodDeal} from '../../interfaces/IGoodDeal';
import {Avatar, Stack} from '@react-native-material/core';

const GoodDealsDetailsScreen = ({route}: any) => {
  const { goodDeal }: { goodDeal: IGoodDeal } = route.params;
  
  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(goodDeal.goodDealLink);

    if (supported) {
      await Linking.openURL(goodDeal.goodDealLink);
    } else {
      alert(`Don't know how to open this URL: ${goodDeal.goodDealLink}`);
    }
  }, [goodDeal.goodDealLink]);

  const label = goodDeal.user.firstname + ' ' + goodDeal.user.lastname

  return (
    <View>
      <ImageBackground
        source={{uri: goodDeal.image}}
        resizeMode="cover"
        style={styles.image}
      ></ImageBackground>
      <Text style={styles.title}>{goodDeal.goodDealTitle}</Text>
      <Text style={styles.content}>{goodDeal.goodDealContent}</Text>
      <Stack direction="row" items="center">
        <Stack
          direction="row"
          items="center"
          style={{marginLeft: 10, marginTop: 20}}
        >
          <Avatar label={label} autoColor size={32} />
          <Text style={{marginLeft: 10}}>
            {goodDeal.user.firstname} {goodDeal.user.lastname}
          </Text>
        </Stack>
        <TouchableOpacity style={styles.button} onPress={handlePress}>
          <Text>Accéder au bon plan</Text>
        </TouchableOpacity>
      </Stack>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },
  title: {
    textAlign: 'center',
    fontSize: 20,
    fontWeight: '700',
    marginBottom: 20,
  },
  content: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  button: {
    marginLeft: 100,
    alignItems: 'center',
    backgroundColor: '#17b2aa',
    padding: 10,
    marginTop: 20,
    borderRadius: 5
  },
});

export default GoodDealsDetailsScreen;
