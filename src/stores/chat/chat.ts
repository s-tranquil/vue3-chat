import { defineStore } from "pinia";
import { createMessage } from "./utils/createMessage";
import { SenderType, type ChatItem, type ChatMessage } from "./types";

const initialChats: ChatItem[] = [
    {
        id: "1",
        title: "General",
        messages: [createMessage(SenderType.Bot, "Welcome to the General chat.")],
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
    },
});
