import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  Image,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";
import { SafeAreaView } from "react-native-safe-area-context";

const productsData = [
  {
    id: 1,
    code: "205", // POS shortcut code

    name: "Wireless Headphones",
    category: "Electronics",
    price: "$99.99",
    stock: 58,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuCpGIto_qU06I6eGIeUVKfm-oCtUs-0ARASSrfEyMHAIpa3mETdRvDxoYo8FDpZBNfvDnf3J5ozBIZCznUKc-eMM0Q-m-_ZlKO9kyy-k9JhBxuvpxIl39OUrDH7XvrK0t5wmIpyww9C1Jl5ot1f1zah_Ye0kpzLjQqbvkKUE4PQYBWJGzBBagbB556iHmhpDUGBkBw8DiA236nw73A9G0hB7U5FHQOY_TJ4IeS5C4X82IKstaCrYas5FZ4Siv1v3CQtS8WGM1GDnsBr",
  },
  {
    id: 2,
    code: "SMTW",

    name: "Smartwatch",
    category: "Electronics",
    price: "$199.99",
    stock: 32,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuBMpRQJJmTgRt2_QLBcwRbHS_vABciF_BJyW5S_rCAD7sgf3WRdYRoctMUNQjw6O4uyfqGNoa3FAduY7i4HyYSEn6CE2oRu9ijdcXhCrhM7PCJQs1O7fXrvz3h3Hi5EEP4bGzS19B_DdL5dP4ijryHPaJy7qEldu-8wsB-9dbTCLmr1ZHH1TDc1biYyPA6ggqBarot9yKPjZrrHepqgFulu42JwKbOHSU2pxlvtn_kGCSBHMrMvbW-vXWICF_IJlTzGSyh1_NO4352f",
  },
  {
    id: 3,
    code: "BSPK",

    name: "Bluetooth Speaker",
    category: "Electronics",
    price: "$49.99",
    stock: 120,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD1N37MrPl81XtVaNuxJNrLOyZta6TGnIcKMvNU1miYbpcvaETBYqjoUh1oZ1NvFK3E1Fv1rDK0WmIgYJosY4JMIeOC7knf_aBOZGfCGUapsi3VkUZ_SFU6LHzlVqVki9DLKZFcML9xCcaZlg-PBtzLZHuePJrgQdV7OP49Obn7q4OtXhvqq-x4U6IgoVU6aEW31VstTZICeHtTR1M_BDjaPoCb9EB94jMH7BdFSwEbl1SQNG-foSwOyU0HcIqgKPkaOuLlQqZOG5CJ",
  },
  {
    id: 4,
    code: "PCHG",

    name: "Portable Charger",
    category: "Electronics",
    price: "$29.99",
    stock: 95,
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuD-bQAoA0maUeg3hVOr6EJsx865iLuctnukyibkreZW8sJNCO9vcFLpGTBHrMPv3qUahZxkZlBOPRw35o4KYY9280WQ9CJZHqh4lHM7UpOjr1CshcRIHff3JBDP0Lf0x3WT2fG6PoAga6YQ1BJuPMDfbyD6EsoV6pzIxseAVIeWb3CDwI_kftWyV6ZAoMhRHEZ4MWIt_aAMDkS8Oh0mkVEZpgBhWcIIwUzggiK2PNMEtZTUMCbMhHSM5d0PNL8R4BLqx9NHPZLxj2_m",
  },
  {
    id: 5,
    code: "SMTR",

    name: "Fitness Tracker",
    category: "Wearables",
    price: "$79.99",
    stock: 45,
    image:
    "https://images.unsplash.com/photo-1576243345690-4e4b79b63288?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 6,
    code: "GGM",

    name: "Gaming Mouse",
    category: "Electronics",
    price: "$59.99",
    stock: 75,
    image:
    "https://images.unsplash.com/photo-1613141412501-9012977f1969?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 7,
    code: "LPSTD",

    name: "Laptop Stand",
    category: "Accessories",
    price: "$34.99",
    stock: 60,
    image:
    "https://images.unsplash.com/photo-1623251606108-512c7c4a3507?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 8,
    code: "670",
    name: "Desk Lamp",
    category: "Home & Office",
    price: "$24.99",
    stock: 90,
    image:
    "https://images.unsplash.com/photo-1621447980929-6638614633c8?q=80&w=736&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 9,
    code: "879",

    name: "Wireless Keyboard",
    category: "Electronics",
    price: "$49.99",
    stock: 50,
    image:
    "https://images.unsplash.com/photo-1722710386521-887b9b9e88f4?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    id: 10,
    code: "431",

    name: "Action Camera",
    category: "Electronics",
    price: "$149.99",
    stock: 28,
    image:
    "https://images.unsplash.com/photo-1685615359827-aa31d97578e7?q=80&w=1122&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  // add other products...
];

export default function Product() {
    const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(productsData);
const navigation = useNavigation();

const handleSearch = (text) => {
  setSearchText(text);

  if (text === "") {
    setFilteredProducts(productsData);
  } else {
    const filtered = productsData.filter(
      (product) =>
        product.name.toLowerCase().includes(text.toLowerCase()) ||
        product.code.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
  }
};

  
  return (
    <SafeAreaView style={styles.safeContainer}>

    <View style={styles.container}>
          <StatusBar
        backgroundColor="#ffffff"
        barStyle="dark-content"
      />
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
        
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
  <FontAwesome5 name="bars" size={22} color={"#111"} />
</TouchableOpacity>

          <Text style={styles.headerTitle}>Products</Text>
          <View style={{ width: 24 }} />
        </View>

        {/* Search */}
        <View style={styles.searchWrapper}>
          <FontAwesome5
            name="search"
            size={24}
            color="#888"
            style={styles.searchIcon}
          />
           <TextInput
        placeholder="Search by name or code"
        placeholderTextColor={"#888"}
        style={styles.searchInput}
        value={searchText}
        onChangeText={handleSearch}
      />
        </View>

     
      </View>

      {/* Product List */}
    <ScrollView style={styles.productList}>
        {filteredProducts.map((product) => (
          <TouchableOpacity key={product.id} style={styles.productCard}>
            <Image
              source={{ uri: product.image }}
              style={styles.productImage}
            />
            <View style={styles.productInfo}>
              <Text style={styles.productName}>
                {product.name} 
              </Text>
              <Text style={styles.productCategory}>{product.category}</Text>
            </View>
         
            <View style={styles.rightSection}>
  <View style={styles.productPriceWrapper}>
    <Text style={styles.productPrice}>{product.price}</Text>
    <Text style={styles.productStock}>{product.stock} in stock</Text>
  </View>

  <Menu>
    <MenuTrigger>
      <FontAwesome5
        name="ellipsis-v"
        size={18}
        color="#111"
        style={{ paddingHorizontal: 10, left:10 }}
      />
    </MenuTrigger>

    <MenuOptions customStyles={{ optionsContainer: styles.menuOptions }}>
      <MenuOption onSelect={() => alert("Edit " + product.name)}>
        <View style={styles.menuItem}>
          <FontAwesome5 name="edit" size={16} color="blue" />
          <Text style={styles.menuTextBlue}>Edit</Text>
        </View>
      </MenuOption>

      <MenuOption onSelect={() => alert("Delete " + product.name)}>
        <View style={styles.menuItem}>
          <FontAwesome5 name="trash-alt" size={16} color="red" />
          <Text style={styles.menuTextRed}>Delete</Text>
        </View>
      </MenuOption>
    </MenuOptions>
  </Menu>
</View>

          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Footer Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.addButton}  >
          <FontAwesome5 name="plus" size={22} color="#fff" />
          <Text style={styles.addButtonText}>Add New Product</Text>
        </TouchableOpacity>
      </View>
    </View>
    </SafeAreaView>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f6f7f8",
  },
  safeContainer: {
    flex: 1,
  },
  header: {
    // padding: 16,
    backgroundColor: "rgba(246,247,248,0.95)",
    backdropFilter: "blur(10px)",
  },

  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#111",
  },

  searchWrapper: {
    marginTop: 12,
    position: "relative",
  },
  searchIcon: {
    position: "absolute",
    left: 12,
    top: 12,
  },
  searchInput: {
    backgroundColor: "rgba(246,247,248,0.5)",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 12,
    color: "#111",
    borderWidth: 1, // <- adds border
    borderColor: "#000", // <- black border
  },

  filterScroll: {
    marginTop: 12,
  },
  filterButton: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 999,
    backgroundColor: "rgba(17,147,212,0.1)",
  },

  filterText: {
    color: "#1193d4",
    fontWeight: "500",
    marginRight: 4,
  },

  productList: {
    flex: 1,
  },
  productCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#d6d6d6",
  },

  productImage: {
    width: 64,
    height: 64,
    borderRadius: 12,
  },
  productInfo: {
    flex: 1,
    marginLeft: 16,
  },
  productName: {
    fontWeight: "600",
    color: "#111",
  },

  productCategory: {
    color: "#555",
  },

  productPriceWrapper: {
    alignItems: "flex-end",
  },
  productPrice: {
    fontWeight: "bold",
    color: "#111",
  },
  productStock: {
    color: "#555",
    fontSize: 12,
  },
  footer: {
    // padding: 16,
    backgroundColor: "rgba(246,247,248,0.95)",
  },

  addButton: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    backgroundColor: "#1193d4",
    paddingVertical: 14,
    borderRadius: 14,
  },
  addButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  rightSection: {
  flexDirection: "row",
  alignItems: "center",
},

menuOptions: {
  padding: 4,
  borderRadius: 10,
},

menuItem: {
  flexDirection: "row",
  alignItems: "center",
  padding: 10,
},

menuTextBlue: {
  marginLeft: 8,
  color: "blue",
  fontSize: 16,
},

menuTextRed: {
  marginLeft: 8,
  color: "red",
  fontSize: 16,
},

});
