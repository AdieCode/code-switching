<template>
    <div class="main-container">
      <div class="hero">
        <h1>Informed Consent Form</h1>
      </div>
      <section>
        <h2>1. Project Information</h2>
        <h3>1.1. Title of research project:</h3>
        <p>Code-switched Corpus Creation for South African and African languages</p>
  
        <h3>1.2. Researcher details</h3>
        <p>
          Michelle Terblanche<br>
          u20080027@tuks.co.za<br>
          Department of Computer Science<br>
          University of Pretoria
        </p>
  
        <h3>1.3. Research study description</h3>
  
        <h4>1.3.1. Objectives</h4>
        <ul>
          <li>Create a gold-standard dataset of correct and incorrect code-switched sentences for South African and African languages.</li>
          <li>Participation from a variety of individuals will ensure diversity and an accurate representation of the way we speak (allowing for different topics and conversation styles).</li>
        </ul>
  
        <h4>1.3.2. Requirements</h4>
        <ul>
          <li>Add new sentences and/or review existing sentences (added by other participants such as yourself).</li>
          <li>Adding sentences:
            <ul>
              <li>Choose a topic.</li>
              <li>Add a code-switched sentence that represents real, natural code-switching.</li>
            </ul>
          </li>
          <li>Review sentences:
            <ul>
              <li>Evaluate all the sentences displayed by choosing whether it is an acceptable code-switched sentence.</li>
              <li>When selecting “No”, choose from the list of reasons why it is deemed unacceptable or provide your own reason by choosing “Other”.</li>
            </ul>
          </li>
        </ul>
  
        <h4>1.3.3. Risks</h4>
        <p>There are minimal risks associated with the research project.</p>
        <ul>
          <li>We do not ask for any personal information. We only ask for an indicative age range.</li>
          <li>To further reduce the risk of personal identifiable information, we encourage participants to avoid using descriptive names of people and places.</li>
        </ul>
      </section>
  
      <section>
        <h2>2. Informed Consent</h2>
        <ul>
          <li>I understand my right to choose whether to participate in the project and I voluntarily grant my permission for participation.</li>
          <li>I confirm that I am 18 years or older and agree to indicate my age range.</li>
          <li>I confirm I am a bilingual speaker proficient in at least two languages in which code-switching is observed.</li>
          <li>I understand the objective of the project and how the data I provide will be used.</li>
          <li>I understand the possible risks of providing personal identifiable information and confirm that I would refrain from this.</li>
          <li>I am aware that the results of the project may be used for the purpose of publication.</li>
        </ul>
        <p>By checking “I Accept”, you consent to participate in the research given the above.</p>
      </section>
  
      <div class="buttons">
        <route-button text="I Accept" link="requirements" :onClick="agreeToTerms" />
      </div> 
    </div>
</template>

<script setup>
import { useSentenceManager } from '../store/sentenceManager';

const sentenceManager = useSentenceManager();

function agreeToTerms() {
    console.log("Are you sure you want to proceed?");
    sentenceManager.savePreferences('none', true);
}
</script>

<style scoped>
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 60px;
}

.hero {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
}

h1 {
    font-size: 36px;
    font-weight: 800;
    text-align: center;
    margin: 60px 20px;
}

section {
    width: 80%;
    max-width: 800px;
    margin-bottom: 20px;
}

h2 {
    font-size: 28px;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 15px;
}

h3 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 40px;
    margin-bottom: 10px;
}

h4 {
    font-size: 16px;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    font-weight: 300;
    margin-top: 15px;
    margin-bottom: 10px;
}

ul {
    list-style-type: disc;
    padding-left: 20px;
}

li {
    font-size: 18px;
    font-weight: 300;
    margin-bottom: 10px;
}
</style>
