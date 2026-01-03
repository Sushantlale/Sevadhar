import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

interface OutInputProps {
  label: string;
  value?: string;
  placeholder?: string;
  required?: boolean;
  icon?: React.ReactNode;
  onPress?: () => void;
}

export default function OutInput({
  label,
  value,
  placeholder,
  required = false,
  icon,
  onPress,
}: OutInputProps) {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>
        {label}
        {required && <Text style={styles.required}> *</Text>}
      </Text>

      <TouchableOpacity style={styles.box} onPress={onPress}>
        {icon && <View style={styles.icon}>{icon}</View>}
        <Text style={[styles.text, !value && styles.placeholder]}>
          {value || placeholder}
        </Text>
      </TouchableOpacity>
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

  box: {
    flexDirection: "row",
    alignItems: "center",
    height: 54,
    borderWidth: 1,
    borderColor: "#EEE",
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: "#FFF",
  },

  icon: {
    marginRight: 10,
  },

  text: {
    fontSize: 15,
    color: "#333",
  },

  placeholder: {
    color: "#999",
  },
});
