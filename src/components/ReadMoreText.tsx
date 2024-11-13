import React, { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet } from "react-native"

interface ReadMoreProps {
  text: string
  limit?: number
}

const ReadMoreText: React.FC<ReadMoreProps> = ({ text, limit = 30 }) => {
  const [isExpanded, setIsExpanded] = useState(false)

  // Function to clean the text by removing HTML tags and replacing entities
  const cleanText = (text: string) => {
    // Remove HTML tags
    let cleanedText = text.replace(/<\/?[^>]+(>|$)/g, "")

    // Replace HTML entities
    cleanedText = cleanedText.replace(/&amp;/g, "&")
    cleanedText = cleanedText.replace(/&lt;/g, "<")
    cleanedText = cleanedText.replace(/&gt;/g, ">")
    cleanedText = cleanedText.replace(/&quot;/g, '"')
    cleanedText = cleanedText.replace(/&#39;/g, "'")

    return cleanedText
  }

  // Clean the text before processing
  const cleanedText = cleanText(text)

  // Split the cleaned text into words and check if it exceeds the limit
  const words = cleanedText.split(" ")
  const isLongText = words.length > limit

  // Text to display based on whether it's expanded or not
  const displayText = isExpanded ? cleanedText : words.slice(0, limit).join(" ")

  return (
    <View>
      <Text style={styles.text}>
        {displayText}
        {!isExpanded && isLongText ? "..." : ""}
      </Text>
      {isLongText && (
        <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
          <Text style={styles.readMore}>
            {isExpanded ? "Show Less ^" : "Read More"}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  text: {
    color: "#FFFFFF",
    fontSize: 16,
    marginBottom: 10,
  },
  readMore: {
    color: "#6495ED",
    fontWeight: "bold",
    marginTop: 5,
  },
})

export default ReadMoreText
