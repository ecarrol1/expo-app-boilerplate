import React, { useState } from 'react';
import {
  StyleSheet,
  TextInput,
  View,
  Text,
  ViewStyle,
  TextStyle,
  TextInputProps,
  TouchableOpacity,
} from 'react-native';
import { Colors, Typography, Spacing } from '../../../constants';

interface TextFieldProps extends Omit<TextInputProps, 'style'> {
  label?: string;
  error?: string;
  helper?: string;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  labelStyle?: TextStyle;
  helperStyle?: TextStyle;
  errorStyle?: TextStyle;
  rightIcon?: React.ReactNode;
  leftIcon?: React.ReactNode;
  onRightIconPress?: () => void;
  onLeftIconPress?: () => void;
}

export const TextField: React.FC<TextFieldProps> = ({
  label,
  error,
  helper,
  containerStyle,
  inputStyle,
  labelStyle,
  helperStyle,
  errorStyle,
  rightIcon,
  leftIcon,
  onRightIconPress,
  onLeftIconPress,
  onFocus,
  onBlur,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = (e: any) => {
    setIsFocused(true);
    onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    onBlur?.(e);
  };

  const getBorderColor = () => {
    if (error) return Colors.light.error;
    if (isFocused) return Colors.light.primary;
    return Colors.light.border;
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Text 
          style={[styles.label, labelStyle]}
          accessibilityRole="text"
        >
          {label}
        </Text>
      )}
      
      <View 
        style={[
          styles.inputContainer, 
          { borderColor: getBorderColor() },
          isFocused && styles.focused,
          error && styles.error,
        ]}
      >
        {leftIcon && (
          <TouchableOpacity 
            style={styles.leftIcon} 
            onPress={onLeftIconPress}
            disabled={!onLeftIconPress}
            accessibilityRole={onLeftIconPress ? 'button' : 'none'}
          >
            {leftIcon}
          </TouchableOpacity>
        )}
        
        <TextInput
          style={[
            styles.input,
            leftIcon ? { paddingLeft: Spacing.xs } : null,
            rightIcon ? { paddingRight: Spacing.xs } : null,
            inputStyle,
          ]}
          placeholderTextColor={Colors.light.disabled}
          onFocus={handleFocus}
          onBlur={handleBlur}
          accessibilityRole="text"
          accessibilityState={{ disabled: rest.editable === false }}
          accessibilityLabel={label}
          accessibilityHint={helper}
          {...rest}
        />
        
        {rightIcon && (
          <TouchableOpacity 
            style={styles.rightIcon} 
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            accessibilityRole={onRightIconPress ? 'button' : 'none'}
          >
            {rightIcon}
          </TouchableOpacity>
        )}
      </View>
      
      {(error || helper) && (
        <Text 
          style={[
            styles.helper,
            error ? styles.errorText : styles.helperText,
            error ? errorStyle : helperStyle,
          ]}
          accessibilityRole="text"
        >
          {error || helper}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: Spacing.md,
    width: '100%',
  },
  label: {
    ...Typography.label,
    marginBottom: Spacing.xs,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 8,
    borderColor: Colors.light.border,
    backgroundColor: Colors.light.background,
    minHeight: 56,
  },
  input: {
    ...Typography.bodyMedium,
    flex: 1,
    paddingVertical: Spacing.sm,
    paddingHorizontal: Spacing.md,
    color: Colors.light.text,
    minHeight: 56,
  },
  leftIcon: {
    paddingLeft: Spacing.md,
  },
  rightIcon: {
    paddingRight: Spacing.md,
  },
  focused: {
    borderColor: Colors.light.primary,
    borderWidth: 2,
  },
  error: {
    borderColor: Colors.light.error,
    borderWidth: 2,
  },
  helper: {
    ...Typography.helper,
    marginTop: Spacing.xs,
  },
  helperText: {
    color: Colors.light.icon,
  },
  errorText: {
    color: Colors.light.error,
  },
}); 