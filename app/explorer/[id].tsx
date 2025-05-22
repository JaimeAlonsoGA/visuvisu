import { FlatList, TextInput, View } from "react-native";
import { useRef, useState } from "react";
import { useLocalSearchParams } from "expo-router/build/hooks";
import { Header } from "../components/explorer/ExplorerHeader";
import Search from "../components/explorer/ExplorerSearch";
import { species } from "../../utils/lib";
import RenderItem from "../components/explorer/renderItem";

const Book: React.FC = () => {
  const { id } = useLocalSearchParams();
  const family = species[Number(id)];
  const [modal, setModal] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [visibleItems, setVisibleItems] = useState<number[]>([])
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

  const onViewableItemsChanged = useRef(({ viewableItems }: any) => {
    setVisibleItems(viewableItems.map((item: any) => item.index));
  }).current;


  return (
    <View className="flex flex-col w-full p-4 bg-black h-full">
      <Header title={family.name} state={modal} setModal={setModal} />
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
      <View className="flex max-h-screen pb-20">
        <FlatList
          data={filteredSpecies}
          keyExtractor={(item, index) => `${item.id}-${index}`}
          renderItem={({ item, index }) => <RenderItem item={item} index={index} visibleItems={visibleItems} />}
          ref={flatListRef}
          contentContainerStyle={{ paddingBottom: 80 }}
          onViewableItemsChanged={onViewableItemsChanged}
          viewabilityConfig={{
            itemVisiblePercentThreshold: 1,
          }}
          onScrollToIndexFailed={({ index, highestMeasuredFrameIndex, averageItemLength }) => {
            // Scroll to the last measured index as a fallback
            flatListRef.current?.scrollToIndex({
              index: highestMeasuredFrameIndex,
              animated: true,
            });
          }}
        />
        {modal && (
          <Search
            setModal={setModal}
            species={filteredSpecies}
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
