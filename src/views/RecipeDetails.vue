<template>
     <div>
          <base-spinner v-if="isLoading"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="() => closeDialog(true)">
          </base-dialog>

          <div v-if="!isLoading && !errorMessage" class="container pt-lg-5">
               <div class="row">
                    <div class="col-lg-6">
                         <div class="recipe-image">
                              <object :data="recipeImage" type="image/jpg">
                                   <img
                                        src="https://i.stack.imgur.com/y9DpT.jpg"
                                        :alt="recipeTitle"
                                   />
                              </object>
                         </div>
                    </div>

                    <div class="col-lg-6">
                         <recipe-info />
                    </div>
               </div>
          </div>

          <div class="direction" v-if="!isLoading && !errorMessage">
               <h4>HOW TO COOK IT</h4>

               <p>
                    This recipe was created and published by 
                    <span class="font-weight-bold">{{ recipe.publisher }}</span>. 
                    You can learn how to cook it in their website.
               </p>

               <button @click="goToSourcePage">Learn Now</button>
          </div>
     </div>
</template>

<script>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import { useStore } from 'vuex';
import useControlState from '../hooks/controlState.js';
import RecipeInfo from '../components/RecipeInfo.vue';
import { convertHTMLtoString } from '../utils/utils.js';

export default {
     components: {
          RecipeInfo
     },
     setup() {
          const route = useRoute();
          const store = useStore();

          const recipe = computed(() => store.getters.getRecipe);
          const bookmarkedRecipes = computed(() => store.getters.getBookmarks);
          const isAuthenticated = computed(() => store.getters.isAuthenticated);
          const recipeTitle = computed(() => convertHTMLtoString(recipe.value.title));

          const { isLoading, errorMessage, sendRequest, closeDialog } = useControlState();

          const recipeImage = computed(() => 'https:' + recipe.value.image_url?.split(':')[1]);

          (async function() {
               await sendRequest(store.dispatch.bind(null, 'fetchRecipe', { id: route.query.id }))

               if(isAuthenticated.value) {
                    const bookmarkedIds = bookmarkedRecipes.value.map(bookmark => bookmark.id);
                    bookmarkedIds.forEach(id => {
                         if(id === recipe.value.id) {
                              recipe.value.bookmarked = true;
                         }
                    });
               }
          })();

          function goToSourcePage() {
               // window.location.href = recipe.value.source_url;
               window.open(recipe.value.source_url, '_blank');
          }

          return {
               recipe,
               isLoading,
               errorMessage,
               closeDialog,
               goToSourcePage,
               recipeImage,
               recipeTitle,
          };
     }
}
</script>

<style scoped>
.container {
     color: #374151;
}
.recipe-image {
     text-align: center;
}
.recipe-image img, .recipe-image object {
     width: 350px;
     height: 350px;
     object-fit: cover;
     border-radius: 100%;
}
button:focus {
     outline: none;
}
h4 {
     text-align: center;
     font-size: 1.125rem;
     margin-bottom: 2rem;
}
.direction {
     padding: 2.5rem;
     text-align: center;
     background: #F3F4F6;
     color: #374151;
     margin-top: 1.5rem;
}
.direction p {
     font-size: 0.875rem;
}
.direction button {
     margin-top: 1rem;
     background: transparent;
     border: none;
     color: #374151;
     text-decoration: none;
     font-size: 0.875rem;
     background: #ed8756;
     color: #ffffff;
     padding: 8px 15px;
     border-radius: 100px; 
}
@media (max-width: 992px) {
     .recipe-image {
          margin-top: 20px;
     }
}
@media (max-width: 576px) {
     .recipe-image img, .recipe-image object {
          width: 300px;
          height: 300px;
          object-fit: cover;
          border-radius: 100%;
     }
}
</style>