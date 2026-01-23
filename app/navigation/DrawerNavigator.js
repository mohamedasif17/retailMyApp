
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
} from "@react-navigation/drawer";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

/* SCREENS */
import { SafeAreaView } from "react-native-safe-area-context";
import ClosePosScreen from "../screens/ClosePos";
import CustomerList from "../screens/CustomerList";
import Dashboard from "../screens/Dashboard";
import Expenses from "../screens/Expenses";
import POS from "../screens/PosScreen";
import Product from "../screens/product";
import PurchaseScreen from "../screens/PurchaseList";
import ReportScreen from "../screens/Report";
import SaleList from "../screens/saleList";
import Setting from "../screens/Settings";

const Drawer = createDrawerNavigator();

/* 🔹 CUSTOM DRAWER WITH LOGOUT */
function CustomDrawerContent(props) {
  return (
    <View style={{ flex: 1 }}>
      {/* MENU ITEMS */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* LOGOUT BUTTON (BOTTOM FIXED) */}
      <View
        style={{
          padding: 16,
          borderTopWidth: 1,
          borderColor: "#eee",
        }}
      >
        <TouchableOpacity
          style={{ flexDirection: "row", alignItems: "center" }}
          onPress={() => {
            console.log("Logout pressed");
            // navigation.reset({ index: 0, routes: [{ name: "Login" }] })
          }}
        >
          <FontAwesome5 name="sign-out-alt" size={18} color="red" />
          <Text
            style={{
              marginLeft: 12,
              fontSize: 15,
              fontWeight: "700",
              color: "red",
            }}
          >
            Logout
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default function DrawerNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }} >

    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        headerShown: false,
        drawerStyle: { width: 250 },
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "700",
        },
      }}
    >
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="chart-line" size={20} color="blue" />
          ),
        }}
      />

      <Drawer.Screen
        name="Products"
        component={Product}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="box-open" size={20} color="#1193d4" />
          ),
        }}
      />

      <Drawer.Screen
        name="POS"
        component={POS}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color="red" />
          ),
        }}
      />

      <Drawer.Screen
        name="Close POS"
        component={ClosePosScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="lock" size={20} color="black" />
          ),
        }}
      />

      <Drawer.Screen
        name="Sales"
        component={SaleList}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color="green" />
          ),
        }}
      />

      <Drawer.Screen
        name="Reports"
        component={ReportScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="file-alt" size={20} color="teal" />
          ),
        }}
      />

      <Drawer.Screen
        name="Expenses"
        component={Expenses}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="wallet" size={20} color="teal" />
          ),
        }}
      />

      <Drawer.Screen
        name="Purchase"
        component={PurchaseScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="shopping-cart" size={20} color="orange" />
          ),
        }}
      />

      <Drawer.Screen
        name="Customer"
        component={CustomerList}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="users" size={20} color="purple" />
          ),
        }}
      />

      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="cog" size={20} color="gray" />
          ),
        }}
      />
    </Drawer.Navigator>
    </SafeAreaView>

  );
}
