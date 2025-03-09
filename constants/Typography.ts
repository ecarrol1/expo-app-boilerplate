/**
 * Recall Companion App Typography
 * 
 * Modern typography system optimized for iPhone 16 screens while maintaining excellent
 * readability and accessibility. Font sizes follow a clear visual hierarchy
 * and are designed for maximum legibility on mobile screens.
 * 
 * All font sizes are in scaled pixel units (sp) to support dynamic text sizing.
 */

import { Platform, TextStyle } from 'react-native';
import { Colors } from './Colors';

// Font families
const fontFamily = Platform.select({
  ios: {
    regular: 'SF Pro Text',
    medium: 'SF Pro Text',
    bold: 'SF Pro Text',
  },
  android: {
    regular: 'Roboto',
    medium: 'Roboto-Medium',
    bold: 'Roboto-Bold',
  },
  default: {
    regular: 'System',
    medium: 'System',
    bold: 'System',
  },
});

// Base text style
const baseTextStyle: TextStyle = {
  fontFamily: fontFamily?.regular,
  color: Colors.light.text,
  letterSpacing: 0.15,
};

export const Typography = {
  // Headings
  heading1: {
    ...baseTextStyle,
    fontSize: 28,
    fontFamily: fontFamily?.bold,
    fontWeight: '700',
    lineHeight: 34,
  } as TextStyle,
  
  heading2: {
    ...baseTextStyle,
    fontSize: 24,
    fontFamily: fontFamily?.bold,
    fontWeight: '700',
    lineHeight: 30,
  } as TextStyle,
  
  heading3: {
    ...baseTextStyle,
    fontSize: 20,
    fontFamily: fontFamily?.bold,
    fontWeight: '700',
    lineHeight: 26,
  } as TextStyle,
  
  // Body text
  bodyLarge: {
    ...baseTextStyle,
    fontSize: 18,
    lineHeight: 24,
  } as TextStyle,
  
  bodyMedium: {
    ...baseTextStyle,
    fontSize: 16,
    lineHeight: 22,
  } as TextStyle,
  
  bodySmall: {
    ...baseTextStyle,
    fontSize: 14,
    lineHeight: 20,
  } as TextStyle,
  
  // Button text
  buttonLarge: {
    ...baseTextStyle,
    fontSize: 18,
    fontFamily: fontFamily?.bold,
    fontWeight: '700',
    lineHeight: 24,
    textAlign: 'center',
  } as TextStyle,
  
  buttonMedium: {
    ...baseTextStyle,
    fontSize: 16,
    fontFamily: fontFamily?.bold,
    fontWeight: '700',
    lineHeight: 22,
    textAlign: 'center',
  } as TextStyle,
  
  // Label text
  label: {
    ...baseTextStyle,
    fontSize: 14,
    fontFamily: fontFamily?.medium,
    fontWeight: '500',
    lineHeight: 20,
  } as TextStyle,
  
  // Helper text
  helper: {
    ...baseTextStyle,
    fontSize: 14,
    lineHeight: 18,
    color: Colors.light.icon,
  } as TextStyle,
  
  // New styles for better hierarchy
  caption: {
    ...baseTextStyle,
    fontSize: 12,
    lineHeight: 16,
    color: Colors.light.icon,
  } as TextStyle,
  
  // Apply dark mode colors
  applyDarkMode: (style: TextStyle): TextStyle => {
    return {
      ...style,
      color: Colors.dark.text,
    };
  },
}; 