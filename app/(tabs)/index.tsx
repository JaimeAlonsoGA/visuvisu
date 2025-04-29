import { Text, TouchableOpacity, View } from "react-native";
import { species } from "../../assets/species/species";
import { Link, router } from "expo-router";

const Explorer = () => {
    return (
        <View style={{ flex: 1 }} >
            <View className="grid grid-cols-2 gap-4">
                {Object.keys(species).map((family, index) => (
                    <View className="grid grid-cols-2 gap-4">
                        <Link
                            key={index}
                            className="flex items-center justify-center p-4 border rounded-lg"
                            href={{
                                pathname: '/details/[id]',
                                params: { id: 'bacon' },
                            }}>
                            <Text>{family}</Text>
                        </Link>
                        {/* <TouchableOpacity
                            key={index}
                            className="flex items-center justify-center p-4 border rounded-lg"
                            onPress={() => router.push(`/book/${family}`)}
                        >
                            <Text>{family}</Text>
                        </TouchableOpacity> */}
                    </View>
                ))}
            </View>
        </View>
    );
};

export default Explorer;