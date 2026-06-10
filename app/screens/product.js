import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

import {
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import {
  Menu,
  MenuOption,
  MenuOptions,
  MenuTrigger,
} from "react-native-popup-menu";

export default function Product() {
  const [searchText, setSearchText] = useState("");
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://10.32.64.215:8000/products");

      const data = await response.json();

      setProducts(data);
      setFilteredProducts(data);

      // console.log("Products:", data);
    } catch (error) {
      console.log("API Error:", error);
      alert(error.message);
    }
  };

  const handleSearch = (text) => {
    setSearchText(text);

    if (text === "") {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(
        (product) =>
          product.name?.toLowerCase().includes(text.toLowerCase()) ||
          product.code?.toLowerCase().includes(text.toLowerCase())
      );

      setFilteredProducts(filtered);
    }
  };

  return (
    <View style={styles.safeContainer}>
      <View style={styles.container}>
        <StatusBar backgroundColor="#ffffff" barStyle="dark-content" />
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
            <TouchableOpacity key={product._id} style={styles.productCard}>
              {/* LEFT SIDE */}
              <View style={styles.leftSection}>
                <Text style={styles.productName}>{product.name}</Text>
                <Text style={styles.productCategory}>{product.categories}</Text>
              </View>

              <View style={styles.rightSection}>
                <View style={styles.productPriceWrapper}>
                 <Text style={styles.productPrice}>
  ₹{product.offerPrice || product.sellingPrice}
</Text>
                  <Text style={styles.productStock}>
                    {product.stocks} in stock
                  </Text>
                </View>

                <Menu>
                  <MenuTrigger>
                    <FontAwesome5
                      name="ellipsis-v"
                      size={18}
                      color="#111"
                      style={{ paddingHorizontal: 10, left: 10 }}
                    />
                  </MenuTrigger>

                  <MenuOptions
                    customStyles={{ optionsContainer: styles.menuOptions }}
                  >
                    <MenuOption
                      onSelect={() => navigation.navigate("AddNewProduct")}
                    >
                      <View style={styles.menuItem}>
                        <FontAwesome5 name="edit" size={16} color="blue" />
                        <Text style={styles.menuTextBlue}>Edit</Text>
                      </View>
                    </MenuOption>

                    <MenuOption
                      onSelect={() => alert("Delete " + product.name)}
                    >
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
          <TouchableOpacity
            style={styles.addButton}
            onPress={() => navigation.navigate("AddNewProduct")}
          >
            <FontAwesome5 name="plus" size={22} color="#fff" />
            <Text style={styles.addButtonText}>Add New Product</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
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
  leftSection: {
    flex: 1,
    justifyContent: "center",
  },
});
