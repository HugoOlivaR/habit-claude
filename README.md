# DailyHabit

A minimalist habit and task tracker for macOS.

![DailyHabit Screenshot](design.jpeg)

## Features

- **Organize by time** - Group tasks into Morning, Workload, Night, or custom categories
- **Build habits** - Create daily, weekly, or custom recurring habits
- **Track progress** - See completion rates and day streaks
- **Dark mode** - Beautiful in light or dark, follows system preference
- **Privacy first** - All data stays on your device, no accounts required

## Download

Download the latest release from the [Releases page](https://github.com/yourusername/DailyHabit/releases).

Requires macOS 10.15 or later.

## Development

### Prerequisites

- [Node.js](https://nodejs.org/) 20+
- [Rust](https://www.rust-lang.org/tools/install)

### Setup

```bash
# Install dependencies
npm install

# Run in development
npm run tauri dev

# Build for production
npm run build:release
```

### Scripts

| Command                 | Description                   |
| ----------------------- | ----------------------------- |
| `npm run dev`           | Start Vite dev server         |
| `npm run tauri dev`     | Run native app in development |
| `npm run build:release` | Build production app (.dmg)   |
| `npm run icons`         | Regenerate app icons from SVG |

## Landing Page

The `landing/` folder contains a static landing page that can be deployed to Vercel.

### Deploy to Vercel

1. Create a new project in [Vercel](https://vercel.com)
2. Set the root directory to `landing`
3. Deploy

Or use the Vercel CLI:

```bash
cd landing
vercel
```

### Update download links

Edit `landing/index.html` and replace:

- `yourusername` with your GitHub username
- Update the release URL to point to your GitHub releases

## Release Process

1. Build the app:

   ```bash
   npm run build:release
   ```

2. The `.dmg` file will be in `src-tauri/target/release/bundle/dmg/`

3. Create a GitHub release and upload the `.dmg` file

4. Update the landing page download link to point to the release

## Tech Stack

- **Runtime**: Tauri v2
- **Frontend**: React 18 + TypeScript
- **Styling**: Tailwind CSS v4
- **State**: Zustand
- **Storage**: Tauri Store Plugin (local JSON)

## License

MIT
