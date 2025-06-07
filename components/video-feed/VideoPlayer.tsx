"use client"

import { Video } from "expo-av"
import { Play } from "lucide-react-native"
import { useRef, useState } from "react"
import { ActivityIndicator, Dimensions, Platform, StyleSheet, TouchableOpacity, View } from "react-native"

const { width, height } = Dimensions.get("window")

interface VideoPlayerProps {
  videoUri: string
  videoId: string
  isActive: boolean
  isPlaying: boolean
  onPlayPause: () => void
  onVideoLoad: (videoId: string) => void
  onVideoError: (videoId: string) => void
}

const VideoPlayer = ({
  videoUri,
  videoId,
  isActive,
  isPlaying,
  onPlayPause,
  onVideoLoad,
  onVideoError,
}: VideoPlayerProps) => {
  const [loading, setLoading] = useState(true)
  const videoRef = useRef(null)

  const handleLoad = () => {
    setLoading(false)
    onVideoLoad(videoId)
  }

  const handleError = () => {
    setLoading(false)
    onVideoError(videoId)
  }

  const renderVideo = () => {
    if (Platform.OS === 'web') {
      return (
        <video
          ref={videoRef}
          src={videoUri}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            objectFit: "cover",
          }}
          playsInline
          loop
          autoPlay={isActive && isPlaying}
          onLoadedData={handleLoad}
          onError={handleError}
        />
      )
    }

    return (
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        style={styles.video}
        resizeMode="cover"
        shouldPlay={isActive && isPlaying}
        isLooping
        onLoad={handleLoad}
        onError={handleError}
      />
    )
  }

  return (
    <TouchableOpacity activeOpacity={1} style={styles.videoWrapper} onPress={onPlayPause}>
      {renderVideo()}

      {loading && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color="#FFFFFF" />
        </View>
      )}

      {!isPlaying && (
        <View style={styles.pauseIconContainer}>
          <Play size={50} color="#FFFFFF" />
        </View>
      )}
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  videoWrapper: {
    flex: 1,
    width,
    height,
  },
  video: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
  },
  loaderContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
  pauseIconContainer: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.3)",
  },
})

export default VideoPlayer

