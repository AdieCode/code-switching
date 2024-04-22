<template>
    <div class="write-container">
        
        <!-- learn about code-switching -->
        <info/>
        <flash text="Let's add some sentences, shall we?" direction="right"/>

        <!-- back to index page -->
        <back link="/"/>

        <!-- add sentences -->
        <h2>Add a sentence</h2>
        <p>Please type in an example of code-switching, as you understand it.</p>
        <form action="">
            <div class="edit-label">Enter sentence</div>
            <input type="text"  placeholder="Enter sentence">
            <button>Submit</button>
        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';


</script>

<style lang="css" scoped>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');

.write-container{
    width: 100%;
    height: 100vh;
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

.edit-label{
    position: absolute;
    top: -14px;
    left: 10px;
    font-size: 16px;
    background-color: #fff;
    padding: 0px 10px;
    transition: 0s;
    pointer-events: none;
}

button{
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



</style>