import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import Ionicons from '@expo/vector-icons/Ionicons'
import { CreateGoodDealScreen } from './CreateGoodDealScreen'
import GoodDealsFeedScreen from './GoodDealsFeedScreen'
import MyGoodDealsScreen from './MyGoodDealsScreen'
import { useRecoilState } from 'recoil'
import { currentUserState } from '../../../atom/currentUserAtom'

const Tab = createBottomTabNavigator()

const GoodDealsTab = () => {
  const [user, setUser] = useRecoilState(currentUserState)

  return (
    <Tab.Navigator
      initialRouteName="Liste Astuces"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName: keyof typeof Ionicons.glyphMap | undefined

          if (route.name === 'Mes Astuces') {
            iconName = focused ? 'book' : 'book-outline'
          } else if (route.name === 'Toutes les Astuces') {
            iconName = focused ? 'albums' : 'albums-outline'
          } else if (route.name === 'Créer une astuce') {
            iconName = focused ? 'add-circle' : 'add-circle-outline'
          }
          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: '#17b2aa',
        tabBarInactiveTintColor: 'gray',
      })}
    >
      {user !== null && (
        <Tab.Screen name="Mes Astuces" component={MyGoodDealsScreen} />
      )}
      <Tab.Screen
        name="Toutes les Astuces"
        component={GoodDealsFeedScreen}
        options={{ unmountOnBlur: true }}
      />
      {user !== null && (
        <Tab.Screen name="Créer une astuce" component={CreateGoodDealScreen} />
      )}
    </Tab.Navigator>
  )
}

export default GoodDealsTab
