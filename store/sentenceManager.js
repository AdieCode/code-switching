// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

// Get base URL from environment variable or fall back to a default value
const baseURL = import.meta.env.API_URL || 'http://localhost:3001';
console.log('baseURL:', baseURL);

export const useSentenceManager = defineStore('auth', {
  state: () => ({
    sentence: {
      id: 0,
      text: '',
    },
  }),
  actions: {
    async addSentence(sentence) {
      try {
        const response = await axios.post(`${baseURL}/sentences/add`, {
          sentence: sentence,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error adding sentence:', error);
        return false;
      }
    },
    async getRandomSentence() {
      try {
        const response = await axios.get(`${baseURL}/sentences/random`);

        if (response.status === 200) {
          return response;
        }
        console.log('Something went wrong');
        return null;
      } catch (error) {
        console.error('Error getting random sentence:', error);
        return null;
      }
    },
    async rateSentence(sentenceId, vote) {
      try {
        const response = await axios.post(`${baseURL}/vote`, {
          sentence_id: sentenceId,
          vote: vote,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error rating sentence:', error);
        return false;
      }
    },
  },
});
