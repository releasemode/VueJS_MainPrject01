import axios from 'axios';
const API_KEY = 'AIzaSyCNN-08sIPfThn_UJ3jWvxNV2Votqm_BA4';
export default {
  namespaced: true,
  state() {
    return {
      userInfo: {
        token: '',
        expiresIn: '',
        userId: '',
      },
    };
  },
  getters: {
    LoggedInUser(state) {
      return state.userInfo;
    },
  },
  mutations: {
    setUserInfo(state, payload) {
      state.userInfo = payload;
    },
  },
  actions: {
    login(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${API_KEY}`,
            payload
          )
          .then((res) => {
            resolve(res.data);
            console.log(res.data);
            var userInfo = {
              token: res.data.idToken,
              expiresIn: res.data.expiresIn,
              userId: res.data.localId,
            };
            context.commit('setUserInfo', userInfo);
          })
          .catch((err) => reject(err));
      });
    },
    SignUp(context, payload) {
      return new Promise((resolve, reject) => {
        axios
          .post(
            `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${API_KEY}`,
            payload
          )
          .then((res) => {
            resolve(res.data);
            // for (var objKey in res.data) {
            //   var userInfo = {
            //     token: res.data[objKey].idToken,
            //     expiresIn: res.data[objKey].expiresIn,
            //     userId: res.data[objKey].localId,
            //   };

            // }
            context.commit('setUserInfo', null);
          })
          .catch(function (error) {
            reject(error);
          });
      });
    },
  },
};
