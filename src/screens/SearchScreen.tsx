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
import { fetchComicIssues } from "../api/comicVineService"
import { fetchMangaList } from "../api/mangaHookService" // Import the Jikan API fetcher
import { useNavigation } from "@react-navigation/native"
import TopBarNav from "../components/TopBarNav"
import { StatusBar } from "expo-status-bar"

const DashboardScreen = () => {
  const [items, setItems] = useState([]) // Combined comics and manga
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("For You")
  const navigation = useNavigation()

  const handleTabPress = (tabName: string) => {
    setActiveTab(tabName)
  }

  const handleItemPress = (item) => {
    if (item.type === "comic") {
      navigation.navigate("IssueDetails", { issueID: item.id })
    } else if (item.type === "manga") {
      navigation.navigate("MangaDetails", { mangaId: item.id })
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch comics and manga concurrently
        const [comics, manga] = await Promise.all([
          fetchComicIssues(),
          fetchMangaList(),
        ])

        // Add type metadata and merge data
        const formattedComics = comics.map((comic) => ({
          ...comic,
          type: "comic",
        }))
        const formattedManga = manga.map((mangaItem) => ({
          ...mangaItem,
          type: "manga",
        }))

        const combinedItems = [...formattedComics, ...formattedManga]
        setItems(combinedItems)
      } catch (error) {
        console.error("Error fetching data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const renderItem = (item) => (
    <TouchableOpacity
      key={item.id}
      onPress={() => handleItemPress(item)}
      style={styles.itemContainer}
    >
      <Image
        source={{
          uri: item.images?.jpg.large_image_url || item.image?.original_url,
        }}
        style={styles.itemImage}
      />
      <View style={styles.itemDetails}>
        <Text style={styles.itemTitle}>
          {item.title || item.volume?.name} #
          {item.chapters || item.issue_number}
        </Text>
        <Text style={styles.itemType}>
          {item.type === "comic" ? "Comic" : "Manga"}
        </Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <TopBarNav onTabPress={handleTabPress} activeTab={activeTab} />

      {loading ? (
        <ActivityIndicator size="large" color="cyan" />
      ) : (
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          {items.map((item) => renderItem(item))}
        </ScrollView>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  scrollContainer: {
    padding: 10,
  },
  itemContainer: {
    flexDirection: "row",
    backgroundColor: "#191919",
    marginBottom: 10,
    borderRadius: 10,
    padding: 10,
    alignItems: "center",
  },
  itemImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 10,
  },
  itemDetails: {
    flex: 1,
  },
  itemTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  itemType: {
    color: "#AAA",
    fontSize: 14,
  },
})

export default DashboardScreen
