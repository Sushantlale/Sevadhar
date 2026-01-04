import React from "react";
import { View, Image, TouchableOpacity, Text, StyleSheet } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Ionicons } from "@expo/vector-icons";

type ImagePickerBoxProps = {
  label: string;
  image: string | null;
  setImage: (uri: string | null) => void;
};

export default function ImagePickerBox({
  label,
  image,
  setImage,
}: ImagePickerBoxProps) {
  const pickImage = async (fromCamera: boolean) => {
    const permission = fromCamera
      ? await ImagePicker.requestCameraPermissionsAsync()
      : await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (!permission.granted) {
      alert("Permission required!");
      return;
    }

    const result = fromCamera
      ? await ImagePicker.launchCameraAsync({
          quality: 0.7,
          allowsEditing: true,
        })
      : await ImagePicker.launchImageLibraryAsync({
          quality: 0.7,
          allowsEditing: true,
        });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  return (
    <View style={styles.box}>
      {image ? (
        <>
          <Image source={{ uri: image }} style={styles.image} />
          <TouchableOpacity
            style={styles.delete}
            onPress={() => setImage(null)}
          >
            <Ionicons name="trash" size={22} color="red" />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.label}>{label}</Text>
          <View style={styles.actions}>
            <TouchableOpacity onPress={() => pickImage(true)}>
              <Ionicons name="camera" size={28} color="#FF6B00" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => pickImage(false)}>
              <Ionicons name="image" size={28} color="#FF6B00" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    borderWidth: 1,
    borderColor: "#FF6B00",
    borderStyle: "dashed",
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    minHeight: 160,
  },
  image: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  actions: {
    flexDirection: "row",
    gap: 20,
  },
  label: {
    marginBottom: 10,
    color: "#FF6B00",
    fontWeight: "600",
  },
  delete: {
    position: "absolute",
    top: 8,
    right: 8,
  },
});
