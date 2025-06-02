import { useSession } from '@/auth/ctx';
import { Redirect, Tabs } from 'expo-router';
import { Bell, Home, User } from 'lucide-react-native';
import { GestureResponderEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface TabButtonProps {
  isFocused: boolean;
  onPress: (event: GestureResponderEvent) => void;
  icon: React.ReactNode;
  label: string;
}

const TabButton = ({ isFocused, onPress, icon, label }: TabButtonProps) => {
  // Thêm kiểm tra để đảm bảo `onPress` không bị gọi liên tục
  const handlePress = (event: GestureResponderEvent) => {
    if (onPress) {
      onPress(event); // Gọi onPress nếu có
    }
  };

  return (
    <TouchableOpacity
      style={[styles.tabButtonContainer, { paddingBottom: 5 }]}
      onPress={handlePress}
      activeOpacity={0.7}
    >
      <View style={styles.tabButton}>{icon}</View>
      {isFocused && <Text style={styles.tabLabel}>{label}</Text>}
    </TouchableOpacity>
  );
};

export default function TabLayout() {
  const { session, isLoading } = useSession();
  const insets = useSafeAreaInsets();

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <Text style={styles.loadingText}>Loading...</Text>
      </View>
    );
  }

  if (!session) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          position: 'absolute',
          height: 60 + (insets.bottom || 20),
          backgroundColor: 'white',
          borderTopWidth: 1,
          borderTopColor: '#EEEEEE',
          elevation: 8,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: -2 },
          shadowOpacity: 0.1,
          shadowRadius: 3,
        },
        tabBarShowLabel: false,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarButton: (props) => (
            <TabButton
              isFocused={props.accessibilityState?.selected ?? false}
              onPress={props.onPress || (() => {})} // Tránh trường hợp undefined
              label="Home"
              icon={
                <Home
                  size={24}
                  color={props.accessibilityState?.selected ? '#6C63FF' : '#888888'}
                />
              }
            />
          ),
        }}
      /> 
      <Tabs.Screen
        name="notifications"
        options={{
          title: 'Notifications',
          tabBarButton: (props) => (
            <TabButton
              isFocused={props.accessibilityState?.selected ?? false}
              onPress={props.onPress || (() => {})} // Tránh trường hợp undefined
              label="Activity"
              icon={
                <Bell
                  size={24}
                  color={props.accessibilityState?.selected ? '#6C63FF' : '#888888'}
                />
              }
            />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarButton: (props) => (
            <TabButton
              isFocused={props.accessibilityState?.selected ?? false}
              onPress={props.onPress || (() => {})} // Tránh trường hợp undefined
              label="Profile"
              icon={
                <User
                  size={24}
                  color={props.accessibilityState?.selected ? '#6C63FF' : '#888888'}
                />
              }
            />
          ),
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  loadingText: {
    fontSize: 18,
    color: '#333',
  },
  tabButtonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    color: '#6C63FF',
    fontWeight: '600',
    marginTop: -5,
  },
});
