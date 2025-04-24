"use client"

import { useState, useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  FlatList,
  Image,
  Animated,
  StatusBar,
  ActivityIndicator,
  Modal,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from "react-native"
import { Video } from "expo-av"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { router } from "expo-router"
import { ArrowLeft, Heart, MessageCircle, Share2, BookmarkPlus, Music, Play } from "lucide-react-native"

const { width, height } = Dimensions.get("window")

// Mock data for videos
const VIDEOS = [
  {
    id: "1",
    videoUri:
      "https://assets.mixkit.co/videos/preview/mixkit-young-mother-with-her-little-daughter-decorating-a-christmas-tree-39745-large.mp4",
    user: {
      id: "1",
      username: "dhbachkhoa",
      name: "ĐH Bách Khoa Hà Nội",
      imageUri: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    description:
      "Lễ Tốt Nghiệp 2023 - Khoảnh khắc đáng nhớ của các tân kỹ sư, cử nhân Đại học Bách Khoa Hà Nội #totnghiep #bachkhoa",
    songName: "Nhạc nền - Bài hát tốt nghiệp",
    likes: 1234,
    comments: 123,
    shares: 45,
  },
  {
    id: "2",
    videoUri: "https://assets.mixkit.co/videos/preview/mixkit-tree-with-yellow-flowers-1173-large.mp4",
    user: {
      id: "2",
      username: "dhfpt",
      name: "ĐH FPT",
      imageUri: "https://randomuser.me/api/portraits/men/36.jpg",
    },
    description: "Hội thảo: Công nghệ AI trong Giáo dục - Những xu hướng mới nhất năm 2023 #AI #giaoduc #FPT",
    songName: "Nhạc nền - Tech Innovation",
    likes: 856,
    comments: 243,
    shares: 32,
  },
  {
    id: "3",
    videoUri:
      "https://assets.mixkit.co/videos/preview/mixkit-mother-with-her-little-daughter-eating-a-marshmallow-in-nature-39764-large.mp4",
    user: {
      id: "3",
      username: "dhngoaithuong",
      name: "ĐH Ngoại Thương",
      imageUri: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    description:
      'Cuộc thi "Marketing Challenge 2023" - Đội tuyển sinh viên FTU đạt giải Nhất! #marketing #FTU #challenge',
    songName: "Nhạc nền - Victory Celebration",
    likes: 2500,
    comments: 350,
    shares: 120,
  },
  {
    id: "4",
    videoUri: "https://assets.mixkit.co/videos/preview/mixkit-waves-in-the-water-1164-large.mp4",
    user: {
      id: "4",
      username: "dhkinhtequocdan",
      name: "ĐH Kinh Tế Quốc Dân",
      imageUri: "https://randomuser.me/api/portraits/women/68.jpg",
    },
    description:
      "Workshop: Digital Marketing Trends 2024 - Những xu hướng marketing số bạn cần biết #digitalmarketing #workshop",
    songName: "Nhạc nền - Digital World",
    likes: 789,
    comments: 156,
    shares: 67,
  },
  {
    id: "5",
    videoUri: "https://assets.mixkit.co/videos/preview/mixkit-forest-stream-in-the-sunlight-529-large.mp4",
    user: {
      id: "5",
      username: "dhquocgia",
      name: "ĐH Quốc Gia Hà Nội",
      imageUri: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    description: "Seminar: Blockchain và Tương lai của Fintech - Cơ hội và thách thức #blockchain #fintech #seminar",
    songName: "Nhạc nền - Future Technology",
    likes: 678,
    comments: 89,
    shares: 45,
  },
]

// Thêm mock data cho comments
// Thêm sau khai báo VIDEOS
const INITIAL_COMMENTS = {
  "1": [
    {
      id: "1",
      user: {
        username: "nguyenvana",
        name: "Nguyễn Văn A",
        imageUri: "https://randomuser.me/api/portraits/men/43.jpg",
      },
      text: "Chúc mừng các tân cử nhân! 🎓",
      time: "2 giờ trước",
      likes: 24,
    },
    {
      id: "2",
      user: {
        username: "tranthib",
        name: "Trần Thị B",
        imageUri: "https://randomuser.me/api/portraits/women/63.jpg",
      },
      text: "Buổi lễ thật trang trọng và ý nghĩa 👏",
      time: "1 giờ trước",
      likes: 15,
    },
  ],
  "2": [
    {
      id: "1",
      user: {
        username: "lethic",
        name: "Lê Thị C",
        imageUri: "https://randomuser.me/api/portraits/women/33.jpg",
      },
      text: "Công nghệ AI đang phát triển rất nhanh, rất hữu ích cho ngành giáo dục!",
      time: "3 giờ trước",
      likes: 18,
    },
  ],
  "3": [
    {
      id: "1",
      user: {
        username: "phamvand",
        name: "Phạm Văn D",
        imageUri: "https://randomuser.me/api/portraits/men/91.jpg",
      },
      text: "Xin chúc mừng đội tuyển FTU! Các bạn xứng đáng với giải thưởng này 🏆",
      time: "5 giờ trước",
      likes: 32,
    },
  ],
}

const TikTokStyleScreen = () => {
  const insets = useSafeAreaInsets()
  const [activeVideoIndex, setActiveVideoIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(true)
  const [liked, setLiked] = useState({})
  const [saved, setSaved] = useState({})
  // Thêm các biến state và hàm xử lý cho chức năng bình luận
  // Thêm sau dòng const [saved, setSaved] = useState({});
  const [commentModalVisible, setCommentModalVisible] = useState(false)
  const [currentVideoId, setCurrentVideoId] = useState(null)
  const [commentText, setCommentText] = useState("")
  const [likedComments, setLikedComments] = useState({})
  const [comments, setComments] = useState({})
  const [loading, setLoading] = useState({})

  const flatListRef = useRef(null)
  const videoRefs = useRef({})

  // Animation values
  const heartAnimation = useRef(new Animated.Value(0)).current

  useEffect(() => {
    // Reset playing state when active video changes
    setIsPlaying(true)
  }, [activeVideoIndex])

  // Thêm useEffect để khởi tạo comments
  // Thêm sau useEffect hiện có
  useEffect(() => {
    setComments(INITIAL_COMMENTS)
  }, [])

  const onViewableItemsChanged = useRef(({ viewableItems }: { viewableItems: Array<{ index: number | null }> }) => {
    if (viewableItems.length > 0) {
      if (viewableItems[0].index !== null) {
        setActiveVideoIndex(viewableItems[0].index)
      }
    }
  }).current

  const viewabilityConfig = useRef({
    itemVisiblePercentThreshold: 50,
  }).current

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const handleLike = (videoId) => {
    // Animate heart when liking
    if (!liked[videoId]) {
      Animated.sequence([
        Animated.timing(heartAnimation, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(heartAnimation, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }

    setLiked((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }))
  }

  const handleSave = (videoId) => {
    setSaved((prev) => ({
      ...prev,
      [videoId]: !prev[videoId],
    }))
  }

  const handleVideoLoad = (videoId) => {
    setLoading((prev) => ({
      ...prev,
      [videoId]: false,
    }))
  }

  const handleVideoError = (videoId) => {
    setLoading((prev) => ({
      ...prev,
      [videoId]: false,
    }))
    console.error(`Error loading video ${videoId}`)
  }

  // Thêm hàm xử lý mở modal bình luận
  // Thêm sau hàm handleVideoError
  const handleOpenComments = (videoId) => {
    setCurrentVideoId(videoId)
    setCommentModalVisible(true)
  }

  // Thêm hàm xử lý thích bình luận
  const handleLikeComment = (commentId) => {
    setLikedComments((prev) => ({
      ...prev,
      [commentId]: !prev[commentId],
    }))
  }

  // Thêm hàm xử lý thêm bình luận mới
  const handleAddComment = () => {
    if (!commentText.trim()) return

    const newComment = {
      id: `new-${Date.now()}`,
      user: {
        username: "you",
        name: "Bạn",
        imageUri: "https://randomuser.me/api/portraits/men/32.jpg",
      },
      text: commentText,
      time: "Vừa xong",
      likes: 0,
    }

    setComments((prev) => ({
      ...prev,
      [currentVideoId]: prev[currentVideoId] ? [...prev[currentVideoId], newComment] : [newComment],
    }))

    setCommentText("")
  }

  const renderItem = ({ item, index }) => {
    const isActive = index === activeVideoIndex

    return (
      <View style={styles.videoContainer}>
        <TouchableOpacity activeOpacity={1} style={styles.videoWrapper} onPress={handlePlayPause}>
          <Video
            ref={(ref) => {
              videoRefs.current[item.id] = ref
            }}
            source={{ uri: item.videoUri }}
            style={styles.video}
            resizeMode="cover"
            shouldPlay={isActive && isPlaying}
            isLooping
            onLoad={() => handleVideoLoad(item.id)}
            onError={() => handleVideoError(item.id)}
          />

          {loading[item.id] !== false && (
            <View style={styles.loaderContainer}>
              <ActivityIndicator size="large" color="#FFFFFF" />
            </View>
          )}

          {!isPlaying && (
            <View style={styles.pauseIconContainer}>
              <Play size={50} color="#FFFFFF" />
            </View>
          )}

          {/* Video Info Overlay */}
          <View style={[styles.overlay, { paddingTop: insets.top, paddingBottom: insets.bottom }]}>
            {/* Top Bar */}
            <View style={styles.topBar}>
              <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                <ArrowLeft size={24} color="#FFFFFF" />
              </TouchableOpacity>
            </View>

            {/* Right Side Actions */}
            <View style={styles.rightControls}>
              <TouchableOpacity style={styles.rightControlButton} onPress={() => handleLike(item.id)}>
                <Heart
                  size={30}
                  color={liked[item.id] ? "#FF4D67" : "#FFFFFF"}
                  fill={liked[item.id] ? "#FF4D67" : "none"}
                />
                <Text style={styles.controlText}>{liked[item.id] ? item.likes + 1 : item.likes}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rightControlButton} onPress={() => handleOpenComments(item.id)}>
                <MessageCircle size={30} color="#FFFFFF" />
                <Text style={styles.controlText}>{item.comments}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rightControlButton}>
                <Share2 size={30} color="#FFFFFF" />
                <Text style={styles.controlText}>{item.shares}</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.rightControlButton} onPress={() => handleSave(item.id)}>
                <BookmarkPlus
                  size={30}
                  color={saved[item.id] ? "#6C63FF" : "#FFFFFF"}
                  fill={saved[item.id] ? "#6C63FF" : "none"}
                />
              </TouchableOpacity>
            </View>

            {/* Bottom Info */}
            <View style={styles.bottomInfo}>
              <View style={styles.userInfo}>
                <Image source={{ uri: item.user.imageUri }} style={styles.userImage} />
                <Text style={styles.username}>@{item.user.username}</Text>
              </View>

              <Text style={styles.description}>{item.description}</Text>

              <View style={styles.songInfo}>
                <Music size={16} color="#FFFFFF" />
                <Text style={styles.songName}>{item.songName}</Text>
              </View>
            </View>
          </View>
        </TouchableOpacity>

        {/* Heart Animation */}
        <Animated.View
          style={[
            styles.heartAnimationContainer,
            {
              opacity: heartAnimation,
              transform: [
                {
                  scale: heartAnimation.interpolate({
                    inputRange: [0, 0.5, 1],
                    outputRange: [0, 1.5, 1],
                  }),
                },
              ],
            },
          ]}
          pointerEvents="none"
        >
          <Heart size={100} color="#FF4D67" fill="#FF4D67" />
        </Animated.View>
      </View>
    )
  }

  // Thêm modal bình luận vào cuối component, trước return cuối cùng
  // Thêm trước dòng return (
  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />

      <FlatList
        ref={flatListRef}
        data={VIDEOS}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        pagingEnabled
        showsVerticalScrollIndicator={false}
        snapToInterval={height}
        snapToAlignment="start"
        decelerationRate="fast"
        viewabilityConfig={viewabilityConfig}
        onViewableItemsChanged={onViewableItemsChanged}
      />

      {/* Comments Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={commentModalVisible}
        onRequestClose={() => setCommentModalVisible(false)}
      >
        <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
          <View style={styles.commentsContainer}>
            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Bình luận</Text>
              <TouchableOpacity style={styles.closeButton} onPress={() => setCommentModalVisible(false)}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>

            <FlatList
              data={comments[currentVideoId] || []}
              keyExtractor={(item) => item.id}
              contentContainerStyle={styles.commentsList}
              ListEmptyComponent={
                <View style={styles.emptyCommentsContainer}>
                  <Text style={styles.emptyCommentsText}>Chưa có bình luận nào</Text>
                  <Text style={styles.emptyCommentsSubtext}>Hãy là người đầu tiên bình luận!</Text>
                </View>
              }
              renderItem={({ item }) => (
                <View style={styles.commentItem}>
                  <Image source={{ uri: item.user.imageUri }} style={styles.commentUserImage} />
                  <View style={styles.commentContent}>
                    <Text style={styles.commentUsername}>{item.user.name}</Text>
                    <Text style={styles.commentText}>{item.text}</Text>
                    <View style={styles.commentFooter}>
                      <Text style={styles.commentTime}>{item.time}</Text>
                      <TouchableOpacity style={styles.commentLikeButton} onPress={() => handleLikeComment(item.id)}>
                        <Text style={styles.commentLikeText}>Thích</Text>
                        <Heart
                          size={12}
                          color={likedComments[item.id] ? "#FF4D67" : "#8A8A8A"}
                          fill={likedComments[item.id] ? "#FF4D67" : "none"}
                          style={styles.commentLikeIcon}
                        />
                        <Text
                          style={[styles.commentLikesCount, likedComments[item.id] && styles.commentLikesCountActive]}
                        >
                          {likedComments[item.id] ? item.likes + 1 : item.likes}
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>
              )}
            />

            <View style={styles.commentInputContainer}>
              <Image
                source={{ uri: "https://randomuser.me/api/portraits/men/32.jpg" }}
                style={styles.commentInputUserImage}
              />
              <TextInput
                style={styles.commentInput}
                placeholder="Thêm bình luận..."
                placeholderTextColor="#8A8A8A"
                value={commentText}
                onChangeText={setCommentText}
                multiline
              />
              <TouchableOpacity
                style={[styles.commentSendButton, !commentText.trim() && styles.commentSendButtonDisabled]}
                onPress={handleAddComment}
                disabled={!commentText.trim()}
              >
                <Text
                  style={[styles.commentSendButtonText, !commentText.trim() && styles.commentSendButtonTextDisabled]}
                >
                  Gửi
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  videoContainer: {
    width,
    height,
    position: "relative",
  },
  videoWrapper: {
    flex: 1,
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
  overlay: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: "space-between",
  },
  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "rgba(0, 0, 0, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
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
  bottomInfo: {
    marginBottom: 60,
    padding: 16,
    paddingRight: 80, // Space for right controls
  },
  userInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  userImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    marginRight: 8,
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
  heartAnimationContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    marginLeft: -50,
    marginTop: -50,
    justifyContent: "center",
    alignItems: "center",
  },
  // Thêm styles cho modal bình luận
  // Thêm vào cuối StyleSheet.create
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  commentsContainer: {
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.6,
    paddingBottom: 20,
  },
  commentsHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
    position: "relative",
  },
  commentsTitle: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  closeButton: {
    position: "absolute",
    right: 15,
    top: 12,
    width: 30,
    height: 30,
    alignItems: "center",
    justifyContent: "center",
  },
  closeButtonText: {
    color: "#FFFFFF",
    fontSize: 28,
    fontWeight: "bold",
  },
  commentsList: {
    padding: 16,
  },
  emptyCommentsContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  emptyCommentsText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 8,
  },
  emptyCommentsSubtext: {
    color: "#8A8A8A",
    fontSize: 14,
  },
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
  commentInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderTopWidth: 1,
    borderTopColor: "#333",
  },
  commentInputUserImage: {
    width: 32,
    height: 32,
    borderRadius: 16,
    marginRight: 12,
  },
  commentInput: {
    flex: 1,
    backgroundColor: "#333",
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    color: "#FFFFFF",
    maxHeight: 100,
  },
  commentSendButton: {
    marginLeft: 12,
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: "#6C63FF",
    borderRadius: 16,
  },
  commentSendButtonDisabled: {
    backgroundColor: "#333",
  },
  commentSendButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "bold",
  },
  commentSendButtonTextDisabled: {
    color: "#8A8A8A",
  },
})

export default TikTokStyleScreen

