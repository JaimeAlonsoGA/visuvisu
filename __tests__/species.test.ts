import data from "../assets/species/data.json";
import { classes, shuffle, speciesIn, totalSpecies } from "../lib/species";
import type { Class } from "../lib/types";

const raw = data as Class[];
const allImages = raw.flatMap((c) => c.species.flatMap((s) => s.images));

describe("species catalogue", () => {
  it("has unique class and species ids", () => {
    expect(new Set(raw.map((c) => c.id)).size).toBe(raw.length);
    const ids = raw.flatMap((c) => c.species.map((s) => s.id));
    expect(new Set(ids).size).toBe(ids.length);
  });

  it("gives every species at least one https image", () => {
    for (const c of raw) for (const s of c.species) expect(s.images.length).toBeGreaterThan(0);
    for (const img of allImages) expect(img.url).toMatch(/^https:\/\//);
  });

  it("only uses Wikimedia thumbnail widths that Wikimedia actually serves", () => {
    // Wikimedia returns HTTP 400 for non-standard thumbnail widths (e.g. 1000px, 800px).
    const widths = allImages
      .map((i) => i.url.match(/(?:upload|thumb)\.wikimedia\.org\/.*\/thumb\/.*\/(\d+)px-/)?.[1])
      .filter(Boolean);
    expect(widths.length).toBeGreaterThan(100);
    expect(new Set(widths)).toEqual(new Set(["960"]));
  });

  it("attributes every Wikimedia image", () => {
    for (const img of allImages.filter((i) => i.url.includes("wikimedia")))
      expect(img.autor.length).toBeGreaterThan(0);
  });

  it("does not list a species twice in the same class", () => {
    for (const c of raw) {
      const names = c.species.map((s) => s.scientific_name.toLowerCase());
      expect(new Set(names).size).toBe(names.length);
    }
  });

  it("exposes counts consistent with the data", () => {
    expect(totalSpecies).toBe(classes.reduce((n, c) => n + c.species.length, 0));
    expect(speciesIn([classes[0].id])).toHaveLength(classes[0].species.length);
    expect(speciesIn([])).toHaveLength(0);
  });
});

describe("shuffle", () => {
  it("returns a permutation without mutating the input", () => {
    const input = Array.from({ length: 50 }, (_, i) => i);
    const copy = [...input];
    const out = shuffle(input);
    expect(input).toEqual(copy);
    expect([...out].sort((a, b) => a - b)).toEqual(input);
  });
});
