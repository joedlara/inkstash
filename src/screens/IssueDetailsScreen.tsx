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
  const { issueID, volumeID } = route.params

  const scrollY = useRef(new Animated.Value(0)).current

  // Interpolations for fading out and translating the hero section
  const translateY = scrollY.interpolate({
    inputRange: [0, 200],
    outputRange: [0, -200], // Move up as you scroll
    extrapolate: "clamp",
  })

  const opacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0], // Fade out as you scroll
    extrapolate: "clamp",
  })

  useEffect(() => {
    const getIssueDetails = async () => {
      try {
        const issueData = await fetchIssueDetails(issueID)
        // const volumeData = await fetchIssueVolumes(volumeID)
        setIssue(issueData)
        // setVolume(volumeData)
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
            <Animated.View
              style={
                (styles.heroImageContainer,
                { transform: [{ translateY }], opacity })
              }
            >
              <Image
                source={{ uri: issue.image?.original_url }} // Replace with dynamic image URL
                style={styles.heroImage}
              />
              <LinearGradient
                colors={["rgb(0, 0, 0)", "transparent"]}
                style={styles.topFade}
              />

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

              <View style={styles.detailsContainer}>
                <Text style={styles.title}>
                  {issue.volume?.name} #{issue.issue_number}
                </Text>
                <Text style={styles.subtitle}>
                  Publisher • {moment(issue.store_date).format("MMM DD, YYYY")}
                </Text>
              </View>
            </Animated.View>

            <Animated.ScrollView
              contentContainerStyle={styles.scrollContent}
              showsVerticalScrollIndicator={false}
              onScroll={Animated.event(
                [{ nativeEvent: { contentOffset: { y: scrollY } } }],
                { useNativeDriver: false }
              )}
              scrollEventThrottle={16}
            >
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
                    <ReadMoreText text={issue.description} limit={20} />
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
              <Text style={styles.paragraph}>
                This is a ScrollView example paragraph.
              </Text>
              <Text style={styles.paragraph}>
                This is a ScrollView example paragraph.
              </Text>
              <Text style={styles.paragraph}>
                This is a ScrollView example paragraph.
              </Text>
              <Text style={styles.paragraph}>
                This is a ScrollView example paragraph.
              </Text>
              <Text style={styles.paragraph}>
                This is a ScrollView example paragraph.
              </Text>
            </Animated.ScrollView>
          </>
        )}
      </>
    </View>
  )
}

const styles = StyleSheet.create({
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "white",
  },
  container: {
    flex: 1,
    backgroundColor: "#000000", // Background color for dark theme
  },
  heroImageContainer: {
    position: "absolute",
    width: "100%",
    zIndex: 1,
    paddingTop: 40,
    paddingHorizontal: 20,
    paddingBottom: 10,
    backgroundColor: "#1E3A8A",
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
    height: "60%",
  },
  backIcon: {
    position: "absolute",
    top: 60, // Adjust for padding if needed
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
  // tabsContainer: {
  //   flexDirection: "row",
  //   justifyContent: "space-around",
  //   marginVertical: 15,
  // },
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
  descriptionContainer: {
    // flex: 1,
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
    // backgroundColor: "rgba(0, 0, 0, 0.9)",
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
})

export default IssueDetailsScreen
