import React, {useState} from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image, FlatList } from 'react-native';
import { NavigationContainer } from '@react-navigationnative';
import { createStackNavigator } from '@react-navigationstack';

const Stack = createStackNavigator();

const INITIAL_TASKS = [
  { id 1, title 'To check email' },
  { id 2, title 'UI task web page' },
  { id 3, title 'Learn javascript basic' },
  { id 4, title 'Learn HTML Advance' },
  { id 5, title 'Medical App UI' },
  { id 6, title 'Learn Java' },
];

const HomeScreen = ({navigation}) = {
  const [name, setName] = useState('');

  return (
    View style={styles.container}
      Image 
        source={require('.assetsproduct1.png')} 
        style={styles.image}
      
      Text style={styles.title}MANAGE YOUR TASKText
      TextInput
        style={styles.input}
        placeholder=Enter your name
        value={name}
        onChangeText={setName}
      
      TouchableOpacity 
        style={styles.button}
        onPress={() = navigation.navigate('TaskList', {name})}
      
        Text style={styles.buttonText}GET STARTED →Text
      TouchableOpacity
    View
  );
}

const TaskList = ({route, navigation}) = {
  const [tasks, setTasks] = useState(INITIAL_TASKS);
  const [searchText, setSearchText] = useState('');
  const {name} = route.params;

  const filteredTasks = tasks.filter(task = 
    task.title.toLowerCase().includes(searchText.toLowerCase())
  );

  const renderItem = ({item}) = (
    View style={styles.taskItem}
      Text✓Text
      Text style={styles.taskText}{item.title}Text
      TouchableOpacity onPress={() = navigation.navigate('AddEditTask', {
        task item,
        isEdit true,
        onUpdate (updatedTask) = {
          setTasks(tasks.map(t = t.id === updatedTask.id  updatedTask  t));
        }
      })}
        Text style={styles.editIcon}✎Text
      TouchableOpacity
    View
  );

  return (
    View style={styles.container}
      TextHi {name}Text
      TextInput
        style={styles.searchInput}
        placeholder=Search
        value={searchText}
        onChangeText={setSearchText}
      
      FlatList
        data={filteredTasks}
        renderItem={renderItem}
        keyExtractor={item = item.id.toString()}
      
      TouchableOpacity 
        style={styles.addButton}
        onPress={() = navigation.navigate('AddEditTask', {
          isEdit false,
          onAdd (newTask) = {
            setTasks([...tasks, {...newTask, id tasks.length + 1}]);
          }
        })}
      
        Text style={styles.addButtonText}+Text
      TouchableOpacity
    View
  );
}

const AddEditTask = ({route, navigation}) = {
  const {isEdit, task, onAdd, onUpdate} = route.params;
  const [jobTitle, setJobTitle] = useState(isEdit  task.title  '');

  return (
    View style={styles.container}
      Text style={styles.title}{isEdit  'EDIT YOUR JOB'  'ADD YOUR JOB'}Text
      TextInput
        style={styles.input}
        placeholder=Input your job
        value={jobTitle}
        onChangeText={setJobTitle}
      
      TouchableOpacity 
        style={styles.button}
        onPress={() = {
          if(isEdit) {
            onUpdate({...task, title jobTitle});
          } else {
            onAdd({title jobTitle});
          }
          navigation.goBack();
        }}
      
        Text style={styles.buttonText}FINISH →Text
      TouchableOpacity
    View
  );
}

export default function App() {
  return (
    NavigationContainer
      Stack.Navigator
        Stack.Screen 
          name=Home 
          component={HomeScreen}
          options={{headerShown false}}
        
        Stack.Screen 
          name=TaskList 
          component={TaskList}
          options={{headerShown false}}
        
        Stack.Screen 
          name=AddEditTask 
          component={AddEditTask}
          options={{headerShown false}}
        
      Stack.Navigator
    NavigationContainer
  );
}

const styles = StyleSheet.create({
  container {
    flex 1,
    padding 20,
    backgroundColor '#fff',
  },
  title {
    fontSize 24,
    fontWeight 'bold',
    color '#666',
    marginVertical 20,
    textAlign 'center'
  },
  input {
    borderWidth 1,
    borderColor '#ddd',
    padding 10,
    borderRadius 5,
    marginBottom 20,
  },
  button {
    backgroundColor '#00bcd4',
    padding 15,
    borderRadius 25,
    alignItems 'center',
  },
  buttonText {
    color 'white',
    fontWeight 'bold',
  },
  searchInput {
    borderWidth 1,
    borderColor '#ddd',
    padding 10,
    borderRadius 25,
    marginBottom 20,
  },
  taskItem {
    flexDirection 'row',
    padding 15,
    backgroundColor '#f5f5f5',
    marginBottom 10,
    borderRadius 5,
    alignItems 'center',
  },
  taskText {
    flex 1,
    marginLeft 10,
  },
  editIcon {
    color '#666',
    fontSize 18,
  },
  addButton {
    position 'absolute',
    bottom 30,
    right 30,
    width 60,
    height 60,
    borderRadius 30,
    backgroundColor '#00bcd4',
    justifyContent 'center',
    alignItems 'center',
  },
  addButtonText {
    color 'white',
    fontSize 30,
  },
  image {
    width 200,
    height 200,
    alignSelf 'center',
    marginBottom 20,
  }
});