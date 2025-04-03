<template>
    <div class="info-container" @click="toWrite">
        <p>Back</p>
        <div class="animated-background"></div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

const props = defineProps({
    link: String
})
function toWrite() {
    router.push('/'+ props.link);
}

</script>

<style lang="css" scoped>
.info-container{
    min-width: 170px;
    min-height: 70px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    left: 20px;
    border: 1px solid #000;
    cursor: pointer;
}

.info-container p{
    font-size: 36px;
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
        min-width: 120px;
        min-height: 50px;
        top: 10px;
        left: 10px;
    }

    .info-container p {
        font-size: 24px;
    }
}

</style>