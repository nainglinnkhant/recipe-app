import db from '../../../firebase.js';
import { sendRequest } from '../../../utils/utils.js';

export default {
     async addToBookmarks(context, payload) {
          const localId = context.rootGetters.getLocalId;

          await sendRequest(`https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`, {
               method: 'POST',
               body: JSON.stringify({
                    recipe: payload.recipe
               })
          });

          context.commit('addToBookmarks', payload);
     },
     async fetchBookmarks(context) {
          const localId = context.rootGetters.getLocalId;

          const responseData = await sendRequest(
               `https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`, 
               null, 
               'Something went wrong! Try again later.'
          );

          const bookmarks = [];
          for(const key in responseData) {
               const bookmark = { ...responseData[key].recipe };
               bookmarks.push(bookmark);
          }

          context.commit('fetchBookmarks', { bookmarks: bookmarks });
     },
     async removeFromBookmarks(context, payload) {
          const localId = context.rootGetters.getLocalId;

          const responseData = await sendRequest(`https://recipe-app-c5d4e-default-rtdb.firebaseio.com/${localId}.json`);
          
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