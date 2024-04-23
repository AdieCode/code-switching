<template>
    <div class="flash-container"  :class="direction" @click="begone">
        <h1>Added</h1>
        <!-- <p>click to skip</p> -->
    </div>
</template>

<script setup>
import { ref } from 'vue';

const direction = ref('slide')
// const props = defineProps({
//     text: String,
// })

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

.slide{
    animation: slide 1.3s forwards;

}


.done{
    width: 0;
    right: 0;
}

@keyframes slide {
    0%{
        left: 0;
        width: 0%;
        color: #ffffff00;
    }
    
    50%{
        left: 0;
        width: 100%;
        color: #ffffff;
    }

    70%{
        right: 0;
        width: 100%;
    }

    100%{
        right: 0;
        color: #ffffff00;
        width: 0%;
    }
}

</style>