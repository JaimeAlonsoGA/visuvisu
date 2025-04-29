import { ScrollView, TouchableOpacity } from "react-native"
import { Text } from "react-native"
import { View } from "react-native"
import { Family, species } from "../../assets/species/species"

const ExamFilters: React.FC<{ setFamilies: (fam: Family[]) => void, families: Family[] }> = ({ setFamilies, families }) => {
    return (
        <View className="flex w-full h-full">
            <Text className="text-2xl font-bold">Filtrar</Text>
            <ScrollView
                contentContainerStyle={{ justifyContent: "center" }}
                className="h-full flex flex-col rounded-lg shadow-lg bg-gray-100"
            >
                {species.map((family, index) => (
                    <TouchableOpacity
                        className="flex items-center justify-center p-3 m-2 border border-gray-300 rounded-lg bg-white"
                        onPress={() => {
                            if (families.includes(family)) {
                                setFamilies(families.filter((f: Family) => f.id !== family.id))
                            }
                            else {
                                setFamilies([...families, family])
                            }
                        }}
                        key={index} >
                        <Text
                            className={`${families.includes(family) ? "text-blue-500" : ""}`}>
                            {family.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View >
    )
}

export default ExamFilters;