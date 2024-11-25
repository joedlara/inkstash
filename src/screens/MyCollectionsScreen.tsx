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
import {
  fetchUserCollection,
  getUserCollectibles,
} from "../api/databaseService"
import { useNavigation } from "@react-navigation/native"

const MyCollectionsScreen = ({ userId }) => {
  const [collection, setCollection] = useState([])
  const [itemsCount, setItemsCount] = useState(0)
  const [readCount, setReadCount] = useState(0)
  const [wantedCount, setWantedCount] = useState(0)
  const [tab, setTab] = useState("liked") // "liked" or "myListings"
  const [likedItems, setLikedItems] = useState([])
  const [myListings, setMyListings] = useState([])
  const navigation = useNavigation()

  useEffect(() => {
    const fetchData = async () => {
      const { data, itemsCount } = await fetchUserCollection(userId)
      setCollection(data)
      setItemsCount(itemsCount)
    }
    if (tab === "myListings") {
      getUserCollectibles()
        .then(setMyListings)
        .catch((error) => console.error(error))
    }

    fetchData()
  }, [])

  const handleItemPress = (item: string) => {
    navigation.navigate("CollectionDetails", {
      userId,
      itemId: item.itemId,
    })
  }

  const renderItem = ({ item }) => (
    <TouchableOpacity
      onPress={() => handleItemPress(item)}
      style={styles.itemContainer}
    >
      <Image source={{ uri: item.imageUrl }} style={styles.itemImage} />
      <View style={styles.itemDetails}>
        <Text style={styles.itemName}>{item.name}</Text>
        <Text style={styles.itemType}>{item.type}</Text>
      </View>
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
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{itemsCount}</Text>
            <Text style={styles.statLabel}>LIKED</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{readCount}</Text>
            <Text style={styles.statLabel}>BOUGHT</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>{wantedCount}</Text>
            <Text style={styles.statLabel}>ON SALE</Text>
          </View>
        </View>
      </View>

      <FlatList
        data={collection}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>No items in your collection yet.</Text>
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
})

export default MyCollectionsScreen
