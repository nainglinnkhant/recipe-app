<template>
     <div class="container">
          <div class="row">
               <div class="col-8">
                    <div class="search-bar shadow-sm">
                         <form @submit.prevent="submitForm">
                              <input type="text"
                                   class="form-control"
                                   placeholder="Search recipes..."
                                   v-model.trim="userInput"
                              >

                              <button class="d-none d-md-block btn btn-search shadow-sm">Search</button>
                              <button class="d-block d-md-none btn btn-search-icon">
                                   <i class="fas fa-search"></i>
                              </button>
                         </form>
                    </div>
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
                         @click="login">
                         Login
                    </button>

                    <button v-else 
                         class="btn btn-logout shadow-sm"
                         @click="logout">
                         Logout
                    </button>
               </div>
          </div>

          <base-spinner v-if="isLoading" class="mt-5"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="closeDialog">
          </base-dialog>

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
import useCloseDialog from '../hooks/closeDialog.js';

export default {
     components: {
          RecipeItem
     },
     setup() {
          const store = useStore();
          const router = useRouter();
          const userInput = ref('');
          const isLoading = ref(false);

          const recipes = computed(() => store.getters.getRecipes);

          const isAuthenticated = computed(() => store.getters.isAuthenticated);

          const { errorMessage, closeDialog } = useCloseDialog();

          async function submitForm() {
               if(!userInput.value) return;

               isLoading.value = true;
               try {
                    await store.dispatch('fetchRecipes', { userInput: userInput.value });
               }    
               catch(error) {
                    errorMessage.value = `${error.message}.`;
               }
               isLoading.value = false;
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
}
.search-bar {
     position: relative;
}
.btn-search {
     background: #ed8756;
     color: #ffffff;
     padding-left: 15px;
     padding-right: 15px;
     border-radius: 50px;
     position: absolute;
     right: 0;
     top: 0;
}
.btn-search-icon {
     position: absolute;
     right: 0;
     top: 0;
}
.form-control {
     border-color: transparent;
     border-radius: 50px;
}
.btn:focus, .form-control:focus {
     border-color: transparent;
     box-shadow: 0 0 0 0;
}
i {
     color: #ed8756;
}
.search-bar, .btn-bookmarks, .btn-login, .btn-logout {
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