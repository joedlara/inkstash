import React, { useEffect, useState } from "react"
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  TouchableOpacity,
} from "react-native"
import { fetchLiveStreams } from "../../api/databaseService"
import { LinearGradient } from "expo-linear-gradient"

const LiveStreamDash = () => {
  const [liveStreams, setLiveStreams] = useState([])

  useEffect(() => {
    const getLiveStreams = async () => {
      const streams = await fetchLiveStreams() // Fetch live streams
      setLiveStreams(streams)
    }

    getLiveStreams()
  }, [])

  // If no live streams available
  if (liveStreams.length === 0) {
    return (
      <View style={styles.offlineContainer}>
        <Text style={styles.offlineText}>
          Streams are offline at the moment
        </Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Live Streams</Text>
      <FlatList
        data={liveStreams}
        keyExtractor={(item) => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => console.log(`Joining ${item.title}`)}
          >
            <Image source={{ uri: item.thumbnail }} style={styles.thumbnail} />
            <LinearGradient
              colors={["transparent", "rgba(0,0,0,0.8)"]}
              style={styles.gradient}
            />
            <Text style={styles.liveBadge}>LIVE</Text>
            <Text style={styles.viewerCount}>{item.viewers} 🔴</Text>
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.host}>@{item.host}</Text>
          </TouchableOpacity>
        )}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 15,
    backgroundColor: "#000",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
    paddingHorizontal: 15,
  },
  offlineContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 50,
  },
  offlineText: {
    color: "#aaa",
    fontSize: 18,
    fontWeight: "bold",
  },
  card: {
    width: 150,
    marginRight: 15,
    backgroundColor: "#191919",
    borderRadius: 10,
    overflow: "hidden",
  },
  thumbnail: {
    width: "100%",
    height: 120,
  },
  gradient: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 50,
  },
  liveBadge: {
    position: "absolute",
    top: 5,
    left: 5,
    backgroundColor: "#FF4136",
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
    paddingVertical: 3,
    paddingHorizontal: 6,
    borderRadius: 5,
  },
  viewerCount: {
    position: "absolute",
    top: 5,
    right: 5,
    color: "#fff",
    fontSize: 12,
    fontWeight: "bold",
  },
  title: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#fff",
    paddingHorizontal: 5,
    marginTop: 5,
  },
  host: {
    fontSize: 12,
    color: "#aaa",
    paddingHorizontal: 5,
    paddingBottom: 5,
  },
})

export default LiveStreamDash
