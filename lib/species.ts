import type { Class, Specie } from "./types";
import data from "../assets/species/data.json";

// Species without any image are useless in a visual exam, so drop them once here.
export const classes: Class[] = (data as Class[]).map((c) => ({
  ...c,
  species: c.species.filter((s) => s.images.length > 0 && s.images[0].url !== ""),
}));

export const classIds = classes.map((c) => c.id);

export const getClass = (id: number): Class | undefined => classes.find((c) => c.id === id);

export const speciesIn = (ids: number[]): Specie[] =>
  classes.filter((c) => ids.includes(c.id)).flatMap((c) => c.species);

export const totalSpecies = classes.reduce((n, c) => n + c.species.length, 0);

// Fisher–Yates; Array.sort(() => Math.random() - 0.5) is biased.
export function shuffle<T>(items: readonly T[]): T[] {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
}

// Wikimedia blocks requests without a descriptive User-Agent.
const IMAGE_HEADERS = { "User-Agent": "VisuApp/1.0 (https://github.com/JaimeAlonsoGA/visuvisu)" };

export const imageSource = (url: string) => ({ uri: url, headers: IMAGE_HEADERS });

export const attribution = (img: { autor: string; license?: string }) =>
  [img.autor, img.license].filter(Boolean).join(" · ");
