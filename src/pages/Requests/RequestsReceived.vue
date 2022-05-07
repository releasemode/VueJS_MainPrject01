<template>
    <h1>Requests Received</h1>
    <ul v-for="message in messages" :key="message.id">
        <li>{{message.email}}</li>
        <li>{{message.message}}</li>
    </ul>
    <base-dialog :show="hasError" title="Requests" @close="closeDialog">{{errorMsg}} </base-dialog>
    {{hasError}}
</template>
<script>

export default {
     data(){
         return{
             hasError:false,
             errorMsg:''
         }
     },
     computed:{
        messages(){
            return this.$store.getters['request/Requests']
        }
    },
    methods:{
        closeDialog(){
           
            this.hasError=false;
        }
    },
    mounted(){
      
           this.$store.dispatch('request/LoadRequests')
             .then((res) => {
                      console.log(res);
                     
                  })
                   .catch((error) => {
                      this.hasError=true;
                      this.errorMsg=error;
                  })
    } 
       
    
}
</script>

<style scoped>
li {
    list-style-type: none;
}
</style>