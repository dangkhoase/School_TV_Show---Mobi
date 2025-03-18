'use client';

import type React from 'react';
import { StyleSheet, Text, View, TextInput, type TextInputProps } from 'react-native';
import {
  Controller,
  type Control,
  type FieldValues,
  type Path,
  type FieldError,
} from 'react-hook-form';

interface FormTextInputProps<T extends FieldValues> extends Omit<TextInputProps, 'value'> {
  name: Path<T>;
  control: Control<T>;
  label: string;
  error?: FieldError;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  stylelabel?: object;
}

export function FormTextInput<T extends FieldValues>({
  name,
  control,
  label,
  error,
  leftIcon,
  stylelabel,
  rightIcon,
  ...textInputProps
}: FormTextInputProps<T>) {
  return (
    <View style={styles.container}>
      <Text style={[styles.label, stylelabel]}>{label}</Text>
      <View style={[styles.inputContainer, error && styles.inputError]}>
        {leftIcon && <View style={styles.iconLeft}>{leftIcon}</View>}
        <Controller
          control={control}
          name={name}
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={[
                styles.input,
                leftIcon ? styles.inputWithLeftIcon : null,
                rightIcon ? styles.inputWithRightIcon : null,
              ]}
              onBlur={onBlur}
              onChangeText={onChange}
              value={value as string}
              placeholderTextColor="#9CA3AF"
              {...textInputProps}
            />
          )}
        />
        {rightIcon && <View style={styles.iconRight}>{rightIcon}</View>}
      </View>
      {error && <Text style={styles.errorText}>{error.message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 6,
    color: '#374151',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    backgroundColor: '#F9FAFB',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  input: {
    flex: 1,
    height: 48,
    paddingHorizontal: 12,
    fontSize: 16,
    color: '#1F2937',
  },
  inputWithLeftIcon: {
    paddingLeft: 8,
  },
  inputWithRightIcon: {
    paddingRight: 8,
  },
  iconLeft: {
    paddingLeft: 12,
  },
  iconRight: {
    paddingRight: 12,
  },
  errorText: {
    color: '#EF4444',
    fontSize: 12,
    marginTop: 4,
  },
});
