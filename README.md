# Todo Flow

A modern Todo List application built with Next.js, TypeScript, React, and Tailwind CSS.

## Features

- Add new tasks
- Mark tasks as complete or incomplete
- Edit existing tasks
- Delete tasks
- Filter tasks by All, Active, and Completed
- View total and completed task counts
- Persist todos with localStorage
- Responsive UI for mobile and desktop

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS

## Getting Started

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Production Checks

Before finishing changes, run:

```bash
npm run lint
npm run build
```

## Project Structure

```text
app/
  components/
    filter-tabs.tsx
    stat-card.tsx
    todo-app.tsx
    todo-form.tsx
    todo-item.tsx
    todo-list.tsx
  globals.css
  layout.tsx
  page.tsx
```
