/**
 * Recall Companion App Shadows
 * 
 * These shadow styles create a consistent sense of depth and elevation throughout the app.
 * Subtle shadows help distinguish interactive elements and create a modern, elegant UI.
 */

import { Platform, ViewStyle } from 'react-native';

// Define shadow interface
interface ShadowStyle {
  small: ViewStyle;
  medium: ViewStyle;
  large: ViewStyle;
  extraLarge: ViewStyle;
}

// Shadow styles for iOS
const iosShadows: ShadowStyle = {
  small: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.18,
    shadowRadius: 1.0,
  },
  medium: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
  },
  large: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.30,
    shadowRadius: 4.65,
  },
  extraLarge: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
  },
};

// Shadow styles for Android (using elevation)
const androidShadows: ShadowStyle = {
  small: {
    elevation: 2,
  },
  medium: {
    elevation: 5,
  },
  large: {
    elevation: 8,
  },
  extraLarge: {
    elevation: 12,
  },
};

// Export platform-specific shadows
export const Shadows: ShadowStyle = Platform.OS === 'ios' ? iosShadows : androidShadows; 