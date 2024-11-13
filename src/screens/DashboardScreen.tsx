import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { fetchComicIssues } from "../api/comicVineService"
import { useNavigation } from "@react-navigation/native"
import TopBarNav from "../components/TopBarNav"
import { StatusBar } from "expo-status-bar"

const DashboardScreen = () => {
  const [comics, setComics] = useState([])
  const [featuredComic, setFeaturedComic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("For You")
  const navigation = useNavigation()

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
  }
  const handleIssuePress = (issueID: string, volumeID: string) => {
    navigation.navigate("IssueDetails", { issueID, volumeID })
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchComicIssues()
        setComics(data)
        if (data.length > 0) setFeaturedComic(data[0])
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TopBarNav onTabPress={handleTabPress} activeTab={activeTab} />
        {/* Featured Image with Fading Effect */}

        {featuredComic && (
          <>
            {loading ? (
              <View style={styles.featuredImageContainer}>
                <ActivityIndicator style={styles.loadingCircle} color="cyan" />
              </View>
            ) : (
              <View style={styles.featuredImageContainer}>
                <Image
                  source={{ uri: featuredComic.image?.original_url }}
                  style={styles.featuredImage}
                />
                <LinearGradient
                  colors={["rgb(0, 0, 0)", "transparent"]}
                  style={styles.topFade}
                />

                <LinearGradient
                  colors={["transparent", "rgb(0, 0, 0)"]}
                  style={styles.bottomFade}
                />

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
          </>
        )}
        {/* Top Pick  */}
        <View style={styles.whatsNewSection}>
          <Text style={styles.sectionTitle}>Top Picks for User</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.whatsNewScroll}
          >
            {comics.slice(1, 15).map((comic) => (
              <TouchableOpacity
                key={comic.id}
                onPress={() => handleIssuePress(comic.id, comic.volume.id)}
              >
                <View style={styles.whatsNewItem}>
                  <Image
                    source={{ uri: comic.image?.original_url }}
                    style={styles.whatsNewImage}
                  />
                  <LinearGradient
                    colors={["transparent", "rgb(51, 51, 51)"]}
                    style={styles.whatsNewbottomFade}
                  />
                  <View style={styles.whatsNewOverlay}>
                    <Text style={styles.whatsNewTitle}>
                      {comic.volume?.name} #{comic.issue_number}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        {/* Getting Started Section */}
        <View style={styles.gettingStartedSection}>
          <Text style={styles.sectionTitle}>Getting Started</Text>

          <TouchableOpacity
            style={styles.gettingStartedItem}
            onPress={() => navigation.navigate("PullList")}
          >
            <View style={styles.iconCircle} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Create a Pull List</Text>
              <Text style={styles.itemDescription}>
                Keep track of what's coming out and when. Subscribe to a series
                to auto-pull future issues.
              </Text>
            </View>
            <Ionicons
              style={styles.itemChevron}
              name="chevron-forward"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gettingStartedItem}
            onPress={() => navigation.navigate("Collection")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "orange" }]} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Start Adding Your Collection</Text>
              <Text style={styles.itemDescription}>
                Search or view the releases for comics you own, then add them to
                your lists in just a few taps.
              </Text>
            </View>
            <Ionicons
              style={styles.itemChevron}
              name="chevron-forward"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.gettingStartedItem}
            onPress={() => navigation.navigate("CommunityAMA")}
          >
            <View style={[styles.iconCircle, { backgroundColor: "purple" }]} />
            <View style={styles.itemTextContainer}>
              <Text style={styles.itemTitle}>Community</Text>
              <Text style={styles.itemDescription}>
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
              </Text>
            </View>
            <Ionicons
              style={styles.itemChevron}
              name="chevron-forward"
              size={20}
              color="#FFFFFF"
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000000", flex: 1 },
  scrollContainer: {
    backgroundColor: "#000000",
    flexGrow: 1,
    paddingBottom: 80,
  },

  // Featured Image Section
  featuredImageContainer: {
    position: "relative",
    height: 500,
    width: "100%",
  },
  featuredImage: { width: "100%", height: "100%", resizeMode: "cover" },
  loadingCircle: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 2 }],
  },

  topFade: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "30%",
  },
  bottomFade: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 250,
  },

  // Suggested Comic Overlay
  suggestedComicOverlay: {
    position: "absolute",
    bottom: 15,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  suggestionLabel: { color: "#FF4136", fontSize: 12, fontWeight: "bold" },
  suggestedTitle: { color: "#FFFFFF", fontSize: 25, fontWeight: "bold" },
  suggestedSubtitle: { color: "#AAAAAA", fontSize: 14 },
  actionButtons: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  pullButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  pullButtonText: { color: "#FFFFFF", fontWeight: "bold" },
  closeButton: {
    width: 30,
    height: 30,
    backgroundColor: "rgba(80, 80, 80, 0.3)",
    borderRadius: 15,
    justifyContent: "center",
    alignItems: "center",
  },

  // Whats New Section
  whatsNewSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "bold",
    paddingLeft: 15,
    marginTop: 15,
  },
  whatsNewScroll: { paddingHorizontal: 15, paddingTop: 20 },
  whatsNewItem: {
    width: 160,
    marginRight: 20,
    alignItems: "center",
  },
  whatsNewImage: {
    width: 160,
    height: 185,
    borderRadius: 10,
  },
  whatsNewOverlay: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingVertical: 5,
    alignItems: "center",
    padding: 5,
    marginBottom: 7,
  },
  whatsNewTitle: { color: "#FFFFFF", fontSize: 16.5, fontWeight: "bold" },
  whatsNewbottomFade: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: "50%", // Adjust this to control how much of the bottom fades
    borderRadius: 10,
  },

  //Getting Started Section
  gettingStartedSection: {
    marginTop: 20,
    paddingHorizontal: 15,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  gettingStartedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "#1E3A8A",
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  itemDescription: {
    fontSize: 14,
    color: "#CCCCCC",
  },
})

export default DashboardScreen
