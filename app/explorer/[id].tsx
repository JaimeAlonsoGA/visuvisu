import { FlatList, Image, ScrollView, Text, View } from "react-native";
import { getSpeciesImage, SpeciesInfo } from "../../functions/getImages";
import { useEffect, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { species } from "../../assets/species/species";
import Header from "../components/ExplorerHeader";
import Search from "../components/ExplorerSearch";

const Book: React.FC = () => {
    const [speciesData, setSpeciesData] = useState<SpeciesInfo[]>([]);
    const scrollViewRef = useRef<ScrollView>(null);
    const itemPositions = useRef<{ [key: number]: number }>({});
    const { id } = useLocalSearchParams();
    const family = species[Number(id)];
    const [modal, setModal] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchSpeciesData = async () => {
            if (loading) return; 
            setLoading(true); 

            try {
                const data = await Promise.all(
                    family.species.map(async (specie) => {
                        const specieData = await getSpeciesImage(specie.name, specie.commonName);
                        return specieData;
                    })
                );
                setSpeciesData(data); 
            } catch (error) {
                console.error("Error fetching species data:", error); 
            } finally {
                setLoading(false); 
            }
        };

        fetchSpeciesData();
    }, [id]);

    const scrollToItem = (index: number) => {
        const position = itemPositions.current[index];
        if (position !== undefined) {
            scrollViewRef.current?.scrollTo({ y: position, animated: true });
        }
    };

    return (
        <View className="flex flex-col w-full p-4 bg-gray-100">
            <Header title={family.name} state={modal} setModal={setModal} loading={loading} />
            <View className="flex max-h-screen pb-20">
                <ScrollView
                    ref={scrollViewRef}
                    className="flex flex-col">
                    {speciesData.map((item, index) => (
                        <View
                            key={index}
                            className="flex items-center justify-center p-4 m-2 border border-gray-300 rounded-lg bg-white"
                            onLayout={(event) => {
                                const { y } = event.nativeEvent.layout;
                                itemPositions.current[index] = y;
                            }}
                        >
                            {item.imageUrl ? (
                                <Image
                                    source={{ uri: item.imageUrl }}
                                    className="w-full h-max mb-2 rounded-lg aspect-square"
                                />
                            ) : (
                                <Text className="text-gray-500">No Image</Text>
                            )}
                            <Text className="text-lg font-bold text-gray-800">{item.name}</Text>
                            <Text className="text-lg font-bold text-gray-800">{item.common}</Text>
                        </View>
                    ))}
                </ScrollView>
                {modal && <Search setModal={setModal} family={family} scrollToItem={scrollToItem} />}
            </View>
        </View>
    );
};

export default Book;