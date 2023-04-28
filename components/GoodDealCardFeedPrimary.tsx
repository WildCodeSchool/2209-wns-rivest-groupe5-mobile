import { Text, View, ImageBackground, StyleSheet } from 'react-native'

export const GoodDealCardFeedPrimary = () => {
  return (
    <View>
      <ImageBackground
        source={require('../assets/background-good-deals.jpg')}
        resizeMode="cover"
        style={styles.image}
        imageStyle={styles.imagestyle}
      >
        <Text style={styles.title}>Bons plans</Text>
      </ImageBackground>
    </View>
  )
}

const styles = StyleSheet.create({
  image: {
    height: 100,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imagestyle: {
    opacity: 0.3,
    backgroundColor: 'YourFavouredColor',
    borderRadius: 5,
  },
  title: {
    fontSize: 25,
  },
})
