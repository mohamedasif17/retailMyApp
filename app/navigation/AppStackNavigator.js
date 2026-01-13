import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";

/* DRAWER */
import DrawerNavigator from "./DrawerNavigator";

/* PRODUCT */
import AddNewProduct from "../screens/addNewProductScreen";
import AddPurchase from "../screens/addPurchasecreen";
import Product from "../screens/product";
import saleViewScreen from "../screens/saleViewScreen";

/* SALES */
import SaleList from "../screens/saleList";

/* PURCHASE */
import PurchaseScreen from "../screens/PurchaseList";

/* CUSTOMER */
import CustomerList from "../screens/CustomerList";

/* POS */
import ClosePosScreen from "../screens/ClosePos";
import POS from "../screens/PosScreen";

/* OTHER */
import Dashboard from "../screens/Dashboard";
import ExpenseList from "../screens/Expenses";
import ReportScreen from "../screens/Report";
import Setting from "../screens/Settings";

const Stack = createNativeStackNavigator();

export default function AppStackNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      
      {/* MAIN APP (DRAWER) */}
      <Stack.Screen name="Drawer" component={DrawerNavigator} />

      {/* PRODUCT FLOW */}
      <Stack.Screen name="Product" component={Product} />
      <Stack.Screen name="AddNewProduct" component={AddNewProduct} />
      <Stack.Screen name="saleViewScreen" component={saleViewScreen} />
      <Stack.Screen name="AddPurchase" component={AddPurchase} />

      {/* SALES FLOW */}
      <Stack.Screen name="SaleList" component={SaleList} />

      {/* PURCHASE */}
      <Stack.Screen name="Purchase" component={PurchaseScreen} />

      {/* CUSTOMER */}
      <Stack.Screen name="CustomerList" component={CustomerList} />

      {/* POS */}
      <Stack.Screen name="POS" component={POS} />
      <Stack.Screen name="ClosePos" component={ClosePosScreen} />

      {/* OTHER */}
      <Stack.Screen name="Dashboard" component={Dashboard} />
      <Stack.Screen name="ExpenseList" component={ExpenseList} />
      <Stack.Screen name="Report" component={ReportScreen} />
      <Stack.Screen name="Settings" component={Setting} />

    </Stack.Navigator>
  );
}
