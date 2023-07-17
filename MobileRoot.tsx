import React from 'react'
import { HomeScreen } from './screens/HomeScreen'
import { LoginScreen } from './screens/LoginScreen'
import { RegisterScreen } from './screens/RegisterScreen'
import GoodDealsScreen from './screens/gooddeals/GoodDealsScreen'
import ActivitiesScreen from './screens/activities/ActivitiesScreen'
import { useRecoilState } from 'recoil'
import { NavigationContainer } from '@react-navigation/native'
import { currentUserState } from './atom/currentUserAtom'
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer'
import * as SecureStore from 'expo-secure-store'
import GraphsScreen from './screens/GraphsScreen'

const Drawer = createDrawerNavigator()

const MobileRoot = ({ resetClient }: any) => {
  const [user, setUser] = useRecoilState(currentUserState)

  function CustomDrawerContent(props: any) {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {user !== null && (
          <DrawerItem label="Déconnexion" onPress={() => logout(props)} />
        )}
      </DrawerContentScrollView>
    )
  }

  const logout = async (props: any) => {
    props.navigation.navigate('Accueil')
    setUser(null)
    await SecureStore.deleteItemAsync('token')
    await resetClient()
  }

  return (
    <NavigationContainer>
      <Drawer.Navigator
        initialRouteName="Accueil"
        drawerContent={(props) => <CustomDrawerContent {...props} />}
      >
        <Drawer.Screen
          name="Accueil"
          component={HomeScreen}
          options={{
            drawerItemStyle: { display: user === null ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name="Connexion"
          component={LoginScreen}
          options={{
            drawerItemStyle: { display: user === null ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name="Inscription"
          component={RegisterScreen}
          options={{
            drawerItemStyle: { display: user === null ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name="Statistiques"
          component={GraphsScreen}
          options={{
            drawerItemStyle: { display: user !== null ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen
          name="Activités"
          component={ActivitiesScreen}
          options={{
            drawerItemStyle: { display: user !== null ? 'flex' : 'none' },
          }}
        />
        <Drawer.Screen name="Astuces" component={GoodDealsScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default MobileRoot
