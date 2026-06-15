import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { Ionicons } from "@expo/vector-icons";

import HomeScreen from "./screens/HomeScreen";
import ManageMenuScreen from "./screens/ManageMenuScreen";
import GuestFilterScreen from "./screens/GuestFilterScreen";

import { MenuProvider } from "../MenuContext";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <MenuProvider>
  <NavigationContainer>
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
      />

      <Tab.Screen
        name="Manage"
        component={ManageMenuScreen}
      />

      <Tab.Screen
        name="Filter"
        component={GuestFilterScreen}
      />
    </Tab.Navigator>
  </NavigationContainer>
</MenuProvider>
  );
}