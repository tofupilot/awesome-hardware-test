export interface HardwareTestResource {
  id: string;
  name: string;
  category: TestCategory;
  description: string;
  language?: string;
  license?: string;
  tags: string[];
  links: {
    github?: string;
    website?: string;
    docs?: string;
  };
  isCommercial?: boolean;
  features?: string[];
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
    description: 'Command and Real-time Acquisition in Parallelized PYthon - a framework to control hardware tests',
    language: 'Python',
    tags: ['python', 'real-time', 'acquisition', 'parallel'],
    links: {
      github: 'https://github.com/LaboratoireMecaniqueLille/crappy'
    }
  },
  {
    id: 'exclave',
    name: 'exclave',
    category: 'Test Execution Engines',
    description: 'A factory test infrastructure, written in Rust',
    language: 'Rust',
    tags: ['rust', 'factory', 'infrastructure', 'testing'],
    links: {
      github: 'https://github.com/exclave/exclave'
    }
  },
  {
    id: 'flojoy-studio',
    name: 'Flojoy Studio',
    category: 'Test Execution Engines',
    description: 'Desktop visual scripting IDE for running Python scripts - primarily for DAQ, test benches, robotics control, and no-code embedded systems',
    language: 'Python',
    tags: ['visual-scripting', 'daq', 'robotics', 'no-code'],
    links: {
      github: 'https://github.com/flojoy-ai/studio'
    }
  },
  {
    id: 'openhtf',
    name: 'openhtf',
    category: 'Test Execution Engines',
    description: 'The open-source hardware testing framework, Google affiliated',
    language: 'Python',
    tags: ['google', 'framework', 'open-source', 'manufacturing'],
    links: {
      github: 'https://github.com/google/openhtf'
    }
  },
  {
    id: 'hardpy',
    name: 'HardPy',
    category: 'Test Execution Engines',
    description: 'A python library for creating pytest based test benches for devices, running them through a browser, and storing the results in a database',
    language: 'Python',
    tags: ['pytest', 'browser', 'database', 'test-bench'],
    links: {
      github: 'https://github.com/everypinio/hardpy'
    }
  },
  {
    id: 'robotframework',
    name: 'Robot Framework',
    category: 'Test Execution Engines',
    description: 'Generic open source automation framework for acceptance testing, acceptance test driven development (ATDD), and robotic process automation (RPA)',
    language: 'Python',
    tags: ['automation', 'atdd', 'rpa', 'acceptance-testing'],
    links: {
      github: 'https://github.com/robotframework/robotframework',
      website: 'https://robotframework.org'
    }
  },
  {
    id: 'opentap',
    name: 'OpenTAP',
    category: 'Test Execution Engines',
    description: 'Open Source Test Automation Platform for creating, executing, and analyzing test sequences',
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
    description: 'pytest plugin for testing Qt applications',
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
    description: 'Measurement automation made easy',
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
    description: 'Modular Automated Test System for hardware-in-the-loop testing',
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
    description: 'Linaro Automated Validation Architecture for automated testing of deployed software',
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
    description: 'Plug-and-play database with Pytest integration for hardware testing',
    isCommercial: true,
    tags: ['database', 'pytest', 'analytics', 'commercial'],
    links: {
      website: 'https://tofupilot.com'
    }
  },
  {
    id: 'yieldhub',
    name: 'yieldHUB',
    category: 'Test Database & Analytics',
    description: 'Analytics platform for semiconductor testing',
    isCommercial: true,
    tags: ['semiconductor', 'analytics', 'yield', 'commercial'],
    links: {
      website: 'https://yieldhub.com'
    }
  },

  // Instrument Interface
  {
    id: 'pyvisa',
    name: 'PyVISA',
    category: 'Instrument Interface',
    description: 'Python package to control measurement devices via VISA',
    language: 'Python',
    tags: ['visa', 'instruments', 'control', 'measurement'],
    links: {
      github: 'https://github.com/pyvisa/pyvisa',
      docs: 'https://pyvisa.readthedocs.io'
    }
  },
  {
    id: 'test-controller',
    name: 'Test Controller',
    category: 'Instrument Interface',
    description: 'Software for logging, storing device data and configuration from laboratory devices via TCP/IP, UDP, and Serial interfaces',
    language: 'Python',
    tags: ['logging', 'tcp-ip', 'udp', 'serial', 'configuration'],
    links: {
      github: 'https://github.com/TUBvision/test_controller'
    }
  },

  // Wafer Maps
  {
    id: 'wafer-map',
    name: 'wafer-map',
    category: 'Wafer Maps',
    description: 'Semiconductor Wafer Mapping in Python',
    language: 'Python',
    tags: ['semiconductor', 'wafer', 'mapping', 'visualization'],
    links: {
      github: 'https://github.com/dougthor42/wafer_map'
    }
  },
  {
    id: 'py-wdf-reader',
    name: 'py-wdf-reader',
    category: 'Wafer Maps',
    description: 'Python library for reading Renishaw WDF files',
    language: 'Python',
    tags: ['wdf', 'renishaw', 'spectroscopy', 'reader'],
    links: {
      github: 'https://github.com/alchem0x2A/py-wdf-reader'
    }
  },
  {
    id: 'waferthin',
    name: 'waferthin',
    category: 'Wafer Maps',
    description: 'A Python library for semiconductor wafer mapping and analysis',
    language: 'Python',
    tags: ['wafer', 'mapping', 'analysis', 'semiconductor'],
    links: {
      github: 'https://github.com/MatthewTheGhoul/waferthin'
    }
  },

  // Hardware Devices
  {
    id: 'nanovna-saver',
    name: 'NanoVNA-Saver',
    category: 'Hardware Devices',
    description: 'Tool for reading, displaying and saving data from the NanoVNA vector network analyzer',
    language: 'Python',
    tags: ['nanovna', 'vna', 'network-analyzer', 'rf'],
    links: {
      github: 'https://github.com/NanoVNA-Saver/nanovna-saver'
    }
  },
  {
    id: 'red-pitaya',
    name: 'Red Pitaya',
    category: 'Hardware Devices',
    description: 'Open source test and measurement platform',
    language: 'C',
    tags: ['oscilloscope', 'signal-generator', 'spectrum-analyzer', 'open-hardware'],
    links: {
      github: 'https://github.com/RedPitaya/RedPitaya',
      website: 'https://www.redpitaya.com'
    }
  },
  {
    id: 'tinysa',
    name: 'tinySA',
    category: 'Hardware Devices',
    description: 'Tiny Spectrum Analyzer - ultra portable RF test equipment',
    tags: ['spectrum-analyzer', 'rf', 'portable', 'hardware'],
    links: {
      website: 'https://www.tinysa.org'
    }
  },

  // Hardware Mocking
  {
    id: 'pyvisa-sim',
    name: 'PyVISA-sim',
    category: 'Hardware Mocking',
    description: 'Simulates Virtual Instrument Software Architecture (VISA) for testing purposes',
    language: 'Python',
    tags: ['visa', 'simulation', 'mocking', 'testing'],
    links: {
      github: 'https://github.com/pyvisa/pyvisa-sim'
    }
  },
  {
    id: 'umockdev',
    name: 'umockdev',
    category: 'Hardware Mocking',
    description: 'Mocks Linux devices for integration testing',
    language: 'C',
    tags: ['linux', 'mocking', 'devices', 'integration'],
    links: {
      github: 'https://github.com/martinpitt/umockdev'
    }
  },

  // Test Suites
  {
    id: 'ltp',
    name: 'Linux Test Project',
    category: 'Test Suites',
    description: 'Test suite for the Linux kernel and related features',
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
    description: 'Stress test tool that exercises various stress tests on a computer system',
    language: 'C',
    tags: ['stress-testing', 'cpu', 'memory', 'disk', 'system'],
    links: {
      github: 'https://github.com/ColinIanKing/stress-ng'
    }
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

export function getItemsByCategory(category: TestCategory): HardwareTestResource[] {
  return hardwareTestData.filter(item => item.category === category);
}

export function searchHardwareTest(query: string): HardwareTestResource[] {
  const lowercaseQuery = query.toLowerCase();
  return hardwareTestData.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery)) ||
    (item.language && item.language.toLowerCase().includes(lowercaseQuery))
  );
}