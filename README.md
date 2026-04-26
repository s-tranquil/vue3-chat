# Vue 3 Chat

A chat prototype built with Vue 3 and TypeScript that simulates a conversation with a bot. Messages are sent with a short delay, and the bot replies automatically after a pause — mimicking a real async chat experience.

**Live demo:** [vue3-chat-topaz.vercel.app](https://vue3-chat-topaz.vercel.app)

## Features

- **Multi-chat sidebar** — switch between chats, create new ones
- **Favorites** — star any chat to pin it in the Favorites tab
- **Persistent state** — chats and messages survive page refresh via localStorage
- **Bot replies** — every message you send gets an automatic bot response after a 1–2s delay
- **Virtual scrolling** — chat history renders only visible messages, handles thousands of items smoothly

## Tech stack

- [Vue 3](https://vuejs.org/) with `<script setup>` and Composition API
- [TypeScript](https://www.typescriptlang.org/)
- [Pinia](https://pinia.vuejs.org/) for state management with localStorage persistence
- [Vue Router](https://router.vuejs.org/)
- [Naive UI](https://www.naiveui.com/) component library
- [@tanstack/vue-virtual](https://tanstack.com/virtual) for virtual scrolling
- [Vite](https://vite.dev/) + [Vitest](https://vitest.dev/) for build and testing

## Getting started

```bash
npm install
npm run dev
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server |
| `npm run build` | Type-check and build for production |
| `npm run typecheck` | Run TypeScript checks |
| `npm run lint` | Lint with ESLint |
| `npm test` | Run unit tests with Vitest |
