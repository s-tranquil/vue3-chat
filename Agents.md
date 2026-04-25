# Agents Instructions

## Objective
Support and evolve a Vue 3 chat SPA using Composition API, Pinia, Vue Router, and the Naive UI framework.

## Workflow
1. Keep the application modular with clear boundaries: `components/`, `stores/`, `composables/`, `views/`.
2. Use Pinia for chat/message state and isolate business logic from presentation.
3. Keep routing stable: i.e. load chats by `/chat/:id` and sync active chat state with route params.
4. Maintain input validation, accessibility, and responsive UI behavior.
5. Use Naive UI components for sidebar, cards, forms, buttons, and layout.
6. Encapsulate reusable logic in composables and add async behavior where it improves user flow.

## Goals
- Keep the app maintainable and easy to extend.
- Ensure chat state remains consistent across route changes and page refreshes.
- Support incremental improvements without breaking existing interactions.
- Add user-friendly behavior such as auto-response, chat creation, and validation.
- Prefer small reusable components and clear separation of concerns.

## Notes
- Write clean, idiomatic Vue 3 Composition API code.
- Avoid monolithic views by breaking UI into reusable components.
