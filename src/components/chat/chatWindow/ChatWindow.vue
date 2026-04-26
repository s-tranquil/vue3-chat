<script setup lang="ts">
import { computed } from "vue";
import { useRoute } from "vue-router";
import { NCard, NText } from "naive-ui";
import { useChatStore } from "../../../store/chat/chat";
import MessageList from "./MessageList.vue";
import MessageInput from "./MessageInput.vue";
import { DEFAULT_CHAT_ID } from "../../../constants";

const route = useRoute();
const chatStore = useChatStore();
const chatId = computed(() => String(route.params.id || DEFAULT_CHAT_ID));
const activeChat = computed(() => chatStore.getChatById(chatId.value));
</script>

<template>
    <NCard :title="activeChat?.title ?? 'Chat'">
        <template #header-extra>
            <NText depth="3" class="chat-id">Chat ID: {{ chatId }}</NText>
        </template>
        <div class="chat-body">
            <MessageList :messages="activeChat?.messages ?? []" />
            <MessageInput :chat-id="chatId" />
        </div>
    </NCard>
</template>

<style scoped>
.chat-id {
    font-size: 13px;
}
</style>
