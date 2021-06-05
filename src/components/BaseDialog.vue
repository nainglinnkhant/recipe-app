<template>
     <teleport to="body">
          <div class="backdrop" @click="close"></div>

          <dialog open>
               <h2>{{ errorMessage }}</h2>

               <slot></slot>

               <button v-if="!fixed" @click="close" class="close-button">Close</button>
          </dialog>
     </teleport>
</template>

<script>
export default {
     props: {
          errorMessage: {
               type: String,
               required: true
          },
          fixed: {
               type: Boolean,
               required: false,
               default: false
          }
     },
     emits: ['close'],
     setup(props, context) {
          function close() {
               if(props.fixed) {
                    return;
               }
               context.emit('close');
          }

          return { 
               close
          };
     }
}
</script>

<style scoped>
dialog {
     position: fixed;
     top: 20vh;
     left: 30%;
     width: 40%;
     z-index: 100;
     border-radius: 5px;
     border: none;
     box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
     padding: 30px 50px;
     margin: 0;
     overflow: hidden;
     background-color: white;
     text-align: center;
}
.backdrop {
     position: fixed;
     top: 0;
     left: 0;
     height: 100vh;
     width: 100%;
     background-color: rgba(0, 0, 0, 0.75);
     z-index: 10;
}
h2 {
     color: #ed8756;
     font-size: 1.125rem;
}
.close-button {
     margin-top: 30px;
     font-size: 0.875rem;
     font-weight: 500;
     color: #ffffff;
     border: 2px solid #ed8756;
     padding: 4px 15px;
     background: #ed8756;
     border-radius: 50px;
     margin-left: 10px;
     cursor: pointer;
}
.close-button:focus {
     outline: none;
}
@media (max-width: 992px) {
     dialog {
          left: 20%;
          width: 60%;
     }
}
@media (max-width: 768px) {
     dialog {
          left: 10%;
          width: 80%;
     }
}
</style>