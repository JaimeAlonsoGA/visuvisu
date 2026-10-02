import { Image } from "expo-image";
import { memo, useCallback, useState } from "react";
import { FlatList, Pressable, Text, View, ViewToken } from "react-native";
import { imageSource } from "../../lib/species";
import { colors } from "../../lib/theme";
import type { Specie, SpeciesImage } from "../../lib/types";

const VIEWABILITY = { itemVisiblePercentThreshold: 50 };

function SpeciesCard({
  item,
  width,
  onOpenImage,
}: {
  item: Specie;
  /** Width available for the image inside the card. */
  width: number;
  onOpenImage: (image: SpeciesImage, caption: string) => void;
}) {
  const [current, setCurrent] = useState(0);
  const onViewableItemsChanged = useCallback(({ viewableItems }: { viewableItems: ViewToken[] }) => {
    if (viewableItems.length > 0) setCurrent(viewableItems[0].index ?? 0);
  }, []);

  const renderImage = (img: SpeciesImage) => (
    <Pressable
      onPress={() => onOpenImage(img, item.scientific_name)}
      accessibilityRole="imagebutton"
      accessibilityLabel={`Ampliar imagen de ${item.scientific_name}`}
    >
      <Image
        source={imageSource(img.url)}
        style={{ width, height: width, borderRadius: 12, backgroundColor: colors.placeholder }}
        contentFit="contain"
        cachePolicy="memory-disk"
        recyclingKey={img.url}
        transition={200}
      />
    </Pressable>
  );

  return (
    <View className="items-center p-4 m-2 rounded-xl" style={{ backgroundColor: colors.card }}>
      {item.images.length > 1 ? (
        <>
          <FlatList
            data={item.images}
            keyExtractor={(img) => img.url}
            horizontal
            pagingEnabled
            showsHorizontalScrollIndicator={false}
            style={{ width, height: width, borderRadius: 12 }}
            renderItem={({ item: img }) => renderImage(img)}
            onViewableItemsChanged={onViewableItemsChanged}
            viewabilityConfig={VIEWABILITY}
          />
          <View className="flex-row justify-center mt-2" accessibilityLabel={`Imagen ${current + 1} de ${item.images.length}`}>
            {item.images.map((img, i) => (
              <View
                key={img.url}
                className="w-2 h-2 rounded-full mx-1"
                style={{ backgroundColor: i === current ? colors.textOnCard : "#d1d5db" }}
              />
            ))}
          </View>
        </>
      ) : (
        renderImage(item.images[0])
      )}
      <Text className="mt-2 text-lg font-bold italic text-center" style={{ color: colors.textOnCard }}>
        {item.scientific_name}
      </Text>
      {item.common_name ? (
        <Text className="text-sm text-center" style={{ color: colors.textOnCard }}>
          {item.common_name}
        </Text>
      ) : null}
    </View>
  );
}

export default memo(SpeciesCard);
