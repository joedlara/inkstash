import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
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
  const [activeTab, setActiveTab] = useState("Dashboard")

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
    navigation.navigate(tabName)
  }

  return (
    <View style={styles.bottomNav}>
      {/* Home Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("Dashboard")}
      >
        <Ionicons
          name="home"
          size={30}
          color={activeTab === "Dashboard" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* New Releases Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("NewReleases")}
      >
        <Ionicons
          name="calendar"
          size={30}
          color={activeTab === "NewReleases" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* My Comics Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("MyComics")}
      >
        <Ionicons
          name="file-tray-full"
          size={30}
          color={activeTab === "MyComics" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* Chat Room Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("ChatRoom")}
      >
        <Ionicons
          name="chatbox-ellipses"
          size={30}
          color={activeTab === "ChatRoom" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* Search Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("Search")}
      >
        <Ionicons
          name="search"
          size={30}
          color={activeTab === "Search" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#191919",
  },
  tabContainer: {
    alignItems: "center",

    paddingBottom: 25,
  },
  tabText: {
    color: "white",
  },
})

export default BottomNav
