import 'react-native-gesture-handler';
import React from 'react';
import { Provider } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { store } from './src/store';
import BookingStackNavigator from './src/navigation/BookingStackNavigator';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <BookingStackNavigator />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}