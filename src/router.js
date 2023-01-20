import { createRouter, createWebHistory } from 'vue-router';
import CoachDetails from './pages/coaches/CoachDetails.vue';
import CoachesList from './pages/coaches/CoachesList.vue';
import CoachRegistration from './pages/coaches/CoachRegistration.vue';
import ContactCoach from './pages/requests/ContactCoach.vue';
import RequestsRecieved from './pages/requests/RequestsRecieved.vue';
import NotFound from './pages/NotFound.vue';

const router = createRouter({
  history: createWebHistory(),
  routes: [
    //home -> coaches
    { path: '/', redirect: '/coaches' },
    //all coaches
    { path: '/coaches', component: CoachesList },
    //specific coach
    {
      path: '/coaches/:id',
      component: CoachDetails,
      props: true,
      //specific coach/ contact
      children: [{ path: 'contact', component: ContactCoach }],
    },
    //register
    { path: '/register', component: CoachRegistration },
    //requests
    { path: '/requests', component: RequestsRecieved },
    //not found page
    { path: '/:notFound(.*)', component: NotFound },
  ],
});

export default router;
