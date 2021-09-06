<template>
     <div class="container">
          <h4>Bookmarks</h4>

          <base-spinner v-if="isLoading"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="() => closeDialog(true)">
          </base-dialog>

          <div v-if="!isLoading && !errorMessage && bookmarkedRecipes.length ===0">
               <p class="text-center mt-5">You haven't added any recipe to bookmarks.</p>
          </div>

          <div class="recipe-list" v-if="!isLoading && !errorMessage">
               <div class="row">
                    <recipe-item 
                         v-for="recipe in bookmarkedRecipes"
                         :key="recipe.id"
                         :recipe="recipe">
                    </recipe-item>
               </div>
          </div>
     </div>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
import RecipeItem from '../components/RecipeItem.vue';
import useControlState from '../hooks/controlState.js';

export default {
     components: {
          RecipeItem
     },
     setup() {
          const store = useStore();

          const bookmarkedRecipes = computed(() => store.getters.getBookmarks);

          const { isLoading, errorMessage, sendRequest, closeDialog } = useControlState();

          (function() {
               sendRequest(store.dispatch.bind(null, 'fetchBookmarks'));
          })();

          return {
               bookmarkedRecipes,
               isLoading,
               errorMessage,
               closeDialog
          }
     }
}
</script>

<style scoped>
.container {
     padding-top: 2rem;
     color: #374151;
}
h4 {
     font-size: 1.125rem;
}
.recipe-list {
     padding-top: 2rem;
     padding-bottom: 2rem;
     margin-left: 0.5rem;
     margin-right: 0.5rem;
}
@media (max-width: 567px){
     .container {
          padding-top: 1rem;
     }
     .recipe-list {
          padding-top: 1.5rem;
          padding-bottom: 1.5rem;
     }
}
</style>