import { FlatList, Pressable, Text, View } from "react-native";
import { classes, speciesIn } from "../../lib/species";
import { colors } from "../../lib/theme";

/** Lets the user choose which classes the exam draws from. At least one stays selected. */
export default function ExamFilters({
  selected,
  onChange,
}: {
  selected: number[];
  onChange: (ids: number[]) => void;
}) {
  const allSelected = selected.length === classes.length;

  const toggle = (id: number) => {
    if (selected.includes(id)) {
      if (selected.length > 1) onChange(selected.filter((x) => x !== id));
    } else {
      onChange([...selected, id]);
    }
  };

  return (
    <View className="flex-1 rounded-lg" style={{ backgroundColor: colors.accent }}>
      <View className="flex-row items-center justify-between px-4 pt-3">
        <Text className="text-white font-bold">{speciesIn(selected).length} especies en el examen</Text>
        <Pressable
          onPress={() => onChange(allSelected ? [classes[0].id] : classes.map((c) => c.id))}
          hitSlop={8}
          accessibilityRole="button"
        >
          <Text className="text-white underline">{allSelected ? "Ninguno" : "Todos"}</Text>
        </Pressable>
      </View>
      <FlatList
        data={classes}
        keyExtractor={(c) => String(c.id)}
        numColumns={2}
        contentContainerStyle={{ padding: 8 }}
        renderItem={({ item }) => {
          const on = selected.includes(item.id);
          return (
            <Pressable
              onPress={() => toggle(item.id)}
              className="flex-1 items-center justify-center p-3 m-1 rounded-lg active:opacity-70"
              style={{ backgroundColor: colors.card, opacity: on ? 1 : 0.6 }}
              accessibilityRole="checkbox"
              accessibilityState={{ checked: on }}
            >
              <Text
                className={`text-base text-center ${on ? "text-blue-900 font-bold" : "text-black/50 line-through"}`}
              >
                {item.name}
              </Text>
              <Text className="text-xs text-black/50">{item.species.length}</Text>
            </Pressable>
          );
        }}
      />
    </View>
  );
}
