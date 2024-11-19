import { FIRESTORE_DB } from "../config/FirebaseConfig"
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore"

export const toggleLikeItem = async (
  userId: string,
  item: any,
  isLiked: boolean
) => {
  const itemRef = doc(FIRESTORE_DB, "favorited_item", `${userId}_${item.id}`)

  try {
    if (isLiked) {
      console.log("Removing like")
      await deleteDoc(itemRef)
    } else {
      await setDoc(itemRef, {
        userId,
        itemId: item.id,
        name: item.name,
        type: item.type,
        imageUrl: item.imageUrl,
        liked: true,
        timestamp: new Date(),
      })
    }
  } catch (error) {
    console.error("Error toggleLikeItem:", error)
    throw error
  }
}

// Function to check if an issue is liked
export const isIssueLiked = async (userId: string, issueId: string) => {
  const issueRef = doc(FIRESTORE_DB, "likes", `${userId}_${issueId}`)
  const docSnap = await getDoc(issueRef)
  return docSnap.exists()
}

// Function to subscribe to a series
export const subscribeToSeries = async (userId: string, seriesId: string) => {
  const seriesRef = doc(FIRESTORE_DB, "subscriptions", `${userId}_${seriesId}`)
  await setDoc(seriesRef, {
    userId,
    seriesId,
    subscribed: true,
    timestamp: new Date(),
  })
}

// Function to check if a series is subscribed
export const isSeriesSubscribed = async (userId: string, seriesId: string) => {
  const seriesRef = doc(FIRESTORE_DB, "subscriptions", `${userId}_${seriesId}`)
  const docSnap = await getDoc(seriesRef)
  return docSnap.exists()
}

export const fetchUserCollection = async (userId: string) => {
  const likesRef = collection(FIRESTORE_DB, "favorited_item")
  const q = query(likesRef, where("userId", "==", userId))

  try {
    const querySnapshot = await getDocs(q)
    const data = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
    const itemsCount = data.length
    return { data, itemsCount }
  } catch (error) {
    console.error("Error fetching user collection:", error)
    return []
  }
}
