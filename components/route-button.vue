<template>
    <div class="info-container" @click="redirect">
        <p>{{ text }}</p>
        <div class="animated-background"></div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';

const router = useRouter();

const props = defineProps({
    text: { type: String, default: 'no name' },
    link: { type: String, default: 'tc' },
    onClick: Function,  // Renamed for clarity
});

function redirect() {
    if (props.onClick) {
        props.onClick();  // Only call if function exists
    }
    router.push('/' + (props.link || 'tc')); // Ensures valid path
}
</script>

<style lang="css" scoped>
.info-container{
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    border: 1px solid #000;
    cursor: pointer;
}

.info-container p{
    font-size: 24px;
    font-weight: 400;
    transition: 0.1s;
    z-index: 1;
}

.animated-background{
    width: 100%;
    height: 0%;
    background-color: #000000;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: 0.14s;
}

.info-container:hover .animated-background{
    height: 100%;
}

.info-container:hover p{
    color: #fff;
}

@media (max-width: 768px) {
    .info-container {
        min-width: 280px;
        min-height: 50px;
        top: 10px;
        right: 10px;
        left: 10px;
        margin: 0 auto;
    }

    .info-container p {
        font-size: 18px;
    }
}
</style>