import { FlatList, Text, View } from "react-native";
import { Link } from "expo-router";
import { useEffect, useState } from "react";
import { ImageBackground } from "expo-image";
import { InfoHeader } from "../components/ExplorerHeader";
import { species } from "../../utils/lib";

const Explorer = () => {
  const thumbnail = Math.floor(Math.random() * 5);
  const blurhash =
    "|rF?hV%2WCj[ayj[a|j[az_NaeWBj@ayfRayfQfQM{M|azj[azf6fQfQfQIpWXofj[ayj[j[fQayWCoeoeaya}j[ayfQa{oLj?j[WVj[ayayj[fQoff7azayj[ayj[j[ayofayayayj[fQj[ayayj[ayfjj[j[ayjuayj[";

  return (
    <View style={{ flex: 1 }} className="bg-black">
      <InfoHeader />
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
          const firstSpecies = item.species[thumbnail].images[0].url;

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
                backgroundColor: "#d1d5db",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <ImageBackground
                source={{ uri: firstSpecies }}
                placeholder={{ blurhash }}
                transition={1000}
                cachePolicy={"memory-disk"}
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
            </Link>
          );
        }}
      />
    </View>
  );
};

export default Explorer;
