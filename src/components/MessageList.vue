<script setup lang="ts">
import { NScrollbar, NEmpty } from "naive-ui";
import { type ChatMessage, SenderType } from "../stores/chat";

const props = defineProps<{ messages: ChatMessage[] }>();
</script>

<template>
    <NScrollbar class="message-list">
        <NEmpty v-if="props.messages.length === 0" description="No messages yet" style="padding: 40px 0;" />
        <div v-else>
            <div
                v-for="message in props.messages"
                :key="message.id"
                :class="['message-item', message.sender]"
            >
                <span class="message-sender">{{ message.sender === SenderType.User ? "You" : "Bot" }}</span>
                <p class="message-text">{{ message.text }}</p>
            </div>
        </div>
    </NScrollbar>
</template>
