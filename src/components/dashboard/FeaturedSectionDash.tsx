import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"

const FeaturedSectionDash = () => {
  const navigation = useNavigation()
  const mockData = {
    id: "213124123",
    category: "Comic",
    title: "Rare Spider-Man Comic",
    subtitle: "Signed by Stan Lee",
    images:
      "https://comicvine.gamespot.com/a/uploads/original/11161/111615891/9535719-cover2.jpg",
    price: 1200,
    verified: true,
    featured: true,
  }
  const handleItemPress = () => {
    if (mockData.category !== "event") {
      navigation.navigate("CollectionDetails", { itemId: mockData.id })
    } else if (mockData.category === "event") {
      navigation.navigate("Events", { eventId: mockData.id })
    }
  }
  return (
    <View style={styles.featuredImageContainer}>
      <Image source={{ uri: mockData.images }} style={styles.featuredImage} />
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
            onPress={handleItemPress}
          >
            <Text style={styles.detailsButtonText}>View Details</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.closeButton}>
            <Ionicons name="close" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
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

  // Suggested Item Overlay
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
})
export default FeaturedSectionDash
