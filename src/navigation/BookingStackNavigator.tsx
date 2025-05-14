import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { UserInfoScreen, AllergySelectionScreen, ConfirmationScreen } from '../screens';
import { SafeAreaView } from 'react-native-safe-area-context';

export type BookingStackParamList = {
  UserInfo: undefined;
  AllergySelection: undefined;
  Confirmation: undefined;
};

const Stack = createStackNavigator<BookingStackParamList>();

const BookingStackNavigator = () => {
  return (
    <SafeAreaView style={{ flex: 1 }}>
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="UserInfo" component={UserInfoScreen} />
      <Stack.Screen name="AllergySelection" component={AllergySelectionScreen} />
      <Stack.Screen name="Confirmation" component={ConfirmationScreen} />
    </Stack.Navigator>
    </SafeAreaView>
  );
};

export default BookingStackNavigator;