import { FlatList, Text, View } from "react-native";
import { lazy, useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Header } from "../components/ExplorerHeader";
import Search from "../components/ExplorerSearch";
import { Image } from "expo-image";
import { species } from "../../utils/lib";
import { Specie } from "../../models/data";

const Book: React.FC = () => {
  const { id } = useLocalSearchParams();
  const family = species[Number(id)];
  const [modal, setModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setVisibleItems(viewableItems.map((item: any) => item.index));
  }).current;

  const renderItem = ({ item, index }: { item: Specie; index: number }) => {
    const isVisible = visibleItems.includes(index);
    if (item.images[0].url === "") {
      return null;
    }

    return (
      <View
        key={index}
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
          padding: 16,
          margin: 8,
          borderRadius: 12,
          backgroundColor: "#FFE0D4",
        }}
      >
        {isVisible ? (
          <Image
            source={{ uri: item.images[0].url }}
            style={{
              width: "100%",
              aspectRatio: 1,
              marginBottom: 8,
              borderRadius: 12,
            }}
            contentFit="cover"
            cachePolicy={"memory-disk"}
          />
        ) : (
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              marginBottom: 8,
              borderRadius: 12,
              backgroundColor: "#e5e7eb",
            }}
          />
        )}
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1f2937" }}>
          {item?.scientific_name}
        </Text>
        <Text style={{ fontSize: 16, fontWeight: "bold", color: "#1f2937" }}>
          {item?.common_name}
        </Text>
      </View>
    );
  };

  return (
    <View className="flex flex-col w-full p-4 bg-black">
      <Header title={family.name} state={modal} setModal={setModal} />
      <View className="flex max-h-screen pb-20">
        <FlatList
          data={family.species}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={renderItem}
          ref={flatListRef}
          contentContainerStyle={{ paddingBottom: 80 }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 1,
          }}
        />
        {modal && (
          <Search
            setModal={setModal}
            family={family}
            scrollToItem={(index) => {
              flatListRef.current?.scrollToIndex({ index, animated: true });
            }}
          />
        )}
      </View>
    </View>
  );
};

export default Book;
