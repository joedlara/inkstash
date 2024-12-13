import React, { useEffect, useState } from "react"
import { View, StyleSheet, TouchableOpacity } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { isItemLiked, likeItem, unlikeItem } from "../api/databaseService"

const LikeButton = ({ itemId, item }) => {
  const [isLiked, setIsLiked] = useState(false)
  const [loading, setLoading] = useState(true)

  const toggleLike = async () => {
    try {
      if (isLiked) {
        await unlikeItem(itemId)
      } else {
        await likeItem(itemId, {
          title: item.title,
          price: item.price,
          images: item.images,
          category: item.category,
        })
      }
      setIsLiked(!isLiked)
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLoading(true)
    }
  }

  useEffect(() => {
    const checkLikedStatus = async () => {
      try {
        const liked = await isItemLiked(itemId)
        setIsLiked(liked)
      } catch (error) {
        console.error("Error checking liked status:", error)
      }
    }

    checkLikedStatus()
  }, [itemId])

  return (
    <TouchableOpacity style={styles.likeButtonContainer} onPress={toggleLike}>
      <Ionicons
        name={isLiked ? "heart" : "heart-outline"}
        size={18}
        color={isLiked ? "red" : "#FFFFFF"}
      />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  likeButtonContainer: {
    // backgroundColor: "#191919",
    backgroundColor: "#000000",
    borderRadius: 50,
    height: 30,
    width: 30,
    alignItems: "center",
    justifyContent: "center",
    borderColor: "grey",
    borderWidth: 0.3,
  },
})

export default LikeButton
