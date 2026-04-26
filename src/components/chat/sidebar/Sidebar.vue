<script setup lang="ts">
import { ref, computed, provide } from "vue";
import { useRoute, useRouter } from "vue-router";
import { NCard, NButton } from "naive-ui";
import { DEFAULT_CHAT_ID } from "../../../constants";
import { sidebarKey } from "./keys";
import ChatTabs from "./ChatTabs.vue";
import NewChatModal from "./NewChatModal.vue";

const route = useRoute();
const router = useRouter();

const activeId = computed(() => String(route.params.id || DEFAULT_CHAT_ID));

function handleSelect(id: string) {
    router.push(`/chat/${id}`);
}

provide(sidebarKey, { activeId, handleSelect });

const showModal = ref(false);

function handleCreated(id: string) {
    router.push(`/chat/${id}`);
}
</script>

<template>
    <aside class="sidebar">
        <NCard title="Chats" :content-style="{ padding: '8px' }">
            <template #header-extra>
                <NButton size="small" type="primary" @click="showModal = true">+ New</NButton>
            </template>
            <ChatTabs />
        </NCard>

        <NewChatModal v-model:show="showModal" @created="handleCreated" />
    </aside>
</template>
