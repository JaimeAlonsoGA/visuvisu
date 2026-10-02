import { router, useLocalSearchParams } from "expo-router";
import { useCallback, useDeferredValue, useMemo, useRef, useState } from "react";
import { FlatList, Text, TextInput, useWindowDimensions, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageViewer from "../../components/ImageViewer";
import ScreenHeader, { HeaderButton } from "../../components/ScreenHeader";
import SpeciesIndex from "../../components/explorer/ExplorerSearch";
import SpeciesCard from "../../components/explorer/SpeciesCard";
import { getClass } from "../../lib/species";
import { colors } from "../../lib/theme";
import type { Specie, SpeciesImage } from "../../lib/types";

const normalize = (s: string) =>
  s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

// Screen padding (16) + card margin (8) + card padding (16), on both sides.
const CARD_CHROME = 80;

export default function ClassScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const family = getClass(Number(id));
  const insets = useSafeAreaInsets();
  const { width } = useWindowDimensions();
  const listRef = useRef<FlatList<Specie>>(null);

  const [showIndex, setShowIndex] = useState(false);
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const [viewer, setViewer] = useState<{ image: SpeciesImage; caption: string } | null>(null);

  const filtered = useMemo(() => {
    if (!family) return [];
    const q = normalize(deferredQuery.trim());
    if (!q) return family.species;
    return family.species.filter(
      (s) => normalize(s.scientific_name).includes(q) || normalize(s.common_name).includes(q)
    );
  }, [family, deferredQuery]);

  const openImage = useCallback((image: SpeciesImage, caption: string) => setViewer({ image, caption }), []);
  const closeImage = useCallback(() => setViewer(null), []);

  const goBack = () => (router.canGoBack() ? router.back() : router.replace("/"));

  if (!family) {
    return (
      <View className="flex-1 bg-black items-center justify-center p-4" style={{ paddingTop: insets.top }}>
        <Text className="text-white text-lg mb-4">Esta categoría no existe.</Text>
        <HeaderButton icon="home" label="Volver al inicio" onPress={() => router.replace("/")} />
      </View>
    );
  }

  return (
    <View className="flex-1 bg-black px-4" style={{ paddingTop: insets.top }}>
      <ScreenHeader
        title={family.name}
        left={<HeaderButton icon="chevron-left" label="Volver" onPress={goBack} />}
        right={
          <HeaderButton
            icon={showIndex ? "close" : "list-ul"}
            label={showIndex ? "Cerrar índice" : "Índice de especies"}
            onPress={() => setShowIndex((v) => !v)}
          />
        }
      />
      <TextInput
        value={query}
        onChangeText={setQuery}
        placeholder="Buscar por nombre científico o común"
        placeholderTextColor="#888"
        autoCorrect={false}
        autoCapitalize="none"
        clearButtonMode="while-editing"
        returnKeyType="search"
        accessibilityLabel="Buscar especie"
        style={{ backgroundColor: colors.card }}
        className="w-full px-3 py-2 mb-3 rounded-lg text-gray-800"
      />

      {showIndex ? (
        <View className="flex-1" style={{ marginBottom: insets.bottom + 8 }}>
          <SpeciesIndex
            species={filtered}
            onSelect={(index) => {
              setShowIndex(false);
              // Let the list mount again before scrolling.
              requestAnimationFrame(() => listRef.current?.scrollToIndex({ index, animated: false }));
            }}
          />
        </View>
      ) : (
        <FlatList
          ref={listRef}
          data={filtered}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <SpeciesCard item={item} width={width - CARD_CHROME} onOpenImage={openImage} />
          )}
          keyboardDismissMode="on-drag"
          keyboardShouldPersistTaps="handled"
          initialNumToRender={3}
          maxToRenderPerBatch={4}
          windowSize={7}
          removeClippedSubviews
          contentContainerStyle={{ paddingBottom: insets.bottom + 24 }}
          ListEmptyComponent={
            <Text className="text-center text-white/70 mt-8">No hay especies que coincidan con «{query}».</Text>
          }
          onScrollToIndexFailed={({ index, averageItemLength }) => {
            // Items have variable height: jump close, then retry once they are measured.
            listRef.current?.scrollToOffset({ offset: averageItemLength * index, animated: false });
            setTimeout(() => listRef.current?.scrollToIndex({ index, animated: false }), 100);
          }}
        />
      )}

      <ImageViewer image={viewer?.image ?? null} caption={viewer?.caption} onClose={closeImage} />
    </View>
  );
}
