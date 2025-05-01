import { Tabs, useFocusEffect, useNavigation } from "expo-router";
import {
  FontAwesome,
  Ionicons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { BackHandler, Platform } from "react-native";
import { useCallback, useEffect, useState } from "react";
import { useWiki } from "../../context/WikiContext";
import { species } from "../../assets/species/species";

export default function TabLayout() {
  const navigation = useNavigation();
  const { getImage, setGlobalLoading, imageCache, setImages } = useWiki();

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

  const fetchAllImages = async () => {
    try {
      setGlobalLoading(true);

      for (const family of species) {
        await Promise.all(
          family.species.map(async (specie) => {
            const key = `${specie.name}-${specie.commonName}`;

            // Check if the image is already in the cache
            if (imageCache[key]) {
              // Add the cached image to the images map
              setImages((prev) =>
                new Map(prev).set(specie.name, {
                  name: specie.name,
                  commonName: specie.commonName,
                  imageUrl: imageCache[key],
                })
              );
            } else {
              // Fetch the image if not in the cache
              await getImage(specie.name, specie.commonName);
            }
          })
        );
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setGlobalLoading(false); // Ensure global loading state is updated
    }
  };

  useEffect(() => {
    fetchAllImages();
  }, []);

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: { height: 60, backgroundColor: "#fff" },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Explore",
          tabBarIcon: ({ color, size }) => (
            <FontAwesome name="wpexplorer" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="exam"
        options={{
          title: "Visu",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bird" size={size} color={color} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: "Ajustes",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="settings" size={size} color={color} />
          ),
          tabBarStyle: { display: "none" },
        }}
      />
    </Tabs>
  );
}
