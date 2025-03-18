import type React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { ChevronRight } from 'lucide-react-native';
import { router } from 'expo-router';

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
      onFocus={() => router.push(linkto as any)}
      style={styles.actionButton}
      onPress={onActionPress}
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
