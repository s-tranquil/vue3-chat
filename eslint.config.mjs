import pluginVue from "eslint-plugin-vue";
import {
    defineConfigWithVueTs,
    vueTsConfigs,
    configureVueProject,
} from "@vue/eslint-config-typescript";
import stylistic from "@stylistic/eslint-plugin";

configureVueProject({
    tsSyntaxInTemplates: true,
    rootDir: import.meta.dirname,
});

export default defineConfigWithVueTs(
    pluginVue.configs["flat/essential"],
    vueTsConfigs.base,
    {
        files: ["**/*.{ts,tsx,vue,js,mjs,cjs}"],
        plugins: { "@stylistic": stylistic },
        rules: {
            "vue/multi-word-component-names": "off",
            "no-console": "error",
            "@stylistic/indent": ["error", 4, { SwitchCase: 1 }],
            "vue/html-indent": ["error", 4],
            "vue/script-indent": ["error", 4, { baseIndent: 0, switchCase: 1, ignores: [] }],
            "@stylistic/quotes": ["error", "double", { avoidEscape: true }],
            "@stylistic/comma-spacing": ["error", { before: false, after: true }],
            "@stylistic/comma-dangle": ["error", {
                arrays: "always-multiline",
                objects: "always-multiline",
                imports: "always-multiline",
                exports: "always-multiline",
                functions: "never",
                enums: "always-multiline",
                generics: "never",
                tuples: "always-multiline",
            }],
            "@stylistic/semi": ["error", "always"],
            "@typescript-eslint/no-unused-vars": ["error", { argsIgnorePattern: "^_" }],
        },
    }
);
