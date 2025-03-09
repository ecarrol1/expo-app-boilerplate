import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Switch, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

type Permission = {
  id: string;
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  required: boolean;
};

export default function PermissionsScreen() {
  const router = useRouter();
  const [permissions, setPermissions] = useState<Record<string, boolean>>({
    microphone: false,
    notifications: false,
    camera: false,
  });

  const permissionsList: Permission[] = [
    {
      id: 'microphone',
      title: 'Microphone Access',
      description: 'Required for voice recording your memories',
      icon: 'mic',
      required: true,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      description: 'For memory check-ins and important reminders',
      icon: 'notifications',
      required: true,
    },
    {
      id: 'camera',
      title: 'Camera Access',
      description: 'Optional for adding photos to your memories',
      icon: 'camera',
      required: false,
    },
  ];

  const handleBack = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    router.back();
  };

  const handleNext = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    // Check if required permissions are granted
    const requiredPermissionsGranted = permissionsList
      .filter(p => p.required)
      .every(p => permissions[p.id]);
      
    if (!requiredPermissionsGranted) {
      alert('Please grant all required permissions to continue.');
      return;
    }
    
    router.push('/onboarding/caregiver-setup');
  };

  const togglePermission = (id: string) => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setPermissions(prev => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  const allRequiredGranted = permissionsList
    .filter(p => p.required)
    .every(p => permissions[p.id]);

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
                <View style={[styles.progressIndicator, { width: '50%' }]} />
              </View>
              <Text style={styles.progressText}>Step 2 of 4</Text>
            </View>
          </View>

          <View style={styles.content}>
            <Text style={styles.title}>App Permissions</Text>
            <Text style={styles.subtitle}>
              To help you remember better, we need access to a few features on your device.
            </Text>

            <View style={styles.permissionsContainer}>
              {permissionsList.map((permission) => (
                <View key={permission.id} style={styles.permissionItem}>
                  <View style={styles.permissionIconContainer}>
                    <Ionicons name={permission.icon} size={24} color={Colors.light.primary} />
                  </View>
                  <View style={styles.permissionTextContainer}>
                    <View style={styles.permissionTitleRow}>
                      <Text style={styles.permissionTitle}>{permission.title}</Text>
                      {permission.required && (
                        <View style={styles.requiredBadge}>
                          <Text style={styles.requiredBadgeText}>Required</Text>
                        </View>
                      )}
                    </View>
                    <Text style={styles.permissionDescription}>{permission.description}</Text>
                  </View>
                  <Switch
                    trackColor={{ false: '#E0E0E0', true: 'rgba(0, 105, 92, 0.3)' }}
                    thumbColor={permissions[permission.id] ? Colors.light.primary : '#F5F5F5'}
                    ios_backgroundColor="#E0E0E0"
                    onValueChange={() => togglePermission(permission.id)}
                    value={permissions[permission.id]}
                  />
                </View>
              ))}
            </View>

            <View style={styles.infoContainer}>
              <Ionicons name="information-circle-outline" size={20} color={Colors.light.secondary} />
              <Text style={styles.infoText}>
                You can change these permissions later in the app settings.
              </Text>
            </View>
          </View>

          <View style={styles.buttonContainer}>
            <TouchableOpacity 
              style={[
                styles.nextButton,
                !allRequiredGranted && styles.nextButtonDisabled
              ]} 
              onPress={handleNext}
              activeOpacity={0.8}
              disabled={!allRequiredGranted}
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
  permissionsContainer: {
    marginBottom: Spacing.xl,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0, 105, 92, 0.1)',
  },
  permissionIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  permissionTextContainer: {
    flex: 1,
    marginRight: Spacing.md,
  },
  permissionTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  permissionTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    color: Colors.light.text,
    marginRight: Spacing.xs,
  },
  requiredBadge: {
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 10,
  },
  requiredBadgeText: {
    ...Typography.bodySmall,
    color: Colors.light.primary,
    fontWeight: '500',
  },
  permissionDescription: {
    ...Typography.bodyMedium,
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
  nextButtonDisabled: {
    backgroundColor: Colors.light.disabled,
  },
  nextButtonText: {
    ...Typography.bodyLarge,
    color: '#FFFFFF',
    fontWeight: '600',
    marginRight: Spacing.xs,
  },
}); 