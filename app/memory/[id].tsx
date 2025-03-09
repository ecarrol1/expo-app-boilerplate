import React, { useEffect, useState } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView,
  TouchableOpacity,
  Animated,
  Share,
  Platform,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { useLocalSearchParams, useRouter, Stack } from 'expo-router';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

// Interface for memory object
interface Memory {
  id: string;
  date: string;
  title: string;
  type: 'people' | 'places' | 'activities';
  time: string;
  details: string;
  tags: string[];
  audioUrl?: string;
  imageUrl?: string;
  location?: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    }
  };
  people?: string[];
}

// Mock memory data - In a real app, this would come from a storage context
const mockMemories: Memory[] = [
  {
    id: '1',
    date: 'Today',
    title: 'Morning walk with Lucy',
    type: 'activities',
    time: '9:30 AM',
    details: 'We went to the park and saw ducks by the pond. Lucy was excited to feed them. The weather was sunny and warm, perfect for a morning stroll. She mentioned her grandson\'s baseball game coming up this weekend. We should remember to ask her about it next time.',
    tags: ['walk', 'park', 'Lucy'],
    location: {
      name: 'Central Park',
      coordinates: {
        latitude: 40.785091,
        longitude: -73.968285
      }
    },
    people: ['Lucy']
  },
  {
    id: '2',
    date: 'Yesterday',
    title: 'Lunch with John',
    type: 'people',
    time: '1:15 PM',
    details: 'Met at the Italian restaurant downtown. He told me about his grandson\'s baseball game. The pasta was excellent as always. John mentioned he\'s planning a trip to Florida next month to visit his sister.',
    tags: ['lunch', 'John', 'restaurant'],
    location: {
      name: 'Bella Italia Restaurant'
    },
    people: ['John']
  },
  {
    id: '3',
    date: '2 days ago',
    title: 'Doctor appointment',
    type: 'activities',
    time: '10:30 AM',
    details: 'Checkup went well. Next appointment is in 3 months. Doctor said blood pressure is good. Need to remember to take medication daily. The nurse was very helpful and explained the new prescription.',
    tags: ['doctor', 'health', 'appointment']
  },
  {
    id: '4',
    date: '3 days ago',
    title: 'Visit to Main St Café',
    type: 'places',
    time: '2:45 PM',
    details: 'Had a blueberry scone and coffee. The barista remembered my name, which was nice. Met a friendly couple who recommended the apple pie for next time. The café had live music playing.',
    tags: ['cafe', 'coffee', 'Main St'],
    location: {
      name: 'Main St Café'
    }
  },
  {
    id: '5',
    date: 'Last week',
    title: 'Call with Sarah',
    type: 'people',
    time: '6:30 PM',
    details: 'Talked about her new job. She seems very happy with the change. We plan to meet next month. She mentioned her daughter got accepted to college. Need to remember to congratulate her on that next time we speak.',
    tags: ['call', 'Sarah', 'family'],
    people: ['Sarah']
  }
];

