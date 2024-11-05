import React from "react"
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native"

const HomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icon.png")} style={styles.logo} />

      {/* App Name and Tagline */}
      <Text style={styles.appName}>INK STASH</Text>
      <Text style={styles.tagline}>
        Discover comics, manga, and collectibles
      </Text>

      {/* Buttons */}
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("Login")}
      >
        <Text style={styles.buttonText}>LOG IN</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("Register")}
      >
        <Text style={styles.buttonText}>CREATE AN ACCOUNT</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#001F3F", // Dark background color
    paddingHorizontal: 20,
  },
  logo: {
    width: 250,
    height: 200,
    marginBottom: 20,
  },
  appName: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 10,
  },
  tagline: {
    fontSize: 16,
    color: "#AAAAAA",
    textAlign: "center",
    marginBottom: 40,
  },
  loginButton: {
    backgroundColor: "#3A4BAE", // Blue color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    marginBottom: 15,
    width: "80%",
    alignItems: "center",
  },
  signupButton: {
    backgroundColor: "#F57C00", // Orange color
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "80%",
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
})

export default HomeScreen
