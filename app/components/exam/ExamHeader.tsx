import { FontAwesome } from "@expo/vector-icons";
import { router } from "expo-router";
import {
  Pressable,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from "react-native";

const ExamHeader: React.FC<{
  state: boolean;
  setModal: (state: boolean) => void;
  loading: boolean;
}> = ({ state, setModal, loading }) => {
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
      <Text className="font-bold text-xl">Visu!</Text>
      <TouchableOpacity onPress={() => setModal(!state)}>
        <FontAwesome name={icon.icon} size={icon.size} color={"white"} />
      </TouchableOpacity>
    </View>
  );
};

export default ExamHeader;
