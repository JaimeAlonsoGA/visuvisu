import React, { useState } from "react";
import {
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Specie } from "../../../models/data";

const Search: React.FC<{
  setModal: (status: boolean) => void;
  species: Specie[];
  scrollToItem: (index: number) => void;
}> = ({ setModal, species, scrollToItem }) => {

  return (
    <View className="flex w-full h-full">
      <FlatList
        data={species}
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
