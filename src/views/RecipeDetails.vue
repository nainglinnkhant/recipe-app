<template>
     <div>
          <base-spinner v-if="isLoading"></base-spinner>

          <base-dialog 
               v-if="errorMessage" 
               :errorMessage="errorMessage"
               @close="closeDialog">
          </base-dialog>

          <div v-if="!isLoading && !errorMessage" class="container pt-lg-5">
               <div class="row">
                    <div class="col-lg-6">
                         <div class="recipe-image">
                              <object :data="recipe.image_url" type="image/jpg">
                                   <img src="https://i.stack.imgur.com/y9DpT.jpg" :alt="recipe.title">
                              </object>
                         </div>
                    </div>

                    <div class="col-lg-6">
                         <div class="recipe-details pt-5 pt-lg-0">
                              <button class="btn-bookmark mb-1" @click="toggleBookmarks">
                                   <i :class="recipe.bookmarked? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
                              </button>
                              
                              <h4>{{ formattedTitle }}</h4>

                              <div class="row">
                                   <div class="col-12 col-sm-6 duration shadow-sm rounded-lg">
                                        <i class="far fa-clock"></i>
                                        <span class="ml-2">{{ recipe.cooking_time }} Minutes</span>
                                   </div>

                                   <div class="col-12 col-sm-6 serving shadow-sm rounded-lg">
                                        <i class="fas fa-user-friends"></i>
                                        <span class="ml-2 mr-4">{{ recipe.servings }} Servings</span>

                                        <button @click="increaseServing" class="increase-servings-button">
                                             <i class="fas fa-plus"></i>
                                        </button>

                                        <button @click="decreaseServing" class="decrease-servings-button">
                                             <i class="fas fa-minus"></i>
                                        </button>
                                   </div>
                              </div>

                              <div class="ingredients">
                                   <h5>Ingredients</h5>

                                   <ul>
                                        <div class="row">
                                             <ingredient-item 
                                                  v-for="ingredient in recipe.ingredients" 
                                                  :key="ingredient"
                                                  :ingredient="ingredient">
                                             </ingredient-item>
                                        </div>
                                   </ul>
                              </div>
                         </div>
                    </div>
               </div>
          </div>

          <div class="direction" v-if="!isLoading && !errorMessage">
               <h4>HOW TO COOK IT</h4>

               <p>
                    This recipe was created and published by 
                    <span class="font-weight-bold">{{ recipe.publisher }}</span>. You can learn how to cook it in their website.
               </p>

               <button @click="goToSourcePage">Learn Now</button>
          </div>
     </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useStore } from 'vuex';
import IngredientItem from '../components/IngredientItem.vue';
import useCloseDialog from '../hooks/closeDialog.js';

export default {
     components: {
          IngredientItem
     },
     setup() {
          const route = useRoute();
          const router = useRouter();
          const store = useStore();

          const recipe = ref({});
          const ingredients = ref([]);
          const isLoading = ref(false);

          const bookmarkedRecipes = computed(() => store.getters.getBookmarks);

          const formattedTitle = computed(() => recipe.value.title?.replaceAll('&amp;', 'and'));

          const isAuthenticated = computed(() => store.getters.isAuthenticated);

          const { errorMessage, closeDialog } = useCloseDialog(true);

          (async function() {
               if(isAuthenticated.value) store.dispatch('fetchBookmarks');
               
               isLoading.value = true;
               try {
                    const recipeId = route.query.id;
                    const response = await fetch(`https://forkify-api.herokuapp.com/api/v2/recipes/${recipeId}?key=3d6c2dca-1ce4-43dc-9fcb-3335b77b310b`);
                    const responseData = await response.json();

                    if(!response.ok) {
                         const error = new Error(responseData.message);
                         throw error;
                    }

                    recipe.value = responseData.data.recipe;

                    if(isAuthenticated.value) {
                         const bookmarkedIds = bookmarkedRecipes.value.map(bookmark => bookmark.id);
                         bookmarkedIds.forEach(id => {
                              if(id === recipe.value.id) {
                                   recipe.value.bookmarked = true;
                              }
                         });
                    }
               }
               catch(error) {
                    errorMessage.value = 'Sorry! This recipe is currently not available.';
               }
               isLoading.value = false;
          })();

          function controlServings(mode) {
               recipe.value.ingredients.forEach((ingredient) => {
                    const servingForOne = ingredient.quantity / recipe.value.servings;

                    if(mode === 'increase') ingredient.quantity += servingForOne;
                    if(mode === 'decrease') ingredient.quantity -= servingForOne;
               });
               if(mode === 'increase') recipe.value.servings++;
               if(mode === 'decrease') recipe.value.servings--;
          }

          function increaseServing() {
               controlServings('increase');
          }

          function decreaseServing() {
               if(recipe.value.servings === 1) return;
               controlServings('decrease');
          }

          function toggleBookmarks() {
               if(!isAuthenticated.value) {
                    router.push('/auth');
                    return;
               }

               if(recipe.value.bookmarked) {
                    recipe.value.bookmarked = false;
                    store.dispatch('removeFromBookmarks', { recipeId: recipe.value.id });
               } else {
                    recipe.value.bookmarked = true;
                    store.dispatch('addToBookmarks', { recipe: recipe.value });
               }
          }

          function goToSourcePage() {
               // window.location.href = recipe.value.source_url;
               window.open(recipe.value.source_url, '_blank');
          }

          return {
               recipe,
               formattedTitle,
               ingredients,
               increaseServing,
               decreaseServing,
               isLoading,
               errorMessage,
               closeDialog,
               toggleBookmarks,
               goToSourcePage
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
h4 {
     text-align: center;
     font-size: 1.125rem;
     margin-bottom: 2rem;
}
.btn-bookmark {
     background: transparent;
     padding: 0;
     border: none;
     color: #ed8756;
     font-size: 1.5rem;
}
.duration, .serving {
     display: flex;
     align-items: center;
     font-size: 0.875rem;
     justify-content: center;
     padding-top: 1.5rem;
     padding-bottom: 1.5rem;
}
.increase-servings-button, .decrease-servings-button {
     color: #374151;
     font-size: 0.8rem;
     width: 1rem;
     height: 1rem;
     line-height: 0.8rem;
     border: 1px solid #374151;
     border-radius: 50%;
     padding: 0;
     background: transparent;
     margin-right: 10px;
}
button:focus {
     outline: none;
}
.ingredients {
     margin-top: 2rem;
}
h5 {
     font-size: 1.1rem;
     text-align: center;
     margin-bottom: 1.2rem;
}
.direction {
     padding: 2.5rem;
     text-align: center;
     background: #F3F4F6;
     color: #374151;
     margin-top: 1.5rem;
}
.direction h5 {
     font-size: 1.125rem;
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
@media (max-width: 576px) {
     .increase-servings-button, .decrease-servings-button {
          line-height: 1.1rem !important;
     }
}
@media (max-width: 992px) {
     .recipe-image {
          margin-top: 20px;
     }
}
</style>