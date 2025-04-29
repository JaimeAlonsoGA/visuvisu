import axios from "axios";

export interface SpeciesInfo {
  common: string;
  imageUrl: string;
}

export async function getSpeciesImage(species: string): Promise<SpeciesInfo> {
  try {
    // Buscar la página de Wikipedia en español para la especie
    const searchResponse = await axios.get(
      "https://es.wikipedia.org/w/api.php",
      {
        params: {
          action: "query",
          list: "search",
          srsearch: species,
          format: "json",
          origin: "*",
        },
      }
    );

    const searchResults = searchResponse.data.query.search;
    if (searchResults.length === 0) {
      throw new Error(`No se encontró la página de Wikipedia para ${species}`);
    }

    const pageTitle = searchResults[0].title;

    // Obtener la imagen principal de la página
    const imageResponse = await axios.get(
      "https://es.wikipedia.org/w/api.php",
      {
        params: {
          action: "query",
          titles: pageTitle,
          prop: "pageimages",
          format: "json",
          pithumbsize: 1000,
          origin: "*",
        },
      }
    );

    const pages = imageResponse.data.query.pages;
    const page = pages[Object.keys(pages)[0]];
    const imageUrl = page?.thumbnail?.source || "";

    // Obtener el nombre común desde Wikidata
    const wikidataResponse = await axios.get(
      "https://es.wikipedia.org/w/api.php",
      {
        params: {
          action: "query",
          titles: pageTitle,
          prop: "pageprops",
          format: "json",
          origin: "*",
        },
      }
    );

    const wikidataPages = wikidataResponse.data.query.pages;
    const wikidataPage = wikidataPages[Object.keys(wikidataPages)[0]];
    const wikidataId = wikidataPage?.pageprops?.wikibase_item;

    let commonName = "";
    if (wikidataId) {
      const wikidataEntityResponse = await axios.get(
        `https://www.wikidata.org/wiki/Special:EntityData/${wikidataId}.json`
      );
      const entities = wikidataEntityResponse.data.entities;
      const entity = entities[wikidataId];
      const labels = entity?.labels;
      commonName = labels?.es?.value || "";
    }

    return {
      common: commonName,
      imageUrl: imageUrl,
    };
  } catch (error) {
    console.error(`Error al obtener datos para ${species}:`, error);
    return {
      common: "",
      imageUrl: "",
    };
  }
}
