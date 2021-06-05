import db from '../../../firebase.js';

export default {
     async addToBookmarks(context, payload) {
          const localId = context.rootGetters.getLocalId;

          const response = await fetch(`https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`, {
               method: 'POST',
               body: JSON.stringify({
                    recipe: payload.recipe
               })
          });

          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.message);
               throw error;
          }

          context.commit('addToBookmarks', payload);
     },
     async fetchBookmarks(context) {
          const localId = context.rootGetters.getLocalId;
          const response = await fetch(`https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`);

          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.message);
               throw error;
          }

          const bookmarks = [];
          for(const key in responseData) {
               const recipe = responseData[key].recipe;
               const bookmark = {
                    bookmarked: recipe.bookmarked,
                    cooking_time: recipe.cooking_time,
                    id: recipe.id,
                    image_url: recipe.image_url,
                    ingredients: recipe.ingredients,
                    publisher: recipe.publisher,
                    servings: recipe.servings,
                    source_url: recipe.source_url,
                    title: recipe.title
               };
               bookmarks.push(bookmark);
          }

          context.commit('fetchBookmarks', { bookmarks: bookmarks });
     },
     async removeFromBookmarks(context, payload) {
          const localId = context.rootGetters.getLocalId;
          const response = await fetch(`https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`);

          const responseData = await response.json();

          if(!response.ok) {
               const error = new Error(responseData.message);
               throw error;
          }
          
          let id;
          for(const key in responseData) {
               if(payload.recipeId === responseData[key].recipe.id) {
                    id = key;
               }
          }

          db.ref(localId).child(id).remove();
          context.commit('removeFromBookmarks', payload);
     }
};