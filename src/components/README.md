# Components Structure

## Overview

This directory contains all reusable UI components for the LMS application, organized into three main categories.

## Directory Structure

```
src/components/
├── ui/           # Base UI components (shadcn/ui based)
├── features/     # Feature-specific components
└── layout/       # Layout and navigation components
```

## Categories

### 1. UI Components (`./ui/`)

Base reusable components built on top of shadcn/ui design system.

| Component | Description |
|-----------|-------------|
| **Accordion** | Collapsible content sections |
| **Alert** | Notification messages with different severity levels |
| **Avatar** | User profile images with fallback support |
| **Badge** | Status indicators and labels |
| **Breadcrumb** | Navigation path indicators |
| **Button** | Interactive button with variants (default, outline, ghost, link) |
| **Calendar** | Date picker component |
| **Card** | Container for content with header, content, and footer |
| **Carousel** | Image/content slider |
| **Checkbox** | Binary selection input |
| **Command** | Command palette component |
| **ContextMenu** | Right-click menu |
| **Dialog** | Modal dialog overlay |
| **Drawer** | Slide-out panel |
| **Input** | Text input field |
| **Label** | Form label |
| **Loader** | Loading spinner |
| **Menu** | Dropdown menu |
| **Popover** | Floating content container |
| **Progress** | Progress bar indicator |
| **Radio** | Single selection from options |
| **Select** | Dropdown selection |
| **Slider** | Range input control |
| **Sonner** | Toast notifications |
| **Switch** | Toggle switch |
| **Tab** | Tabbed content navigation |
| **Table** | Data table with sorting |
| **TableOfContents** | Auto-generated table of contents |
| **Text** | Typography component |
| **Textarea** | Multi-line text input |
| **Toggle** | Single toggle button |
| **ToggleGroup** | Group of toggle buttons |
| **Tooltip** | Hover information popup |

#### Charts (`./ui/charts/`)

| Component | Description |
|-----------|-------------|
| **AreaChart** | Area/region chart visualization |
| **BarChart** | Bar chart visualization |
| **LineChart** | Line chart visualization |
| **PieChart** | Pie chart visualization |

### 2. Feature Components (`./features/`)

Business-specific components for the LMS domain.

| Component | Description |
|-----------|-------------|
| **StatsCard** | Dashboard statistics card showing title, value, change percentage, and icon |

### 3. Layout Components (`./layout/`)

Components related to page structure and navigation.

| Component | Description |
|-----------|-------------|
| **LanguageSwitcher** | Language selection dropdown (i18n) |
| **LayoutHeader** | Main application header |
| **Logo** | Application logo |
| **ResponsiveTabs** | Tab navigation that adapts to screen size |
| **ThemeToggle** | Dark/light theme switcher |

## Barrel Exports

Each folder contains an `index.ts` file that exports all components for convenient importing:

```typescript
// Import from category
import { Button, Card, Dialog } from "@/components/ui";
import { StatsCard } from "@/components/features";
import { LayoutHeader, ThemeToggle } from "@/components/layout";

// Or import individual components
import Button from "@/components/ui/Button";
```

## Usage Guidelines

- **UI Components**: Use for generic, reusable interface elements
- **Feature Components**: Use for domain-specific business logic components
- **Layout Components**: Use for structural elements that appear across pages

All components support dark mode via Tailwind CSS dark variants.
