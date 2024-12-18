import React from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import auth from "@react-native-firebase/auth"
import { FIREBASE_AUTH } from "../config/FirebaseConfig"
import BackButtonTop from "../components/navigationBars/BackButtonTop"

const UserSettingsScreen = ({ navigation }) => {
  const handleLogout = async () => {
    try {
      await FIREBASE_AUTH.signOut() // Firebase logout
      navigation.reset({
        index: 0,
        routes: [{ name: "LoginScreen" }], // Redirect to login
      })
    } catch (error) {
      console.error("Error logging out: ", error)
      alert("An error occurred while logging out. Please try again.")
    }
  }

  return (
    <View style={styles.container}>
      <BackButtonTop />
      <Text style={styles.title}>Settings</Text>
      <View style={styles.logout}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Text style={styles.logoutText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000", // Example for dark theme
    paddingVertical: 60,
  },
  logout: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    color: "#FFF",
    left: 100,
  },
  logoutButton: {
    backgroundColor: "#1E3A8A", // Action button color
    padding: 15,
    borderRadius: 8,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 16,
  },
})

export default UserSettingsScreen
