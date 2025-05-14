import React from "react";
import { View, StyleSheet, Alert, ScrollView } from "react-native";
import { Button, Text, IconButton } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { BookingStackParamList } from "../navigation/BookingStackNavigator";
import { resetBooking } from "../store/bookingSlice";
import { RootState } from "../store";
import { BookingJourneyScreen } from "../screens";
import { SpectrumLogo, AllergyInfo } from "../components";
import { dimensionsCalculation } from "../config/styleUtils";

export const ConfirmationScreen = () => {
  const navigation = useNavigation<NavigationProp<BookingStackParamList>>();
  const dispatch = useDispatch();
  const { hasAllergies } = useSelector((state: RootState) => state.booking);

  const handleComplete = () => {
    dispatch(resetBooking());
    navigation.reset({
      index: 0,
      routes: [{ name: "UserInfo" }], 
    });
  };

  const handleGPPressed = () => {
    Alert.alert(
      "GP Appointment Requested",
      "Your request to speak with a GP has been noted.",
      [{ text: "OK", onPress: handleComplete }]
    );
  };

  return (
    <BookingJourneyScreen>
      <ScrollView>
        <Text variant="titleLarge" style={styles.title}>
          Booking confirmed
        </Text>
        <View style={{ alignItems: "center" }}>
          <IconButton
            icon="check-circle"
            size={120}
            iconColor="#4CAF50"
            style={styles.icon}
          />

          <Text variant="bodyMedium" style={styles.text}>
            Based on the information you have provided, we think you should
            speak to an
            <Text style={{ fontWeight: "bold" }}> Allergist</Text>.
          </Text>

          {hasAllergies && (
            <>
              <AllergyInfo />
              <Text variant="bodyMedium" style={styles.text}>
                If you would prefer to speak to a GP instead, please click this
                button:
              </Text>

              <Button
                mode="text"
                onPress={handleGPPressed}
                style={styles.gpButton}
              >
                <Text style={{ padding: 4, marginLeft: 4 }}>
                  I'd prefer to speak with a GP
                </Text>
                <MaterialIcons
                  name="arrow-forward-ios"
                  size={10}
                  color="black"
                />
              </Button>
            </>
          )}
        </View>
      </ScrollView>
      <SpectrumLogo />
      <Button mode="contained" onPress={handleComplete} style={styles.button}>
        Done
      </Button>
    </BookingJourneyScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    // padding: dimensionsCalculation(16),
  },
  icon: {
    marginBottom: dimensionsCalculation(16),
  },
  title: {
    fontWeight: "bold",
    marginBottom: dimensionsCalculation(24),
    textAlign: "left",
  },
  text: {
    marginVertical: 14,
    textAlign: "center",
  },
  gpButton: {
    backgroundColor: "#1E1E220D",
    borderRadius: 4,
    marginBottom: dimensionsCalculation(24),
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    padding: dimensionsCalculation(8),
    borderRadius: dimensionsCalculation(15),
  },
});
