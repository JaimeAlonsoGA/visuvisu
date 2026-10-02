import { FontAwesome } from "@expo/vector-icons";
import { ComponentProps, ReactNode } from "react";
import { Pressable, Text, View } from "react-native";

type IconName = ComponentProps<typeof FontAwesome>["name"];

export function HeaderButton({
  icon,
  label,
  onPress,
}: {
  icon: IconName;
  label: string;
  onPress: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      hitSlop={12}
      accessibilityRole="button"
      accessibilityLabel={label}
      className="w-10 h-10 items-center justify-center"
    >
      <FontAwesome name={icon} size={20} color="white" />
    </Pressable>
  );
}

/** Title bar with optional left/right actions; empty slots keep the title centred. */
export default function ScreenHeader({
  title,
  left,
  right,
}: {
  title: string;
  left?: ReactNode;
  right?: ReactNode;
}) {
  return (
    <View className="flex-row items-center justify-between px-2 py-2">
      <View className="w-10">{left}</View>
      <Text className="flex-1 text-center font-bold text-xl text-white" numberOfLines={1} accessibilityRole="header">
        {title}
      </Text>
      <View className="w-10 items-end">{right}</View>
    </View>
  );
}
