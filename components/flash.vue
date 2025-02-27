<template>
    <div class="flash-container"  :class="direction" @click="begone">
        <h1> {{ text }}</h1>
        <p>click to skip</p>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const direction = ref('right')
const props = defineProps({
    text: String,
})

function begone(){
    direction.value = 'done';
}
</script>

<style lang="css" scoped>
.flash-container{
    position: absolute;
    z-index: 10;
    width: 100%;
    height: 100%;
    top: 0;
    background-color: #000;
    color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;
}

h1{
    font-size: 48px;
}

p{
    font-size: 20px;
    margin-top: 10px;
}

.right{
    animation: right-slide 2s forwards;

}

.left{
    animation: left-slide 2s forwards;

}

.done{
    width: 0;
    right: 0;
}

@keyframes right-slide {
    0%{
        right: 0;
        width: 100%;
        color: #fff;
    }

    60%{
        color: #ffffff;
    }

    70%{
        width: 100%;
        color: #ffffff00;
    }

    100%{
        right: 0;
        color: #ffffff00;
        width: 0%;
    }
}

@keyframes left-slide {
    0%{
        left: 0;
        width: 0%;
        color: #ffffff00;
    }
    
    70%{
        width: 100%;
        color: #ffffff00;
    }
    
    100%{
        left: 0;
        color: #fff;
        width: 100%;
    }
}

@media (max-width: 768px) {
    h1 {
        padding: 20px;
        font-size: 32px;
    }

    p {
        font-size: 16px;
    }
}
</style>