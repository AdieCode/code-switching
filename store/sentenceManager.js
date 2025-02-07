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
        this.sentence.text = '';

        const response = await axios.get(`${baseURL}/sentences/random`);

        if (response.status === 200) {
          this.sentence.text = response.data.sentence;
          this.sentence.id = response.data.id;
          return response.data;
        }
        console.log('Something went wrong');
        return null;
      } catch (error) {
        console.error('Error getting random sentence:', error);
        return null;
      }
    },
    async rateSentence(vote) {
      try {
        const config = useRuntimeConfig();
        const baseURL = config.public.baseUrl || 'http://localhost:3001';

        const response = await axios.post(`${baseURL}/vote`, {
          sentence_id: this.sentence.id,
          vote: vote,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error rating sentence:', error);
        return false;
      }
    },
    async feedback(feedback) {
      try {
        const config = useRuntimeConfig();
        const baseURL = config.public.baseUrl || 'http://localhost:3001';

        const response = await axios.post(`${baseURL}/sentences/feedback`, {
          sentence_id: this.sentence.id,
          feedback: feedback,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error rating sentence:', error);
        return false;
      }
    },
  },
});
