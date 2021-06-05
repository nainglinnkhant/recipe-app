<template>
     <div class="col-12 col-md-6 col-lg-4">
          <div class="recipe-item" @click="chooseRecipe">
               <div class="recipe-image">
                    <div class="overlay"></div>
                    <img :src="recipe.image_url" :alt="recipe.title" class="img-fluid">
               </div>

               <div class="recipe-info pt-2">
                    <h4>{{ formattedTitle }}</h4>

                    <p>{{ recipe.publisher }}</p>
               </div>
          </div>
     </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';

export default {
     props: ['recipe'],
     setup(props) {
          const router = useRouter();
          const vw = ref(Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0));

          const formattedTitle = computed(function() {
               const recipeTitle = props.recipe.title.replaceAll('&amp;', 'and');
               let maxLetter;
               if(vw.value < 576) {
                    maxLetter = 26;
               } 
               else if(vw.value >= 576 && vw.value < 768) {
                    maxLetter = 43;
               }
               else {
                    maxLetter = 20;
               }

               if(recipeTitle.length < maxLetter) {
                    return recipeTitle;
               }
               return `${recipeTitle.slice(0, maxLetter).trim()}...`;
          });

          function chooseRecipe() {
               const recipeId = props.recipe.id;
               router.push(`/${recipeId}?id=${recipeId}`);
          }

          return {
               formattedTitle,
               chooseRecipe
          };
     }
}
</script>

<style scoped>
.recipe-item {
     margin-bottom: 1.4rem;
     display: flex;
     align-items: center;
     cursor: pointer;
}
.recipe-image {
     position: relative;
}
.recipe-image .overlay {
     background: #ed8756;
     opacity: 0.2;
     position: absolute;
     width: 65px;
     height: 65px;
     border-radius: 100%;
}
.recipe-image img {
     width: 65px;
     height: 65px;
     border-radius: 100%;
     object-fit: cover;
     margin-right: 30px;
}
.recipe-info {
     color: #374151;
}
.recipe-info h4 {
     font-weight: 400;
     font-size: 1rem;
}
.recipe-info p {
     font-size: 0.8rem;
}
@media (max-width: 567px){
     .recipe-image img {
          margin-right: 20px;
     }
}
</style>