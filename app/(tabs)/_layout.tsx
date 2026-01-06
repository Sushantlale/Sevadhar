import { Tabs } from 'expo-router';
import { Hammer, Heart, History, Home, User } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs screenOptions={{
      tabBarActiveTintColor: '#FF7A00',
      tabBarInactiveTintColor: '#6B7280',
      tabBarStyle: { height: 60, paddingBottom: 10 },
      headerShown: false,
    }}>
      <Tabs.Screen name="home" options={{
        title: 'Home',
        tabBarIcon: ({ color }) => <Home size={24} color={color} />,
      }} />
      <Tabs.Screen name="services" options={{
        title: 'Services',
        tabBarIcon: ({ color }) => <Hammer size={24} color={color} />,
      }} />
      <Tabs.Screen name="history" options={{
        title: 'History',
        tabBarIcon: ({ color }) => <History size={24} color={color} />,
      }} />
      <Tabs.Screen name="favorites" options={{
        title: 'Favorites',
        tabBarIcon: ({ color }) => <Heart size={24} color={color} />,
      }} />
      <Tabs.Screen name="profile" options={{
        title: 'Profile',
        tabBarIcon: ({ color }) => <User size={24} color={color} />,
      }} />
    </Tabs>
  );
}