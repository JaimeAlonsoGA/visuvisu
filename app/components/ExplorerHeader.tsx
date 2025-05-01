import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native";
import { SpeciesInfo } from "../../functions/getImage";
import { useEffect, useState } from "react";

export const Header: React.FC<{
  title: string;
  setModal: (state: boolean) => void;
  state: boolean;
  loading: boolean;
}> = ({ title, state, setModal, loading }) => {
  const icon = state ? "close" : "binoculars";
  return (
    <View className="flex flex-row items-center justify-between p-2">
      <Pressable
        onPress={() => router.back()}
        className="flex items-center justify-center p-2"
      >
        <FontAwesome name="long-arrow-left" size={20} />
      </Pressable>
      <Text className="font-bold text-xl">{title}</Text>
      <Pressable
        onPress={() => setModal(!state)}
        className="p-2 rounded-full bg-gray-200"
      >
        {loading ? (
          <ActivityIndicator />
        ) : (
          <FontAwesome name={icon} size={18} />
        )}
      </Pressable>
    </View>
  );
};

export const InfoHeader: React.FC<{
  loading: boolean;
  images: Map<string, SpeciesInfo>;
}> = ({ loading, images }) => {
  const [loadedSpecie, setLoadedSpecie] = useState<string>("");
  useEffect(() => {
    const imageArray = Array.from(images.values());
    if (imageArray.length > 0) {
      setLoadedSpecie(imageArray[imageArray.length - 1]?.name || "");
    }
  }, [images]);

  return (
    <View className="flex flex-row items-center justify-between p-4">
      {loading ? (
        <Text className="text-white/80">{loadedSpecie}...</Text>
      ) : (
        <Text className="font-bold text-2xl text-center w-full text-white">
          Visu? Visu!
        </Text>
      )}
      <View className="p-2 rounded-full">
        {loading && <ActivityIndicator />}
      </View>
    </View>
  );
};
