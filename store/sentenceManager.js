// store/auth.js
import { defineStore } from 'pinia';
import axios from 'axios';

export const useSentenceManager = defineStore('auth', {
  state: () => ({
    sentence: {
      id: 0,
      text: '',
    },
    userPreferences: {
      ageRange: '10-15',
      tc: false,
    },
    baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3001',
  }),
  actions: {
    loadPreferences() {
      try {
        const storedPreferences = localStorage.getItem('userPreferences');
        console.log('storedPreferences:', storedPreferences);
        if (storedPreferences) {
          this.userPreferences = JSON.parse(storedPreferences);
        } else {
          this.userPreferences = {
            ageRange: 'none',
            tc: false,
          };
          this.savePreferences(this.userPreferences);
        }
      } catch (error) {
        this.userPreferences = {
          ageRange: 'none',
          tc: false,
        }
        console.error('Error loading preferences:', error);
      }
    },
    savePreferences(age_range, tc) {
      this.userPreferences = {
        ageRange: age_range,
        tc: tc,
      }
      localStorage.setItem('userPreferences', JSON.stringify({ ageRange: age_range, tc: tc }));
    },
    async addSentence(sentence) {
      try {
        const response = await axios.post(`${this.baseURL}/sentences/add`, {
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
        this.sentence.text = '';

        const response = await axios.get(`${this.baseURL}/sentences/random`);

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
        const ageRangeSelection = {
          '18-24': 1,
          '25-29': 2,
          '30-40': 3,
          '40-50': 4,
          '>50': 5
        };

        const selection = ageRangeSelection[this.userPreferences.ageRange] || 0;

        const response = await axios.post(`${this.baseURL}/vote`, {
          sentence_id: this.sentence.id,
          vote: vote,
          selection: selection,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error rating sentence:', error);
        return false;
      }
    },
    async feedback(feedback) {
      try {
        const response = await axios.post(`${this.baseURL}/sentences/feedback`, {
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
