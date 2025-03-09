/**
 * Recall Companion App Spacing
 * 
 * These spacing values create a consistent rhythm throughout the app,
 * optimized for iPhone 16 and other modern devices.
 * Values are carefully balanced to maximize screen real estate while
 * maintaining accessibility and touch target sizes.
 */

export const Spacing = {
  // Base spacing unit (4px base)
  xs: 4,
  sm: 8,
  md: 12,  // Reduced from 16
  lg: 16,  // Reduced from 24
  xl: 24,  // Reduced from 32
  xxl: 32, // Reduced from 48
  xxxl: 48, // Reduced from 64
  
  // Specific use cases
  screenPadding: 16, // Reduced from 24
  cardPadding: 12,   // Reduced from 16
  buttonPadding: 12, // Reduced from 16
  inputPadding: 12,  // Reduced from 16
  
  // Minimum touch target size (44x44px - Apple HIG)
  touchTarget: 44,   // Reduced from 48, matching Apple HIG
  
  // Vertical spacing between sections
  sectionSpacing: 24, // Reduced from 32
  
  // Vertical spacing between items in a list
  listItemSpacing: 12, // Reduced from 16
  
  // Horizontal spacing between related elements
  inlineSpacing: 8,
  
  // Screen-specific spacing for responsive layouts
  compactScreenPadding: 12, // For smaller screens
  regularScreenPadding: 16, // For medium screens
  largeScreenPadding: 24,   // For larger screens
}; 