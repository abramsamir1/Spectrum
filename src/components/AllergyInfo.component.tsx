import { View, StyleSheet } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { Text } from "react-native-paper";

import { dimensionsCalculation } from "../config/styleUtils";

export function AllergyInfo() {
  return (
    <View style={styles.container}>
      <View style={styles.rowView}>
        <MaterialIcons name="info" size={24} color="gray" />
        <Text style={styles.title} variant="titleMedium">
          Allergy info
        </Text>
      </View>
      <Text style={styles.desc} variant="bodyMedium">
        An allergist is a doctor who treats allergies and immune system
        disorders. They diagnose and manage reactions to substances like pollen,
        food, or medications.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#E7EDFF80",
    padding: dimensionsCalculation(14),
    margin: dimensionsCalculation(14),
    borderWidth: 1,
    borderColor: "#E7EDFF80",
    borderRadius: 10,
  },
  rowView: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    fontWeight: "bold",
    paddingLeft: dimensionsCalculation(4),
  },
  desc: {
    paddingVertical: dimensionsCalculation(8),
  },
});
