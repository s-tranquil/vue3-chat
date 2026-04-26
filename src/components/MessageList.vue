<script setup lang="ts">
import { ref, computed, watch, nextTick } from "vue";
import { useVirtualizer } from "@tanstack/vue-virtual";
import { NEmpty } from "naive-ui";
import { type ChatMessage, SenderType } from "../stores/chat/types";

const props = defineProps<{ messages: ChatMessage[] }>();

const parentRef = ref<HTMLElement>();
const count = computed(() => props.messages.length);

const virtualizer = useVirtualizer(computed(() => ({
    count: count.value,
    getScrollElement: () => parentRef.value ?? null,
    estimateSize: () => 80,
    overscan: 5,
})));

watch(
    [() => props.messages, count],
    async () => {
        await nextTick();
        if (count.value > 0) {
            virtualizer.value.scrollToIndex(count.value - 1, { behavior: "smooth" });
        }
    }
);
</script>

<template>
    <div ref="parentRef" class="message-list">
        <NEmpty v-if="count === 0" description="No messages yet" style="padding: 40px 0;" />
        <div
            v-else
            :style="{ height: `${virtualizer.getTotalSize()}px`, position: 'relative' }"
        >
            <div
                v-for="item in virtualizer.getVirtualItems()"
                :key="item.index"
                :data-index="item.index"
                :ref="(el) => el && virtualizer.measureElement(el as Element)"
                :style="{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    transform: `translateY(${item.start}px)`,
                }"
            >
                <div :class="['message-item', messages[item.index].sender]">
                    <span class="message-sender">
                        {{ messages[item.index].sender === SenderType.User ? "You" : "Bot" }}
                    </span>
                    <p class="message-text">{{ messages[item.index].text }}</p>
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped>
.message-list {
    overflow-y: auto;
}
</style>
