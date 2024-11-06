import React, { useState } from "react"
import {
  Animated,
  View,
  Text,
  ScrollView,
  Image,
  TouchableOpacity,
  StyleSheet,
} from "react-native"
import { LinearGradient } from "expo-linear-gradient"
import { Ionicons } from "@expo/vector-icons"
import { fetchPopularComics } from "../api/comicVineService"
import { useNavigation } from "@react-navigation/native"
import TopBarNav from "../components/TopBarNav"

const DashboardScreen = () => {
  const [comics, setComics] = useState([])
  const [featuredComic, setFeaturedComic] = useState(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("For You")
  const navigation = useNavigation()

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
    // You can handle specific tab actions here if needed
  }

  React.useEffect(() => {
    fetchPopularComics().then((data) => {
      setComics(data)
      if (data.length > 0) setFeaturedComic(data[0])
    })
    setLoading(false)
  }, [])

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TopBarNav onTabPress={handleTabPress} activeTab={activeTab} />
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
        {/* What's New from Friends */}
        <View style={styles.whatsNewSection}>
          <Text style={styles.sectionTitle}>What's New from Friends</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.whatsNewScroll}
          >
            {comics.slice(1, 15).map((comic) => (
              <View key={comic.id} style={styles.whatsNewItem}>
                <Image
                  source={{ uri: comic.image?.original_url }}
                  style={styles.whatsNewImage}
                />
                <LinearGradient
                  colors={["transparent", "rgb(0, 0, 0)"]}
                  style={styles.whatsNewbottomFade}
                />
                <View style={styles.whatsNewOverlay}>
                  <Text style={styles.whatsNewTitle}>
                    {comic.volume?.name} #{comic.issue_number}
                  </Text>
                </View>
              </View>
            ))}
          </ScrollView>
        </View>

        {/* Getting Started Section */}
        <View style={styles.gettingStartedSection}>
          <Text style={styles.sectionTitleGettingStarted}>Getting Started</Text>

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
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#0c1322", flex: 1 },
  scrollContainer: {
    backgroundColor: "#0c1322",
    flexGrow: 1,
    paddingBottom: 100,
  },

  // Featured Image Section
  featuredImageContainer: {
    position: "relative",
    height: 500,
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
  whatsNewItem: { width: 150, marginRight: 20, alignItems: "center" },
  whatsNewImage: { width: 150, height: 170, borderRadius: 8 },
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
  },

  //Getting Started Section
  gettingStartedSection: {
    marginTop: 20,
    paddingHorizontal: 15,
  },
  sectionTitleGettingStarted: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FFF",
  },
  gettingStartedItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  iconCircle: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: "green",
    marginRight: 15,
  },
  itemTextContainer: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
  itemDescription: {
    fontSize: 14,
    color: "#CCC",
  },
})

export default DashboardScreen
