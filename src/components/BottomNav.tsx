import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// Define the navigation stack types
type RootStackParamList = {
  Dashboard: undefined
  NewReleases: undefined
  MyComics: undefined
  ChatRoom: undefined
  Search: undefined
}

const BottomNav = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParamList>>()

  return (
    <View style={styles.bottomNav}>
      {/* Home Tab */}
      <TouchableOpacity onPress={() => navigation.navigate("Dashboard")}>
        <Ionicons name="home" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* New Releases Tab */}
      <TouchableOpacity onPress={() => navigation.navigate("NewReleases")}>
        <Ionicons name="calendar" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* My Comics Tab */}
      <TouchableOpacity onPress={() => navigation.navigate("MyComics")}>
        <Ionicons name="file-tray-full" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Chat Room Tab */}
      <TouchableOpacity onPress={() => navigation.navigate("ChatRoom")}>
        <Ionicons name="chatbox-ellipses" size={28} color="#FFFFFF" />
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity onPress={() => navigation.navigate("Search")}>
        <Ionicons name="search" size={28} color="#FFFFFF" />
      </TouchableOpacity>
    </View>
  )
}
const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    borderTopWidth: 1,
    paddingBottom: 30, // Adjust this value based on desired spacing
    borderTopColor: "#AAAAAA",
    backgroundColor: "rgba(12, 19, 34, .98)",
  },
})

export default BottomNav
