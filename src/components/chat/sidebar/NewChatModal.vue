<script setup lang="ts">
import { ref } from "vue";
import { NModal, NInput } from "naive-ui";
import { useChatStore } from "../../../store/chat/chat";

const props = defineProps<{ show: boolean }>();
const emit = defineEmits<{
    "update:show": [value: boolean];
    created: [chatId: string];
}>();

const chatStore = useChatStore();
const title = ref("");
const inputRef = ref<InstanceType<typeof NInput>>();

function handleCreate() {
    const trimmed = title.value.trim();
    if (!trimmed) return;
    const id = chatStore.addChat(trimmed);
    emit("update:show", false);
    emit("created", id);
}

function focusInput() {
    inputRef.value?.focus();
}
</script>

<template>
    <NModal
        :show="props.show"
        preset="dialog"
        title="New Chat"
        positive-text="Create"
        negative-text="Cancel"
        @update:show="emit('update:show', $event)"
        @positive-click="handleCreate"
        @after-enter="focusInput"
        @after-leave="title = ''"
    >
        <NInput
            ref="inputRef"
            v-model:value="title"
            placeholder="Chat name"
            @keydown.enter.prevent="handleCreate"
        />
    </NModal>
</template>
