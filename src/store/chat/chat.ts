import { defineStore } from "pinia";
import { createMessage } from "./utils/createMessage";
import { SenderType, type ChatItem, type ChatMessage } from "./types";

const lorem = [
    "Hi, how do I reset my password?",
    "You can do that from the account settings page.",
    "Thanks, found it. One more thing — where are my invoices?",
    "They're under Billing in the left menu.",
    "Got it. Can I download them as PDF?",
    "Yes, there's a download button next to each one.",
    "Perfect. Is there a limit on how many users I can add?",
    "That depends on your plan. Free plan allows up to 3.",
    "We're on the Pro plan, so we should be fine then?",
    "Correct, Pro gives you unlimited users.",
    "Great. Can users have different permission levels?",
    "Yes, you can set roles under Team Management.",
    "Is there a way to export all data at once?",
    "Yes, go to Settings → Data → Export.",
    "What formats are supported?",
    "CSV and JSON are both available.",
    "Thanks, that's exactly what I needed.",
    "Happy to help! Anything else?",
    "Actually yes — does the API have rate limits?",
    "Yes, 1000 requests per minute on Pro.",
];

function seedMessages(welcome: string): ChatMessage[] {
    const msgs: ChatMessage[] = [createMessage(SenderType.Bot, welcome)];
    for (let i = 0; i < 1000; i++) {
        msgs.push(createMessage(i % 3 === 0 ? SenderType.User : SenderType.Bot, lorem[i % lorem.length]));
    }
    return msgs;
}

const initialChats: ChatItem[] = [
    {
        id: "1",
        title: "General",
        messages: seedMessages("Welcome to the General chat."),
    },
    {
        id: "2",
        title: "Support",
        messages: [createMessage(SenderType.Bot, "Ask your question in Support.")],
    },
    {
        id: "3",
        title: "Random",
        messages: [createMessage(SenderType.Bot, "This is the Random chat room.")],
    },
];


export const useChatStore = defineStore("chat", {
    state: () => ({
        chats: initialChats,
    }),
    getters: {
        getChatById: state => (id: string) => state.chats.find(chat => chat.id === id),
    },
    actions: {
        addMessage(chatId: string, message: ChatMessage) {
            const chat = this.chats.find(item => item.id === chatId);
            if (chat) {
                chat.messages.push(message);
            }
        },
        addChat(title: string): string {
            const id = crypto.randomUUID();
            this.chats.push({
                id,
                title,
                messages: [createMessage(SenderType.Bot, `Welcome to ${title}!`)],
            });
            return id;
        },
        toggleFavorite(chatId: string) {
            const chat = this.chats.find(item => item.id === chatId);
            if (chat) {
                chat.isFavorite = !chat.isFavorite;
            }
        },
    },
});
