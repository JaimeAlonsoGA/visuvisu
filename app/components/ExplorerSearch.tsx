import React from "react";
import { ScrollView, Text, TouchableOpacity, View } from "react-native"
import { Family } from "../../assets/species/species";

const Search: React.FC<{ setModal: (status: boolean) => void, family: Family, scrollToItem: (index: number) => void }> = ({ setModal, family, scrollToItem }) => {
    return (
        <View className="flex w-full h-full">
            <Text className="text-2xl font-bold">Buscador de especies</Text>
            <ScrollView
                contentContainerStyle={{ justifyContent: "center" }}
                className="h-full flex flex-col rounded-lg shadow-lg bg-gray-100">
                {family.species.map((specie, index) => (
                    <TouchableOpacity
                        onPress={() => {
                            scrollToItem(index);
                            setModal(false);
                        }}
                        key={index} className="flex items-center justify-center p-2 m-2 border border-gray-300 rounded-lg bg-white">
                        <Text className="text-lg italic text-gray-800">{specie.name}</Text>
                        <Text className="text-xs font-bold text-gray-800">{specie.commonName}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    )
}

export default Search;