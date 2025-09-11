export interface HardwareTestResource {
  id: string;
  name: string;
  category: TestCategory;
  description: {
    en: string;
    fr: string;
  };
  language?: string;
  license?: string;
  tags: string[];
  links: {
    github?: string;
    website?: string;
    docs?: string;
  };
  isCommercial?: boolean;
  features?: {
    en: string[];
    fr: string[];
  };
  // New fields for enhanced UI
  stars?: number;
  lastRelease?: string;
  contributors?: number;
  longDescription?: string;
  useCases?: string[];
  installation?: string;
  documentation?: string;
  unmaintained?: boolean;
  unmaintainedReason?: string;
  recommendedReplacements?: {
    id: string;
    name: string;
    reason?: string;
  }[];
  image?: string;
  imagePlaceholder?: string;
  codeExample?: string;
}

export type TestCategory = 
  | 'Test Execution Engines'
  | 'Test Database & Analytics' 
  | 'Instrument Interface' 
  | 'Wafer Maps'
  | 'Hardware Devices'
  | 'Hardware Mocking'
  | 'Test Suites'
  | 'Videos & Resources';

export const hardwareTestData: HardwareTestResource[] = [
  // Test Execution Engines
  {
    id: 'crappy',
    name: 'crappy',
    category: 'Test Execution Engines',
    description: {
      en: 'Python framework for real-time data acquisition and parallel hardware test control',
      fr: 'Framework Python pour l\'acquisition de données en temps réel et le contrôle de tests parallèles'
    },
    language: 'Python',
    license: 'GPL-3.0',
    tags: ['python', 'real-time', 'acquisition', 'parallel'],
    links: {
      github: 'https://github.com/LaboratoireMecaniqueLille/crappy'
    },
    longDescription: `CRAPPY is a Python framework designed for hardware testing and control applications. It provides a comprehensive solution for real-time data acquisition, control, and monitoring of hardware systems.

The framework is built with parallelization in mind, allowing multiple processes to run simultaneously for efficient hardware testing workflows. It's particularly useful for complex test setups that require coordination between multiple instruments and devices.

Key features include real-time data streaming, flexible instrument drivers, and a modular architecture that makes it easy to extend and customize for specific testing requirements.`,
    features: {
      en: [
        'Real-time data acquisition',
        'Parallel processing support',
        'Modular instrument drivers',
        'Flexible configuration system',
        'Built-in visualization tools',
        'Cross-platform compatibility'
      ],
      fr: [
        'Acquisition de données en temps réel',
        'Support du traitement parallèle',
        'Pilotes d\'instruments modulaires',
        'Système de configuration flexible',
        'Outils de visualisation intégrés',
        'Compatibilité multiplateforme'
      ]
    },
    useCases: [
      'Material testing laboratories',
      'Mechanical testing setups',
      'Multi-instrument coordination',
      'Real-time monitoring systems',
    ],
    installation: `pip install crappy`,
    documentation: 'https://crappy.readthedocs.io/',
    imagePlaceholder: 'python hardware testing framework dashboard interface oscilloscope',
    codeExample: `import crappy
from crappy import condition, blocks

# Create a test configuration
test = crappy.Test()
test.add_block(blocks.Generator())
test.run()`
  },
  {
    id: 'exclave',
    name: 'exclave',
    category: 'Test Execution Engines',
    description: {
      en: 'Rust-based infrastructure for high-performance factory testing and automation',
      fr: 'Infrastructure Rust pour les tests et l\'automatisation en usine haute performance'
    },
    language: 'Rust',
    license: 'Apache-2.0',
    tags: ['rust', 'factory', 'infrastructure', 'testing'],
    links: {
      github: 'https://github.com/exclave/exclave'
    },
    longDescription: `EXCLAVE is a modern factory test infrastructure built from the ground up in Rust. It's designed to handle the demanding requirements of manufacturing environments where reliability, performance, and safety are paramount.

The framework provides a robust foundation for building automated test systems that can scale from small production lines to large manufacturing facilities. Its Rust foundation ensures memory safety and high performance, critical for factory environments.

Exclave emphasizes modularity and extensibility, making it easy to integrate with existing manufacturing systems and adapt to different testing requirements.`,
    features: {
      en: [
        'Memory-safe test execution',
        'High-performance data processing',
        'Modular architecture',
        'Factory-grade reliability',
        'Real-time monitoring',
        'Scalable infrastructure',
      ],
      fr: [
        'Exécution de tests sécurisée en mémoire',
        'Traitement de données haute performance',
        'Architecture modulaire',
        'Fiabilité de qualité industrielle',
        'Surveillance en temps réel',
        'Infrastructure évolutive',
      ]
    },
    useCases: ['Electronics manufacturing', 'Automotive testing', 'Quality assurance systems', 'End-of-line testing'],
    installation: `cargo install exclave`,
    documentation: 'https://exclave.io/docs/',
    imagePlaceholder: 'rust factory testing infrastructure console terminal',
    codeExample: `use exclave::test::Test;
use exclave::runner::Runner;

// Create a new test
let test = Test::new("hardware_test");
let runner = Runner::new();
runner.execute(test)?;`
  },
  {
    id: 'flojoy-studio',
    name: 'Flojoy Studio',
    category: 'Test Execution Engines',
    description: {
      en: 'Visual scripting IDE for no-code DAQ, test benches, and robotics control',
      fr: 'IDE de script visuel pour DAQ, bancs d\'essai et contrôle robotique sans code'
    },
    language: 'Python',
    tags: ['visual-scripting', 'daq', 'robotics', 'no-code'],
    links: {
      github: 'https://github.com/flojoy-ai/studio'
    },
    unmaintained: true,
    unmaintainedReason: 'Flojoy Studio was discontinued after the company shut down operations in 2024. The visual scripting IDE showed promise for no-code test automation but is no longer actively developed.',
    recommendedReplacements: [
      { id: 'openhtf', name: 'OpenHTF', reason: 'Google\'s framework for hardware test automation' },
      { id: 'pytest-embedded', name: 'pytest-embedded', reason: 'Modern pytest plugin for embedded testing' }
    ],
  },
  {
    id: 'openhtf',
    name: 'openhtf',
    category: 'Test Execution Engines',
    description: {
      en: 'Google\'s open-source framework for scalable hardware validation and manufacturing tests',
      fr: 'Framework open-source de Google pour la validation matérielle et les tests de production'
    },
    language: 'Python',
    license: 'Apache-2.0',
    tags: ['google', 'framework', 'open-source', 'manufacturing'],
    links: {
      github: 'https://github.com/google/openhtf'
    },
    imagePlaceholder: 'google hardware testing framework web interface dashboard',
    codeExample: `import openhtf as htf
from openhtf.util import units

# Define a test phase
@htf.measures(htf.Measurement('voltage'))
def test_voltage(test):
    test.measurements.voltage = 3.3 * units.volt`,
    longDescription: `OPENHTF is Google's open-source hardware testing framework, designed to provide a robust and scalable solution for hardware validation and manufacturing testing. Originally developed for Google's internal hardware testing needs, it has been open-sourced to benefit the broader hardware testing community.

The framework provides a comprehensive set of tools for creating, executing, and managing hardware tests. It includes built-in support for test sequencing, data collection, result analysis, and reporting. OpenHTF is designed to handle everything from simple component tests to complex system-level validation.

One of OpenHTF's key strengths is its plugin architecture, which allows easy integration with various test equipment and measurement instruments. The framework also provides excellent support for test data management and can integrate with various databases and analytics platforms.`,
    features: {
      en: [
        'Test sequencing and orchestration',
        'Plugin-based architecture',
        'Built-in measurement support',
        'Data collection and analysis',
        'Web-based test monitoring',
        'Database integration',
        'Comprehensive reporting',
        'Multi-station support',
      ],
      fr: [
        'Séquençage et orchestration de tests',
        'Architecture basée sur des plugins',
        'Support de mesure intégré',
        'Collecte et analyse de données',
        'Surveillance de tests basée sur le web',
        'Intégration de base de données',
        'Rapports complets',
        'Support multi-station',
      ]
    },
    useCases: [
      'Manufacturing test stations',
      'Hardware validation labs',
      'Quality assurance testing',
      'Component characterization',
      'System-level testing',
    ],
    installation: `pip install openhtf`,
    documentation: 'https://github.com/google/openhtf/wiki'
  },
  {
    id: 'hardpy',
    name: 'HardPy',
    category: 'Test Execution Engines',
    description: {
      en: 'Python library for browser-based pytest test benches with database result storage',
      fr: 'Bibliothèque Python pour bancs d\'essai pytest via navigateur avec stockage en base de données'
    },
    language: 'Python',
    tags: ['pytest', 'browser', 'database', 'test-bench'],
    links: {
      github: 'https://github.com/everypinio/hardpy'
    },
  },
  {
    id: 'robotframework',
    name: 'Robot Framework',
    category: 'Test Execution Engines',
    description: {
      en: 'Automation framework for acceptance testing, ATDD, and robotic process automation',
      fr: 'Framework d\'automatisation pour tests d\'acceptation, ATDD et automatisation robotique'
    },
    language: 'Python',
    tags: ['automation', 'atdd', 'rpa', 'acceptance-testing'],
    links: {
      github: 'https://github.com/robotframework/robotframework',
      website: 'https://robotframework.org'
    }
  },
  {
    id: 'labgrid',
    name: 'Labgrid',
    category: 'Test Execution Engines',
    description: {
      en: 'Python library for remote control and automated testing of embedded boards',
      fr: 'Bibliothèque Python pour le contrôle à distance et les tests automatisés de cartes embarquées'
    },
    language: 'Python',
    license: 'LGPL-2.1',
    tags: ['embedded', 'board-control', 'remote-testing', 'automation', 'hardware'],
    links: {
      github: 'https://github.com/labgrid-project/labgrid',
      docs: 'https://labgrid.readthedocs.io/en/latest/getting_started.html',
      website: 'https://labgrid.readthedocs.io'
    },
  },
  {
    id: 'opentap',
    name: 'OpenTAP',
    category: 'Test Execution Engines',
    description: {
      en: 'Open-source platform for creating and executing automated test sequences',
      fr: 'Plateforme open-source pour créer et exécuter des séquences de tests automatisées'
    },
    language: 'C#',
    tags: ['csharp', 'automation', 'platform', 'sequences'],
    links: {
      github: 'https://github.com/opentap/opentap',
      website: 'https://www.opentap.io'
    }
  },
  {
    id: 'pytest-qt',
    name: 'pytest-qt',
    category: 'Test Execution Engines',
    description: {
      en: 'Pytest plugin for automated testing of Qt GUI applications',
      fr: 'Plugin pytest pour les tests automatisés d\'applications Qt GUI'
    },
    language: 'Python',
    tags: ['pytest', 'qt', 'gui-testing', 'plugin'],
    links: {
      github: 'https://github.com/pytest-dev/pytest-qt'
    }
  },
  {
    id: 'autolab',
    name: 'AutoLab',
    category: 'Test Execution Engines',
    description: {
      en: 'Simplified automation framework for measurement and instrument control',
      fr: 'Framework d\'automatisation simplifié pour les mesures et le contrôle d\'instruments'
    },
    language: 'Python',
    tags: ['automation', 'measurement', 'instruments'],
    links: {
      github: 'https://github.com/qcha/AutoLab'
    }
  },
  {
    id: 'mats',
    name: 'MATS',
    category: 'Test Execution Engines',
    description: {
      en: 'LabVIEW-based modular system for hardware-in-the-loop testing',
      fr: 'Système modulaire LabVIEW pour les tests hardware-in-the-loop'
    },
    language: 'LabVIEW',
    tags: ['labview', 'modular', 'hil', 'automated'],
    links: {
      github: 'https://github.com/ni/mats'
    }
  },
  {
    id: 'lava',
    name: 'LAVA',
    category: 'Test Execution Engines',
    description: {
      en: 'Automated validation architecture for testing deployed software on hardware',
      fr: 'Architecture de validation automatisée pour tester les logiciels déployés sur matériel'
    },
    language: 'Python',
    tags: ['linaro', 'validation', 'automated', 'deployment'],
    links: {
      github: 'https://github.com/Linaro/lava'
    }
  },

  // Test Database & Analytics
  {
    id: 'tofupilot',
    name: 'TofuPilot',
    category: 'Test Database & Analytics',
    description: {
      en: 'Plug-and-play database and analytics platform for hardware test data management',
      fr: 'Plateforme de base de données et d\'analyse plug-and-play pour la gestion des tests matériels'
    },
    language: 'Various',
    isCommercial: true,
    tags: ['database', 'pytest', 'analytics', 'commercial'],
    links: {
      website: 'https://tofupilot.com'
    },
  },
  {
    id: 'yieldhub',
    name: 'yieldHUB',
    category: 'Test Database & Analytics',
    description: {
      en: 'Enterprise analytics platform for semiconductor yield and test data analysis',
      fr: 'Plateforme d\'analyse d\'entreprise pour le rendement et les données de test des semiconducteurs'
    },
    language: 'Various',
    isCommercial: true,
    tags: ['semiconductor', 'analytics', 'yield', 'commercial'],
    links: {
      website: 'https://yieldhub.com'
    },
  },

  // Instrument Interface
  {
    id: 'pyvisa',
    name: 'PyVISA',
    category: 'Instrument Interface',
    description: {
      en: 'Python package for universal control of measurement instruments via VISA protocol',
      fr: 'Package Python pour le contrôle universel d\'instruments de mesure via le protocole VISA'
    },
    language: 'Python',
    tags: ['visa', 'instruments', 'control', 'measurement'],
    links: {
      github: 'https://github.com/pyvisa/pyvisa',
      docs: 'https://pyvisa.readthedocs.io'
    },
  },
  {
    id: 'test-controller',
    name: 'Test Controller',
    category: 'Instrument Interface',
    description: {
      en: 'Multi-device control and data logging for DMMs, power supplies, and electronic loads',
      fr: 'Contrôle multi-appareils et enregistrement de données pour DMM, alimentations et charges'
    },
    language: 'Various',
    tags: ['logging', 'tcp-ip', 'udp', 'serial', 'configuration'],
    links: {},
    unmaintained: true,
    unmaintainedReason: 'Test Controller development ceased several years ago. The multi-device control functionality has been superseded by more modern solutions with better protocol support and active maintenance.',
    recommendedReplacements: [
      { id: 'pyvisa', name: 'PyVISA', reason: 'Modern Python library for instrument control' },
      { id: 'labgrid', name: 'labgrid', reason: 'Advanced embedded board control framework' }
    ],
  },

  // Wafer Maps
  {
    id: 'wafer-map',
    name: 'wafer-map',
    category: 'Wafer Maps',
    description: {
      en: 'Python library for visualization and analysis of semiconductor wafer maps',
      fr: 'Bibliothèque Python pour la visualisation et l\'analyse de cartes de wafers'
    },
    language: 'Python',
    tags: ['semiconductor', 'wafer', 'mapping', 'visualization'],
    links: {
      github: 'https://github.com/dougthor42/wafer_map'
    },
  },
  {
    id: 'py-wdf-reader',
    name: 'py-wdf-reader',
    category: 'Wafer Maps',
    description: {
      en: 'Python reader for Renishaw WDF spectroscopy data files',
      fr: 'Lecteur Python pour les fichiers de données spectroscopiques WDF Renishaw'
    },
    language: 'Python',
    tags: ['wdf', 'renishaw', 'spectroscopy', 'reader'],
    links: {
      github: 'https://github.com/alchem0x2A/py-wdf-reader'
    },
  },
  {
    id: 'waferthin',
    name: 'waferthin',
    category: 'Wafer Maps',
    description: {
      en: 'Python tools for semiconductor wafer data mapping and statistical analysis',
      fr: 'Outils Python pour la cartographie et l\'analyse statistique des données de wafers'
    },
    language: 'Python',
    tags: ['wafer', 'mapping', 'analysis', 'semiconductor'],
    links: {
      github: 'https://github.com/MatthewTheGhoul/waferthin'
    },
  },
  {
    id: 'stdf2map',
    name: 'stdf2map',
    category: 'Wafer Maps',
    description: {
      en: 'CLI tool for generating wafer bin maps from STDF test data files',
      fr: 'Outil CLI pour générer des cartes de wafers binaires à partir de fichiers STDF'
    },
    language: 'Python',
    tags: ['stdf', 'wafermap', 'semiconductor', 'analysis'],
    links: {
      github: 'https://github.com/noonchen/stdf2map'
    },
  },

  // Hardware Devices
  {
    id: 'nanovna-saver',
    name: 'NanoVNA-Saver',
    category: 'Hardware Devices',
    description: {
      en: 'GUI application for NanoVNA vector network analyzer data acquisition and analysis',
      fr: 'Application GUI pour l\'acquisition et l\'analyse de données NanoVNA'
    },
    language: 'Python',
    tags: ['nanovna', 'vna', 'network-analyzer', 'rf'],
    links: {
      github: 'https://github.com/NanoVNA-Saver/nanovna-saver'
    },
  },
  {
    id: 'red-pitaya',
    name: 'Red Pitaya',
    category: 'Hardware Devices',
    description: {
      en: 'Open-hardware platform combining oscilloscope, signal generator, and spectrum analyzer',
      fr: 'Plateforme open-hardware combinant oscilloscope, générateur de signaux et analyseur'
    },
    language: 'C',
    tags: ['oscilloscope', 'signal-generator', 'spectrum-analyzer', 'open-hardware'],
    links: {
      github: 'https://github.com/RedPitaya/RedPitaya',
      website: 'https://www.redpitaya.com'
    },
  },
  {
    id: 'tinysa',
    name: 'tinySA',
    category: 'Hardware Devices',
    description: {
      en: 'Ultra-portable spectrum analyzer for RF testing and measurement',
      fr: 'Analyseur de spectre ultra-portable pour les tests et mesures RF'
    },
    tags: ['spectrum-analyzer', 'rf', 'portable', 'hardware'],
    links: {
      website: 'https://www.tinysa.org'
    },
  },

  // Hardware Mocking
  {
    id: 'pyvisa-sim',
    name: 'PyVISA-sim',
    category: 'Hardware Mocking',
    description: {
      en: 'VISA instrument simulator for testing without physical hardware',
      fr: 'Simulateur d\'instruments VISA pour tester sans matériel physique'
    },
    language: 'Python',
    tags: ['visa', 'simulation', 'mocking', 'testing'],
    links: {
      github: 'https://github.com/pyvisa/pyvisa-sim'
    },
  },
  {
    id: 'umockdev',
    name: 'umockdev',
    category: 'Hardware Mocking',
    description: {
      en: 'Linux device mocking framework for hardware integration testing',
      fr: 'Framework de simulation de périphériques Linux pour les tests d\'intégration'
    },
    language: 'C',
    tags: ['linux', 'mocking', 'devices', 'integration'],
    links: {
      github: 'https://github.com/martinpitt/umockdev'
    },
  },

  // Test Suites
  {
    id: 'ltp',
    name: 'Linux Test Project',
    category: 'Test Suites',
    description: {
      en: 'Comprehensive test suite for Linux kernel validation and regression testing',
      fr: 'Suite de tests complète pour la validation et les tests de régression du noyau Linux'
    },
    language: 'C',
    tags: ['linux', 'kernel', 'stress-testing', 'regression'],
    links: {
      github: 'https://github.com/linux-test-project/ltp'
    }
  },
  {
    id: 'stress-ng',
    name: 'stress-ng',
    category: 'Test Suites',
    description: {
      en: 'System stress testing tool for CPU, memory, I/O, and network load testing',
      fr: 'Outil de test de stress système pour CPU, mémoire, E/S et tests de charge réseau'
    },
    language: 'C',
    tags: ['stress-testing', 'cpu', 'memory', 'disk', 'system'],
    links: {
      github: 'https://github.com/ColinIanKing/stress-ng'
    }
  },
  // Add missing resources from resources.ts
  {
    id: 'htf',
    name: 'htf',
    category: 'Test Execution Engines',
    description: {
      en: 'ISO-certified Python framework for medical device testing and CI/CD automation',
      fr: 'Framework Python certifié ISO pour les tests de dispositifs médicaux et l\'automatisation CI/CD'
    },
    language: 'Python',
    tags: ['medical', 'iso', 'ci-cd', 'automated'],
    links: {
      github: 'https://github.com/Siemens/htf'
    },
  },
  {
    id: 'octoprobe',
    name: 'octoprobe',
    category: 'Test Execution Engines',
    description: {
      en: 'Automated testing framework for MicroPython boards and peripheral devices',
      fr: 'Framework de tests automatisés pour cartes MicroPython et périphériques'
    },
    language: 'Python',
    tags: ['micropython', 'boards', 'embedded', 'automated'],
    links: {
      github: 'https://github.com/hmaerki/octoprobe'
    },
  },
  {
    id: 'sopic',
    name: 'sopic',
    category: 'Test Execution Engines',
    description: {
      en: 'Python helper library for production line test station automation',
      fr: 'Bibliothèque Python d\'aide pour l\'automatisation de stations de test en production'
    },
    language: 'Python',
    tags: ['production', 'test-station', 'manufacturing', 'helper'],
    links: {
      github: 'https://github.com/Semi-ATE/sopic'
    },
  },
  {
    id: 'treeate',
    name: 'TreeATE',
    category: 'Test Execution Engines',
    description: {
      en: 'Factory automation platform for product testing (Chinese language support)',
      fr: 'Plateforme d\'automatisation d\'usine pour les tests de produits (support chinois)'
    },
    language: 'C++',
    tags: ['chinese', 'factory', 'automation', 'platform'],
    links: {
      github: 'https://github.com/WilliamYinwei/TreeATE'
    },
    unmaintained: true,
    unmaintainedReason: 'TreeATE has not received updates since 2022. While the factory automation platform still functions, it lacks support for modern testing protocols and newer hardware interfaces. The Chinese-language documentation may also limit adoption outside of specific regions.',
    recommendedReplacements: [
      { id: 'openhtf', name: 'OpenHTF', reason: 'Comprehensive test execution framework' },
      { id: 'exclave', name: 'Exclave', reason: 'Rust-based factory test runner' }
    ],
  },
  {
    id: 'pytest-embedded',
    name: 'pytest-embedded',
    category: 'Test Execution Engines',
    description: {
      en: 'Pytest plugin for automated embedded system testing and validation',
      fr: 'Plugin pytest pour les tests et la validation automatisés de systèmes embarqués'
    },
    language: 'Python',
    tags: ['pytest', 'embedded', 'plugin', 'espressif'],
    links: {
      github: 'https://github.com/espressif/pytest-embedded'
    },
  }
];

