<template>
     <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';

export default {
     setup() {
          const store = useStore();     
     
          (function() {
               const localId = localStorage.getItem('recipe-app-localId');
               if(!localId) return;
               
               store.dispatch('tryLogin', { localId: localId });
          })();     
     }
}
</script>
