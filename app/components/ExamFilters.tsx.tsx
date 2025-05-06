import { FlatList, ScrollView, TouchableOpacity } from "react-native";
import { Text } from "react-native";
import { View } from "react-native";
import { Class } from "../../models/data";
import { species } from "../../utils/lib";

const ExamFilters: React.FC<{
  setFamilies: (fam: Class[]) => void;
  families: Class[];
}> = ({ setFamilies, families }) => {
  return (
    <View className="flex w-full h-full">
      <FlatList
        data={species}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        columnWrapperStyle={{
          justifyContent: "space-evenly",
          marginBottom: 16,
        }}
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: "center",
        }}
        className="h-full flex flex-col rounded-lg shadow-lg bg-white/20"
        renderItem={({ item: family }) => (
          <TouchableOpacity
            className="flex-1 items-center justify-center p-3 m-2 border border-gray-300 rounded-lg bg-white"
            onPress={() => {
              if (families.includes(family)) {
                setFamilies(families.filter((f: Class) => f.id !== family.id));
              } else {
                setFamilies([...families, family]);
              }
            }}
          >
            <Text
              className={`text-xl ${
                families.includes(family) ? "text-blue-800/80 font-bold" : "text-black/60 line-through"
              }`}
            >
              {family.name}
            </Text>
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default ExamFilters;
