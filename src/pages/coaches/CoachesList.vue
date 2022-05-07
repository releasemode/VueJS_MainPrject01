<template>
    <div class="controls">
        <button>Refresh</button>
       {{isLoggedIn}}
        <router-link to="/Register" v-if="isLoggedIn">Register as a coach</router-link>
        <router-link to="/UserAuth" v-else>Login</router-link>
    </div>
    <div>
        <h2>Filter By </h2>
            <div>
                <div>
                <input value="swimming" v-model="filter_area" name="area" @change="filterBy" id="filter_swimming" type="checkbox" />
                <label for="filter_swimming">Swimming</label>
                </div>
                <div>
                <input value="football" v-model="filter_area" id="filter_football" name="area" @change="filterBy"  type="checkbox" />
                <label for="filter_football">Football</label>
                </div>
                <div>
                <input value="drawing" id="filter_drawing" name="area" v-model="filter_area" @change="filterBy" type="checkbox" />
                <label for="filter_drawing">Drawing</label>
                </div>
            </div>
    </div>
    <h1>Coaches List</h1>
    <ul v-if="hasCoaches"> 
        <li v-for="coach in filteredCoaches" :key="coach.id">
            <coaches-list-item :coach=coach></coaches-list-item>
        </li>
    </ul>
    <h3 v-else>No coaches found</h3>
</template>
<script>

import CoachesListItem from './CoachesListItem.vue'
export default {
    data(){
        return{
            filter_area:[],
            token:this.$store.getters['auth/LoggedInUser'].token,
            isLoggedIn:false
        }
    },
    watch:{
        token(value){
            console.log(value);
            if(value !==''){
                this.isLoggedIn=true;
            }else{
            this.isLoggedIn=false;
            }
        }
    },
    components:{
        CoachesListItem
        
    },
    computed:{
        filteredCoaches(){
                
                 var resCoaches = this.$store.getters['coach/coaches'];

                 return resCoaches.filter((coach)=>{
                     if(this.filter_area.length===0)
                        return true;
                     if(this.filter_area.includes('swimming') && coach.areaOfExpertise.includes('swimming')){
                       
                        return true;
                     }
                     if(this.filter_area.includes('football') && coach.areaOfExpertise.includes('football'))
                        return true;
                    if(this.filter_area.includes('drawing') && coach.areaOfExpertise.includes('drawing')){
                        
                        return true;
                    }
 
                 })
                
             
        },
        hasCoaches(){
            return this.$store.getters['coach/hasCoaches'];
        },
        // isLoggedIn(){
        //     var token = this.$store.getters['auth/LoggedInUser'];
        //     console.log(token);
        //     if(token.token !=='')
        //         return true;
        //     return false;
        // }
    },
    mounted(){
      
       this.$store.dispatch('coach/setCoaches');
    }
}
</script>

<style scoped>
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.controls {
  display: flex;
  justify-content: space-between;
}
</style>