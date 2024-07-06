import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from './pages/LoginPage';
import Sidebar from './components/SideBar';
import ViewStudent from './pages/ViewStudent';
import StudentsPage from './pages/StudentsPage';
import BookSearchApp from './pages/Book';
import TransactionPage from './pages/inout';
import HomePage from './pages/HomePage';
import Analytics from './pages/Analytics';
import ContactUs from './pages/ContactUs';
import ChatbotIcon from './components/ChatbotIcon';

const Stack = createStackNavigator();

export default function App() {
  const currPage = "Sidebar";
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName={currPage} screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginPage} />
        <Stack.Screen name="SideBar" component={Sidebar} />
        <Stack.Screen name="ViewStudent" component={ViewStudent} />
        <Stack.Screen name="StudentsPage" component={StudentsPage} />
        <Stack.Screen name="BookSearchApp" component={BookSearchApp} />
        <Stack.Screen name="Transactions" component={TransactionPage} />
        <Stack.Screen name="HomePage" component={HomePage} />
        <Stack.Screen name="Analytics" component={Analytics} />
        <Stack.Screen name="ContactUs" component={ContactUs} />
        <Stack.Screen name="Chatbot" component={ChatbotIcon} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
