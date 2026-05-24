import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import {
  FlatList,
  Modal,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const PRIMARY = "#0ea5e9";
const BG = "#f8fafc";
const CARD = "#ffffff";
const BORDER = "#e2e8f0";
const TEXT = "#0f172a";
const SUBTLE = "#64748b";

const CUSTOMERS = [
  { id: "walkin", label: "Walk-in Customer", sub: "No account", icon: "user" },
  { id: "c1", label: "Customer 1", sub: "Reg. member", icon: "user-circle" },
  { id: "c2", label: "Customer 2", sub: "Reg. member", icon: "user-circle" },
  { id: "c3", label: "Customer 3", sub: "Reg. member", icon: "user-circle" },
];

const PAYMENT_METHODS = [
  { id: "gpay", label: "GPay", sub: "Google Pay", icon: "google" },
  { id: "card", label: "Card", sub: "Debit / Credit", icon: "credit-card" },
  { id: "cash", label: "Cash", sub: "Physical cash", icon: "money-bill-wave" },
];


const PRODUCTS = [
  { id: "p1", title: "Wireless Mouse M185", category: "Electronics", price: 15 },
  { id: "p2", title: "Mech Keyboard K2", category: "Electronics", price: 85 },
  { id: "p3", title: "USB-C Hub Pro", category: "Electronics", price: 32 },
  { id: "p4", title: "HDMI Cable 2m", category: "Accessories", price: 12 },
  { id: "p5", title: "Laptop Stand", category: "Accessories", price: 45 },
  { id: "p6", title: "Webcam HD 1080p", category: "Electronics", price: 65 },
  { id: "p7", title: "Desk Lamp LED", category: "Office", price: 28 },
  { id: "p8", title: "Mouse Pad XL", category: "Accessories", price: 18 },
  { id: "p9", title: "USB Flash Drive 64GB", category: "Storage", price: 10 },
  { id: "p10", title: "Bluetooth Speaker", category: "Electronics", price: 55 },
];

export default function PosScreen() {
  const navigation = useNavigation();

  const [customer, setCustomer] = useState(CUSTOMERS[0]);
  const [payMethod, setPayMethod] = useState(PAYMENT_METHODS[2]);
  const [custModal, setCustModal] = useState(false);
  const [payModal, setPayModal] = useState(false);
const [cart, setCart] = useState([]);
  const [searchText, setSearchText] = useState("");
const [showDropdown, setShowDropdown] = useState(false);

const searchResults = searchText.length > 0
  ? PRODUCTS.filter((p) =>
      p.title.toLowerCase().includes(searchText.toLowerCase()) ||
      p.category.toLowerCase().includes(searchText.toLowerCase())
    )
  : [];

  const addToCart = (product) => {
  setCart((prev) => {
    const existing = prev.find((item) => item.id === product.id);
    if (existing) {
      // already in cart — just increase qty
      return prev.map((item) =>
        item.id === product.id ? { ...item, qty: item.qty + 1 } : item
      );
    }
     // new item — added at TOP instead of bottom
    return [{ ...product, qty: 1 }, ...prev];
  });
  setSearchText("");
  setShowDropdown(false);
};
  // increase qty
  const increase = (id) => {
    setCart((prev) =>
      prev.map((item) => item.id === id ? { ...item, qty: item.qty + 1 } : item)
    );
  };

  // decrease qty — floors at 1, never removes
  const decrease = (id) => {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id && item.qty > 1 ? { ...item, qty: item.qty - 1 } : item
      )
    );
  };

  // delete single item
  const deleteItem = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  // clear all
  const clearCart = () => setCart([]);

  // totals
  const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
  const totalAmount = cart.reduce((sum, item) => sum + item.qty * item.price, 0);

  return (
    <View style={styles.safe}>
      <StatusBar barStyle="dark-content" backgroundColor="#fff" />

      {/* HEADER */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.openDrawer()}>
          <FontAwesome5 name="bars" size={22} color="#111" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>POS</Text>
        <View style={{ width: 26 }} />
      </View>

      {/* CUSTOMER + PAYMENT */}
      <View style={styles.topRow}>
        <SelectCard
          icon="user"
          label="Customer"
          value={customer.label}
          flex={3}
          onPress={() => setCustModal(true)}
        />
        <SelectCard
          icon="money-bill-wave"
          label="Method"
          value={payMethod.label}
          flex={2}
          onPress={() => setPayModal(true)}
        />
      </View>

      {/* SEARCH */}
      {/* <View style={styles.searchBox}>
        <FontAwesome5 name="search" size={18} color={SUBTLE} />
        <TextInput
          placeholder="Search item by name or code..."
          style={styles.searchInput}
          placeholderTextColor={SUBTLE}
        />
        <FontAwesome5 name="qrcode" size={20} color={SUBTLE} />
      </View> */}

      {/* SEARCH */}
<View style={{ marginHorizontal: 14 }}>
  <View style={styles.searchBox}>
    <FontAwesome5 name="search" size={18} color={SUBTLE} />
    <TextInput
      placeholder="Search item by name or code..."
      style={styles.searchInput}
      placeholderTextColor={SUBTLE}
      value={searchText}
      onChangeText={(text) => {
        setSearchText(text);
        setShowDropdown(text.length > 0);
      }}
      onFocus={() => searchText.length > 0 && setShowDropdown(true)}
    />
    {searchText.length > 0 ? (
      <TouchableOpacity onPress={() => { setSearchText(""); setShowDropdown(false); }}>
        <FontAwesome5 name="times-circle" size={18} color={SUBTLE} />
      </TouchableOpacity>
    ) : (
      <FontAwesome5 name="qrcode" size={20} color={SUBTLE} />
    )}
  </View>

  {/* DROPDOWN */}
  {showDropdown && (
    <View style={styles.dropdown}>
      {searchResults.length === 0 ? (
        <View style={styles.dropdownEmpty}>
          <FontAwesome5 name="box-open" size={20} color={BORDER} />
          <Text style={styles.dropdownEmptyText}>No products found</Text>
        </View>
      ) : (
        <ScrollView
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          style={{ maxHeight: 280 }}
        >
          {searchResults.map((product, index) => {
            const inCart = cart.find((c) => c.id === product.id);
            return (
              <View key={product.id}>
                <TouchableOpacity
                  style={styles.dropdownRow}
                  onPress={() => addToCart(product)}
                  activeOpacity={0.7}
                >
                  <View style={styles.dropdownThumb}>
                    <FontAwesome5 name="box" size={14} color={SUBTLE} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.dropdownTitle}>{product.title}</Text>
                    <Text style={styles.dropdownCategory}>{product.category}</Text>
                  </View>
                  <View style={{ alignItems: "flex-end", gap: 4 }}>
                    <Text style={styles.dropdownPrice}>${product.price.toFixed(2)}</Text>
                    {inCart && (
                      <View style={styles.inCartBadge}>
                        <Text style={styles.inCartText}>In cart ×{inCart.qty}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.addBtn}>
                    <FontAwesome5 name="plus" size={11} color="#fff" />
                  </View>
                </TouchableOpacity>
                {index < searchResults.length - 1 && (
                  <View style={styles.separator} />
                )}
              </View>
            );
          })}
        </ScrollView>
      )}
    </View>
  )}
</View>

      {/* CART LIST */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 260 }}
      >
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Cart Items ({totalQty})</Text>
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clearText}>Clear all</Text>
          </TouchableOpacity>
        </View>

        {cart.length === 0 ? (
          <View style={styles.emptyCart}>
            <FontAwesome5 name="shopping-cart" size={36} color={BORDER} />
            <Text style={styles.emptyText}>Cart is empty</Text>
          </View>
        ) : (
          cart.map((item) => (
            <CartItem
              key={item.id}
              title={item.title}
              category={item.category}
              price={item.price}
              qty={item.qty}
              onIncrease={() => increase(item.id)}
              onDecrease={() => decrease(item.id)}
              onDelete={() => deleteItem(item.id)}
            />
          ))
        )}
      </ScrollView>

      {/* BOTTOM SHEET */}
      <View style={styles.bottomSheet}>
        <View style={styles.summaryRow}>
          <View>
            <Text style={styles.summaryLabel}>Total Quantity</Text>
            <Text style={styles.summaryValue}>{totalQty} Items</Text>
          </View>
          <View style={{ alignItems: "flex-end" }}>
            <Text style={styles.summaryLabel}>Total Amount</Text>
            <Text style={styles.totalAmount}>${totalAmount.toFixed(2)}</Text>
          </View>
        </View>
        <TouchableOpacity
          style={[styles.saleBtn, cart.length === 0 && { opacity: 0.5 }]}
          disabled={cart.length === 0}
        >
          <Text style={styles.saleText}>Create Sale</Text>
          <FontAwesome5 name="arrow-right" size={18} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* CUSTOMER MODAL */}
      <SelectionModal
        visible={custModal}
        title="Select Customer"
        items={CUSTOMERS}
        selectedId={customer.id}
        onSelect={(item) => { setCustomer(item); setCustModal(false); }}
        onClose={() => setCustModal(false)}
      />

      {/* PAYMENT MODAL */}
      <SelectionModal
        visible={payModal}
        title="Select Payment Method"
        items={PAYMENT_METHODS}
        selectedId={payMethod.id}
        onSelect={(item) => { setPayMethod(item); setPayModal(false); }}
        onClose={() => setPayModal(false)}
      />
    </View>
  );
}

