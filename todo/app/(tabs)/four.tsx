import React from 'react';
import { StyleSheet, TextInput, TouchableOpacity, ScrollView } from 'react-native';

import { Text, View } from '@/components/Themed';

export default function TabFourScreen() {
  const handleCreateTask = () => {
    console.log('Create task button pressed');
    // Implement task creation logic here
  };

  return (
    <>
    <ScrollView contentContainerStyle={styles.scrollViewContainer}>
    <View style={styles.container}>
      <Text style={styles.title}>Create A Task</Text>
      <Text style={styles.subtitle}>Let's add a task for you to complete.</Text>

      <Text style={styles.inputLabel}>Task</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. Wash the dishes"
        placeholderTextColor="#999999"
      />

      <Text style={styles.inputLabel}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. School"
        placeholderTextColor="#999999"
      />
      <Text style={styles.inputLabel}>Due Date</Text>
      <TextInput
        style={styles.input}
        placeholder="YYYY-MM-DD"
        placeholderTextColor="#999999"
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Task</Text>
      </TouchableOpacity>

      <Text style={styles.title}>Create A Category</Text>
      <Text style={styles.subtitle}>Let's create a category to keep your tasks organized.</Text>
      {/* const { color, icon, isEditable, name }: ICategory = request.body */}

      <Text style={styles.inputLabel}>Category Name</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. School"
        placeholderTextColor="#999999"
      />

      <Text style={styles.inputLabel}>Category</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. School"
        placeholderTextColor="#999999"
      />
      <Text style={styles.inputLabel}>Color</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. #222222"
        placeholderTextColor="#999999"
      />

      <Text style={styles.inputLabel}>Icon</Text>
      <TextInput
        style={styles.input}
        placeholder="E.g. 😚"
        placeholderTextColor="#999999"
      />

      <TouchableOpacity style={styles.button2} onPress={handleCreateTask}>
        <Text style={styles.buttonText}>Create Category</Text>
      </TouchableOpacity>
    </View>
    </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    paddingTop: 50,
    paddingBottom: 20 
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: "#0f2138",
    marginTop: 20,
    marginLeft: 20
  },
  subtitle: {
    fontSize: 13,
    fontWeight: '400',
    color: "#8b8b8b",
    marginTop: 5,
    marginLeft: 20,
    marginBottom: 20,
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  input: {
    width: '85%',
    color: 'black',
    height: 40,
    fontSize: 15,
    backgroundColor: 'white',
    marginBottom: 15,
    borderRadius: 10,
    marginLeft: 20,
    borderWidth: 2,
    borderColor: "#0f2138",
    paddingHorizontal: 15,
  },
  inputLabel: {
    fontSize: 15,
    fontWeight: "500",
    color: "#0f2138",
    marginBottom: 5,
    marginLeft: 20
  },
  button: {
    backgroundColor: '#0f2138',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    marginLeft: 20,
    width: '31%',
    marginBottom: 20,
  },
  button2: {
    backgroundColor: '#0f2138',
    borderRadius: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    marginTop: 5,
    marginLeft: 20,
    width: '39%',
    marginBottom: 20,
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 15,
    fontWeight: '400',
  },
});
