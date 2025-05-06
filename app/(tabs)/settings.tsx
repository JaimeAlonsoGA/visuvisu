import { Text, View } from "react-native";
import SettingsHeader from "../components/SettingsHeader";
import { Image } from "expo-image";

const Settings = () => {
  return (
    <View
      style={{ flex: 1 }}
      className="flex flex-col w-full p-4 bg-black border"
    >
      <SettingsHeader />
      <View className="flex h-full max-h-screen pb-20 justify-center items-center">
        <Text className="text-white text-lg text-center">
          En desarrollo...
        </Text>
      </View>
    </View>
  );
};

export default Settings;
