import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useLocalSearchParams, router } from 'expo-router';
import { ArrowLeft, Phone, Navigation, Heart, MessageSquare } from 'lucide-react-native';
import { mockBusinesses, mockMasjids } from '@/data/mockData';

export default function BusinessDetailScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  
  const allBusinesses = [...mockBusinesses, ...mockMasjids];
  const business = allBusinesses.find(b => b.id === id);

  if (!business) {
    return (
      <SafeAreaView style={styles.container}>
        <Text>Business not found</Text>
      </SafeAreaView>
    );
  }

  const relatedBusinesses = allBusinesses.filter(b => b.id !== id).slice(0, 2);

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <ArrowLeft size={24} color="#374151" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Explore</Text>
          <TouchableOpacity onPress={() => router.back()} style={styles.closeButton}>
            <Text style={styles.closeText}>✕</Text>
          </TouchableOpacity>
        </View>

        {/* Business Image */}
        <View style={styles.imageContainer}>
          <Image source={{ uri: business.image }} style={styles.businessImage} />
          <View style={styles.imageOverlay}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>Open Now</Text>
            </View>
            {business.isHalalVerified && (
              <View style={styles.halalBadge}>
                <Text style={styles.halalText}>🏛️ Halal Verified</Text>
              </View>
            )}
          </View>
        </View>

        {/* Business Info */}
        <View style={styles.businessInfo}>
          <Text style={styles.businessName}>{business.name}</Text>
          <Text style={styles.businessDistance}>{business.distance} Miles</Text>
          <Text style={styles.businessAddress}>{business.address}</Text>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.actionButton}>
            <Phone size={20} color="#10B981" />
            <Text style={styles.actionButtonText}>Call</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Navigation size={20} color="#10B981" />
            <Text style={styles.actionButtonText}>Navigate</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.favoriteButton}>
            <Heart size={20} color="#10B981" />
          </TouchableOpacity>
        </View>

        {/* Feedback */}
        <TouchableOpacity style={styles.feedbackButton}>
          <MessageSquare size={16} color="#6B7280" />
          <Text style={styles.feedbackText}>Send Feedback on this to Location to Ummah Navigator</Text>
        </TouchableOpacity>

        {/* You May Also Like */}
        <View style={styles.recommendationsSection}>
          <Text style={styles.recommendationsTitle}>You May Also Like</Text>
          <View style={styles.recommendationsList}>
            {relatedBusinesses.map((relatedBusiness) => (
              <TouchableOpacity
                key={relatedBusiness.id}
                style={styles.recommendationCard}
                onPress={() => router.push(`/business/${relatedBusiness.id}`)}
              >
                <Image source={{ uri: relatedBusiness.image }} style={styles.recommendationImage} />
                <View style={styles.recommendationInfo}>
                  <Text style={styles.recommendationName}>{relatedBusiness.name}</Text>
                  <Text style={styles.recommendationAddress}>{relatedBusiness.address}</Text>
                  <View style={styles.recommendationStatus}>
                    <Text style={[styles.statusText, relatedBusiness.isOpen ? styles.openText : styles.closedText]}>
                      {relatedBusiness.isOpen ? 'Open Now' : 'Closed'}
                    </Text>
                    <Text style={styles.recommendationDistance}>{relatedBusiness.distance} miles</Text>
                  </View>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '700',
    color: '#111827',
  },
  closeButton: {
    padding: 4,
  },
  closeText: {
    fontSize: 20,
    color: '#374151',
  },
  imageContainer: {
    position: 'relative',
  },
  businessImage: {
    width: '100%',
    height: 240,
    backgroundColor: '#F3F4F6',
  },
  imageOverlay: {
    position: 'absolute',
    top: 16,
    left: 16,
    right: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  statusBadge: {
    backgroundColor: '#D1FAE5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#065F46',
  },
  halalBadge: {
    backgroundColor: '#EBF8FF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  halalText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#1E40AF',
  },
  businessInfo: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  businessName: {
    fontSize: 24,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  businessDistance: {
    fontSize: 16,
    color: '#F59E0B',
    fontWeight: '600',
    marginBottom: 8,
  },
  businessAddress: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
    gap: 12,
  },
  actionButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 12,
    paddingVertical: 12,
  },
  actionButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#10B981',
  },
  favoriteButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#10B981',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    alignItems: 'center',
    justifyContent: 'center',
  },
  feedbackButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  feedbackText: {
    fontSize: 16,
    color: '#6B7280',
  },
  recommendationsSection: {
    backgroundColor: '#FFFFFF',
    padding: 20,
  },
  recommendationsTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 16,
  },
  recommendationsList: {
    gap: 16,
  },
  recommendationCard: {
    flexDirection: 'row',
    backgroundColor: '#F9FAFB',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  recommendationImage: {
    width: 120,
    height: 120,
    backgroundColor: '#F3F4F6',
  },
  recommendationInfo: {
    flex: 1,
    padding: 16,
    justifyContent: 'space-between',
  },
  recommendationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  recommendationAddress: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 8,
  },
  recommendationStatus: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  openText: {
    color: '#065F46',
  },
  closedText: {
    color: '#991B1B',
  },
  recommendationDistance: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
});