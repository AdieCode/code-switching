// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

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
        // Get the runtime config dynamically within the action
        const config = useRuntimeConfig();
        const baseURL = config.public.baseUrl || 'http://localhost:3001';

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
        const config = useRuntimeConfig();
        const baseURL = config.public.baseUrl || 'http://localhost:3001';
        console.log('baseURL:', config.public.baseUrl);

        const response = await axios.get(`${baseURL}/sentences/random`);

        if (response.status === 200) {
            console.log('response.data:', response.data);
          return response.data;
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
        const config = useRuntimeConfig();
        const baseURL = config.public.baseUrl || 'http://localhost:3001';

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
