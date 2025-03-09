import React, { useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function CompletionScreen() {
  const router = useRouter();
  const scaleAnim = React.useRef(new Animated.Value(0.8)).current;
  const opacityAnim = React.useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Animation sequence for the success checkmark
    Animated.sequence([
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 4,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    // Haptic feedback for success
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
  }, []);

  const handleStartUsingApp = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.replace('/(tabs)');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.header}>
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View style={[styles.progressIndicator, { width: '100%' }]} />
              </View>
              <Text style={styles.progressText}>Setup Complete</Text>
            </View>
          </View>

          <View style={styles.successContainer}>
            <Animated.View 
              style={[
                styles.checkmarkContainer,
                {
                  opacity: opacityAnim,
                  transform: [{ scale: scaleAnim }]
                }
              ]}
            >
              <Ionicons name="checkmark-circle" size={120} color={Colors.light.primary} />
            </Animated.View>
            <Text style={styles.title}>You're all set!</Text>
            <Text style={styles.subtitle}>
              Your Recall Companion is ready to help you remember life's important moments.
            </Text>
          </View>

          <View style={styles.featuresContainer}>
            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="mic" size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Record Memories</Text>
                <Text style={styles.featureDescription}>
                  Easily capture your daily experiences with voice recording
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="calendar" size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Review Anytime</Text>
                <Text style={styles.featureDescription}>
                  Browse your memories by date, people, or places
                </Text>
              </View>
            </View>

            <View style={styles.featureItem}>
              <View style={styles.featureIconContainer}>
                <Ionicons name="people" size={24} color={Colors.light.primary} />
              </View>
              <View style={styles.featureTextContainer}>
                <Text style={styles.featureTitle}>Prepare for Conversations</Text>
                <Text style={styles.featureDescription}>
                  Get quick memory refreshers before meeting people
                </Text>
              </View>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.startButton} 
              onPress={handleStartUsingApp}
              activeOpacity={0.8}
            >
              <Text style={styles.startButtonText}>Start Using App</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
  safeArea: {
    flex: 1,
  },
  content: {
    flex: 1,
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.md,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingBottom: Spacing.sm,
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    borderRadius: 2,
    overflow: 'hidden',
    marginBottom: Spacing.xs,
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.light.secondary,
  },
  successContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
    marginBottom: Spacing.xl,
  },
  checkmarkContainer: {
    marginBottom: Spacing.lg,
  },
  title: {
    ...Typography.heading1,
    color: Colors.light.text,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.light.secondary,
    textAlign: 'center',
    paddingHorizontal: Spacing.md,
  },
  featuresContainer: {
    marginBottom: Spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.sm,
    backgroundColor: 'rgba(0, 105, 92, 0.05)',
    borderRadius: 16,
  },
  featureIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  featureTextContainer: {
    flex: 1,
  },
  featureTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  featureDescription: {
    ...Typography.bodyMedium,
    color: Colors.light.secondary,
  },
  buttonContainer: {
    marginTop: 'auto',
  },
  startButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  startButtonText: {
    ...Typography.bodyLarge,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
}); 