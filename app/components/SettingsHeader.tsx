import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

const SettingsHeader = () => {
  return (
    <View className="flex flex-row items-center justify-between p-2">
      {/* <TouchableOpacity
        onPress={() => router.back()}
        className="flex items-center justify-center p-2"
      >
        <FontAwesome name="home" size={20} color={"white"} />
      </TouchableOpacity> */}
      <Text className="font-bold text-2xl text-white text-center w-full">Ajustes</Text>
    </View>
  );
};

export default SettingsHeader;