export default function MemoryDetailScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const [scrollY, setScrollY] = useState(0);
  const [headerVisible, setHeaderVisible] = useState(false);
  const headerOpacity = useState(new Animated.Value(0))[0];
  const memory = mockMemories.find(m => m.id === id) || mockMemories[0];
  
  useEffect(() => {
    if (headerVisible) {
      Animated.timing(headerOpacity, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(headerOpacity, {
        toValue: 0,
        duration: 150,
        useNativeDriver: true,
      }).start();
    }
  }, [headerVisible, headerOpacity]);
  
  const handleScroll = (event: any) => {
    const scrollPosition = event.nativeEvent.contentOffset.y;
    setScrollY(scrollPosition);
    
    if (scrollPosition > 100 && !headerVisible) {
      setHeaderVisible(true);
    } else if (scrollPosition <= 100 && headerVisible) {
      setHeaderVisible(false);
    }
  };
  
  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };
  
  const handleShare = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    try {
      await Share.share({
        message: `${memory.title}\n\n${memory.details}\n\nRecorded on ${memory.date} at ${memory.time}`,
        title: memory.title,
      });
    } catch (error) {
      console.error("Error sharing memory:", error);
    }
  };
  
  const handleEdit = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    // We'll implement this in a future sprint
    alert('Edit feature will be implemented soon!');
  };
  
  const renderMemoryIcon = (type: string) => {
    switch(type) {
      case 'people':
        return <Ionicons name="people" size={18} color={Colors.light.primary} />;
      case 'places':
        return <Ionicons name="location" size={18} color={Colors.light.primary} />;
      case 'activities':
        return <Ionicons name="calendar" size={18} color={Colors.light.primary} />;
      default:
        return <Ionicons name="document-text" size={18} color={Colors.light.primary} />;
    }
  };
  
  // Calculate how many days ago the memory was created
  const getDaysAgo = (dateString: string) => {
    if (dateString === 'Today') return 'Today';
    if (dateString === 'Yesterday') return 'Yesterday';
    if (dateString.includes('days ago')) return dateString;
    return dateString;
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Floating header that appears when scrolling */}
      <Animated.View 
        style={[
          styles.floatingHeader,
          { opacity: headerOpacity }
        ]}
      >
        <TouchableOpacity 
          style={styles.backButton} 
          onPress={handleBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        <Text style={styles.floatingTitle} numberOfLines={1}>
          {memory.title}
        </Text>
        <TouchableOpacity 
          style={styles.actionButton} 
          onPress={handleShare}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
        >
          <Ionicons name="share-outline" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </Animated.View>
      
      <ScrollView 
        style={styles.scrollView} 
        onScroll={handleScroll}
        scrollEventThrottle={16}
        showsVerticalScrollIndicator={false}
      >
        {/* Top bar with back button and actions */}
        <View style={styles.topBar}>
          <TouchableOpacity 
            style={styles.backButton} 
            onPress={handleBack}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
          </TouchableOpacity>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleEdit}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="pencil-outline" size={24} color={Colors.light.primary} />
            </TouchableOpacity>
            <TouchableOpacity 
              style={styles.actionButton} 
              onPress={handleShare}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <Ionicons name="share-outline" size={24} color={Colors.light.primary} />
            </TouchableOpacity>
          </View>
        </View>
        
        {/* Memory header with type, date and time */}
        <View style={styles.memoryHeader}>
          <View style={styles.memoryTypeContainer}>
            {renderMemoryIcon(memory.type)}
            <Text style={styles.memoryTypeText}>{memory.type.charAt(0).toUpperCase() + memory.type.slice(1)}</Text>
          </View>
          <Text style={styles.memoryDate}>{getDaysAgo(memory.date)} · {memory.time}</Text>
        </View>
        
        {/* Memory title and content */}
        <View style={styles.memoryContent}>
          <Text style={styles.memoryTitle}>{memory.title}</Text>
          
          {/* Memory details */}
          <View style={styles.detailsContainer}>
            <Text style={styles.memoryDetails}>{memory.details}</Text>
          </View>
          
          {/* Optional location */}
          {memory.location && (
            <View style={styles.locationContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons name="location-outline" size={18} color={Colors.light.primary} />
                <Text style={styles.sectionTitle}>Location</Text>
              </View>
              <View style={styles.locationContent}>
                <Text style={styles.locationName}>{memory.location.name}</Text>
                <View style={styles.mapPlaceholder}>
                  <Ionicons name="map-outline" size={24} color="#888" />
                  <Text style={styles.mapPlaceholderText}>Map will be displayed here</Text>
                </View>
              </View>
            </View>
          )}
          
          {/* Optional people mentioned */}
          {memory.people && memory.people.length > 0 && (
            <View style={styles.peopleContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons name="people-outline" size={18} color={Colors.light.primary} />
                <Text style={styles.sectionTitle}>People</Text>
              </View>
              <View style={styles.chipContainer}>
                {memory.people.map((person, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{person}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {/* Tags */}
          {memory.tags && memory.tags.length > 0 && (
            <View style={styles.tagsContainer}>
              <View style={styles.sectionHeader}>
                <Ionicons name="pricetag-outline" size={18} color={Colors.light.primary} />
                <Text style={styles.sectionTitle}>Tags</Text>
              </View>
              <View style={styles.chipContainer}>
                {memory.tags.map((tag, index) => (
                  <View key={index} style={styles.chip}>
                    <Text style={styles.chipText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </View>
          )}
          
          {/* Related memories */}
          <View style={styles.relatedContainer}>
            <View style={styles.sectionHeader}>
              <Ionicons name="link-outline" size={18} color={Colors.light.primary} />
              <Text style={styles.sectionTitle}>Related Memories</Text>
            </View>
            <View style={styles.relatedList}>
              {mockMemories.slice(0, 2).map((relatedMemory) => (
                <TouchableOpacity 
                  key={relatedMemory.id}
                  style={styles.relatedMemory}
                  onPress={() => router.push(`/memory/${relatedMemory.id}`)}
                  activeOpacity={0.7}
                >
                  <View style={styles.relatedIcon}>
                    {renderMemoryIcon(relatedMemory.type)}
                  </View>
                  <View style={styles.relatedContent}>
                    <Text style={styles.relatedTitle} numberOfLines={1}>{relatedMemory.title}</Text>
                    <Text style={styles.relatedDate}>{relatedMemory.date}</Text>
                  </View>
                  <Ionicons name="chevron-forward" size={16} color="#888" />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  floatingHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    flexDirection: 'row',
    alignItems: 'center',
    paddingTop: 50, // Space for status bar
    paddingBottom: 10,
    paddingHorizontal: Spacing.screenPadding,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    zIndex: 1000,
    ...Shadows.small,
  },
  floatingTitle: {
    ...Typography.heading3,
    flex: 1,
    marginHorizontal: Spacing.sm,
  },
  topBar: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.lg,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
  },
  actionButtons: {
    flexDirection: 'row',
  },
  actionButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    marginLeft: Spacing.sm,
  },
  memoryHeader: {
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  memoryTypeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  memoryTypeText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    fontWeight: '600',
    marginLeft: 6,
  },
  memoryDate: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    opacity: 0.6,
  },
  memoryContent: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xl,
  },
  memoryTitle: {
    ...Typography.heading2,
    marginBottom: Spacing.md,
  },
  detailsContainer: {
    marginBottom: Spacing.lg,
  },
  memoryDetails: {
    ...Typography.bodyMedium,
    lineHeight: 24,
  },
  locationContainer: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  sectionTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginLeft: 6,
  },
  locationContent: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  locationName: {
    ...Typography.bodyMedium,
    padding: Spacing.md,
  },
  mapPlaceholder: {
    height: 120,
    backgroundColor: '#EEE',
    justifyContent: 'center',
    alignItems: 'center',
  },
  mapPlaceholderText: {
    ...Typography.bodySmall,
    color: '#888',
    marginTop: 4,
  },
  peopleContainer: {
    marginBottom: Spacing.lg,
  },
  tagsContainer: {
    marginBottom: Spacing.lg,
  },
  chipContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  chip: {
    backgroundColor: '#F0F0F0',
    borderRadius: 16,
    paddingVertical: 6,
    paddingHorizontal: 12,
    marginRight: 8,
    marginBottom: 8,
  },
  chipText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
  relatedContainer: {
    marginBottom: Spacing.lg,
  },
  relatedList: {
    backgroundColor: '#F9F9F9',
    borderRadius: 12,
    overflow: 'hidden',
  },
  relatedMemory: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  relatedIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.sm,
  },
  relatedContent: {
    flex: 1,
  },
  relatedTitle: {
    ...Typography.bodyMedium,
    fontWeight: '500',
  },
  relatedDate: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    opacity: 0.7,
  },
}); 