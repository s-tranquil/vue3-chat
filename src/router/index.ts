import { createRouter, createWebHistory } from "vue-router";
import Chat from "../components/chat/Chat.vue";
import { DEFAULT_CHAT_ID } from "../constants";

const routes = [
    { path: "/", redirect: `/chat/${DEFAULT_CHAT_ID}` },
    { path: "/chat/:id", component: Chat },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
