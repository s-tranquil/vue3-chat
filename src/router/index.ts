import { createRouter, createWebHistory } from "vue-router";
import Chat from "../components/Chat.vue";

const routes = [
    { path: "/", redirect: "/chat/1" },
    { path: "/chat/:id", component: Chat },
];

export const router = createRouter({
    history: createWebHistory(),
    routes,
});
