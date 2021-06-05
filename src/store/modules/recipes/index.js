export default {
     state() {
          return {
               recipes: []
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
               
               const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes?search=${userInput}&key=3d6c2dca-1ce4-43dc-9fcb-3335b77b310b`);

               const responseData = await response.json();

               if(!response.ok) {
                    const error = new Error(responseData.message);
                    throw error;
               }

               context.commit('setRecipes', { recipes: responseData.data.recipes });
          }
     },
     mutations: {
          setRecipes(state, payload) {
               state.recipes = payload.recipes;
          }
     }
};