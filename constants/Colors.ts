/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

/**
 * Recall Companion App Color Palette
 * These colors are designed to create a calming, accessible, and non-clinical aesthetic
 * that meets WCAG AA standards for readability and contrast.
 */

// Primary colors
const primaryTeal = '#00695C';
const secondaryBeige = '#F5F5DC';
const textDarkGray = '#333333';
const accentCoral = '#FF6F61';
const successGreen = '#4CAF50';

// Light mode variations
const backgroundLight = '#FFFFFF';
const backgroundGradientLight = ['#FFFFFF', '#F5F5DC'];

// Dark mode variations
const primaryTealDark = '#00897B';
const backgroundDark = '#121212';
const textLightGray = '#E0E0E0';
const backgroundGradientDark = ['#121212', '#1E2A2A'];

export const Colors = {
  light: {
    primary: primaryTeal,
    secondary: secondaryBeige,
    text: textDarkGray,
    background: backgroundLight,
    backgroundGradient: backgroundGradientLight,
    accent: accentCoral,
    success: successGreen,
    error: '#D32F2F',
    warning: '#FFA000',
    info: '#1976D2',
    border: '#E0E0E0',
    card: '#FFFFFF',
    icon: primaryTeal,
    tabIconDefault: '#687076',
    tabIconSelected: primaryTeal,
    disabled: '#9E9E9E',
  },
  dark: {
    primary: primaryTealDark,
    secondary: '#2C3333',
    text: textLightGray,
    background: backgroundDark,
    backgroundGradient: backgroundGradientDark,
    accent: accentCoral,
    success: '#66BB6A',
    error: '#EF5350',
    warning: '#FFB74D',
    info: '#42A5F5',
    border: '#424242',
    card: '#1E1E1E',
    icon: primaryTealDark,
    tabIconDefault: '#9BA1A6',
    tabIconSelected: primaryTealDark,
    disabled: '#616161',
  },
};
