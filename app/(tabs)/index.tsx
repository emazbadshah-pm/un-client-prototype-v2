import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  StatusBar,
  Animated,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { MapPin, Search, ChevronRight } from 'lucide-react-native';
import { BusinessCard } from '@/components/BusinessCard';
import { SearchModal } from '@/components/SearchModal';
import { mockBusinesses, mockMasjids } from '@/data/mockData';

export default function ExploreScreen() {
  const [searchVisible, setSearchVisible] = useState(false);
  const [currentLocation, setCurrentLocation] = useState('New York, NY, USA');
  
  const scrollY = useRef(new Animated.Value(0)).current;
  
  const popularBusinesses = mockBusinesses.slice(0, 2);
  const nearbyMasjids = mockMasjids.slice(0, 2);
  const recommendedBusinesses = mockBusinesses.slice(2, 4);

  // Animation values
  const headerHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [140, 70],
    extrapolate: 'clamp',
  });

  const titleFontSize = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [28, 20],
    extrapolate: 'clamp',
  });

  const locationOpacity = scrollY.interpolate({
    inputRange: [0, 50],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  const compactLocationOpacity = scrollY.interpolate({
    inputRange: [50, 100],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  const searchBarHeight = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [60, 0],
    extrapolate: 'clamp',
  });

  const searchBarOpacity = scrollY.interpolate({
    inputRange: [0, 80],
    outputRange: [1, 0],
    extrapolate: 'clamp',
  });

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <StatusBar barStyle="dark-content" backgroundColor="#FFFFFF" />
      
      {/* Fixed Header */}
      <Animated.View style={[styles.headerContainer, { height: headerHeight }]}>
        <View style={styles.headerContent}>
          <View style={styles.titleRow}>
            <Animated.Text style={[
              styles.headerTitle, 
              { fontSize: titleFontSize }
            ]}>
              Explore
            </Animated.Text>
            
            {/* Compact Location (visible when scrolled) */}
            <Animated.View style={[
              styles.compactLocationContainer,
              { opacity: compactLocationOpacity }
            ]}>
              <MapPin size={14} color="#10B981" />
              <Text style={styles.compactLocationText}>{currentLocation}</Text>
            </Animated.View>
          </View>
          
          {/* Original Location (visible when at top) */}
          <Animated.View style={[
            styles.locationContainer,
            { opacity: locationOpacity }
          ]}>
            <MapPin size={16} color="#10B981" />
            <Text style={styles.locationText}>{currentLocation}</Text>
          </Animated.View>
        </View>

        {/* Search Bar */}
        <Animated.View style={[
          styles.searchContainer,
          {
            height: searchBarHeight,
            opacity: searchBarOpacity,
          }
        ]}>
          <TouchableOpacity 
            style={styles.searchBar}
            onPress={() => setSearchVisible(true)}
          >
            <Search size={20} color="#6B7280" />
            <Text style={styles.searchPlaceholder}>Search here</Text>
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContentContainer}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
      >
        {/* Popular in Current City */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular in New York</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <View style={styles.horizontalList}>
              {popularBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* Masjids Near You */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Masjids Near You</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <View style={styles.horizontalList}>
              {nearbyMasjids.map((masjid) => (
                <BusinessCard key={masjid.id} business={masjid} />
              ))}
            </View>
          </ScrollView>
        </View>

        {/* What you may like */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>What you may like</Text>
            <TouchableOpacity>
              <ChevronRight size={20} color="#6B7280" />
            </TouchableOpacity>
          </View>
          <ScrollView 
            horizontal 
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.horizontalScrollContainer}
          >
            <View style={styles.horizontalList}>
              {recommendedBusinesses.map((business) => (
                <BusinessCard key={business.id} business={business} />
              ))}
            </View>
          </ScrollView>
        </View>
      </Animated.ScrollView>

      {/* Search Modal */}
      <SearchModal
        visible={searchVisible}
        onClose={() => setSearchVisible(false)}
        currentLocation={currentLocation}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  headerContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    position: 'relative',
    zIndex: 1000,
    overflow: 'hidden',
  },
  headerContent: {
    paddingHorizontal: 20,
    paddingTop: 16,
    flex: 1,
    justifyContent: 'space-between',
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontWeight: '700',
    color: '#111827',
    flex: 1,
  },
  compactLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactLocationText: {
    fontSize: 14,
    color: '#10B981',
    fontWeight: '500',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    marginBottom: 8,
  },
  locationText: {
    fontSize: 16,
    color: '#10B981',
    fontWeight: '500',
  },
  searchContainer: {
    paddingHorizontal: 20,
    paddingBottom: 16,
    justifyContent: 'center',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchPlaceholder: {
    fontSize: 16,
    color: '#6B7280',
  },
  content: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  scrollContentContainer: {
    paddingBottom: 40,
  },
  section: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 16,
    marginTop: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
  },
  horizontalScrollContainer: {
    paddingVertical: 12,
  },
  horizontalList: {
    flexDirection: 'row',
    gap: 16,
    paddingHorizontal: 20,
  },
});