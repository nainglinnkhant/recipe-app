import { sendRequest } from "../../../utils/utils";

export default {
     state() {
          return {
               localId: ''
          };
     },
     getters: {
          isAuthenticated(state) {
               return !!state.localId;
          },
          getLocalId(state) {
               return state.localId;
          }
     },
     actions: {
          async auth(context, {email, password, authMode}) {
               let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
               AIzaSyCWwIDdAoSa1_Bjv1iE4wWX6WRK9amszJo`;

               if(authMode === 'Login') {
                    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWwIDdAoSa1_Bjv1iE4wWX6WRK9amszJo`;
               }

               const errorMsg = authMode === 'Login' ? 'Invalid email or password!' : 'Your email is already used!';

               const responseData = await sendRequest(
                    url, 
                    {
                         method: 'POST',
                         body: JSON.stringify({
                              email,
                              password,
                              returnSecureToken: true
                         })
                    },
                    errorMsg
               );

               localStorage.setItem('recipe-app-localId', responseData.localId);
               
               context.commit('auth', {
                    localId: responseData.localId
               });
          },
          tryLogin(context, payload) {
               context.commit('auth', payload);
          },
          logout(context) {
               localStorage.removeItem('recipe-app-localId');
               context.commit('logout');
          }
     },
     mutations: {
          auth(state, payload) {
               state.localId = payload.localId;
          },
          logout(state) {
               state.localId = '';
          }
     }
};