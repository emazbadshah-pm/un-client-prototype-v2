import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import { Business } from '@/types/business';

interface BusinessCardProps {
  business: Business;
}

export function BusinessCard({ business }: BusinessCardProps) {
  const handlePress = () => {
    router.push(`/business/${business.id}`);
  };

  return (
    <TouchableOpacity style={styles.card} onPress={handlePress}>
      <Image source={{ uri: business.image }} style={styles.image} />
      <View style={styles.content}>
        <Text style={styles.name} numberOfLines={2}>{business.name}</Text>
        <Text style={styles.address} numberOfLines={1}>{business.address}</Text>
        <View style={styles.statusRow}>
          <View style={[styles.statusBadge, business.isOpen ? styles.openBadge : styles.closedBadge]}>
            <Text style={[styles.statusText, business.isOpen ? styles.openText : styles.closedText]}>
              {business.isOpen ? 'Open Now' : 'Closed'}
            </Text>
          </View>
          <Text style={styles.distance}>{business.distance} miles</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
    width: 280,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: 160,
    backgroundColor: '#F3F4F6',
  },
  content: {
    padding: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  address: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
  },
  statusRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
  },
  openBadge: {
    backgroundColor: '#D1FAE5',
  },
  closedBadge: {
    backgroundColor: '#FEE2E2',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
  },
  openText: {
    color: '#065F46',
  },
  closedText: {
    color: '#991B1B',
  },
  distance: {
    fontSize: 14,
    color: '#F59E0B',
    fontWeight: '500',
  },
});