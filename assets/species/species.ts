export interface Family {
  id: number;
  name: string;
  species: {
    name: string;
    commonName: string;
  }[];
}

export const species = [
  {
    id: 0,
    name: "Plantas",
    species: [
      { name: "Graellsia isabellae", commonName: "Mariposa isabelina" },
      { name: "Noctua pronuba", commonName: "Gusano gris" },
      { name: "Lasiocampa quercus", commonName: "Mariposa del roble" },
      { name: "Saturnia pyri", commonName: "Gran pavón nocturno" },
      { name: "Acherontia atropos", commonName: "Esfinge de la calavera" },
      { name: "Macroglossum stellatarum", commonName: "Mariposa colibrí" },
      { name: "Colias crocea", commonName: "Colias común" },
      { name: "Gonepteryx rhamni", commonName: "Limonera" },
      { name: "Pieris rapae", commonName: "Blanquita de la col" },
      { name: "Tipula maxima", commonName: "Mosquito gigante" },
      { name: "Lucilia caesar", commonName: "Mosca verde" },
      { name: "Calliphora vomitoria", commonName: "Mosca de la botella azul" },
      { name: "Scolia flavifrons", commonName: "Avispa de alas azules" },
      { name: "Formica rufa", commonName: "Hormiga roja de la madera" },
      { name: "Vespula vulgaris", commonName: "Avispa común" },
      { name: "Xylocopa violacea", commonName: "Abejorro carpintero" },
      { name: "Bombus lucorum", commonName: "Abejorro blanco" },
      { name: "Cicindela campestris", commonName: "Escarabajo tigre verde" },
      { name: "Lucanus cervus", commonName: "Ciervo volante" },
      { name: "Dorcus parallelipipedus", commonName: "Ciervo volante menor" },
      { name: "Geotrupes stercorarius", commonName: "Escarabajo estercolero" },
      { name: "Copris lunaris", commonName: "" },
      { name: "Oryctes nasicornis", commonName: "Escarabajo rinoceronte europeo" },
      { name: "Cetonia aurata", commonName: "Escarabajo de las rosas" },
      { name: "Melolontha melolontha", commonName: "Escarabajo de mayo" },
    ]
  },
  {
    id: 1,
    name: "Minerales",
    species: [],
  },
  {
    id: 2,
    name: "Artrópodos",
    species: [],
  },
  {
    id: 3,
    name: "Equinodermos",
    species: [],
  },
  {
    id: 4,
    name: "Fósiles",
    species: [],
  },
  {
    id: 5,
    name: "Mamíferos",
    species: [],
  },
  {
    id: 6,
    name: "Peces",
    species: [],
  },
  {
    id: 7,
    name: "Insectos",
    species: [],
  },
  {
    id: 8,
    name: "Aves",
    species: [
      {
        "name": "Bubulcus ibis",
        "commonName": "Garcilla Bueyera"
      },
      {
        "name": "Ciconia ciconia",
        "commonName": "Cigüeña Común"
      },
      {
        "name": "Anas platyrhynchos",
        "commonName": "Ánade Real"
      },
      {
        "name": "Anas clypeata",
        "commonName": "Pato Cuchara"
      },
      {
        "name": "Falco tinnunculus",
        "commonName": "Cernícalo Vulgar"
      },
      {
        "name": "Falco peregrinus",
        "commonName": "Halcón Peregrino"
      },
      {
        "name": "Alectoris rufa",
        "commonName": "Perdiz Común"
      },
      {
        "name": "Himantopus himantopus",
        "commonName": "Cigüeñuela"
      },
      {
        "name": "Larus ridibundus",
        "commonName": "Gaviota Reidora"
      },
      {
        "name": "Streptopelia turtur",
        "commonName": "Tórtola Común"
      },
      {
        "name": "Cuculus canorus",
        "commonName": "Cuco"
      },
      {
        "name": "Tyto alba",
        "commonName": "Lechuza Común"
      },
      {
        "name": "Athene noctua",
        "commonName": "Mochuelo"
      },
      {
        "name": "Alcedo atthis",
        "commonName": "Martín Pescador"
      },
      {
        "name": "Upupa epops",
        "commonName": "Abubilla"
      },
      {
        "name": "Picus viridis",
        "commonName": "Pito Real"
      },
      {
        "name": "Dendrocopos major",
        "commonName": "Pico Picapinos"
      }
    ],
  },
  {
    id: 9,
    name: "Moluscos",
    species: [],
  },
  {
    id: 10,
    name: "Anfibios",
    species: [],
  },
  {
    id: 11,
    name: "Reptiles",
    species: [],
  },
  {
    id: 12,
    name: "Rocas",
    species: [],
  },
];
