<template>
     <router-view></router-view>
</template>

<script>
import { useStore } from 'vuex';

export default {
     setup() {
          const store = useStore();     
     
          (async function() {
               const localId = localStorage.getItem('localId');
               if(!localId) return;
               
               store.dispatch('tryLogin', { localId: localId });
               await store.dispatch('fetchBookmarks');
          })();     
     }
}
</script>
