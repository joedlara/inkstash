import { FIRESTORE_DB, FIREBASE_AUTH } from "../config/FirebaseConfig"
import {
  doc,
  setDoc,
  getDoc,
  addDoc,
  deleteDoc,
  collection,
  query,
  where,
  getDocs,
  writeBatch,
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

export const fetchUserCollection = async (userId: string) => {
  const collectionsRef = collection(FIRESTORE_DB, "favorited_item")
  const q = query(collectionsRef, where("userId", "==", userId))
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

export const fetchFavoritedItem = async (userId: string, itemId: string) => {
  const docRef = doc(FIRESTORE_DB, "favorited_item", `${userId}_${itemId}`)
  try {
    const docSnap = await getDoc(docRef)
    if (docSnap.exists()) {
      return docSnap.data()
    } else {
      console.error("No such document!")
      return null
    }
  } catch (error) {
    console.error("Error fetching favorited item:", error)
    throw error
  }
}

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

export const addCollectible = async (itemData) => {
  try {
    const currentUser = FIREBASE_AUTH.currentUser
    if (!currentUser) throw new Error("User not authenticated")

    const userId = currentUser.uid

    // Start a Firestore batch to make both writes atomic
    const batch = writeBatch(FIRESTORE_DB)

    // Add the collectible item to the global "collectibles" collection
    const collectiblesRef = collection(FIRESTORE_DB, "collectibles")
    const newItemRef = doc(collectiblesRef) // Generate a new document ID
    batch.set(newItemRef, {
      ...itemData,
      userId, // Associate the item with the user
      likesCount: 0,
      viewsCount: 0,
      featuredScore: 0,
    })

    // Add the same item to the user's "posted_item" sub-collection
    const userPostedItemsRef = collection(
      FIRESTORE_DB,
      `users/${userId}/posted_item`
    )
    const newUserItemRef = doc(userPostedItemsRef, newItemRef.id) // Use the same document ID for consistency
    batch.set(newUserItemRef, {
      ...itemData,
      globalId: newItemRef.id, // Reference to the global ID
      likesCount: 0,
      viewsCount: 0,
      featuredScore: 0,
    })

    // Commit the batch
    await batch.commit()

    console.log("Item successfully added to both collections!")
    return newItemRef.id
  } catch (error) {
    console.error("Error adding collectible:", error)
    throw error
  }
}
