import { ref } from '@vue/reactivity';
import { useRouter } from 'vue-router';

export default function useControlState() {
     const router = useRouter();

     const isLoading = ref(false);
     const errorMessage = ref('');

     const sendRequest = async (dispatchFunc) => {
          isLoading.value = true;
          try {
               await dispatchFunc();
          } catch(error) {
               errorMessage.value = error.message;
          }
          isLoading.value = false;
     };

     const closeDialog = (goBack = false) => {
          if(goBack) router.back();
          errorMessage.value = '';
     }

     return {
          isLoading,
          errorMessage,
          sendRequest,
          closeDialog
     }
}