import { FontAwesome } from "@expo/vector-icons";
import { Link, router } from "expo-router";
import { ActivityIndicator, Pressable, Text, View } from "react-native"

const Header: React.FC<{ title: string, setModal: (state: boolean) => void, state: boolean, loading: boolean }> = ({ title, state, setModal, loading }) => {
    const icon = state ? "close" : "binoculars"
    return (
        <View className="flex flex-row items-center justify-between p-2">
            <Pressable onPress={() => router.back()} className="flex items-center justify-center p-2">
                <FontAwesome name="long-arrow-left" size={20} />
            </Pressable>
            <Text className="font-bold text-xl">{title}</Text>
            <Pressable onPress={() => setModal(!state)} className="p-2 rounded-full bg-gray-200">
                {loading
                    ? <ActivityIndicator />
                    : <FontAwesome name={icon} size={18} />}
            </Pressable>
        </View>
    )
}

export default Header;