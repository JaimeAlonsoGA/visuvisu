import { FontAwesome } from "@expo/vector-icons"
import { router } from "expo-router"
import { Pressable, Text, View } from "react-native"
import { Family } from "../../assets/species/species"

const ExamHeader: React.FC<{ state: boolean, setModal: (state: boolean) => void, loading: boolean }> = ({ state, setModal, loading }) => {
    const icon = state ? "close" : "filter"

    return (
        <View className="flex flex-row items-center justify-between p-2">
            <Pressable onPress={() => router.back()} className="flex items-center justify-center p-2">
                <FontAwesome name="long-arrow-left" size={20} />
            </Pressable>
            <Text className="font-bold text-xl">Visu!</Text>
            <Pressable
                onPress={() => setModal(!state)}
                className="p-2 rounded-full bg-gray-200">
                <FontAwesome name={icon} size={20} />
            </Pressable>
        </View>
    )
}

export default ExamHeader;