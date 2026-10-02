import { FontAwesome } from "@expo/vector-icons";
import { Image } from "expo-image";
import { router } from "expo-router";
import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FlatList, LayoutChangeEvent, Pressable, Text, View, ViewToken } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import ImageViewer from "../../components/ImageViewer";
import ScreenHeader, { HeaderButton } from "../../components/ScreenHeader";
import ExamFilters from "../../components/exam/ExamFilters";
import { imageSource, shuffle, speciesIn } from "../../lib/species";
import { useSettings } from "../../lib/settings";
import type { Specie, SpeciesImage } from "../../lib/types";

interface Card {
  key: string;
  specie: Specie;
  image: SpeciesImage;
}

const toCards = (species: Specie[], round: number): Card[] =>
  shuffle(species).map((specie) => ({
    key: `${round}-${specie.id}`,
    specie,
    image: specie.images[Math.floor(Math.random() * specie.images.length)],
  }));

const VIEWABILITY = { itemVisiblePercentThreshold: 60 };

const ExamCard = memo(function ExamCard({
  card,
  height,
  revealed,
  showCommonName,
  onToggle,
  onZoom,
}: {
  card: Card;
  height: number;
  revealed: boolean;
  showCommonName: boolean;
  onToggle: (key: string) => void;
  onZoom: (card: Card) => void;
}) {
  const { specie, image } = card;
  return (
    <Pressable
      onPress={() => onToggle(card.key)}
      style={{ height }}
      className="justify-center px-4"
      accessibilityRole="button"
      accessibilityHint={revealed ? "Oculta el nombre" : "Muestra el nombre de la especie"}
    >
      <View className="w-full aspect-square rounded-xl overflow-hidden bg-neutral-900">
        <Image
          source={imageSource(image.url)}
          style={{ width: "100%", height: "100%" }}
          contentFit="cover"
          cachePolicy="memory-disk"
          recyclingKey={card.key}
          transition={200}
          accessibilityLabel={revealed ? specie.scientific_name : "Especie por identificar"}
        />
        <Pressable
          onPress={() => onZoom(card)}
          hitSlop={8}
          className="absolute right-2 top-2 w-10 h-10 rounded-full bg-black/50 items-center justify-center"
          accessibilityRole="button"
          accessibilityLabel="Ampliar imagen"
        >
          <FontAwesome name="search-plus" size={18} color="white" />
        </Pressable>
      </View>
      <View className="items-center mt-4 min-h-[72px]">
        {revealed ? (
          <Text className="text-2xl text-white italic text-center">{specie.scientific_name}</Text>
        ) : (
          <Text className="text-base text-white/50">Toca para ver la respuesta</Text>
        )}
        {(revealed || showCommonName) && specie.common_name ? (
          <Text className="text-lg text-white/80 text-center mt-1">{specie.common_name}</Text>
        ) : null}
      </View>
    </Pressable>
  );
});

export default function Exam() {
  const insets = useSafeAreaInsets();
  const { settings, update } = useSettings();
  const pool = useMemo(() => speciesIn(settings.examClasses), [settings.examClasses]);

  const [cards, setCards] = useState<Card[]>(() => toCards(pool, 0));
  const [revealed, setRevealed] = useState<Set<string>>(new Set());
  const [position, setPosition] = useState(0);
  const [pageHeight, setPageHeight] = useState(0);
  const [showFilters, setShowFilters] = useState(false);
  const [zoomed, setZoomed] = useState<Card | null>(null);
  const listRef = useRef<FlatList<Card>>(null);
  const round = useRef(0);

  // New filters → new deck from the top.
  const firstRender = useRef(true);
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }
    round.current += 1;
    setCards(toCards(pool, round.current));
    setRevealed(new Set());
    setPosition(0);
    listRef.current?.scrollToOffset({ offset: 0, animated: false });
  }, [pool]);

  // Every species is shown once per round; a fresh shuffle is appended when the deck runs low.
  const loadMore = useCallback(() => {
    round.current += 1;
    const next = toCards(pool, round.current);
    setCards((prev) => {
      // Avoid showing the same species twice in a row across the round boundary.
      const last = prev[prev.length - 1];
      const repeats = next.length > 1 && last && next[0].specie.id === last.specie.id;
      return [...prev, ...(repeats ? [...next.slice(1), next[0]] : next)];
    });
  }, [pool]);

  const toggle = useCallback((key: string) => {
    setRevealed((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  }, []);

  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems[0]?.index != null) setPosition(viewableItems[0].index);
  }, []);

  const onLayout = (e: LayoutChangeEvent) => {
    const h = Math.round(e.nativeEvent.layout.height);
    if (h !== pageHeight) setPageHeight(h);
  };

  const roundSize = pool.length;
  const progress = roundSize ? (position % roundSize) + 1 : 0;

  return (
    <View className="flex-1 bg-black" style={{ paddingBottom: insets.bottom }}>
      <View className="px-2">
        <ScreenHeader
          title="Visu!"
          left={<HeaderButton icon="home" label="Volver al explorador" onPress={() => router.navigate("/")} />}
          right={
            <HeaderButton
              icon={showFilters ? "close" : "filter"}
              label={showFilters ? "Cerrar filtros" : "Elegir categorías"}
              onPress={() => setShowFilters((v) => !v)}
            />
          }
        />
        {!showFilters && (
          <Text className="text-center text-white/60 text-xs mb-1">
            {progress} / {roundSize}
          </Text>
        )}
      </View>

      {showFilters ? (
        <View className="flex-1 p-4">
          <ExamFilters selected={settings.examClasses} onChange={(examClasses) => update({ examClasses })} />
        </View>
      ) : (
        <View className="flex-1" onLayout={onLayout}>
          {pageHeight > 0 && (
            <FlatList
              ref={listRef}
              data={cards}
              keyExtractor={(c) => c.key}
              renderItem={({ item }) => (
                <ExamCard
                  card={item}
                  height={pageHeight}
                  revealed={revealed.has(item.key)}
                  showCommonName={settings.showCommonName}
                  onToggle={toggle}
                  onZoom={setZoomed}
                />
              )}
              getItemLayout={(_, index) => ({ length: pageHeight, offset: pageHeight * index, index })}
              pagingEnabled
              decelerationRate="fast"
              showsVerticalScrollIndicator={false}
              onEndReached={loadMore}
              onEndReachedThreshold={3}
              onViewableItemsChanged={onViewableItemsChanged}
              viewabilityConfig={VIEWABILITY}
              initialNumToRender={2}
              maxToRenderPerBatch={3}
              windowSize={5}
            />
          )}
        </View>
      )}

      <ImageViewer
        image={zoomed?.image ?? null}
        caption={zoomed && revealed.has(zoomed.key) ? zoomed.specie.scientific_name : undefined}
        onClose={() => setZoomed(null)}
      />
    </View>
  );
}
