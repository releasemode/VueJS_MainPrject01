//import coachService from '../../services/CoachService';
const baseurl = 'https://coachapp-14b2b-default-rtdb.firebaseio.com/';
import axios from 'axios';
export default {
  namespaced: true,
  state() {
    return {
      coaches: [],
    };
  },
  mutations: {
    addCoach(state, payload) {
      state.coaches.push(payload);
    },
    setCoaches(state, payload) {
      state.coaches = payload;
    },
  },
  actions: {
    async addNewCoach(context, payload) {
      const token = context.rootGetters['auth/LoggedInUser'].token;

      return new Promise((resolve, reject) => {
        axios
          .post(`${baseurl}/coaches.json?auth=${token}`, payload)
          .then(function (response) {
            console.log(response);
            context.commit('addCoach', payload);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },

    setCoaches(context) {
      return new Promise((resolve, reject) => {
        let coaches = [];
        axios
          .get(`${baseurl}/coaches.json`)
          .then((res) => {
            var data = res.data;
            resolve(res.data);
            for (var docId in data) {
              coaches.push({
                id: data[docId].id,
                firstName: data[docId].firstName,
                lastName: data[docId].lastName,
                description: data[docId].description,
                rate: data[docId].rate,
                areaOfExpertise: data[docId].area,
              });
            }

            return context.commit('setCoaches', coaches);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
  getters: {
    coaches(state) {
      return state.coaches;
    },
    hasCoaches(state) {
      if (state.coaches.length > 0) return true;
      else return false;
    },
    coachById: (state) => (coachId) => {
      return state.coaches.find((coach) => coach.id === +coachId);
    },
    MaxCouchId(state) {
      const maxId = Math.max.apply(
        null,
        state.coaches.map((item) => item.id)
      );
      return maxId;
    },
  },
};
