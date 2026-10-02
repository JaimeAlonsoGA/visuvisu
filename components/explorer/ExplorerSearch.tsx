import { FlatList, Pressable, Text } from "react-native";
import { colors } from "../../lib/theme";
import type { Specie } from "../../lib/types";

/** Alphabetical index of the visible species; tapping one jumps to it. */
export default function SpeciesIndex({
  species,
  onSelect,
}: {
  species: Specie[];
  onSelect: (index: number) => void;
}) {
  const sorted = species
    .map((s, index) => ({ s, index }))
    .sort((a, b) => a.s.scientific_name.localeCompare(b.s.scientific_name, "es"));

  return (
    <FlatList
      data={sorted}
      keyExtractor={({ s }) => s.id}
      className="flex-1 rounded-lg"
      style={{ backgroundColor: colors.accent }}
      contentContainerStyle={{ padding: 8 }}
      keyboardShouldPersistTaps="handled"
      ListEmptyComponent={<Text className="text-center text-white p-4">Sin resultados</Text>}
      renderItem={({ item: { s, index } }) => (
        <Pressable
          onPress={() => onSelect(index)}
          className="items-center p-2 m-1 rounded-lg active:opacity-70"
          style={{ backgroundColor: colors.card }}
          accessibilityRole="button"
        >
          <Text className="text-lg italic" style={{ color: colors.textOnCard }}>
            {s.scientific_name}
          </Text>
          {s.common_name ? (
            <Text className="text-xs font-bold" style={{ color: colors.textOnCard }}>
              {s.common_name}
            </Text>
          ) : null}
        </Pressable>
      )}
    />
  );
}
