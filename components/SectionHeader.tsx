import { router } from 'expo-router';
import { ChevronRight } from 'lucide-react-native';
import type React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

interface SectionHeaderProps {
  title: string;
  actionText: string;
  linkto: string;
  onActionPress?: () => void;
}

const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  actionText,
  linkto,
  onActionPress,
}) => (
  <View style={styles.container}>
    <Text style={styles.title}>{title}</Text>
    <TouchableOpacity
      style={styles.actionButton}
      onPress={() => {
        if (onActionPress) {
          onActionPress();
        } else {
          router.push(linkto as any);
        }
      }}
    >
      <Text style={styles.actionText}>{actionText}</Text>
      <ChevronRight size={16} color="#4a90e2" />
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionText: {
    fontSize: 14,
    color: '#4a90e2',
    marginRight: 2,
  },
});

export default SectionHeader;
