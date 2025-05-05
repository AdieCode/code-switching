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
    correctionsData: {},
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

    async addSentence(sentence, afrTranslation, engTranslation, topic) {
      try {
        const response = await axios.post(`${this.baseURL}/sentences/add`, {
          sentence: sentence,
          afrTranslation: afrTranslation,
          engTranslation: engTranslation,
          topic: topic
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
        this.sentence.text = "No more sentences to review";
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

    async addCorretedAfrVote(corrected_sentence_id, vote ) {
      try {
        console.log("making afr request" );
        const response = await axios.post(`${this.baseURL}/vote/corrected_sentences/afr`, {
          vote: vote,
          corrected_sentence_id: corrected_sentence_id,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error adding afr corrected sentence:', error);
        return false;
      }
    },

    async addCorretedEngVote(corrected_sentence_id, vote ) {
      try {
        const response = await axios.post(`${this.baseURL}/vote/corrected_sentences/eng`, {
          vote: vote,
          corrected_sentence_id: corrected_sentence_id,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error adding eng corrected sentence:', error);
        return false;
      }
    },

    async addCorrectedSentenceAfr(sentence, corrected_sentence_id) {
      console.log('sentence is this: ', sentence);
      console.log('corrected_sentence_id is this: ',corrected_sentence_id)
      try {
        const response = await axios.post(`${this.baseURL}/sentences/correction/afr`, {
          sentence: sentence,
          corrected_sentence_id: corrected_sentence_id,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error adding afr corrected sentence:', error);
        return false;
      }
    },

    async addCorrectedSentenceEng(sentence, corrected_sentence_id) {
      try {
        const response = await axios.post(`${this.baseURL}/sentences/correction/eng`, {
          sentence: sentence,
          corrected_sentence_id: corrected_sentence_id,
        });

        return response.status === 200;
      } catch (error) {
        console.error('Error adding eng corrected sentence:', error);
        return false;
      }
    },

    async getCorrectionData(sentence_id) {
      try {
        const afrResponse = await axios.get(`${this.baseURL}/sentences/get/correction/afr`, {
          params: { sentence_id: sentence_id },
        });
        const engResponse = await axios.get(`${this.baseURL}/sentences/get/correction/eng`, {
          params: { sentence_id: sentence_id },
        });

        if (afrResponse.status === 200 && engResponse.status === 200) {
          this.correctionsData = {
            afr: {
              sentence: afrResponse.data[0]?.text || '',
              sentence_id: afrResponse.data[0]?.sentence_id || '',
              corrected_sentence_id: afrResponse.data[0]?.id || '',
              adjusted_sentence: '', // Placeholder
              vote: '', // Placeholder
            },
            eng: {
              sentence: engResponse.data[0]?.text || '',
              sentence_id: engResponse.data[0]?.sentence_id || '',
              corrected_sentence_id: afrResponse.data[0]?.id || '',
              adjusted_sentence: '', // Placeholder
              vote: '', // Placeholder
            },
          };
          return true;
        }
        return false;
      } catch (error) {
        console.error('Error fetching correction data:', error);
        return false;
      }
    },

    async addCorrections(afrCorrection, afrVote, engCorrection, engVote) {
      try {
        // Handle Afrikaans correction
        console.log(afrCorrection + ", " +afrVote + ", " + engCorrection+  ", " +engVote);
        if (afrVote === 'yes') {
          console.log("ran");
          const afrVoteResult = await this.addCorretedAfrVote(this.correctionsData.afr.corrected_sentence_id, 'yes');
          if (!afrVoteResult) {
            console.error('Failed to add Afrikaans vote with "yes".');
            return false;
          }
        } else if (afrVote === 'no') {
          const afrVoteResult = await this.addCorretedAfrVote(this.correctionsData.afr.corrected_sentence_id, 'no');
          if (!afrVoteResult) {
            console.error('Failed to add Afrikaans vote with "no".');
            return false;
          }
          const afrCorrectionResult = await this.addCorrectedSentenceAfr(afrCorrection, this.correctionsData.afr.corrected_sentence_id);
          if (!afrCorrectionResult) {
            console.error('Failed to add corrected Afrikaans sentence.');
            return false;
          }
        }

        // Handle English correction
        if (engVote === 'yes') {
          const engVoteResult = await this.addCorretedEngVote(this.correctionsData.eng.corrected_sentence_id, 'yes');
          if (!engVoteResult) {
            console.error('Failed to add English vote with "yes".');
            return false;
          }
        } else if (engVote === 'no') {
          const engVoteResult = await this.addCorretedEngVote(this.correctionsData.eng.corrected_sentence_id, 'no');
          if (!engVoteResult) {
            console.error('Failed to add English vote with "no".');
            return false;
          }
          const engCorrectionResult = await this.addCorrectedSentenceEng(engCorrection,  this.correctionsData.eng.corrected_sentence_id);
          if (!engCorrectionResult) {
            console.error('Failed to add corrected English sentence.');
            return false;
          }
        }

        return true;
      } catch (error) {
        console.error('Error in addCorrections:', error);
        return false;
      }
    },
  },
});
