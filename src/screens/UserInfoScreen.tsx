import React, { useState } from "react";
import { StyleSheet, KeyboardAvoidingView, Platform, View } from "react-native";
import { Button, TextInput, Text } from "react-native-paper";
import { useDispatch } from "react-redux";
import * as yup from "yup";
import { useNavigation, NavigationProp } from "@react-navigation/native";

import { BookingStackParamList } from "../navigation/BookingStackNavigator";
import { setUserInfo, nextStep } from "../store/bookingSlice";
import { BookingJourneyScreen } from "../screens";
import { SpectrumLogo } from "../components";
import { dimensionsCalculation } from "../config/styleUtils";

const userInfoSchema = yup.object().shape({
  fullName: yup.string().required("Full name is required"),
  contactNumber: yup
    .string()
    .matches(/^[0-9]*$/, "Contact number must be numeric")
    .required("Contact number is required"),
  email: yup.string().email("Email is invalid").required("Email is required"),
});

export const UserInfoScreen = () => {
  const navigation = useNavigation<NavigationProp<BookingStackParamList>>();
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = async (field: string, value: string) => {
    try {
      await userInfoSchema.validateAt(field, { [field]: value });
      setErrors({ ...errors, [field]: "" });
      return true;
    } catch (err) {
      setErrors({ ...errors, [field]: (err as yup.ValidationError).message });
      return false;
    }
  };

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
    if (touched[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: string) => {
    setTouched({ ...touched, [field]: true });
    validateField(field, formData[field as keyof typeof formData]);
  };

  const handleSubmit = async () => {
    const isFormValid = await userInfoSchema.isValid(formData);
    if (isFormValid) {
      dispatch(setUserInfo(formData));
      dispatch(nextStep());
      navigation.navigate("AllergySelection");
    } else {
      const newErrors: Record<string, string> = {};
      for (const field in formData) {
        try {
          await userInfoSchema.validateAt(field, formData);
        } catch (err) {
          newErrors[field] = (err as yup.ValidationError).message;
        }
      }
      setErrors(newErrors);
      setTouched({
        fullName: true,
        email: true,
        contactNumber: true,
      });
    }
  };

  const isFormValid = () => {
    return (
      formData.fullName && formData.email && !errors.fullName && !errors.email
    );
  };

  return (
    <BookingJourneyScreen>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <View style={{ flex: 1 }}>
          <Text variant="bodyLarge" style={styles.screenDescription}>
            Please confirm or add to the below your personal information
          </Text>

          <View style={styles.inputContainer}>
            <TextInput
              label="Full Name"
              mode="flat"
              value={formData.fullName}
              onChangeText={(text) => handleChange("fullName", text)}
              onBlur={() => handleBlur("fullName")}
              error={!!errors.fullName}
              style={styles.input}
            />
            {errors.fullName && (
              <Text style={styles.errorText}>{errors.fullName}</Text>
            )}

            <TextInput
              label="Contact Number"
              mode="flat"
              keyboardType="phone-pad"
              value={formData.contactNumber}
              onChangeText={(text) => handleChange("contactNumber", text)}
              onBlur={() => handleBlur("contactNumber")}
              error={!!errors.contactNumber}
              style={styles.input}
            />
            {errors.contactNumber && (
              <Text style={styles.errorText}>{errors.contactNumber}</Text>
            )}

            <TextInput
              label="Email Address"
              mode="flat"
              keyboardType="email-address"
              autoCapitalize="none"
              value={formData.email}
              onChangeText={(text) => handleChange("email", text)}
              onBlur={() => handleBlur("email")}
              error={!!errors.email}
              style={styles.input}
            />
            {errors.email && (
              <Text style={styles.errorText}>{errors.email}</Text>
            )}
          </View>
          <SpectrumLogo />
          <Button
            mode="contained"
            onPress={handleSubmit}
            disabled={!isFormValid()}
            style={styles.button}
          >
            <Text
              variant="bodyLarge"
              style={{ fontWeight: "bold", color: "white" }}
            >
              Continue
            </Text>
          </Button>
        </View>
      </KeyboardAvoidingView>
    </BookingJourneyScreen>
  );
};

const styles = StyleSheet.create({
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: dimensionsCalculation(16),
  },
  inputContainer: {
    flex: 1,
  },
  screenDescription: {
    marginBottom: dimensionsCalculation(16),
    alignSelf: "flex-start",
    fontWeight: "bold",
  },
  input: {
    padding: dimensionsCalculation(8),
    marginBottom: dimensionsCalculation(14),
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "#ccc",
    // borderRadius: dimensionsCalculation(20),
  },
  errorText: {
    color: "red",
    marginBottom: dimensionsCalculation(16),
    fontSize: dimensionsCalculation(12),
  },
  button: {
    padding: dimensionsCalculation(8),
    borderRadius: dimensionsCalculation(15),
  },
});
