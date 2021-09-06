<template>
     <div class="col-12 col-sm-6">
          <li class="pb-2">{{ formattedQuantity }} {{ ingredient.unit }} {{ ingredient.description }}</li>
     </div>
</template>

<script>
import { computed } from 'vue';
import { formatQuantity } from '../utils/utils';

export default {
     props: ['ingredient'],
     setup(props) {
          const formattedQuantity = computed(function() {
               const quantity = props.ingredient.quantity;
               if(!quantity) return '';

               if(!quantity.toString().includes('.')) {
                    return quantity;
               }

               return formatQuantity(quantity);
          });

          return {
               formattedQuantity
          };
     }
}
</script>

<style scoped>
li {
     font-size: 0.875rem;
}
</style>