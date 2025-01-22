<template>
    <div>
        <!-- learn about code-switching -->
        <info/>
        
        <!-- <flash text="Let's add some sentences, shall we?" direction="left"/> -->
        <flash text="Let's review some sentences, shall we?"/>

        <!-- back to index page -->
        <back link=""/>

        <!-- content -->
        <div class="review-container">

            <!-- add sentences -->
            <h2>Review a sentence</h2>
            <p>Would you classify the following sentence as <br> a valid ”Code Switching” sentence</p>

            <h3 v-if="sentence">"{{ sentence.sentence }}"</h3>
            <h3 v-else="sentence">waiting for sentence</h3>

            <div class="options">
                <div class="option" @click="vote('yes')">
                    <h2>Yes</h2>
                    <div class="animated-background1"></div>
                </div>
                <div class="option" @click="vote('no')">
                    <h2>No</h2>
                    <div class="animated-background2"></div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useSentenceManager } from '../store/sentenceManager';
const sentenceManager = useSentenceManager();


const add = ref(false);
const sentence = ref('')
let number = 0;

const addVoteRequest = async(vote) =>{
    console.log(sentence.value.id)
    const data = {
        sentence_id: sentence.value.id,
        vote: vote
    };
    try {
        const response = await axios.post('http://localhost:3001/vote/', data);
        return response
    } catch (error) {
        console.error('Error:', error);
    }
} 
const getSentenceRequest = async() =>{
    try {
        const response = await sentenceManager.getRandomSentence();

        return response;
    } catch (error) {
        console.error('Error:', error);
    }
}

const updateLocalStorage = async() =>{
    try {
        const sentence = await getSentenceRequest(); 
        localStorage.setItem('sentence', JSON.stringify(sentence));
    } catch (error) {
        console.error('Error updating localStorage:', error);
    }
}

const getSentence = async () => {
    sentence.value = '';
    try {
        await updateLocalStorage(); 
        sentence.value = JSON.parse(localStorage.getItem('sentence')).data; 
    } catch (error) {
        console.error('Error retrieving sentence:', error);
        throw error; 
    }
}

function vote(awnser){

    if (awnser === 'yes'){
        addVoteRequest('yes')
        getSentence();
        console.log(awnser)
    } else {
        addVoteRequest('no')
        getSentence();
        console.log(awnser) 
    }
}

onMounted(() => {
    getSentence();
});
</script>

<style lang="css" scoped>
.review-container{
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.review-container h2{
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
}

.review-container h3{
    font-size: 24px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 30px;
}


.review-container p{
    font-size: 20px;
    font-weight: 300;
    text-align: center;
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
    padding: 15px;
    margin: 20px;
    min-width: 150px;
    cursor: pointer;
    position: relative;
}


.option h2{
    font-size: 32px;
    font-weight: 300;
    margin-bottom: 10px;
    z-index: 1;
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