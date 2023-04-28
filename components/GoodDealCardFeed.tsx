import { Text, View, Image, StyleSheet, TouchableOpacity } from 'react-native'

export const GoodDealCardFeed = (props: any) => {
  const onPress = () => {
    props.navigation.navigate('Détails Bon Plan', {
      goodDeal: props.goodDeal,
    })
  }

  const default_image = require('../assets/default-placeholder.png')

  return (
    <View style={styles.container}>
      <View style={styles.top}>
        <View style={{ height: 80, width: 80, borderRadius: 5, margin: 20 }}>
          {props.goodDeal.image ? (
            <Image
              style={styles.image}
              source={{ uri: props.goodDeal.image }}
            />
          ) : (
            <Image style={styles.defaultImage} source={default_image} />
          )}
        </View>
        <View style={{ flex: 1, marginRight: 20 }}>
          <Text style={styles.title} numberOfLines={1}>
            {props.goodDeal.goodDealTitle}
          </Text>
          <Text style={styles.content} numberOfLines={2}>
            {props.goodDeal.goodDealContent}
          </Text>
        </View>
      </View>
      <View style={styles.footer}>
        <Text style={{ fontSize: 12 }}>
          {props.goodDeal.user.firstname} {props.goodDeal.user.lastname}
        </Text>
        <TouchableOpacity style={styles.button} onPress={onPress}>
          <Text>Voir le bon plan</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: '#17b2aa',
    padding: 10,
    marginLeft: 50,
    borderRadius: 5,
  },
  container: {
    backgroundColor: '#DDDDDD',
    marginRight: 30,
    marginLeft: 30,
    borderRadius: 5,
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 20,
  },
  top: {
    height: 100,
    flexDirection: 'row',
    alignContent: 'center',
    borderRadius: 5,
  },
  footer: {
    borderRadius: 5,
    paddingTop: 10,
    paddingLeft: 20,
    paddingBottom: 10,
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
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
  title: {
    marginTop: 20,
    fontSize: 20,
    fontWeight: '700',
  },
  content: {
    marginTop: 5,
  },
})