/* ---------------- MODAL ---------------- */

// function SelectionModal({ visible, title, items, selectedId, onSelect, onClose }) {
  
//   return (
//     <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
//       <Pressable style={styles.overlay} onPress={onClose}>
//         <Pressable style={styles.sheet} onPress={() => {}}>
//           <View style={styles.handleBar}>
//             <View style={styles.sheetHandle} />
//             <Text style={styles.sheetTitle}>{title}</Text>
//           </View>
//           <FlatList
//             data={items}
//             keyExtractor={(item) => item.id}
//             ItemSeparatorComponent={() => <View style={styles.separator} />}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 style={styles.optionRow}
//                 onPress={() => onSelect(item)}
//                 activeOpacity={0.7}
//               >
//                 <View style={styles.optionIcon}>
//                   <FontAwesome5 name={item.icon} size={16} color={PRIMARY} />
//                 </View>
//                 <View style={{ flex: 1 }}>
//                   <Text style={styles.optionLabel}>{item.label}</Text>
//                   {item.sub ? <Text style={styles.optionSub}>{item.sub}</Text> : null}
//                 </View>
//                 {selectedId === item.id && (
//                   <FontAwesome5 name="check-circle" size={18} color={PRIMARY} />
//                 )}
//               </TouchableOpacity>
//             )}
//           />
//           <View style={{ height: 24 }} />
//         </Pressable>
//       </Pressable>
//     </Modal>
//   );
// }

