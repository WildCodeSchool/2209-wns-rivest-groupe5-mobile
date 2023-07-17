import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity,
  Linking,
  useWindowDimensions,
} from 'react-native'
import React, { useCallback } from 'react'
import { IGoodDeal } from '../../interfaces/IGoodDeal'
import { Avatar, Stack } from '@react-native-material/core'
import HTML from 'react-native-render-html'

const GoodDealsDetailsScreen = ({ route }: any) => {
  const { goodDeal }: { goodDeal: IGoodDeal } = route.params
  const windowDimensions = useWindowDimensions()

  const handlePress = useCallback(async () => {
    const supported = await Linking.canOpenURL(goodDeal.goodDealLink)

    if (supported) {
      await Linking.openURL(goodDeal.goodDealLink)
    } else {
      alert(`Don't know how to open this URL: ${goodDeal.goodDealLink}`)
    }
  }, [goodDeal.goodDealLink])

  const label = goodDeal.user.firstname + ' ' + goodDeal.user.lastname

  const default_image = require('../../assets/default-placeholder.png')

  return (
    <View>
      {goodDeal.image ? (
        <ImageBackground
          source={{ uri: goodDeal.image }}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
      ) : (
        <ImageBackground
          source={default_image}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
      )}
      <Text style={styles.title}>{goodDeal.goodDealTitle}</Text>
      <Stack
        direction="row"
        items="center"
        style={{ justifyContent: 'center', marginBottom: 40 }}
      >
        <Avatar label={label} autoColor size={20} />
        <Text style={{ marginLeft: 5 }}>
          {goodDeal.user.firstname} {goodDeal.user.lastname}
        </Text>
      </Stack>
      <View style={styles.content}>
        <HTML
          source={{ html: goodDeal.goodDealContent }}
          contentWidth={windowDimensions.width}
        />
      </View>
      <Stack
        direction="row"
        items="center"
        style={{ margin: 30, marginTop: 100, justifyContent: 'center' }}
      >
        {goodDeal.goodDealLink && (
          <TouchableOpacity style={styles.button} onPress={handlePress}>
            <Text style={{ color: '#fff' }}>
              Voir la ressource complémentaire
            </Text>
          </TouchableOpacity>
        )}
      </Stack>
    </View>
  )
}

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
    marginBottom: 10,
  },
  content: {
    paddingRight: 10,
    paddingLeft: 10,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#17b2aa',
    padding: 10,
    borderRadius: 5,
  },
})

export default GoodDealsDetailsScreen
