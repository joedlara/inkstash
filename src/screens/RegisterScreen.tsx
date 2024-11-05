import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
  ScrollView,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Google from "expo-auth-session/providers/google"
import { FIREBASE_AUTH } from "../config/FirebaseConfig" // Make sure Firebase is configured
import {
  createUserWithEmailAndPassword,
  signInWithCredential,
  GoogleAuthProvider,
} from "firebase/auth"
import GoogleButton from "../components/GoogleButton"

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  // Handle Google Sign-In response
  const handleGoogleSuccess = () => {
    navigation.replace("Dashboard")
  }

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
      console.log("Account created successfully!")
      // You can navigate to another screen or show a success message here
      navigation.replace("Dashboard")
    } catch (error: any) {
      if (error.code === "auth/email-already-in-use") {
        alert(
          "This email is already in use. Please use a different email or log in."
        )
      } else {
        alert("Failed to create account: " + error.message)
      }
    }
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icon.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Join the Crew</Text>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="mail-outline"
          size={24}
          color="#AAAAAA"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Email Address"
          autoCapitalize="none"
          placeholderTextColor="#AAAAAA"
          value={email}
          onChangeText={setEmail}
        />
      </View>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="person-outline"
          size={24}
          color="#AAAAAA"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Username"
          autoCapitalize="none"
          placeholderTextColor="#AAAAAA"
          value={username}
          onChangeText={setUsername}
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Ionicons
          name="lock-closed-outline"
          size={24}
          color="#AAAAAA"
          style={styles.icon}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#AAAAAA"
          secureTextEntry={!isPasswordVisible}
          autoCapitalize="none"
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity
          onPress={() => setIsPasswordVisible(!isPasswordVisible)}
        >
          <Ionicons
            name={isPasswordVisible ? "eye-off-outline" : "eye-outline"}
            size={24}
            color="#AAAAAA"
          />
        </TouchableOpacity>
      </View>

      {/* Create Account Button */}
      <TouchableOpacity
        style={styles.createAccountButton}
        onPress={handleSignUp}
      >
        <Text style={styles.buttonText}>CREATE MY ACCOUNT</Text>
      </TouchableOpacity>

      {/* Google Sign-Up Button */}
      <GoogleButton onSuccess={handleGoogleSuccess} />

      {/* Terms and Conditions */}
      <Text style={styles.termsText}>
        By creating an account, you agree to our{" "}
        <Text style={styles.linkHighlight}>Terms and Conditions of Use</Text>.
      </Text>

      {/* Already have an account link */}
      <Text style={styles.linkText}>Already have an account?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Login")}>
        <Text style={styles.linkHighlight}>Log In</Text>
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#1e1e2c",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 30,
    textAlign: "center",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#333",
    borderRadius: 8,
    width: "100%",
    paddingHorizontal: 10,
    paddingVertical: 12,
    marginBottom: 15,
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    color: "#FFFFFF",
  },
  createAccountButton: {
    backgroundColor: "#F57C00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  buttonText: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: 16,
  },
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
  termsText: {
    color: "#AAAAAA",
    fontSize: 12,
    textAlign: "center",
    marginBottom: 20,
  },
  linkText: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
  },
  linkHighlight: {
    color: "#F57C00",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
})

export default RegisterScreen