function SelectionModal({ visible, title, items, selectedId, onSelect, onClose }) {
  const [search, setSearch] = useState("");

  const filtered = items.filter((item) =>
    item.label.toLowerCase().includes(search.toLowerCase())
  );

  // reset search when modal closes
  const handleClose = () => {
    setSearch("");
    onClose();
  };

  const handleSelect = (item) => {
    setSearch("");
    onSelect(item);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={handleClose}>
      <Pressable style={styles.overlay} onPress={handleClose}>
        <Pressable style={styles.sheet} onPress={() => {}}>

          {/* HANDLE */}
          <View style={styles.handleBar}>
            <View style={styles.sheetHandle} />
          </View>

          {/* TITLE + CLOSE */}
          <View style={styles.sheetHeader}>
            <Text style={styles.sheetTitle}>{title}</Text>
            <TouchableOpacity style={styles.closeBtn} onPress={handleClose}>
              <FontAwesome5 name="times" size={14} color={SUBTLE} />
            </TouchableOpacity>
          </View>

          {/* SEARCH — only show for customer modal (more than 3 items) */}
          {items.length > 3 && (
            <View style={styles.modalSearch}>
              <FontAwesome5 name="search" size={14} color={SUBTLE} />
              <TextInput
                style={styles.modalSearchInput}
                placeholder="Search customer..."
                placeholderTextColor={SUBTLE}
                value={search}
                onChangeText={setSearch}
                autoCorrect={false}
              />
              {search.length > 0 && (
                <TouchableOpacity onPress={() => setSearch("")}>
                  <FontAwesome5 name="times-circle" size={14} color={SUBTLE} />
                </TouchableOpacity>
              )}
            </View>
          )}

          {/* RESULTS */}
          {filtered.length === 0 ? (
            <View style={styles.noResult}>
              <FontAwesome5 name="user-slash" size={28} color={BORDER} />
              <Text style={styles.noResultText}>No customer found</Text>
            </View>
          ) : (
            <FlatList
              data={filtered}
              keyExtractor={(item) => item.id}
              style={styles.modalList}
              keyboardShouldPersistTaps="handled"
              showsVerticalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.optionRow}
                  onPress={() => handleSelect(item)}
                  activeOpacity={0.7}
                >
                  <View style={styles.optionIcon}>
                    <FontAwesome5 name={item.icon} size={16} color={PRIMARY} />
                  </View>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.optionLabel}>{item.label}</Text>
                    {item.sub ? <Text style={styles.optionSub}>{item.sub}</Text> : null}
                  </View>
                  {selectedId === item.id && (
                    <FontAwesome5 name="check-circle" size={18} color={PRIMARY} />
                  )}
                </TouchableOpacity>
              )}
            />
          )}

          <View style={{ height: 24 }} />
        </Pressable>
      </Pressable>
    </Modal>
  );
}
/* ---------------- COMPONENTS ---------------- */

