"use client"

import { useRef, useEffect } from "react"
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  KeyboardAvoidingView,
  Platform,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native"
import CommentItem from "./CommentItem"
import CommentInput from "./CommentInput"

const { height } = Dimensions.get("window")

interface Comment {
  id: string
  user: {
    username: string
    name: string
    imageUri: string
  }
  text: string
  time: string
  likes: number
}

interface CommentModalProps {
  visible: boolean
  comments: Comment[]
  videoId: string
  likedComments: Record<string, boolean>
  commentText: string
  onClose: () => void
  onLikeComment: (commentId: string) => void
  onChangeCommentText: (text: string) => void
  onAddComment: () => void
}

const CommentModal = ({
  visible,
  comments,
  videoId,
  likedComments,
  commentText,
  onClose,
  onLikeComment,
  onChangeCommentText,
  onAddComment,
}: CommentModalProps) => {
  const translateY = useRef(new Animated.Value(height)).current
  const opacity = useRef(new Animated.Value(0)).current

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    } else {
      Animated.parallel([
        Animated.timing(translateY, {
          toValue: height,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start()
    }
  }, [visible])

  const panResponder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onMoveShouldSetPanResponder: (_, gestureState) => {
        return gestureState.dy > 5
      },
      onPanResponderMove: (_, gestureState) => {
        if (gestureState.dy > 0) {
          translateY.setValue(gestureState.dy)
        }
      },
      onPanResponderRelease: (_, gestureState) => {
        if (gestureState.dy > 100) {
          onClose()
        } else {
          Animated.spring(translateY, {
            toValue: 0,
            useNativeDriver: true,
          }).start()
        }
      },
    }),
  ).current

  return (
    <Modal animationType="none" transparent={true} visible={visible} onRequestClose={onClose}>
      <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : "height"} style={styles.modalContainer}>
        <Animated.View style={[styles.overlay, { opacity: opacity }]} onTouchEnd={onClose} />

        <Animated.View style={[styles.commentsContainer, { transform: [{ translateY: translateY }] }]}>
          <View {...panResponder.panHandlers}>
            <View style={styles.dragHandle} />

            <View style={styles.commentsHeader}>
              <Text style={styles.commentsTitle}>Bình luận</Text>
              <TouchableOpacity style={styles.closeButton} onPress={onClose}>
                <Text style={styles.closeButtonText}>×</Text>
              </TouchableOpacity>
            </View>
          </View>

          <FlatList
            data={comments}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.commentsList}
            ListEmptyComponent={
              <View style={styles.emptyCommentsContainer}>
                <Text style={styles.emptyCommentsText}>Chưa có bình luận nào</Text>
                <Text style={styles.emptyCommentsSubtext}>Hãy là người đầu tiên bình luận!</Text>
              </View>
            }
            renderItem={({ item }) => (
              <CommentItem
                id={item.id}
                user={item.user}
                text={item.text}
                time={item.time}
                likes={item.likes}
                isLiked={!!likedComments[item.id]}
                onLike={onLikeComment}
              />
            )}
          />

          <CommentInput
            value={commentText}
            onChangeText={onChangeCommentText}
            onSubmit={onAddComment}
            userImageUri="https://randomuser.me/api/portraits/men/32.jpg"
          />
        </Animated.View>
      </KeyboardAvoidingView>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  commentsContainer: {
    backgroundColor: "#1A1A1A",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    height: height * 0.7,
    paddingBottom: 20,
  },
  dragHandle: {
    width: 40,
    height: 5,
    backgroundColor: "#666",
    borderRadius: 3,
    alignSelf: "center",
    marginTop: 10,
    marginBottom: 10,
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
})

export default CommentModal

