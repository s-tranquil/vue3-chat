<script setup lang="ts">
import { computed, inject, h } from "vue";
import { NMenu, NButton, NEmpty } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useChatStore } from "../../../store/chat/chat";
import { sidebarKey } from "./keys";
import styles from "./styles.module.css";

const { activeId, handleSelect } = inject(sidebarKey)!;
const chatStore = useChatStore();

const options = computed<MenuOption[]>(() =>
    chatStore.chats
        .filter(chat => chat.isFavorite)
        .map(chat => ({
            key: chat.id,
            label: () => h("div", { class: styles.row }, [
                h("span", { class: styles.title }, chat.title),
                h(NButton, {
                    text: true,
                    type: "warning",
                    class: styles.star,
                    onClick: (e: MouseEvent) => {
                        e.stopPropagation();
                        chatStore.toggleFavorite(chat.id);
                    },
                }, { default: () => "★" }),
            ]),
        }))
);

function onSelect(key: string | number) {
    handleSelect(String(key));
}
</script>

<template>
    <NMenu v-if="options.length" :options="options" :value="activeId" @update:value="onSelect" />
    <NEmpty v-else class="empty" description="No favorites yet" />
</template>

<style scoped>
.empty {
    padding: 16px 0;
}
</style>
