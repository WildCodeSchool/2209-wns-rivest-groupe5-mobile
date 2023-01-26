import { gql, useMutation } from "@apollo/client";
import { Button, SafeAreaView, Text, TextInput, View, StyleSheet } from "react-native";

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

export const RegisterScreen = () => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER);
  return (
    <SafeAreaView>
      <View style={{paddingTop: 50}}>
        <Text style={{fontWeight: 'bold', textAlign:'center', fontSize: 40}}>Rejoins la communauté WildCarbon</Text>
        <TextInput
        style={styles.input}
         placeholder="firstname" 
        />
        <Button
          title="Create User"
          onPress={() => {
            // navigation.navigate('Home')
            console.log(">>>>CREATING USER>>>>");
            createUser({
              variables: {
                firstname: "mobileuser4",
                lastname: "mobileuser4",
                email: "mobileuser4@email.com",
                password: "azerty",
              },
              onCompleted(data) {
                alert("Account created with success");
                //   navigate('/login');
              },
              onError(error) {
                alert("Registration failed");
              },
            });
          }}
        />
      </View>
    </SafeAreaView>
  );
};



const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    marginLeft: 20,
    marginRight: 20,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10
  },
});
