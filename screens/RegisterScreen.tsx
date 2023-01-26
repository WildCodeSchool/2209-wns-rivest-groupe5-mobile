import { gql, useMutation } from "@apollo/client";
import { useState } from "react";
import {
  SafeAreaView,
  Text,
  TextInput,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const CREATE_USER = gql`
  mutation CreateUser(
    $firstname: String!
    $lastname: String!
    $email: String!
    $password: String!
  ) {
    createUser(
      firstname: $firstname
      lastname: $lastname
      email: $email
      password: $password
    ) {
      userId
      firstname
      lastname
      email
    }
  }
`;

export const RegisterScreen = ({ navigation }) => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  function handleSubmit(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    if(password !== confirmPassword) {
      return(alert('Mots de passe différents'))
    }
    createUser({
      variables: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
      onCompleted(data) {
        alert("Account created with success");
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("")
        navigation.navigate("Login");
      },
      onError(error) {
        alert("Registration failed");
      },
    });
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontWeight: "bold",
              textAlign: "center",
              fontSize: 40,
              marginBottom: 10,
            }}
          >
            Rejoins la communauté WildCarbon
          </Text>
          <TextInput
            style={styles.input}
            placeholder="Prénom"
            value={firstname}
            autoCapitalize="none"
            onChangeText={(text) => setFirstname(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Nom"
            value={lastname}
            autoCapitalize="none"
            onChangeText={(text) => setLastname(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            autoCapitalize="none"
            onChangeText={(text) => setEmail(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setPassword(text)}
          />
          <TextInput
            style={styles.input}
            placeholder="Password Confirm"
            value={confirmPassword}
            secureTextEntry={true}
            autoCapitalize="none"
            onChangeText={(text) => setConfirmPassword(text)}
          />
          <TouchableOpacity
            style={styles.button}
            onPress={() => handleSubmit(firstname, lastname, email, password)}
          >
            <Text style={{ color: "#FFFFFF", fontWeight: "bold" }}>
              S'inscrire
            </Text>
          </TouchableOpacity>
          <Text style={{ textAlign: "center", marginTop: 20 }}>
            Déjà membre? Connecte-toi
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "#FFFFFF",
    height: 50,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    padding: 10,
    borderRadius: 10,
  },
  button: {
    backgroundColor: "#2ECE65",
    borderRadius: 10,
    height: 50,
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
