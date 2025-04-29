import { FlatList, Text, View } from "react-native";
import { species } from "../../assets/species/species";
import { Link } from "expo-router";

const Explorer = () => {
    return (
        <View style={{ flex: 1 }}>
            <FlatList
                data={species}
                keyExtractor={(item) => item.id.toString()}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: 'space-evenly', marginBottom: 16 }}
                contentContainerStyle={{
                    flexGrow: 1,
                    justifyContent: "center",
                }}
                renderItem={({ item }) => (
                    <Link
                        className="flex items-center justify-center p-4 rounded-xl min-w-32 bg-gray-200"
                        href={{
                            pathname: '/explorer/[id]',
                            params: { id: item.id },
                        }}>
                        {/* <Image
                            source={{ uri: item.imageUrl }}
                            className="w-24 h-24 mb-2 rounded-lg"
                            style={{ resizeMode: 'cover' }}
                        /> */}
                        <Text className="text-center">{item.name}</Text>
                    </Link>
                )}
            />
        </View>
    );
};

export default Explorer;