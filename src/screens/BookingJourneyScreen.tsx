import React from "react";
import { View, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { ProgressBar, useTheme } from "react-native-paper";
import { useSelector, useDispatch } from "react-redux";
import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { BookingStackParamList } from "../navigation/BookingStackNavigator";
import { RootState } from "../store";
import { resetBooking } from "../store/bookingSlice";

interface BookingJourneyScreenProps {
  children: React.ReactNode;
}

export const BookingJourneyScreen: React.FC<BookingJourneyScreenProps> = ({
  children,
}) => {
  const theme = useTheme();
  const navigation = useNavigation<NavigationProp<BookingStackParamList>>();
  const dispatch = useDispatch();
  const { currentStep, totalSteps } = useSelector(
    (state: RootState) => state.booking
  );

  const handleClose = () => {
    Alert.alert(
      "Close Booking",
      "Are you sure you want to close the booking?",
      [
        { text: "Close", onPress: () => handleResetBooking() },
        { text: "Cancel", onPress: () => {} },
      ]
    );
  };

  const handleResetBooking = () => {
    dispatch(resetBooking());
    navigation.navigate("UserInfo");
  };

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background }]}
    >
      <View style={styles.headerRow}>
        <View style={styles.progressBarContainer}>
          <ProgressBar
            progress={currentStep / totalSteps}
            color={theme.colors.primary}
            style={styles.progressBar}
          />
        </View>
        <TouchableOpacity onPress={handleClose}>
          <MaterialIcons
            name="close"
            size={24}
            color={theme.colors.onBackground}
          />
        </TouchableOpacity>
      </View>

      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  progressBarContainer: {
    flex: 1,
    justifyContent: "center",
    marginRight: 12,
  },
  progressBar: {
    height: 4,
    borderRadius: 2,
  },
});
