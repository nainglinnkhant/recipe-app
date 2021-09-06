<template>
     <base-dialog v-if="isLoading" errorMessage="Authenticating.." fixed>
          <base-spinner class="mt-3"></base-spinner>
     </base-dialog>

     <base-dialog 
          v-if="errorMessage" 
          :errorMessage="errorMessage" 
          @close="closeDialog">
     </base-dialog>

     <div class="container">
          <div class="col-md-6 offset-md-3">
               <h2>Register to bookmark your favourite recipes!</h2>

               <form @submit.prevent="submitForm">
                    <label for="email">Email</label>
                    <input type="email" id="email" class="form-control" v-model.trim="email">

                    <label for="password">Password</label>
                    <input type="password" id="password" class="form-control" v-model.trim="password">

                    <p class="error-message" v-show="invalid">
                         *Please enter the valid email and password (at least six characters).
                    </p>

                    <div class="action">
                         <button class="submit-button">{{ authMode }}</button>
                    </div>

                    <div class="auth-switch">
                         <p v-if="authMode === 'Signup'">
                              Already have an account? <a @click="switchAuthMode">Login</a>
                         </p>
                         
                         <p v-else>Don't have an account? <a @click="switchAuthMode">Signup</a></p>
                    </div>
               </form>
          </div>
     </div>
</template>

<script>
import { computed, ref } from 'vue';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex';
import useControlState from '../hooks/controlState.js';

export default {
     setup() {
          const email = ref('');
          const password = ref('');
          const authMode = ref('Login');
          const invalid = ref(false);

          const store = useStore();
          const router = useRouter();

          const isAuthenticated = computed(() => store.getters.isAuthenticated);

          const { isLoading, errorMessage, sendRequest, closeDialog } = useControlState();

          async function submitForm() {
               if(email.value === '' || password.value.length < 6) {
                    invalid.value = true;
                    return;
               }

               await sendRequest(store.dispatch.bind(null, 'auth', {
                    email: email.value,
                    password: password.value,
                    authMode: authMode.value
               }));
               
               if(isAuthenticated.value) {
                    router.replace('/');
               }
          }

          function switchAuthMode() {
               if(authMode.value === 'Signup') {
                    authMode.value = 'Login';
               }
               else {
                    authMode.value = 'Signup';
               }
          }
     
          return {
               email,
               password,
               submitForm,
               authMode,
               switchAuthMode,
               invalid,
               errorMessage,
               closeDialog,
               isLoading
          };
     }
}
</script>

<style scoped>
.container {
     color: #374151;
}
h2 {
     text-align: center;
     padding-top: 70px;
     padding-bottom: 30px;
     font-size: 1.125rem;
}
label {
     font-size: 14px;
}
.form-control {
     font-size: 14px;
     padding: 4px 6px;
     margin-bottom: 10px;
     height: 30px;
}
.form-control:focus {
     border-color: #ced4da;
     box-shadow: none !important;
}
.error-message {
     margin-bottom: 0;
     font-size: 13px;
     color: red;
}
.action {
     text-align: center;
     padding: 15px 0;
}
button {
     color: #ed8756;
     font-size: 15px;
     padding: 5px 15px;
     background: #ffffff;
     border: 1px solid #ed8756;
     border-radius: 50px;
     margin: 0 10px;
}
button:focus {
     outline: none;
}
.submit-button {
     color: #ffffff;
     background: #ed8756;
}
.auth-switch p {
     font-size: 13px;
     text-align: center;
}
.auth-switch a {
     cursor: pointer;
}
.auth-switch a:hover {
     color: #ed8756;
     text-decoration: underline;
}
</style>