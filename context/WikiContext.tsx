import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchImageFromAPI, SpeciesInfo } from "../functions/getImage";
import { species } from "../assets/species/species";

interface WikiContextType {
  getImage: (name: string, commonName: string) => Promise<SpeciesInfo | null>;
  images: Map<string, SpeciesInfo>;
  setImages: React.Dispatch<React.SetStateAction<Map<string, SpeciesInfo>>>;
  globalLoading: boolean;
  setGlobalLoading: (loading: boolean) => void;
  setSpecieLoading: (loading: Record<string, boolean>) => void;
  specieLoading: Record<string, boolean>;
  imageCache: Record<string, string>;
}

const WikiContext = createContext<WikiContextType>({} as WikiContextType);

export const WikiProvider = ({ children }: { children: ReactNode }) => {
  const [imageCache, setImageCache] = useState<Record<string, string>>({});
  const [images, setImages] = useState<Map<string, SpeciesInfo>>(new Map());
  const [globalLoading, setGlobalLoading] = useState(false);
  const [specieLoading, setSpecieLoading] = useState<Record<string, boolean>>(
    {}
  );

  useEffect(() => {
    const loadCache = async () => {
      try {
        const cachedImages = await AsyncStorage.getItem("imageCache");
        if (cachedImages) {
          setImageCache(JSON.parse(cachedImages) as Record<string, string>);
        }
      } catch (error) {
        console.error("Error loading cache:", error);
        setImageCache({});
      }

      // Initialize specieLoading state only for visible species
      const initialLoadingState: Record<string, boolean> = {};
      species.slice(0, 20).forEach((family) => {
        // Example: Load only the first 20 species
        family.species.forEach((specie) => {
          const key = `${specie.name}-${specie.commonName}`;
          initialLoadingState[key] = false; // Default to not loading
        });
      });
      setSpecieLoading(initialLoadingState);
    };

    loadCache();
  }, []);

  const getImage = async (
    name: string,
    commonName: string
  ): Promise<SpeciesInfo | null> => {
    const key = `${name}-${commonName}`;

    // Check if the image is already in the cache
    if (imageCache[key]) {
      const cachedImage = { name, commonName, imageUrl: imageCache[key] || "" };
      setImages((prev) => new Map(prev).set(name, cachedImage));
      return cachedImage;
    }

    // Set the loading state for this species
    setSpecieLoading((prev) => ({ ...prev, [key]: true }));

    try {
      // Fetch the image from the API
      const specieData = await fetchImageFromAPI(name, commonName);
      if (specieData) {
        const updatedCache = { ...imageCache, [key]: specieData.imageUrl };
        setImageCache(updatedCache);

        // Save the updated cache to AsyncStorage
        await AsyncStorage.setItem("imageCache", JSON.stringify(updatedCache));

        // Update the images state with the loaded image
        setImages((prev) =>
          new Map(prev).set(name, {
            name,
            commonName,
            imageUrl: specieData.imageUrl,
          })
        );

        return specieData;
      }
    } catch (error) {
      console.error("Error fetching image:", error);
      setImages((prev) =>
        new Map(prev).set(name, { name, commonName, imageUrl: "" })
      ); // Set a placeholder for the failed image
    } finally {
      setSpecieLoading((prev) => ({ ...prev, [key]: false }));
    }

    return null;
  };

  return (
    <WikiContext.Provider
      value={{
        getImage,
        images,
        setImages,
        imageCache,
        globalLoading,
        setGlobalLoading,
        setSpecieLoading,
        specieLoading,
      }}
    >
      {children}
    </WikiContext.Provider>
  );
};

export const useWiki = () => {
  const context = useContext(WikiContext);
  if (!context) {
    throw new Error("useWiki must be used within a WikiProvider");
  }
  return context;
};
