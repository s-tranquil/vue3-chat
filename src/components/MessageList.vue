<script setup lang="ts">
import { ref, watch, nextTick } from "vue";
import { NScrollbar, NEmpty } from "naive-ui";
import { type ChatMessage, SenderType } from "../stores/chat";

const props = defineProps<{ messages: ChatMessage[] }>();

const scrollbarRef = ref<InstanceType<typeof NScrollbar>>();

watch(
    [() => props.messages, () => props.messages.length],
    async () => {
        await nextTick();
        scrollbarRef.value?.scrollTo({ top: 99999 });
    }
);
</script>

<template>
    <NScrollbar ref="scrollbarRef" class="message-list">
        <NEmpty v-if="props.messages.length === 0" description="No messages yet" style="padding: 40px 0;" />
        <div v-else class="message-list-inner">
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

<style scoped>
.message-list-inner {
    padding-bottom: 16px;
}
</style>
