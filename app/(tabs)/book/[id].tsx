import { FlatList, Image, Text, View } from "react-native";
import { getSpeciesImage, SpeciesInfo } from "../../../functions/getImages";
import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { species } from "../../../assets/species/species";

const Book: React.FC = () => {
    const [speciesData, setSpeciesData] = useState<SpeciesInfo[]>([]);
    const { id } = useLocalSearchParams();

    useEffect(() => {
        const fetchSpeciesData = async () => {
            const data = await Promise.all(
                Object.keys(species[id as string]).map(async (specie) => {
                    return await getSpeciesImage(specie);
                })
            );
            setSpeciesData(data);
        };

        fetchSpeciesData();
    }, [id]);

    const renderItem = ({ item }: { item: SpeciesInfo }) => (
        <View className="flex-1 items-center justify-center p-4 m-2 border border-gray-300 rounded-lg bg-white">
            {item.imageUrl ? (
                <Image
                    source={{ uri: item.imageUrl }}
                    className="w-24 h-24 mb-2 rounded-lg"
                />
            ) : (
                <Text className="text-gray-500">No Image</Text>
            )}
            <Text className="text-lg font-bold text-gray-800">{item.common}</Text>
        </View>
    );

    return (
        <View className="flex-1 p-4 bg-gray-100">
            <FlatList
                data={speciesData}
                keyExtractor={(item, index) => index.toString()}
                renderItem={renderItem}
                numColumns={2}
                columnWrapperStyle={{ justifyContent: "space-between" }}
            />
        </View>
    );
};

export default Book;