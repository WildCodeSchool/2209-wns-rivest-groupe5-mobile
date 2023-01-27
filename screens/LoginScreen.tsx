import { gql, useLazyQuery } from "@apollo/client";
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from "react-native";
import { Stack, TextInput, Button } from "@react-native-material/core";
import { useTheme, Link } from "@react-navigation/native";
import { useState } from "react";

const GET_TOKEN_LOGIN = gql`
  query GetToken($email: String!, $password: String!) {
    getToken(email: $email, password: $password) {
      token
      userFromDB {
        userId
        email
        firstname
        lastname
      }
    }
  }
`;

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { colors } = useTheme();
  const [getToken, { loading, error }] = useLazyQuery(GET_TOKEN_LOGIN);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 40,
              marginBottom: 40,
            }}
          >
            Rejoins la communauté WildCarbon
          </Text>
          <Stack spacing={30} style={{ marginLeft: 25, marginRight: 25 }}>
            <TextInput
              label="Email"
              value={email}
              autoCapitalize={"none"}
              variant="outlined"
              color='grey'
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              label="Mot de passe"
              value={password}
              secureTextEntry={true}
              autoCapitalize={"none"}
              variant="outlined"
              color='grey'
              onChangeText={(value) => setPassword(value)}
            />
          </Stack>
          <Button
            title="Me Connecter"
            color="#2ECE65"
            tintColor="#FFFFFF"
            style={styles.button}
            loading={loading}
            loadingIndicatorPosition="overlay"
            onPress={async () => {
              await getToken({
                variables: { email, password },
                onCompleted(data) {
                  //store token in async storage
                  //   localStorage.setItem("token", data.getToken.token);
                  //   localStorage.setItem("user", JSON.stringify(data.getToken.userFromDB));
                  navigation.navigate("Home");
                },
                onError(error) {
                  console.log(error);
                  alert("Login failed");
                },
              });
            }}
          />
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Pas encore de compte?{" "}
            <Link style={{ color: "#2ECE65" }} to={{ screen: "Register" }}>
              Rejoins nous
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 50,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
