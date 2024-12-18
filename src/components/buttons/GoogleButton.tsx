import React from "react"
import { TouchableOpacity, Text, StyleSheet, Image } from "react-native"
import * as Google from "expo-auth-session/providers/google"
import { FIREBASE_AUTH } from "../../config/FirebaseConfig"
import { signInWithCredential, GoogleAuthProvider } from "firebase/auth"
import { Ionicons } from "@expo/vector-icons"

interface GoogleButtonProps {
  onSuccess: () => void // Callback to navigate to Dashboard on successful login
}

const GoogleButton: React.FC<GoogleButtonProps> = ({ onSuccess }) => {
  const [request, response, promptAsync] = Google.useIdTokenAuthRequest({
    clientId:
      "724550824489-gkkb1odaggi1pu43757b5410d0vn2q40.apps.googleusercontent.com",
    redirectUri: "https://auth.expo.io/@jlara18/Inkstash",
  })

  React.useEffect(() => {
    if (response?.type === "success") {
      const { id_token } = response.params
      const credential = GoogleAuthProvider.credential(id_token)
      signInWithCredential(FIREBASE_AUTH, credential)
        .then(onSuccess)
        .catch((error) => console.error("Google Sign-In failed:", error))
    }
  }, [response])

  return (
    <TouchableOpacity style={styles.googleButton} onPress={() => promptAsync()}>
      <Ionicons
        name="logo-google"
        size={20}
        color="#FFFFFF"
        style={{ marginRight: 10 }}
      />
      <Text style={styles.googleButtonText}>Sign up with Google</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  googleButton: {
    flexDirection: "row",
    backgroundColor: "#4285F4",
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 15,
    marginBottom: 30,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  logo: { width: 20, height: 20, marginRight: 10 },
  text: { color: "#FFFFFF", fontSize: 16, fontWeight: "bold" },
})

export default GoogleButton
