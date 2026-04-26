<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { NCard, NText } from "naive-ui";
import { useChatStore } from "../stores/chat/chat";
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";

const route = useRoute();
const chatStore = useChatStore();
const chatId = computed(() => String(route.params.id || "1"));
const activeChat = computed(() => chatStore.getChatById(chatId.value));
</script>

<template>
    <NCard :title="activeChat?.title ?? 'Chat'">
        <template #header-extra>
            <NText depth="3" style="font-size: 13px;">Chat ID: {{ chatId }}</NText>
        </template>
        <div class="chat-body">
            <MessageList :messages="activeChat?.messages ?? []" />
            <MessageInput :chat-id="chatId" />
        </div>
    </NCard>
</template>
