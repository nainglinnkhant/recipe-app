<template>
     <div class="search-bar shadow-sm">
          <form @submit.prevent="() => $emit('form-submitted')">
               <input 
                    type="text"
                    class="form-control"
                    placeholder="Search recipes..."
                    :value="userInput"
                    @input="(e) => $emit('input-changed', e.target.value)"
               />

               <button class="d-none d-md-block btn btn-search shadow-sm">Search</button>
               <button class="d-block d-md-none btn btn-search-icon">
                    <i class="fas fa-search"></i>
               </button>
          </form>
     </div>
</template>

<script>
export default {
     props: ['userInput'],
     emits: ['input-changed', 'form-submitted']
}
</script>

<style scoped>
.search-bar {
     position: relative;
}
.btn-search {
     background: #ed8756;
     color: #ffffff;
     padding-left: 15px;
     padding-right: 15px;
     border-radius: 50px;
     position: absolute;
     right: 0;
     top: 0;
}
.btn-search-icon {
     position: absolute;
     right: 0;
     top: 0;
}
.form-control {
     border-color: transparent;
     border-radius: 50px;
}
.btn:focus, .form-control:focus {
     border-color: transparent;
     box-shadow: 0 0 0 0;
}
i {
     color: #ed8756;
}
.search-bar {
     border-radius: 50px;
     color: #374151;
}
</style>