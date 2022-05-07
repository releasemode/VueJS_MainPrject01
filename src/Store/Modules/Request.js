const baseurl = 'https://coachapp-14b2b-default-rtdb.firebaseio.com/';
import axios from 'axios';
export default {
  namespaced: true,
  state() {
    return {
      requests: [{}],
    };
  },
  mutations: {
    SetRequest(state, payload) {
      state.requests.push(payload);
    },
    LoadRequests(state, payload) {
      console.log('I am being invoked..');
      state.requests = payload;
    },
  },
  actions: {
    SetRequest(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(`${baseurl}/requests.json`, payload)
          .then((res) => {
            if (res.request.status === 200) {
              context.commit('SetRequest', payload);
              resolve(res);
            } else {
              reject(res);
            }
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
    LoadRequests(context) {
      return new Promise((resolve, reject) => {
        const token = context.rootGetters['auth/LoggedInUser'].token;
        let requests = [];
        axios
          .get(`${baseurl}/requests.json?auth=${token}`)
          .then((res) => {
            resolve(res);

            if (res.request.status === 200) {
              for (var objId in res.data) {
                requests.push({
                  id: res.data[objId].id,
                  email: res.data[objId].email,
                  message: res.data[objId].message,
                });
              }
              context.commit('LoadRequests', requests);
            } else reject(res);
          })
          .catch((error) => {
            reject(error);
          });
      });
    },
  },
  getters: {
    Requests(state) {
      return state.requests;
    },
    MaxRequests(state) {
      const maxId = Math.max.apply(
        null,
        state.requests.map((item) => item.id)
      );
      return maxId;
    },
  },
};
