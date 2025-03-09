import React from 'react';
import {
  StyleSheet,
  TouchableOpacity,
  Text,
  ViewStyle,
  TextStyle,
  ActivityIndicator,
  View,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { Colors, Typography, Spacing, Shadows } from '../../../constants';

export type ButtonVariant = 'primary' | 'secondary' | 'text';
export type ButtonSize = 'large' | 'medium' | 'small';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  style?: ViewStyle;
  textStyle?: TextStyle;
  hapticFeedback?: boolean;
  accessibilityLabel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  loading = false,
  fullWidth = false,
  icon,
  style,
  textStyle,
  hapticFeedback = true,
  accessibilityLabel,
}) => {
  const handlePress = () => {
    if (disabled || loading) return;
    
    if (hapticFeedback) {
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    }
    
    onPress();
  };

  const getButtonStyles = (): ViewStyle => {
    const baseStyle: ViewStyle = {
      ...styles.button,
      ...styles[`${size}Button`],
      ...(fullWidth && styles.fullWidth),
    };

    if (disabled) {
      return {
        ...baseStyle,
        ...styles[`${variant}Disabled`],
      };
    }

    if (variant === 'text') {
      return {
        ...baseStyle,
        ...styles.textButton,
      };
    }

    return {
      ...baseStyle,
      ...styles[variant],
    };
  };

  const getTextStyles = (): TextStyle => {
    const baseTextStyle = {
      ...styles.text,
      ...styles[`${size}Text`],
    };

    if (disabled) {
      return {
        ...baseTextStyle,
        ...styles[`${variant}TextDisabled`],
      };
    }

    return {
      ...baseTextStyle,
      ...styles[`${variant}Text`],
    };
  };

  return (
    <TouchableOpacity
      style={[getButtonStyles(), style]}
      onPress={handlePress}
      disabled={disabled || loading}
      activeOpacity={0.8}
      accessibilityRole="button"
      accessibilityState={{ disabled: disabled || loading }}
      accessibilityLabel={accessibilityLabel || title}
    >
      <View style={styles.contentContainer}>
        {loading ? (
          <ActivityIndicator 
            size="small" 
            color={variant === 'primary' ? Colors.light.background : Colors.light.primary} 
          />
        ) : (
          <>
            {icon && <View style={styles.iconContainer}>{icon}</View>}
            <Text style={[getTextStyles(), textStyle]}>{title}</Text>
          </>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: 120,
  },
  fullWidth: {
    width: '100%',
  },
  contentContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconContainer: {
    marginRight: Spacing.sm,
  },
  text: {
    ...Typography.buttonMedium,
  },
  
  // Variants
  primary: {
    backgroundColor: Colors.light.primary,
    ...Shadows.small,
  },
  secondary: {
    backgroundColor: Colors.light.background,
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  textButton: {
    backgroundColor: 'transparent',
  },
  
  // Disabled states
  primaryDisabled: {
    backgroundColor: Colors.light.disabled,
    ...Shadows.small,
  },
  secondaryDisabled: {
    backgroundColor: Colors.light.background,
    borderWidth: 2,
    borderColor: Colors.light.disabled,
  },
  textDisabled: {
    backgroundColor: 'transparent',
  },
  
  // Text styles
  primaryText: {
    color: Colors.light.background,
  },
  secondaryText: {
    color: Colors.light.primary,
  },
  textText: {
    color: Colors.light.primary,
  },
  
  // Disabled text styles
  primaryTextDisabled: {
    color: Colors.light.background,
  },
  secondaryTextDisabled: {
    color: Colors.light.disabled,
  },
  textTextDisabled: {
    color: Colors.light.disabled,
  },
  
  // Size variations
  largeButton: {
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    minHeight: 56,
  },
  mediumButton: {
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    minHeight: 48,
  },
  smallButton: {
    paddingVertical: Spacing.xs,
    paddingHorizontal: Spacing.sm,
    minHeight: 40,
  },
  
  // Text size variations
  largeText: {
    ...Typography.buttonLarge,
  },
  mediumText: {
    ...Typography.buttonMedium,
  },
  smallText: {
    fontSize: 16,
    lineHeight: 24,
    fontWeight: '700',
  },
}); 