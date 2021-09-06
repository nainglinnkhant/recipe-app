<template>
     <div class="container">
          <div class="row">
               <div class="col-8">
                    <searchbar :userInput="userInput" @input-changed="changeInput" @form-submitted="submitForm" />
               </div>

               <div class="col-2 text-center">
                    <button class="btn btn-bookmarks shadow-sm" @click="goToBookmarks">
                         <span class="d-none d-lg-inline-block pr-1">Bookmarks</span> <i class="far fa-bookmark"></i>
                    </button>
               </div>

               <div class="col-2">
                    <button 
                         v-if="!isAuthenticated" 
                         class="btn btn-login shadow-sm"
                         @click="login"
                    >
                         Login
                    </button>

                    <button v-else 
                         class="btn btn-logout shadow-sm"
                         @click="logout"
                    >
                         Logout
                    </button>
               </div>
          </div>

          <base-spinner v-if="isLoading"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="closeDialog">
          </base-dialog>

          <div v-if="!isLoading && !errorMessage && recipes?.length === 0">
               <p class="text-center mt-5 pt-3">No recipes found.</p>
          </div>

          <div class="recipe-list" v-if="!isLoading && !errorMessage">
               <div class="row">
                    <recipe-item 
                         v-for="recipe in recipes"
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
import { useRouter } from 'vue-router';
import RecipeItem from '../components/RecipeItem.vue';
import Searchbar from '../components/Searchbar.vue';
import useControlState from '../hooks/controlState.js';

export default {
     components: {
          RecipeItem,
          Searchbar
     },
     setup() {
          const store = useStore();
          const router = useRouter();
          const userInput = ref('');

          const recipes = computed(() => store.getters.getRecipes);

          const isAuthenticated = computed(() => store.getters.isAuthenticated);

          const { isLoading, errorMessage, sendRequest, closeDialog } = useControlState();

          function changeInput(input) {
               userInput.value = input;
          }

          function submitForm() {
               const input = userInput.value.trim();

               if(!input) return;

               sendRequest(store.dispatch.bind(null, 'fetchRecipes', { userInput: input }));
          }

          function login() {
               router.push('/auth');
          }

          function logout() {
               store.dispatch('logout');
          }

          function goToBookmarks() {
               if(!isAuthenticated.value) {
                    router.push('/auth');
               }
               else {
                    router.push('/bookmarks');
               }
          }

          return {
               userInput,
               changeInput,
               submitForm,
               recipes,
               isLoading,
               errorMessage,
               closeDialog,
               isAuthenticated,
               login,
               logout,
               goToBookmarks
          };
     }
}
</script>

<style scoped>
.container {
     padding-top: 2rem;
     color: #374151;
}
.btn:focus {
     border-color: transparent;
     box-shadow: 0 0 0 0;
}
i {
     color: #ed8756;
}
.btn-bookmarks, .btn-login, .btn-logout {
     border-radius: 50px;
     color: #374151;
}
.recipe-list {
     padding-top: 3rem;
     padding-bottom: 3rem;
     margin-left: 0.5rem;
     margin-right: 0.5rem;
}
@media (max-width: 567px){
     .container {
          padding-top: 1rem;
     }
     .recipe-list {
          padding-top: 2rem;
          padding-bottom: 2rem;
     }
     .col-8 {
          margin-left: -7px;
          margin-right: -8px;
     }
     .col-2 {
          margin-left: -7px;
          margin-right: -7px;
     }
}
</style>