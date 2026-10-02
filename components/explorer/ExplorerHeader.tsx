import Constants from "expo-constants";
import { Image, Text, View } from "react-native";
import { totalSpecies } from "../../lib/species";

export function InfoHeader() {
  return (
    <View className="flex-row items-center justify-between p-4">
      <Image
        source={require("../../assets/icon.png")}
        style={{ width: 50, height: 50, borderRadius: 25 }}
        accessibilityIgnoresInvertColors
      />
      <View className="items-end gap-1">
        <Text className="text-white font-bold">Bienvenido al visu</Text>
        <Text className="text-white/70 text-xs">
          {totalSpecies} especies · v{Constants.expoConfig?.version ?? "?"}
        </Text>
      </View>
    </View>
  );
}
