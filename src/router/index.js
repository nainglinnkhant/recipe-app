import { createRouter, createWebHistory } from 'vue-router';

import RecipeList from '../views/RecipeList.vue';
import store from '../store/index.js';

const RecipeDetails = () => import('../views/RecipeDetails.vue');
const UserAuth = () => import('../views/UserAuth.vue');
const BookmarkList = () => import('../views/BookmarkList.vue');

const routes = [
     {
          path: '/',
          component: RecipeList
     },
     {
          path: '/auth',
          component: UserAuth
     },
     { 
          path: '/:id', 
          component: RecipeDetails, 
          props: true
     },
     {
          path: '/bookmarks',
          component: BookmarkList,
          meta: { userAuth: true }
     }
]

const router = createRouter({
     history: createWebHistory(process.env.BASE_URL),
     routes
});

router.beforeEach((to, _, next) => {
     if(to.meta.userAuth && !store.getters.isAuthenticated) {
          next('/auth');
     }
     else {
          next();
     }
});

router.beforeEach((to, _, next) => {
     if(to.path.includes('auth') && store.getters.isAuthenticated) {
          next('/');
     } else {
          next();
     }
})

export default router;
