import { View, Text, TouchableOpacity, StyleSheet } from "react-native"
import React from "react"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

const BackButtonTop = () => {
  const navigation = useNavigation()
  return (
    <View style={styles.topBar}>
      <TouchableOpacity
        style={styles.backIcon}
        onPress={() => navigation.goBack()}
      >
        <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
      </TouchableOpacity>
      {/* <TouchableOpacity style={styles.volumesIcon}>
        <Ionicons name="heart-circle" size={30} color="#FFFFFF" />
      </TouchableOpacity> */}
    </View>
  )
}

export default BackButtonTop

const styles = StyleSheet.create({
  topBar: {
    position: "absolute",
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    // paddingVertical: 50,
    // paddingHorizontal: 20,
    zIndex: 10,
  },
  backIcon: {
    position: "absolute",
    top: 60,
    left: 20,
  },
  addIcon: {
    position: "absolute",
    top: 60,
    right: 60,
  },
  volumesIcon: {
    position: "absolute",
    top: 60,
    right: 20,
  },
})
