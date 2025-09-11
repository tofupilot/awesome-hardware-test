export const translations = {
  en: {
    title: "Awesome Hardware Test",
    description: "A curated list of awesome hardware testing projects and resources",
    search: {
      placeholder: "Search testing tools and frameworks...",
      results: (count: number) => `${count} resources found`
    },
    categories: {
      all: "All Categories",
      "test execution engines": "Test Execution Engines",
      "test database & analytics": "Test Database & Analytics", 
      "instrument interface": "Instrument Interface", 
      "wafer maps": "Wafer Maps",
      "hardware devices": "Hardware Devices",
      "hardware mocking": "Hardware Mocking",
      "test suites": "Test Suites",
      "videos & resources": "Videos & Resources"
    },
    resource: {
      language: "Language",
      commercial: "Commercial",
      openSource: "Open Source",
      github: "GitHub",
      website: "Website",
      documentation: "Documentation",
      noItems: "No testing resources found.",
      adjustFilters: "Try adjusting your search or category filter."
    },
    tabs: {
      all: (count: number) => `All (${count})`
    }
  },
  fr: {
    title: "Tests Matériels Impressionnants",
    description: "Une liste organisée de projets et ressources impressionnants pour les tests matériels",
    search: {
      placeholder: "Rechercher des outils et frameworks de test...",
      results: (count: number) => `${count} ressources trouvées`
    },
    categories: {
      all: "Toutes les catégories",
      "test execution engines": "Moteurs d'exécution de tests",
      "test database & analytics": "Base de données et analyses de tests", 
      "instrument interface": "Interface d'instruments", 
      "wafer maps": "Cartes de plaquettes",
      "hardware devices": "Dispositifs matériels",
      "hardware mocking": "Simulation matérielle",
      "test suites": "Suites de tests",
      "videos & resources": "Vidéos et ressources"
    },
    resource: {
      language: "Langage",
      commercial: "Commercial",
      openSource: "Open Source",
      github: "GitHub",
      website: "Site web",
      documentation: "Documentation",
      noItems: "Aucune ressource de test trouvée.",
      adjustFilters: "Essayez d'ajuster votre recherche ou filtre de catégorie."
    },
    tabs: {
      all: (count: number) => `Tout (${count})`
    }
  }
};

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;