function SelectCard({ icon, label, value, flex, onPress }) {
  return (
    <TouchableOpacity style={[styles.selectCard, { flex }]} onPress={onPress} activeOpacity={0.7}>
      <FontAwesome5 name={icon} size={18} color={PRIMARY} />
      <View style={{ flex: 1 }}>
        <Text style={styles.selectLabel}>{label}</Text>
        <Text style={styles.selectValue} numberOfLines={1}>{value}</Text>
      </View>
      <FontAwesome5 name="chevron-down" size={14} color={SUBTLE} />
    </TouchableOpacity>
  );
}

function CartItem({ title, category, price, qty, onIncrease, onDecrease, onDelete }) {
  return (
    <View style={styles.itemCard}>

      {/* TOP ROW — thumb + info + subtotal + delete */}
      <View style={styles.itemTop}>
        <View style={styles.itemThumb}>
          <FontAwesome5 name="box" size={20} color={SUBTLE} />
        </View>

        <View style={{ flex: 1 }}>
          <Text style={styles.itemTitle}>{title}</Text>
          <Text style={styles.itemCategory}>{category}</Text>
          <Text style={styles.itemPrice}>MRP ${price.toFixed(2)}</Text>
        </View>

        <View style={{ alignItems: "flex-end", gap: 6 }}>
          {/* DELETE — top right */}
          <TouchableOpacity style={styles.deleteBtn} onPress={onDelete}>
            <FontAwesome5 name="trash" size={13} color="#ef4444" />
          </TouchableOpacity>
          {/* SUBTOTAL — below delete */}
          <Text style={styles.subtotal}>${(qty * price).toFixed(2)}</Text>
        </View>
      </View>

      {/* BOTTOM ROW — qty controls + unit price */}
      <View style={styles.itemBottom}>
        <View style={styles.qtyBox}>
          {/* ALWAYS MINUS */}
          <TouchableOpacity style={styles.qtyBtn} onPress={onDecrease}>
            <FontAwesome5 name="minus" size={12} color={TEXT} />
          </TouchableOpacity>

          <Text style={styles.qtyText}>{qty}</Text>

          <TouchableOpacity style={[styles.qtyBtn, styles.qtyAdd]} onPress={onIncrease}>
            <FontAwesome5 name="plus" size={12} color="#fff" />
          </TouchableOpacity>
        </View>

        <Text style={styles.qtyLabel}>{qty} × ${price.toFixed(2)}</Text>
      </View>

    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: BG },

  header: {
    flexDirection: "row", alignItems: "center", padding: 14,
    backgroundColor: "#fff", borderBottomWidth: 1, borderColor: BORDER,
  },
  headerTitle: { flex: 1, textAlign: "center", fontWeight: "800", fontSize: 18 },

  topRow: { flexDirection: "row", gap: 10, padding: 14 },

  selectCard: {
    flexDirection: "row", alignItems: "center", gap: 8, padding: 12,
    borderWidth: 1, borderStyle: "dashed", borderColor: BORDER,
    borderRadius: 14, backgroundColor: "#fff",
  },
  selectLabel: { fontSize: 10, color: SUBTLE, fontWeight: "600" },
  selectValue: { fontSize: 14, fontWeight: "700", color: TEXT },

  searchBox: {
    flexDirection: "row", alignItems: "center", backgroundColor: "#e2e8f0",
    marginHorizontal: 14, borderRadius: 14, paddingHorizontal: 12, height: 44,
  },
  searchInput: { flex: 1, marginHorizontal: 8, fontSize: 14, color: TEXT },

  sectionHeader: {
    flexDirection: "row", justifyContent: "space-between",
    paddingHorizontal: 14, marginTop: 14,
  },
  sectionTitle: { fontWeight: "700", color: SUBTLE },
  clearText: { color: "#ef4444", fontWeight: "600", fontSize: 12 },

  emptyCart: { alignItems: "center", marginTop: 60, gap: 12 },
  emptyText: { color: SUBTLE, fontSize: 14 },

  itemCard: {
    backgroundColor: CARD, marginHorizontal: 14, marginTop: 12,
    borderRadius: 16, padding: 12, borderWidth: 1, borderColor: BORDER,
  },
  itemTop: { flexDirection: "row", gap: 12, alignItems: "flex-start" },
  itemThumb: {
    width: 48, height: 48, borderRadius: 12, backgroundColor: "#f1f5f9",
    alignItems: "center", justifyContent: "center",
  },
  itemTitle: { fontWeight: "700", fontSize: 14, color: TEXT },
  itemCategory: { fontSize: 11, color: SUBTLE, marginTop: 2 },
  itemPrice: { fontSize: 12, fontWeight: "600", color: SUBTLE, marginTop: 2 },

  deleteBtn: {
    width: 28, height: 28, borderRadius: 8,
    backgroundColor: "#fef2f2",
    alignItems: "center", justifyContent: "center",
  },
  subtotal: { fontSize: 16, fontWeight: "800", color: TEXT },

  itemBottom: {
    marginTop: 12, flexDirection: "row",
    justifyContent: "space-between", alignItems: "center",
  },
  qtyBox: { flexDirection: "row", alignItems: "center", gap: 8 },
  qtyBtn: {
    width: 32, height: 32, borderRadius: 8, backgroundColor: "#e5e7eb",
    alignItems: "center", justifyContent: "center",
  },
  qtyAdd: { backgroundColor: PRIMARY },
  qtyText: { fontWeight: "800", fontSize: 16, minWidth: 24, textAlign: "center" },
  qtyLabel: { fontSize: 12, color: SUBTLE, fontWeight: "600" },

  bottomSheet: { padding: 16, borderTopWidth: 1, borderColor: BORDER, backgroundColor: CARD },
  summaryRow: { flexDirection: "row", justifyContent: "space-between", marginBottom: 16 },
  summaryLabel: { fontSize: 12, color: SUBTLE, fontWeight: "600" },
  summaryValue: { fontSize: 16, fontWeight: "700" },
  totalAmount: { fontSize: 28, fontWeight: "900", color: PRIMARY },

  saleBtn: {
    height: 56, borderRadius: 16, backgroundColor: PRIMARY,
    flexDirection: "row", alignItems: "center", justifyContent: "center", gap: 8,
  },
  saleText: { color: "#fff", fontSize: 16, fontWeight: "800" },

  overlay: { flex: 1, backgroundColor: "rgba(0,0,0,0.45)", justifyContent: "flex-end" },
  sheet: { backgroundColor: "#fff", borderTopLeftRadius: 24, borderTopRightRadius: 24, paddingTop: 8 },
  handleBar: { paddingBottom: 4, paddingTop: 8 },
  sheetHandle: {
    width: 40, height: 4, borderRadius: 2, backgroundColor: "#cbd5e1",
    alignSelf: "center", marginBottom: 8,
  },
  sheetTitle: {
    fontSize: 16, fontWeight: "700", color: TEXT,
    paddingHorizontal: 16, paddingVertical: 10,
    borderBottomWidth: 1, borderColor: BORDER,
  },
  optionRow: { flexDirection: "row", alignItems: "center", gap: 14, paddingHorizontal: 16, paddingVertical: 14 },
  optionIcon: {
    width: 40, height: 40, borderRadius: 12, backgroundColor: "#f0f9ff",
    alignItems: "center", justifyContent: "center",
  },
  optionLabel: { fontSize: 15, fontWeight: "600", color: TEXT },
  optionSub: { fontSize: 12, color: SUBTLE, marginTop: 2 },
  separator: { height: 1, backgroundColor: BORDER, marginHorizontal: 16 },
  sheetHeader: {
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  paddingHorizontal: 16,
  paddingVertical: 10,
  borderBottomWidth: 1,
  borderColor: BORDER,
},
closeBtn: {
  width: 30,
  height: 30,
  borderRadius: 8,
  backgroundColor: "#f1f5f9",
  alignItems: "center",
  justifyContent: "center",
},
modalSearch: {
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  margin: 12,
  paddingHorizontal: 12,
  height: 42,
  borderRadius: 12,
  borderWidth: 1,
  borderColor: BORDER,
  backgroundColor: "#f8fafc",
},
modalSearchInput: {
  flex: 1,
  fontSize: 14,
  color: TEXT,
},
modalList: {
  maxHeight: 320,
},
noResult: {
  alignItems: "center",
  paddingVertical: 40,
  gap: 10,
},
noResultText: {
  fontSize: 13,
  color: SUBTLE,
},
dropdown: {
  backgroundColor: CARD,
  borderRadius: 14,
  borderWidth: 1,
  borderColor: BORDER,
  marginTop: 6,
  overflow: "hidden",
  elevation: 4,
  shadowColor: "#000",
  shadowOffset: { width: 0, height: 2 },
  shadowOpacity: 0.08,
  shadowRadius: 8,
  zIndex: 99,
},
dropdownEmpty: {
  alignItems: "center",
  paddingVertical: 24,
  gap: 8,
},
dropdownEmptyText: {
  fontSize: 13,
  color: SUBTLE,
},
dropdownRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 10,
  paddingHorizontal: 12,
  paddingVertical: 10,
},
dropdownThumb: {
  width: 36,
  height: 36,
  borderRadius: 10,
  backgroundColor: "#f1f5f9",
  alignItems: "center",
  justifyContent: "center",
},
dropdownTitle: {
  fontSize: 13,
  fontWeight: "700",
  color: TEXT,
},
dropdownCategory: {
  fontSize: 11,
  color: SUBTLE,
  marginTop: 1,
},
dropdownPrice: {
  fontSize: 13,
  fontWeight: "800",
  color: PRIMARY,
},
inCartBadge: {
  backgroundColor: "#f0fdf4",
  borderRadius: 6,
  paddingHorizontal: 6,
  paddingVertical: 2,
},
inCartText: {
  fontSize: 10,
  fontWeight: "700",
  color: "#16a34a",
},
addBtn: {
  width: 28,
  height: 28,
  borderRadius: 8,
  backgroundColor: PRIMARY,
  alignItems: "center",
  justifyContent: "center",
},
});