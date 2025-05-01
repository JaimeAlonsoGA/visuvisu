export interface Family {
  id: number;
  name: string;
  species: Specie[];
}

interface Specie {
  name: string;
  commonName: string;
  imageUrl?: string;
}

export const species = [
  {
    id: 0,
    name: "Angiospermas",
    species: [
      {
        name: "Posidonia oceanica",
        commonName: "Posidonia",
      },
      {
        name: "Poa bulbosa",
        commonName: "Poa",
      },
      {
        name: "Briza maxima",
        commonName: "Briza mayor",
      },
      {
        name: "Briza media",
        commonName: "Briza media",
      },
      {
        name: "Briza minor",
        commonName: "Briza menor",
      },
      {
        name: "Avena sterilis",
        commonName: "Avena loca",
      },
      {
        name: "Bromus spp.",
        commonName: "Bromo",
      },
      {
        name: "Scirpus holoschoenus",
        commonName: "Junco",
      },
      {
        name: "Phoenix canariensis",
        commonName: "Palmera canaria",
      },
      {
        name: "Chamaerops humilis",
        commonName: "Palmito",
      },
      {
        name: "Rubia peregrina",
        commonName: "Rubia",
      },
      {
        name: "Sambucus nigra",
        commonName: "Saúco",
      },
      {
        name: "Viburnum tinus",
        commonName: "Durillo",
      },
      {
        name: "Lonicera periclymenum",
        commonName: "Madreselva común",
      },
      {
        name: "Lonicera etrusca",
        commonName: "Madreselva etrusca",
      },
      {
        name: "Lonicera implexa",
        commonName: "Madreselva mediterránea",
      },
      {
        name: "Helichrysum stoechas",
        commonName: "Siempreviva",
      },
      {
        name: "Santolina chamaecyparissus",
        commonName: "Abrótano hembra",
      },
      {
        name: "Santolina rosmarinifolia",
        commonName: "Santolina",
      },
      {
        name: "Scolymus hispanicus",
        commonName: "Cardillo",
      },
      {
        name: "Cichorium intybus",
        commonName: "Achicoria",
      },
      {
        name: "Silybum marianum",
        commonName: "Cardo mariano",
      },
      {
        name: "Anacyclus clavatus",
        commonName: "Manzanilla borde",
      },
      {
        name: "Taraxacum officinale",
        commonName: "Diente de león",
      },
      {
        name: "Calendula arvensis",
        commonName: "Caléndula silvestre",
      },
      {
        name: "Centaurea cyanus",
        commonName: "Aciano",
      },
      {
        name: "Bellis perennis",
        commonName: "Margarita común",
      },
      {
        name: "Bellis sylvestris",
        commonName: "Margarita silvestre",
      },
      {
        name: "Senecio jacobea",
        commonName: "Hierba de Santiago",
      },
      {
        name: "Senecio vulgaris",
        commonName: "Senecio común",
      },
      {
        name: "Tragopogon porrifolius",
        commonName: "Salsifí morado",
      },
      {
        name: "Andryala integrifolia",
        commonName: "Lechuguilla peluda",
      },
      {
        name: "Capsella bursa-pastoris",
        commonName: "Bolsa de pastor",
      },
      {
        name: "Cardaria draba",
        commonName: "",
      },
      {
        name: "Biscutella auriculata",
        commonName: "",
      },
      {
        name: "Biscutella valentina",
        commonName: "",
      },
      {
        name: "Sisymbrium officinale",
        commonName: "",
      },
      {
        name: "Hirschfeldia incana",
        commonName: "",
      },
      {
        name: "Diplotaxis muralis",
        commonName: "",
      },
      {
        name: "Eruca vesicaria",
        commonName: "",
      },
      {
        name: "Lunaria annua",
        commonName: "",
      },
      {
        name: "Arbutus unedo",
        commonName: "Madroño",
      },
      {
        name: "Arctostaphyllos uva-ursi",
        commonName: "Gayuba",
      },
      {
        name: "Erica arborea",
        commonName: "Brezo blanco",
      },
      {
        name: "Erica australis",
        commonName: "Brezo rubio",
      },
      {
        name: "Calluna vulgaris",
        commonName: "Brecina",
      },
      {
        name: "Vaccinium myrtillus",
        commonName: "Arándano",
      },
      {
        name: "Primula veris",
        commonName: "",
      },
      {
        name: "Primula acaulis",
        commonName: "",
      },
      {
        name: "Rosa canina",
        commonName: "Rosal silvestre",
      },
      {
        name: "Rubus ulmifolius",
        commonName: "Zarzamora",
      },
      {
        name: "Prunus spinosa",
        commonName: "Espino negro",
      },
      {
        name: "Crataegus monogyna",
        commonName: "Espino albar",
      },
      {
        name: "Sorbus aucuparia",
        commonName: "Serbal de cazadores",
      },
      {
        name: "Sorbus aria",
        commonName: "Mostajo",
      },
      {
        name: "Prunus pissardii",
        commonName: "Ciruelo japonés",
      },
      {
        name: "Prunus dulcis",
        commonName: "Almendro",
      },
      {
        name: "Prunus avium",
        commonName: "Cerezo",
      },
      {
        name: "Umbilicus rupestris",
        commonName: "Ombligo de Venus",
      },
      {
        name: "Acacia dealbata",
        commonName: "Mimosa",
      },
      {
        name: "Sophora japonica",
        commonName: "Sófora",
      },
      {
        name: "Robinia pseudoacacia",
        commonName: "Falsa acacia",
      },
      {
        name: "Gleditsia triacanthos",
        commonName: "Acacia de tres espinas",
      },
      {
        name: "Cercis siliquastrum",
        commonName: "Árbol de Judas",
      },
      {
        name: "Ceratonia siliqua",
        commonName: "Algarrobo",
      },
      {
        name: "Retama sphaerocarpa",
        commonName: "Retama",
      },
      {
        name: "Spartium junceum",
        commonName: "Retama de olor",
      },
      {
        name: "Cytisus scoparius",
        commonName: "Escoba negra",
      },
      {
        name: "Cytisus multiflorus",
        commonName: "Escoba blanca",
      },
      {
        name: "Cytinus hypocistis",
        commonName: "Jopo",
      },
      {
        name: "Evonymus europaeus",
        commonName: "Bonetero",
      },
      {
        name: "Ilex aquifolium",
        commonName: "Acebo",
      },
      {
        name: "Buxus sempervirens",
        commonName: "Boj",
      },
      {
        name: "Euphorbia characias",
        commonName: "Lechetrezna",
      },
      {
        name: "Euphorbia helioscopia",
        commonName: "Lechetrezna",
      },
      {
        name: "Ricinus communis",
        commonName: "Ricino",
      },
      {
        name: "Rhamnus alaternus",
        commonName: "Aladierno",
      },
      {
        name: "Rhamnus lycioides",
        commonName: "Espino negro",
      },
      {
        name: "Lamium amplexicaule",
        commonName: "Ortiga muerta",
      },
      {
        name: "Lamium purpureum",
        commonName: "Ortiga púrpura",
      },
      {
        name: "Lavandula stoechas",
        commonName: "Cantueso",
      },
      {
        name: "Lavandula latifolia",
        commonName: "Espliego",
      },
      {
        name: "Rosmarinus officinalis",
        commonName: "Romero",
      },
      {
        name: "Thymus vulgaris",
        commonName: "Tomillo",
      },
      {
        name: "Thymus mastichina",
        commonName: "Mejorana",
      },
      {
        name: "Marrubium vulgare",
        commonName: "Marrubio",
      },
      {
        name: "Phlomis purpurea",
        commonName: "Matagallo",
      },
      {
        name: "Phlomis lychnitis",
        commonName: "Candilera",
      },
      {
        name: "Paeonicula argentia",
        commonName: "",
      },
      {
        name: "Plantago coronopus",
        commonName: "Cuerno de ciervo",
      },
      {
        name: "Plantago lagopus",
        commonName: "Pie de liebre",
      },
      {
        name: "Plantago lanceolata",
        commonName: "Llantén menor",
      },
      {
        name: "Plantago major",
        commonName: "Llantén mayor",
      },
      {
        name: "Verbascum pulverulentum",
        commonName: "Gordolobo",
      },
      {
        name: "Verbascum thapsus",
        commonName: "Gordolobo",
      },
      {
        name: "Digitalis purpurea",
        commonName: "Digital",
      },
      {
        name: "Orobanche rapum-genistae",
        commonName: "Jopo",
      },
      {
        name: "Cytisus striatus",
        commonName: "Escoba",
      },
      {
        name: "Genista scorpius",
        commonName: "Aliaga",
      },
      {
        name: "Genista florida",
        commonName: "Retama blanca",
      },
      {
        name: "Vicia cracca",
        commonName: "Arvejana",
      },
      {
        name: "Vicia sativa",
        commonName: "Veza",
      },
      {
        name: "Medicago orbicularis",
        commonName: "Mielga",
      },
      {
        name: "Trifolium campestre",
        commonName: "Trébol amarillo",
      },
      {
        name: "Trifolium angustifolium",
        commonName: "Trébol",
      },
      {
        name: "Trifolium pratense",
        commonName: "Trébol rojo",
      },
      {
        name: "Trifolium repens",
        commonName: "Trébol blanco",
      },
      {
        name: "Lupinus angustifolius",
        commonName: "Altramuz",
      },
      {
        name: "Daphne gnidium",
        commonName: "Torvisco",
      },
      {
        name: "Myrtus communis",
        commonName: "Mirto",
      },
      {
        name: "Eucalyptus camaldulensis",
        commonName: "Eucalipto rojo",
      },
      {
        name: "Eucalyptus globulus",
        commonName: "Eucalipto común",
      },
      {
        name: "Punica granatum",
        commonName: "Granado",
      },
      {
        name: "Viscum album",
        commonName: "Muérdago",
      },
      {
        name: "Arceuthobium oxycedri",
        commonName: "Muérdago de enebro",
      },
      {
        name: "Nerium oleander",
        commonName: "Adelfa",
      },
      {
        name: "Olea europaea",
        commonName: "Olivo",
      },
      {
        name: "Phillyrea angustifolia",
        commonName: "Labiérnago",
      },
      {
        name: "Fraxinus angustifolia",
        commonName: "Fresno",
      },
      {
        name: "Fraxinus ornus",
        commonName: "Fresno florido",
      },
      {
        name: "Jasminum fruticans",
        commonName: "Jazmín silvestre",
      },
      {
        name: "Ligustrum ovalifolium",
        commonName: "Aligustre",
      },
      {
        name: "Ligustrum vulgare",
        commonName: "Aligustre común",
      },
      {
        name: "Ligustrum lucidum",
        commonName: "Aligustre japonés",
      },
      {
        name: "Convolvulus arvensis",
        commonName: "Correhuela",
      },
      {
        name: "Cuscuta epithymum",
        commonName: "Cuscuta",
      },
      {
        name: "Cuscuta europaea",
        commonName: "Cuscuta",
      },
      {
        name: "Echium vulgare",
        commonName: "Viborera",
      },
      {
        name: "Echium plantagineum",
        commonName: "Viborera",
      },
      {
        name: "Cynoglossum cheirifolium",
        commonName: "Lengua de perro",
      },
      {
        name: "Anchusa azurea",
        commonName: "Lengua de buey",
      },
      {
        name: "Heliotropium europaeum",
        commonName: "Heliotropo",
      },
      {
        name: "Lycium barbarum",
        commonName: "Cambronera",
      },
      {
        name: "Cistus ladanifer",
        commonName: "Jara pringosa",
      },
      {
        name: "Cistus laurifolius",
        commonName: "Jara de hoja de laurel",
      },
      {
        name: "Cistus populifolius",
        commonName: "Jara cervuna",
      },
      {
        name: "Cistus albidus",
        commonName: "Jara blanca",
      },
      {
        name: "Cistus salviifolius",
        commonName: "Jaguarzo morisco",
      },
      {
        name: "Tamarix gallica",
        commonName: "Taray",
      },
      {
        name: "Bryonia dioica",
        commonName: "Nueza",
      },
      {
        name: "Salix alba",
        commonName: "Sauce blanco",
      },
      {
        name: "Populus alba",
        commonName: "Álamo blanco",
      },
      {
        name: "Populus nigra",
        commonName: "Chopo",
      },
      {
        name: "Populus tremula",
        commonName: "Álamo temblón",
      },
      {
        name: "Ecballium elaterium",
        commonName: "Pepinillo del diablo",
      },
      {
        name: "Aesculus hippocastanum",
        commonName: "Castaño de Indias",
      },
      {
        name: "Acer campestre",
        commonName: "Arce menor",
      },
      {
        name: "Acer platanoides",
        commonName: "Arce real",
      },
      {
        name: "Acer pseudoplatanus",
        commonName: "Arce blanco",
      },
      {
        name: "Acer monspessulanum",
        commonName: "Arce de Montpellier",
      },
      {
        name: "Acer negundo",
        commonName: "Arce negundo",
      },
      {
        name: "Pistacia lentiscus",
        commonName: "Lentisco",
      },
      {
        name: "Pistacia terebinthus",
        commonName: "Cornicabra",
      },
      {
        name: "Ailanthus altissima",
        commonName: "Árbol del cielo",
      },
      {
        name: "Melia azedarach",
        commonName: "Cinamomo",
      },
      {
        name: "Ruta graveolens",
        commonName: "Ruda",
      },
      {
        name: "Citrus spp.",
        commonName: "Cítricos",
      },
      {
        name: "Juglans regia",
        commonName: "Nogal común",
      },
      {
        name: "Hedera helix",
        commonName: "Hiedra común",
      },
      {
        name: "Eryngium campestre",
        commonName: "Cardo corredor",
      },
      {
        name: "Foeniculum vulgare",
        commonName: "Hinojo",
      },
      {
        name: "Thapsia villosa",
        commonName: "Candileja",
      },
      {
        name: "Ferula communis",
        commonName: "Cañaheja",
      },
      {
        name: "Conium maculatum",
        commonName: "Cicuta",
      },
      {
        name: "Daucus carota",
        commonName: "Zanahoria silvestre",
      },
      {
        name: "Angelica sp.",
        commonName: "Angélica",
      },
      {
        name: "Pimpinella anisum",
        commonName: "Anís",
      },
      {
        name: "Berberis vulgaris",
        commonName: "Agracejo",
      },
      {
        name: "Mahonia aquifolium",
        commonName: "Mahonia",
      },
      {
        name: "Helleborus foetidus",
        commonName: "Eléboro fétido",
      },
      {
        name: "Helleborus viridis",
        commonName: "Eléboro verde",
      },
      {
        name: "Ranunculus ficaria",
        commonName: "Ficaria",
      },
      {
        name: "Caltha palustris",
        commonName: "Calta",
      },
      {
        name: "Papaver rhoeas",
        commonName: "Amapola",
      },
      {
        name: "Papaver hybridum",
        commonName: "Amapola híbrida",
      },
      {
        name: "Papaver somniferum",
        commonName: "Adormidera",
      },
      {
        name: "Chelidonium majus",
        commonName: "Celidonia",
      },
      {
        name: "Fumaria officinalis",
        commonName: "Fumaria",
      },
      {
        name: "Fumaria capreolata",
        commonName: "Palomilla blanca",
      },
      {
        name: "Hypecoum imberbe",
        commonName: "Pamplina",
      },
      {
        name: "Sarcocapnos enneaphylla",
        commonName: "Zapaticos de la Virgen",
      },
      {
        name: "Magnolia grandiflora",
        commonName: "Magnolia",
      },
      {
        name: "Laurus nobilis",
        commonName: "Laurel",
      },
      {
        name: "Ruscus aculeatus",
        commonName: "Rusco",
      },
      {
        name: "Asparagus officinalis",
        commonName: "Espárrago común",
      },
      {
        name: "Asparagus acutifolius",
        commonName: "Espárrago triguero",
      },
      {
        name: "Asphodelus albus",
        commonName: "Gamón blanco",
      },
      {
        name: "Smilax aspera",
        commonName: "Zarzaparrilla",
      },
      {
        name: "Tamus comunis",
        commonName: "Nueza negra",
      },
      {
        name: "Platanus orientalis var. acerifolia",
        commonName: "Plátano de sombra",
      },
      {
        name: "Liquidambar styraciflua",
        commonName: "Liquidámbar",
      },
      {
        name: "Alnus glutinosa",
        commonName: "Aliso común",
      },
      {
        name: "Carpinus betulus",
        commonName: "Carpe",
      },
      {
        name: "Betula pubescens",
        commonName: "Abedul pubescente",
      },
      {
        name: "Betula pendula",
        commonName: "Abedul común",
      },
      {
        name: "Corylus avellana",
        commonName: "Avellano",
      },
      {
        name: "Fagus sylvatica",
        commonName: "Haya",
      },
      {
        name: "Quercus ilex",
        commonName: "Encina",
      },
      {
        name: "Quercus suber",
        commonName: "Alcornoque",
      },
      {
        name: "Quercus coccifera",
        commonName: "Coscoja",
      },
      {
        name: "Quercus faginea",
        commonName: "Quejigo",
      },
      {
        name: "Quercus pyrenaica",
        commonName: "Roble melojo",
      },
      {
        name: "Quercus robur",
        commonName: "Roble común",
      },
      {
        name: "Quercus petraea",
        commonName: "Roble albar",
      },
      {
        name: "Quercus rubra",
        commonName: "Roble americano",
      },
      {
        name: "Castanea sativa",
        commonName: "Castaño",
      },
      {
        name: "Saponaria ocymoides",
        commonName: "Jabonera roja",
      },
      {
        name: "Saponaria officinalis",
        commonName: "Jabonera",
      },
      {
        name: "Spergularia rubra",
        commonName: "Hierba roja",
      },
      {
        name: "Paronychia argentea",
        commonName: "Nevadilla",
      },
      {
        name: "Arenaria spp.",
        commonName: "Arenaria",
      },
      {
        name: "Silene spp.",
        commonName: "Silene",
      },
      {
        name: "Dianthus spp.",
        commonName: "Claveles silvestres",
      },
      {
        name: "Atriplex halimus",
        commonName: "Orzaga",
      },
      {
        name: "Rumex acetosa",
        commonName: "Acedera común",
      },
      {
        name: "Rumex acetosella",
        commonName: "Acederilla",
      },
      {
        name: "Rumex crispus",
        commonName: "Acedera crespa",
      },
      {
        name: "Polygonum persicaria",
        commonName: "Persicaria",
      },
      {
        name: "Tilia platyphyllos",
        commonName: "Tilo de hoja grande",
      },
      {
        name: "Tilia cordata",
        commonName: "Tilo de hoja pequeña",
      },
      {
        name: "Hypericum perforatum",
        commonName: "Hierba de San Juan",
      },
      {
        name: "Malva sylvestris",
        commonName: "Malva silvestre",
      },
      {
        name: "Ficus carica",
        commonName: "Higuera",
      },
      {
        name: "Ulmus minor",
        commonName: "Olmo común",
      },
      {
        name: "Ulmus pumila",
        commonName: "Olmo siberiano",
      },
      {
        name: "Celtis australis",
        commonName: "Almez",
      },
      {
        name: "Parietaria judaica",
        commonName: "Parietaria judaica",
      },
      {
        name: "Urtica spp.",
        commonName: "Ortiga",
      },
    ],
  },
  {
    id: 12,
    name: "Minerales",
    species: [
      {
        name: "Fluorita",
        commonName: "",
      },
      {
        name: "Cianobrio",
        commonName: "",
      },
      {
        name: "Granate",
        commonName: "",
      },
      {
        name: "Cuarzo",
        commonName: "",
      },
      {
        name: "Pirita",
        commonName: "",
      },
      {
        name: "Goethita",
        commonName: "",
      },
      {
        name: "Galena",
        commonName: "",
      },
      {
        name: "Azurita",
        commonName: "",
      },
      {
        name: "Berilo",
        commonName: "",
      },
      {
        name: "Silvina",
        commonName: "",
      },
      {
        name: "Andalucita",
        commonName: "",
      },
      {
        name: "Casiterita",
        commonName: "",
      },
      {
        name: "Halita",
        commonName: "",
      },
      {
        name: "Jade",
        commonName: "",
      },
      {
        name: "Magnetita",
        commonName: "",
      },
      {
        name: "Turquesa",
        commonName: "",
      },
      {
        name: "Malaquita",
        commonName: "",
      },
      {
        name: "Amatista",
        commonName: "",
      },
      {
        name: "Rejalgar",
        commonName: "",
      },
      {
        name: "Aragonito",
        commonName: "",
      },
      {
        name: "Olivino",
        commonName: "",
      },
      {
        name: "Sepiolita",
        commonName: "",
      },
      {
        name: "Hematites",
        commonName: "",
      },
      {
        name: "Calcita",
        commonName: "",
      },
      {
        name: "Baritina",
        commonName: "",
      },
      {
        name: "Bauxita",
        commonName: "",
      },
      {
        name: "Blenda acaramelada",
        commonName: "",
      },
      {
        name: "Yeso rosa del desierto",
        commonName: "",
      },
      {
        name: "Yeso especular",
        commonName: "",
      },
      {
        name: "Celestina",
        commonName: "",
      },
      {
        name: "Moscovita",
        commonName: "",
      },
      {
        name: "Talco",
        commonName: "",
      },
      {
        name: "Cuarzo jacinto de Compostela",
        commonName: "",
      },
      {
        name: "Sílex",
        commonName: "",
      },
      {
        name: "Ágata",
        commonName: "",
      },
      {
        name: "Cuarzo ahumado",
        commonName: "",
      },
      {
        name: "Limonita",
        commonName: "",
      },
      {
        name: "Ortosa",
        commonName: "",
      },
      {
        name: "Jaspe",
        commonName: "",
      },
      {
        name: "Hornblenda",
        commonName: "",
      },
      {
        name: "Ópalo",
        commonName: "",
      },
      {
        name: "Cuarzo ojo de tigre",
        commonName: "",
      },
      {
        name: "Azufre nativo",
        commonName: "",
      },
      {
        name: "Estaurolita",
        commonName: "",
      },
    ],
  },
  {
    id: 2,
    name: "Artrópodos",
    species: [
      { name: "Lepas analifera", commonName: "Lepas o Bellota de mar" },
      { name: "Pollicipes cornucopia", commonName: "Percebe" },
      { name: "Balanus balanoides", commonName: "Bellota de mar común" },
      { name: "Squilla mantis", commonName: "Galera" },
      { name: "Talitrus saltator", commonName: "Pulga de playa" },
      { name: "Crangon crangon", commonName: "Camarón gris" },
      { name: "Eupagurus bernhardus", commonName: "Cangrejo ermitaño" },
      { name: "Calappa granulata", commonName: "Cangrejo boxeador" },
      { name: "Macropodia longirostris", commonName: "Cangrejo araña" },
      { name: "Maja squinado", commonName: "Centollo" },
      { name: "Cancer pagurus", commonName: "Buey de mar" },
      { name: "Buthus europaeus", commonName: "Escorpión amarillo europeo" },
      {
        name: "Drossa sp.",
        commonName: "Ácaro (no tiene nombre común específico)",
      },
      { name: "Julius terrestris", commonName: "Milpiés común" },
      { name: "Scolopendra morsitans", commonName: "Escolopendra" },
      { name: "Palaemon elegans", commonName: "Camarón elegante" },
      { name: "Palinurus elephas", commonName: "Langosta europea" },
      { name: "Scyllarides latus", commonName: "Cigarra de mar" },
      { name: "Scyllarus arctus", commonName: "Cigarra menor" },
      { name: "Nephrops norvegicus", commonName: "Cigala" },
      { name: "Homarus gammarus", commonName: "Bogavante europeo" },
      { name: "Carcinus maenas", commonName: "Cangrejo verde" },
      { name: "Macropus puber", commonName: "Cangrejo peludo" },
      { name: "Macropus corrugatus", commonName: "Cangrejo corrugado" },
      {
        name: "Xanto poressa",
        commonName: "Cangrejo Xanto (nombre no confirmado)",
      },
      { name: "Pachygrapsus marmoratus", commonName: "Cangrejo marmolado" },
      { name: "Epeira diadema", commonName: "Araña de la cruz" },
      { name: "Lithobius forficatus", commonName: "Escolopendra doméstica" },
    ],
  },
  {
    id: 3,
    name: "Equinodermos",
    species: [
      {
        name: "Antedon mediterránea",
        commonName: "Mediterranean feather star",
      },
      {
        name: "Astropecien auranciacus",
        commonName: "Orange starfish",
      },
      {
        name: "Ceramaster placenta",
        commonName: "Flat sea star",
      },
      {
        name: "Asterina gibosa",
        commonName: "Cushion star",
      },
      {
        name: "Ophiothrix fragilis",
        commonName: "Common brittle star",
      },
      {
        name: "Ophiocoma nigra",
        commonName: "Black brittle star",
      },
      {
        name: "Cidaris cidaris",
        commonName: "Cidaroid sea urchin",
      },
      {
        name: "Stylocidaris affinis",
        commonName: "Pencil urchin",
      },
      {
        name: "Centrostephanus longispinus",
        commonName: "Long-spined sea urchin",
      },
      {
        name: "Sphaerechinus granularis",
        commonName: "Purple sea urchin",
      },
      {
        name: "Paracentrotus lividus",
        commonName: "Purple sea urchin",
      },
      {
        name: "Holothuria tubulosa",
        commonName: "Tubular sea cucumber",
      },
      {
        name: "Echinaster sepositus",
        commonName: "Red starfish",
      },
      {
        name: "Asterias rubens",
        commonName: "Common starfish",
      },
      {
        name: "Ophioderma longicauda",
        commonName: "Long-tailed brittle star",
      },
      {
        name: "Echinus sculentus",
        commonName: "Edible sea urchin",
      },
      {
        name: "Psammechinus miliaris",
        commonName: "Green sea urchin",
      },
      {
        name: "Spatangus purpureus",
        commonName: "Purple heart urchin",
      },
      {
        name: "Echinocardium cordatum",
        commonName: "Sea potato",
      },
      {
        name: "Brissus unicolor",
        commonName: "One-colored heart urchin",
      },
      {
        name: "Cucumaria elongata",
        commonName: "Elongated sea cucumber",
      },
    ],
  },
  {
    id: 4,
    name: "Fósiles",
    species: [
      {
        name: "Cruzianas",
        commonName: "",
      },
      {
        name: "Illaenus",
        commonName: "",
      },
      {
        name: "Calymene",
        commonName: "",
      },
      {
        name: "Dydimograptus",
        commonName: "",
      },
      {
        name: "Orthis",
        commonName: "",
      },
      {
        name: "Orthoceras",
        commonName: "",
      },
      {
        name: "Arquaeociatus",
        commonName: "",
      },
      {
        name: "Olenellus",
        commonName: "",
      },
      {
        name: "Paradoxides",
        commonName: "",
      },
      {
        name: "Conocoryphe",
        commonName: "",
      },
      {
        name: "Elrathia",
        commonName: "",
      },
      {
        name: "Phacops",
        commonName: "",
      },
      {
        name: "Spirifer",
        commonName: "",
      },
      {
        name: "Leptaena",
        commonName: "",
      },
      {
        name: "Anathyris",
        commonName: "",
      },
      {
        name: "Cupressocrinus",
        commonName: "",
      },
      {
        name: "Calceola",
        commonName: "",
      },
      {
        name: "Monograptus",
        commonName: "",
      },
      {
        name: "Spirograptus",
        commonName: "",
      },
      {
        name: "Pygope",
        commonName: "",
      },
      {
        name: "Alethopteris",
        commonName: "",
      },
      {
        name: "Pecopteris",
        commonName: "",
      },
      {
        name: "Neuropteris",
        commonName: "",
      },
      {
        name: "Lepidodendron",
        commonName: "",
      },
      {
        name: "Sigillaria",
        commonName: "",
      },
      {
        name: "Calamites",
        commonName: "",
      },
      {
        name: "Annularia",
        commonName: "",
      },
      {
        name: "Productus",
        commonName: "",
      },
      {
        name: "Fusulina",
        commonName: "",
      },
      {
        name: "Goniatites",
        commonName: "",
      },
      {
        name: "Ceratites",
        commonName: "",
      },
      {
        name: "Encrinus",
        commonName: "",
      },
      {
        name: "Amaltheus",
        commonName: "",
      },
      {
        name: "Hildoceras",
        commonName: "",
      },
      {
        name: "Dactylioceras",
        commonName: "",
      },
      {
        name: "Terebratula",
        commonName: "",
      },
      {
        name: "Rhynchonella",
        commonName: "",
      },
      {
        name: "Trigonia",
        commonName: "",
      },
      {
        name: "Belemnites",
        commonName: "",
      },
      {
        name: "Gryphaea",
        commonName: "",
      },
      {
        name: "Heliaster",
        commonName: "",
      },
      {
        name: "Clypeaster",
        commonName: "",
      },
      {
        name: "Planorbis",
        commonName: "",
      },
      {
        name: "Carcharodon",
        commonName: "",
      },
      {
        name: "Hipparion",
        commonName: "",
      },
      {
        name: "Flabellum",
        commonName: "",
      },
      {
        name: "Dentalium",
        commonName: "",
      },
    ],
  },
  {
    id: 5,
    name: "Mamíferos",
    species: [
      {
        name: "Crocidura russula",
        commonName: "Musaraña común",
      },
      {
        name: "Galemys pyrenaicus",
        commonName: "Desmán ibérico",
      },
      {
        name: "Talpa europaea",
        commonName: "Topo común",
      },
      {
        name: "Erinaceus europaeus",
        commonName: "Erizo común",
      },
      {
        name: "Plecotus auritus",
        commonName: "Murciélago orejudo común",
      },
      {
        name: "Apodemus sylvaticus",
        commonName: "Ratón de campo",
      },
      {
        name: "Mus musculus",
        commonName: "Ratón doméstico",
      },
      {
        name: "Eliomys quercinus",
        commonName: "Lirón careto",
      },
      {
        name: "Sciurus vulgaris",
        commonName: "Ardilla común",
      },
      {
        name: "Oryctolagus cuniculus",
        commonName: "Conejo común",
      },
      {
        name: "Lepus capensis / Lepus granatensis",
        commonName: "Liebre común",
      },
      {
        name: "Genetta genetta",
        commonName: "Gineta",
      },
      {
        name: "Herpestes ichneumon",
        commonName: "Meloncillo",
      },
      {
        name: "Vulpes vulpes",
        commonName: "Zorro rojo",
      },
      {
        name: "Felis sylvestris",
        commonName: "Gato montés",
      },
      {
        name: "Lynx pardina",
        commonName: "Lince ibérico",
      },
      {
        name: "Martes martes",
        commonName: "Marta común",
      },
      {
        name: "Martes foina",
        commonName: "Garduña",
      },
      {
        name: "Mustela putorius",
        commonName: "Turón europeo",
      },
      {
        name: "Mustela nivalis",
        commonName: "Comadreja común",
      },
      {
        name: "Mustela erminea",
        commonName: "Armiño común",
      },
      {
        name: "Mustela lutreola",
        commonName: "Visón europeo",
      },
      {
        name: "Lutra lutra",
        commonName: "Nutria paleártica",
      },
      {
        name: "Meles meles",
        commonName: "Tejón europeo",
      },
      {
        name: "Canis lupus",
        commonName: "Lobo ibérico",
      },
      {
        name: "Ursus arctos",
        commonName: "Oso pardo cantábrico",
      },
      {
        name: "Sus scrofa",
        commonName: "Jabalí",
      },
      {
        name: "Capreolus capreolus",
        commonName: "Corzo común",
      },
      {
        name: "Cervus elaphus",
        commonName: "Ciervo común",
      },
      {
        name: "Dama dama",
        commonName: "Gamo común",
      },
      {
        name: "Rupicapra pyrenaica",
        commonName: "Rebeco pirenaico",
      },
      {
        name: "Capra pyrenaica",
        commonName: "Cabra montés ibérica",
      },
    ],
  },
  {
    id: 6,
    name: "Peces",
    species: [
      {
        name: "Pintarroja (Scyliorhinus canicula)",
        commonName: "Pintarroja",
      },
      {
        name: "Torpedo o tembladera (Torpedo marmorata)",
        commonName: "Tembladera común",
      },
      {
        name: "Raya (Raja clavata)",
        commonName: "Raya común",
      },
      {
        name: "Chucho (Dasyatis pastinaca)",
        commonName: "Pastinaca común",
      },
      {
        name: "Esturión (Acipenser sturio)",
        commonName: "Esturión europeo",
      },
      {
        name: "Arenque (Clupea harengus)",
        commonName: "Arenque del Atlántico",
      },
      {
        name: "Sardina (Sardina pilchardus)",
        commonName: "Sardina europea",
      },
      {
        name: "Boquerón o Anchoa (Engraulis encrasicolus)",
        commonName: "Boquerón",
      },
      {
        name: "Salmón (Salmo salar)",
        commonName: "Salmón del Atlántico",
      },
      {
        name: "Trucha (Salmo trutta)",
        commonName: "Trucha común",
      },
      {
        name: "Trucha arco iris (Oncorhynchus mykiss)",
        commonName: "Trucha arcoíris",
      },
      {
        name: "Lucio (Esox lucius)",
        commonName: "Lucio europeo",
      },
      {
        name: "Barbo de montaña (Barbus meridionalis)",
        commonName: "Barbo meridional",
      },
      {
        name: "Carpa (Cyprinus carpio)",
        commonName: "Carpa común",
      },
      {
        name: "Tenca (Tinca tinca)",
        commonName: "Tenca común",
      },
      {
        name: "Anguila (Anguilla anguilla)",
        commonName: "Anguila europea",
      },
      {
        name: "Congrio (Conger conger)",
        commonName: "Congrio común",
      },
      {
        name: "Caballito de mar (Hippocampus hippocampus)",
        commonName: "Caballito de mar común",
      },
      {
        name: "Bacalao (Gadus morhua)",
        commonName: "Bacalao del Atlántico",
      },
      {
        name: "Merluza (Merluccius merluccius)",
        commonName: "Merluza europea",
      },
      {
        name: "Jurel o Chicharro (Trachurus trachurus)",
        commonName: "Jurel común",
      },
      {
        name: "Lubina (Morone labrax o Dicentrarchus labrax)",
        commonName: "Lubina europea",
      },
      {
        name: "Palometa (Brama brama)",
        commonName: "Palometa negra",
      },
      {
        name: "Salmonete de roca (Mullus surmuletus)",
        commonName: "Salmonete de roca",
      },
      {
        name: "Salmonete de fango (Mullus barbatus)",
        commonName: "Salmonete de fango",
      },
      {
        name: "Besugo (Pagellus bogaraveo)",
        commonName: "Besugo de la pinta",
      },
      {
        name: "Atún (Thunnus thynnus)",
        commonName: "Atún rojo",
      },
      {
        name: "Bonito del Norte (Thunnus alalunga)",
        commonName: "Bonito del norte",
      },
      {
        name: "Bonito (Sarda sarda)",
        commonName: "Bonito atlántico",
      },
      {
        name: "Sargo (Diplodus sargus)",
        commonName: "Sargo común",
      },
      {
        name: "Pez Espada (Xiphias gladius)",
        commonName: "Pez espada",
      },
      {
        name: "Espineloso (Gasterosteus aculeatus)",
        commonName: "Espinoso",
      },
      {
        name: "Rodaballo (Psetta maxima)",
        commonName: "Rodaballo",
      },
      {
        name: "Gallo (Lepidorhombus whiffiagonis)",
        commonName: "Gallo del Atlántico",
      },
      {
        name: "Solla (Pleuronectes platessa)",
        commonName: "Solla europea",
      },
      {
        name: "Lenguado (Solea solea)",
        commonName: "Lenguado común",
      },
      {
        name: "Rape (Lophius piscatorius)",
        commonName: "Rape común",
      },
    ],
  },
  {
    id: 7,
    name: "Insectos",
    species: [
      { name: "Melanargia galathea", commonName: "Medioluto norteña" },
      { name: "Libythea celtis", commonName: "Mariposa del almez" },
      { name: "Aglais urticae", commonName: "Ortiguera" },
      { name: "Vanessa atalanta", commonName: "Vanessa atalanta" },
      { name: "Apatura iris", commonName: "Mariposa iris" },
      { name: "Polygonia c-album", commonName: "C-blanca" },
      { name: "Limenitis camilla", commonName: "Ninfa del bosque" },
      { name: "Vanessa io", commonName: "Pavo real" },
      { name: "Nymphalis antiopa", commonName: "Antiopa" },
      { name: "Quercusia quercus", commonName: "Mancha azul" },
      { name: "Lysandra coridon", commonName: "Niña coridon" },
      { name: "Lycaena phlaeas", commonName: "Manto bermejo" },
      { name: "Polyommatus icarus", commonName: "Icaro" },
      { name: "Anthocharis cardamines", commonName: "Aurora" },
      { name: "Colias crocea", commonName: "Colias común" },
      { name: "Gonepteryx rhamni", commonName: "Limón" },
      { name: "Pieris rapae", commonName: "Blanquita de la col" },
      { name: "Cossus cossus", commonName: "Gusano taladro" },
      { name: "Zygaena filipendulae", commonName: "Zigena de seis puntos" },
      { name: "Phryganea grandis", commonName: "Frigánea grande" },
      {
        name: "Tipula maxima",
        commonName: "Tipula gigante",
        imageUrl:
          "https://upload.wikimedia.org/wikipedia/commons/e/ee/Tipula_bicornis.jpg",
      },
      { name: "Culex pipiens", commonName: "Mosquito común" },
      { name: "Haematopota pluvialis", commonName: "Tábano de lluvia" },
      { name: "Volucella zonaria", commonName: "Mosca cernidora" },
      { name: "Lucilia caesar", commonName: "Mosca verde" },
      { name: "Calliphora vomitoria", commonName: "Mosca azul" },
      { name: "Scolia flavifrons", commonName: "Avispa escólida" },
      { name: "Chrysis ignita", commonName: "Avispa cuco" },
      { name: "Formica rufa", commonName: "Hormiga roja" },
      { name: "Messor barbarus", commonName: "Hormiga cosechadora" },
      { name: "Vespula vulgaris", commonName: "Avispa común" },
      { name: "Vespa crabro", commonName: "Avispón europeo" },
      { name: "Cicindela campestris", commonName: "Cicindela campestre" },
      { name: "Calosoma sycophanta", commonName: "Calosoma" },
      { name: "Carabus violaceus", commonName: "Carabo violeta" },
      { name: "Dytiscus marginalis", commonName: "Escarabajo buceador" },
      { name: "Gyrinus natator", commonName: "Girino nadador" },
      { name: "Hydrophilus piceus", commonName: "Escarabajo acuático grande" },
      { name: "Nicrophorus humator", commonName: "Escarabajo enterrador" },
      { name: "Nicrophorus vespillo", commonName: "Escarabajo sepulturero" },
      { name: "Ocypus olens", commonName: "Escarabajo oscuro" },
      { name: "Buprestis aurulenta", commonName: "Escarabajo joya" },
      { name: "Phalera bucephala", commonName: "Bucéfalo" },
      { name: "Cerura vinula", commonName: "Cola de golondrina" },
      { name: "Thaumetopoea pityocampa", commonName: "Procesionaria del pino" },
      { name: "Graellsia isabelae", commonName: "Mariposa isabelina" },
      { name: "Arctia caja", commonName: "Oso pardo" },
      { name: "Callimorpha jacobaeae", commonName: "Mariposa tigre" },
      { name: "Noctua pronuba", commonName: "Noctua común" },
      { name: "Catocala nupta", commonName: "Cinta roja" },
      { name: "Lymantria monacha", commonName: "Monja" },
      { name: "Lymantria dispar", commonName: "Mariposa gitana" },
      { name: "Lasiocampa quercus", commonName: "Mariposa del roble" },
      { name: "Saturnia pavonia", commonName: "Pavo real nocturno" },
      { name: "Saturnia pyri", commonName: "Gran pavón nocturno" },
      { name: "Acherontia atropos", commonName: "Esfinge de la calavera" },
      { name: "Macroglossum stellatarum", commonName: "Esfinge colibrí" },
      { name: "Sphinx ligustri", commonName: "Esfinge del aligustre" },
      { name: "Agrius convolvuli", commonName: "Esfinge del convolvulus" },
      { name: "Hyles lineata", commonName: "Esfinge rayada" },
      { name: "Geometra papilionaria", commonName: "Geometra" },
      { name: "Sarcophaga carnaria", commonName: "Mosca de la carne" },
      { name: "Scathophaga stercoraria", commonName: "Mosca del estiércol" },
      { name: "Musca domestica", commonName: "Mosca doméstica" },
      { name: "Hippobosca equina", commonName: "Mosca del caballo" },
      { name: "Melophagus ovinus", commonName: "Mosca de las ovejas" },
      { name: "Vespula germanica", commonName: "Avispa alemana" },
      { name: "Apis mellifera", commonName: "Abeja melífera" },
      { name: "Xylocopa violacea", commonName: "Abeja carpintera" },
      { name: "Bombus terrestris", commonName: "Abejorro común" },
      { name: "Bombus lucorum", commonName: "Abejorro blanco" },
      { name: "Bombus lapidarius", commonName: "Abejorro de piedra" },
      { name: "Lucanus cervus", commonName: "Ciervo volante" },
      { name: "Dorcus parallelipipedus", commonName: "Ciervo volante pequeño" },
      { name: "Geotrupes stercorarius", commonName: "Escarabajo estercolero" },
      { name: "Typhaeus typhoeus", commonName: "Escarabajo tifón" },
      { name: "Copris lunaris", commonName: "Escarabajo coprófago" },
      { name: "Oryctes nasicornis", commonName: "Escarabajo rinoceronte" },
      { name: "Cetonia aurata", commonName: "Cetonia dorada" },
      { name: "Anoxia villosa", commonName: "Escarabajo peludo" },
      { name: "Melolontha melolontha", commonName: "Escarabajo sanjuanero" },
      { name: "Rhizotrogus aestivus", commonName: "Escarabajo del verano" },
      { name: "Ephemera danica", commonName: "Efemeróptero común" },
      { name: "Calopteryx splendens", commonName: "Caballito del diablo" },
      { name: "Anax imperator", commonName: "Libélula emperador" },
      { name: "Perlodes microcephalus", commonName: "Plecóptero común" },
      { name: "Acheta domesticus", commonName: "Grillo doméstico" },
      { name: "Gryllus campestris", commonName: "Grillo de campo" },
      { name: "Nemobius sylvestris", commonName: "Grillo del bosque" },
      {
        name: "Ephippiger ephippiger",
        commonName: "Saltamontes de alas de silla",
      },
      { name: "Tettigonia viridissima", commonName: "Saltamontes verde" },
      { name: "Periplaneta americana", commonName: "Cucaracha americana" },
      { name: "Blattella germanica", commonName: "Cucaracha alemana" },
      { name: "Labidura riparia", commonName: "Tijereta de ribera" },
      { name: "Bacillus rossius", commonName: "Insecto palo" },
      { name: "Graphosoma lineatum", commonName: "Chinche rayada" },
      { name: "Pentatoma rufipes", commonName: "Chinche de patas rojas" },
      { name: "Reduvius personatus", commonName: "Chinche asesina" },
      { name: "Pyrrhocoris apterus", commonName: "Chinche de fuego" },
      { name: "Lyristes plebejus", commonName: "Cigarra común" },
      { name: "Cicadetta montana", commonName: "Cigarra de montaña" },
      { name: "Palpares libelluloides", commonName: "Hormiga león" },
      { name: "Danaus plexippus", commonName: "Mariposa monarca" },
      { name: "Iphiclides podalirius", commonName: "Podalirio" },
      { name: "Papilio machaon", commonName: "Macón" },
      { name: "Gryllotalpa gryllotalpa", commonName: "Alacrán cebollero" },
      { name: "Oedipoda caerulescens", commonName: "Saltamontes azul" },
      { name: "Locusta migratoria", commonName: "Langosta migratoria" },
      { name: "Blatta orientalis", commonName: "Cucaracha oriental" },
      { name: "Mantis religiosa", commonName: "Mantis religiosa" },
      { name: "Forficula auricularia", commonName: "Tijereta común" },
      { name: "Cimex lectularius", commonName: "Chinche de cama" },
      { name: "Hydrometra stagnorum", commonName: "Zapatero de agua" },
      { name: "Gerris lacustris", commonName: "Zapatero común" },
      { name: "Nepa cinerea", commonName: "Escorpión acuático" },
      { name: "Ranatra linearis", commonName: "Insecto palo acuático" },
      { name: "Notonecta glauca", commonName: "Nadador de espalda" },
      { name: "Cercopis vulnerata", commonName: "Chicharra roja" },
      {
        name: "Chrysopa septempunctata",
        commonName: "Crisopa de siete puntos",
      },
      { name: "Parnassius apollo", commonName: "Apolo" },
      { name: "Zerynthia rumina", commonName: "Arlequín" },
      { name: "Pyronia tithonus", commonName: "Lobito agreste" },
      {
        name: "Polyphylla fullo",
        commonName: "Escarabajo sanjuanero",
      },
      {
        name: "Lampyris noctiluca",
        commonName: "Luciérnaga común",
      },
      {
        name: "Dermestes lardarius",
        commonName: "Escarabajo de la despensa",
      },
      {
        name: "Blaps mortisaga",
        commonName: "Escarabajo de la muerte",
      },
      {
        name: "Meloe proscarabaeus",
        commonName: "Aceitera común",
      },
      {
        name: "Coccinella septempunctata",
        commonName: "Mariquita de siete puntos",
      },
      {
        name: "Adalia bipunctata",
        commonName: "Mariquita de dos puntos",
      },
      {
        name: "Cerambyx cerdo",
        commonName: "Escarabajo longicornio grande",
      },
      {
        name: "Potosia cuprea",
        commonName: "Cetonia dorada",
      },
      {
        name: "Acanthocinus aedilis",
        commonName: "Escarabajo aserrador",
      },
      {
        name: "Leptinotarsa decemlineata",
        commonName: "Escarabajo de la patata",
      },
      {
        name: "Timarcha tenebricosa",
        commonName: "Escarabajo de la hoja",
      },
    ],
  },
  {
    id: 8,
    name: "Aves",
    species: [
      { name: "Podiceps cristatus", commonName: "Somormujo lavanco" },
      { name: "Tachybaptus ruficollis", commonName: "Zampullín chico" },
      { name: "Nycticorax nycticorax", commonName: "Martinete" },
      { name: "Bubulcus ibis", commonName: "Garcilla bueyera" },
      { name: "Ardea cinerea", commonName: "Garza real" },
      { name: "Ciconia ciconia", commonName: "Cigüeña común" },
      { name: "Ciconia nigra", commonName: "Cigüeña negra" },
      { name: "Phoenicopterus ruber", commonName: "Flamenco común" },
      { name: "Anas crecca", commonName: "Cerceta común" },
      { name: "Anas platyrhynchos", commonName: "Ánade real" },
      { name: "Anas acuta", commonName: "Ánade rabudo" },
      { name: "Anas clypeata", commonName: "Pato cuchara" },
      { name: "Netta rufina", commonName: "Pato colorado" },
      { name: "Aythya ferina", commonName: "Porrón común" },
      { name: "Oxyura leucocephala", commonName: "Malvasía cabeciblanca" },
      { name: "Neophron percnopterus", commonName: "Alimoche común" },
      { name: "Gyps fulvus", commonName: "Buitre leonado" },
      { name: "Aegypius monachus", commonName: "Buitre negro" },
      { name: "Accipiter gentilis", commonName: "Azor común" },
      { name: "Accipiter nisus", commonName: "Gavilán común" },
      { name: "Falco naumanni", commonName: "Cernícalo primilla" },
      { name: "Falco tinnunculus", commonName: "Cernícalo vulgar" },
      { name: "Falco peregrinus", commonName: "Halcón peregrino" },
      { name: "Tetrao urogallus", commonName: "Urogallo" },
      { name: "Alectoris rufa", commonName: "Perdiz roja" },
      { name: "Fulica atra", commonName: "Focha común" },
      { name: "Himantopus himantopus", commonName: "Cigüeñuela común" },
      { name: "Recurvirostra avosetta", commonName: "Avoceta común" },
      { name: "Vanellus vanellus", commonName: "Avefría europea" },
      { name: "Scolopax rusticola", commonName: "Chocha perdiz" },
      { name: "Larus ridibundus", commonName: "Gaviota reidora" },
      { name: "Larus fuscus", commonName: "Gaviota sombría" },
      { name: "Fratercula arctica", commonName: "Frailecillo atlántico" },
      { name: "Columba palumbus", commonName: "Paloma torcaz" },
      { name: "Streptopelia turtur", commonName: "Tórtola europea" },
      { name: "Cuculus canorus", commonName: "Cuco común" },
      { name: "Tyto alba", commonName: "Lechuza común" },
      { name: "Otus scops", commonName: "Autillo europeo" },
      { name: "Athene noctua", commonName: "Mochuelo europeo" },
      { name: "Strix aluco", commonName: "Cárabo común" },
      { name: "Asio otus", commonName: "Búho chico" },
      { name: "Apus apus", commonName: "Vencejo común" },
      { name: "Alcedo atthis", commonName: "Martín pescador común" },
      { name: "Merops apiaster", commonName: "Abejaruco europeo" },
      { name: "Upupa epops", commonName: "Abubilla común" },
      { name: "Picus viridis", commonName: "Pito real" },
      { name: "Dendrocopos major", commonName: "Pico picapinos" },
      { name: "Hirundo rustica", commonName: "Golondrina común" },
      { name: "Delichon urbica", commonName: "Avión común" },
      { name: "Motacilla alba", commonName: "Lavandera blanca" },
      { name: "Motacilla cinerea", commonName: "Lavandera cascadeña" },
      { name: "Cinclus cinclus", commonName: "Mirlo acuático" },
      { name: "Erithacus rubecula", commonName: "Petirrojo europeo" },
      { name: "Luscinia svecica", commonName: "Pechiazul" },
      { name: "Turdus merula", commonName: "Mirlo común" },
      { name: "Turdus philomelos", commonName: "Zorzal común" },
      { name: "Sylvia atricapilla", commonName: "Curruca capirotada" },
      { name: "Lophophanes cristatus", commonName: "Herrerillo capuchino" },
      { name: "Cyanistes caeruleus", commonName: "Herrerillo común" },
      { name: "Parus major", commonName: "Carbonero común" },
      { name: "Oriolus oriolus", commonName: "Oropéndola europea" },
      { name: "Lanius excubitor", commonName: "Alcaudón real" },
      { name: "Lanius senator", commonName: "Alcaudón común" },
      { name: "Garrulus glandarius", commonName: "Arrendajo euroasiático" },
      { name: "Cyanopica cyanus", commonName: "Rabilargo ibérico" },
      { name: "Pica pica", commonName: "Urraca común" },
      { name: "Corvus monedula", commonName: "Grajilla" },
      { name: "Sturnus unicolor", commonName: "Estornino negro" },
      { name: "Passer domesticus", commonName: "Gorrión común" },
      { name: "Fringilla coelebs", commonName: "Pinzón vulgar" },
      { name: "Serinus serinus", commonName: "Verdecillo" },
      { name: "Chloris chloris", commonName: "Verderón común" },
      { name: "Linaria cannabina", commonName: "Pardillo común" },
      { name: "Carduelis carduelis", commonName: "Jilguero europeo" },
      { name: "Loxia curvirostra", commonName: "Piquituerto común" },
      { name: "Coccothraustes coccothraustes", commonName: "Picogordo" },
      { name: "Pyrrhula pyrrhula", commonName: "Camachuelo común" },
      { name: "Hirundo rustica", commonName: "Golondrina común" },
      { name: "Delichon urbica", commonName: "Avión común" },
      { name: "Motacilla alba", commonName: "Lavandera blanca" },
      { name: "Motacilla cinerea", commonName: "Lavandera cascadeña" },
      { name: "Cinclus cinclus", commonName: "Mirlo acuático" },
      { name: "Erithacus rubecula", commonName: "Petirrojo europeo" },
      { name: "Luscinia svecica", commonName: "Pechiazul" },
      { name: "Turdus merula", commonName: "Mirlo común" },
      { name: "Turdus philomelos", commonName: "Zorzal común" },
      { name: "Sylvia atricapilla", commonName: "Curruca capirotada" },
      { name: "Lophophanes cristatus", commonName: "Herrerillo capuchino" },
      { name: "Cyanistes caeruleus", commonName: "Herrerillo común" },
      { name: "Parus major", commonName: "Carbonero común" },
      { name: "Oriolus oriolus", commonName: "Oropéndola europea" },
      { name: "Lanius excubitor", commonName: "Alcaudón real" },
      { name: "Lanius senator", commonName: "Alcaudón común" },
      { name: "Garrulus glandarius", commonName: "Arrendajo euroasiático" },
      { name: "Cyanopica cyanus", commonName: "Rabilargo ibérico" },
      { name: "Pica pica", commonName: "Urraca común" },
      { name: "Corvus monedula", commonName: "Grajilla" },
      { name: "Sturnus unicolor", commonName: "Estornino negro" },
      { name: "Passer domesticus", commonName: "Gorrión común" },
      { name: "Fringilla coelebs", commonName: "Pinzón vulgar" },
      { name: "Serinus serinus", commonName: "Verdecillo" },
      { name: "Chloris chloris", commonName: "Verderón común" },
      { name: "Linaria cannabina", commonName: "Pardillo común" },
      { name: "Carduelis carduelis", commonName: "Jilguero europeo" },
      { name: "Loxia curvirostra", commonName: "Piquituerto común" },
      { name: "Coccothraustes coccothraustes", commonName: "Picogordo" },
      { name: "Pyrrhula pyrrhula", commonName: "Camachuelo común" },
    ],
  },
  {
    id: 9,
    name: "Moluscos",
    species: [
      {
        name: "Chiton squamosus",
        commonName: "Quitón escamoso",
      },
      {
        name: "Haliotis lamellosa",
        commonName: "Oreja de mar rugosa",
      },
      {
        name: "Patella rustica",
        commonName: "Lapa ferrugínea",
      },
      {
        name: "Patella apertura",
        commonName: "Lapa patella",
      },
      {
        name: "Patella aspera",
        commonName: "Lapa áspera",
      },
      {
        name: "Patella intermedia",
        commonName: "Lapa intermédia",
      },
      {
        name: "Patella caerulea",
        commonName: "Lapa azul",
      },
      {
        name: "Helix aspersa",
        commonName: "Caracol común de jardín",
      },
      {
        name: "Cepaea nemoralis",
        commonName: "Caracol de los setos",
      },
      {
        name: "Gibbula umbilicalis",
        commonName: "Gibbula umbilicalis",
      },
      {
        name: "Gibbula cineraria",
        commonName: "Gibbula cineraria",
      },
      {
        name: "Monodonta lineata",
        commonName: "Monodonta lineata",
      },
      {
        name: "Monodonta turbinata",
        commonName: "Monodonta turbinata",
      },
      {
        name: "Calliostoma zizyphinum",
        commonName: "Calliostoma zizyphinum",
      },
      {
        name: "Littorina rugosa",
        commonName: "Bígaro rugoso",
      },
      {
        name: "Littorina littoralis",
        commonName: "Bígaro amarillo",
      },
      {
        name: "Littorina obtusata",
        commonName: "Bígaro obtuso",
      },
      {
        name: "Truncatella subcylindrica",
        commonName: "Truncatella subcylindrica",
      },
      {
        name: "Turritella communis",
        commonName: "Turritella communis",
      },
      {
        name: "Vermetus arenarius",
        commonName: "Vermetus arenarius",
      },
      {
        name: "Bithynia tentaculata",
        commonName: "Bithynia tentaculata",
      },
      {
        name: "Cerithium vulgatum",
        commonName: "Cerithium vulgatum",
      },
      {
        name: "Aporrhais pespelecani",
        commonName: "Pie de pelícano",
      },
      {
        name: "Dentalium entalis",
        commonName: "Colmillo de mar común",
      },
      {
        name: "Nucula nucleus",
        commonName: "Nucula nucleus",
      },
      {
        name: "Arca noae",
        commonName: "Arca de Noé",
      },
      {
        name: "Arca tetragona",
        commonName: "Arca tetragona",
      },
      {
        name: "Glycymeris glycymeris",
        commonName: "Almeja de sangre",
      },
      {
        name: "Anomia ephippium",
        commonName: "Ostra ensillada",
      },
      {
        name: "Mytilus edulis",
        commonName: "Mejillón común",
      },
      {
        name: "Lithophaga lithophaga",
        commonName: "Dátil de mar",
      },
      {
        name: "Pinna nobilis",
        commonName: "Nacra común",
      },
      {
        name: "Ostrea edulis",
        commonName: "Ostra europea",
      },
      {
        name: "Crassostrea angulata",
        commonName: "Ostra portuguesa",
      },
      {
        name: "Pecten maximus",
        commonName: "Vieira común",
      },
      {
        name: "Pecten jacobaeus",
        commonName: "Concha de Santiago",
      },
      {
        name: "Chlamys varia",
        commonName: "Zamburiña variable",
      },
      {
        name: "Chlamys opercularis",
        commonName: "Volandeira",
      },
      {
        name: "Spondylus gaederopus",
        commonName: "Ostra espinosa",
      },
      {
        name: "Lima lima",
        commonName: "Lima hians",
      },
      {
        name: "Glossus humanus",
        commonName: "Corazón de buey",
      },
      {
        name: "Cardium aculeatum",
        commonName: "Berberecho espinoso",
      },
      {
        name: "Lepidochitona cinerea",
        commonName: "Lepidochitona cinerea",
      },
      {
        name: "Capulus hungaricus",
        commonName: "Capulus hungaricus",
      },
      {
        name: "Trivia monacha",
        commonName: "Trivia monacha",
      },
      {
        name: "Trivia arctica",
        commonName: "Trivia arctica",
      },
      {
        name: "Simnea pirosum (=Cypraea pirum)",
        commonName: "Simnia nicaeensis",
      },
      {
        name: "Clathrus clathrus",
        commonName: "Epitonium clathrus",
      },
      {
        name: "Ianthina exigua",
        commonName: "Ianthina exigua",
      },
      {
        name: "Cassidaria echinophora",
        commonName: "Casco erizo",
      },
      {
        name: "Cassis saburon",
        commonName: "Casco saburón",
      },
      {
        name: "Murex brandaris",
        commonName: "Cañaílla",
      },
      {
        name: "Murex trunculus",
        commonName: "Busano",
      },
      {
        name: "Thais (=Purpura) haemastoma",
        commonName: "Cañaílla tintorera",
      },
      {
        name: "Nassarius incrassatus",
        commonName: "Nassarius incrassatus",
      },
      {
        name: "Ocenebra erinacea",
        commonName: "Bocina de mar",
      },
      {
        name: "Fusus rostratus",
        commonName: "Fusus rostratus",
      },
      {
        name: "Mitra ebenus",
        commonName: "Mitra ebenus",
      },
      {
        name: "Marginella glabella",
        commonName: "Marginella glabella",
      },
      {
        name: "Nassarius reticulatus",
        commonName: "Nassarius reticulatus",
      },
      {
        name: "Conus mediterraneus",
        commonName: "Cono mediterráneo",
      },
      {
        name: "Bulla striata",
        commonName: "Bulla striata",
      },
      {
        name: "Scaphander lignarius",
        commonName: "Scaphander lignarius",
      },
      {
        name: "Elysia viridis",
        commonName: "Babosa de mar verde",
      },
      {
        name: "Cymbium olla",
        commonName: "Cymbium olla",
      },
      {
        name: "Cardium echinatum",
        commonName: "Berberecho erizado",
      },
      {
        name: "Cardium edule",
        commonName: "Berberecho común",
      },
      {
        name: "Cerastoderma glaucum",
        commonName: "Berberecho de laguna",
      },
      {
        name: "Venus verrucosa",
        commonName: "Venus verrugosa",
      },
      {
        name: "Venerupis decussata",
        commonName: "Almeja babosa",
      },
      {
        name: "Venerupis pullastra",
        commonName: "Almeja fina",
      },
      {
        name: "Mactra corallina",
        commonName: "Mactra corallina",
      },
      {
        name: "Lutraria lutraria",
        commonName: "Lutraria lutraria",
      },
      {
        name: "Donax vittatus",
        commonName: "Tellina vittata",
      },
      {
        name: "Tellina tenuis",
        commonName: "Tellina tenuis",
      },
      {
        name: "Scrobicularia plana",
        commonName: "Scrobicularia plana",
      },
      {
        name: "Pharus legumen",
        commonName: "Pharus legumen",
      },
      {
        name: "Ensis ensis",
        commonName: "Navaja recta",
      },
      {
        name: "Ensis siliqua",
        commonName: "Navajón",
      },
      {
        name: "Solecurtus strigilatus",
        commonName: "Solecurtus strigilatus",
      },
      {
        name: "Pholas dactylus",
        commonName: "Dátil de mar perforador",
      },
      {
        name: "Teredo navalis",
        commonName: "Teredo",
      },
      {
        name: "Sepia officinalis",
        commonName: "Jibia común",
      },
      {
        name: "Sepiola atlantica",
        commonName: "Sepiola atlántica",
      },
      {
        name: "Loligo vulgaris",
        commonName: "Calamar común",
      },
      {
        name: "Ommastrephes sagittatus",
        commonName: "Pota europea",
      },
      {
        name: "Octopus vulgaris",
        commonName: "Pulpo común",
      },
      {
        name: "Eledone cirrhosa",
        commonName: "Pulpo de roca",
      },
    ],
  },
  {
    id: 10,
    name: "Anfibios",
    species: [
      {
        name: "Salamandra salamandra",
        commonName: "Salamandra",
      },
      {
        name: "Pleurodeles waltl",
        commonName: "Gallipato",
      },
      {
        name: "Triturus marmoratus",
        commonName: "Tritón jaspeado",
      },
      {
        name: "Triturus boscai",
        commonName: "Tritón ibérico",
      },
      {
        name: "Alytes obstetricans",
        commonName: "Sapo partero",
      },
      {
        name: "Alytes cisternasii",
        commonName: "Sapo partero ibérico",
      },
      {
        name: "Pelobates cultripes",
        commonName: "Sapo de espuelas",
      },
      {
        name: "Bufo spinosus",
        commonName: "Sapo común",
      },
      {
        name: "Epidalea calamita",
        commonName: "Sapo corredor",
      },
      {
        name: "Hyla arborea",
        commonName: "Ranita de San Antonio",
      },
      {
        name: "Hyla meridionalis",
        commonName: "Ranita meridional",
      },
      {
        name: "Pelophylax perezi",
        commonName: "Rana verde",
      },
    ],
  },
  {
    id: 11,
    name: "Reptiles",
    species: [
      {
        name: "Galápago europeo (Emys orbicularis)",
        commonName: "Galápago europeo",
      },
      {
        name: "Galápago leproso (Mauremys leprosa)",
        commonName: "Galápago leproso",
      },
      {
        name: "Salamandra común (Salamandra salamandra)",
        commonName: "Salamandra común",
      },
      {
        name: "Salmandra gallega (Salamandra gallaica)",
        commonName: "Salamandra gallega",
      },
      {
        name: "Tritón ibérico (Lissotriton boscai)",
        commonName: "Tritón ibérico",
      },
      {
        name: "Camaleón común (Chamaeleo chamaeleon)",
        commonName: "Camaleón común",
      },
      {
        name: "Lagartija colilarga (Psammodromus algirus)",
        commonName: "Lagartija colilarga occidental",
      },
      {
        name: "Lagartija cenicienta (Psammodromus hispanicus)",
        commonName: "Lagartija cenicienta",
      },
      {
        name: "Lagartija colirroja (Acanthodactylus erythrurus)",
        commonName: "Lagartija colirroja",
      },
      {
        name: "Lagarto ocelado (Timon lepidus)",
        commonName: "Lagarto ocelado",
      },
      {
        name: "Lagartija ibérica (Podarcis hispanica)",
        commonName: "Lagartija ibérica",
      },
      {
        name: "Eslizón ibérico (Chalcides bedriagai)",
        commonName: "Eslizón ibérico",
      },
      {
        name: "Eslizón tridáctilo (Chalcides striatus)",
        commonName: "Eslizón tridáctilo",
      },
      {
        name: "Culebrilla ciega (Blanus cinereus)",
        commonName: "Culebrilla ciega ibérica",
      },
      {
        name: "Culebra bastarda (Malpolon monspessulanus)",
        commonName: "Culebra bastarda",
      },
      {
        name: "Culebra de herradura (Hemorrhois hippocrepis)",
        commonName: "Culebra de herradura",
      },
      {
        name: "Culebra de escalera (Rhinechis scalaris)",
        commonName: "Culebra de escalera",
      },
      {
        name: "Culebra de agua de collar (Natrix natrix)",
        commonName: "Culebra de collar",
      },
      {
        name: "Culebra viperina (Natrix maura)",
        commonName: "Culebra viperina",
      },
      {
        name: "Víbora hocicuda (Vipera latastei)",
        commonName: "Víbora hocicuda",
      },
    ],
  },
  {
    id: 12,
    name: "Algas",
    species: [
      {
        name: "Ulva rigida",
        commonName: "Lechuga de mar rígida",
      },
      {
        name: "Codium tomentosum",
        commonName: "Alga parda tomentosa",
      },
      {
        name: "Padina pavonica",
        commonName: "Alga pavo real",
      },
      {
        name: "Laminaria spp.",
        commonName: "Laminaria",
      },
      {
        name: "Fucus spp.",
        commonName: "Sargazo vejigoso",
      },
      {
        name: "Saccorhiza polyschides",
        commonName: "Alga látigo",
      },
      {
        name: "Himanthalia elongata",
        commonName: "Espagueti de mar",
      },
      {
        name: "Ascophyllum nodosum",
        commonName: "Nudo marino",
      },
      {
        name: "Pelvetia canaliculata",
        commonName: "Pelvetia canaliculata",
      },
      {
        name: "Jania rubens",
        commonName: "Jania rubens",
      },
      {
        name: "Corallina officinalis",
        commonName: "Coralina officinalis",
      },
      {
        name: "Lunularia cruciata",
        commonName: "Lunularia cruciata",
      },
      {
        name: "Marchantia polymorpha",
        commonName: "Marchantia polymorpha",
      },
      {
        name: "Sphagnum",
        commonName: "Musgo de turbera",
      },
      {
        name: "Polytrichum",
        commonName: "Polytrico",
      },
      {
        name: "Thuidium tamariscinum",
        commonName: "Musgo ciprés",
      },
      {
        name: "Rhytidiadelphus squarrosus",
        commonName: "Rhytidiadelphus squarrosus",
      },
      {
        name: "Hylocomium splendens",
        commonName: "Hylocomium splendens",
      },
      {
        name: "Aulacomnium palustre",
        commonName: "Aulacomnium palustre",
      },
      {
        name: "Dicranum scoparium",
        commonName: "Dicranum scoparium",
      },
      {
        name: "Ptilium crista-castrensis",
        commonName: "Ptilium crista-castrensis",
      },
      {
        name: "Rhytidiadelphus loreus",
        commonName: "Rhytidiadelphus loreus",
      },
    ],
  },
  {
    id: 13,
    name: "Gimnospermas",
    species: [
      { name: "Ginkgo biloba", commonName: "Árbol de los cuarenta escudos" },
      { name: "Pinus pinea", commonName: "Pino piñonero" },
      { name: "Pinus halepensis", commonName: "Pino carrasco" },
      { name: "Pinus pinaster", commonName: "Pino resinero" },
      { name: "Pinus nigra subsp. salzmannii", commonName: "Pino laricio" },
      { name: "Pinus sylvestris", commonName: "Pino silvestre" },
      { name: "Pinus uncinata", commonName: "Pino negro" },
      { name: "Larix decidua", commonName: "Alerce europeo" },
      { name: "Cedrus atlantica", commonName: "Cedro del Atlas" },
      { name: "Cedrus deodara", commonName: "Cedro del Himalaya" },
      { name: "Abies pinsapo", commonName: "Pinsapo" },
      { name: "Picea abies", commonName: "Abeto rojo" },
      { name: "Pseudotsuga menziesii", commonName: "Abeto de Douglas" },
      { name: "Abies alba", commonName: "Abeto blanco" },
      { name: "Sequoiadendron giganteum", commonName: "Secuoya gigante" },
      { name: "Juniperus communis", commonName: "Enebro común" },
      { name: "Juniperus oxycedrus", commonName: "Enebro de la miera" },
      { name: "Juniperus thurifera", commonName: "Sabina albar" },
      { name: "Cupressus sempervirens", commonName: "Ciprés común" },
      { name: "Cupressus arizonica", commonName: "Ciprés de Arizona" },
      { name: "Juniperus sabina", commonName: "Sabina rastrera" },
      { name: "Juniperus phoenicea", commonName: "Sabina negral" },
      { name: "Tetraclinis articulata", commonName: "Araar" },
      { name: "Taxus baccata", commonName: "Tejo común" },
      { name: "Ephedra spp.", commonName: "Efedras" },
    ],
  },
  {
    id: 14,
    name: "Helechos",
    species: [
      { name: "Asplenium scolopendrium", commonName: "Lengua de ciervo" },
      { name: "Pteridium aquilinum", commonName: "Helecho águila" },
      { name: "Asplenium ceterach", commonName: "Doradilla" },
      { name: "Asplenium trichomanes", commonName: "Culantrillo de pozo" },
      { name: "Adiantum capillus-veneris", commonName: "Culantrillo" },
      { name: "Blechnum spicant", commonName: "Helecho pincho" },
      { name: "Polypodium vulgare", commonName: "Polipodio común" },
      { name: "Dryopteris filix-mas", commonName: "Helecho macho" },
      { name: "Athyrium filix-femina", commonName: "Helecho hembra" },
      { name: "Equisetum arvense", commonName: "Cola de caballo" },
    ],
  },
  {
    id: 15,
    name: "Hongos",
    species: [
      { name: "Fomes fomentarius", commonName: "Yesquero" },
      { name: "Trametes versicolor", commonName: "Yesquero multicolor" },
      { name: "Ganoderma lucidum", commonName: "Reishi" },
      { name: "Lycoperdon perlatum", commonName: "Pedos de lobo" },
      { name: "Bovista plumbea", commonName: "Bovista plomiza" },
      {
        name: "Astraeus hygrometricus",
        commonName: "Estrella de tierra higrométrica",
      },
      { name: "Steleum hirsutum", commonName: "Estéreo hirsuto" },
    ],
  },
  {
    id: 16,
    name: "Invertebrados",
    species: [
      {
        name: "Syon ciliatum",
        commonName: "Esponja calcárea Sycon ciliatum",
      },
      {
        name: "Suberites domuncula",
        commonName: "Esponja ermitaño",
      },
      {
        name: "Spongia officinalis",
        commonName: "Esponja de baño común",
      },
      {
        name: "Physalia physalis",
        commonName: "Carabela portuguesa",
      },
      {
        name: "Velella velella",
        commonName: "Barquilla de San Pedro",
      },
      {
        name: "Pelagia noctiluca",
        commonName: "Medusa luminiscente",
      },
      {
        name: "Aurelia aurita",
        commonName: "Medusa común",
      },
      {
        name: "Actinia equina",
        commonName: "Anémona fresa",
      },
      {
        name: "Alcyonium digitatum",
        commonName: "Dedos de muerto",
      },
      {
        name: "Rhizostoma pulmo",
        commonName: "Aguamala",
      },
      {
        name: "Corallium rubrum",
        commonName: "Coral rojo",
      },
      {
        name: "Pennatula phosphorea",
        commonName: "Pluma de mar fosforescente",
      },
      {
        name: "Fasciola hepática",
        commonName: "Fasciola hepática",
      },
      {
        name: "Taenia solium",
        commonName: "Teniasis",
      },
      {
        name: "Ascaris lumbricoides",
        commonName: "Ascaris",
      },
      {
        name: "Trichinella spiralis",
        commonName: "Triquina",
      },
      {
        name: "Nereis diversicolor",
        commonName: "Gusano de arena",
      },
      {
        name: "Nereis virens",
        commonName: "Gusano de mar verdoso",
      },
      {
        name: "Lumbricus terrestris",
        commonName: "Lombriz de tierra común",
      },
      {
        name: "Hirudo medicinalis",
        commonName: "Sanguijuela medicinal",
      },
      {
        name: "Tomopteris helgolandica",
        commonName: "Tomopteris helgolandica",
      },
      {
        name: "Arenicola marina",
        commonName: "Gusano de arena",
      },
      {
        name: "Priapulus caudatus",
        commonName: "Priapulus caudatus",
      },
      {
        name: "Bonellia viridis",
        commonName: "Gusano trompa verde",
      },
      {
        name: "Sipunculus nudus",
        commonName: "Sipunculus nudus",
      },
    ],
  },
  {
    id: 17,
    name: "Líquenes",
    species: [
      {
        name: "Xanthoria parietina",
        commonName: "Liquen dorado",
      },
      {
        name: "Evernia prunastri",
        commonName: "Liquen de roble",
      },
      {
        name: "Pseudevernia furfuracea",
        commonName: "Liquen harinoso",
      },
      {
        name: "Umbilicaria pustulata",
        commonName: "Ombligo de tierra pustuloso",
      },
      {
        name: "Usnea florida",
        commonName: "Barba de viejo florida",
      },
      {
        name: "Rhizocarpon geographicum",
        commonName: "Liquen mapa",
      },
      {
        name: "Cladonia sp.",
        commonName: "Liquen copa",
      },
      {
        name: "Lobaria pulmonaria",
        commonName: "Liquen pulmonar",
      },
    ],
  },
  {
    id: 18,
    name: "Rocas",
    species: [
      {
        name: "Andesita",
        commonName: "",
      },
      {
        name: "Antracita",
        commonName: "",
      },
      {
        name: "Aplita",
        commonName: "",
      },
      {
        name: "Arenisca",
        commonName: "",
      },
      {
        name: "Basalto",
        commonName: "",
      },
      {
        name: "Brecha",
        commonName: "",
      },
      {
        name: "Caliza",
        commonName: "",
      },
      {
        name: "Lumaquela",
        commonName: "",
      },
      {
        name: "Toba",
        commonName: "",
      },
      {
        name: "Travertino",
        commonName: "",
      },
      {
        name: "Caliza litográfica",
        commonName: "",
      },
      {
        name: "Cuarcita",
        commonName: "",
      },
      {
        name: "Diorita",
        commonName: "",
      },
      {
        name: "Dolomía",
        commonName: "",
      },
      {
        name: "Esquisto",
        commonName: "",
      },
      {
        name: "Gabbro",
        commonName: "",
      },
      {
        name: "Gneis",
        commonName: "",
      },
      {
        name: "Gneis micáceo",
        commonName: "",
      },
      {
        name: "Granito",
        commonName: "",
      },
      {
        name: "Hulla",
        commonName: "",
      },
      {
        name: "Lignito",
        commonName: "",
      },
      {
        name: "Marga",
        commonName: "",
      },
      {
        name: "Mármol",
        commonName: "",
      },
      {
        name: "Obsidiana",
        commonName: "",
      },
      {
        name: "Pegmatita",
        commonName: "",
      },
      {
        name: "Peridotita",
        commonName: "",
      },
      {
        name: "Pizarra",
        commonName: "",
      },
      {
        name: "Pórfido",
        commonName: "",
      },
      {
        name: "Pudinga",
        commonName: "",
      },
      {
        name: "Pumita",
        commonName: "",
      },
      {
        name: "Riolita",
        commonName: "",
      },
      {
        name: "Serpentina",
        commonName: "",
      },
      {
        name: "Sienita",
        commonName: "",
      },
      {
        name: "Turba",
        commonName: "",
      },
      {
        name: "Yeso",
        commonName: "",
      },
    ],
  },
];
