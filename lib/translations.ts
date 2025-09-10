export const translations = {
  en: {
    title: "Awesome Hardware Test",
    description: "Curated list of tested hardware components with benchmarks and reviews",
    search: {
      placeholder: "Search hardware...",
      results: (count: number) => `${count} items found`
    },
    categories: {
      all: "All Categories",
      cpu: "CPU",
      gpu: "GPU", 
      motherboard: "Motherboard",
      ram: "RAM",
      storage: "Storage",
      psu: "PSU",
      cooling: "Cooling",
      case: "Case",
      monitor: "Monitor",
      audio: "Audio",
      network: "Network"
    },
    hardware: {
      specifications: "Key Specifications",
      testResults: "Test Results",
      officialPage: "Official Page",
      reviews: "Reviews",
      noItems: "No hardware items found.",
      adjustFilters: "Try adjusting your search or category filter."
    },
    tabs: {
      all: (count: number) => `All (${count})`
    }
  },
  fr: {
    title: "Matériel Informatique Génial",
    description: "Liste organisée de composants matériels testés avec des benchmarks et des critiques",
    search: {
      placeholder: "Rechercher du matériel...",
      results: (count: number) => `${count} éléments trouvés`
    },
    categories: {
      all: "Toutes les catégories",
      cpu: "Processeur",
      gpu: "Carte graphique",
      motherboard: "Carte mère",
      ram: "Mémoire",
      storage: "Stockage",
      psu: "Alimentation",
      cooling: "Refroidissement",
      case: "Boîtier",
      monitor: "Écran",
      audio: "Audio",
      network: "Réseau"
    },
    hardware: {
      specifications: "Spécifications principales",
      testResults: "Résultats des tests",
      officialPage: "Page officielle",
      reviews: "Critiques",
      noItems: "Aucun élément matériel trouvé.",
      adjustFilters: "Essayez d'ajuster votre recherche ou filtre de catégorie."
    },
    tabs: {
      all: (count: number) => `Tout (${count})`
    }
  }
};

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;