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