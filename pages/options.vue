<template>
    <div class="main-container">

        <popupInfo :isVisible="infoPopUpIsVisible" :toggleFunction="toggleInfoPopup"/>
        <PopupDefenition :isVisible="defenitionPopUpIsVisible" :toggleFunction="toggleDefenitionPopup"/>

        <!-- learn about code-switching -->
        <div class="defenition-button">
            <CustomButton :text="'What is code-switching'" mobile-text="Defenition" :onClickFunction="toggleDefenitionPopup"/>
        </div>
        
        <info :text="'Guide on how to review/add sentences'" :onClickFunction="toggleInfoPopup"/>

        <!-- the options provided to the user -->
        <h2>Please select an option</h2>
        <div class="options">
            <div class="option" @click="toReview">
                <h2>Review</h2>
                <p>Review existing code-switched sentences</p>
                <div class="animated-background2"></div>
            </div>
            <div class="option" @click="toWrite">
                <h2>Add</h2>
                <p>Add your own code-switched sentences</p>
                <div class="animated-background1"></div>
            </div>
        </div>

    </div>
</template>

<script setup>
import { ref } from 'vue';
import { CustomButton } from '#components';
import { useRouter } from 'vue-router';
const router = useRouter();

const infoPopUpIsVisible = ref(false);
const defenitionPopUpIsVisible = ref(false);

function toWrite() {
    router.push("/write");
}

function toReview() {
    router.push("/review");
}

function toggleInfoPopup() {
    infoPopUpIsVisible.value = !infoPopUpIsVisible.value
}
function toggleDefenitionPopup() {
    defenitionPopUpIsVisible.value = !defenitionPopUpIsVisible.value
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
    text-align: center;
    font-size: 32px;
    font-weight: 400;
    width: 80%;
}
.options{
    width: 100%;
    margin: 20px;
    display: flex;
    justify-content: center;
    flex-wrap: wrap; /* Allow wrapping for smaller screens */
}

.defenition-button{
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 1;
}

.option{
    max-width: 300px;
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
    font-size: 32px !important;
    font-weight: 200 !important;
    text-align: center !important;
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
    left: 0px;
    transition: 0.2s;
}

.animated-background2{
    width: 0%;
    height: 100%;
    background-color: #000000;
    position: absolute;
    top: 0px;
    right: 0px;
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

@media (max-width: 768px) {
    .main-container h2{
        font-size: 20px;
        font-weight: 900;
        width: 80%;
    }
    .options {
        flex-direction: column; /* Stack options vertically on mobile */
        align-items: center;
        justify-content: center;
    }

    .option {
        width: 70%; /* Adjust width for smaller screens */
        margin: 10px;
    }

    .option h2{
        font-size: 20px !important;
        font-weight: 600 !important;
        text-align: center;
    }

    .option p{
        max-width: 200px;
        height: auto;
        font-size: 16px;
        font-weight: 300;
    }
    .defenition-button{
    top: 10px;
    left: 10px;
}


}

</style>