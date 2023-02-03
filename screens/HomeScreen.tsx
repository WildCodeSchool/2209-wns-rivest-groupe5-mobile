import { Button, Text } from "@react-native-material/core";
import {
  Image,
  SafeAreaView,
  View,
  ScrollView,
  StyleSheet,
  StatusBar,
} from "react-native";

export const HomeScreen = ({ navigation }: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.imageContainer}>
          <Image
            source={require("../assets/wildcarbon_logo.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.title}>
          L'application qui vous aide à réduire votre empreinte carbone
        </Text>

        <Text variant="body1" style={styles.body}>
          Suivez vos activités carbone, montrez vos progrès à vos amis et
          profitez des bons plans partagés au quotidien.
        </Text>

        <Button
          title="Créer mon compte"
          color="#17b2aa"
          tintColor="#fff"
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("Inscription");
          }}
        />
        <Button
          title="Me connecter"
          color="#003c49"
          tintColor="#fff"
          style={{ margin: 10 }}
          onPress={() => {
            navigation.navigate("Connexion");
          }}
        />
        <View
          style={{
            backgroundColor: "#003c49",
            marginTop: 50,
            paddingTop: 25,
            paddingBottom: 25,
            paddingLeft: 15,
            paddingRight: 15,
          }}
        >
          <Text style={[styles.title, styles.whiteContrast]}>
            Ici, les meilleurs bons plans !
          </Text>
          <View style={styles.imageContainer}>
            <Image source={require("../assets/super_bons_plans.jpg")} />
          </View>
          <Text variant="body1" style={{ color: "#fff", margin: 20 }}>
            Chaque jour des nouveaux bons plans carbone à découvrir !
          </Text>
          <Button
            title="Voir les bons plans"
            color="#17b2aa"
            tintColor="#fff"
            onPress={() => {
              navigation.navigate("GoodDeals");
            }}
          />
        </View>
        <Text style={{ textAlign: "center", margin: 20 }}>
          WildCarbon © 2023
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 20,
  },
  title: {
    fontWeight: "bold",
    textAlign: "center",
    fontSize: 30,

    paddingBottom: 15,
  },
  whiteContrast: {
    color: "#fff",
  },
  body: {
    textAlign: "center",
    margin: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    resizeMode: "contain",
    flex: 0.8,
    aspectRatio: 2.5,
  },
});
