import React from "react";
import { View, Text, TextInput, StyleSheet } from "react-native";

interface InputFieldProps {
  label: string;
  required?: boolean;
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  icon?: React.ReactNode;
  keyboardType?: any;
  secureTextEntry?: boolean;
  editable?: boolean;
  multiline?: boolean;
}

export default function InputField({
  label,
  required = false,
  placeholder,
  value,
  onChangeText,
  icon,
  keyboardType = "default",
  secureTextEntry = false,
  editable = true,
  multiline = false,
}: InputFieldProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <View style={[styles.inputContainer, multiline && { height: 90 }]}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          editable={editable}
          multiline={multiline}
          placeholderTextColor="#999"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: 18,
  },

  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#444",
    marginBottom: 6,
  },

  required: {
    color: "red",
  },

  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFF",
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 12,
    paddingHorizontal: 14,
    height: 54,
  },

  icon: {
    marginRight: 10,
  },

  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
  },
});
