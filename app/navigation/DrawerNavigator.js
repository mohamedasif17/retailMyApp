import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";

import ClosePosScreen from "../screens/ClosePos";
import CustomerList from "../screens/CustomerList";
import Dashboard from "../screens/Dashboard";
import ExpenseList from "../screens/Expenses";
import POS from "../screens/PosScreen";
import Product from "../screens/product";
import PurchaseScreen from "../screens/PurchaseList";
import ReportScreen from "../screens/Report";
import SaleList from "../screens/saleList";
import Setting from "../screens/Settings";

import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerActiveTintColor: "#1193d4",
        drawerInactiveTintColor: "#555",

        // 👇 MENU TEXT STYLE
        drawerLabelStyle: {
          fontSize: 15, // change size
          fontWeight: "700", // boldness
          fontFamily: "sans-serif",
        },
        drawerStyle: { width: 250 }

      }}
      
    >
      <Drawer.Screen
        name="Products"
        component={Product}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="box-open" size={22} color={"blue"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Sales"
        component={SaleList}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Report"
        component={ReportScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Expense"
        component={ExpenseList}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Purchase"
        component={PurchaseScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Customer"
        component={CustomerList}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="Settings"
        component={Setting}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="POS"
        component={POS}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
      <Drawer.Screen
        name="ClosePos"
        component={ClosePosScreen}
        options={{
          drawerIcon: ({ color, size }) => (
            <FontAwesome5 name="cash-register" size={22} color={"green"} />
          ),
        }}
      />
   
    </Drawer.Navigator>
  );
}
