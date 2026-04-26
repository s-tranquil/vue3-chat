import { ref } from "vue";
import { getRandomDelay } from "../utils/getRandomDelay";
import { pickRandom } from "../utils/pickRandom";
import { useChatStore } from "../stores/chat/chat";
import { createMessage } from "../stores/chat/utils/createMessage";
import { SenderType } from "../stores/chat/types";

const BOT_REPLIES = [
    "Got it! Let me look into that.",
    "Thanks for your message!",
    "I'll get back to you shortly.",
    "Interesting point! Tell me more.",
    "Sure, I can help with that.",
];

const SEND_DELAY_MIN = 200;
const SEND_DELAY_MAX = 600;
const REPLY_DELAY_MIN = 1000;
const REPLY_DELAY_MAX = 2000;


export function useChat(chatIdGetter: () => string) {
    const chatStore = useChatStore();
    const text = ref("");
    const isSending = ref(false);

    async function send() {
        const trimmed = text.value.trim();
        if (!trimmed || isSending.value) return;

        const chatId = chatIdGetter();
        isSending.value = true;
        const draft = trimmed;
        text.value = "";

        await new Promise<void>(resolve =>
            setTimeout(resolve, getRandomDelay(SEND_DELAY_MIN, SEND_DELAY_MAX))
        );

        chatStore.addMessage(chatId, createMessage(SenderType.User, draft));

        isSending.value = false;

        setTimeout(() => {
            chatStore.addMessage(chatId, createMessage(SenderType.Bot, pickRandom(BOT_REPLIES)));
        }, getRandomDelay(REPLY_DELAY_MIN, REPLY_DELAY_MAX));
    }

    return { text, isSending, send };
}