export const categories: TestCategory[] = [
  'Test Execution Engines',
  'Test Database & Analytics', 
  'Instrument Interface', 
  'Wafer Maps',
  'Hardware Devices',
  'Hardware Mocking',
  'Test Suites',
  'Videos & Resources'
];

export const categoryIcons = {
  "Test Execution Engines": "Zap",
  "Test Database & Analytics": "Database",
  "Instrument Interface": "Cable",
  "Wafer Maps": "Map",
  "Hardware Devices": "HardDrive",
  "Hardware Mocking": "TestTube",
  "Test Suites": "Package",
  "Videos & Resources": "BookOpen",
};

export function getItemsByCategory(category: TestCategory): HardwareTestResource[] {
  return hardwareTestData.filter(item => item.category === category);
}

export function searchHardwareTest(query: string, lang: 'en' | 'fr' = 'en'): HardwareTestResource[] {
  const lowercaseQuery = query.toLowerCase();
  return hardwareTestData.filter(item => {
    const description = typeof item.description === 'object' ? item.description[lang] : item.description;
    return item.name.toLowerCase().includes(lowercaseQuery) ||
           description.toLowerCase().includes(lowercaseQuery) ||
           item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
           (item.language && item.language.toLowerCase().includes(lowercaseQuery));
  });
}