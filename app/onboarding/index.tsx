import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

const { width } = Dimensions.get('window');

export default function WelcomeScreen() {
  const router = useRouter();

  const handleGetStarted = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/onboarding/profile-setup');
  };

  const handleHowItWorks = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.push('/onboarding/features');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.content}>
          <View style={styles.logoContainer}>
            <View style={styles.logoBackground}>
              <Ionicons name="bookmark" size={64} color={Colors.light.primary} />
            </View>
            <Text style={styles.appName}>Recall Companion</Text>
          </View>

          <View style={styles.messageContainer}>
            <Text style={styles.title}>Remember with confidence</Text>
            <Text style={styles.subtitle}>
              Your personal memory assistant that helps you recall daily experiences and maintain meaningful connections.
            </Text>
          </View>

          <View style={styles.illustrationContainer}>
            <View style={styles.illustrationBackground}>
              <Ionicons name="book" size={48} color={Colors.light.primary} style={styles.illustrationIcon} />
              <Ionicons name="people" size={48} color={Colors.light.primary} style={styles.illustrationIcon} />
              <Ionicons name="calendar" size={48} color={Colors.light.primary} style={styles.illustrationIcon} />
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={styles.primaryButton} 
              onPress={handleGetStarted}
              activeOpacity={0.8}
            >
              <Text style={styles.primaryButtonText}>Get Started</Text>
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.secondaryButton} 
              onPress={handleHowItWorks}
              activeOpacity={0.8}
            >
              <Text style={styles.secondaryButtonText}>How It Works</Text>
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
    paddingVertical: Spacing.xl,
    justifyContent: 'space-between',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: Spacing.lg,
  },
  logoBackground: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: Spacing.sm,
  },
  appName: {
    ...Typography.heading3,
    color: Colors.light.primary,
    fontWeight: '700',
  },
  messageContainer: {
    alignItems: 'center',
    marginTop: Spacing.xl,
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
    paddingHorizontal: Spacing.lg,
    lineHeight: 24,
  },
  illustrationContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: Spacing.xl,
  },
  illustrationBackground: {
    width: width * 0.8,
    height: width * 0.4,
    backgroundColor: 'rgba(0, 105, 92, 0.05)',
    borderRadius: 24,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    paddingHorizontal: Spacing.lg,
  },
  illustrationIcon: {
    opacity: 0.8,
  },
  buttonContainer: {
    marginTop: Spacing.xl,
    gap: Spacing.md,
  },
  primaryButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  primaryButtonText: {
    ...Typography.bodyLarge,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
  secondaryButton: {
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0, 105, 92, 0.3)',
  },
  secondaryButtonText: {
    ...Typography.bodyLarge,
    color: Colors.light.primary,
    fontWeight: '600',
  },
}); 