<template>
    <div class="flash-container"  :class="direction">
        {{ text }}
    </div>
</template>

<script setup>
const props = defineProps({
    text: String,
    direction: String
})
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
    justify-content: center;
    align-items: center;
    font-size: 48px;
    overflow: hidden;
}

.right{
    animation: right-slide 2s forwards;

}

.left{
    animation: left-slide 2s forwards;

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
</style>