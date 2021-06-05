import { ref } from 'vue';
import { useRouter } from 'vue-router';

export default function useCloseDialog(goBack = false) {
     const router = useRouter();
     const errorMessage = ref('');

     function closeDialog() {
          if(goBack) router.back();
          errorMessage.value = '';
     }

     return {
          errorMessage,
          closeDialog
     };
}