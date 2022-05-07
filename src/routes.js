import { createRouter, createWebHistory } from 'vue-router';
import CoachesListComponent from './pages/coaches/CoachesList.vue';
import RequestsReceivedComponent from './pages/Requests/RequestsReceived.vue';
import ContactCouchComponent from './pages/Requests/ContactCoach.vue';
import CoachDetailsComponent from './pages/coaches/CoachDetails.vue';
import NewCoachComponent from './pages/coaches/NewCoach.vue';
import UserAuthComponent from './pages/auth/UserAuth.vue';
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/coaches', component: CoachesListComponent },
    { path: '/requests', component: RequestsReceivedComponent },
    { path: '/coaches/:id/contact', component: ContactCouchComponent },
    { path: '/coaches/:id', component: CoachDetailsComponent },
    { path: '/Register', component: NewCoachComponent },
    { path: '/UserAuth', component: UserAuthComponent },
    { path: '/', redirect: '/coaches' },
  ],
});

export default router;
