import * as SecureStore from 'expo-secure-store'
import { gql, useLazyQuery } from '@apollo/client'
import { SafeAreaView, ScrollView, Text, View, StyleSheet } from 'react-native'
import { Stack, TextInput, Button } from '@react-native-material/core'
import { useTheme, Link } from '@react-navigation/native'
import { useState } from 'react'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../atom/currentUserAtom'

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
`

async function saveTokenInSecureStore(key: string, value: string) {
  await SecureStore.setItemAsync(key, value)
}

export const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { colors } = useTheme()
  const [getToken, { loading, error }] = useLazyQuery(GET_TOKEN_LOGIN)
  const [user, setUser] = useRecoilState(currentUserState)

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={{ paddingTop: 50 }}>
          <Text
            style={{
              fontWeight: 'bold',
              textAlign: 'center',
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
              autoCapitalize={'none'}
              variant="outlined"
              color="grey"
              onChangeText={(value) => setEmail(value)}
            />
            <TextInput
              label="Mot de passe"
              value={password}
              secureTextEntry={true}
              autoCapitalize={'none'}
              variant="outlined"
              color="grey"
              onChangeText={(value) => setPassword(value)}
            />
          </Stack>
          <Button
            title="Me Connecter"
            color="#17b2aa"
            tintColor="#FFFFFF"
            style={styles.button}
            loading={loading}
            loadingIndicatorPosition="overlay"
            onPress={async () => {
              await getToken({
                variables: { email, password },
                onCompleted(data) {
                  //store token via secure store
                  console.log('>>>>DATA FROM LOGIN >>>>', data)
                  saveTokenInSecureStore('token', data.getToken.token)
                  setUser(data.userFromDB)
                  navigation.navigate('Activités', {
                    screen: 'ActivitiesTab',
                    params: {
                      screen: 'Mes Activités',
                    },
                  })
                },
                onError(error) {
                  console.log(error)
                  alert('Login failed')
                },
              })
            }}
          />
          <Text style={{ textAlign: 'center', marginTop: 20 }}>
            Pas encore de compte?{' '}
            <Link style={{ color: '#17b2aa' }} to={{ screen: 'Register' }}>
              Rejoins nous
            </Link>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  button: {
    height: 50,
    marginTop: 50,
    marginLeft: 100,
    marginRight: 100,
    marginBottom: 50,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
