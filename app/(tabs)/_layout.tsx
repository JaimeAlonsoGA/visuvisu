import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors } from "../../lib/theme";

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      backBehavior="initialRoute"
      screenOptions={{
        headerShown: false,
        sceneStyle: { backgroundColor: colors.background, paddingTop: insets.top },
        tabBarStyle: {
          height: 60 + insets.bottom,
          paddingBottom: insets.bottom,
          backgroundColor: colors.accent,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#000",
        tabBarInactiveTintColor: colors.inactive,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explorador",
          tabBarIcon: ({ color, size }) => <FontAwesome name="wpexplorer" size={size} color={color} />,
          animation: "fade",
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          title: "Visu",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="pets" size={size} color={color} />,
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => <MaterialIcons name="biotech" size={size} color={color} />,
          animation: "fade",
        }}
      />
    </Tabs>
  );
}
