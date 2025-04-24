import { View, TextInput, StyleSheet, TouchableOpacity, Text, Image } from "react-native"

interface CommentInputProps {
  value: string
  onChangeText: (text: string) => void
  onSubmit: () => void
  userImageUri: string
}

const CommentInput = ({ value, onChangeText, onSubmit, userImageUri }: CommentInputProps) => {
  return (
    <View style={styles.commentInputContainer}>
      <Image source={{ uri: userImageUri }} style={styles.commentInputUserImage} />
      <TextInput
        style={styles.commentInput}
        placeholder="Thêm bình luận..."
        placeholderTextColor="#8A8A8A"
        value={value}
        onChangeText={onChangeText}
        multiline
      />
      <TouchableOpacity
        style={[styles.commentSendButton, !value.trim() && styles.commentSendButtonDisabled]}
        onPress={onSubmit}
        disabled={!value.trim()}
      >
        <Text style={[styles.commentSendButtonText, !value.trim() && styles.commentSendButtonTextDisabled]}>Gửi</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
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

export default CommentInput

