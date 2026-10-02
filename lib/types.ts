export interface SpeciesImage {
  url: string;
  autor: string;
  title: string;
  width: number;
  height: number;
  license?: string;
  source?: string;
}

export interface Specie {
  id: string;
  scientific_name: string;
  common_name: string;
  images: SpeciesImage[];
}

export interface Class {
  id: number;
  name: string;
  species: Specie[];
}
