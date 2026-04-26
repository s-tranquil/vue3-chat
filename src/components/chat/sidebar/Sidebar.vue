<script setup lang="ts">
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NCard, NMenu, NButton } from "naive-ui";
import type { MenuOption } from "naive-ui";
import { useChatStore } from "../../../store/chat/chat";
import { DEFAULT_CHAT_ID } from "../../../constants";
import NewChatModal from "./NewChatModal.vue";

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

const showModal = ref(false);

function handleCreated(id: string) {
    router.push(`/chat/${id}`);
}
</script>

<template>
    <aside class="sidebar">
        <NCard title="Chats" :content-style="{ padding: '8px 0' }">
            <template #header-extra>
                <NButton size="small" type="primary" @click="showModal = true">+ New</NButton>
            </template>
            <NMenu
                :options="menuOptions"
                :value="activeId"
                @update:value="handleSelect"
            />
        </NCard>

        <NewChatModal v-model:show="showModal" @created="handleCreated" />
    </aside>
</template>
