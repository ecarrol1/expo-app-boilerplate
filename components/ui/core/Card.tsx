import React from 'react';
import {
  StyleSheet,
  View,
  ViewStyle,
  TouchableOpacity,
  StyleProp,
} from 'react-native';
import { Colors, Shadows, Spacing } from '../../../constants';

interface CardProps {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
  disabled?: boolean;
  variant?: 'default' | 'outlined' | 'elevated';
  testID?: string;
  accessibilityLabel?: string;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  onPress,
  disabled = false,
  variant = 'default',
  testID,
  accessibilityLabel,
}) => {
  const cardStyles = [
    styles.card,
    styles[variant],
    disabled && styles.disabled,
    style,
  ];

  if (onPress) {
    return (
      <TouchableOpacity
        style={cardStyles}
        onPress={onPress}
        disabled={disabled}
        activeOpacity={0.8}
        testID={testID}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={accessibilityLabel}
      >
        {children}
      </TouchableOpacity>
    );
  }

  return (
    <View 
      style={cardStyles} 
      testID={testID}
      accessibilityLabel={accessibilityLabel}
    >
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: Spacing.cardPadding,
    backgroundColor: Colors.light.card,
    overflow: 'hidden',
  },
  default: {
    borderWidth: 1,
    borderColor: Colors.light.border,
  },
  outlined: {
    borderWidth: 2,
    borderColor: Colors.light.primary,
  },
  elevated: {
    ...Shadows.medium,
  },
  disabled: {
    opacity: 0.6,
  },
}); 