import { sendRequest } from "../../../utils/utils";

export default {
     state() {
          return {
               recipes: undefined
          };
     },
     getters: {
          getRecipes(state) {
               return state.recipes;
          }
     },
     actions: {
          async fetchRecipes(context, payload) {
               const userInput = payload.userInput;
               
               const responseData = await sendRequest(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${userInput}&key=3d6c2dca-1ce4-43dc-9fcb-3335b77b310b`);

               context.commit('setRecipes', { recipes: responseData.data.recipes });
          }
     },
     mutations: {
          setRecipes(state, payload) {
               state.recipes = payload.recipes;
          }
     }
};