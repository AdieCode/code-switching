<template>
    <div v-if="isVisible" class="popup-container">
        <div class="popup-box">
            <h1>Please enter your feedback below</h1>
            <textarea v-model="inputText" class="popup-textarea" placeholder="Enter your text here..."></textarea>
            <div class="options">
                <div class="info-container" @click="exit" :class="{ disabled: loading }">
                    <p>Back</p>
                    <div class="animated-background"></div>
                </div>
                <div class="info-container" @click="handleSubmit" :class="{ disabled: loading }">
                    <p>Submit</p>
                    <div class="animated-background"></div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
    isVisible: Boolean,
    onSubmit: Function,
    exit: Function,
});

const inputText = ref('');
const loading = ref(false); // Add loading state

async function handleSubmit() {
    if (loading.value) return; // Prevent multiple submissions
    loading.value = true;
    try {
        if (props.onSubmit) {
            await props.onSubmit(inputText.value);
            inputText.value = ''; // Clear the textarea after submission
        }
    } finally {
        loading.value = false;
    }
}

function exit() {
    if (loading.value) return; // Prevent multiple submissions
    if (props.exit) {
        props.exit();
        inputText.value = ''; // Clear the textarea after submission
    }
}
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
    font-weight: 600;
    margin-bottom: 20px;
}
.popup-box {
    background-color: #fff;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 500px;
    height: 500px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
}

.popup-textarea {
    width: 80%;
    height: 100px;
    margin-bottom: 20px;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: none;
}

.popup-button {
    background-color: #007bff;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 16px;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.popup-button:hover {
    background-color: #0056b3;
}

.info-container{
    margin-top: 20px;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
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

.info-container.disabled {
    pointer-events: none;
    opacity: 0.6;
}

.options{
    margin-top: 20px;
    display: flex;
    gap: 10px;
}


@media (max-width: 768px) {
    .info-container {
        min-width: 50px;
        min-height: 10px;
        top: 0px;
        right: 0px;
        left: 0px;
        margin: 0 auto;
        padding: 10px;
    }

    .info-container p {
        font-size: 14px;
    }

    .popup-box {
        width: 70%;
        height: 500px;
    }

    .popup-textarea {
        width: 80%;
        height: 100px;
        margin-bottom: 20px;
        padding: 10px;
        font-size: 12px;
    }

    .popup-button {
        padding: 14px 20px;
        font-size: 16px;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
    }
    h1{
        font-size: 16px;
        font-weight: 800;
        margin-bottom: 20px;
    }
}
</style>
