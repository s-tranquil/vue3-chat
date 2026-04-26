<script setup lang="ts">
import { ref, nextTick } from "vue";
import { NInput, NButton } from "naive-ui";
import { useChatStore, SenderType } from "../stores/chat";

const props = defineProps<{ chatId: string }>();

const chatStore = useChatStore();
const inputRef = ref<InstanceType<typeof NInput>>();
const text = ref("");
const isSending = ref(false);

async function send() {
    const trimmed = text.value.trim();
    if (!trimmed || isSending.value) return;

    isSending.value = true;
    const draft = trimmed;
    text.value = "";

    await new Promise<void>(resolve => setTimeout(resolve, 200 + Math.random() * 400));

    chatStore.addMessage(props.chatId, {
        id: crypto.randomUUID(),
        sender: SenderType.User,
        text: draft,
        timestamp: new Date().toISOString(),
    });

    isSending.value = false;
    await nextTick();
    inputRef.value?.focus();
}

function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        send();
    }
}
</script>

<template>
    <div class="message-input">
        <NInput
            ref="inputRef"
            v-model:value="text"
            type="textarea"
            placeholder="Type a message… (Enter to send, Shift+Enter for newline)"
            :disabled="isSending"
            :autosize="{ minRows: 3, maxRows: 6 }"
            @keydown="onKeydown"
        />
        <NButton
            type="primary"
            :disabled="!text.trim() || isSending"
            :loading="isSending"
            @click="send"
        >
            Send
        </NButton>
    </div>
</template>
