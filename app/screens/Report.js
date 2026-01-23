import DateTimePicker from "@react-native-community/datetimepicker";
import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function ReportScreen() {
  const PRIMARY = "#1193d4";

  const SUBTLE = "#617c89";
  const navigation = useNavigation();

  const [groupBy, setGroupBy] = useState("daily");
  // Date states
  const [fromDate, setFromDate] = useState(new Date());
  const [toDate, setToDate] = useState(new Date());
  const [showFromPicker, setShowFromPicker] = useState(false);
  const [showToPicker, setShowToPicker] = useState(false);

  //location
  const [location, setLocation] = useState("all");

  const formatDate = (date) => date.toISOString().split("T")[0];

  return (
    <View style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar
          barStyle="dark-content"
          backgroundColor="#ffffff"
          translucent={false}
        />

        {/* Top Bar */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <FontAwesome5 name="bars" size={22} color={"#111"} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Detailed Report</Text>
          <View style={{ width: 26 }} />
        </View>

        <ScrollView contentContainerStyle={{ padding: 16 }}>
          {/* Filters */}
          <View style={styles.card}>
            <Text style={styles.cardTitle}>
              <FontAwesome5 name="sliders-h" size={18} color={PRIMARY} /> Report
              Filters
            </Text>

            {/* Date Range */}
            <View style={styles.row}>
              {/* FROM */}
              <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowFromPicker(true)}
              >
                <Text style={styles.label}>FROM</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>{formatDate(fromDate)}</Text>
                  <FontAwesome5 name="calendar-alt" size={16} color={SUBTLE} />
                </View>
              </TouchableOpacity>

              {/* TO */}
              <TouchableOpacity
                style={styles.dateBox}
                onPress={() => setShowToPicker(true)}
              >
                <Text style={styles.label}>TO</Text>
                <View style={styles.dateRow}>
                  <Text style={styles.dateText}>{formatDate(toDate)}</Text>
                  <FontAwesome5 name="calendar-alt" size={16} color={SUBTLE} />
                </View>
              </TouchableOpacity>
            </View>

            {/* Group By */}
            <Text style={[styles.label, { marginTop: 5 }]}>GROUP BY</Text>
            <View style={styles.segment}>
              {["daily", "monthly", "yearly"].map((item) => (
                <TouchableOpacity
                  key={item}
                  onPress={() => setGroupBy(item)}
                  style={[
                    styles.segmentBtn,
                    groupBy === item && styles.segmentActive,
                  ]}
                >
                  <Text
                    style={[
                      styles.segmentText,
                      groupBy === item && { color: PRIMARY },
                    ]}
                  >
                    {item.toUpperCase()}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Location */}
            {/* Location */}
            <Text style={styles.label}>LOCATION</Text>

            <View style={styles.pickerWrapper}>
              <Picker
                selectedValue={location}
                onValueChange={(value) => setLocation(value)}
                style={styles.picker}
                dropdownIconColor={SUBTLE}
              >
                <Picker.Item label="All Locations" value="all" />
                <Picker.Item label="Default" value="default" />
                <Picker.Item label="Chearas" value="chearas" />
              </Picker>
            </View>

            {/* Button */}
            <TouchableOpacity
              style={[styles.button, { backgroundColor: PRIMARY }]}
            >
              <FontAwesome5 name="chart-bar" size={20} color="#fff" />
              <Text style={styles.buttonText}>Generate Report</Text>
            </TouchableOpacity>
          </View>

          {/* Summary */}
          <View style={styles.summaryRow}>
            <View style={[styles.summaryCard, { backgroundColor: PRIMARY }]}>
              <Text style={styles.summaryLabel}>Total Sales</Text>
              <Text style={styles.summaryValue}>$42,590</Text>
            </View>

            <View style={styles.summaryCardLight}>
              <Text style={styles.summaryLabelDark}>Net Profit</Text>
              <Text style={styles.summaryValueDark}>$12,840</Text>
            </View>
          </View>

          {/* Table */}
          <View style={styles.tableCard}>
            <View style={styles.tableHeader}>
              <Text style={styles.tableTitle}>Results</Text>
            </View>

            <ScrollView horizontal>
              <View>
                {/* Table Head */}
                <View style={styles.tableRowHead}>
                  {[
                    "Date",
                    "Sales Cnt",
                    "Sales Amt",
                    "Payments",
                    "Return Cnt",
                    "Purch Cnt",
                    "Purch Amt",
                    "Purch Pay",
                    "Salaries",
                    "Expenses",
                    "Services",
                  ].map((h) => (
                    <Text key={h} style={styles.th}>
                      {h}
                    </Text>
                  ))}
                </View>

                {/* Row */}
                {[
                  [
                    "24 Oct 2025",
                    "142",
                    "$4,250",
                    "$4,250",
                    "2",
                    "-$120",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                  ],
                  [
                    "23 Oct 2025",
                    "128",
                    "$3,840",
                    "$3,800",
                    "0",
                    "$0",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                  ],
                  [
                    "22 Oct 2025",
                    "156",
                    "$5,102",
                    "$5,102",
                    "5",
                    "-$240",
                    "0",
                    "0",
                    "0",
                    "0",
                    "0",
                  ],
                ].map((row, i) => (
                  <View key={i} style={styles.tableRow}>
                    {row.map((cell, j) => (
                      <Text key={j} style={styles.td}>
                        {cell}
                      </Text>
                    ))}
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>
        {/* FROM Picker */}
        {showFromPicker && (
          <DateTimePicker
            value={fromDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowFromPicker(false);
              if (e.type === "set" && date) setFromDate(date);
            }}
          />
        )}

        {/* TO Picker */}
        {showToPicker && (
          <DateTimePicker
            value={toDate}
            mode="date"
            display="default"
            onChange={(e, date) => {
              setShowToPicker(false);
              if (e.type === "set" && date) setToDate(date);
            }}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f6f7f8" },
  safeContainer: {
    flex: 1,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
    elevation: 2,
  },
  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 18,
    fontWeight: "700",
    color: "#111618",
  },

  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 14,
    marginBottom: 16,
  },
  cardTitle: {
    fontWeight: "700",
    fontSize: 15,
    marginBottom: 12,
    color: "#111618",
  },

  row: { flexDirection: "row", gap: 10 },
  field: { flex: 1 },
  label: {
    fontSize: 11,
    color: "#617c89",
    marginBottom: 4,
    fontWeight: "600",
  },
  input: {
    backgroundColor: "#f1f3f4",
    borderRadius: 10,
    padding: 10,
  },

  dateBox: {
    flex: 1,
    backgroundColor: "#f1f3f4",
    borderRadius: 10,
    padding: 6,
  },
  dateRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dateText: {
    fontSize: 14,
    color: "#111618",
    fontWeight: "600",
  },

  segment: {
    flexDirection: "row",
    backgroundColor: "#f1f3f4",
    borderRadius: 10,
    padding: 4,
    marginBottom: 12,
  },
  segmentBtn: { flex: 1, padding: 8, alignItems: "center" },
  segmentActive: { backgroundColor: "#fff", borderRadius: 8 },
  segmentText: { fontSize: 13, color: "#617c89", fontWeight: "600" },

  button: {
    flexDirection: "row",
    gap: 8,
    padding: 14,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontWeight: "700" },

  summaryRow: { flexDirection: "row", gap: 10 },
  summaryCard: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
  },
  summaryCardLight: {
    flex: 1,
    padding: 16,
    borderRadius: 14,
    backgroundColor: "#fff",
  },
  summaryLabel: { color: "#fff", opacity: 0.8 },
  summaryValue: { color: "#fff", fontSize: 22, fontWeight: "700" },
  summaryLabelDark: { color: "#617c89" },
  summaryValueDark: { color: "#111618", fontSize: 22, fontWeight: "700" },

  tableCard: {
    backgroundColor: "#fff",
    borderRadius: 14,
    marginTop: 16,
    paddingBottom: 10,
  },
  tableHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 14,
  },
  tableTitle: { fontWeight: "700", fontSize: 16 },

  tableRowHead: {
    flexDirection: "row",
    backgroundColor: "#f1f3f4",
  },
  tableRow: {
    flexDirection: "row",
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  th: {
    width: 100,
    padding: 10,
    fontWeight: "700",
    textAlign: "right",
  },
  td: {
    width: 100,
    padding: 10,
    textAlign: "right",
    color: "#555",
  },
  pickerWrapper: {
    backgroundColor: "#f1f3f4",
    borderRadius: 10,
    marginBottom: 12,
    overflow: "hidden",
  },

  picker: {
    height: 55,
    color: "#111618",
    width: "100%",
  },
});
