import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native"
import { Heart, MessageCircle, Share2, BookmarkPlus } from "lucide-react-native"

interface VideoControlsProps {
  videoId: string
  likes: number
  comments: number
  shares: number
  userImageUri: string
  isLiked: boolean
  isSaved: boolean
  onLike: (videoId: string) => void
  onComment: (videoId: string) => void
  onShare: () => void
  onSave: (videoId: string) => void
}

const VideoControls = ({
  videoId,
  likes,
  comments,
  shares,
  userImageUri,
  isLiked,
  isSaved,
  onLike,
  onComment,
  onShare,
  onSave,
}: VideoControlsProps) => {
  return (
    <View style={styles.rightControls}>
      <TouchableOpacity style={styles.rightControlButton} onPress={() => onLike(videoId)}>
        <Heart size={30} color={isLiked ? "#FF4D67" : "#FFFFFF"} fill={isLiked ? "#FF4D67" : "none"} />
        <Text style={styles.controlText}>{isLiked ? likes + 1 : likes}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rightControlButton} onPress={() => onComment(videoId)}>
        <MessageCircle size={30} color="#FFFFFF" />
        <Text style={styles.controlText}>{comments}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rightControlButton} onPress={onShare}>
        <Share2 size={30} color="#FFFFFF" />
        <Text style={styles.controlText}>{shares}</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.rightControlButton} onPress={() => onSave(videoId)}>
        <BookmarkPlus size={30} color={isSaved ? "#6C63FF" : "#FFFFFF"} fill={isSaved ? "#6C63FF" : "none"} />
      </TouchableOpacity>

      <View style={styles.userImageContainer}>
        <Image source={{ uri: userImageUri }} style={styles.userImageVertical} />
        <View style={styles.followButton}>
          <Text style={styles.followButtonText}>+</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  rightControls: {
    position: "absolute",
    right: 16,
    bottom: 120,
    alignItems: "center",
  },
  rightControlButton: {
    alignItems: "center",
    marginBottom: 24,
  },
  controlText: {
    color: "#FFFFFF",
    fontSize: 14,
    marginTop: 4,
  },
  userImageContainer: {
    alignItems: "center",
  },
  userImageVertical: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#FFFFFF",
  },
  followButton: {
    position: "absolute",
    bottom: -8,
    backgroundColor: "#6C63FF",
    width: 20,
    height: 20,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  followButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
})

export default VideoControls

