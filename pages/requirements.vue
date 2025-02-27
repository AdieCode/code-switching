<template>
    <div class="main-container">
        <div class="hero">
            <h1>Before we proceed, please provide the following</h1>
            <h2>Choose your age group</h2>
            <select @change="setAgeRange($event.target.value)" class="age-dropdown">
                <option value="18-24">18 – 24</option>
                <option value="25-29">25 – 29</option>
                <option value="30-40">30 – 40</option>
                <option value="40-50">40 – 50</option>
                <option value=">50">> 50</option>
            </select>

            <route-button text="Save" link="options"/>
        </div>
    </div>
</template>

<script setup>
import { useSentenceManager } from '../store/sentenceManager';

const sentenceManager = useSentenceManager();

function setAgeRange(ageRange) {
    sentenceManager.savePreferences(ageRange, sentenceManager.userPreferences.tc);
}
</script>

<style scoped>
.main-container {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 80px;
}

.hero {
    text-align: center;
}

h2 {
    font-size: 24px;
    font-weight: 400;
    margin-top: 16px;
    margin-bottom: 40px;
}

.age-dropdown {
    font-size: 24px;
    padding: 8px;
    margin-top: 16px;
    margin-bottom: 80px;
}
</style>