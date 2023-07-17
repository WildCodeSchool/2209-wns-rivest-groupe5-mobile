import { Text, View, StyleSheet, TouchableOpacity, Image } from 'react-native'

export const GoodDealCardFeed = (props: any) => {
  const onPress = () => {
    props.navigation.navigate('Détails Astuce', {
      goodDeal: props.goodDeal,
    })
  }

  const default_image = require('../assets/default-placeholder.png')

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={{ height: 80, width: 80, borderRadius: 5, margin: 20 }}>
        {props.goodDeal.image ? (
          <Image style={styles.image} source={{ uri: props.goodDeal.image }} />
        ) : (
          <Image style={styles.defaultImage} source={default_image} />
        )}
      </View>
      <View style={styles.insideContainer}>
        <Text style={styles.title} numberOfLines={1} ellipsizeMode="tail">
          {props.goodDeal.goodDealTitle}
        </Text>
        <Text style={{ fontSize: 12 }}>
          {props.goodDeal.user.firstname} {props.goodDeal.user.lastname}
        </Text>
        <Text style={styles.content} numberOfLines={2}>
          {props.goodDeal.goodDealDescription ?? "Voir l'astuce"}
        </Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
    height: '100%',
    flex: 1,
    flexDirection: 'row',
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  insideContainer: {
    padding: 20,
    paddingLeft: 0,
    flex: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    marginTop: 5,
  },
  image: {
    flex: 1,
    borderRadius: 5,
  },
  defaultImage: {
    borderRadius: 5,
    width: 80,
    height: 80,
  },
})
