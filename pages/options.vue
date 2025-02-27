<template>
    <div class="main-container">

        <!-- learn about code-switching -->
        <info/>

        <!-- the options provided to the user -->
        <h2>Please select an option</h2>
        <div class="options">
            <div class="option" @click="toWrite">
                <h2>Write</h2>
                <p>give an example of a sentence that demonstrates <br>code-switching, as you understand it.</p>
                <div class="animated-background1"></div>
            </div>
            <div class="option" @click="toReview">
                <h2>Review</h2>
                <p>Review sentences of code-switching shared by other users.</p>
                <div class="animated-background2"></div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter()

function toWrite() {
    router.push("/write");
}

function toReview() {
    router.push("/review");
}


</script>

<style lang="css">
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
*{
    margin: 0;
    padding: 0;
}

body{
    font-family: "Inter", sans-serif;
    font-optical-sizing: auto;
    font-weight: 400;
    font-style: normal;
}

</style>

<style lang="css" scoped>
.main-container{
    width: 100%;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.main-container h2{
    font-size: 32px;
    font-weight: 400;
}
.options{
    margin-top: 20px;
    display: flex;
}


.option{
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #000;
    padding: 30px;
    margin: 20px;
    cursor: pointer;
    position: relative;
}

.option h2{
    font-size: 32px;
    font-weight: 400;
    margin-bottom: 10px;
    z-index: 1;
}

.option p{
    max-width: 200px;
    height: auto;
    font-size: 16px;
    font-weight: 400;
    text-align  : center;
    z-index: 2;
}

.animated-background1{
    width: 0%;
    height: 100%;
    background-color: #000000;
    position: absolute;
    top: 0px;
    right: 0px;
    transition: 0.2s;
}

.animated-background2{
    width: 0%;
    height: 100%;
    background-color: #000000;
    position: absolute;
    top: 0px;
    left: 0px;
    transition: 0.2s;
}

.option:hover .animated-background1{
    width: 100%;
}

.option:hover .animated-background2{
    width: 100%;
}

.option:hover h2{
    color: #fff;
}

.option:hover p{
    color: #fff;
    font-weight: 300;
}




</style>