import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/FirebaseConfig"
import {
  doc,
  setDoc,
  getDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
  updateDoc,
  serverTimestamp,
  orderBy,
} from "firebase/firestore"

export const addUserToFirestore = async (userId: string, userData: object) => {
  try {
    const userRef = doc(FIRESTORE_DB, "users", userId)
    await setDoc(userRef, userData)
  } catch (error) {
    console.error("Error adding user to Firestore: ", error)
    throw error
  }
}

export const addCollectible = async (itemData) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid
    const batch = writeBatch(FIRESTORE_DB)

    const collectiblesRef = collection(FIRESTORE_DB, "collectibles")
    const newItemRef = doc(collectiblesRef) // Generate a new document ID
    batch.set(newItemRef, {
      ...itemData,
      userId,
      likesCount: 0,
      viewsCount: 0,
      featuredScore: 0,
      createdAt: serverTimestamp(),
    })

    // Add the same item to the user's "posted_item" sub-collection
    const userPostedItemsRef = collection(
      FIRESTORE_DB,
      `users/${userId}/posted_item`
    )
    const newUserItemRef = doc(userPostedItemsRef, newItemRef.id)
    batch.set(newUserItemRef, {
      ...itemData,
      globalId: newItemRef.id,
      likesCount: 0,
      viewsCount: 0,
      featuredScore: 0,
      createdAt: serverTimestamp(),
    })
    await batch.commit()

    console.log("Item successfully added to both collections!")
    return newItemRef.id
  } catch (error) {
    console.error("Error adding collectible:", error)
    throw error
  }
}

export const getUserCollectibles = async (subCollection) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid

    const subCollectionRef = collection(
      FIRESTORE_DB,
      `users/${userId}/${subCollection}`
    )
    const q = query(subCollectionRef, orderBy("createdAt", "desc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error(`Error fetching items from ${subCollection}:`, error)
    throw error
  }
}

// Fetch item details
export const fetchItemDetails = async (itemId) => {
  try {
    const itemRef = doc(FIRESTORE_DB, "collectibles", itemId)
    const itemSnapshot = await getDoc(itemRef)
    if (itemSnapshot.exists()) {
      return itemSnapshot.data()
    } else {
      console.error("Item not found")
      return null
    }
  } catch (error) {
    console.error("Error fetching item details:", error)
    throw error
  }
}

// Fetch collectibles for "Top Picks"
export const fetchTopPicks = async () => {
  try {
    const collectiblesRef = collection(FIRESTORE_DB, "collectibles")
    const snapshot = await getDocs(collectiblesRef)

    const items = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))

    return items
  } catch (error) {
    console.error("Error fetching top picks:", error)
    throw error
  }
}

export const likeItem = async (itemId, itemDetails) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid
    const likedItemRef = doc(FIRESTORE_DB, `users/${userId}/liked_item`, itemId)
    await setDoc(likedItemRef, {
      itemId,
      title: itemDetails.title,
      images: itemDetails.images,
      price: itemDetails.price,
      category: itemDetails.category,
      createdAt: serverTimestamp(),
    })

    const globalItemRef = doc(FIRESTORE_DB, "collectibles", itemId)
    await updateDoc(globalItemRef, {
      likesCount: (await getDoc(globalItemRef)).data()?.likesCount + 1 || 1,
    })

    console.log("Item successfully liked!")
  } catch (error) {
    console.error("Error liking item:", error)
    throw error
  }
}

export const unlikeItem = async (itemId) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid

    // Remove the item from the "liked_item" sub-collection
    const likedItemRef = doc(FIRESTORE_DB, `users/${userId}/liked_item`, itemId)
    await deleteDoc(likedItemRef)

    // Decrement the likes count in the global "collectibles" collection
    const globalItemRef = doc(FIRESTORE_DB, "collectibles", itemId)
    const currentData = await getDoc(globalItemRef)

    if (currentData.exists()) {
      const currentLikes = currentData.data()?.likesCount || 0
      await updateDoc(globalItemRef, {
        likesCount: Math.max(currentLikes - 1, 0), // Ensure likesCount doesn't go below 0
      })
    }

    console.log("Item successfully unliked!")
  } catch (error) {
    console.error("Error unliking item:", error)
    throw error
  }
}

export const isItemLiked = async (itemId) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid

    // Reference to the liked item
    const likedItemRef = doc(FIRESTORE_DB, `users/${userId}/liked_item`, itemId)
    const likedItemSnapshot = await getDoc(likedItemRef)

    return likedItemSnapshot.exists()
  } catch (error) {
    console.error("Error checking if item is liked:", error)
    throw error
  }
}

// Fetch username for Dashboard
export const fetchUsername = async () => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid
    const userRef = doc(FIRESTORE_DB, "users", userId)
    const userSnapshot = await getDoc(userRef)

    if (userSnapshot.exists()) {
      return userSnapshot.data()?.username || "User"
    } else {
      console.error("User not found")
      return "User"
    }
  } catch (error) {
    console.error("Error fetching username:", error)
    throw error
  }
}

export const fetchLiveItemDetails = async (itemId) => {
  try {
    const itemRef = doc(FIRESTORE_DB, "collectibles", itemId)
    const itemSnapshot = await getDoc(itemRef)

    if (itemSnapshot.exists()) {
      return itemSnapshot.data()
    } else {
      console.error("Item not found")
      return null
    }
  } catch (error) {
    console.error("Error fetching item details:", error)
    throw error
  }
}

// Fetch LiveStreams
export const fetchLiveStreams = async () => {
  try {
    const liveStreamsRef = collection(FIRESTORE_DB, "liveStreams")
    const q = query(liveStreamsRef, orderBy("startTime", "asc"))
    const snapshot = await getDocs(q)

    return snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }))
  } catch (error) {
    console.error("Error fetching live streams:", error)
    throw error
  }
}

export const createLiveStreamSession = async (streamTitle, description) => {
  const streamKey = "your-generated-stream-key" // Dynamically retrieved

  const liveStreamRef = collection(FIRESTORE_DB, "liveStreams")
  await addDoc(liveStreamRef, {
    title: streamTitle,
    description,
    startTime: new Date(),
    rtmpURL: `rtmp://your-stream-server/app/${streamKey}`,
  })

  return streamKey
}
