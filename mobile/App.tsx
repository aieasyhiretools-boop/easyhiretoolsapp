import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import JobListScreen from './src/screens/JobListScreen';
import JobDetailScreen from './src/screens/JobDetailScreen';
import PostJobScreen from './src/screens/PostJobScreen';
import PostResumeScreen from './src/screens/PostResumeScreen';
import ProfileScreen from './src/screens/ProfileScreen';
import LoginScreen from './src/screens/LoginScreen';
import RegisterScreen from './src/screens/RegisterScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const AuthStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
};

const JobSeekerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'Jobs') iconName = 'work';
          else if (route.name === 'Resume') iconName = 'description';
          else if (route.name === 'Profile') iconName = 'person';
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Jobs" component={JobListScreen} />
      <Tab.Screen name="Resume" component={PostResumeScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const EmployerTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Home') iconName = 'home';
          else if (route.name === 'PostJob') iconName = 'add-circle';
          else if (route.name === 'MyJobs') iconName = 'list';
          else if (route.name === 'Profile') iconName = 'person';
          
          return <MaterialIcons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#007AFF',
        tabBarInactiveTintColor: '#999',
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="PostJob" component={PostJobScreen} />
      <Tab.Screen name="MyJobs" component={JobListScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [userType, setUserType] = useState(null);

  useEffect(() => {
    checkLogin();
  }, []);

  const checkLogin = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const type = await AsyncStorage.getItem('userType');
      if (token) {
        setIsSignedIn(true);
        setUserType(type);
      }
    } catch (e) {
      console.log(e);
    }
    setIsLoading(false);
  };

  if (isLoading) {
    return null; // Or a splash screen
  }

  return (
    <NavigationContainer>
      {!isSignedIn ? (
        <AuthStack />
      ) : userType === 'employer' ? (
        <Stack.Navigator>
          <Stack.Screen
            name="EmployerApp"
            component={EmployerTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen
            name="JobSeekerApp"
            component={JobSeekerTabs}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="JobDetail" component={JobDetailScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
};

export default App;
