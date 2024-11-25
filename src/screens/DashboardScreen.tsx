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
import { useNavigation } from "@react-navigation/native"
import TopBarNav from "../components/TopBarNav"
import { StatusBar } from "expo-status-bar"

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("For You")
  const navigation = useNavigation()

  const mockData = {
    type: "collectible",
    title: "Rare Spider-Man Comic",
    subtitle: "Signed by Stan Lee",
    image:
      "https://comicvine.gamespot.com/a/uploads/original/11161/111615891/9535719-cover2.jpg",
    price: 1200,
    verified: true,
    featured: true,
  }

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
  }

  const handlePress = () => {
    if (mockData.type === "collectible") {
      navigation.navigate("ItemDetails", { itemId: mockData.id })
    } else if (mockData.type === "event") {
      navigation.navigate("EventDetailsScreen", { eventId: mockData.id })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(false)
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
        {loading ? (
          <View style={styles.featuredImageContainer}>
            <ActivityIndicator style={styles.loadingCircle} color="cyan" />
          </View>
        ) : (
          <View style={styles.featuredImageContainer}>
            <Image
              source={{ uri: mockData.image }}
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
            <View style={styles.suggestedItemOverlay}>
              <Text style={styles.suggestionLabel}>SUGGESTION</Text>
              <Text style={styles.suggestedTitle}>{mockData.title}</Text>
              <Text style={styles.suggestedSubtitle}>{mockData.subtitle}</Text>
              <View style={styles.actionButtons}>
                <TouchableOpacity
                  style={styles.detailsButton}
                  onPress={handlePress}
                >
                  <Text style={styles.detailsButtonText}>View Details</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.closeButton}>
                  <Ionicons name="close" size={20} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          </View>
        )}
        {/* Top Pick  */}
        {/* <View style={styles.whatsNewSection}>
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
        </View> */}
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
  suggestedItemOverlay: {
    position: "absolute",
    bottom: 30,
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
  },
  suggestionLabel: { color: "#FF4136", fontSize: 12, fontWeight: "bold" },
  suggestedTitle: { color: "#FFFFFF", fontSize: 25, fontWeight: "bold" },
  suggestedSubtitle: { color: "#AAAAAA", fontSize: 14 },
  actionButtons: { flexDirection: "row", alignItems: "center", marginTop: 10 },
  detailsButton: {
    backgroundColor: "#1E3A8A",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginRight: 10,
  },
  detailsButtonText: { color: "#FFFFFF", fontWeight: "bold", fontSize: 15 },
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
