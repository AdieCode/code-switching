<template>
    <div v-if="isVisible" class="popup-container" @click="toggleFunction">
        <div class="popup-box">
            <h2 class="click-info"> tap/click to exit</h2>
            <h1>Guidelines for reviewing and adding sentences</h1>
            <p>Sentences should be evaluated whether they are natural, comprehensible and
                grammatically correct. The following are some reasons why code-switched
                sentences may be incorrect or unacceptable:
            </p>

            <h2>Grammatically incorrect e.g.</h2>

            <ul>
                <li>Sentence structure does not follow that of the native language
                    (incorrect word order)</li>
                <li>Subject-verb disagreement such as “Hulle loves om na die movies te
                    gaan” – the plural pronoun requires the plural verb love</li>
            </ul>

            <h2>Nonsensical</h2>
            <ul>
                <li>The sentence does not make sense or is not understandable</li>
            </ul>

            <h2>Unnatural</h2>
            <ul>
                <li>Not typically how we speak e.g. switching of pronouns, propositions
                    and articles which is less typical</li>
            </ul>

            <h2>No code-switching</h2>
            <ul>
                <li>Only one language is used in the sentence</li>
            </ul>

            <h2>Examples</h2>

            <!-- first example  -->
            <div class="example-container">
                <div class="statement">
                    <span class="indecator">Sentence:</span>
                    <span> Sy het 'n insightful essay oor die onderwerp geskryf</span>
                </div>
                <div class="statement">
                    <span class="indecator">Evaluation:</span>
                    <span> Yes</span>
                </div>
                <div>
                    (sentence is acceptable)
                </div>
            </div>

            <!-- second example  -->
            <div class="example-container">
                <div class="statement">
                    <span class="indecator">Sentence:</span>
                    <span> I lees graag before slaaptyd.</span>
                </div>
                <div class="statement">
                    <span class="indecator">Evaluation:</span>
                    <span> No</span>
                </div>
                <div class="statement">
                    <span class="indecator">Reason:</span>
                    <span> Not typically how we speak (unnatural)</span>
                </div>
                <div>
                    (the use of the English “I” and “before” is unusual)
                </div>
            </div>

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
    margin-bottom: 10px;
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

.click-info {
    position: absolute;
    top: -10px;
    color: #fff;
    text-shadow:
        -1px -1px 0 #000,  
         1px -1px 0 #000,
        -1px  1px 0 #000,
         1px  1px 0 #000;
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
