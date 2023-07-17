import { Button, Text } from '@react-native-material/core'
import {
  Image,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from 'react-native'

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/wildcarbon_logo.png')}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>
          Du bilan carbone à la réduction de vos émissions
        </Text>

        <Button
          title="Je me connecte"
          color="#003c49"
          tintColor="#fff"
          style={{ margin: 10, marginBottom: 5 }}
          onPress={() => {
            navigation.navigate('Connexion')
          }}
        />
        <Button
          title="Je m'inscris"
          color="#17b2aa"
          tintColor="#fff"
          style={{ margin: 10, marginTop: 0 }}
          onPress={() => {
            navigation.navigate('Inscription')
          }}
        />
        <View
          style={{
            backgroundColor: '#003c49',
            marginTop: 50,
            paddingTop: 25,
            paddingBottom: 25,
            paddingLeft: 15,
            paddingRight: 15,
            borderRadius: 5,
          }}
        >
          <Text style={[styles.title, styles.whiteContrast]}>
            Découvrez pleins d'astuces !
          </Text>
          <View style={styles.imageContainer}>
            <Image source={require('../assets/super_bons_plans.jpg')} />
          </View>
          <Text
            variant="body1"
            style={{ color: '#fff', margin: 20, textAlign: 'center' }}
          >
            Chaque jour, la communeauté WildCarbon publie des astuces pour
            réduire son empreinte carbone. Venez les découvrir !
          </Text>
          <Button
            title="Découvrir"
            color="#17b2aa"
            tintColor="#fff"
            onPress={() => {
              navigation.navigate('Astuces')
            }}
          />
        </View>
        <Text style={{ textAlign: 'center', margin: 20 }}>
          WildCarbon © 2023
        </Text>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 15,
  },
  whiteContrast: {
    color: '#fff',
  },
  body: {
    textAlign: 'center',
    margin: 10,
  },
  imageContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    resizeMode: 'contain',
    flex: 0.8,
    aspectRatio: 2,
  },
})
