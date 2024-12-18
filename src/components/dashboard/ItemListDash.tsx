import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
} from "react-native"
import React, { useEffect, useState } from "react"
import { LinearGradient } from "expo-linear-gradient"
import { useNavigation } from "@react-navigation/native"
import LikeButton from "../buttons/LikeButton"
import { fetchTopPicks, fetchUsername } from "../../api/databaseService"

const ItemListDash = () => {
  const [username, setUsername] = useState("User")
  const [topPicks, setTopPicks] = useState([])
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  const handleItemPress = (item) => {
    navigation.navigate("CollectionDetails", { itemId: item.id })
  }

  useEffect(() => {
    const initializeItemList = async () => {
      try {
        setUsername(await fetchUsername())
        const picks = await fetchTopPicks()
        setTopPicks(picks)
      } catch (error) {
        console.error("Error initializing ItemList:", error)
      } finally {
        setLoading(false)
      }
    }

    initializeItemList()
  }, [])

  return (
    <View style={styles.whatsNewSection}>
      <Text style={styles.sectionTitle}>Top Picks for: {username}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        style={styles.whatsNewScroll}
      >
        {topPicks.map((item) => (
          <TouchableOpacity key={item.id} onPress={() => handleItemPress(item)}>
            <View style={styles.whatsNewItem}>
              <View style={styles.likeButton}>
                <LikeButton itemId={item.id} item={item} />
              </View>
              <Image
                source={{ uri: item?.images[0] }}
                style={styles.whatsNewImage}
              />
              <LinearGradient
                colors={["transparent", "rgb(51, 51, 51)"]}
                style={styles.whatsNewbottomFade}
              />
              <View style={styles.whatsNewOverlay}>
                <Text style={styles.whatsNewTitle}>{item.title}</Text>
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
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
  likeButton: {
    position: "absolute",
    right: 10,
    top: 5,
    zIndex: 2,
  },
})

export default ItemListDash
