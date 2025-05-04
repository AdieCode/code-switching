<template>
  <!-- Info Popup -->
  <popupInfo :isVisible="infoPopUpIsVisible" :toggleFunction="toggleInfoPopup" />
  <info :text="'Guide on how to review/add sentences'" :onClickFunction="toggleInfoPopup" />

  <!-- Back to index page -->
  <back link="options" />

  <!-- Form -->
  <form class="review-container" @submit.prevent="handleFormSubmit">
    <h2>Correct Sentence</h2>
    <p>
      Please review the following and change them<br />
      if the translation does not seem right.
    </p>

    <!-- Original Sentence -->
    <h3><strong>“{{ sentenceManager.sentence.text }}”</strong></h3>

    <!-- Afrikaans translation -->
    <div class="section">
      <label>Afrikaans translation</label>
      <h1>"{{ sentenceManager.correctionsData.afr.sentence }}"</h1>
      <div>
        <label>
          <input type="radio" value="yes" v-model="afrikaansIsCorrect" required /> yes
        </label>
        <label>
          <input type="radio" value="no" v-model="afrikaansIsCorrect" required /> no
        </label>
      </div>
      <input
        v-if="afrikaansIsCorrect === 'no'"
        type="text"
        placeholder="Enter sentence"
        v-model="afrikaansEdited"
        minlength="4"
        required
      />
    </div>

    <!-- English translation -->
    <div class="section">
      <label>English translation</label>
      <h1>"{{ sentenceManager.correctionsData.eng.sentence }}"</h1>
      <div>
        <label>
          <input type="radio" value="yes" v-model="englishIsCorrect" required /> yes
        </label>
        <label>
          <input type="radio" value="no" v-model="englishIsCorrect" required /> no
        </label>
      </div>
      <input
        v-if="englishIsCorrect === 'no'"
        type="text"
        placeholder="Enter sentence"
        v-model="englishEdited"
        minlength="4"
        required
      />
    </div>

    <div>
      <button :disabled="loading">Submit</button>
    </div>

    <!-- Feedback -->
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
  </form>
</template>

<script setup>
import { ref } from 'vue';
import { useSentenceManager } from '../store/sentenceManager';

const router = useRouter();
const sentenceManager = useSentenceManager();

const infoPopUpIsVisible = ref(false);
function toggleInfoPopup() {
  infoPopUpIsVisible.value = !infoPopUpIsVisible.value;
}

const originalSentence = ref("Sentence comes here");

const afrikaansIsCorrect = ref(null);
const englishIsCorrect = ref(null);

const afrikaansEdited = ref("");
const englishEdited = ref("");

const errorMessage = ref("");
const loading = ref(false);


const getSentenceRequest = async () => {
    try {
        await sentenceManager.getRandomSentence();
        router.push('/review');
    } catch (error) {
        console.error('Error:', error);
    }
};

async function handleFormSubmit() {
  if (
    afrikaansIsCorrect.value === null ||
    englishIsCorrect.value === null ||
    (afrikaansIsCorrect.value === "no" && afrikaansEdited.value.trim().length < 4) ||
    (englishIsCorrect.value === "no" && englishEdited.value.trim().length < 4)
  ) {
    errorMessage.value = "Please ensure all required fields are filled correctly. Edited sentences must be at least 4 characters long.";
    return;
  }
  
    errorMessage.value = ""; // Clear error message if validation passes

  await sentenceManager.addCorrections(afrikaansEdited.value, afrikaansIsCorrect.value, englishEdited.value, englishIsCorrect.value);
  await getSentenceRequest();

  // Placeholder for the function to handle form submission
  console.log("Form submitted");
}

onMounted(() => {
  afrikaansEdited.value = sentenceManager.correctionsData.afr.sentence;
  englishEdited.value = sentenceManager.correctionsData.eng.sentence;
})
</script>

<style scoped>
:root {
  --primary-color: #222;
  --highlight-green: #34d399;
  --highlight-red: #f87171;
  --box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  --transition: 0.3s ease;
}

.review-container {
  margin-top: 100px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-family: 'Inter', sans-serif;
  padding: 20px;
  box-sizing: border-box;
}

.review-container h2 {
  font-size: 2rem;
  font-weight: 200;
  margin-bottom: 10px;
}

.review-container h3 {
    font-size: 24px;
    font-weight: 400;
    text-align: center;
    margin: 40px 0px;
}

.review-container p {
  font-size: 1.1rem;
  font-weight: 400;
  text-align: center;
  max-width: 600px;
}

.section {
  margin: 80px 0;
  width: 100%;
  max-width: 500px;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.section h1{
    font-size: 24px;
    font-weight: 600;
    text-align: center;
    margin: 30px 0px;
}

.section label {
  font-size: 18px;
  font-weight: 400;
  text-align: center;
}

.section div {
  display: flex;
  justify-content: center;
  gap: 50px;
}

.section div label {
  font-weight: 300;
  font-size: 24px;
}

.section div input[type="radio"] {
  width: 24px;
  height: 24px;
}

input[type="text"] {
    min-width: 510px;
    height: 30px;
    padding: 10px;
    font-size: 24px;
    border-radius: 0;
    border: 1px solid #000;
    outline: none;
    margin-bottom: 10px;
}

button {
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
    margin-bottom: 30px;
}

button::before {
    content: "Submit";
    width: 0;
    height: 100%;
    color: #fff;
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

button:hover::before {
    width: 100%;
    animation: textVisible 0.1s forwards;
}

button:disabled {
    pointer-events: none;
    opacity: 0.6;
    background-color: #f0f0f0; /* Add gray background */
    color: #a0a0a0; /* Add gray text color */
}

.error-message {
  margin-top: 10px;
  color: var(--highlight-red);
  font-size: 1rem;
  text-align: center;
}

@keyframes textVisible {
    0% {
        color: #00000000;
    }
    60% {
        color: #00000000;
    }
    100% {
        color: #fff;
    }
}


@media (max-width: 768px) {
    .review-container h2 {
        font-size: 24px;
        font-weight: 800;
    }

    .review-container p {
        float: inline-end;
        font-size: 16px;
    }

    .review-container h3 {
      font-size: 20px;
      font-weight: 400;
    }

    .section h1{
      font-size: 20px;
      font-weight: 600;
    }

    input[type="text"] {
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
