<template>
    <div class="info-container" @click="onClickFunction">
        <p>{{ displayText }}</p>
        <div class="animated-background"></div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { ref, onMounted, onUnmounted } from 'vue';

const props = defineProps({
    text: { type: String, default: 'no name' },
    mobileText: { type: String, default: 'no mobile Text provided' },
    onClickFunction: { type: Function, default: () => {} }
});

const displayText = ref(props.text);

function updateTextBasedOnScreenSize() {
    displayText.value = window.innerWidth <= 880 ? props.mobileText : props.text;
}

onMounted(() => {
    updateTextBasedOnScreenSize();
    window.addEventListener('resize', updateTextBasedOnScreenSize);
});

onUnmounted(() => {
    window.removeEventListener('resize', updateTextBasedOnScreenSize);
});

</script>

<style lang="css" scoped>
.info-container {
    user-select: none; 
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #000;
    cursor: pointer;
}

.info-container p {
    padding: 0px 12px;
    font-size: 24px;
    font-weight: 400;
    transition: 0.1s;
    z-index: 1;
}

.animated-background {
    width: 100%;
    height: 0%;
    background-color: #000000;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: 0.14s;
}

.info-container:hover .animated-background {
    height: 100%;
}

.info-container:hover p {
    color: #fff;
}

@media (max-width: 768px) {
    .info-container {
        min-width: 120px;
        min-height: 50px;
        top: 10px;
        right: 10px;
        right: 10px;
        margin: 0 auto;
    }

    .info-container p {
        font-size: 24px;
    }
}
</style>