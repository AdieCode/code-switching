<template>
    <div class="flex flex-col">
        <title>Content Manging & Exploring</title>
    </div>

    <div>
        <slot/>
    </div>
</template>

<script setup>
import { useSentenceManager } from '../store/sentenceManager';
import { watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const sentenceManager = useSentenceManager();
const router = useRouter();
const route = useRoute();

sentenceManager.loadPreferences();
const preferences = sentenceManager.userPreferences;

watch(preferences, (newPreferences) => {
    // Check if correctionsData has no keys
    if (!sentenceManager.correctionsData || Object.keys(sentenceManager.correctionsData).length === 0) {
        router.push('/review');
        return;
    }

    if (newPreferences.tc && newPreferences.ageRange !== 'none') {
        if (route.path === '/') {
            router.push('/options');
        }
    } else if (route.path !== '/') {
        if (!newPreferences.tc) {
            router.push('/tc');
        } else if (newPreferences.tc && newPreferences.ageRange === 'none') {
            router.push('/requirements');
        } else {
            router.push('/options');
        }
    }
}, { immediate: true });
</script>

<style lang="css" scoped>
</style>