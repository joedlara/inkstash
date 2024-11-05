import React, { useState, useRef } from "react"
import {
  Animated,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  StatusBar,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { fetchPopularComics } from "../api/comicVineService"

const DashboardScreen = () => {
  const [comics, setComics] = useState([])
  const [featuredComic, setFeaturedComic] = useState(null)
  const scrollY = useRef(new Animated.Value(0)).current

  React.useEffect(() => {
    fetchPopularComics().then((data) => {
      setComics(data)
      if (data.length > 0) setFeaturedComic(data[0])
    })
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />

      {/* Featured Image with Fading Effect */}
      {featuredComic && (
        <View style={styles.featuredImageContainer}>
          <Image
            source={{ uri: featuredComic.image?.original_url }}
            style={styles.featuredImage}
          />
          <LinearGradient
            colors={["rgb(12, 19, 34)", "transparent"]}
            style={styles.topFade}
          />

          <LinearGradient
            colors={["transparent", "rgb(12, 19, 34)"]}
            style={styles.bottomFade}
          />

          {/* Top Bar */}
          <View style={styles.topBar}>
            <View style={styles.topBarContent}>
              <View style={styles.userSection}>
                <Image
                  source={require("../assets/icon.png")}
                  style={styles.userIcon}
                />
                <Text style={styles.username}>Dynamixjl</Text>
              </View>
              <View style={styles.iconSection}>
                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="settings-sharp" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="person-circle" size={28} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>

            {/* Tabs */}
            <View style={styles.tabs}>
              <TouchableOpacity style={[styles.tab, styles.activeTab]}>
                <Text style={styles.activeTabText}>For You</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.inactiveTabText}>Featured</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.tab}>
                <Text style={styles.inactiveTabText}>Pick of the Week</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Suggested Comic Overlay */}
          <View style={styles.suggestedComicOverlay}>
            <Text style={styles.suggestionLabel}>SUGGESTION</Text>
            <Text style={styles.suggestedTitle}>
              {featuredComic.volume?.name} #{featuredComic.issue_number}
            </Text>
            <Text style={styles.suggestedSubtitle}>
              A favorite among our community
            </Text>
            <View style={styles.actionButtons}>
              <TouchableOpacity style={styles.pullButton}>
                <Text style={styles.pullButtonText}>PULL SERIES</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.closeButton}>
                <Ionicons name="close" size={20} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      )}

      {/* Scrollable Content */}
      <Animated.ScrollView contentContainerStyle={styles.scrollViewContent}>
        {/* What's New from Friends */}
        <Text style={styles.sectionTitle}>What's New from Friends</Text>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.friendsScroll}
        >
          {comics.slice(1, 5).map((comic) => (
            <View key={comic.id} style={styles.friendItem}>
              <Image
                source={{ uri: comic.image?.original_url }}
                style={styles.friendImage}
              />
              <LinearGradient
                colors={["transparent", "rgb(0, 0, 0)"]}
                style={styles.bottomFadeFriends}
              />
              <View style={styles.overlay}>
                <Text style={styles.friendTitle}>
                  {comic.volume?.name} #{comic.issue_number}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </Animated.ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0c1322" },

  // Featured Image Section
  featuredImageContainer: {
    position: "relative",
    height: "60%",
    width: "100%",
  },
  featuredImage: { width: "100%", height: "100%", resizeMode: "cover" },
  topFade: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "50%",
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 250,
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
  userIcon: { width: 40, height: 40, borderRadius: 15, marginRight: 5 },
  username: { color: "#FFFFFF", fontSize: 18, fontWeight: "bold" },
  iconSection: { flexDirection: "row" },
  icon: { marginLeft: 15 },

  // Tabs
  tabs: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#0c1322c5", // Background color for the tab section
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

  // Suggested Comic Overlay
  suggestedComicOverlay: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  suggestionLabel: { color: "#FF4136", fontSize: 12, fontWeight: "bold" },
  suggestedTitle: { color: "#FFFFFF", fontSize: 20, fontWeight: "bold" },
  suggestedSubtitle: { color: "#AAAAAA", fontSize: 14 },
  actionButtons: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  pullButton: {
    backgroundColor: "#066a12",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  pullButtonText: { color: "#FFFFFF", fontWeight: "bold" },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(255, 255, 255, 0.3)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  scrollViewContent: { paddingTop: 15 },

  // Friends Section
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 15,
    marginTop: 15,
  },
  friendsScroll: { paddingHorizontal: 15, paddingTop: 20 },
  friendItem: { width: 150, marginRight: 20, alignItems: "center" },
  friendImage: { width: 150, height: 170, borderRadius: 8 },
  overlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
    padding: 5,
    marginBottom: 7,
  },
  friendTitle: { color: "#FFFFFF", fontSize: 16.5, fontWeight: "bold" },
  friendUsername: { color: "#AAAAAA", fontSize: 10 },
  friendRating: { color: "#FFD700", fontSize: 10 },
  bottomFadeFriends: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%", // Adjust this to control how much of the bottom fades
  },
})

export default DashboardScreen
