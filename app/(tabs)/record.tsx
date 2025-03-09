import React, { useState, useEffect } from 'react';
import { 
  StyleSheet, 
  View, 
  SafeAreaView, 
  ScrollView, 
  TouchableOpacity,
  Animated,
  Easing,
  ActivityIndicator
} from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Text } from 'react-native';
import { useRouter } from 'expo-router';
import { Colors, Typography, Spacing, Shadows } from '@/constants';
import { Button } from '@/components/ui/core';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';

export default function RecordScreen() {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  const [transcriptPreview, setTranscriptPreview] = useState("");
  const [processingStage, setProcessingStage] = useState(0); // 0: not started, 1: recording, 2: processing, 3: complete
  const [currentPromptIndex, setCurrentPromptIndex] = useState(0);
  const [showHelp, setShowHelp] = useState(false);
  
  // Animation for the recording button pulse
  const pulseAnim = new Animated.Value(1);
  
  // Prompts to help guide the user's memory recall
  const prompts = [
    "Who did you meet with today?",
    "What places did you visit?",
    "Did you eat anything special?",
    "Did you hear any interesting news?",
    "What made you happy today?"
  ];
  
  useEffect(() => {
    let promptTimer: NodeJS.Timeout | undefined;
    let recordingTimer: NodeJS.Timeout | undefined;
    
    if (isRecording) {
      // Start pulsing animation
      startPulseAnimation();
      
      // Cycle through prompts every 20 seconds
      promptTimer = setInterval(() => {
        setCurrentPromptIndex(prev => (prev + 1) % prompts.length);
      }, 20000);
      
      // Update recording time
      recordingTimer = setInterval(() => {
        setRecordingTime(prev => prev + 1);
      }, 1000);
      
      // Simulate transcript appearing
      setTimeout(() => {
        setTranscriptPreview("I went to the park today with my daughter Sarah. We had coffee at that new place on Main Street...");
      }, 2000);
    }
    
    return () => {
      if (promptTimer) clearInterval(promptTimer);
      if (recordingTimer) clearInterval(recordingTimer);
    };
  }, [isRecording, prompts.length]);
  
  const startPulseAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true
        })
      ])
    ).start();
  };
  
  const toggleRecording = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    
    if (!isRecording) {
      setIsRecording(true);
      setProcessingStage(1);
    } else {
      setIsRecording(false);
      setProcessingStage(2);
      
      // Simulate AI processing
      setTimeout(() => {
        setProcessingStage(3);
        Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      }, 1500);
    }
  };
  
  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const navigateBack = () => {
    router.back();
  };
  
  const toggleHelp = () => {
    setShowHelp(!showHelp);
  };
  
  const renderProcessingIndicator = () => {
    if (processingStage === 2) {
      return (
        <View>
          <ActivityIndicator size="large" color={Colors.light.primary} />
        </View>
      );
    } else if (processingStage === 3) {
      return (
        <View>
          <Ionicons name="checkmark-circle" size={40} color={Colors.light.primary} />
        </View>
      );
    }
    return null;
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar style="auto" />
      
      {/* Header with back button */}
      <View style={styles.headerCompact}>
        <TouchableOpacity 
          style={styles.backButtonCompact} 
          onPress={navigateBack}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Go back"
        >
          <Ionicons name="arrow-back" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Record Memory</Text>
        
        <TouchableOpacity 
          style={styles.helpButtonCompact} 
          onPress={toggleHelp}
          hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          accessibilityLabel="Help"
        >
          <Ionicons name="help-circle-outline" size={24} color={Colors.light.primary} />
        </TouchableOpacity>
      </View>
      
      {showHelp && (
        <View style={styles.helpContainer}>
          <Text style={styles.helpTitle}>How to record a memory</Text>
          <Text style={styles.helpText}>
            Tap and hold the microphone button to start recording.
            Release when you're done. Your memory will be transcribed automatically.
          </Text>
          <TouchableOpacity 
            style={styles.helpCloseButton}
            onPress={toggleHelp}
          >
            <Text style={styles.helpCloseButtonText}>Got it</Text>
          </TouchableOpacity>
        </View>
      )}
      
      <View style={styles.contentCompact}>
        {/* Stage 0: Recording prompt */}
        {processingStage === 0 && (
          <View style={styles.promptContainer}>
            <Animated.View
              style={[
                styles.micButtonContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <TouchableOpacity
                style={styles.micButtonCompact}
                onPress={toggleRecording}
                accessibilityLabel="Record memory"
                accessibilityHint="Tap to start recording your memory"
              >
                <Ionicons name="mic" size={32} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
            
            <Text style={styles.promptTitleCompact}>Hold to record a memory</Text>
            <Text style={styles.promptText}>
              Tap the mic and tell me what happened today. I'll help you remember it later.
            </Text>
            
            {/* Prompt suggestions */}
            <View style={styles.suggestionsContainer}>
              <Text style={styles.suggestionsTitle}>Try talking about:</Text>
              <View style={styles.suggestionsList}>
                {prompts.slice(0, 3).map((prompt, index) => (
                  <View key={index} style={styles.suggestionItem}>
                    <Ionicons name="chatbubble-outline" size={16} color={Colors.light.primary} style={styles.suggestionIcon} />
                    <Text style={styles.suggestionText}>{prompt}</Text>
                  </View>
                ))}
              </View>
            </View>
          </View>
        )}
        
        {/* Stage 1: Currently recording */}
        {processingStage === 1 && (
          <View style={styles.recordingContainer}>
            <View style={styles.recordingHeader}>
              <Text style={styles.recordingTitle}>Recording...</Text>
              <Text style={styles.recordingTime}>{formatTime(recordingTime)}</Text>
            </View>
            
            <Animated.View
              style={[
                styles.micButtonContainer,
                { transform: [{ scale: pulseAnim }] }
              ]}
            >
              <TouchableOpacity
                style={[styles.micButtonCompact, styles.micButtonRecording]}
                onPress={toggleRecording}
                accessibilityLabel="Stop recording"
                accessibilityHint="Tap to stop recording"
              >
                <Ionicons name="square" size={24} color="#fff" />
              </TouchableOpacity>
            </Animated.View>
            
            <View style={styles.currentPromptContainer}>
              <Text style={styles.currentPromptLabel}>Try talking about:</Text>
              <Text style={styles.currentPromptText}>{prompts[currentPromptIndex]}</Text>
            </View>
            
            {transcriptPreview.length > 0 && (
              <View style={styles.transcriptContainer}>
                <Text style={styles.transcriptLabel}>Preview:</Text>
                <Text style={styles.transcriptPreview} numberOfLines={3}>
                  {transcriptPreview}
                </Text>
              </View>
            )}
          </View>
        )}
        
        {/* Stage 2: Processing memory */}
        {processingStage === 2 && (
          <View style={styles.processingContainer}>
            {renderProcessingIndicator()}
            <Text style={styles.processingTitle}>Processing your memory</Text>
            <Text style={styles.processingText}>
              I'm transcribing your recording and extracting key details...
            </Text>
          </View>
        )}
        
        {/* Stage 3: Memory saved */}
        {processingStage === 3 && (
          <View style={styles.successContainer}>
            <View style={styles.successIconContainer}>
              <Ionicons name="checkmark-circle" size={64} color={Colors.light.primary} />
            </View>
            <Text style={styles.successTitle}>Memory Saved!</Text>
            <Text style={styles.successText}>
              Your memory has been saved and is ready to help you recall important details later.
            </Text>
            <TouchableOpacity
              style={styles.successButton}
              onPress={navigateBack}
              accessibilityLabel="Return to home"
            >
              <Text style={styles.successButtonText}>Return to Home</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // Compact header design
  headerCompact: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.screenPadding,
    paddingVertical: Spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  backButtonCompact: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
  },
  helpButtonCompact: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(0, 105, 92, 0.1)',
  },
  headerTitle: {
    ...Typography.heading3,
    textAlign: 'center',
  },
  helpContainer: {
    margin: Spacing.md,
    padding: Spacing.md,
    backgroundColor: '#F5F9F8',
    borderRadius: 12,
    ...Shadows.small,
  },
  helpTitle: {
    ...Typography.bodyLarge,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  helpText: {
    ...Typography.bodyMedium,
    marginBottom: Spacing.md,
  },
  helpCloseButton: {
    alignSelf: 'flex-end',
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    backgroundColor: Colors.light.primary,
    borderRadius: 8,
  },
  helpCloseButtonText: {
    ...Typography.bodySmall,
    color: '#fff',
    fontWeight: '600',
  },
  contentCompact: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: Spacing.screenPadding,
  },
  promptContainer: {
    alignItems: 'center',
  },
  micButtonContainer: {
    marginBottom: Spacing.lg,
  },
  micButtonCompact: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: Colors.light.primary,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  micButtonRecording: {
    backgroundColor: Colors.light.error,
  },
  promptTitleCompact: {
    ...Typography.heading3,
    textAlign: 'center',
    marginBottom: Spacing.sm,
  },
  promptText: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    color: Colors.light.text,
    marginBottom: Spacing.xl,
    opacity: 0.8,
  },
  suggestionsContainer: {
    width: '100%',
    backgroundColor: '#F5F9F8',
    borderRadius: 12,
    padding: Spacing.md,
  },
  suggestionsTitle: {
    ...Typography.bodyMedium,
    fontWeight: '600',
    marginBottom: Spacing.sm,
  },
  suggestionsList: {
  },
  suggestionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  suggestionIcon: {
    marginRight: Spacing.xs,
  },
  suggestionText: {
    ...Typography.bodyMedium,
  },
  recordingContainer: {
    width: '100%',
  },
  recordingHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.lg,
  },
  recordingTitle: {
    ...Typography.heading3,
    color: Colors.light.error,
  },
  recordingTime: {
    ...Typography.heading3,
    color: Colors.light.error,
  },
  currentPromptContainer: {
    marginVertical: Spacing.lg,
    backgroundColor: '#F5F9F8',
    borderRadius: 12,
    padding: Spacing.md,
  },
  currentPromptLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  currentPromptText: {
    ...Typography.bodyLarge,
    color: Colors.light.primary,
    fontWeight: '600',
    fontStyle: 'italic',
  },
  transcriptContainer: {
    marginTop: Spacing.lg,
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: Spacing.md,
  },
  transcriptLabel: {
    ...Typography.bodySmall,
    fontWeight: '600',
    marginBottom: Spacing.xs,
  },
  transcriptPreview: {
    ...Typography.bodyMedium,
    fontStyle: 'italic',
  },
  processingContainer: {
    alignItems: 'center',
  },
  processingTitle: {
    ...Typography.heading3,
    textAlign: 'center',
    marginVertical: Spacing.md,
  },
  processingText: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    color: Colors.light.text,
    opacity: 0.8,
  },
  successContainer: {
    alignItems: 'center',
  },
  successIconContainer: {
    marginBottom: Spacing.lg,
  },
  successTitle: {
    ...Typography.heading2,
    marginBottom: Spacing.sm,
  },
  successText: {
    ...Typography.bodyMedium,
    textAlign: 'center',
    color: Colors.light.text,
    marginBottom: Spacing.xl,
    opacity: 0.8,
  },
  successButton: {
    backgroundColor: Colors.light.primary,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.xl,
    borderRadius: 12,
    ...Shadows.small,
  },
  successButtonText: {
    ...Typography.buttonMedium,
    color: '#fff',
  },
}); 