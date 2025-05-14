import React, { useState, useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { BookingStackParamList } from "../navigation/BookingStackNavigator";
import { setAllergies, nextStep, prevStep } from "../store/bookingSlice";
import { RootState } from "../store";
import { BookingJourneyScreen } from "../screens";
import { SpectrumLogo } from "../components";
import { dimensionsCalculation } from "../config/styleUtils";

export const AllergySelectionScreen = () => {

  const navigation = useNavigation<NavigationProp<BookingStackParamList>>();
  const dispatch = useDispatch();
  const { hasAllergies } = useSelector((state: RootState) => state.booking);
  const [selection, setSelection] = useState<boolean | null>(hasAllergies);
  const theme = useTheme();

  useEffect(() => {
    dispatch(setAllergies(selection));
  }, [selection]);

  const handleContinue = () => {
    dispatch(nextStep());
    navigation.navigate("Confirmation");
  };

  const handlePrevious = () => {
    dispatch(prevStep());
    navigation.goBack();
  };

  return (
    <BookingJourneyScreen>
      <View style={styles.content}>
        <Text variant="titleMedium" style={styles.question}>
          Do you have any allergies?
        </Text>

        <View style={styles.buttonGroup}>
          <Button
            mode={"outlined"}
            onPress={() => setSelection(true)}
            style={[
              styles.selectButton,
              {
                borderColor: selection === true ? theme.colors.primary : "gray",
                borderWidth: selection === true ? 2 : 1,
              },
            ]}
          >
            <Text style={styles.txtButton}>Yes</Text>
          </Button>
          <Button
            mode={"outlined"}
            onPress={() => setSelection(false)}
            style={[
              styles.selectButton,
              {
                borderColor:
                  selection === false ? theme.colors.primary : "gray",
                borderWidth: selection === false ? 2 : 1,
              },
            ]}
          >
            <Text style={styles.txtButton}>No</Text>
          </Button>
        </View>
      </View>

      <SpectrumLogo />
      <View style={styles.navigationButtons}>
        <Button mode="outlined" onPress={handlePrevious} style={styles.button}>
          Previous
        </Button>
        <Button
          mode="contained"
          onPress={handleContinue}
          disabled={selection === null}
          style={styles.button}
        >
          Continue
        </Button>
      </View>
    </BookingJourneyScreen>
  );
};

const styles = StyleSheet.create({
  content: {
    flex: 1,
    padding: dimensionsCalculation(16),
  },
  question: {
    marginBottom: dimensionsCalculation(24),
    textAlign: "left",
    fontWeight: "bold",
  },
  buttonGroup: {
    marginBottom: dimensionsCalculation(24),
  },
  selectButton: {
    borderRadius: dimensionsCalculation(12),
    marginHorizontal: dimensionsCalculation(8),
    padding: dimensionsCalculation(8),
    marginBottom: dimensionsCalculation(20),
  },
  navigationButtons: {
    flexDirection: "row",
    justifyContent: "center",
    paddingBottom: dimensionsCalculation(16),
  },
  button: {
    width: "45%",
    marginHorizontal: dimensionsCalculation(8),
  },
  txtButton: {
    fontWeight: "bold",
    alignSelf: "flex-start",
    flex: 1,
  },
});
