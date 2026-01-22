# DevLearn - Open Source Tutorial Blog

<div align="center">
  <h3>🚀 Learn Modern Web Development</h3>
  <p>Free, high-quality tutorials for Next.js, React, Tailwind CSS, TypeScript, and more.</p>
</div>

---

## ✨ Features

- 📚 **Rich Tutorial Content** - Comprehensive tutorials with code examples
- 🎨 **Beautiful UI** - Modern, responsive design with dark mode support
- 🔍 **Search** - Full-text search across all tutorials (Ctrl/Cmd + K)
- 🏷️ **Categorized** - Tutorials organized by technology and difficulty
- 📱 **Mobile-First** - Fully responsive design
- ⚡ **Fast** - Built with Next.js 16 App Router and React Server Components
- 🌙 **Dark Mode** - System-aware theme switching
- 📖 **MDX Support** - Write tutorials in Markdown with JSX components
- 🎯 **Syntax Highlighting** - Beautiful code blocks with Shiki

## 🛠️ Tech Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Content**: MDX with next-mdx-remote
- **Syntax Highlighting**: Shiki
- **Icons**: Lucide React

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- npm, yarn, or pnpm

### Installation

1. Clone the repository:

```bash
git clone https://github.com/tatineeeeeee/devlearn.git
cd devlearn
```

2. Install dependencies:

```bash
npm install
```

3. Run the development server:

```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── about/             # About page
│   ├── categories/        # Categories page
│   ├── tutorials/         # Tutorial pages
│   │   ├── [category]/    # Category pages
│   │   │   └── [slug]/    # Individual tutorial pages
│   └── layout.tsx         # Root layout
├── components/            # React components
├── content/              # Tutorial content (MDX)
│   └── tutorials/
│       ├── nextjs/
│       ├── react/
│       ├── tailwind/
│       └── typescript/
├── lib/                  # Utility functions
│   ├── mdx.ts           # MDX processing
│   ├── tutorials.ts     # Tutorial data helpers
│   └── utils.ts         # General utilities
└── public/              # Static assets
```

## ✍️ Adding Tutorials

1. Create a new `.mdx` file in the appropriate category folder:

```
content/tutorials/[category]/[slug].mdx
```

2. Add frontmatter at the top:

```yaml
---
title: "Your Tutorial Title"
description: "A brief description of your tutorial"
date: "2026-01-20"
author: "Your Name"
tags: ["tag1", "tag2"]
difficulty: "beginner" | "intermediate" | "advanced"
featured: true | false
---
```

3. Write your content in MDX format with code examples!

## 🎨 Customization

### Colors

Modify the color palette in `tailwind.config.js` or use Tailwind's built-in colors.

### Categories

Add new categories by creating folders in `content/tutorials/` and updating the `categoryMeta` in `components/CategoryGrid.tsx`.

## 🤝 Contributing

Contributions are welcome! Here's how you can help:

1. **Write Tutorials** - Share your knowledge with the community
2. **Fix Bugs** - Help improve the codebase
3. **Improve UI/UX** - Make the site better for everyone
4. **Documentation** - Help others understand the project

### Steps to Contribute

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-tutorial`)
3. Commit your changes (`git commit -m 'Add amazing tutorial'`)
4. Push to the branch (`git push origin feature/amazing-tutorial`)
5. Open a Pull Request

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## ⭐ Support

If you find this project useful, please consider:

- Giving it a star on GitHub ⭐
- Sharing it with others
- Contributing tutorials or improvements

---

<div align="center">
  Made with ❤️ by the DevLearn community
</div>
