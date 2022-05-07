import { createStore } from 'vuex';
import coachModule from './Modules/Coach.js';
import requestModule from './Modules/Request.js';
import authModule from './Modules/auth.js';
const store = createStore({
  modules: {
    coach: coachModule,
    request: requestModule,
    auth: authModule,
  },
});

export default store;
