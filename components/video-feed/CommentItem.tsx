"use client"

import { useRef } from "react"
import { View, Text, StyleSheet, Image, TouchableOpacity, Animated } from "react-native"
import { Heart } from "lucide-react-native"

interface CommentItemProps {
  id: string
  user: {
    username: string
    name: string
    imageUri: string
  }
  text: string
  time: string
  likes: number
  isLiked: boolean
  onLike: (commentId: string) => void
}

const CommentItem = ({ id, user, text, time, likes, isLiked, onLike }: CommentItemProps) => {
  const heartScale = useRef(new Animated.Value(1)).current

  const handleLike = () => {
    if (!isLiked) {
      Animated.sequence([
        Animated.timing(heartScale, {
          toValue: 1.5,
          duration: 150,
          useNativeDriver: true,
        }),
        Animated.timing(heartScale, {
          toValue: 1,
          duration: 150,
          useNativeDriver: true,
        }),
      ]).start()
    }
    onLike(id)
  }

  return (
    <View style={styles.commentItem}>
      <Image source={{ uri: user.imageUri }} style={styles.commentUserImage} />
      <View style={styles.commentContent}>
        <Text style={styles.commentUsername}>{user.name}</Text>
        <Text style={styles.commentText}>{text}</Text>
        <View style={styles.commentFooter}>
          <Text style={styles.commentTime}>{time}</Text>
          <TouchableOpacity style={styles.commentLikeButton} onPress={handleLike}>
            <Text style={styles.commentLikeText}>Thích</Text>
            <Animated.View style={{ transform: [{ scale: heartScale }] }}>
              <Heart
                size={12}
                color={isLiked ? "#FF4D67" : "#8A8A8A"}
                fill={isLiked ? "#FF4D67" : "none"}
                style={styles.commentLikeIcon}
              />
            </Animated.View>
            <Text style={[styles.commentLikesCount, isLiked && styles.commentLikesCountActive]}>
              {isLiked ? likes + 1 : likes}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  commentItem: {
    flexDirection: "row",
    marginBottom: 20,
  },
  commentUserImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  commentContent: {
    flex: 1,
  },
  commentUsername: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 4,
  },
  commentText: {
    color: "#FFFFFF",
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 6,
  },
  commentFooter: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentTime: {
    color: "#8A8A8A",
    fontSize: 12,
    marginRight: 16,
  },
  commentLikeButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  commentLikeText: {
    color: "#8A8A8A",
    fontSize: 12,
    marginRight: 4,
  },
  commentLikeIcon: {
    marginRight: 4,
  },
  commentLikesCount: {
    color: "#8A8A8A",
    fontSize: 12,
  },
  commentLikesCountActive: {
    color: "#FF4D67",
  },
})

export default CommentItem

