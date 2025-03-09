import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image, KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { TextField } from '@/components/ui/core';

export default function ProfileSetupScreen() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleNext = () => {
    if (!name.trim()) {
      setNameError('Please enter your name');
      return;
    }
    
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    router.push('/onboarding/permissions');
  };

  const handleSelectImage = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    // We'll implement this later when we add the image picker dependency
    alert('This feature will be implemented soon!');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <KeyboardAvoidingView 
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          style={styles.keyboardAvoid}
        >
          <ScrollView 
            contentContainerStyle={styles.scrollContent}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.header}>
              <TouchableOpacity 
                style={styles.backButton} 
                onPress={handleBack}
                hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
              >
                <Ionicons name="chevron-back" size={24} color={Colors.light.primary} />
              </TouchableOpacity>
              <View style={styles.progressContainer}>
                <View style={styles.progressBar}>
                  <View style={[styles.progressIndicator, { width: '25%' }]} />
                </View>
                <Text style={styles.progressText}>Step 1 of 4</Text>
              </View>
            </View>

            <View style={styles.content}>
              <Text style={styles.title}>Create your profile</Text>
              <Text style={styles.subtitle}>
                Let's personalize your experience.
              </Text>

              <View style={styles.profileRow}>
                <View style={styles.profileImageContainer}>
                  <TouchableOpacity 
                    style={styles.profileImageButton} 
                    onPress={handleSelectImage}
                    activeOpacity={0.8}
                  >
                    <View style={styles.profileImagePlaceholder}>
                      <Ionicons name="person" size={32} color={Colors.light.primary} />
                      <View style={styles.addIconContainer}>
                        <Ionicons name="add-circle" size={20} color={Colors.light.primary} />
                      </View>
                    </View>
                  </TouchableOpacity>
                  <Text style={styles.profileImageLabel}>
                    Add photo
                  </Text>
                </View>

                <View style={styles.formContainer}>
                  <TextField
                    label="Your Name"
                    value={name}
                    onChangeText={(text) => {
                      setName(text);
                      if (text.trim()) setNameError('');
                    }}
                    placeholder="Enter your name"
                    error={nameError}
                    autoCapitalize="words"
                    returnKeyType="done"
                  />
                </View>
              </View>

              <View style={styles.infoContainer}>
                <Ionicons name="information-circle-outline" size={18} color={Colors.light.text} style={styles.infoIcon} />
                <Text style={styles.infoText}>
                  Your name helps personalize your experience and memory prompts.
                </Text>
              </View>
            </View>

            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.nextButton}
                onPress={handleNext}
                activeOpacity={0.8}
              >
                <Text style={styles.nextButtonText}>Continue</Text>
                <Ionicons name="arrow-forward" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </ScrollView>
        </KeyboardAvoidingView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  safeArea: {
    flex: 1,
  },
  keyboardAvoid: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    padding: Spacing.screenPadding,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  backButton: {
    padding: Spacing.xs,
    marginRight: Spacing.xs,
  },
  progressContainer: {
    flex: 1,
    paddingLeft: Spacing.xs,
  },
  progressBar: {
    height: 4,
    backgroundColor: '#E0E0E0',
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressIndicator: {
    height: '100%',
    backgroundColor: Colors.light.primary,
    borderRadius: 2,
  },
  progressText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    marginTop: 4,
  },
  content: {
    flex: 1,
    marginBottom: Spacing.md,
  },
  title: {
    ...Typography.heading2,
    marginBottom: Spacing.xs,
  },
  subtitle: {
    ...Typography.bodyMedium,
    color: Colors.light.text,
    marginBottom: Spacing.lg,
  },
  profileRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginRight: Spacing.lg,
  },
  profileImageButton: {
    marginBottom: Spacing.xs,
  },
  profileImagePlaceholder: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E6F2F0',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  addIconContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 2,
  },
  profileImageLabel: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
  },
  formContainer: {
    flex: 1,
  },
  infoContainer: {
    flexDirection: 'row',
    backgroundColor: '#F5F9F8',
    padding: Spacing.md,
    borderRadius: 8,
    marginTop: Spacing.xs,
  },
  infoIcon: {
    marginRight: Spacing.xs,
    marginTop: 1,
  },
  infoText: {
    ...Typography.bodySmall,
    color: Colors.light.text,
    flex: 1,
  },
  buttonContainer: {
    marginTop: 'auto',
    marginBottom: Spacing.md,
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    ...Shadows.small,
  },
  nextButtonText: {
    ...Typography.buttonMedium,
    color: '#fff',
    marginRight: Spacing.xs,
  },
}); 