<template>
     <div class="container">
          <h4>Bookmarks</h4>

          <base-spinner v-if="isLoading" class="mt-5"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="closeDialog">
          </base-dialog>

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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import RecipeItem from '../components/RecipeItem.vue';
import useCloseDialog from '../hooks/closeDialog.js';

export default {
     components: {
          RecipeItem
     },
     setup() {
          const store = useStore();
          const isLoading = ref(false);

          const bookmarkedRecipes = computed(() => store.getters.getBookmarks);

          const { errorMessage, closeDialog } = useCloseDialog(true); 

          (async function() {
               isLoading.value = true;
               try {
                    await store.dispatch('fetchBookmarks');
               }
               catch(error) {
                    errorMessage.value = error.message;
               }
               isLoading.value = false;
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
}
h4 {
     font-size: 1.125rem;
     color: #374151;
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