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
          async auth(context, payload) {
               let url = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=
               AIzaSyCWwIDdAoSa1_Bjv1iE4wWX6WRK9amszJo`;

               if(payload.authMode === 'Login') {
                    url = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCWwIDdAoSa1_Bjv1iE4wWX6WRK9amszJo`;
               }

               const response = await fetch(url, {
                    method: 'POST',
                    body: JSON.stringify({
                         email: payload.email,
                         password: payload.password,
                         returnSecureToken: true
                    })
               });

               const responseData = await response.json();

               if(!response.ok) {
                    const error = new Error(responseData.message);
                    throw error;
               }

               localStorage.setItem('localId', responseData.localId);
               
               context.commit('auth', {
                    localId: responseData.localId
               });
          },
          tryLogin(context, payload) {
               context.commit('auth', payload);
          },
          logout(context) {
               localStorage.removeItem('localId');
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