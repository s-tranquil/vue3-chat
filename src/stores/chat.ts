import { defineStore } from "pinia";

export enum SenderType {
    User = "user",
    Bot = "bot",
}

export type ChatMessage = {
    id: string,
    sender: SenderType,
    text: string,
    timestamp: string,
};

export type ChatItem = {
    id: string,
    title: string,
    messages: ChatMessage[],
};

const now = () => new Date().toISOString();

const initialChats: ChatItem[] = [
    {
        id: "1",
        title: "General",
        messages: [
            {
                id: "m1",
                sender: "bot",
                text: "Welcome to the General chat.",
                timestamp: now(),
            },
        ],
    },
    {
        id: "2",
        title: "Support",
        messages: [
            {
                id: "m2",
                sender: "bot",
                text: "Ask your question in Support.",
                timestamp: now(),
            },
        ],
    },
    {
        id: "3",
        title: "Random",
        messages: [
            {
                id: "m3",
                sender: "bot",
                text: "This is the Random chat room.",
                timestamp: now(),
            },
        ],
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
