import React from 'react';
import { StyleSheet, Platform } from 'react-native';
import { View, Text } from '@/components/Themed';
import { NewScreenParams } from './types';

const NewScreen: React.FC<{ route: { params: NewScreenParams } }> = ({ route }) => {
    const { taskName } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{taskName}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
});

export default NewScreen;
