import React, { useEffect, useState } from "react"
import { View, ScrollView, StyleSheet, ActivityIndicator } from "react-native"
import { useNavigation } from "@react-navigation/native"
import TopBarNav from "../components/navigationBars/TopBarNav"
import { StatusBar } from "expo-status-bar"
import ItemListDash from "../components/dashboard/ItemListDash"
import FeaturedSectionDash from "../components/dashboard/FeaturedSectionDash"

import { onSnapshot, collection, query, orderBy } from "firebase/firestore"
import { FIRESTORE_DB } from "../config/FirebaseConfig"
import LiveStreamsDash from "../components/dashboard/LiveStreamDash"

const DashboardScreen = () => {
  const [loading, setLoading] = useState(true)
  const [liveStreams, setLiveStreams] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const initializeDashboard = async () => {
      try {
        // const liveStreamsRef = collection(FIRESTORE_DB, "liveStreams")
        // const q = query(liveStreamsRef, orderBy("startTime", "asc"))
        // const unsubscribe = onSnapshot(q, (snapshot) => {
        //   const streams = snapshot.docs.map((doc) => ({
        //     id: doc.id,
        //     ...doc.data(),
        //   }))
        //   setLiveStreams(streams)
        // })
        // return () => unsubscribe()
      } catch (error) {
        console.error("Error initializing dashboard:", error)
      } finally {
        setLoading(false)
      }
    }
    initializeDashboard()
  }, [])

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        showsVerticalScrollIndicator={false}
      >
        <TopBarNav />
        {loading ? (
          <View style={styles.featuredImageContainer}>
            <ActivityIndicator style={styles.loadingCircle} color="grey" />
          </View>
        ) : (
          <FeaturedSectionDash />
        )}
        <ItemListDash />
        <LiveStreamsDash />
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { backgroundColor: "#000000", flex: 1 },
  scrollContainer: {
    backgroundColor: "#000000",
    flexGrow: 1,
    paddingBottom: 80,
  },
  featuredImageContainer: {
    position: "relative",
    height: 500,
    width: "100%",
  },
  loadingCircle: {
    width: "100%",
    height: "100%",
    transform: [{ scale: 2 }],
  },
})

export default DashboardScreen
