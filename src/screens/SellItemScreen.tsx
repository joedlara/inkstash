import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Modal,
  FlatList,
  Image,
} from "react-native"
import { addCollectible } from "../api/databaseService"
import * as ImagePicker from "expo-image-picker"
import BackButtonTop from "../components/BackButtonTop"
import { Ionicons } from "@expo/vector-icons"

const SellItemScreen = ({ navigation }) => {
  const [images, setImages] = useState([])
  const [title, setTitle] = useState("")
  const [category, setCategory] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] = useState("")
  const [modalVisible, setModalVisible] = useState(false)
  const [hasCameraPermission, setHasCameraPermission] = useState(false)
  const [hasLibraryPermission, setHasLibraryPermission] = useState(false)

  const categories = [
    "Comic",
    "Manga/Anime",
    "Art",
    "Collectible Cards",
    "Video Games",
    "Figurines",
    "Clothing/Shoes",
    "Other",
  ]

  // Request permissions on component mount
  useEffect(() => {
    ;(async () => {
      const cameraStatus = await ImagePicker.requestCameraPermissionsAsync()
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync()

      setHasCameraPermission(cameraStatus.status === "granted")
      setHasLibraryPermission(libraryStatus.status === "granted")
    })()
  }, [])

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory)
    setModalVisible(false)
  }

  // Function to pick images
  const pickImage = async () => {
    if (!hasLibraryPermission) {
      Alert.alert(
        "Permission Required",
        "You need to enable photo library access to upload images."
      )
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
      quality: 1,
    })
    if (!result.canceled) {
      const selectedImages = result.assets.map((asset) => asset.uri)
      setImages((prevImages) => [...prevImages, ...selectedImages])
    }
  }

  const editImages = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsMultipleSelection: true,
      quality: 1,
    })

    if (!result.canceled) {
      const newImages = result.assets.map((asset) => asset.uri)
      setImages((prevImages) => [...prevImages, ...newImages])
    }
  }

  const removeImage = (indexToRemove) => {
    setImages((prevImages) =>
      prevImages.filter((_, index) => index !== indexToRemove)
    )
  }

  // Function to take a photo
  const takePhoto = async () => {
    if (!hasCameraPermission) {
      Alert.alert(
        "Permission Required",
        "You need to enable camera access to take photos."
      )
      return
    }
    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: "images",
      quality: 1,
    })
    if (!result.canceled) {
      setImages((prevImages) => [...prevImages, result.assets[0].uri])
    }
  }

  const handleSubmit = async () => {
    if (!title || !category || !price || !description || !images) {
      Alert.alert("Error", "All fields are required")
      return
    }

    const itemData = {
      title,
      category,
      price: parseFloat(price),
      description,
      images,
      createdAt: new Date(),
    }

    try {
      await addCollectible(itemData)
      Alert.alert("Success", "Item added successfully!")
      navigation.goBack()
    } catch (error) {
      Alert.alert("Error", "Could not add item")
    }
  }

  return (
    <View style={styles.container}>
      <BackButtonTop />
      <Text style={styles.header}>Create a Listing</Text>
      <View style={styles.photosContainer}>
        {images.length === 0 ? (
          // Render upload and take photo buttons if no images are selected
          <>
            <TouchableOpacity style={styles.photoButton} onPress={pickImage}>
              <Text style={styles.photoButtonText}>Upload photos</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.photoButton} onPress={takePhoto}>
              <Text style={styles.photoButtonText}>Take photos</Text>
            </TouchableOpacity>
          </>
        ) : (
          // Render selected images with a "main" tag
          <>
            <FlatList
              data={images}
              horizontal
              keyExtractor={(item, index) => index.toString()}
              renderItem={({ item, index }) => (
                <View style={styles.imageWrapper}>
                  <Image source={{ uri: item }} style={styles.image} />
                  {index === 0 && <Text style={styles.mainTag}>Main</Text>}
                  <TouchableOpacity
                    style={styles.removeButton}
                    onPress={() => removeImage(index)}
                  >
                    <Ionicons name="close-circle" size={28} color="#FFFFFF" />
                  </TouchableOpacity>
                </View>
              )}
            />
            <TouchableOpacity style={styles.editButton} onPress={editImages}>
              <Text style={styles.editButtonText}>Edit</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        placeholderTextColor="#ccc"
        placeholderTextSize={16}
        value={title}
        onChangeText={setTitle}
      />
      <TouchableOpacity
        style={styles.dropdown}
        onPress={() => setModalVisible(true)}
      >
        <Text style={styles.dropdownText}>
          {category ? category : "Select a category"}
        </Text>
      </TouchableOpacity>
      <TextInput
        style={styles.input}
        placeholder="Price"
        placeholderTextColor="#ccc"
        keyboardType="numeric"
        value={price}
        onChangeText={setPrice}
      />
      <TextInput
        style={[styles.input, styles.textArea]}
        placeholder="Description"
        placeholderTextColor="#ccc"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Submit</Text>
      </TouchableOpacity>
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalHeader}>Category</Text>
            <FlatList
              data={categories}
              keyExtractor={(item) => item}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.categoryItem}
                  onPress={() => selectCategory(item)}
                >
                  <Text style={styles.categoryText}>{item}</Text>
                </TouchableOpacity>
              )}
            />
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: "#000",
  },
  header: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    marginTop: 40,
  },
  photosContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  photoButton: {
    backgroundColor: "#1c1c1c",
    padding: 20,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    width: 100,
    height: 100,
  },
  photoButtonText: {
    color: "#fff",
    fontSize: 14,
    textAlign: "center",
  },
  imageWrapper: {
    position: "relative",
    marginRight: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
  },
  mainTag: {
    position: "absolute",
    bottom: 5,
    left: 5,
    backgroundColor: "#FFD700",
    color: "#000",
    fontSize: 14,
    padding: 4,
    borderRadius: 3,
  },
  editButton: {
    margin: 10,
    padding: 10,
    backgroundColor: "#FFD700",
    borderRadius: 5,
    alignItems: "center",
  },
  editButtonText: {
    color: "#000",
    fontSize: 14,
    fontWeight: "bold",
  },
  input: {
    backgroundColor: "#1c1c1c",
    color: "#fff",
    padding: 18,
    borderRadius: 5,
    marginBottom: 15,
    fontSize: 18,
  },
  textArea: {
    height: 100,
  },
  submitButton: {
    backgroundColor: "#6495ED",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  submitButtonText: {
    color: "#000",
    fontSize: 16,
    fontWeight: "bold",
  },
  dropdown: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownText: {
    color: "#ccc",
    fontSize: 18,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#1c1c1c",
    margin: 20,
    borderRadius: 8,
    padding: 20,
  },
  modalHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  categoryItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 15,
    padding: 10,
    backgroundColor: "#1E90FF",
    borderRadius: 5,
    alignItems: "center",
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },

  removeButton: {
    position: "absolute",
    top: 5,
    right: 5,
    padding: 5,
    borderRadius: 3,
  },
  removeText: {
    color: "#fff",
    fontSize: 10,
  },
})

export default SellItemScreen
