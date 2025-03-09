import React from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Image
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Button, Card } from '@/components/ui/core';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function HomeScreen() {
  const router = useRouter();
  
  const navigateToRecord = () => {
    // Provide haptic feedback when navigating to record screen
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/record');
  };
  
  const navigateToReview = () => {
    // Instead of pushing to '/review', let's set up a placeholder
    // We'll implement this route later
    router.push('/memory/1'); // Navigate to a specific memory as placeholder
  };
  
  // Get today's date in a readable format
  const today = new Date();
  const formattedDate = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric' 
  });
  
  // Sample data for today's memories
  const todaysMemories = [
    { 
      id: '1', 
      type: 'place', 
      title: 'Coffee at Main St Café', 
      time: '10:30 AM',
      details: 'Had a blueberry scone with coffee' 
    },
    { 
      id: '2', 
      type: 'person', 
      title: 'Chat with Sarah', 
      time: '1:15 PM', 
      details: 'Discussed grandson\'s baseball game on Saturday' 
    }
  ];
  
  // Sample data for upcoming events
  const upcomingEvents = [
    { 
      id: '1', 
      title: 'Doctor Appointment', 
      date: 'Tomorrow, 10:30 AM', 
      location: 'City Medical Center' 
    }
  ];
  
  // Function to render the appropriate icon based on memory type
  const renderMemoryIcon = (type: string) => {
    switch(type) {
      case 'place':
        return <Ionicons name="location" size={20} color={Colors.light.primary} />;
      case 'person':
        return <Ionicons name="person" size={20} color={Colors.light.primary} />;
      case 'activity':
        return <Ionicons name="time" size={20} color={Colors.light.primary} />;
      default:
        return <Ionicons name="chatbubble" size={20} color={Colors.light.primary} />;
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Header - more compact */}
        <View style={styles.header}>
          <Text style={styles.title}>It's time to remember <Text style={styles.titleHighlight}>what matters.</Text></Text>
          <Text style={styles.subtitle}>Capture your day with ease.</Text>
        </View>
        
        {/* Date indicator - made more subtle */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{formattedDate}</Text>
        </View>
        
        {/* Memory strength & Quick actions - combined in one row */}
        <View style={styles.memoryActionsRow}>
          {/* Memory strength indicator */}
          <View style={styles.memoryStrengthContainerCompact}>
            <View style={styles.memoryStrengthHeader}>
              <Ionicons name="analytics" size={18} color={Colors.light.primary} style={styles.memoryStrengthIcon} />
              <Text style={styles.memoryStrengthTitle}>Memory Strength</Text>
            </View>
            <Text style={styles.memoryStrengthScore}>85%</Text>
          </View>

          {/* Record button - converted to compact floating button */}
          <TouchableOpacity 
            style={styles.recordButtonCompact} 
            onPress={navigateToRecord}
            activeOpacity={0.8}
          >
            <Ionicons name="mic" size={20} color="#fff" />
            <Text style={styles.recordButtonTextCompact}>Record</Text>
          </TouchableOpacity>
        </View>
        
        {/* Today's memories */}
        <View style={styles.memoriesSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Today's Memories</Text>
            {todaysMemories.length > 0 && (
              <TouchableOpacity onPress={navigateToReview}>
                <Text style={styles.seeAllText}>See All</Text>
              </TouchableOpacity>
            )}
          </View>
          
          {todaysMemories.length > 0 ? (
            <View style={styles.memoriesGrid}>
              {todaysMemories.map(memory => (
                <TouchableOpacity 
                  key={memory.id} 
                  style={styles.memoryCardCompact}
                  activeOpacity={0.8}
                  onPress={() => router.push(`/memory/${memory.id}`)}
                >
                  <View style={styles.memoryCardHeader}>
                    {renderMemoryIcon(memory.type)}
                    <Text style={styles.memoryTime}>{memory.time}</Text>
                  </View>
                  <Text style={styles.memoryTitle} numberOfLines={2}>{memory.title}</Text>
                  <Text style={styles.memoryDetails} numberOfLines={2}>{memory.details}</Text>
                </TouchableOpacity>
              ))}
              
              {/* Add memory button - repositioned */}
              <TouchableOpacity 
                style={styles.addMemoryButtonCompact}
                activeOpacity={0.7}
                onPress={navigateToRecord}
              >
                <View style={styles.addMemoryIconContainer}>
                  <Ionicons name="add" size={24} color={Colors.light.primary} />
                </View>
                <Text style={styles.addMemoryText}>Add New Memory</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.emptyMemoriesContainer}>
              <Ionicons name="journal-outline" size={40} color={Colors.light.text} style={styles.emptyIcon} />
              <Text style={styles.emptyTitle}>No memories yet</Text>
              <Text style={styles.emptyMessage}>
                Start recording your day to help you remember what matters.
              </Text>
              <TouchableOpacity 
                style={styles.createMemoryButton}
                activeOpacity={0.8}
                onPress={navigateToRecord}
              >
                <Text style={styles.createMemoryButtonText}>Create First Memory</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>
        
        {/* Upcoming events - more compact */}
        <View style={styles.eventsSection}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Upcoming Events</Text>
            <TouchableOpacity>
              <Text style={styles.seeAllText}>See All</Text>
            </TouchableOpacity>
          </View>
          
          {upcomingEvents.map(event => (
            <View key={event.id} style={styles.eventItemCompact}>
              <View style={styles.eventIconContainer}>
                <Ionicons name="calendar" size={18} color={Colors.light.primary} />
              </View>
              <View style={styles.eventTextContainer}>
                <Text style={styles.eventTitle}>{event.title}</Text>
                <Text style={styles.eventDate}>{event.date}</Text>
                <Text style={styles.eventLocation}>{event.location}</Text>
              </View>
            </View>
          ))}
        </View>
        
        {/* Memory stats - made more compact */}
        <View style={styles.statsSection}>
          <Text style={styles.statsLabel}>Total Memories</Text>
          <Text style={styles.statsNumber}>32</Text>
          <Text style={styles.statsDescription}>You're building a great collection!</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
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
  header: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  title: {
    ...Typography.heading2,
    marginBottom: Spacing.xs,
  },
  titleHighlight: {
    color: Colors.light.primary,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.light.text,
    opacity: 0.8,
  },
  dateContainer: {
    paddingHorizontal: Spacing.screenPadding,
    paddingBottom: Spacing.xs,
  },
  dateText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    opacity: 0.6,
  },
  // New combined row for memory strength and quick action
  memoryActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.md,
  },
  // More compact memory strength container
  memoryStrengthContainerCompact: {
    flex: 1,
    backgroundColor: '#F5F9F8',
    borderRadius: 12,
    padding: Spacing.md,
    ...Shadows.small,
  },
  memoryStrengthHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  memoryStrengthIcon: {
    marginRight: Spacing.xs,
  },
  memoryStrengthTitle: {
    ...Typography.bodySmall,
    fontWeight: '600',
    color: Colors.light.text,
  },
  memoryStrengthScore: {
    ...Typography.heading3,
    color: Colors.light.primary,
  },
  // Compact record button
  recordButtonCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    marginLeft: Spacing.md,
    ...Shadows.small,
  },
  recordButtonTextCompact: {
    ...Typography.buttonMedium,
    color: '#fff',
    marginLeft: Spacing.xs,
  },
  // Sections styling
  memoriesSection: {
    marginBottom: Spacing.lg,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    marginBottom: Spacing.sm,
  },
  sectionTitle: {
    ...Typography.heading3,
    color: Colors.light.text,
  },
  seeAllText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
  },
  // More compact memory card grid
  memoriesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: Spacing.screenPadding,
  },
  memoryCardCompact: {
    width: '48%', // Two cards per row with gap
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    marginRight: '4%',
    ...Shadows.small,
  },
  memoryCardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  memoryTime: {
    ...Typography.caption,
    color: Colors.light.icon,
  },
  memoryTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  memoryDetails: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    opacity: 0.8,
  },
  // Compact add memory button
  addMemoryButtonCompact: {
    width: '48%',
    height: 120,
    borderWidth: 1,
    borderColor: Colors.light.primary,
    borderStyle: 'dashed',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  addMemoryIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  addMemoryText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    textAlign: 'center',
  },
  // Compact events section
  eventsSection: {
    marginBottom: Spacing.lg,
  },
  eventItemCompact: {
    flexDirection: 'row',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.sm,
    marginBottom: Spacing.xs,
  },
  eventIconContainer: {
    backgroundColor: '#E6F2F0',
    borderRadius: 12,
    padding: Spacing.xs,
    marginRight: Spacing.sm,
  },
  // Empty state styling - more compact
  emptyMemoriesContainer: {
    alignItems: 'center',
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.screenPadding,
  },
  emptyIcon: {
    marginBottom: Spacing.sm,
    opacity: 0.5,
  },
  emptyTitle: {
    ...Typography.heading3,
    color: Colors.light.text,
    marginBottom: Spacing.xs,
  },
  emptyMessage: {
    ...Typography.bodyMedium,
    color: Colors.light.text,
    opacity: 0.8,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  createMemoryButton: {
    backgroundColor: Colors.light.primary,
    paddingHorizontal: Spacing.xl,
    paddingVertical: Spacing.md,
    borderRadius: 12,
    ...Shadows.small,
  },
  createMemoryButtonText: {
    ...Typography.buttonMedium,
    color: '#fff',
  },
  // Compact stats section
  statsSection: {
    paddingVertical: Spacing.lg,
    paddingHorizontal: Spacing.screenPadding,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
    backgroundColor: '#F9F9F9',
    alignItems: 'center',
  },
  statsLabel: {
    ...Typography.bodySmall,
    fontWeight: '500',
    color: Colors.light.text,
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 2,
  },
  statsNumber: {
    ...Typography.heading2,
    color: Colors.light.text,
    marginBottom: 2,
  },
  statsDescription: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    opacity: 0.8,
  },
  eventTextContainer: {
    flex: 1,
  },
  eventTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    color: Colors.light.text,
  },
  eventDate: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
  eventLocation: {
    ...Typography.bodySmall,
    color: Colors.light.text,
  },
});
