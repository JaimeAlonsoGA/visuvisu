import { Tabs, useFocusEffect, useNavigation } from "expo-router";
import {
  FontAwesome,
  MaterialIcons,
} from "@expo/vector-icons";
import { BackHandler, Platform } from "react-native";
import { useCallback } from "react";

export default function TabLayout() {
  const navigation = useNavigation();

  useFocusEffect(
    useCallback(() => {
      const onAndroidBackPress = () => {
        if (navigation.canGoBack()) {
          navigation.goBack();
          return true;
        }
        return false;
      };

      if (Platform.OS === "android") {
        BackHandler.addEventListener("hardwareBackPress", onAndroidBackPress);
        return () => {
          BackHandler.removeEventListener(
            "hardwareBackPress",
            onAndroidBackPress
          );
        };
      }
    }, [navigation])
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: "#BA8355", borderTopWidth: 0},
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: "#EFE3E3",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explorador",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wpexplorer" size={size} color={color} />
          ),
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          title: "Visu",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="pets" size={size} color={color} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="biotech" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
