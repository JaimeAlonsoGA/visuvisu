import { ImageBackground } from "expo-image";
import { Link } from "expo-router";
import { useMemo } from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { InfoHeader } from "../../components/explorer/ExplorerHeader";
import { classes, imageSource } from "../../lib/species";

export default function Explorer() {
  // A random cover per class, picked once per mount so it doesn't change on every render.
  const covers = useMemo(
    () =>
      Object.fromEntries(
        classes.map((c) => [c.id, c.species[Math.floor(Math.random() * c.species.length)]?.images[0]?.url])
      ),
    []
  );

  return (
    <View className="flex-1 bg-black">
      <FlatList
        data={classes}
        keyExtractor={(item) => String(item.id)}
        numColumns={2}
        ListHeaderComponent={InfoHeader}
        contentContainerStyle={{ paddingHorizontal: 8, paddingBottom: 16 }}
        renderItem={({ item }) => (
          <Link href={{ pathname: "/explorer/[id]", params: { id: item.id } }} asChild>
            <Pressable
              className="flex-1 m-2 h-[150px] rounded-xl overflow-hidden active:opacity-80"
              style={{ backgroundColor: "#d1d5db" }}
              accessibilityRole="link"
              accessibilityLabel={`${item.name}, ${item.species.length} especies`}
            >
              <ImageBackground
                source={covers[item.id] ? imageSource(covers[item.id]) : undefined}
                transition={300}
                cachePolicy="memory-disk"
                contentFit="cover"
                style={{ flex: 1 }}
              >
                <View className="absolute left-0 top-0 rounded-br-lg px-2 py-1 bg-black/80">
                  <Text className="text-white font-bold">{item.name}</Text>
                </View>
                <View className="absolute right-0 bottom-0 rounded-tl-lg px-2 py-0.5 bg-black/60">
                  <Text className="text-white text-xs">{item.species.length}</Text>
                </View>
              </ImageBackground>
            </Pressable>
          </Link>
        )}
      />
    </View>
  );
}
