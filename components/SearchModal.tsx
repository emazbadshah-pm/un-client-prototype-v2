import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  TextInput,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { 
  X, 
  MapPin, 
  Search, 
  ShoppingCart, 
  Beef, 
  Church,
  Coffee,
  ChevronLeft,
} from 'lucide-react-native';

interface SearchModalProps {
  visible: boolean;
  onClose: () => void;
  currentLocation: string;
}

export function SearchModal({ visible, onClose, currentLocation }: SearchModalProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  const recentAddresses = [
    'New York, NY, USA',
    'Montreal, QC, Canada',
    'Long Island, New York, NY, USA',
  ];

  const recentSearches = [
    'Meat Shops',
    'Slaughter House',
    'Grocery Shop',
  ];

  const quickTrips = [
    { id: 1, name: 'Groceries', subtitle: 'View near by markets & shops - All Halal', icon: ShoppingCart },
    { id: 2, name: 'Meat Shop', subtitle: 'Fresh Halal Meat', icon: Beef },
    { id: 3, name: 'Masjid', subtitle: 'View nearby masjids', icon: Church },
    { id: 4, name: 'Cafe', subtitle: 'Coffee & Snacks', icon: Coffee },
  ];

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setIsSearching(true);
  };

  const handleBackToSearch = () => {
    setIsSearching(false);
    setSearchQuery('');
  };

  return (
    <Modal
      visible={visible}
      animationType="slide"
      presentationStyle="pageSheet"
    >
      <SafeAreaView style={styles.container} edges={['top']}>
        {/* Header and Search Container */}
        <View style={styles.headerSearchContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Explore</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#374151" />
            </TouchableOpacity>
          </View>

          {/* Location */}
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#10B981" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </View>

          {/* Search Bar */}
          <View style={styles.searchContainer}>
            <View style={styles.searchBar}>
              {isSearching && (
                <TouchableOpacity onPress={handleBackToSearch} style={styles.backButton}>
                  <ChevronLeft size={20} color="#6B7280" />
                </TouchableOpacity>
              )}
              <Search size={20} color="#6B7280" />
              <TextInput
                style={styles.searchInput}
                placeholder={isSearching ? "Type what you are looking for" : "Search here"}
                value={searchQuery}
                onChangeText={handleSearch}
                autoFocus={isSearching}
              />
            </View>
          </View>
        </View>

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {/* Recent Addresses */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Addresses</Text>
            {recentAddresses.map((address, index) => (
              <TouchableOpacity key={index} style={styles.addressItem}>
                <MapPin size={16} color="#10B981" />
                <Text style={styles.addressText}>{address}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Recent Searches */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent Searches</Text>
            {recentSearches.map((search, index) => (
              <TouchableOpacity key={index} style={styles.searchItem}>
                <Search size={16} color="#10B981" />
                <Text style={styles.searchText}>{search}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Quick Trips */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Quick Trips</Text>
            <View style={styles.quickTripsGrid}>
              {quickTrips.map((trip) => (
                <TouchableOpacity key={trip.id} style={styles.quickTripCard}>
                  <View style={styles.quickTripIcon}>
                    <trip.icon size={24} color="#10B981" />
                  </View>
                  <View style={styles.quickTripContent}>
                    <Text style={styles.quickTripTitle}>{trip.name}</Text>
                    <Text style={styles.quickTripSubtitle}>{trip.subtitle}</Text>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerSearchContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  locationText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingVertical: 16,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    gap: 12,
  },
  backButton: {
    marginRight: -8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#FFFFFF',
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  addressItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  addressText: {
    fontSize: 16,
    color: '#374151',
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  searchText: {
    fontSize: 16,
    color: '#374151',
  },
  quickTripsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  quickTripCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  quickTripIcon: {
    backgroundColor: '#F0FDF4',
    padding: 12,
    borderRadius: 8,
    alignSelf: 'flex-start',
    marginBottom: 12,
  },
  quickTripContent: {
    flex: 1,
  },
  quickTripTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  quickTripSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
});