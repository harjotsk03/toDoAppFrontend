import React, { useState, useEffect } from 'react';
import { StyleSheet, TouchableOpacity, ScrollView, View,Button, Alert } from 'react-native';
import { Text } from '@/components/Themed';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { Task } from '../types';
import { AnimatedCircularProgress } from 'react-native-circular-progress';
import { Feather } from '@expo/vector-icons';

require('dotenv').config();

const apiCallURL = process.env.apiCallURL;

const TabOneScreen: React.FC = () => {
  const navigation = useNavigation();

  const [name, setName] = useState<string | null>(null);
  const [greeting, setGreeting] = useState('');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [currentDate, setCurrentDate] = useState(new Date());
  const [userToken, setUserToken] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);
  const [lastFetchTimestamp, setLastFetchTimestamp] = useState<number>(0);
  const [checkTasks, setCheckTasks] = useState('Excellent, your tasks are\nalmost complete');
  const [taskCircle, setTaskCircle] = useState(90);
  const [tasksCompleted, setTasksCompleted] = useState(2);

  useEffect(() => {
    getUserInfo();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [userToken, lastFetchTimestamp]);

  useEffect(() => {
    const updateTimeAndGreeting = () => {
      const currentHour = currentTime.getHours();
      if (currentHour < 12) {
        setGreeting('Good Morning');
      } else if (currentHour >= 12 && currentHour < 17) {
        setGreeting('Good Afternoon');
      } else {
        setGreeting('Good Evening');
      }
    };

    updateTimeAndGreeting();

    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
      updateTimeAndGreeting();
    }, 60000);

    return () => clearInterval(intervalId);
  }, []);

  const getUserInfo = async () => {
    try {
      const storedName = await AsyncStorage.getItem('name');
      const token = (await AsyncStorage.getItem('token')) as string;

      setUserToken(token);

      if (storedName) {
        setName(storedName);
      }
    } catch (error) {
      console.error('Error fetching user info:', error);
    }
  };

  const fetchTasks = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await fetch(`${apiCallURL}tasks`, {
        method: 'GET',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch tasks');
      }

      const tasksData = await response.json();
      setTasks(tasksData);
      setLastFetchTimestamp(Date.now());
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };

  const formatDate = (date: Date) => {
    const options: Intl.DateTimeFormatOptions = {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
    };

    return date.toLocaleDateString('en-US', options);
  };

  const checkTasksDone = () => {
    const amount = tasksCompleted / tasks.length;
    console.log(amount*100)
    setTaskCircle(amount*100);
  };

  const goToNewTask = () => {
    console.log('go to completed page')
    // navigation.navigate('three', )
  }

  const confirmDelete = (task: string, taskId: string) =>
  Alert.alert(
    'Deleting Task',
    `Are you sure you want to delete ${task}`,
    [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Delete',
        onPress: () => deleteTask(taskId),
      },
    ],
    { cancelable: true } 
  );

  const deleteTask = async (taskId: string) => {
    try {
      const token = await AsyncStorage.getItem('token');
      console.log(taskId)
      const response = await fetch(`http://192.168.1.83:1337/tasks/${taskId}`, {
        method: 'DELETE',
        headers: {
          Authorization: `${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to delete tasks');
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  };


  return (
    <>
      <View style={styles.top}>
        <Text style={styles.greeting}>{greeting}</Text>
        {/* <Text style={styles.subtitle}>{formatDate(currentDate)} </Text> */}
        <Text style={styles.name}>{name} Singh</Text>
        <View style={styles.taskCircleContainer}>
          <View style={styles.checkTasksContainer}>
            <Text style={styles.checkTasks}>{checkTasks}</Text>
            <TouchableOpacity style={styles.newTaskBtnContainer} onPress= {goToNewTask}>
              <View>
                <Text style={styles.newTaskBtnText}>View Completed</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.progressCircleContainer}>
            <AnimatedCircularProgress
              size={90}
              width={10}
              fill={taskCircle}
              tintColor="#ffffff"
              backgroundColor="#3d5875" 
              lineCap='round'
              rotation={0}
            />
            <View style={styles.progressTextContainer}>
              <Text style={styles.progressText}>{taskCircle}%</Text> 
            </View>
          </View>
        </View>
      </View>
      <ScrollView contentContainerStyle={styles.scrollViewContainer}>
        <View style={styles.container}>
          {tasks.map((task, index) => (
              <View key={index} style={styles.taskBtnContainer}>
                <Text style={styles.taskBtnText}>{task.name}</Text>
                <TouchableOpacity style={styles.editTaskContainer}>
                  <Feather name="edit-3" size={15} color={'#ffffff'} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteTaskContainer} onPress={() => confirmDelete(task.name, task._id)}>
                  <Feather name="trash" size={15} color={'#ffffff'} />
                </TouchableOpacity>
                <Text style={styles.taskCreatedText}>Task Created: {task.date}</Text>
              </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollViewContainer: {
    flexGrow: 1,
    backgroundColor: '#ffffff',
  },
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingTop: 10,
    paddingBottom: 20,
  },
  top: {
    backgroundColor: 'white',
    paddingTop: 60,
  },
  greeting: {
    fontSize: 15,
    fontWeight: '400',
    color: '#8b8b8b',
    marginBottom: 2,
    marginLeft: 20,
  },
  subtitle: {
    fontSize: 15,
    fontWeight: 'normal',
    color: '#8b8b8b',
    marginBottom: 5,
    marginLeft: 20,
  },
  name: {
    fontSize: 20,
    fontWeight: '500',
    color: 'black',
    marginBottom: 10,
    marginLeft: 20,
  },
  taskBtnContainer: {
    marginBottom: 10,
    width: 350,
    marginLeft: 20,
    borderRadius: 10,
    height: 80,
    backgroundColor: '#f5f6f7',
  },
  taskBtnText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#0f2138',
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 2,
  },
  taskCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 20,
    width: 350,
    height: 130,
    borderRadius: 10,
    paddingHorizontal: 18,
    gap:20,
    marginBottom: 20,
    backgroundColor: "#0f2138"
  },
  checkTasks: {
    flex: 1,
    fontWeight: '600',
    fontSize: 18,
  },
  progressCircleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkTasksContainer: {
    paddingVertical: 25,
  },
  progressText : {
    color: 'white',
    fontSize: 20,
  },
  taskCreatedText:{
    color: '#8b8b8b',
    fontSize: 12,
    marginLeft: 20
  },
  progressTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -32 }],
  },  
  newTaskBtnContainer: {
    backgroundColor: '#ffffff',
    width: 110,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,

  },
  newTaskBtnText: {
    color: "#0f2138",
    fontSize: 12,
    fontWeight: '500'
  },
  deleteTaskContainer:{
    position: 'absolute',
    right: 20,
    bottom: 10,
    backgroundColor: '#283747',
    padding: 5,
    borderRadius: 5
  },
  deleteTaskText: {
    color: 'black'
  },
  editTaskContainer: {
    position: 'absolute',
    right: 20,
    top: 10,
    backgroundColor: '#AEB6BF',
    padding: 5,
    borderRadius: 5
  }
});

export default TabOneScreen;
