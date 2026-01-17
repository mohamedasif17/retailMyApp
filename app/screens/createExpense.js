import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
    Platform,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function CreateExpenseScreen() {
  const [showDate, setShowDate] = React.useState(false);
  const [date, setDate] = React.useState(new Date());
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.safe}>
      {/* Header */}
      <View style={styles.header}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
        <FontAwesome5 name="arrow-left" size={18} />
                </TouchableOpacity>
        
        <Text style={styles.headerTitle}>Create Expense</Text>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: 120 }}>
        {/* Amount */}
        <View style={styles.field}>
          <Text style={styles.label}>Amount</Text>
          <View style={styles.amountBox}>
            <Text style={styles.currency}>₹</Text>
            <TextInput
              placeholder="0.00"
              keyboardType="numeric"
              style={styles.amountInput}
            />
          </View>
        </View>

        {/* Date Picker */}
        <View style={styles.field}>
          <Text style={styles.label}>Date</Text>
          <TouchableOpacity
            style={styles.input}
            onPress={() => setShowDate(true)}
          >
            <Text>
              {date.toISOString().slice(0, 10)}
            </Text>
          </TouchableOpacity>

          {showDate && (
            <DateTimePicker
              value={date}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={(e, selectedDate) => {
                setShowDate(false);
                if (selectedDate) setDate(selectedDate);
              }}
            />
          )}
        </View>

        {/* Account Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Account</Text>
          <View style={styles.pickerBox}>
            <Picker>
              <Picker.Item label="Select Account" value="" />
              <Picker.Item label="Petty Cash" value="cash" />
              <Picker.Item label="Main Bank Account" value="bank" />
              <Picker.Item label="Business Credit Card" value="credit" />
            </Picker>
          </View>
        </View>

        {/* Location Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Location</Text>
          <View style={styles.pickerBox}>
            <Picker>
              <Picker.Item label="Select Location" value="" />
              <Picker.Item label="Main Branch (Downtown)" value="main" />
              <Picker.Item label="East Warehouse" value="warehouse" />
              <Picker.Item label="Online Store" value="online" />
            </Picker>
          </View>
        </View>

        {/* Category Dropdown */}
        <View style={styles.field}>
          <Text style={styles.label}>Category</Text>
          <View style={styles.pickerBox}>
            <Picker>
              <Picker.Item label="Select Category" value="" />
              <Picker.Item label="Inventory Purchase" value="inventory" />
              <Picker.Item label="Utilities" value="utilities" />
              <Picker.Item label="Rent & Lease" value="rent" />
              <Picker.Item label="Marketing & Ads" value="marketing" />
              <Picker.Item label="Other Expenses" value="other" />
            </Picker>
          </View>
        </View>

        {/* Notes */}
        <View style={styles.field}>
          <Text style={styles.label}>Notes</Text>
          <TextInput
            placeholder="Enter expense details..."
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </View>
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.button}>
          <FontAwesome5 name="plus-circle" size={16} color="#fff" />
          <Text style={styles.buttonText}>Create Expense</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: "#f6f7f8",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    marginRight: 20,
  },
  field: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 6,
  },
  input: {
    height: 48,
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 8,
    paddingHorizontal: 12,
    justifyContent: "center",
    backgroundColor: "#fff",
  },
  amountBox: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 8,
    height: 56,
    backgroundColor: "#fff",
  },
  currency: {
    fontSize: 18,
    paddingLeft: 12,
    fontWeight: "600",
  },
  amountInput: {
    flex: 1,
    fontSize: 20,
    fontWeight: "700",
    paddingHorizontal: 10,
  },
  pickerBox: {
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  textArea: {
    borderWidth: 1,
    borderColor: "#dbe2e6",
    borderRadius: 8,
    padding: 12,
    backgroundColor: "#fff",
    textAlignVertical: "top",
  },
  footer: {
   
    padding: 16,
    backgroundColor: "#fff",
  },
  button: {
    backgroundColor: "#1193d4",
    paddingVertical: 14,
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "700",
    marginLeft: 8,
    fontSize: 16,
  },
});
