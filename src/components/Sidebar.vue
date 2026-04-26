<script setup lang="ts">
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NCard, NMenu } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useChatStore } from "../stores/chat/chat";

const DEFAULT_CHAT_ID = "1";

const route = useRoute();
const router = useRouter();
const chatStore = useChatStore();
const activeId = computed(() => String(route.params.id || DEFAULT_CHAT_ID));

const menuOptions = computed<MenuOption[]>(() =>
    chatStore.chats.map(chat => ({
        label: chat.title,
        key: chat.id,
    }))
);

function handleSelect(key: string) {
    router.push(`/chat/${key}`);
}
</script>

<template>
    <aside class="sidebar">
        <NCard title="Chats" :content-style="{ padding: '8px 0' }">
            <NMenu
                :options="menuOptions"
                :value="activeId"
                @update:value="handleSelect"
            />
        </NCard>
    </aside>
</template>
