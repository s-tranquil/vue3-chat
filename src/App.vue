<script setup lang="ts">
import { NConfigProvider, NGlobalStyle } from "naive-ui";
import type { GlobalThemeOverrides } from "naive-ui";
import Chat from "./components/Chat.vue";

const themeOverrides: GlobalThemeOverrides = {
    common: {
        primaryColor: "#7c3aed",
        primaryColorHover: "#6d28d9",
        primaryColorPressed: "#5b21b6",
        primaryColorSuppl: "#8b5cf6",
        borderRadiusMedium: "16px",
        borderRadiusSmall: "12px",
    },
    Card: {
        borderRadius: "20px",
    },
};
</script>

<template>
    <NConfigProvider :theme-overrides="themeOverrides">
        <NGlobalStyle />
        <Chat />
    </NConfigProvider>
</template>
