<template>
    <h1>Contact coach</h1>
    <form @submit.prevent="SendRequest">
        <div class="form-control">
            <label :class="{invalid:requestValidator.emailValid===false}">Email</label>   
            <input :class="{invalid:requestValidator.emailValid===false}" type="text" v-model="request.email" id="email">
            <p v-show="requestValidator.emailValid===false">Email is not valid</p>
        </div>
        <div class="form-control">
            <label :class="{invalid:requestValidator.messageValid===false}">Message</label>   
            <textarea :class="{invalid:requestValidator.messageValid===false}" id="message" v-model="request.message"></textarea>
        </div>
        <p v-show="!submitSuccess">Error creating requests..</p>
        <button>Send Message</button>
    </form>
</template>
<script>
export default {
    data(){
        return{
            request:{
                id:0,
                email:'',
                message:'',
                coachId:this.$route.params["id"]
            },
            requestValidator:{
                idValid:true,
                emailValid:true,
                messageValid:true
            },

            isValidForm:true,
            submitSuccess:true

        }
    },
    methods:{
        validateForm(){
            if(this.request.id<=0){
                this.requestValidator.id =false;
                this.isValidForm=false;
            }
            if(this.request.email === "" || !this.isValidEmail(this.request.email)){
                this.requestValidator.emailValid=false;
                this.isValidForm=false;
            }
            if(this.request.message === ""){
                this.requestValidator.messageValid=false;
                this.isValidForm=false;
            }
        },
        resetValidation(){
            this.requestValidator.id =true;
            this.requestValidator.emailValid=true;
            this.requestValidator.messageValid=true;
            this.isValidForm=true;
        },
        SendRequest(){
            this.submitSuccess=true;
            this.resetValidation();
            var MaxRequests = this.$store.getters['request/MaxRequests'];
            this.request.id=+MaxRequests+1;
            this.validateForm();
            if(this.isValidForm){
                this.$store.dispatch('request/SetRequest',this.request)
                    .then((res)=>{
                        console.log(res);
                        this.$router.replace("/requests");
                    })
                    .catch(() => {
                      this.submitSuccess=false;
                      
                  })
                
            }else{
                console.log("Invalid form..");
            }
        },
        isValidEmail(email){
           var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
           return re.test(email);
        }
        
    }
}
</script>
<style scoped>
label.invalid {
  color: red;
}

input.invalid ,
textarea.invalid  {
  border: 1px solid red;
}

</style>