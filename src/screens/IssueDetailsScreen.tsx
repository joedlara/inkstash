import React, { useEffect, useRef, useState } from "react"
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Modal,
  Animated,
  StatusBar,
} from "react-native"
import { useRoute } from "@react-navigation/native"

import { fetchIssueDetails, fetchIssueVolumes } from "../api/comicVineService"
import { Ionicons } from "@expo/vector-icons"
import { useNavigation } from "@react-navigation/native"
import { NativeStackNavigationProp } from "@react-navigation/native-stack"

import { LinearGradient } from "expo-linear-gradient"
import moment from "moment"
import ReadMoreText from "../components/ReadMoreText"

const IssueDetailsScreen = ({ navigation }) => {
  const route = useRoute()
  const [issue, setIssue] = useState([])
  const [volume, setVolume] = useState([])
  const [loading, setLoading] = useState(true)
  const [isModalVisible, setModalVisible] = useState(false)
  const [activeTab, setActiveTab] = useState("Overview")
  const { issueID } = route.params

  const scrollY = useRef(new Animated.Value(0)).current

  // Interpolations for fading out and translating the hero section
  const heroTranslateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -100],
    extrapolate: "clamp",
  })

  const heroOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0],
    extrapolate: "clamp",
  })

  // Interpolations for showing the sticky header with title and buttons
  const stickyHeaderOpacity = scrollY.interpolate({
    inputRange: [120, 160],
    outputRange: [0, 1],
    extrapolate: "clamp",
  })

  useEffect(() => {
    const getIssueDetails = async () => {
      try {
        const issueData = await fetchIssueDetails(issueID)
        setIssue(issueData)
      } catch (error) {
        console.error("Error fetching issue details:", error)
      } finally {
        setLoading(false)
      }
    }

    getIssueDetails()
  }, [issueID])

  return (
    <View style={styles.container}>
      <>
        {loading ? (
          <View>
            <Text>you got to wait homie</Text>
          </View>
        ) : (
          <>
            <View style={styles.topBar}>
              <TouchableOpacity
                style={styles.backIcon}
                onPress={() => navigation.goBack()}
              >
                <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
              </TouchableOpacity>
              <TouchableOpacity style={styles.addIcon}>
                <Ionicons name="add-circle-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>

              <TouchableOpacity style={styles.volumesIcon}>
                <Ionicons name="albums-outline" size={28} color="#FFFFFF" />
              </TouchableOpacity>
            </View>
            <Animated.ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
              {/* Section 1: Hero Image/Details Container */}
              <Animated.View
                style={[
                  styles.heroContainer,
                  {
                    opacity: heroOpacity,
                    transform: [{ translateY: heroTranslateY }],
                  },
                ]}
              >
                <Image
                  source={{ uri: issue.image?.original_url }}
                  style={styles.heroImage}
                />
                <LinearGradient
                  colors={["rgb(0, 0, 0)", "transparent"]}
                  style={styles.topFade}
                />
                <View style={styles.detailsContainer}>
                  <Text style={styles.title}>
                    {issue.volume?.name} #{issue.issue_number}
                  </Text>

                  <Text style={styles.subtitle}>
                    On Sale • {moment(issue.store_date).format("MMM DD, YYYY")}
                  </Text>
                </View>
              </Animated.View>

              {/* Section 3: Tabs */}
              <View style={styles.tabsContainer}>
                {["Overview", "My Details", "Reviews", "Discuss"].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={styles.tabItem}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.activeTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                    {activeTab === tab && <View style={styles.underline} />}
                  </TouchableOpacity>
                ))}
              </View>
              {/* Pull Button */}
              <View style={styles.pullButtonContainer}>
                <TouchableOpacity style={styles.pullButton}>
                  <Text style={styles.pullButtonText}>PULL</Text>
                </TouchableOpacity>
              </View>

              {/* Section 4: Description and Small Cover Image */}
              <View style={styles.descriptionContainer}>
                <View style={styles.descriptionRow}>
                  {/* Description Text */}
                  <Text style={styles.description}>
                    <ReadMoreText text={issue?.description} limit={20} />
                  </Text>
                  {/* Smaller Cover Image */}
                  <TouchableOpacity onPress={() => setModalVisible(true)}>
                    <Image
                      source={{ uri: issue.image?.original_url }}
                      style={styles.smallCover}
                    />
                  </TouchableOpacity>
                </View>
              </View>

              {/* Section 5: Full-Page Image Modal */}
              <Modal
                visible={isModalVisible}
                transparent={true}
                animationType="fade"
              >
                <TouchableOpacity
                  style={styles.modalContainer}
                  onPress={() => setModalVisible(false)}
                >
                  <Image
                    source={{ uri: issue.image?.original_url }}
                    style={styles.fullCover}
                  />
                </TouchableOpacity>
              </Modal>
            </Animated.ScrollView>

            {/* Section 2: Icon row */}
            <Animated.View
              style={[styles.stickyHeader, { opacity: stickyHeaderOpacity }]}
            >
              <View style={styles.iconRow}>
                <TouchableOpacity
                  style={styles.icon}
                  onPress={() => navigation.goBack()}
                >
                  <Ionicons name="chevron-back" size={28} color="#FFFFFF" />
                </TouchableOpacity>
                <Text
                  style={styles.stickyTitle}
                  numberOfLines={1} // Truncate the title to one line with ellipsis
                  ellipsizeMode="tail"
                >
                  {issue.volume?.name} #{issue.issue_number}
                </Text>

                <TouchableOpacity style={styles.icon}>
                  <Ionicons
                    name="add-circle-outline"
                    size={28}
                    color="#FFFFFF"
                  />
                </TouchableOpacity>

                <TouchableOpacity style={styles.icon}>
                  <Ionicons name="albums-outline" size={28} color="#FFFFFF" />
                </TouchableOpacity>
              </View>

              <View style={styles.tabsContainer}>
                {["Overview", "My Details", "Reviews", "Discuss"].map((tab) => (
                  <TouchableOpacity
                    key={tab}
                    style={styles.tabItem}
                    onPress={() => setActiveTab(tab)}
                  >
                    <Text
                      style={[
                        styles.tabText,
                        activeTab === tab && styles.activeTabText,
                      ]}
                    >
                      {tab}
                    </Text>
                    {activeTab === tab && <View style={styles.underline} />}
                  </TouchableOpacity>
                ))}
              </View>
            </Animated.View>
          </>
        )}
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000", // Background color for dark theme
  },
  heroContainer: {
    height: 300,
    alignItems: "center",
    justifyContent: "center",
  },
  heroImage: {
    width: "100%",
    height: 300,
    resizeMode: "cover",
  },
  topFade: {
    position: "absolute",
    top: 0,
    width: "100%",
    height: "40%",
  },
  detailsContainer: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: "#191919c8", // To separate from hero section
  },
  title: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitle: {
    color: "#c8c8c8",
    fontSize: 16,
    marginTop: 5,
  },
  tabsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    paddingTop: 10,
    backgroundColor: "#191919",
    borderTopWidth: 1,
    borderTopColor: "#333333",
  },
  tabItem: {
    alignItems: "center",
    flex: 1,
  },
  tabText: {
    color: "#A0A0A0",
    fontSize: 16,
    paddingVertical: 8,
  },
  activeTabText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  underline: {
    height: 2,
    backgroundColor: "#1E3A8A",
    width: "100%",
    marginTop: 5,
  },
  descriptionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  description: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 15,
    marginRight: 20,
    margin: 10,
  },
  pullButtonContainer: {
    borderTopColor: "grey",
    borderBottomColor: "grey",
    borderWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
  },
  pullButton: {
    backgroundColor: "#1E3A8A",
    alignSelf: "left",
    marginLeft: 20,
    paddingVertical: 7,
    paddingHorizontal: 20,
    borderRadius: 25,
  },
  pullButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "bold",
  },
  smallCover: {
    width: 100,
    height: 150,
    borderRadius: 3,
    marginRight: 15,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
    alignItems: "center",
  },
  fullCover: {
    width: "90%",
    height: "80%",
    resizeMode: "contain",
  },
  scrollContent: {
    paddingBottom: 50,
  },
  stickyHeader: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    paddingTop: 60,
    paddingHorizontal: 15,
    backgroundColor: "#191919",
    zIndex: 10,
    elevation: 10, // For Android
  },
  iconRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    padding: 5,
  },
  stickyTitle: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    flex: 1,
  },
  topBar: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 50,
    paddingHorizontal: 20,
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

export default IssueDetailsScreen
