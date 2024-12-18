import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
  TouchableWithoutFeedback,
  Button,
} from "react-native"
import {
  CameraView,
  CameraType,
  useCameraPermissions,
  Camera,
} from "expo-camera"
import { LinearGradient } from "expo-linear-gradient"
import CategoryModal from "../components/buttons/CategoryModal"

const GoLiveScreen = ({ navigation }) => {
  const [facing, setFacing] = useState<CameraType>("back")
  const [permission, setPermission] = useCameraPermissions()
  const [streamTitle, setStreamTitle] = useState("")
  const [category, setCategory] = useState("")
  const [thumbnailURL, setThumbnailURL] = useState("")
  const [startTime, setStartTime] = useState("Immediate")
  const [modalVisible, setModalVisible] = useState(false)

  const selectCategory = (selectedCategory: string) => {
    setCategory(selectedCategory)
    setModalVisible(false)
  }

  if (!permission) {
    // Camera permissions are still loading.
    return <View />
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet.
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <Button onPress={setPermission} title="grant permission" />
      </View>
    )
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === "back" ? "front" : "back"))
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <CameraView style={styles.camera}>
          <LinearGradient
            colors={["rgba(0, 0, 0, 0.6)", "transparent", "rgba(0, 0, 0, 0.8)"]}
            style={styles.overlay}
          />

          <ScrollView
            contentContainerStyle={{ flexGrow: 1 }}
            keyboardShouldPersistTaps="handled"
          >
            {/* Input Details Overlay */}
            <View style={styles.inputContainer}>
              <Text style={styles.header}>Create Your Live Stream</Text>

              <Text style={styles.label}>Stream Title</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter stream title"
                placeholderTextColor="#ccc"
                value={streamTitle}
                onChangeText={setStreamTitle}
              />

              <Text style={styles.label}>Category</Text>
              <TouchableOpacity
                style={styles.dropdown}
                onPress={() => setModalVisible(true)}
              >
                <Text style={styles.dropdownText}>
                  {category ? category : "Select a category"}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.button}
                onPress={() =>
                  navigation.navigate("PreviewLiveScreen", {
                    streamTitle,
                    category,
                    startTime,
                    thumbnailURL,
                  })
                }
              >
                <Text style={styles.buttonText}>Go Live</Text>
              </TouchableOpacity>
            </View>
            <CategoryModal
              visible={modalVisible}
              onClose={() => setModalVisible(false)}
              onSelect={selectCategory}
            />
          </ScrollView>
        </CameraView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  camera: { flex: 1, justifyContent: "center" },
  overlay: {
    ...StyleSheet.absoluteFillObject,
  },
  inputContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  label: {
    fontSize: 16,
    color: "#ddd",
    marginVertical: 5,
  },
  input: {
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    color: "#fff",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    fontSize: 15,
  },
  multiline: { height: 60, textAlignVertical: "top" },
  button: {
    backgroundColor: "#1E90FF",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  noAccessContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  noAccessText: { color: "#fff", fontSize: 18 },
  message: {
    textAlign: "center",
    paddingBottom: 10,
  },
  dropdown: {
    backgroundColor: "#1c1c1c",
    padding: 15,
    borderRadius: 5,
    marginBottom: 20,
  },
  dropdownText: {
    color: "#ccc",
    fontSize: 15,
  },
})

export default GoLiveScreen
