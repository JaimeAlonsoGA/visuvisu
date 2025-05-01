import { FlatList, Text, View } from "react-native";
import { species } from "../../assets/species/species";
import { Link } from "expo-router";
import { InfoHeader } from "../components/ExplorerHeader";
import { useWiki } from "../../context/WikiContext";
import { useEffect, useState } from "react";
import { ImageBackground } from "expo-image";

const Explorer = () => {
  const { globalLoading, images, specieLoading } = useWiki();
  const [thumbnail, setThumbnail] = useState<number>(0);
  const blurhash =
  '|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[';


  useEffect(() => {
    setThumbnail(Math.floor(Math.random() * 5));
  }, []);
  return (
    <View style={{ flex: 1 }} className="bg-black">
      <InfoHeader loading={globalLoading} images={images} />
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
        renderItem={({ item }) => {
          const firstSpecies = item.species[thumbnail];
          const key = `${firstSpecies.name}-${firstSpecies.commonName}`;
          const isLoading = specieLoading[key];
          const imageUrl = images.get(firstSpecies.name)?.imageUrl || "";

          return (
            <Link
              href={{
                pathname: "/explorer/[id]",
                params: { id: item.id },
              }}
              style={{
                flex: 1,
                margin: 8,
                height: 150,
                borderRadius: 12,
                overflow: "hidden",
                backgroundColor: imageUrl ? "#e5e7eb" : "#d1d5db",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* {imageUrl ? ( */}
                <ImageBackground
                  source={{ uri: imageUrl }}
                  placeholder={{ blurhash }}
                  transition={1000}
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                  imageStyle={{
                    borderRadius: 12,
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "left",
                      backgroundColor: "rgba(0, 0, 0, 1)",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderBottomRightRadius: 0,
                      position: "absolute",
                      top: -5,
                      left: -5,
                    }}
                  >
                    {item.name}
                  </Text>
                </ImageBackground>
              {/* ) : (
                <View
                  style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
                  }}
                >
                  <Text
                    style={{
                      color: "white",
                      fontSize: 16,
                      fontWeight: "bold",
                      textAlign: "left",
                      backgroundColor: "rgba(0, 0, 0, 1)",
                      paddingHorizontal: 8,
                      paddingVertical: 4,
                      borderRadius: 8,
                      borderBottomRightRadius: 0,
                      position: "absolute",
                      top: -5,
                      left: -5,
                    }}
                  >
                    {item.name}
                  </Text>
                </View>
              )} */}
            </Link>
          );
        }}
      />
    </View>
  );
};

export default Explorer;
