import {
  ActivityIndicator,
  FlatList,
  Text,
  View,
} from "react-native";
import { useMemo, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { species } from "../../assets/species/species";
import { Header } from "../components/ExplorerHeader";
import Search from "../components/ExplorerSearch";
import { useWiki } from "../../context/WikiContext";
import { Image } from "expo-image";

const Book: React.FC = () => {
  const { globalLoading, images, specieLoading } = useWiki();
  const { id } = useLocalSearchParams();
  const family = species[Number(id)];
  const [modal, setModal] = useState(false);
  const imageMap = useMemo(() => {
    return new Map(Array.from(images).map(([_, image]) => [image.name, image]));
  }, [images]);
  const flatListRef = useRef<FlatList>(null);
  const familySpecies = family.species.map((specie) => {
    return imageMap.get(specie.name) || { ...specie, imageUrl: null };
  });

  const renderItem = ({ item, index }: { item: any; index: number }) => {
    const key = `${item?.name}-${item?.commonName}`;
    const isLoading = specieLoading[key];

    return (
      <View
        key={index}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          margin: 8,
          borderWidth: 1,
          borderColor: "#d1d5db", // Tailwind's border-gray-300
          borderRadius: 12,
          backgroundColor: "white",
        }}
      >
        {isLoading ? (
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              marginBottom: 8,
              borderRadius: 12,
              backgroundColor: "#f3f4f6", // Tailwind's bg-gray-200
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ActivityIndicator size="small" color="#0000ff" />
          </View>
        ) : item?.imageUrl ? (
          <Image
            source={{ uri: item.imageUrl }}
            style={{
              width: "100%",
              aspectRatio: 1,
              marginBottom: 8,
              borderRadius: 12,
            }}
          />
        ) : (
          <Text style={{ color: "#6b7280" }}>No Image</Text> // Tailwind's text-gray-500
        )}
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1f2937" }}>
          {item?.name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1f2937" }}>
          {item?.commonName}
        </Text>
      </View>
    );
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#f3f4f6" }}>
      <Header
        title={family.name}
        state={modal}
        setModal={setModal}
        loading={globalLoading}
      />
      <FlatList
        data={familySpecies}
        keyExtractor={(item, index) => `${item.name}-${index}`}
        renderItem={renderItem}
        ref={flatListRef}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      {modal && (
        <Search
          setModal={setModal}
          family={family}
          scrollToItem={(index) => {
            // FlatList has a built-in scrollToIndex method
            flatListRef.current?.scrollToIndex({ index, animated: true });
          }}
        />
      )}
    </View>
  );
};

export default Book;
