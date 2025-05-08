import {
  Dimensions,
  FlatList,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExamHeader from "../components/ExamHeader";
import { useEffect, useRef, useState } from "react";
import { fetchImageFromAPI, SpeciesInfo } from "../../functions/getImage";
import ExamFilters from "../components/ExamFilters.tsx";
import { Class } from "../../models/data";
import { species } from "../../utils/lib";
import { Image } from "expo-image";

const getRandomSpecies = (families: Class[], count: number) => {
  const allSpecies = families.flatMap((family) =>
    family.species.map((specie) => ({
      scientific_name: specie.scientific_name,
      common_name: specie.common_name,
      imageUrl: specie.images[0].url,
    }))
  );
  const shuffled = allSpecies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Exam = () => {
  const [families, setFamilies] = useState<Class[]>(species);
  const [randomSpecies, setRandomSpecies] = useState(() =>
    getRandomSpecies(families, 10)
  );
  const [speciesData, setSpeciesData] = useState<SpeciesInfo[]>([]);
  const [loading, setLoading] = useState(false);
  const flatListRef = useRef<FlatList>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const lastTap = useRef<number | null>(null);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    setSpeciesData([]);
    setRandomSpecies(getRandomSpecies(families, 10));
    loadMoreSpecies();
  }, [families]);

  const loadMoreSpecies = async () => {
    if (loading) return;
    setLoading(true);

    const moreSpecies = getRandomSpecies(families, 10);
    setRandomSpecies((prev) => [...prev, ...moreSpecies]);

    setSpeciesData((prev) => [
      ...prev,
      ...moreSpecies.map((specie) => ({
        name: specie.scientific_name,
        commonName: specie.common_name,
        imageUrl: specie.imageUrl,
      })),
    ]);
    setLoading(false);
  };

  const handleDoubleTap = (index: number) => {
    const now = Date.now();
    if (lastTap.current && now - lastTap.current < 300) {
      // Double tap detected
      setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
    } else {
      // Single tap detected, reset the timer
      lastTap.current = now;
    }
  };

  const handleImagePress = (index: number) => {
    setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  return (
    <View className="flex flex-col w-full p-4 bg-black">
      <ExamHeader state={modal} setModal={setModal} loading={loading} />
      <View className="flex max-h-screen pb-20">
        <FlatList
          ref={flatListRef}
          data={speciesData}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }) => {
            if (item.imageUrl === "") {
              return null;
            }
            return (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => handleImagePress(index)}
                className="h-[500px] rounded-lg"
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  backgroundColor: "black",
                  padding: 16,
                }}
              >
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{
                    width: "100%",
                    aspectRatio: 1,
                    marginBottom: 8,
                    borderRadius: 12,
                  }}
                  contentFit="cover"
                  cachePolicy={"memory-disk"}
                />
                {selectedIndex === index && (
                  <View
                    style={{
                      position: "absolute",
                      bottom: 10,
                      left: 20,
                      right: 20,
                      alignItems: "center",
                      padding: 10,
                      borderRadius: 10,
                      borderWidth: 1,
                      borderColor: "#BA8355",
                      borderStyle: "dashed"
                    }}
                  >
                    <Text className="text-2xl font-bold text-white">
                      {item.name}
                    </Text>
                    <Text className="text-lg text-white/80">
                      {item.commonName}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
          horizontal={false}
          snapToInterval={500}
          decelerationRate="fast"
          showsVerticalScrollIndicator={false}
          onEndReached={loadMoreSpecies}
          onEndReachedThreshold={10}
          ListFooterComponent={
            loading ? (
              <Text className="text-center text-gray-500 py-4">
                Cargando imágenes...
              </Text>
            ) : null
          }
        />
        {modal && <ExamFilters setFamilies={setFamilies} families={families} />}
      </View>
    </View>
  );
};

export default Exam;
