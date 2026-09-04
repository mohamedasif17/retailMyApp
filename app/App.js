import React from "react";
import { StatusBar } from "react-native";
import "react-native-gesture-handler";
import Toast from "react-native-toast-message";

import {
  NavigationContainer,
  NavigationIndependentTree,
} from "@react-navigation/native";
import { MenuProvider } from "react-native-popup-menu";

import AppStackNavigator from "./navigation/AppStackNavigator";

const App = () => {
  return (
    <MenuProvider>
      <StatusBar barStyle="light-content" backgroundColor="black" />

      <NavigationIndependentTree>
        <NavigationContainer>

          <AppStackNavigator />
        </NavigationContainer>
            <Toast />
      </NavigationIndependentTree>
    </MenuProvider>
  );
};

export default App;
