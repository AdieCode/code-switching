<template>
    <div>
         <!-- popup edit box -->
         <popupEditBox :isVisible="popUpVisible" :onSubmit="sendFeedback" :exit="togglePopup"/>

        <!-- learn about code-switching -->
        <popupInfo :isVisible="infoPopUpIsVisible" :toggleFunction="toggleInfoPopup"/>
        <info :text="'Guide on how to review/add sentences'" :onClickFunction="toggleInfoPopup"/>
        
        <PopupDefenition :isVisible="defenitionPopUpIsVisible" :toggleFunction="toggleDefenitionPopup"/>
        <!-- <div class="defenition-button">
            <CustomButton :text="'What is code-switching'" mobile-text="Defenition" :onClickFunction="toggleDefenitionPopup"/>
        </div> -->
        <!-- <flash text="Let's add some sentences, shall we?" direction="left"/> -->
        <!-- <flash text="Let's review some sentences, shall we?"/> -->

        <!-- back to index page -->
        <back link="options"/>

        <!-- review content -->
        <div v-if="!feedback" class="review-container">

            <!-- add sentences -->
            <h2>Review a sentence</h2>
            <p>Would you classify the following sentence as an acceptable code-switched sentence?</p>

            <h3 v-if="sentenceManager.sentence.text === 'No more sentences to review'">{{ sentenceManager.sentence.text }}</h3>
            <h3 v-else-if="sentenceManager.sentence.text">"{{ sentenceManager.sentence.text }}"</h3>
            <div v-else class="waiting">
                <!-- <div
                    v-for="(letter, index) in waiting.split('')"  
                    :key="index"
                    class="animate-letter"
                    :style="{ animationDelay: index * 0.04 + 's' }"
                >
                
                </div> -->
                <h4>{{ waiting }}</h4>
            </div>

            <div v-if="sentenceManager.canVote" class="options">
                <div class="option " @click="vote('yes')" :class="{ disabled: loading }">
                    <h2>Yes</h2>
                    <div class="animated-background1 green"></div>
                </div>
                <div class="option" @click="vote('no')" :class="{ disabled: loading }">
                    <h2>No</h2>
                    <div class="animated-background2 red"></div>
                </div>
            </div>
            <div class="options">
                <div class="option" @click="done" :class="{ disabled: loading }">
                    <h2>Done</h2>
                    <div class="animated-background1"></div>
                </div>
            </div>
        </div>
        <!-- provide feedback -->
        <div v-if="feedback" class="review-container">

            <!-- add sentences -->
            <p>Why is this not an acceptable code-switched sentence?</p>

            <h3 v-if="sentenceManager.sentence.text">"{{ sentenceManager.sentence.text }}"</h3>

            <div class="">
                <div 
                    v-for="(option, index) in feedbackOptions" 
                    :key="index" 
                    class="option-container"
                >
                    <div class="feedback-option" @click="submitFeedback(option)">
                    <h2>{{ option }}</h2>
                    <div class="animated-background1"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useSentenceManager } from '../store/sentenceManager';

const router = useRouter();
const sentenceManager = useSentenceManager();
const waiting = 'Loading sentences...';

const sentence = ref('');
const popUpVisible = ref(false);
const feedback = ref(false);
const loading = ref(false); // Add loading state
const feedbackOptions = [
    "Not typically how we speak (unnatural)", 
    "Doesn't make sense (nonsensical)", 
    "Sentence structure is not correct", 
    "No code switching (only one language used)", 
    "Other"
];

const infoPopUpIsVisible = ref(false);
const defenitionPopUpIsVisible = ref(false);
function toggleInfoPopup() {
    infoPopUpIsVisible.value = !infoPopUpIsVisible.value
}

const addVoteRequest = async (vote) => {
    try {
        return await sentenceManager.rateSentence(vote);
    } catch (error) {
        console.error('Error:', error);
    }
};

const getSentenceRequest = async () => {
    try {
        return await sentenceManager.getRandomSentence();
    } catch (error) {
        console.error('Error:', error);
    }
};

const submitFeedback = async (feedbackOption) => {
    if (loading.value) return; // Prevent multiple submissions
    loading.value = true;
    try {
        if (feedbackOption === 'Other') {
            togglePopup();
            return;
        }

        await sentenceManager.feedback(feedbackOption);
        feedback.value = false;
        await getSentenceRequest();
    } catch (error) {
        console.error('Error submitting feedback:', error);
    } finally {
        loading.value = false;
    }
};

