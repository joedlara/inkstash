import React from "react"
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native"

const CategoryModal = ({ visible, onClose, onSelect }) => {
  const categories = [
    "Comics",
    "Manga/Anime",
    "Art/Drawingr",
    "Collectible Cards",
    "Video Games",
    "Figurines",
    "Clothing/Shoes",
    "Other",
  ]

  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.modalBackground}>
        <View style={styles.modalContainer}>
          <Text style={styles.headerText}>Category</Text>
          <FlatList
            data={categories}
            keyExtractor={(item) => item}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                style={[
                  styles.categoryItem,
                  index === categories.length - 1 && { borderBottomWidth: 0 },
                ]}
                onPress={() => onSelect(item)}
              >
                <Text style={styles.categoryText}>{item}</Text>
              </TouchableOpacity>
            )}
          />
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "90%",
    backgroundColor: "#1c1c1e",
    borderRadius: 10,
    paddingVertical: 10,
  },
  headerText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "left",
    paddingHorizontal: 15,
    paddingBottom: 10,
    marginTop: 5,
  },
  categoryItem: {
    paddingVertical: 12,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#3a3a3c",
  },
  categoryText: {
    color: "#fff",
    fontSize: 16,
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: "#007aff",
    borderRadius: 8,
    alignItems: "center",
    paddingVertical: 12,
    marginHorizontal: 15,
  },
  closeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default CategoryModal
