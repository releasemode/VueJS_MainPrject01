<template>
<base-card>
    <form @submit.prevent="Sign">
        <div class="form-control">
            <label for="email">Email</label>
            <input type="text" id="email" v-model="email">
        </div>
        <div class="form-control">
            <label for="password">Password</label>
            <input type="password" id="password" v-model="password">
        </div>
        <button>{{submitButtonCaption}}</button>
        <button type="button" @click="switchAuthMode" >{{switchModeButtonCaption}}</button>
    </form>
       <base-dialog title="User Registration" :show="showDialog" @close="closeDialog">
        <div :v-slot="header"></div>
        <p>{{responseMsg}}</p>
    </base-dialog>
     <base-dialog title="User Registration" :show="isLoading" :fixed=true>
        <div :v-slot="header"></div>
        <p>Authenticating...</p>
        <base-spinner></base-spinner>
    </base-dialog>
    
</base-card>
</template>

<script>
export default{
  data(){
    return{
      email:'',
      password:'',
      mode:'Login',
       responseMsg:'',
       showDialog:false,
       isLoading:false
    }
  },
  computed:{
    submitButtonCaption(){
      if(this.mode === 'Login')
        return this.mode;
      else 
        return 'Signup';
    },

    switchModeButtonCaption(){
      if(this.mode === 'Login')
        return "Signup instead";
      else 
        return "Login instead";
    }

  },
  methods:{
       closeDialog(){
            this.showDialog=false;
        },
    switchAuthMode(){
      if(this.mode === "Login")
        this.mode = 'Signup';
      else
        this.mode = "Login"
    },
    async Sign(){
       this.isLoading=true;
     
      if(this.mode === "Login"){
        
          var loginModel={
            email:this.email,
            password:this.password,
            returnSecureToken:true
          };
          await this.$store.dispatch('auth/login',loginModel)
                    .then(res=>{
                   
                      this.email="";
                      this.password="";
                      this.responseMsg="User has been successfully logged in which with the user id in " + res.localId;
                      this.$router.replace("/coaches");
                    })
                    // eslint-disable-next-line no-unused-vars
                    .catch(err=>{
                     
                      this.email="";
                      this.password="";
                      this.responseMsg="Unable to login, please check your email and password!";
                      this.showDialog=true;
                    });
         
      }else{
      var newUser = {
        email:this.email,
        password:this.password,
        returnSecureToken:true
      }
     
      await this.$store.dispatch('auth/SignUp',newUser)
      // eslint-disable-next-line no-unused-vars
      .then((res) => {
                   
                      this.email="";
                      this.password="";
                      this.responseMsg="User has been successfully created" ;
                      this.showDialog = true;
                  })
                   .catch((error) => {
                      this.showDialog = true;
                      this.responseMsg=error
                  })
      }
      this.isLoading=false;
    }
  }
}
</script>


<style scoped>
form {
  margin: 1rem;
  border: 1px solid #ccc;
  border-radius: 12px;
  padding: 1rem;
}

.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  margin-bottom: 0.5rem;
  display: block;
}

input,
textarea {
  display: block;
  width: 100%;
  font: inherit;
  border: 1px solid #ccc;
  padding: 0.15rem;
}

input:focus,
textarea:focus {
  border-color: #3d008d;
  background-color: #faf6ff;
  outline: none;
}

.errors {
  font-weight: bold;
  color: red;
}

.actions {
  text-align: center;
}
</style>