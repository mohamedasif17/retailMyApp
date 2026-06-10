import { Picker } from "@react-native-picker/picker";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import Toast from "react-native-toast-message";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#1193d4";
const BG = "#f6f7f8";
const BORDER = "#e5e7eb";
const TEXT = "#111827";
const SUBTLE = "#6b7280";

export default function AddItemScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [barcode, setBarcode] = useState("");
  const [buyingCost, setBuyingCost] = useState("");
  const [sellingPrice, setSellingPrice] = useState("");
  const [errors, setErrors] = useState({});
  const [offerPrice, setOfferPrice] = useState("");
  const [taxCode, setTaxCode] = useState("");
  const [taxPercentage, setTaxPercentage] = useState("");
  const [buyTaxType, setBuyTaxType] = useState("");
  const [sellTaxType, setSellTaxType] = useState("");
  const [description, setDescription] = useState("");
const [stocks, setStocks] = useState("");
  const handleAddProduct = async () => {
    let newErrors = {};

    if (!name.trim()) {
      newErrors.name = "Please fill this field";
    }

    if (!barcode.trim()) {
      newErrors.barcode = "Please fill this field";
    }

    if (!buyingCost.trim()) {
      newErrors.buyingCost = "Please fill this field";
    }

    if (!sellingPrice.trim()) {
      newErrors.sellingPrice = "Please fill this field";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      return;
    }

    try {
      const response = await fetch("http://10.32.64.215:8000/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          description,

          barcode,
          buyingCost: Number(buyingCost),
          sellingPrice: Number(sellingPrice),
  stocks: Number(stocks),
    offerPrice: offerPrice ? Number(offerPrice) : 0,

        }),
      });

      const data = await response.json();

      if (!response.ok) {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: data.message,
        });
        return;
      }

      Toast.show({
        type: "success",
        text1: "Success",
        text2: "Product added successfully",
      });

      setName("");
      setDescription("");

      setBarcode("");
      setBuyingCost("");
      setSellingPrice("");
      setStocks("");
      setOfferPrice("");
      setErrors({});
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Failed to add product",
      });
    }
  };
  return (
    <SafeAreaView style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <FontAwesome5 name="chevron-left" size={18} color="#111" />
        </TouchableOpacity>

        <Text style={styles.headerTitle}>Add Item</Text>
        <View style={{ width: 32 }} />
      </View>

      {/* FORM */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 50 }}
      >
        {/* BASIC INFO */}
        <Section title="Basic Information">
          <Input
            label={<Text style={{ color: "red" }}>Item name</Text>}
            placeholder="e.g. Organic Milk 1L"
            value={name}
            onChangeText={(text) => {
              setName(text);
              setErrors({ ...errors, name: "" });
            }}
          />

          {errors.name && (
            <Text style={{ color: "red", fontSize: 12, bottom: 10 }}>
              {errors.name}
            </Text>
          )}

          <TextArea
            label="Description"
            placeholder="Add details about the product..."
            value={description}
            onChangeText={setDescription}
          />

          <View>
            <Text style={{ color: "red", fontSize: 14 }}>Barcode</Text>
            <TextInput
              style={[styles.input, { flex: 1, borderRightWidth: 0 }]}
              placeholder="Scan or enter code"
              placeholderTextColor={SUBTLE}
              value={barcode}
              onChangeText={(text) => {
                setBarcode(text);
                setErrors({ ...errors, barcode: "" });
              }}
            />

            {errors.barcode && (
              <Text style={{ color: "red", fontSize: 12, bottom: 10 }}>
                {errors.barcode}
              </Text>
            )}

<Input
  label="Stocks"
  placeholder="0.00"
  keyboardType="numeric"
  value={stocks}
  onChangeText={(text) => {
    setStocks(text);
    setErrors({ ...errors, stocks: "" });
  }}
/>

