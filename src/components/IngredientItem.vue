<template>
     <div class="col-12 col-sm-6">
          <!-- <li class="pb-1">{{ wholeNumber ? wholeNumber : '' }} 
               <span v-if="isFraction">{{ numerator }}&frasl;{{ denominator }}</span> 
               {{ ingredient.unit }} {{ ingredient.description }}
          </li> -->
          <li class="pb-2">{{ formattedQuantity }} {{ ingredient.unit }} {{ ingredient.description }}</li>
     </div>
</template>

<script>
import { computed } from 'vue';

export default {
     props: ['ingredient'],
     setup(props) {
          function gcd(a, b) {
               return (b) ? gcd(b, a % b) : a;
          }

          function decimalToFraction(decimal) {
               let top = decimal.toString().replace(/\d+[.]/, '');
               const bottom = Math.pow(10, top.length);
               if (decimal > 1) {
                    top	= + top + Math.floor(decimal) * bottom;
               }
               const x = gcd(top, bottom);

               let numerator = top / x;
               const denominator = bottom / x;
               let wholeNumber;

               if(numerator > denominator) {
                    wholeNumber = parseInt(numerator / denominator);
                    numerator = numerator % denominator;
               }

               const fraction = document.createElement('textarea');
               fraction.innerHTML = '&frasl;';

               return `${wholeNumber ? wholeNumber : ''} ${numerator}${fraction.value}${denominator}`;
          }

          const formattedQuantity = computed(function() {
               const quantity = props.ingredient.quantity;
               if(!quantity) return;

               if(!quantity.toString().includes('.')) {
                    return quantity;
               }

               return decimalToFraction(quantity);
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