const vote = async (option) => {
    if (loading.value) return; // Prevent multiple submissions
    loading.value = true;
    try {
        if (option === 'no') {
            await addVoteRequest(option);
            feedback.value = true;
        } else {
            await addVoteRequest(option);
            await sentenceManager.getCorrectionData(sentenceManager.sentence.id);
            router.push('/sentence_correction');
            // await getSentenceRequest();
        }
    } catch (error) {
        console.error('Error voting:', error);
    } finally {
        loading.value = false;
    }
};

const done = () => {
    if (loading.value) return; // Prevent multiple submissions
    router.push('/options');
};

function togglePopup() {
    popUpVisible.value = !popUpVisible.value;
}

function toggleDefenitionPopup() {
    defenitionPopUpIsVisible.value = !defenitionPopUpIsVisible.value
}


async function sendFeedback(feedbackText) {
    try {
        await sentenceManager.feedback(feedbackText);
        feedback.value = false;
        await getSentenceRequest();
        togglePopup();
    } catch (error) {
        console.error('Error submitting feedback:', error);
        feedback.value = false;
        togglePopup();
        await getSentenceRequest();
    }
    // await sentenceManager.feedback(feedback);
    // feedback.value = false;
    // await getSentenceRequest();
    // togglePopup();
}

onMounted(() => {
    getSentenceRequest();
});
</script>

<style lang="css" scoped>

.red{
    background-color: red !important;
}

.green{
    background-color: green !important;
}

.review-container{
    width: 100%;
    height: 100dvh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.review-container h2{
    margin-top: 40px;
    font-size: 36px;
    font-weight: 600;
    margin-bottom: 10px;
}

.review-container h3{
    font-size: 24px;
    font-weight: 600;
    margin-top: 50px;
    margin-bottom: 30px;
    text-align: center;
}


.review-container p{
    font-size: 20px;
    font-weight: 300;
    margin-top: 10px;
    text-align: center;
}

.defenition-button{
    position: absolute;
    top: 100px;
    right: 20px;
    z-index: 1;
}

.options{
    margin-top: 20px;
    display: flex;
}

.option{
    user-select: none; 
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    border: 1px solid #000;
    padding: 10px;
    margin: 20px;
    min-width: 150px;
    cursor: pointer;
    position: relative;
}


.option h2{
    font-size: 32px;
    font-weight: 300;
    margin-top: 10px;
    z-index: 1;
}

.feedback-option{
    user-select: none; 
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

.feedback-option h2{
    font-size: 24px;
    font-weight: 300;
    margin-top: 10px;
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

.feedback-option:hover .animated-background1{
    width: 100%;
}

.feedback-option:hover .animated-background2{
    width: 100%;
}

.feedback-option:hover h2{
    color: #fff;
}

.feedback-option:hover p{
    color: #fff;
    font-weight: 300;
}

.waiting{
    padding-top: 40px;
    padding-bottom: 20px;
    animation: flash 1s infinite;
}

@keyframes bounce {
  0%, 100% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
}

@keyframes flash {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.2;
  }
}


.animate-letter {
  display: inline-block;
  /* animation: bounce 0.6s infinite; */
}

.option.disabled {
    pointer-events: none;
    opacity: 0.6;
}

@media (max-width: 768px) {
    .review-container{
        width: 90%;
        height: auto;
        margin: auto;
        margin-top: 120px;
    }

    .review-container h2{
        font-size: 24px;
        font-weight: 800;
        margin-bottom: 10px;
    }

    .review-container h3{
        font-size: 20px;
        font-weight: 600;
        margin-top: 50px;
        margin-bottom: 30px;
    }


    .review-container p{
        margin-bottom: 20px;
        font-size: 16px;
        font-weight: 300;
        text-align: center;
    }

    .defenition-button{
        position: absolute;
        top: 70px;
        right: 10px;
        z-index: 1;
    }

    .options{
        margin-top: 20px;
        display: flex;
    }

    .option{
        padding: 5px;
        margin: 20px;
        min-width: 100px;
        cursor: pointer;
        position: relative;
    }

    .option h2{
        font-size: 24px;
        font-weight: 300;
        margin-top: 10px;
        z-index: 1;
    }

    .feedback-option{
        padding: 10px;
        margin: 20px;
        min-width: 150px;
        cursor: pointer;
        position: relative;
    }

    .feedback-option h2{
        text-align: center;
        font-size: 18px;
        font-weight: 300;
        margin-top: 10px;
        z-index: 1;
    }


}

</style>