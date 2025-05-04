<template>
    <div class="write-container">
        
        <!-- learn about code-switching -->
        <popupInfo :isVisible="infoPopUpIsVisible" :toggleFunction="toggleInfoPopup"/>
        <info :text="'Guide on how to review/add sentences'" :onClickFunction="toggleInfoPopup"/>

        <!-- <flash text="Let's write some sentences, shall we?"/> -->
        <added v-if="add"/>

        <!-- back to index page -->
        <back link="options"/>

        <!-- add sentences -->
        <h2>Add a sentence</h2>
        <p>Please provide an example of a code-switched sentence as you understand it</p>
        <form action="" @submit.prevent="addSentence">
            <div class="edit-label">Enter sentence</div>
            <input type="text"  placeholder="Enter sentence" v-model="sentence" required minlength="6">
            <select v-model="selectedTopic" required class="age-dropdown">
                <option disabled value="">Please select a topic</option>
                <option v-for="topic in topicOptions" :key="topic" :value="topic">{{ topic }}</option>
            </select>
            <div>
                <button :disabled="loading">Submit</button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';
import { useSentenceManager } from '../store/sentenceManager';
const sentenceManager = useSentenceManager();
const add = ref(false);
const sentence = ref('');
const loading = ref(false); // Add loading state
const infoPopUpIsVisible = ref(false);

const selectedTopic = ref("")

const topicOptions = ref([
    'Weather',
    'Current Events',
    'Sports',
    'Food and Cooking',
    'Entertainment',
    'Music',
    'Work or Career',
    'Hobbies and Interests',
    'Travel',
    'Family and Relationships',
    'Technology',
    'Health and Wellness',
    'Education',
    'Pets and Animals',
    'Finance and Economy',
    'Fashion and Style',
    'Books and Literature',
    'Holiday Plans',
    'Personal Achievements',
    'Cultural Topics'
])

async function addSentence (){
    if (loading.value) return; // Prevent multiple submissions
    loading.value = true;
    add.value = true;

    try {
        await sentenceManager.addSentence(sentence.value, selectedTopic.value);
        setTimeout(() => {
            sentence.value = '';
        }, 600);
    } catch (error) {
        console.error('Error adding sentence:', error);
    } finally {
        setTimeout(() => {
            add.value = false;
            loading.value = false;
        }, 1300);
    }
}

    function toggleInfoPopup() {
        infoPopUpIsVisible.value = !infoPopUpIsVisible.value
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


.write-container{
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}
.write-container h2{
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
}

.write-container p{
    font-size: 20px;
    font-weight: 300;
    text-align: center;
}

form{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 80px;
    position: relative;
}

input{
    min-width: 510px;
    height: 30px;
    padding: 10px;
    font-size: 24px;
    border-radius: 0;
    border: 1px solid #000;
    outline: none;
    margin-bottom: 80px;
}

form:focus-within .edit-label{
    background-color: #000;
    color: #fff;
}
 
.edit-label{
    position: absolute;
    top: -14px;
    left: 10px;
    font-size: 16px;
    background-color: #fff;
    padding: 0px 10px;
    transition: 0.2s;
    pointer-events: none;
}

button{
    user-select: none; 
    min-width: 195px;
    max-width: 195px;
    height: 70px;
    border-radius: 0;
    background-color: #fff;
    border: 1px solid #000;
    outline: none;
    cursor: pointer;
    position: relative;
    color: #000;
    font-size: 36px;
    font-weight: 100;
}

button::before {
    content: "Submit";
    width: 0;
    height: 100%;
    background-color: #000;
    position: absolute;
    top: 0;
    left: 0;
    transition: width 0.2s;
    color: #ffffff00;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 36px;
    font-weight: 100;

}

.age-dropdown {
    font-size: 24px;
    padding: 8px;
    margin-bottom: 80px;

}

button:hover::before {
    width: 100%;
    animation: textVisible 0.1s forwards;
}

@keyframes textVisible {
    0%{
        color: #00000000;
    }
    60%{
        color: #00000000;
    }
    100%{
        color: #fff;
    }
}

button:disabled {
    pointer-events: none;
    opacity: 0.6;
    background-color: #f0f0f0; /* Add gray background */
    color: #a0a0a0; /* Add gray text color */
}

@media (max-width: 768px) {
    .write-container h2 {
        font-size: 24px;
        font-weight: 800;
    }

    .write-container p {
        font-size: 16px;
    }

    input {
        min-width: 80%;
        font-size: 18px;
    }

    button {
        min-width: 150px;
        max-width: 150px;
        height: 50px;
        font-size: 24px;
    }

    button::before {
        font-size: 24px;
    }

    .age-dropdown {
        min-width: 70%;
        font-size: 18px;

    }
}

</style>