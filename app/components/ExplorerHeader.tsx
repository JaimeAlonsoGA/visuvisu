import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import { ActivityIndicator, Image, Text, TouchableOpacity, View } from "react-native";

export const Header: React.FC<{
  title: string;
  setModal: (state: boolean) => void;
  state: boolean;
}> = ({ title, state, setModal }) => {
  const icon: { icon: 'close' | 'binoculars' | 'filter'; size: number }
    = state ? { icon: "close", size: 20 } : { icon: "filter", size: 18 };

  return (
    <View className="flex flex-row items-center justify-between p-2">
      <TouchableOpacity
        onPress={() => router.back()}
        className={`flex items-center justify-center p-2 ${state && "hidden"}`}
      >
        <FontAwesome name="home" size={20} color={"white"} />
      </TouchableOpacity>
      <Text className="font-bold text-xl">{title}</Text>
      <TouchableOpacity onPress={() => setModal(!state)}>
        <FontAwesome name={icon.icon} size={icon.size} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export const InfoHeader: React.FC<{
  loading?: boolean;
}> = ({ loading }) => {
  // const [phrase, setPhrase] = useState<string>("");
  // const phrases = [
  //   "¡Buena suerte!",
  //   "Examinando visus anteriores...",
  //   "Aplicando reglas memotécnicas...",
  //   "Recopilando información...",
  //   "Explorando nombres comunes...",
  // ]
  // useEffect(() => {
  //   setTimeout(() => {
  //     setPhrase(phrases[Math.floor(Math.random() * phrases.length)]);
  //   }
  //     , 2000);
  // }, [phrases, setPhrase]);

  return (
    <View className="flex flex-row items-center justify-between p-4">
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 50, height: 50 }}
        className="rounded-full"
      />
      <View className="flex flex-col gap-2 items-end">
        <Text className="text-white">Bienvenido al visu</Text>
        <Text className="text-white text-xs">Version 1.0.0</Text>
      </View>
    </View>
  );
};
