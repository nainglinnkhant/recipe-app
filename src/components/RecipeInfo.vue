<template>
     <div class="recipe-details pt-5 pt-lg-0">
          <div class="bookmark-container">
               <button class="btn-bookmark mb-1" @click="toggleBookmarks">
                    <i :class="recipe.bookmarked? 'fas fa-bookmark' : 'far fa-bookmark'"></i>
               </button>
          </div>
          
          <h4>{{ recipeTitle }}</h4>

          <div class="row ml-0 mr-0">
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
</template>

<script>
import { computed } from '@vue/runtime-core';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import IngredientItem from './IngredientItem.vue';
import { convertHTMLtoString } from '../utils/utils';

export default {
     components: {
          IngredientItem
     },
     setup() {
          const store = useStore();
          const router = useRouter();

          const recipe = computed(() => store.getters.getRecipe);
          const recipeTitle = computed(() => convertHTMLtoString(recipe.value.title));
          const isAuthenticated = computed(() => store.getters.isAuthenticated);

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

          return {
               recipe,
               recipeTitle,
               increaseServing,
               decreaseServing,
               toggleBookmarks
          };
     }
}
</script>

<style scoped>
h4 {
     text-align: center;
     font-size: 1.125rem;
     margin-bottom: 2rem;
}
.bookmark-container {
     width: 100%;
     display: flex;
     justify-content: flex-end;
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
</style>