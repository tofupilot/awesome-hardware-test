export const translations = {
  en: {
    description: "A curated collection of hardware testing tools and frameworks for validation engineers",
    hero: {
      title: {
        awesome: "AWESOME",
        hardware: "HARDWARE", 
        test: "TEST"
      },
      subtitle: "A handpicked collection of resources designed to help test engineers work faster and smarter.",
      discord: {
        title: "Don't debug alone - hardware testing is hard enough already.",
        description: "Join our Discord for technical support, emotional support, and to suggest resources.",
        button: "JOIN DISCORD"
      },
      stats: {
        resources: "RESOURCES",
        categories: "CATEGORIES",
        lastUpdate: "LAST_UPDATE",
        languages: "LANGUAGES",
        discordUsers: "DISCORD_USERS",
        stars: "STARS",
        contributors: "CONTRIBUTORS"
      },
      credits: {
        createdBy: "CREATED BY",
        inspiredBy: "INSPIRED BY"
      }
    },
    navigation: {
      contribute: "Contribute",
      github: "GitHub",
      allResources: "ALL_RESOURCES"
    },
    search: {
      placeholder: "Search testing tools and frameworks...",
      searchAll: "SEARCH ALL_RESOURCES...",
      searchCategory: (category: string) => `SEARCH ${category.toUpperCase()}...`,
      results: (count: number) => `[SEARCH_RESULTS: ${count}]`,
      category: (category: string) => `[CATEGORY: ${category.toUpperCase()}]`,
      noResults: "[ERROR: NO_RESOURCES_FOUND]",
      noResultsQuery: (query: string, category?: string) => `[QUERY: "${query}"]${category ? ` [CATEGORY: ${category.toUpperCase()}]` : ""} [RESULTS: 0]`,
      noResultsStatus: "[STATUS: NO_RESOURCES_AVAILABLE]"
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
      adjustFilters: "Try adjusting your search or category filter.",
      badges: {
        commercial: "COMMERCIAL",
        rip: "RIP"
      }
    },
    newsletter: {
      title: "[NEWSLETTER_SUBSCRIPTION]",
      description: "Stay updated with the latest hardware testing tools, frameworks, and industry insights.",
      placeholder: "ENTER_EMAIL_ADDRESS...",
      subscribe: "[SUBSCRIBE]",
      subscribing: "[SUBSCRIBING...]",
      confirmed: "[SUBSCRIPTION_CONFIRMED]",
      confirmedText: "You'll receive updates about new hardware testing tools and frameworks.",
      disclaimer: "No spam. Unsubscribe anytime. Updates sent monthly."
    },
    footer: {
      maintainer: "MAINTAINER",
      license: "LICENSE: MIT", 
      issues: "ISSUES",
      pullRequests: "PULL_REQUESTS"
    },
    tabs: {
      all: (count: number) => `All (${count})`
    }
  },
  fr: {
    description: "Une collection organisée d'outils et frameworks de test matériel pour ingénieurs de validation",
    hero: {
      title: {
        awesome: "IMPRESSIONNANT",
        hardware: "MATÉRIEL", 
        test: "TEST"
      },
      subtitle: "Une collection soigneusement sélectionnée de ressources conçues pour aider les ingénieurs test à travailler plus rapidement et intelligemment.",
      discord: {
        title: "Ne débuggez pas seul - les tests matériels sont déjà assez difficiles.",
        description: "Rejoignez notre Discord pour du support technique, émotionnel, et suggérer des ressources.",
        button: "REJOINDRE DISCORD"
      },
      stats: {
        resources: "RESSOURCES",
        categories: "CATÉGORIES",
        lastUpdate: "DERNIÈRE_MAJ",
        languages: "LANGUES",
        discordUsers: "UTILISATEURS_DISCORD",
        stars: "ÉTOILES",
        contributors: "CONTRIBUTEURS"
      },
      credits: {
        createdBy: "CRÉÉ PAR",
        inspiredBy: "INSPIRÉ PAR"
      }
    },
    navigation: {
      contribute: "Contribuer",
      github: "GitHub",
      allResources: "TOUTES_RESSOURCES"
    },
    search: {
      placeholder: "Rechercher des outils et frameworks de test...",
      searchAll: "RECHERCHER TOUTES_RESSOURCES...",
      searchCategory: (category: string) => `RECHERCHER ${category.toUpperCase()}...`,
      results: (count: number) => `[RÉSULTATS_RECHERCHE: ${count}]`,
      category: (category: string) => `[CATÉGORIE: ${category.toUpperCase()}]`,
      noResults: "[ERREUR: AUCUNE_RESSOURCE_TROUVÉE]",
      noResultsQuery: (query: string, category?: string) => `[REQUÊTE: "${query}"]${category ? ` [CATÉGORIE: ${category.toUpperCase()}]` : ""} [RÉSULTATS: 0]`,
      noResultsStatus: "[STATUT: AUCUNE_RESSOURCE_DISPONIBLE]"
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
      adjustFilters: "Essayez d'ajuster votre recherche ou filtre de catégorie.",
      badges: {
        commercial: "COMMERCIAL",
        rip: "RIP"
      }
    },
    newsletter: {
      title: "[INSCRIPTION_NEWSLETTER]",
      description: "Restez informé des derniers outils de test matériel, frameworks et insights de l'industrie.",
      placeholder: "SAISIR_ADRESSE_EMAIL...",
      subscribe: "[S'ABONNER]",
      subscribing: "[INSCRIPTION...]",
      confirmed: "[INSCRIPTION_CONFIRMÉE]",
      confirmedText: "Vous recevrez des mises à jour sur les nouveaux outils et frameworks de test matériel.",
      disclaimer: "Pas de spam. Désabonnez-vous à tout moment. Mises à jour mensuelles."
    },
    footer: {
      maintainer: "MAINTENEUR",
      license: "LICENCE: MIT", 
      issues: "PROBLÈMES",
      pullRequests: "PULL_REQUESTS"
    },
    tabs: {
      all: (count: number) => `Tout (${count})`
    }
  }
};

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
export const locales = Object.keys(translations) as Locale[];