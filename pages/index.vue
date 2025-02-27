<template>
    <div class="main-container">
        <div class="hero">
            <h1>Welcome to our project for developing <br> a code-switched corpus for <br> South-African languages</h1>
        </div>
        <hr>
        <section>
            <h2>1. What is Code-Switching?</h2>
            <p>Poplack (2001) defines code-switching as “the mixing, by bilinguals (or multilinguals), of two or more languages in discourse, often with no change of interlocutor or topic”. The most frequently used types of code-switching are as follows (Çetinoğlu et al., 2016; van der Westhuizen and Niesler, 2011):</p>
            <ul>
                <li><strong>Inter-sentential code-switching:</strong> occurs at the sentence boundaries where each sentence is complete in each language.<br>
                Afrikaans-English example: Is jy ernstig? <strong>I can’t believe it.</strong></li>
                <li><strong>Tag switching:</strong> occurs when a tag in the other language is added to the start or end of a sentence.<br>
                Afrikaans-English example: <strong>Wow!</strong> Dit is fantasties.</li>
                <li><strong>Intra-sentential code-switching:</strong> this type of switch can occur anywhere within a sentence boundary as single words or utterances.<br>
                Afrikaans-English example: Die show gisteraand was regtig <strong>amazing.</strong></li>
                <li><strong>Intra-word switching:</strong> where the stem of one language is bound to another language.<br>
                Afrikaans-English example: Ons het lekker <strong>gechat.</strong></li>
            </ul>
        </section>

        <section>
            <h2>2. Purpose of Dataset Creation</h2>
            <p>Due to the limited availability of readily available public code-switching datasets, researchers often rely on synthetically generated code-switched text. Evaluating the impact of this data is either through human evaluation (which can become costly) or applying the data and models to downstream natural language processing (NLP) tasks such as sentiment analysis, named entity recognition etc. However, this method can also become computationally intensive. The goal is to create a syntactic textual similarity dataset for code-switching in various South African languages.</p>
            <p>This dataset will be a gold-standard that can be used to develop models that can classify generated text as syntactically correct or incorrect.</p>
            <p>Furthermore, this dataset will be used to develop educational NLP technologies such as grammatical error detection and correction for code-switching (Nguyen et al., 2022).</p>
        </section>

        <section>
            <h2>3. References</h2>
            <ul>
                <li>Özlem Çetinoğlu, Sarah Schulz, and Ngoc Thang Vu. Challenges of Computational Processing of Code-Switching. EMNLP 2016 - 2nd Workshop on Computational Approaches to Code Switching, CS 2016 - Proceedings of the Workshop, (1980):1–11, 2016. doi: 10.18653/v1/w16-5801.</li>
                <li>Li Nguyen, Zheng Yuan, and Graham Seed. Building educational technologies for code-switching: Current practices, difficulties and future directions. Languages, 7, 9 2022. ISSN 2226471X. doi:10.3390/languages7030220.</li>
                <li>Shana Poplack. Code-switching (linguistic). In International Encyclopedia of the Social and Behavioral Sciences, pages 2062–2065. Smelser, Niel and Baltes, Paul (eds.). Elsevier Science Ltd., 2001.</li>
                <li>Ewald van der Westhuizen and Thomas Niesler. A First South African Corpus of Multilingual Codeswitched Soap Opera Speech. pages 2854–2859, 2011.</li>
            </ul>
        </section>

        <route-button text="continue"/>
    </div>
</template>

<script setup>
</script>

<style scoped>
.main-container {
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-bottom: 100px;
}

.hero{
    width: 100%;    
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: black;
    color: white;
    margin-bottom: 60px;
}

h1 {
    font-size: 36px;
    font-weight: 800;
    text-align: start !important; 
    margin-top: 60px;
    margin-bottom: 60px;
    text-align: center;

}

section {
    width: 100%;
    max-width: 800px;
    margin-bottom: 40px;
}

h2 {
    font-size: 28px;
    font-weight: 500;
    margin-bottom: 10px;
}

p {
    font-size: 18px;
    font-weight: 300;
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