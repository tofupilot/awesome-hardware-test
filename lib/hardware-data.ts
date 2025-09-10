export interface HardwareItem {
  id: string;
  name: string;
  category: HardwareCategory;
  description: string;
  specifications: Record<string, string>;
  priceRange?: {
    min: number;
    max: number;
    currency: string;
  };
  tags: string[];
  links: {
    official?: string;
    reviews?: string[];
    purchase?: string[];
  };
  testResults?: {
    benchmark?: string;
    score?: number;
    notes?: string;
  };
}

export type HardwareCategory = 
  | 'CPU' 
  | 'GPU' 
  | 'Motherboard' 
  | 'RAM' 
  | 'Storage' 
  | 'PSU' 
  | 'Cooling' 
  | 'Case' 
  | 'Monitor' 
  | 'Audio' 
  | 'Network';

export const hardwareData: HardwareItem[] = [
  {
    id: 'amd-ryzen-9-7950x',
    name: 'AMD Ryzen 9 7950X',
    category: 'CPU',
    description: 'High-performance 16-core processor for enthusiasts and professionals',
    specifications: {
      'Cores': '16',
      'Threads': '32',
      'Base Clock': '4.5 GHz',
      'Boost Clock': '5.7 GHz',
      'TDP': '170W',
      'Socket': 'AM5',
      'Architecture': 'Zen 4'
    },
    priceRange: {
      min: 599,
      max: 699,
      currency: 'USD'
    },
    tags: ['high-performance', 'gaming', 'workstation', 'content-creation'],
    links: {
      official: 'https://www.amd.com/en/products/cpu/amd-ryzen-9-7950x',
      reviews: [
        'https://www.anandtech.com/show/17585/amd-zen-4-ryzen-9-7950x-and-ryzen-5-7600x-review-retaking-the-high-end',
        'https://www.tomshardware.com/reviews/amd-ryzen-9-7950x-review'
      ]
    },
    testResults: {
      benchmark: 'Cinebench R23',
      score: 38000,
      notes: 'Excellent multi-threaded performance'
    }
  },
  {
    id: 'nvidia-rtx-4090',
    name: 'NVIDIA GeForce RTX 4090',
    category: 'GPU',
    description: 'Flagship graphics card for 4K gaming and professional workloads',
    specifications: {
      'CUDA Cores': '16384',
      'RT Cores': '128',
      'Tensor Cores': '512',
      'Base Clock': '2230 MHz',
      'Memory': '24GB GDDR6X',
      'Memory Bus': '384-bit',
      'TDP': '450W'
    },
    priceRange: {
      min: 1599,
      max: 1999,
      currency: 'USD'
    },
    tags: ['flagship', '4k-gaming', 'ray-tracing', 'ai-workload'],
    links: {
      official: 'https://www.nvidia.com/en-us/geforce/graphics-cards/40-series/rtx-4090/',
      reviews: [
        'https://www.techpowerup.com/review/nvidia-geforce-rtx-4090-founders-edition/'
      ]
    }
  },
  {
    id: 'asus-rog-strix-x670e-e',
    name: 'ASUS ROG Strix X670E-E Gaming WiFi',
    category: 'Motherboard',
    description: 'Premium AM5 motherboard with extensive connectivity and overclocking features',
    specifications: {
      'Socket': 'AM5',
      'Chipset': 'X670E',
      'RAM Slots': '4 x DDR5',
      'Max RAM': '128GB',
      'PCIe Slots': '4 x PCIe 5.0',
      'M.2 Slots': '4',
      'WiFi': 'WiFi 6E',
      'Ethernet': '2.5GbE'
    },
    priceRange: {
      min: 499,
      max: 599,
      currency: 'USD'
    },
    tags: ['premium', 'overclocking', 'wifi-6e', 'multi-gpu'],
    links: {
      official: 'https://rog.asus.com/motherboards/rog-strix/rog-strix-x670e-e-gaming-wifi-model/'
    }
  },
  {
    id: 'corsair-dominator-ddr5-5600',
    name: 'Corsair Dominator Platinum RGB DDR5-5600',
    category: 'RAM',
    description: 'High-performance DDR5 memory with premium cooling and RGB lighting',
    specifications: {
      'Capacity': '32GB (2x16GB)',
      'Speed': 'DDR5-5600',
      'Timings': 'CL36-36-36-76',
      'Voltage': '1.25V',
      'RGB': 'Yes',
      'Heat Spreader': 'Aluminum'
    },
    priceRange: {
      min: 299,
      max: 399,
      currency: 'USD'
    },
    tags: ['high-speed', 'rgb', 'premium', 'overclocking'],
    links: {
      official: 'https://www.corsair.com/us/en/Categories/Products/Memory/DOMINATOR-PLATINUM-RGB-DDR5-Memory/p/CMT32GX5M2B5600C36'
    }
  },
  {
    id: 'samsung-980-pro-2tb',
    name: 'Samsung 980 PRO 2TB',
    category: 'Storage',
    description: 'High-performance NVMe SSD with excellent sustained performance',
    specifications: {
      'Capacity': '2TB',
      'Interface': 'PCIe 4.0 x4',
      'Form Factor': 'M.2 2280',
      'Sequential Read': '7,000 MB/s',
      'Sequential Write': '6,900 MB/s',
      'Random Read': '1,000K IOPS',
      'Random Write': '1,000K IOPS',
      'Endurance': '1,200 TBW'
    },
    priceRange: {
      min: 149,
      max: 199,
      currency: 'USD'
    },
    tags: ['nvme', 'pcie4', 'high-performance', 'gaming'],
    links: {
      official: 'https://www.samsung.com/us/computing/memory-storage/solid-state-drives/980-pro-pcie-4-0-nvme-ssd-2tb-mz-v8p2t0b-am/'
    }
  }
];

export const categories: HardwareCategory[] = [
  'CPU', 'GPU', 'Motherboard', 'RAM', 'Storage', 'PSU', 'Cooling', 'Case', 'Monitor', 'Audio', 'Network'
];

export function getItemsByCategory(category: HardwareCategory): HardwareItem[] {
  return hardwareData.filter(item => item.category === category);
}

export function searchHardware(query: string): HardwareItem[] {
  const lowercaseQuery = query.toLowerCase();
  return hardwareData.filter(item => 
    item.name.toLowerCase().includes(lowercaseQuery) ||
    item.description.toLowerCase().includes(lowercaseQuery) ||
    item.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
}