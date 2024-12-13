import {
  View,
  Image,
  TouchableOpacity,
  StatusBar,
  StyleSheet,
} from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"

type TopTabsBarProps = {
  onTabPress: (tabName: string) => void
  activeTab: string
}

const TopBarNav = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.container}>
      {/* Top Bar */}
      <View style={styles.topBar}>
        <View style={styles.topBarContent}>
          <View style={styles.userSection}>
            <Image
              source={require("../assets/icon.png")}
              style={styles.userIcon}
            />
          </View>
          <View style={styles.iconSection}>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("SellItem")}
            >
              <Ionicons name="add-circle" size={35} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.icon}
              onPress={() => navigation.navigate("UserSettings")}
            >
              <Ionicons name="person-circle" size={35} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
  },
  // Top Bar
  topBar: {
    position: "absolute",
    top: 0,
    width: "100%",
    paddingHorizontal: 15,
    paddingTop: StatusBar.currentHeight || 50,
  },
  topBarContent: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  userSection: { flexDirection: "row", alignItems: "center" },
  userIcon: { width: 50, height: 50, borderRadius: 15, marginRight: 5 },
  username: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  iconSection: { flexDirection: "row" },
  icon: { marginLeft: 15 },
})

export default TopBarNav
