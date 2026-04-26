<script setup lang="ts">
import { ref } from "vue";
import { NTabs, NTabPane } from "naive-ui";
import type { Component } from "vue";
import AllChatsTab from "./AllChatsTab.vue";
import FavoritesTab from "./FavoritesTab.vue";

type TabName = "all" | "favorites";

const activeTab = ref<TabName>("all");

const tabs: { name: TabName; label: string; component: Component }[] = [
    { name: "all", label: "All", component: AllChatsTab },
    { name: "favorites", label: "Favorites", component: FavoritesTab },
];
</script>

<template>
    <NTabs v-model:value="activeTab" type="segment" size="small" :pane-style="{ padding: 0 }">
        <NTabPane
            v-for="tab in tabs"
            :key="tab.name"
            :name="tab.name"
            :tab="tab.label"
            display-directive="show:lazy"
        >
            <component :is="tab.component" />
        </NTabPane>
    </NTabs>
</template>
