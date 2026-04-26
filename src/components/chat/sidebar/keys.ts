import type { InjectionKey, ComputedRef } from "vue";

export interface SidebarContext {
    activeId: ComputedRef<string>;
    handleSelect: (id: string) => void;
}

export const sidebarKey = Symbol("sidebar") as InjectionKey<SidebarContext>;
