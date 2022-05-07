<template>
    <h1>Add new coach</h1>
    <form @submit.prevent="addNewCoach">
        <div class="form-control">
            <label :class="{invalid:validationFields.firstName===false}" for="firstName">First Name</label>
            <input :class="{invalid:validationFields.firstName===false}" id="firstName" v-model="newCouch.firstName" type="text">
        </div>
        <div class="form-control">
            <label :class="{invalid:validationFields.lastName===false}" for="lastName">Last Name</label>
            <input :class="{invalid:validationFields.lastName===false}" id="lastName" v-model="newCouch.lastName" type="text">
        </div>
        <div class="form-control">
            <label :class="{invalid:validationFields.description===false}" for="description">Description</label>
            <textarea :class="{invalid:validationFields.description===false}" v-model="newCouch.description" id="description"/>
        </div>
        <div class="form-control">
            <label :class="{invalid:validationFields.rate===false}" for="rate">Rate</label>
            <input :class="{invalid:validationFields.rate===false}" id="rate" v-model="newCouch.rate" type="number">
        </div>
        <div class="form-control">
            <h2 :class="{invalid:validationFields.area===false}">Area of Expertise?</h2>
            <div>
                <input value="swimming" id="area-swimming" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-swimming">Swimming</label>
            </div>
            <div>
                <input value="drawing" id="area-drawing" name="area" v-model="newCouch.area"  type="checkbox" />
                <label for="area-drawing">Drawing</label>
            </div>
            <div>
                <input value="painting" id="area-painting" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-painting">Painting</label>
            </div>
            <div>
                <input value="dance" id="area-dance" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-dance">Dance</label>
            </div>
            <div>
                <input value="pokes" id="area-pokes" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-pokes">Pokes</label>
            </div>
            <div>
                <input value="shakes" id="area-shakes" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-shakes">Shakes</label>
            </div>
             <div>
                <input value="football" id="area-football" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-football">Football</label>
            </div>
             <div>
                <input value="cricket" id="area-cricket" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-cricket">Cricket</label>
            </div>
             <div>
                <input value="volleyball" id="area-volleyball" name="area" v-model="newCouch.area" type="checkbox" />
                <label for="area-volleyball">Volleyball</label>
            </div>
            <p v-show="validationFields.area===false">Atleast one area of expertise must be selected</p>
        </div>
       
        <button>Create</button>
    </form>
    <base-dialog title="Add New Coach" :show="showErrorMsg" @close="closeDialog">
        <div :v-slot="header"></div>
        <p>{{errorMsg}}</p>
    </base-dialog>
</template>

<script>

export default {
    
    data(){
        return{
            newCouch:{
                id:0,
                firstName:'',
                lastName:'',
                description:'',
                rate:'',
                area:[]
            },
            validationFields:{
                id:0,
                firstName:true,
                lastName:true,
                description:true,
                rate:true,
                area:true
            },
            isValidCoach:true,
            errorMsg:'Unable to create coach..',
            showErrorMsg:false,
            hasData:false   
        }
    },
    beforeRouteLeave (to, from , next) {
               this.hasDataInForm();
               if(this.hasData)
                {
                    this.hasData=false;
                    const answer = window.confirm('Do you really want to leave? you have unsaved changes!')
                    if (answer) {
                        next()
                    } else {
                        next(false)
                    }
                }
                else{
                    next();
                }
    },
    methods:{
        closeDialog(){
            this.showErrorMsg=false;
        },
        hasDataInForm(){
            if(this.newCouch.firstName !=="" ||
               this.newCouch.lastName !=="" ||
               this.newCouch.description !=="" ||
               this.newCouch.rate !=="" ||
               this.newCouch.area.length !==0)
                this.hasData=true;

        },
        validateForm(){
            if(this.newCouch.id === 0){
                this.validationFields.id=false;
                this.isValidCoach=false;
            }
            if(this.newCouch.firstName == ""){
                this.validationFields.firstName =false;
                this.isValidCoach=false;
            }
            if(this.newCouch.lastName == ""){
                this.validationFields.lastName =false;
                this.isValidCoach=false;
            }
            if(this.newCouch.description == ""){
                this.validationFields.description =false;
                this.isValidCoach=false;
            }
            if(this.newCouch.rate == ""){
                this.validationFields.rate =false;
                this.isValidCoach=false;
            }
            if(this.newCouch.area.length == 0){
                this.validationFields.area =false;
                this.isValidCoach=false;
            }
        },
        resetValidation(){
            this.validationFields.id = true;
            this.validationFields.firstName =true;
            this.validationFields.lastName =true;
            this.validationFields.description =true;
            this.validationFields.rate =true;
            this.validationFields.area =true;
            this.isValidCoach=true;
        },
        addNewCoach(){
            this.showErrorMsg=false;
            var maxCouchId= this.$store.getters['coach/MaxCouchId'];
            this.newCouch.id=+maxCouchId+1;
            this.resetValidation();
            this.validateForm();
           
            
            if(this.isValidCoach){
                this.$store.dispatch('coach/addNewCoach',this.newCouch)
                  .then((res) => {
                      console.log(res);
                      this.$router.replace('/coaches');
                  })
                   .catch((error) => {
                      this.showErrorMsg=true;
                      this.errorMsg=error;
                  })

             
                
            }
                        
        },
       
       
    }
    
}
</script>

<style scoped>
.form-control {
  margin: 0.5rem 0;
}

label {
  font-weight: bold;
  display: block;
  margin-bottom: 0.5rem;
}

input[type='checkbox'] + label {
  font-weight: normal;
  display: inline;
  margin: 0 0 0 0.5rem;
}

input,
textarea {
  display: block;
  width: 100%;
  border: 1px solid #ccc;
  font: inherit;
}

input:focus,
textarea:focus {
  background-color: #f0e6fd;
  outline: none;
  border-color: #3d008d;
}

input[type='checkbox'] {
  display: inline;
  width: auto;
  border: none;
}

input[type='checkbox']:focus {
  outline: #3d008d solid 1px;
}

h3 {
  margin: 0.5rem 0;
  font-size: 1rem;
}
h2.invalid,
label.invalid {
  color: red;
}

input.invalid ,
textarea.invalid  {
  border: 1px solid red;
}


button,
a {
  text-decoration: none;
  padding: 0.75rem 1.5rem;
  font: inherit;
  background-color: #3a0061;
  border: 1px solid #3a0061;
  color: white;
  cursor: pointer;
  border-radius: 30px;
  margin-right: 0.5rem;
  display: inline-block;
}

a:hover,
a:active,
button:hover,
button:active {
  background-color: #270041;
  border-color: #270041;
}

.flat {
  background-color: transparent;
  color: #3a0061;
  border: none;
}

.outline {
  background-color: transparent;
  border-color: #270041;
  color: #270041;
}

.flat:hover,
.flat:active,
.outline:hover,
.outline:active {
  background-color: #edd2ff;
}

</style>