<template>
    <div class="info-container">
        <p>What is code-switching?</p>
        <div class="animated-background"></div>
    </div>
</template>

<script setup>

</script>

<style lang="css" scoped>
.info-container{
    min-width: 320px;
    min-height: 60px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 20px;
    right: 20px;
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


</style>