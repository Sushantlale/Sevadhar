import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props { title: string; image: string; }

export default function ServiceCard({ title, image }: Props) {
  return (
    <TouchableOpacity style={styles.card}>
      <Image source={{ uri: image }} style={styles.img} />
      <Text style={styles.title}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { width: '48%', backgroundColor: '#FFF', borderRadius: 15, marginBottom: 15, overflow: 'hidden', borderWidth: 1, borderColor: '#EEE' },
  img: { width: '100%', height: 100 },
  title: { padding: 10, fontWeight: '600', textAlign: 'center' }
});