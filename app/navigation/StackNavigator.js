import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AddNewProduct from "../screens/addNewProductScreen";
import ProductScreen from "../screens/product";

const Stack = createNativeStackNavigator();

export default function ProductStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="Product"
        component={ProductScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="AddNewProduct"
        component={AddNewProduct}
        options={{ title: "Add New Product" }}
      />
    </Stack.Navigator>
  );
}
