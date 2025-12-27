import { ChevronRight, Heart, Star } from 'lucide-react-native';
import React from 'react';
import {
    SafeAreaView,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View
} from 'react-native';
// Assuming your Contexts have been moved to a 'context' folder
// For now, these use mock hooks if the files aren't ready yet
const useLanguage = () => ({ t: (s: string) => s === 'favorites' ? 'Favorites' : s });
const useFavorites = () => ({ 
  favorites: [
    { id: '1', name: 'Ramesh Electrician', service: 'Electrician', rating: 4.8 },
    { id: '2', name: 'Suresh Plumber', service: 'Plumber', rating: 4.5 }
  ], 
  removeFavorite: (id: string) => console.log('Remove', id) 
});

export default function FavoritesPage() {
  const { t } = useLanguage();
  const { favorites, removeFavorite } = useFavorites();

  return (
    <SafeAreaView style={styles.container}>
      {/* Header Placeholder - You can import your mobile Header component here */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{t('favorites')}</Text>
        <Text style={styles.headerSub}>Your saved services and providers</Text>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent}>
        {favorites.length > 0 ? (
          <View style={styles.list}>
            {favorites.map((item) => (
              <View key={item.id} style={styles.card}>
                {/* Avatar */}
                <View style={styles.avatar}>
                  <Text style={styles.avatarText}>{item.name.charAt(0)}</Text>
                </View>

                {/* Details */}
                <View style={styles.details}>
                  <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
                  <Text style={styles.service}>{item.service}</Text>
                </View>

                {/* Actions */}
                <View style={styles.actions}>
                  {item.rating && (
                    <View style={styles.ratingBadge}>
                      <Star size={12} color="#FF7A00" fill="#FF7A00" />
                      <Text style={styles.ratingText}>{item.rating}</Text>
                    </View>
                  )}
                  
                  <TouchableOpacity 
                    style={styles.removeBtn} 
                    onPress={() => removeFavorite(item.id)}
                  >
                    <Heart size={20} color="#EF4444" fill="#EF4444" />
                  </TouchableOpacity>
                  
                  <ChevronRight size={20} color="#9CA3AF" />
                </View>
              </View>
            ))}
          </View>
        ) : (
          /* Empty State */
          <View style={styles.emptyContainer}>
            <View style={styles.emptyIconCircle}>
              <Heart size={40} color="#FF7A00" />
            </View>
            <Text style={styles.emptyTitle}>No favorites yet</Text>
            <Text style={styles.emptySub}>
              Save your favorite services and providers here for quick access
            </Text>
          </View>
        )}
      </ScrollView>

      {/* BottomNav is handled automatically by the (tabs) folder structure in Expo Router */}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
  },
  header: {
    padding: 20,
    paddingTop: 40,
    backgroundColor: '#FFF',
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111827',
  },
  headerSub: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 4,
  },
  scrollContent: {
    padding: 16,
    paddingBottom: 100, // Space for the bottom tabs
  },
  list: {
    gap: 12,
  },
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#F3F4F6',
    elevation: 2, // Shadow for Android
    shadowColor: '#000', // Shadow for iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFEBDC',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    color: '#FF7A00',
    fontSize: 20,
    fontWeight: 'bold',
  },
  details: {
    flex: 1,
    marginLeft: 12,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  service: {
    fontSize: 14,
    color: '#6B7280',
    marginTop: 2,
  },
  actions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  ratingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 20,
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#111827',
  },
  removeBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FEE2E2',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 80,
    paddingHorizontal: 40,
  },
  emptyIconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#F3F4F6',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#111827',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
});