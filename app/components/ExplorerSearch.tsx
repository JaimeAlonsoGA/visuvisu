import React, { useState } from "react";
import {
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Class } from "../../models/data";

const Search: React.FC<{
  setModal: (status: boolean) => void;
  family: Class;
  scrollToItem: (index: number) => void;
}> = ({ setModal, family, scrollToItem }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filteredSpecies, setFilteredSpecies] = useState(family.species);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    const filtered = family.species.filter(
      (specie) =>
        specie.common_name.toLowerCase().includes(query.toLowerCase()) ||
        specie.scientific_name.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSpecies(filtered);
  };

  return (
    <View className="flex w-full h-full">
      <TextInput
        value={searchQuery}
        onChangeText={handleSearch}
        placeholder="Buscar por nombre o nombre común"
        placeholderTextColor="#888"
        style={{
          backgroundColor: "#FFE0D4",
        }}
        className="w-full p-2 mb-4 border border-gray-300 rounded-lg text-gray-800"
      />
      <FlatList
        data={filteredSpecies}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <TouchableOpacity
            onPress={() => {
              scrollToItem(index);
              setModal(false);
            }}
            className="flex items-center justify-center p-2 m-2 rounded-lg"
            style={{
              backgroundColor: "#FFE0D4",
            }}
          >
            <Text className="text-lg italic text-gray-800">{item.scientific_name}</Text>
            <Text className="text-xs font-bold text-gray-800">
              {item.common_name}
            </Text>
          </TouchableOpacity>
        )}
        contentContainerStyle={{ justifyContent: "center" }}
        className="h-full flex flex-col rounded-lg shadow-lg"
        style={{
          backgroundColor: "#BA8355",
        }}
      />

    </View>
  );
};

export default Search;
