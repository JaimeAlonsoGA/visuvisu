import {
  Dimensions,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ExamHeader from "../components/ExamHeader";
import { Family, species } from "../../assets/species/species";
import { useEffect, useRef, useState } from "react";
import { fetchImageFromAPI, SpeciesInfo } from "../../functions/getImage";
import ExamFilters from "../components/ExamFilters.tsx";

const getRandomSpecies = (families: Family[], count: number) => {
  const allSpecies = families.flatMap((family) =>
    family.species.map((specie) => ({
      name: specie.name,
      commonName: specie.commonName,
      imageUrl: specie.imageUrl,
    }))
  );
  const shuffled = allSpecies.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

const Exam = () => {
  const [families, setFamilies] = useState<Family[]>(species);
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
    fetchInitialImages();
  }, []);

  useEffect(() => {
    setSpeciesData([]);
    setRandomSpecies(getRandomSpecies(families, 10));
    loadMoreSpecies();
  }, [families]);

  const fetchInitialImages = async () => {
    const initialData = await Promise.all(
      randomSpecies.map((specie) => {
        if (specie.imageUrl) return specie as SpeciesInfo;
        return fetchImageFromAPI(specie.name, specie.commonName);
      })
    );
    setSpeciesData(initialData);
  };

  const loadMoreSpecies = async () => {
    if (loading) return;
    setLoading(true);

    const moreSpecies = getRandomSpecies(families, 10);
    setRandomSpecies((prev) => [...prev, ...moreSpecies]);

    const moreSpeciesData = await Promise.all(
      moreSpecies.map((specie) => {
        if (specie.imageUrl) return specie as SpeciesInfo;
        return fetchImageFromAPI(specie.name, specie.commonName);
      })
    );

    setSpeciesData((prev) => [...prev, ...moreSpeciesData]);
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

  // const handleImagePress = (index: number) => {
  //     setSelectedIndex((prevIndex) => (prevIndex === index ? null : index));
  // };

  return (
    <View className="flex flex-col w-full p-4">
      <ExamHeader state={modal} setModal={setModal} loading={loading} />
      <View className="flex max-h-screen pb-20">
        <FlatList
          ref={flatListRef}
          data={speciesData}
          keyExtractor={(item, index) => `${item.name}-${index}`}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => handleDoubleTap(index)}
              className="h-[500px] rounded-lg"
              style={{
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "white",
                padding: 16,
              }}
            >
              {item.imageUrl ? (
                <Image
                  source={{ uri: item.imageUrl }}
                  className="w-full h-max mb-2 rounded-lg aspect-square"
                  resizeMode="cover"
                />
              ) : (
                <Text className="text-gray-500">Cargando imagen...</Text>
              )}
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
                  }}
                >
                  <Text className="text-2xl font-bold text-gray-800">
                    {item.name}
                  </Text>
                  <Text className="text-lg text-gray-600">
                    {item.commonName}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
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
