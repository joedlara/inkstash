import React, { useState } from "react"
import { View, TouchableOpacity, StyleSheet, Text } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

// Define the navigation stack types
type RootStackParamList = {
  Dashboard: undefined
  NewReleases: undefined
  MyCollection: undefined
  Live: undefined
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
        onPress={() => handleTabPress("Events")}
      >
        <Ionicons
          name="calendar"
          size={30}
          color={activeTab === "NewReleases" ? "#6495ED" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* Chat Room Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("Live")}
      >
        <Ionicons
          name="aperture"
          size={35}
          color={activeTab === "Live" ? "#e54141" : "#FFFFFF"}
        />
      </TouchableOpacity>

      {/* My Collections Tab */}
      <TouchableOpacity
        style={styles.tabContainer}
        onPress={() => handleTabPress("MyCollection")}
      >
        <Ionicons
          name="file-tray-full"
          size={30}
          color={activeTab === "MyCollection" ? "#6495ED" : "#FFFFFF"}
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
