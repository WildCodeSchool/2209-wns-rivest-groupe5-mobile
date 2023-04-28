import * as SecureStore from 'expo-secure-store'

export const isTokenInStore = async () => {
  const token = await SecureStore.getItemAsync('token')

  return token !== null
}
