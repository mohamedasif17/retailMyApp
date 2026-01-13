// import { createDrawerNavigator } from "@react-navigation/drawer";
// import React from "react";

// import ProductStackNavigator from "../navigation/ProductStackNavigator";
// import ClosePosScreen from "../screens/ClosePos";
// import CustomerList from "../screens/CustomerList";
// import Dashboard from "../screens/Dashboard";
// import ExpenseList from "../screens/Expenses";
// import POS from "../screens/PosScreen";
// import PurchaseScreen from "../screens/PurchaseList";
// import ReportScreen from "../screens/Report";
// import SaleList from "../screens/saleList";
// import Setting from "../screens/Settings";

// import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
// const Drawer = createDrawerNavigator();

// export default function DrawerNavigator() {
//   return (
//     <Drawer.Navigator
//       screenOptions={{
//         headerShown: false,
//         drawerActiveTintColor: "#1193d4",
//         drawerInactiveTintColor: "#555",

//         // 👇 MENU TEXT STYLE
//         drawerLabelStyle: {
//           fontSize: 15, // change size
//           fontWeight: "700", // boldness
//           fontFamily: "sans-serif",
//         },
//         drawerStyle: { width: 250 }

//       }}
      
//     >
//   <Drawer.Screen
//   name="Products"
//   component={ProductStackNavigator}
//   options={{
//     drawerIcon: () => (
//       <FontAwesome5 name="box-open" size={22} color={"blue"} />
//     ),
//   }}
// />
//       <Drawer.Screen
//         name="Sales"
//         component={SaleList}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Report"
//         component={ReportScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Expense"
//         component={ExpenseList}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Purchase"
//         component={PurchaseScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Customer"
//         component={CustomerList}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Dashboard"
//         component={Dashboard}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="Settings"
//         component={Setting}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="POS"
//         component={POS}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
//       <Drawer.Screen
//         name="ClosePos"
//         component={ClosePosScreen}
//         options={{
//           drawerIcon: ({ color, size }) => (
//             <FontAwesome5 name="cash-register" size={22} color={"green"} />
//           ),
//         }}
//       />
   
//     </Drawer.Navigator>
//   );
// }
import { createDrawerNavigator } from "@react-navigation/drawer";
import React from "react";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

/* SCREENS */
import ClosePosScreen from "../screens/ClosePos";
import CustomerList from "../screens/CustomerList";
import Dashboard from "../screens/Dashboard";
import POS from "../screens/PosScreen";
import Product from "../screens/product";
import PurchaseScreen from "../screens/PurchaseList";
import ReportScreen from "../screens/Report";
import SaleList from "../screens/saleList";
import Setting from "../screens/Settings";

const Drawer = createDrawerNavigator();

export default function DrawerNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        headerShown: false,
        drawerLabelStyle: {
          fontSize: 15,
          fontWeight: "700",
        },
        drawerStyle: { width: 250 },
      }}
    >
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
        name="Sales"
        component={SaleList}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="cash-register" size={20} color="green" />
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
        name="Dashboard"
        component={Dashboard}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="chart-line" size={20} color="blue" />
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
        name="Reports"
        component={ReportScreen}
        options={{
          drawerIcon: () => (
            <FontAwesome5 name="file-alt" size={20} color="teal" />
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
  );
}
