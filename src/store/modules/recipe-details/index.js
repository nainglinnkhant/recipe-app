import { sendRequest } from '../../../utils/utils';

export default {
     state() {
          return {
               recipe: {}
          };
     },
     getters: {
          getRecipe(state) {
               return state.recipe;
          }
     },
     actions: {
          async fetchRecipe(context, payload) {
               const recipeId = payload.id;
               const isAuthenticated = context.rootGetters.isAuthenticated;

               const promiseArr = [
                    sendRequest(
                         `https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}?key=3d6c2dca-1ce4-43dc-9fcb-3335b77b310b`,
                         null,
                         'Sorry! This recipe is currently not available.'
                    )
               ];

               if(isAuthenticated) {
                    promiseArr.push(context.dispatch('fetchBookmarks'));
               }
               
               const responseData = await Promise.all(promiseArr);

               context.commit('setRecipe', { recipe: responseData[0].data.recipe });
          }
     },
     mutations: {
          setRecipe(state, payload) {
               state.recipe = payload.recipe;
          }
     }
};