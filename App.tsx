import React, { useEffect, useState } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"
import { onAuthStateChanged } from "firebase/auth"
import { FIREBASE_AUTH } from "./src/config/FirebaseConfig"
import { ActivityIndicator, View } from "react-native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"

import HomeScreen from "./src/screens/HomeScreen"
import LoginScreen from "./src/screens/LoginScreen"
import RegisterScreen from "./src/screens/RegisterScreen"
import DashboardScreen from "./src/screens/DashboardScreen"
import MyCollectionsScreen from "./src/screens/MyCollectionsScreen"
import SearchScreen from "./src/screens/SearchScreen"
import NewReleasesScreen from "./src/screens/EventsScreen"

import BottomNav from "./src/components/BottomNav"
import CollectionDetailsScreen from "./src/screens/CollectionDetailsScreen"
import LiveScreen from "./src/screens/LiveScreen"
import SellItemScreen from "./src/screens/SellItemScreen"
import UserSettingsScreen from "./src/screens/UserSettingsScreen"

const Stack = createStackNavigator()
const Tab = createBottomTabNavigator()

const App = () => {
  const [initializing, setInitializing] = useState(true)
  const [user, setUser] = useState(null)

  // Listen to Firebase Auth state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user)
      if (initializing) setInitializing(false)
    })

    // Unsubscribe from the listener when the component unmounts
    return unsubscribe
  }, [initializing])

  if (initializing) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size={35} color="#0000ff" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {user ? (
          // If user is logged in, go directly to the Dashboard
          <>
            <Stack.Screen name="Dashboard" options={{ headerShown: false }}>
              {() => <DashboardScreen userId={user.uid} />}
            </Stack.Screen>
            <Stack.Screen
              name="NewReleases"
              component={NewReleasesScreen}
              options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
              name="MyCollection"
              options={{ headerShown: false, animationEnabled: false }}
            >
              {() => <MyCollectionsScreen userId={user.uid} />}
            </Stack.Screen>
            <Stack.Screen
              name="Live"
              component={LiveScreen}
              options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
              name="Search"
              component={SearchScreen}
              options={{ headerShown: false, animationEnabled: false }}
            />
            <Stack.Screen
              name="CollectionDetails"
              component={CollectionDetailsScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="SellItem"
              component={SellItemScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="UserSettings"
              component={UserSettingsScreen}
              options={{ headerShown: false }}
            />
          </>
        ) : (
          // Otherwise, show the login and registration screens
          <>
            <Stack.Screen
              name="Home"
              component={HomeScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Register"
              component={RegisterScreen}
              options={{ headerShown: false }}
            />
          </>
        )}
      </Stack.Navigator>

      {user ? (
        <>
          <BottomNav />
        </>
      ) : (
        <></>
      )}
    </NavigationContainer>
  )
}

export default App