{errors.stocks && (
  <Text style={{ color: "red", fontSize: 12 }}>
    {errors.stocks}
  </Text>
)}
          </View>
        </Section>

        {/* PRICING */}
        <Section title="Pricing Details">
          <Row>
            <Input
              label={<Text style={{ color: "red" }}>Buying cost</Text>}
              placeholder="0.00"
              keyboardType="numeric"
              value={buyingCost}
              onChangeText={(text) => {
                setBuyingCost(text);
                setErrors({ ...errors, buyingCost: "" });
              }}
            />

            <Input
              label={<Text style={{ color: "red" }}>Selling price</Text>}
              placeholder="0.00"
              keyboardType="numeric"
              value={sellingPrice}
              onChangeText={(text) => {
                setSellingPrice(text);
                setErrors({ ...errors, sellingPrice: "" });
              }}
            />
          </Row>

          {/* Error Row */}
          <Row style={{ marginTop: 4 }}>
            <View style={{ flex: 1, bottom: 10 }}>
              {errors.buyingCost && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errors.buyingCost}
                </Text>
              )}
            </View>

            <View style={{ flex: 1, alignItems: "flex-end", bottom: 10 }}>
              {errors.sellingPrice && (
                <Text style={{ color: "red", fontSize: 12 }}>
                  {errors.sellingPrice}
                </Text>
              )}
            </View>
          </Row>
          <Input
            label="Offer price (Optional)"
            placeholder="0.00"
            keyboardType="numeric"
            value={offerPrice}
            onChangeText={setOfferPrice}
          />
        </Section>

        {/* TAX */}
        <Section title="Tax Information">
          <Row>
            <Input
              label="Tax code"
              placeholder="e.g. VAT-01"
              value={taxCode}
              onChangeText={setTaxCode}
            />
            <Input
              label="Tax (%)"
              placeholder="0"
              keyboardType="numeric"
              value={taxPercentage}
              onChangeText={(text) => {
                setTaxPercentage(text);

                if (!text) {
                  setBuyTaxType("");
                  setSellTaxType("");
                }
              }}
            />
          </Row>

          {taxPercentage ? (
            <View style={styles.row}>
              {/* Buying Tax */}
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Tax type (Buying)</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={buyTaxType}
                    onValueChange={(itemValue) => setBuyTaxType(itemValue)}
                  >
                    <Picker.Item label="Select type" value="" />
                    <Picker.Item label="Including" value="Including" />
                    <Picker.Item label="Excluding" value="Excluding" />
                  </Picker>
                </View>
              </View>

              {/* Selling Tax */}
              <View style={{ flex: 1 }}>
                <Text style={styles.label}>Tax type (Selling)</Text>
                <View style={styles.select}>
                  <Picker
                    selectedValue={sellTaxType}
                    onValueChange={(itemValue) => setSellTaxType(itemValue)}
                  >
                    <Picker.Item label="Select type" value="" />
                    <Picker.Item label="Including" value="Including" />
                    <Picker.Item label="Excluding" value="Excluding" />
                  </Picker>
                </View>
              </View>
            </View>
          ) : null}
        </Section>
      </ScrollView>

      {/* FIXED BOTTOM BUTTON */}
      <TouchableOpacity style={styles.addBtn} onPress={handleAddProduct}>
        <FontAwesome5 name="plus-circle" size={20} color="#fff" />
        <Text style={styles.addBtnText}>Add Item</Text>
      </TouchableOpacity>
      <Toast position="top" topOffset={50} />
    </SafeAreaView>
  );
}

/* ---------------- COMPONENTS ---------------- */

function Section({ title, children, bg }) {
  return (
    <View style={[styles.section, bg && styles.sectionBg]}>
      <Text style={styles.sectionTitle}>{title}</Text>
      {children}
    </View>
  );
}

function Label({ children }) {
  return <Text style={styles.label}>{children}</Text>;
}

function Input({ label, bold, ...props }) {
  return (
    <View style={{ flex: 1 }}>
      <Label>{label}</Label>
      <TextInput
        style={[styles.input, bold && { fontWeight: "700" }]}
        placeholderTextColor={SUBTLE}
        {...props}
      />
    </View>
  );
}

function TextArea({ label, ...props }) {
  return (
    <View>
      <Label>{label}</Label>
      <TextInput
        style={[styles.input, { height: 90, textAlignVertical: "top" }]}
        multiline
        placeholderTextColor={SUBTLE}
        {...props}
      />
    </View>
  );
}

function Row({ children }) {
  return <View style={styles.row}>{children}</View>;
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    height: 56,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: BORDER,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 14,
  },

  headerTitle: {
    flex: 1,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  section: {
    padding: 14,
  },

  sectionBg: {
    backgroundColor: "#f9fafb",
  },

  sectionTitle: {
    fontSize: 12,
    fontWeight: "700",
    color: SUBTLE,
    marginBottom: 12,
    textTransform: "uppercase",
  },

  label: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 6,
    color: TEXT,
  },

  input: {
    height: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    paddingHorizontal: 12,
    backgroundColor: "#fff",
    marginBottom: 14,
    color: TEXT,
  },

  row: {
    flexDirection: "row",
    gap: 12,
  },

  barcodeBox: {
    flexDirection: "row",
    alignItems: "center",
  },

  barcodeBtn: {
    height: 46,
    width: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderLeftWidth: 0,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#fff",
  },

  select: {
    height: 46,
    borderWidth: 1,
    borderColor: BORDER,
    borderRadius: 10,
    backgroundColor: "#fff",
    justifyContent: "center",
  },

  selectText: {
    fontSize: 14,
    color: TEXT,
    fontWeight: "600",
  },

  addBtn: {
    height: 56,
    backgroundColor: PRIMARY,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
  },

  addBtnText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "800",
  },
});
