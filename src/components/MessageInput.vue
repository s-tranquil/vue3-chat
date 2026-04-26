<script setup lang="ts">
import { NInput, NButton } from "naive-ui";

defineProps<{ chatId: string }>();
</script>

<template>
    <div class="message-input">
        <NInput
            type="textarea"
            placeholder="Message input coming soon…"
            :disabled="true"
            :autosize="{ minRows: 3, maxRows: 6 }"
        />
        <NButton type="primary" :disabled="true">Send</NButton>
    </div>
</template>
