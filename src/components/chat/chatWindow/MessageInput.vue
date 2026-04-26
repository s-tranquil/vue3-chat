<script setup lang="ts">
import { ref, nextTick } from "vue";
import { NInput, NButton } from "naive-ui";
import { useChat } from "../../../composables/useChat";

const props = defineProps<{ chatId: string }>();

const inputRef = ref<InstanceType<typeof NInput>>();
const { text, isSending, send } = useChat(() => props.chatId);

async function handleSend() {
    await send();
    await nextTick();
    inputRef.value?.focus();
}

async function onKeydown(e: KeyboardEvent) {
    if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        await handleSend();
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
            @click="handleSend"
        >
            Send
        </NButton>
    </div>
</template>
