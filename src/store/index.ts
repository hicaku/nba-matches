import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'


export default createStore({
  state: {
    teams: [],
    lastWeekMatches: [],
    boxScore: [],
    matchDetails: [],
    playerDetails: [],
    playerDetailsPlayoffs: [],
    matchId: 0,
    playerId: 0,
  },
  mutations: {
    setLastWeekMatches(state, matches) {
      state.lastWeekMatches = matches; 
    },
    setMatchId(state, matchId) {
      state.matchId = matchId; 
    },
    setPlayerId(state, playerId) {
      state.playerId = playerId; 
    },
    setBoxScore(state, score) {
      state.boxScore = score; 
    },
    setMatchDetails(state, details) {
      state.matchDetails = details; 
    },
    setPlayerDetails(state, details) {
      state.playerDetails = details; 
    },
    setPlayerDetailsPlayoffs(state, details) {
      state.playerDetailsPlayoffs = details; 
    },
  },
  actions: {
    async getLastWeekMatches({ commit }) {
      const date = new Date();
      const tomorrow = new Date(date)
      tomorrow.setDate(tomorrow.getDate() + 1)
      const last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
      const startDate = last.getFullYear() + '-' + ("0" + (last.getMonth() + 1)).slice(-2) + '-' + ("0" + (last.getDate())).slice(-2);
      const endDate = tomorrow.getFullYear() + '-' + ("0" + (tomorrow.getMonth() + 1)).slice(-2) + '-' + ("0" + (tomorrow.getDate() + 1)).slice(-2);
      const url = 'https://www.balldontlie.io/api/v1/games?start_date='+startDate+'&end_date='+endDate+'&per_page=100';
      const response = await axios.get(url)
      commit('setLastWeekMatches', response.data);
    },
    async getBoxScore({ commit, state}) {
      const url = 'https://www.balldontlie.io/api/v1/stats?per_page=35&game_ids[]=' + state.matchId;
      const response = await axios.get(url)
      commit('setBoxScore', response.data.data);
    },
    async getMatchDetails({ commit, state}) {
      const url = 'https://www.balldontlie.io/api/v1/games/' + state.matchId;
      const response = await axios.get(url)
      commit('setMatchDetails', response.data);
    },
    async getPlayerDetails({ commit, state}, season) {
      if(!season) season === '2021'
      const url = 'https://www.balldontlie.io/api/v1/stats?postseason=false&per_page=100&seasons[]='+season+'&player_ids[]=' + state.playerId;
      const response = await axios.get(url)
      commit('setPlayerDetails', response.data.data.filter((match) => match.min !== '0:00' && match.min !== '' && match.min));
      const urlPlayoffs = 'https://www.balldontlie.io/api/v1/stats?postseason=true&per_page=100&seasons[]='+season+'&player_ids[]=' + state.playerId;
      const responsePlayoffs = await axios.get(urlPlayoffs)
      commit('setPlayerDetailsPlayoffs', responsePlayoffs.data.data.filter((match) => match.min !== '0:00' && match.min !== '' && match.min));
    },
    // getTeamName(teamId) {
    //   const url = 'https://www.balldontlie.io/api/v1/teams/'+ teamId;
    //   const response = axios.get(url)
    //   console.log(response);
    // },
    async getPlayerInfo({state}) {
      const url = 'https://www.balldontlie.io/api/v1/players/'+ state.playerId;
      const response = await axios.get(url)
      return response.data;
    },
  },
  getters: {
    lastWeekMatches: state => state.lastWeekMatches,
    matchId: state => state.matchId,
    boxScore: state => state.boxScore,
    matchDetails: state => state.matchDetails,
    playerDetails: state => state.playerDetails,
    playerDetailsPlayoffs: state => state.playerDetailsPlayoffs,
  },
  plugins: [createPersistedState()],
})
