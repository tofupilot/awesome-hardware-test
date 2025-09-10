# Awesome Hardware Test

A curated list of tested hardware components with benchmarks and reviews. Built with Next.js and shadcn/ui.

## Features

- 🔍 **Search & Filter**: Find hardware by name, description, or tags
- 📊 **Benchmark Results**: View test scores and performance data
- 🏷️ **Categorized**: Organized by hardware type (CPU, GPU, RAM, etc.)
- 📱 **Responsive Design**: Works on desktop and mobile devices
- 🌙 **Dark Mode**: Automatic dark/light mode based on system preference
- 🔗 **External Links**: Direct links to official pages and reviews

## Hardware Categories

- **CPU**: Processors from AMD, Intel
- **GPU**: Graphics cards from NVIDIA, AMD
- **Motherboard**: Mainboards for different sockets
- **RAM**: Memory modules (DDR4, DDR5)
- **Storage**: SSDs, HDDs, NVMe drives
- **PSU**: Power supply units
- **Cooling**: Air and liquid cooling solutions
- **Case**: Computer cases and enclosures
- **Monitor**: Displays and screens
- **Audio**: Sound cards and audio equipment
- **Network**: Network cards and adapters

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm, yarn, or pnpm

### Installation

1. Clone the repository:
```bash
git clone https://github.com/your-username/awesome-hardware-test.git
cd awesome-hardware-test
```

2. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
├── app/                    # Next.js app directory
│   ├── globals.css        # Global styles with shadcn/ui variables
│   ├── layout.tsx         # Root layout component
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # shadcn/ui components
│   ├── hardware-card.tsx # Hardware item card component
│   └── hardware-list.tsx # Main list component with search/filter
├── lib/                  # Utility functions and data
│   ├── hardware-data.ts  # Hardware data and types
│   └── utils.ts          # Utility functions
└── public/               # Static assets
```

## Adding New Hardware

To add new hardware items, edit the `hardwareData` array in `lib/hardware-data.ts`:

```typescript
{
  id: 'unique-id',
  name: 'Hardware Name',
  category: 'CPU' | 'GPU' | 'Motherboard' | 'RAM' | 'Storage' | 'PSU' | 'Cooling' | 'Case' | 'Monitor' | 'Audio' | 'Network',
  description: 'Brief description',
  specifications: {
    'Key Spec': 'Value',
    // ... more specs
  },
  priceRange: {
    min: 100,
    max: 200,
    currency: 'USD'
  },
  tags: ['tag1', 'tag2'],
  links: {
    official: 'https://...',
    reviews: ['https://...'],
    purchase: ['https://...']
  },
  testResults: {
    benchmark: 'Test Name',
    score: 12345,
    notes: 'Additional notes'
  }
}
```

## Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) with App Router
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **TypeScript**: Full type safety

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major changes, please open an issue first to discuss what you would like to change.

## License

This project is licensed under the MIT License.
