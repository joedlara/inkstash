import {
  View,
  Text,
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

const TopBarNav: React.FC<TopTabsBarProps> = ({ onTabPress, activeTab }) => {
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

        {/* Tabs */}
        <View style={styles.tabsContainer}>
          <TouchableOpacity onPress={() => onTabPress("For You")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "For You" && styles.activeTab,
              ]}
            >
              For You
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabPress("Featured")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "Featured" && styles.activeTab,
              ]}
            >
              Featured
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => onTabPress("Pick of the Week")}>
            <Text
              style={[
                styles.tabText,
                activeTab === "Pick of the Week" && styles.activeTab,
              ]}
            >
              Pick of the Week
            </Text>
          </TouchableOpacity>
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

  // Tabs
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#191919ce", // Background color for the tab section
    paddingVertical: 10,
    borderRadius: 10, // Rounded corners
    marginTop: 10,
    borderWidth: 0.5,
    borderColor: "darkgrey",
  },
  tab: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 3,
  },
  activeTab: {
    backgroundColor: "#0c1322", // Color for active tab
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 14,
  },
  inactiveTabText: { color: "#FFFFFF", fontSize: 14 },
  tabText: {
    color: "#BBB",
    fontSize: 16,
  },
})

export default TopBarNav
