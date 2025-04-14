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
    votedSentenceIds: [], // List to store voted sentence IDs
    canVote: true,
    baseURL: useRuntimeConfig().public.baseUrl || 'http://localhost:3001',
  }),
  actions: {
    loadPreferences() {
      try {
        const storedPreferences = localStorage.getItem('userPreferences');
        const storedVotedIds = localStorage.getItem('votedSentenceIds'); // Load voted IDs from local storage
        console.log('storedPreferences:', storedPreferences);
        console.log('storedVotedIds:', storedVotedIds);

        if (storedPreferences) {
          this.userPreferences = JSON.parse(storedPreferences);
        } else {
          this.userPreferences = {
            ageRange: 'none',
            tc: false,
          };
        }

        if (storedVotedIds) {
          this.votedSentenceIds = JSON.parse(storedVotedIds);
        } else {
          this.votedSentenceIds = [];
        }
      } catch (error) {
        this.userPreferences = {
          ageRange: 'none',
          tc: false,
        };
        this.votedSentenceIds = [];
        console.error('Error loading preferences:', error);
      }
    },
    savePreferences(age_range, tc) {
      this.userPreferences = {
        ageRange: age_range,
        tc: tc,
      };
      localStorage.setItem('userPreferences', JSON.stringify(this.userPreferences));
      localStorage.setItem('votedSentenceIds', JSON.stringify(this.votedSentenceIds)); // Save voted IDs to local storage
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

        const response = await axios.post(`${this.baseURL}/sentences/random`, {
          excludeIds: this.votedSentenceIds // Send voted IDs with the request
        });

        if (response.status === 200) {
          this.sentence.text = response.data.sentence;
          this.sentence.id = response.data.id;
          this.canVote = true;
          return response.data;
        }

        console.log('Something went wrong');
        return null;
      } catch (error) {
        this.sentence.text = "No sentence found to review.";
        this.sentence.id = 0;
        this.canVote = false;
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
          '>50': 5,
        };

        const selection = ageRangeSelection[this.userPreferences.ageRange] || 0;

        if (this.canVote) {
          const response = await axios.post(`${this.baseURL}/vote`, {
            sentence_id: this.sentence.id,
            vote: vote,
            selection: selection,
          });
  
          if (response.status === 200) {
            this.votedSentenceIds.push(this.sentence.id); // Add voted sentence ID to the list
            localStorage.setItem('votedSentenceIds', JSON.stringify(this.votedSentenceIds)); // Update local storage
            return true;
          }
        }
        return false;
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
