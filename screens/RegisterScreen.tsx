import { gql, useMutation } from '@apollo/client'
import { Stack, Button, TextInput } from '@react-native-material/core'
import { useState } from 'react'
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  TouchableOpacity,
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { useTheme, Link } from '@react-navigation/native'

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
`

export const RegisterScreen = ({ navigation }) => {
  const [createUser, { loading, error }] = useMutation(CREATE_USER)
  const [firstname, setFirstname] = useState('')
  const [lastname, setLastname] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  function handleSubmit(
    firstname: string,
    lastname: string,
    email: string,
    password: string
  ) {
    if (password !== confirmPassword) {
      return alert('Mots de passe différents')
    }
    createUser({
      variables: {
        firstname: firstname,
        lastname: lastname,
        email: email,
        password: password,
      },
      onCompleted(data) {
        alert('Account created with success')
        setFirstname('')
        setLastname('')
        setEmail('')
        setPassword('')
        setConfirmPassword('')
        navigation.navigate('Connexion')
      },
      onError(error) {
        alert('Registration failed')
      },
    })
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 30,
              marginBottom: 10,
            }}
          >
            Bienvenue !
          </Text>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
              fontSize: 15,
              marginBottom: 40,
            }}
          >
            Inscrits-toi pour rejoindre la communeauté, suivre tes émissions et
            partager tes Astuces !
          </Text>
          <Stack spacing={10} style={{ marginLeft: 25, marginRight: 25 }}>
            <TextInput
              label="Prénom"
              value={firstname}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setFirstname(text)}
            />
            <TextInput
              label="Nom"
              value={lastname}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setLastname(text)}
            />
            <TextInput
              label="Email"
              value={email}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setEmail(text)}
            />
            <TextInput
              label="Mot de passe"
              value={password}
              secureTextEntry={true}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setPassword(text)}
            />
            <TextInput
              label="Confirmez le mot de passe"
              value={confirmPassword}
              secureTextEntry={true}
              autoCapitalize="none"
              variant="outlined"
              color="grey"
              onChangeText={(text) => setConfirmPassword(text)}
            />
          </Stack>

          <Button
            title="S'inscrire"
            color="#17b2aa"
            tintColor="#FFFFFF"
            style={styles.button}
            loading={loading}
            loadingIndicatorPosition="overlay"
            onPress={() => handleSubmit(firstname, lastname, email, password)}
          />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Déjà membre?{' '}
            <Link style={{ color: '#17b2aa' }} to={{ screen: 'Connexion' }}>
              Connecte-toi
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  input: {
    backgroundColor: '#FFFFFF',
    height: 50,
    margin: 12,
    marginLeft: 25,
    marginRight: 25,
    padding: 10,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#17b2aa',
    borderRadius: 5,
    height: 50,
    marginTop: 30,
    marginLeft: 100,
    marginRight: 100,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: 'bold',
  },
})
