<script setup lang="ts">
import { computed, inject, h } from "vue";
import { NMenu, NButton } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useChatStore } from "../../../store/chat/chat";
import { sidebarKey } from "./keys";
import styles from "./styles.module.css";

const { activeId, handleSelect } = inject(sidebarKey)!;
const chatStore = useChatStore();

const options = computed<MenuOption[]>(() =>
    chatStore.chats.map(chat => {
        const isFavorite = chat.isFavorite ?? false;
        return {
            key: chat.id,
            label: () => h("div", { class: styles.row }, [
                h("span", { class: styles.title }, chat.title),
                h(NButton, {
                    text: true,
                    type: isFavorite ? "warning" : "default",
                    class: styles.star,
                    onClick: (e: MouseEvent) => {
                        e.stopPropagation();
                        chatStore.toggleFavorite(chat.id);
                    },
                }, { default: () => isFavorite ? "★" : "☆" }),
            ]),
        };
    })
);

function onSelect(key: string | number) {
    handleSelect(String(key));
}
</script>

<template>
    <NMenu :options="options" :value="activeId" @update:value="onSelect" />
</template>
