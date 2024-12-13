import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  StyleSheet,
  StatusBar,
} from "react-native"
import { getUserCollectibles } from "../api/databaseService"
import { useNavigation } from "@react-navigation/native"
import LikeButton from "../components/LikeButton"

const MyCollectionsScreen = ({ userId }) => {
  const [tab, setTab] = useState("liked") // Current tab ("liked", "bought", "onSale")
  const [items, setItems] = useState([]) // Current tab data
  const [counts, setCounts] = useState({
    liked: 0,
    bought: 0,
    onSale: 0,
  })
  const navigation = useNavigation()

  // Fetch item counts for all tabs once on mount
  useEffect(() => {
    const fetchCounts = async () => {
      try {
        const likedCount = (await getUserCollectibles("liked_item")).length
        const boughtCount = (await getUserCollectibles("bought_item")).length
        const onSaleCount = (await getUserCollectibles("posted_item")).length

        setCounts({
          liked: likedCount,
          bought: boughtCount,
          onSale: onSaleCount,
        })
      } catch (error) {
        console.error("Error fetching counts:", error)
      }
    }

    fetchCounts()
  }, [])

  // Fetch data for the active tab
  useEffect(() => {
    const fetchData = async () => {
      try {
        let data
        switch (tab) {
          case "liked":
            data = await getUserCollectibles("liked_item")
            break
          case "bought":
            data = await getUserCollectibles("bought_item")
            break
          case "onSale":
            data = await getUserCollectibles("posted_item")
            break
          default:
            data = []
        }
        setItems(data)
      } catch (error) {
        console.error("Error fetching collectibles:", error)
      }
    }

    fetchData()
  }, [tab])

  // Handle navigation to the details screen
  const handleItemPress = (item) => {
    navigation.navigate("CollectionDetails", {
      userId,
      itemId: item.itemId,
    })
  }

  // Render an item in the list
  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item)}
      style={styles.itemContainer}
      key={item.id}
    >
      <Image source={{ uri: item?.images[0] }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.title}</Text>
        <Text style={styles.itemType}>{item.category}</Text>
        <Text style={styles.itemType}>${item.price}</Text>
      </View>
      {tab === "liked" && (
        <View style={styles.likeButton}>
          <LikeButton itemId={item.id} item={item} />
        </View>
      )}
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      {/* Header Section */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Collection</Text>
        <Text style={styles.headerSubtitle}>
          Track your collection and reading
        </Text>
        <View style={styles.statsContainer}>
          <TouchableOpacity
            style={[styles.statBox, tab === "liked" && styles.activeTab]}
            onPress={() => setTab("liked")}
          >
            <Text style={styles.statNumber}>{counts.liked}</Text>
            <Text style={styles.statLabel}>LIKED</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statBox, tab === "bought" && styles.activeTab]}
            onPress={() => setTab("bought")}
          >
            <Text style={styles.statNumber}>{counts.bought}</Text>
            <Text style={styles.statLabel}>BOUGHT</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.statBox, tab === "onSale" && styles.activeTab]}
            onPress={() => setTab("onSale")}
          >
            <Text style={styles.statNumber}>{counts.onSale}</Text>
            <Text style={styles.statLabel}>ON SALE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Content Section */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in this category yet.</Text>
        }
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 30,
  },
  header: {
    padding: 20,
    backgroundColor: "#000000",
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    color: "#FFFFFF",
    fontSize: 32,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#AAAAAA",
    fontSize: 16,
    marginBottom: 20,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
  statBox: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#191919",
    height: 80,
    width: 90,
    borderRadius: 10,
  },
  activeTab: {
    borderWidth: 2,
    borderColor: "#6495ED",
  },
  statNumber: {
    color: "#6495ED",
    fontSize: 24,
    fontWeight: "bold",
  },
  statLabel: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#191919",
    marginBottom: 10,
    borderRadius: 10,
  },
  itemImage: {
    width: 60,
    height: 90,
    borderRadius: 8,
    marginRight: 15,
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
  itemType: {
    color: "#AAAAAA",
    fontSize: 14,
  },
  emptyText: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 20,
  },
  likeButton: {
    // borderColor: "white",
    // borderWidth: 1,
    padding: 10,
  },
})

export default MyCollectionsScreen
