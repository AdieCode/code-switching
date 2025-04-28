<template>
    <div v-if="isVisible" class="popup-container" @click="toggleFunction">
        <div class="popup-box">
            <section>
                <h1>1. What is Code-Switching?</h1>
                <p>Poplack (2001) defines code-switching as “the mixing, by bilinguals (or multilinguals), of two or more languages in discourse, often with no change of interlocutor or topic”. The most frequently used types of code-switching are as follows (Çetinoğlu et al., 2016; van der Westhuizen and Niesler, 2011):</p>
                <h2>Inter-sentential code-switching:</h2>
                <ul>
                    <li> occurs at the sentence boundaries where each sentence is complete in each language.<br>
                    Afrikaans-English example: Is jy ernstig? <strong>I can’t believe it.</strong></li>
                </ul>

                <h2>Tag switching:</h2>
                <ul>
                    <li>occurs when a tag in the other language is added to the start or end of a sentence.<br>
                    Afrikaans-English example: <strong>Wow!</strong> Dit is fantasties.</li>
                </ul>
                <h2>Intra-sentential code-switching:</h2>
                <ul>
                    <li>this type of switch can occur anywhere within a sentence boundary as single words or utterances.<br>
                    Afrikaans-English example: Die show gisteraand was regtig <strong>amazing.</strong></li>
                </ul>
                <h2>Intra-word switching:</h2>
                <ul>
                    <li>where the stem of one language is bound to another language.<br>
                    Afrikaans-English example: Ons het lekker <strong>gechat.</strong></li>
                </ul>
            </section>

        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isVisible: Boolean,
    toggleFunction: Function,
});

</script>

<style lang="css" scoped>
.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(5px); /* Add blur effect */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
}

h1{
    font-size: 24px;
    font-weight: 900;
    margin-bottom: 5px;
    text-align: start;
}

h2{
    font-size: 20px;
    font-weight: 600;
    margin-top: 20px;
    margin-bottom: 10px;
    text-align: start;
}

p{
    font-size: 16px;
    font-weight: 300;
    margin-top: 10px;
    margin-bottom: 10px;
    text-align: start;
}
ul{
    padding: 0px 25px;
    margin-bottom: 5px;
}

li{
    font-size: 16px;
    font-weight: 300;
    text-align: start;
    margin-bottom: 15px;
}
.popup-box {
    overflow-y: auto;
    overflow-x: hidden;
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 600px;
    height: 600px;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    border-radius: 8px;
    padding: 30px;
}

.example-container{
    border: black 1px solid;
    padding: 10px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: start;
    align-items: start;
    margin-top: 20px;
    margin-bottom: 20px;
}

.statement{
    margin-bottom: 15px;
}

.indecator{
    font-weight: 500;
    text-decoration: underline;
}



@media (max-width: 768px) {

    .popup-box {
        width: 70%;
        height: 500px;
    }

}
</style>
