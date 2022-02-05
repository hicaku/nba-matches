import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios'


export default createStore({
  state: {
    teams: [],
    lastWeekMatches: [],
    matchId: 0,
  },
  mutations: {
    setLastWeekMatches(state, matches) {
      state.lastWeekMatches = matches; 
    },
    setMatchId(state, matchId) {
      state.matchId = matchId; 
    },
  },
  actions: {
    async getLastWeekMatches({ commit }) {
      let results = [];
      const date = new Date();
      const last = new Date(date.getTime() - (7 * 24 * 60 * 60 * 1000));
      const startDate = last.getFullYear() + '-' + ("0" + (last.getMonth() + 1)).slice(-2) + '-' + ("0" + (last.getDate())).slice(-2);
      const endDate = date.getFullYear() + '-' + ("0" + (date.getMonth() + 1)).slice(-2) + '-' + ("0" + (date.getDate())).slice(-2);
      const url = 'https://www.balldontlie.io/api/v1/games?start_date='+startDate+'&end_date='+endDate+'&per_page=100';
      const response = await axios.get(url)
      results = response.data;
      commit('setLastWeekMatches', results);
    }
  },
  getters: {
    lastWeekMatches: state => state.lastWeekMatches,
    matchId: state => state.matchId,
  },
  plugins: [createPersistedState()],
})
