import { View, Text, StyleSheet } from "react-native"
import { Music } from "lucide-react-native"

interface VideoInfoProps {
  username: string
  description: string
  songName: string
}

const VideoInfo = ({ username, description, songName }: VideoInfoProps) => {
  return (
    <View style={styles.bottomInfo}>
      <View style={styles.userInfo}>
        <Text style={styles.username}>@{username}</Text>
      </View>

      <Text style={styles.description}>{description}</Text>

      <View style={styles.songInfo}>
        <Music size={16} color="#FFFFFF" />
        <Text style={styles.songName}>{songName}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  bottomInfo: {
    padding: 16,
    paddingRight: 80, // Space for right controls
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  username: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  description: {
    color: "#FFFFFF",
    fontSize: 14,
    marginBottom: 8,
    lineHeight: 20,
  },
  songInfo: {
    flexDirection: "row",
    alignItems: "center",
  },
  songName: {
    color: "#FFFFFF",
    fontSize: 14,
    marginLeft: 8,
  },
})

export default VideoInfo

