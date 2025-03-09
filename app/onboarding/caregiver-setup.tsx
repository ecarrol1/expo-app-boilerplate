import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { TextField } from '@/components/ui/core';

export default function CaregiverSetupScreen() {
  const router = useRouter();
  const [inviteCaregivers, setInviteCaregivers] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [permissions, setPermissions] = useState({
    viewMemories: true,
    addMemories: false,
    editMemories: false,
  });

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (inviteCaregivers && !validateEmail(email)) {
      setEmailError('Please enter a valid email address');
      return;
    }
    
    router.push('/onboarding/completion');
  };

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const togglePermission = (key: keyof typeof permissions) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPermissions(prev => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
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
                <View style={[styles.progressIndicator, { width: '75%' }]} />
              </View>
              <Text style={styles.progressText}>Step 3 of 4</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>Caregiver Setup</Text>
            <Text style={styles.subtitle}>
              Invite a trusted person to help manage your memories and provide support.
            </Text>

            <View style={styles.optionContainer}>
              <View style={styles.optionHeader}>
                <Text style={styles.optionTitle}>Invite a Caregiver</Text>
                <Switch
                  trackColor={{ false: '#E0E0E0', true: 'rgba(0, 105, 92, 0.3)' }}
                  thumbColor={inviteCaregivers ? Colors.light.primary : '#F5F5F5'}
                  ios_backgroundColor="#E0E0E0"
                  onValueChange={() => {
                    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
                    setInviteCaregivers(!inviteCaregivers);
                    if (!inviteCaregivers) setEmailError('');
                  }}
                  value={inviteCaregivers}
                />
              </View>
              <Text style={styles.optionDescription}>
                Caregivers can help you manage your memories and provide support when needed.
              </Text>
            </View>

            {inviteCaregivers && (
              <View style={styles.caregiverFormContainer}>
                <TextField
                  label="Caregiver's Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    if (validateEmail(text) || text === '') setEmailError('');
                  }}
                  placeholder="Enter email address"
                  error={emailError}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="done"
                />

                <Text style={styles.permissionsTitle}>Caregiver Permissions</Text>
                <Text style={styles.permissionsSubtitle}>
                  Choose what your caregiver can do:
                </Text>

                <View style={styles.permissionsList}>
                  <View style={styles.permissionItem}>
                    <View style={styles.permissionTextContainer}>
                      <Text style={styles.permissionTitle}>View Memories</Text>
                      <Text style={styles.permissionDescription}>
                        Allow caregiver to see your recorded memories
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: '#E0E0E0', true: 'rgba(0, 105, 92, 0.3)' }}
                      thumbColor={permissions.viewMemories ? Colors.light.primary : '#F5F5F5'}
                      ios_backgroundColor="#E0E0E0"
                      onValueChange={() => togglePermission('viewMemories')}
                      value={permissions.viewMemories}
                    />
                  </View>

                  <View style={styles.permissionItem}>
                    <View style={styles.permissionTextContainer}>
                      <Text style={styles.permissionTitle}>Add Memories</Text>
                      <Text style={styles.permissionDescription}>
                        Allow caregiver to add new memories on your behalf
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: '#E0E0E0', true: 'rgba(0, 105, 92, 0.3)' }}
                      thumbColor={permissions.addMemories ? Colors.light.primary : '#F5F5F5'}
                      ios_backgroundColor="#E0E0E0"
                      onValueChange={() => togglePermission('addMemories')}
                      value={permissions.addMemories}
                    />
                  </View>

                  <View style={styles.permissionItem}>
                    <View style={styles.permissionTextContainer}>
                      <Text style={styles.permissionTitle}>Edit Memories</Text>
                      <Text style={styles.permissionDescription}>
                        Allow caregiver to edit or delete your memories
                      </Text>
                    </View>
                    <Switch
                      trackColor={{ false: '#E0E0E0', true: 'rgba(0, 105, 92, 0.3)' }}
                      thumbColor={permissions.editMemories ? Colors.light.primary : '#F5F5F5'}
                      ios_backgroundColor="#E0E0E0"
                      onValueChange={() => togglePermission('editMemories')}
                      value={permissions.editMemories}
                    />
                  </View>
                </View>
              </View>
            )}

            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.light.secondary} />
              <Text style={styles.infoText}>
                You can add or remove caregivers at any time in the app settings.
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
              <Ionicons name="arrow-forward" size={20} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </ScrollView>
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
  scrollContent: {
    flexGrow: 1,
    paddingBottom: Spacing.xl,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.md,
    paddingBottom: Spacing.sm,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
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
  content: {
    paddingHorizontal: Spacing.screenPadding,
    paddingTop: Spacing.xl,
  },
  title: {
    ...Typography.heading2,
    color: Colors.light.text,
    marginBottom: Spacing.sm,
  },
  subtitle: {
    ...Typography.bodyLarge,
    color: Colors.light.secondary,
    marginBottom: Spacing.xl,
  },
  optionContainer: {
    backgroundColor: 'rgba(0, 105, 92, 0.05)',
    borderRadius: 16,
    padding: Spacing.md,
    marginBottom: Spacing.lg,
  },
  optionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  optionTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    color: Colors.light.text,
  },
  optionDescription: {
    ...Typography.bodyMedium,
    color: Colors.light.secondary,
  },
  caregiverFormContainer: {
    marginBottom: Spacing.lg,
  },
  permissionsTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    color: Colors.light.text,
    marginTop: Spacing.lg,
    marginBottom: Spacing.xs,
  },
  permissionsSubtitle: {
    ...Typography.bodyMedium,
    color: Colors.light.secondary,
    marginBottom: Spacing.md,
  },
  permissionsList: {
    backgroundColor: 'rgba(0, 105, 92, 0.05)',
    borderRadius: 16,
    padding: Spacing.sm,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 105, 92, 0.1)',
  },
  permissionTextContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  permissionTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    color: Colors.light.text,
    marginBottom: 2,
  },
  permissionDescription: {
    ...Typography.bodySmall,
    color: Colors.light.secondary,
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 105, 92, 0.05)',
    padding: Spacing.md,
    borderRadius: 12,
    marginBottom: Spacing.xl,
  },
  infoText: {
    ...Typography.bodyMedium,
    color: Colors.light.secondary,
    marginLeft: Spacing.xs,
    flex: 1,
  },
  buttonContainer: {
    paddingHorizontal: Spacing.screenPadding,
    marginTop: 'auto',
  },
  nextButton: {
    backgroundColor: Colors.light.primary,
    borderRadius: 16,
    paddingVertical: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    ...Shadows.medium,
  },
  nextButtonText: {
    ...Typography.bodyLarge,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
}); 