import { createStore } from 'vuex';
import recipesModule from './modules/recipes/index.js';
import recipeDetailsModule from './modules/recipe-details/index.js';
import authModule from './modules/auth/index.js';
import bookmarksModule from './modules/bookmarks/index.js';

export default createStore({
     modules: {
          recipes: recipesModule,
          recipeDetails: recipeDetailsModule,
          auth: authModule,
          bookmarks: bookmarksModule
     }
});
