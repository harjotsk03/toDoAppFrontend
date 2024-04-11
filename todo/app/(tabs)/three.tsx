import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';

export default function TabThreeScreen() {
  return (
    // <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Completed Page</Text>
    </View>
  // </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1, // Make sure the content can grow to fill the container
  },
  container: {
    flex: 1,
    backgroundColor: "#283747",
    alignItems: 'center',
    paddingTop: 50,
    paddingBottom: 20 // Add padding to the bottom if needed
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: "#ffffff",
    marginTop: 30,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});

