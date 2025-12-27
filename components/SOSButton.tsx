import React from 'react';
import { Alert, Linking, StyleSheet, Text, TouchableOpacity } from 'react-native';

export default function SOSButton() {
  const handleSOS = () => {
    Alert.alert(
      "EMERGENCY SOS",
      "Do you want to call emergency services?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "CALL NOW", onPress: () => Linking.openURL('tel:100'), style: "destructive" }
      ]
    );
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handleSOS}>
      <Text style={styles.text}>SOS</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: 'absolute', bottom: 100, right: 20,
    width: 70, height: 70, borderRadius: 35,
    backgroundColor: '#FF0000', alignItems: 'center', justifyContent: 'center',
    elevation: 5, shadowColor: '#000', shadowOpacity: 0.3, shadowRadius: 5,
  },
  text: { color: '#FFF', fontWeight: 'bold', fontSize: 18 }
});