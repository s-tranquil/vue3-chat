import type { PiniaPluginContext } from "pinia";

export function persistedState({ store }: PiniaPluginContext) {
    const key = `vue3-chat:${store.$id}`;
    const saved = localStorage.getItem(key);
    if (saved) {
        try {
            store.$patch(JSON.parse(saved));
        } catch (e) {
            // eslint-disable-next-line no-console
            console.error(`[persist] Failed to restore store "${store.$id}":`, e);
            localStorage.removeItem(key);
        }
    }
    store.$subscribe((_, state) => {
        localStorage.setItem(key, JSON.stringify(state));
    });
}
