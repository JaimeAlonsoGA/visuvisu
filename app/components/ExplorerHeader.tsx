import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { ActivityIndicator, Text, TouchableOpacity, View } from "react-native";

export const Header: React.FC<{
  title: string;
  setModal: (state: boolean) => void;
  state: boolean;
}> = ({ title, state, setModal }) => {
  const icon = state ? "close" : "binoculars";
  return (
    <View className="flex flex-row items-center justify-between p-2">
      <TouchableOpacity
        onPress={() => router.back()}
        className="flex items-center justify-center p-2"
      >
        <FontAwesome name="home" size={20} color={"white"} />
      </TouchableOpacity>
      <Text className="font-bold text-xl">{title}</Text>
      <TouchableOpacity onPress={() => setModal(!state)}>
        <FontAwesome name={icon} size={18} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export const InfoHeader: React.FC<{
  loading?: boolean;
}> = ({ loading }) => {
  return (
    <View className="flex flex-row items-center justify-between p-4">
      {loading ? (
        <Text className="text-white/80">Cargando...</Text>
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
