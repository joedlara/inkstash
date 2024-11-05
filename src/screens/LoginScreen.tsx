import React, { useState, useEffect } from "react"
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import * as Google from "expo-auth-session/providers/google"
import { FIREBASE_AUTH } from "../config/FirebaseConfig"
import {
  signInWithCredential,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
} from "firebase/auth"
import GoogleButton from "../components/GoogleButton"

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isPasswordVisible, setIsPasswordVisible] = useState(false)

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
      navigation.replace("Dashboard") // Redirect to Dashboard on successful login
    } catch (error) {
      console.error("Email login failed:", error)
      alert("Login failed. Please check your email and password.")
    }
  }

  // Handle Google Sign-In response
  const handleGoogleSuccess = () => {
    navigation.replace("Dashboard") // Redirect to Dashboard on successful Google login
  }

  return (
    <View style={styles.container}>
      {/* Logo */}
      <Image source={require("../assets/icon.png")} style={styles.logo} />

      {/* Title */}
      <Text style={styles.title}>Log In to My Account</Text>

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
          placeholder="Username or Email"
          autoCapitalize="none"
          placeholderTextColor="#AAAAAA"
          value={email}
          onChangeText={setEmail}
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

      {/* Login Button */}
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.loginButtonText}>LOG IN</Text>
      </TouchableOpacity>

      {/* Google Login Button */}
      <GoogleButton onSuccess={handleGoogleSuccess} />

      {/* Additional Links */}
      <Text style={styles.linkText}>
        Can't remember your Username or Password?
      </Text>
      <TouchableOpacity onPress={() => navigation.navigate("RecoverAccount")}>
        <Text style={styles.linkHighlight}>Recover Your Account</Text>
      </TouchableOpacity>

      <Text style={styles.linkText}>New to Ink Stash?</Text>
      <TouchableOpacity onPress={() => navigation.navigate("Register")}>
        <Text style={styles.linkHighlight}>Create an Account</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1e1e2c",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
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
  continueButton: {
    backgroundColor: "#F57C00",
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginTop: 20,
  },
  loginButton: {
    backgroundColor: "#F57C00",
    padding: 15,
    borderRadius: 8,
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonText: {
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
  linkText: {
    color: "#AAAAAA",
    fontSize: 14,
    textAlign: "center",
  },
  linkHighlight: {
    color: "#F57C00",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 5,
    textAlign: "center",
  },
})

export default LoginScreen
